import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { handleError } from "../../utils/handleError";
import { issueService } from "./issue.service";

const createIssue =async (req: Request, res: Response) => {
  try {
    const result = await issueService.createIssueIntoDb(req.body);
    
  } catch (error) {
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    return handleError({ res, statusCode, error });
  }
};

export const issueController = {
    createIssue,
}
