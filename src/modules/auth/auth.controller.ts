import type { Request, Response } from "express";
import { authService } from "./auth.service";
import { StatusCodes } from "http-status-codes";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";
import { handleError } from "../../utils/handleError";


// register User
const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.registerUserIntoDb(req.body);

    return sendSuccessResponse(
      res,
      StatusCodes.CREATED,
      "User registered successfully",
      result?.rows[0],
    );

  } catch (error: unknown) {

    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    handleError({ res, statusCode, error });
  }
};

// login user
const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);

    sendSuccessResponse(
      res,
      StatusCodes.OK,
      "User Login successfully",
      result,
    );
   
  } catch (error: unknown) {
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
   return handleError({ res, statusCode, error });
  }
};

export const authController = {
  registerUser,
  loginUser,
};
