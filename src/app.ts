import express, { type Application, type NextFunction, type Request, type Response } from "express";
import { authRouter } from "./modules/auth/auth.route";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { issueRouter } from "./modules/issues/issue.route";
import { AppError } from "./errors/appError";
import { StatusCodes } from "http-status-codes";
import { sendSuccessResponse } from "./utils/sendSuccessResponse";

const app:Application = express();

// middleware
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/issues", issueRouter);

app.get("/", (req:Request, res:Response)=>{
   sendSuccessResponse(
         res,
         StatusCodes.OK,
         "This Is dev-pulse Root Route",
         {}
       );
});

app.use((req:Request, res:Response, next:NextFunction) => {
   next(new AppError(`Route ${req.originalUrl} not found`, StatusCodes.NOT_FOUND));
});

app.use(globalErrorHandler)

export default app;