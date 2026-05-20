import type { Request, Response } from "express";
import { authService } from "./auth.service";

import { StatusCodes } from "http-status-codes";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";
import { sendErrorResponse } from "../../utils/sendErrorResponse";


const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.registerUserIntoDb(req.body);

    return sendSuccessResponse(
      res,
      StatusCodes.CREATED,
      "User registered successfully",
      result?.rows[0]
    );
  } catch (error: unknown) {
    let message = "User Register Failed";

    if (error instanceof Error) {
      message = error.message;
    }

    return sendErrorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      message,
      error
    );
  }
};


export const authController = {
  registerUser,  
}