
import { AppError } from "../errors/appError";
import { sendErrorResponse } from "./sendErrorResponse";
import type { IHandleErrorOptions } from "../interfaces/errorHandler.interface";
import { StatusCodes } from "http-status-codes";

export const handleError = ({
  res,
  error,
}: IHandleErrorOptions) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
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