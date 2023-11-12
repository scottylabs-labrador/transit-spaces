import { Request, Response } from "express";
import { error } from "../util/error";
import { prisma } from "../db";

export const getRecommendation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // TODO: implement getRecommendation logic here.
  } catch (err) {
    console.error(err);
    return error(res);
  }
};
