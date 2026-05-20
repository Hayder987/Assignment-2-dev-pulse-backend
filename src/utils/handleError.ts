
import { AppError } from "../errors/appError";
import { sendErrorResponse } from "./sendErrorResponse";
import type { IHandleErrorOptions } from "../interfaces/errorHandler.interface";

export const handleError = ({
  res,
  error,
}: IHandleErrorOptions) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  else if (error instanceof Error) {
    message = error.message;
  }

  return sendErrorResponse(
    res,
    statusCode,
    message,
    error
  );
};