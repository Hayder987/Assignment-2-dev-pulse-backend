import type { NextFunction, Request, Response } from "express";
import { sendValidationError } from "../../utils/sendValidationError";
import type { IUserPayload, Roles } from "./auth.interface";


const validateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return sendValidationError("Request body is missing");
    }

    const { name, email, password, role } = req.body as IUserPayload;

    if (!name) {
      return sendValidationError("Name is required");
    }

    if (typeof name !== "string") {
      return sendValidationError("Name must be a string");
    }

    if (name.trim().length < 2) {
      return sendValidationError(
        "Name must be at least 2 characters"
      );
    }
    
     // check email and email format
    //  create only regex with Ai
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      return sendValidationError("Email is required");
    }

    if (typeof email !== "string") {
      return sendValidationError("Email must be a string");
    }

    if (!emailRegex.test(email)) {
      return sendValidationError(
        "Invalid email format (example: test@gmail.com)"
      );
    }

    //  check password if exist and type
    if (!password) {
      return sendValidationError("Password is required");
    }

    if (typeof password !== "string") {
      return sendValidationError("Password must be a string");
    }

    if (role) {
      const validRoles: Roles[] = ["contributor", "maintainer"];

      if (!validRoles.includes(role)) {
        return sendValidationError(
          "Role must be 'contributor' or 'maintainer'"
        );
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default validateUser;