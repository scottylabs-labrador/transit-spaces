import { Request, Response } from "express";
import { error } from "../util/error";
import { prisma } from "../db";

export const getBuildings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const buildings = await prisma.building.findMany();
    res.json(buildings);
  } catch (err) {
    console.error(err);
    return error(res);
  }
};
