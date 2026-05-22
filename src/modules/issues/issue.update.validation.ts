
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { IIssueUpdate } from "./issue.interface";
import { AppError } from "../../errors/appError";


const validateUpdateIssue = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const {
    title,
    description,
    type,
    status,
  } = req.body as IIssueUpdate;

  if (!title && !description && !type && !status) {
    throw new AppError(
      "At least one field is required to update",
      StatusCodes.BAD_REQUEST
    );
  }

  if (title) {
    if (title.length > 150) {
      throw new AppError(
        "Title cannot exceed 150 characters",
        StatusCodes.BAD_REQUEST
      );
    }
  }

  // description validation (if exists)
  if (description) {
    if (description.length < 20) {
      throw new AppError(
        "Description must be at least 20 characters",
        StatusCodes.BAD_REQUEST
      );
    }
  }

  // type validation (if exists)
  if (type) {
    const validTypes = ["bug", "feature_request"];

    if (!validTypes.includes(type)) {
      throw new AppError(
        "Type must be either 'bug' or 'feature_request'",
        StatusCodes.BAD_REQUEST
      );
    }
  }

  // status validation (if exists)
  if (status) {
    const validStatus = [
      "open",
      "in_progress",
      "resolved",
    ];

    if (!validStatus.includes(status)) {
      throw new AppError(
        "Status must be 'open', 'in_progress', or 'resolved'",
        StatusCodes.BAD_REQUEST
      );
    }
  }

  next();
};

export default validateUpdateIssue;