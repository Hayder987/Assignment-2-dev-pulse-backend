import express, { type Application, type Request, type Response } from "express";

const app:Application = express();


app.get("/", (req:Request, res:Response)=>{
   res.json({
    message: "This Is root Route"
   })
});

export default app;