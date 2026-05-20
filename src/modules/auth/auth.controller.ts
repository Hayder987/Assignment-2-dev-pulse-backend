import type { Request, Response } from "express";
import { authService } from "./auth.service";


const registerUser = async(req:Request, res:Response)=>{
   try {
    const result = await authService.registerUserIntoDb(req.body);
    
    
    
   } catch (error) {
    console.log(error)
   }
}


export const authController = {
  registerUser,  
}