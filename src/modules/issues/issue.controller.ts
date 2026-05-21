import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { handleError } from "../../utils/handleError";
import { issueService } from "./issue.service";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";

const createIssue = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
    const result = await issueService.createIssueIntoDb(req.body, id as number);

    return sendSuccessResponse(
      res,
      StatusCodes.CREATED,
      "Issue Created successfully",
      result?.rows[0],
    );
  } catch (error) {
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    return handleError({ res, statusCode, error });
  }
};

const getAllIssues = async (req: Request, res: Response) =>{
  try {
    const result = await issueService.getAllIssuesFromDB(
    req.query
  );
  
  
  } catch (error) {
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    return handleError({ res, statusCode, error });
  }
}

export const issueController = {
  createIssue,
  getAllIssues
};
