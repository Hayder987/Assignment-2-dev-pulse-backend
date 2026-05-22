
import type { Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ISuccessResponse } from "../interfaces/successResponse.interface";


export const sendSuccessResponse = <T>(
  res: Response,
  statusCode: StatusCodes,
  message?: string,
  data?: T
): Response<ISuccessResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};