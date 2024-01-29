import { Request, Response } from "express";
import { error } from "../util/error";
import { prisma } from "../db";
import { lockTime, defaultTimeRequirement } from "../util/constants";

import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://de95537c432b874b00ece6737ebc05d6@o4506651993047040.ingest.sentry.io/4506651994947584",
  integrations: [
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

export const updateAvailability = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payload = req.body;

    const seatId = payload.seatId; // string representing seat id
    const wasAvailable = payload.wasAvailable; // boolean representing whether the seat was available

    if (!wasAvailable) {
      const seat = await prisma.seat.findUnique({
        where: {
          id: seatId
        }
      });
      
      const minLastUpdatedAt = new Date(new Date().getTime() - lockTime * 60000);

      if (seat && minLastUpdatedAt > seat.lastUpdatedAt) {
        await prisma.seat.update({
          where: {
            id: seatId
          },
          data: {
            predictedUnavailableUntil: new Date(new Date().getTime() + defaultTimeRequirement * 60000),
          }
        });
      }
    }

    res.json(200);

  } catch (err) {
    console.error(err);
    return error(res);
  }
};
