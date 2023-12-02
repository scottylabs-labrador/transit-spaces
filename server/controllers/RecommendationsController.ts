import { Request, Response } from "express";
import { error } from "../util/error";
import { prisma } from "../db";
import { floorMovementTime, lockTime } from "../util/constants";

export const getRecommendation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payload = req.body;

    const buildingId = payload.buildingId; // string representing building id
    const floor = payload.floor; // int representing building id, optional
    const capacity = payload.capacity; // int number of seats required for the table
    const timeRequirement = payload.timeRequirement; // int how much we set predictedUnavailableUntil to

    const minLastUpdatedAt = new Date(new Date().getTime() - lockTime * 60000);

    // Get all the seats in that building that have at least that capacity
    // Filter seats with currentTime - lastUpdatedAt > lockTime => lastUpdatedAt < minLastUpdated
    const seats = await prisma.seat.findMany({
      where: {
        buildingId: {
          equals: buildingId,
        },
        capacity: {
          gte: capacity,
        },
        lastUpdatedAt: {
          lt: minLastUpdatedAt,
        }
      },
      orderBy: {
        predictedUnavailableUntil: 'asc'
      }
    });

    // No available seats :(
    if (seats.length == 0) {
      res.json({});
      return;
    }

    // If floor specified, subtract time between floors from predictedUnavailableUntil and re-sort
    // Choose seat that has the earliest predictedUnavailableUntil
    if (floor) {
      for (let i in seats) {
        const predictedUnavailableUntil = seats[i].predictedUnavailableUntil;
        const movementTime = Math.abs(floor - seats[i].floor) * floorMovementTime * 60000;
        seats[i].predictedUnavailableUntil = new Date(predictedUnavailableUntil.getTime() - movementTime);
      }

      seats.sort((a, b) => {
        return a.predictedUnavailableUntil.getTime() - b.predictedUnavailableUntil.getTime();
      })
    }
    const seat = seats[0]


    // Update seat lastUpdatedAt to currentTime, predictedUnavailableUntil to currentTime + timeRequirement
    seat.lastUpdatedAt = new Date();
    seat.predictedUnavailableUntil = new Date(new Date().getTime() + timeRequirement * 60000);

    await prisma.seat.update({
      where: { id: seat.id },
      data: {
        lastUpdatedAt: seat.lastUpdatedAt,
        predictedUnavailableUntil: seat.predictedUnavailableUntil
      }
    });

    // Return seat
    res.json(seat);
  } catch (err) {
    console.error(err);
    return error(res);
  }
};
