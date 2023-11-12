import { Request, Response } from "express";
import { error } from "../util/error";
import { prisma } from "../db";

export const updateAvailability = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // TODO: implement updateAvailability logic here.
  } catch (err) {
    console.error(err);
    return error(res);
  }
};
