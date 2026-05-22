import { pool } from "./pool";
import { issueSchema } from "./schema/issue.schema";
import { userSchema } from "./schema/user.schema";

export const initDB = async () => {
  try {
    
    await pool.query(userSchema);
    await pool.query(issueSchema);
   
    console.log("Connected With Neon DB and Table Create Successfully");
  } catch (error) {
    console.log("Init Error:", error);
  }
};