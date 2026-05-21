import express, { type Application, type Request, type Response } from "express";
import { authRouter } from "./modules/auth/auth.route";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { issueRouter } from "./modules/issues/issue.route";

const app:Application = express();

// middleware
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/issues", issueRouter);

app.get("/", (req:Request, res:Response)=>{
   res.json({
    message: "This Is root Route"
   })
});

app.use(globalErrorHandler)

export default app;