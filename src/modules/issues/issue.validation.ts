import type { NextFunction, Request, Response } from "express";
import {
  reqMethod,
  type IIssueUpdate,
  type ReqMethod,
} from "./issue.interface";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/appError";

const validateIssue = (method: ReqMethod) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { title, description, type, status } = req.body as IIssueUpdate;

    // For post method validation
    if (method === reqMethod.post) {
      if (!title) {
        throw new AppError("Title is required", StatusCodes.BAD_REQUEST);
      }

      if (!description) {
        throw new AppError("Description is required", StatusCodes.BAD_REQUEST);
      }

      if (!type) {
        throw new AppError("type is required", StatusCodes.BAD_REQUEST);
      }
    }

    // For update method validation
    if (method === reqMethod.patch) {
      if (!title && !description && !type && !status) {
        throw new AppError(
          "At least one field is required to update",
          StatusCodes.BAD_REQUEST,
        );
      }
    }

    //common validation for post and patch method
    if (title && title.length > 150) {
      throw new AppError(
        "Title cannot exceed 150 characters",
        StatusCodes.BAD_REQUEST,
      );
    }

    if (description && description.length < 20) {
      throw new AppError(
        "Description must be at least 20 characters",
        StatusCodes.BAD_REQUEST,
      );
    }

    if (type) {
      const validTypes = ["bug", "feature_request"];

      if (!validTypes.includes(type)) {
        throw new AppError(
          "Type must be 'bug' or 'feature_request'",
          StatusCodes.BAD_REQUEST,
        );
      }
    }

    if (status) {
      const validStatus = ["open", "in_progress", "resolved"];

      if (!validStatus.includes(status)) {
        throw new AppError("status must be 'open' or 'in_progress' or 'resolved'", StatusCodes.BAD_REQUEST);
      }
    }

    next();
  };
};

export default validateIssue;
