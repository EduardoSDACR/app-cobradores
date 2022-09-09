import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customError.error";
import { HttpError } from "http-errors";

export function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
  let customError = err;

  if (!(err instanceof HttpError)) {
    customError = new CustomError("An error has ocurred", 500, err);
  }

  res.status((customError as CustomError).status).send(customError);
}
