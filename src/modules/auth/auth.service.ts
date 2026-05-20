import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { ILoginPayload, IUserPayload } from "./auth.interface";
import { AppError } from "../../errors/appError";
import { StatusCodes } from "http-status-codes";

const registerUserIntoDb = async (payload: IUserPayload) => {
  const { name, email, password, role } = payload;

  const hashPassword = await bcrypt.hashSync(password, 10);

  const result = await pool.query(`
      INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, COALESCE($4, 'contributor'))
       RETURNING id, name, email, role, created_at, updated_at
    `,[name, email, hashPassword, role ]);
   return result;
};

const loginUserIntoDB = async(payload:ILoginPayload)=>{
   const {email, password} = payload;

     const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [email]);

    if(userData.rows.length === 0){
        throw new AppError("User Not Found!", StatusCodes.NOT_FOUND)
    }
    const user = userData.rows[0];
    console.log(user)

}

export const authService = {
  registerUserIntoDb,
  loginUserIntoDB
};
