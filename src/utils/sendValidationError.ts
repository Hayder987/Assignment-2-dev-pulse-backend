
import { StatusCodes } from "http-status-codes"
import { AppError } from "../errors/appError"

export const sendValidationError = (message:string)=>{
    throw new AppError(message, StatusCodes.BAD_REQUEST)
}