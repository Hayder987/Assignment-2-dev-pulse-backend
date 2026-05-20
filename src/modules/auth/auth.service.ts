import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUserPayload } from "./auth.interface";

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

export const authService = {
  registerUserIntoDb,
};
