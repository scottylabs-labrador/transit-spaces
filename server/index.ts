import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { asyncCatch } from "./util/asyncCatch";
import { getRecommendation } from "./controllers/RecommendationsController";
import { updateAvailability } from "./controllers/UpdateController";

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

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
