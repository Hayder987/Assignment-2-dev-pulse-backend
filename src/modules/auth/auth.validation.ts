import type { NextFunction, Request, Response } from "express";
import { sendValidationError } from "../../utils/sendValidationError";
import {
  AUTH_ACTION,
  type AuthAction,
  type IUserPayload,
} from "./auth.interface";

const validateUser = (method: AuthAction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return sendValidationError("Request body is missing");
      }

      const { name, email, password, role } =
        req.body as Partial<IUserPayload>;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // login validation
      if (method === AUTH_ACTION.login) {
        if (!email) return sendValidationError("Email is required");
        if (!password) return sendValidationError("Password is required");

        if (typeof email !== "string")
          return sendValidationError("Email must be a string");

        if (typeof password !== "string")
          return sendValidationError("Password must be a string");

        if (!emailRegex.test(email)) {
          return sendValidationError("Invalid email format");
        }

        return next();
      }

      // register validation
      if (method === AUTH_ACTION.register) {
        if (!name) return sendValidationError("Name is required");
        if (!email) return sendValidationError("Email is required");
        if (!password) return sendValidationError("Password is required");

        if (typeof name !== "string")
          return sendValidationError("Name must be a string");

        if (name.trim().length < 2)
          return sendValidationError(
            "Name must be at least 2 characters"
          );
        
          // check email type and format
        if (typeof email !== "string")
          return sendValidationError("Email must be a string");

        if (!emailRegex.test(email)) {
          return sendValidationError(
            "Invalid email format (example: test@gmail.com)"
          );
        }
        
        // check password type 
        if (typeof password !== "string")
          return sendValidationError("Password must be a string");

        if (role) {
          const validRoles = ["contributor", "maintainer"];

          if (!validRoles.includes(role)) {
            return sendValidationError(
              "Role must be 'contributor' or 'maintainer'"
            );
          }
        }

        return next();
      }

      return sendValidationError("Invalid auth action");
    } catch (error) {
      next(error);
    }
  };
};

export default validateUser;