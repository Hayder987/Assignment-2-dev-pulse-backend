import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";
import { config } from "../config/env.config";
import type { JwtPayload } from "../interfaces/jwtpayload.interface";
import { pool } from "../db/pool";


// authmiddleware create
export const authMiddleware = () => {
  
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError("Unauthorized access", StatusCodes.UNAUTHORIZED);
      }

      const decoded = jwt.verify(
        token as string,
        config.accessSecret as string,
      ) as JwtPayload; // payload interface manually created
      
      // find user by id
      const userData = await pool.query(
        `
        SELECT * FROM users
        WHERE id=$1
        `,
        [decoded.id],
      );

      const user = userData.rows[0];
   
      
      if (!user) {
        throw new AppError(
          "Unauthorized: User Not Found!!",
          StatusCodes.UNAUTHORIZED,
        );
      }

      req.user = decoded;

      next();
      
    } catch (error) {
      next(error);
    }
  };
};
