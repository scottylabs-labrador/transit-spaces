import { Request, Response } from "express";
import { error } from "../util/error";
import { prisma } from "../db";
import { lockTime, defaultTimeRequirement } from "../util/constants";

export const updateAvailability = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // TODO: implement updateAvailability logic here.
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
