import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { handleError } from "../../utils/handleError";
import { issueService } from "./issue.service";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";

// create issue controller
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

// get all issues controller
const getAllIssues = async (req: Request, res: Response) =>{
  try {
    const result = await issueService.getAllIssuesFromDB(req.query);
   
  return sendSuccessResponse(
      res,
      StatusCodes.OK,
      "All Issues Get successfully",
      result,
    );
  
  } catch (error) {
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    return handleError({ res, statusCode, error });
  }
};

// get single issue
const getSingleIssue = async (req: Request, res: Response)=>{
   try {
    const {id} = req.params;
    console.log(id)

    const result = await issueService.getSingleIssueFromDB(id as string);

    return sendSuccessResponse(
      res,
      StatusCodes.OK,
      "Issue Retrieve successfully",
      result,
    );
    
   } catch (error) {
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    return handleError({ res, statusCode, error });
   }
};

const updateIssue = async (req: Request, res: Response)=>{
  try {

    const {id} = req.params;
    const body = req.body;

    const result = await issueService.updateIssueIntoDB(id as string, body) 
    
  } catch (error) {
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    return handleError({ res, statusCode, error });
  }
}

export const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue
};
