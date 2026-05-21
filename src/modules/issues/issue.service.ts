import { pool } from "../../db";
import type { IIssue, QueryParams } from "./issue.interface";

// create issue
const createIssueIntoDb = async(payload:IIssue, id:number)=>{
   const {title,  description, type, status} = payload; 

   const result = await pool.query(`
      INSERT INTO issues(title, description, type, status, reporter_id)
      VALUES($1, $2, $3, COALESCE($4, 'open'), $5)
      RETURNING *
    `,[title, description, type, status, id])
   return result
}

// get all issue with sort
const getAllIssuesFromDB = async(query:QueryParams) =>{
   const { sort = "newest", type, status } = query;

  let result = `SELECT * FROM issues`;
  const values: string[] = [];

 
  if (type && status) {
    result += ` WHERE type=$1 AND status=$2`;
    values.push(type, status);
  } else if (type) {
    result += ` WHERE type=$1`;
    values.push(type);
  } else if (status) {
    result += ` WHERE status=$1`;
    values.push(status);
  }

  
  result += ` ORDER BY created_at ${
    sort === "oldest" ? "ASC" : "DESC"
  }`;

  
}

export const issueService ={
    createIssueIntoDb,
    getAllIssuesFromDB
}