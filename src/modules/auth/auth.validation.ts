import type { NextFunction, Request, Response } from "express";
import type { IUserPayload, Roles } from "./auth.interface";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/appError";

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    throw new AppError(`Request body is missing`, StatusCodes.BAD_REQUEST);
  }

  const { name, email, password, role } = req.body as IUserPayload;g

  if (!name) {
    throw new AppError(
      `Name is required and type will be string/text`,
      StatusCodes.BAD_REQUEST,
    );
  }

   if (typeof(name) !== "string") {
    throw new AppError("Invalid name data type example:('hayder ali' or 'akash')", StatusCodes.BAD_REQUEST);
   }

  if (name.length < 2) {
    throw new AppError(
      "Name must be at least 2 characters",
      StatusCodes.BAD_REQUEST,
    );
  }

  // check email and email format
  //  create only regex with Ai
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    throw new AppError("Email is required and type will be string/text", StatusCodes.BAD_REQUEST);
  }

  if (!emailRegex.test(email)) {
    throw new AppError("Invalid email format ex: (example@gmail.com)", StatusCodes.BAD_REQUEST);
  }

  //  check password if exist
  if (!password) {
    throw new AppError("Password is required and type will be string", StatusCodes.BAD_REQUEST);
  }

   if (typeof(password) !== "string") {
    throw new AppError("Invalid password format type will be string example:('abc2525' or '125465')", StatusCodes.BAD_REQUEST);
   }

  if (role) {
    const validRoles: Roles[] = ["contributor", "maintainer"];

    if (!validRoles.includes(role)) {
      throw new AppError(
        "Role must be 'contributor' or 'maintainer'",
        StatusCodes.BAD_REQUEST,
      );
    }
  }

  next();
};

export default validateUser;
