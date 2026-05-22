
import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { StatusCodes } from "http-status-codes";

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = "Internal Server Error";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  else if (err instanceof Error) {
    message = err.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error: {
      statusCode,
      path: req.originalUrl,
      method: req.method
    },
  });
};
