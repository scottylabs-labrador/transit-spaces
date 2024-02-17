import express, { Express, Request, Response } from "express";
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import dotenv from "dotenv";
import cors from "cors";
import { asyncCatch } from "./util/asyncCatch";
import { getRecommendation } from "./controllers/RecommendationsController";
import { updateAvailability } from "./controllers/UpdateController";
import { getBuildings } from "./controllers/BuildingsController"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors({ origin: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("CMUSeats Backend");
});

app.post("/getRecommendation", asyncCatch(getRecommendation));
app.put("/updateAvailability", asyncCatch(updateAvailability));
app.get("/getBuildings", asyncCatch(getBuildings));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

Sentry.init({
  dsn: "https://37ff1a6bc732c80946a57256ef56a606@o4506764109938688.ingest.sentry.io/4506764269387776",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});


// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());