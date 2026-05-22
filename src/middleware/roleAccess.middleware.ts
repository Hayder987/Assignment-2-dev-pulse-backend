import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { StatusCodes } from "http-status-codes";
import type { Roles } from "../modules/auth/auth.interface";

export const roleAccess = (...roles:Roles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED);
      }
      
      if(!roles.includes(user.role)){
        throw new AppError("You do not have permission", StatusCodes.FORBIDDEN);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
