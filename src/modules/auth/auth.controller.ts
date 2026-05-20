import type { Request, Response } from "express";
import { authService } from "./auth.service";

import { StatusCodes } from "http-status-codes";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";
import { sendErrorResponse } from "../../utils/sendErrorResponse";


const registerUser = async(req:Request, res:Response)=>{
   try {
    const result = await authService.registerUserIntoDb(req.body);

    return sendSuccessResponse(
      res,
      StatusCodes.CREATED,
      "User registered successfully",
      result?.rows[0]
    );
  } catch (error: any) {
    return sendErrorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error?.message || "User Registered Fail",
      error
    );
  }
};


export const authController = {
  registerUser,  
}