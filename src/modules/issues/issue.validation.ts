import type { NextFunction, Request, Response } from "express";
import { reqMethod, type IIssueUpdate, type ReqMethod } from "./issue.interface";
import { sendValidationError } from "../../utils/sendValidationError";

const validateIssue = (method: ReqMethod) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description, type, status } =
        req.body as IIssueUpdate;

      // POST validation
      if (method === reqMethod.post) {
        if (!title) return sendValidationError("title is required");
        if (!description) return sendValidationError("description is required");
        if (!type) return sendValidationError("type is required");
      }

      // PATCH validation
      if (method === reqMethod.patch) {
        if (!title && !description && !type && !status) {
          return sendValidationError(
            "At least one field is required to update"
          );
        }
      }

      // Common validations
      if (title && typeof title !== "string") {
        return sendValidationError("title must be string");
      }

      if (description && typeof description !== "string") {
        return sendValidationError("description must be string");
      }

      if (title && title.length > 150) {
        return sendValidationError("Title maximum 150 chars not allow");
      }

      if (description && description.length < 20) {
        return sendValidationError("Description will be min 20 chars");
      }

      if (type) {
        const validTypes = ["bug", "feature_request"];
        if (!validTypes.includes(type)) {
          return sendValidationError("Invalid type type must be 'bug' or 'feature_request'");
        }
      }

      if (status) {
        const validStatus = ["open", "in_progress", "resolved"];
        if (!validStatus.includes(status)) {
          return sendValidationError("Invalid status status must be 'open' or 'in_progress' or 'resolved'");
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateIssue;