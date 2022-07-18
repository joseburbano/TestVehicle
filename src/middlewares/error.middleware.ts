import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/custom-error.model";

export const handleError = async (
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = err;
  console.log(err)
  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      "Oh no, this is embarrassing. We are having troubles my friend"
    );
  }
  await res.status((customError as CustomError).status).json(customError);
};
