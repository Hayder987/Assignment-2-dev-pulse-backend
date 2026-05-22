
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/appError";
import type { IIssue } from "./issue.interface";

const validatePostIssue = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const {
    title,
    description,
    type,
    status,
  } = req.body as IIssue;

  // title validation
  if (!title) {
    throw new AppError(
      "Title is required",
      StatusCodes.BAD_REQUEST
    );
  }

  if (title.length > 150) {
    throw new AppError(
      "Title cannot exceed 150 characters",
      StatusCodes.BAD_REQUEST
    );
  }

  // description validation
  if (!description) {
    throw new AppError(
      "Description is required",
      StatusCodes.BAD_REQUEST
    );
  }

  if (description.length < 20) {
    throw new AppError(
      "Description must be at least 20 characters",
      StatusCodes.BAD_REQUEST
    );
  }

  // type validation
  const validTypes = [
    "bug",
    "feature_request",
  ];

  if (!validTypes.includes(type)) {
    throw new AppError(
      "Type must be either 'bug' or 'feature_request'",
      StatusCodes.BAD_REQUEST
    );
  }

  // status validation
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

export default validatePostIssue;