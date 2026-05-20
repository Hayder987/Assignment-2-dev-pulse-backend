
import type { Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { IErrorResponse } from "../interfaces/errorResponse.interface";

export const sendErrorResponse = <T = unknown>(
  res: Response,
  statusCode: StatusCodes,
  message: string,
  errors?: T
): Response<IErrorResponse<T>> => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};