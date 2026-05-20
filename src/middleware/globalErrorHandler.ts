import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errors: {
      statusCode,
    },
  });
};
