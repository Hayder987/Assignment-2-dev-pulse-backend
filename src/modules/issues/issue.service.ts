import { pool } from "../../db";
import { AppError } from "../../errors/appError";
import type { JwtPayload } from "../../interfaces/jwtpayload.interface";
import type { IIssue, IIssueUpdate, QueryParams } from "./issue.interface";
import { StatusCodes } from "http-status-codes";

// create issue
const createIssueIntoDb = async (payload: IIssue, id: number) => {
  const { title, description, type, status } = payload;

  const result = await pool.query(
    `
      INSERT INTO issues(title, description, type, status, reporter_id)
      VALUES($1, $2, $3, COALESCE($4, 'open'), $5)
      RETURNING *
    `,
    [title, description, type, status, id],
  );
  return result;
};

// get all issue with sort
const getAllIssuesFromDB = async (query: QueryParams) => {
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

  result += ` ORDER BY created_at ${sort === "oldest" ? "ASC" : "DESC"}`;

  const issuesResult = await pool.query(result, values);

  const issues = issuesResult.rows;

  const finalResult = [];

  for (const issue of issues) {
    const reporterResult = await pool.query(
      `
      SELECT id, name, role
      FROM users
      WHERE id=$1
      `,
      [issue.reporter_id],
    );

    finalResult.push({
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter: reporterResult.rows[0],
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    });
  }

  return finalResult;
};

const getSingleIssueFromDB = async (id: string) => {
  const issueData = await pool.query(
    `
    SELECT * FROM issues 
    WHERE id=$1
    `,
    [id],
  );

  const issue = issueData.rows[0];

  if (!issue) {
    throw new AppError("Issue Not Found!", StatusCodes.NOT_FOUND);
  }

  const reporterResult = await pool.query(
    `
      SELECT id, name, role
      FROM users
      WHERE id=$1
    `,
    [issue.reporter_id],
  );

  const reporter = reporterResult.rows[0];

  const result = {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,

    reporter: {
      id: reporter.id,
      name: reporter.name,
      role: reporter.role,
    },

    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };

  return result;
};

const updateIssueIntoDB = async (
  id: string,
  payload: IIssueUpdate,
  user: JwtPayload,
) => {
  const { title, description, type , status} = payload;

  const issueData = await pool.query(
    `
    SELECT * FROM issues
    WHERE id=$1
  `,
    [id],
  );

  const issue = issueData.rows[0];

  if (!issue) {
    throw new AppError("Issue Not Found!", StatusCodes.NOT_FOUND);
  }

  if (user.role === "maintainer") {
  } else if (user.role === "contributor") {
    if (issue.reporter_id !== user.id) {
      throw new AppError(
        "You cannot update others issue",
        StatusCodes.FORBIDDEN,
      );
    }

    if (issue.status !== "open") {
      throw new AppError(
        "You can only update open issues",
        StatusCodes.CONFLICT,
      );
    }
  }

  const result = await pool.query(
    `
    UPDATE issues
    SET title=COALESCE($1,title),
        description=COALESCE($2,description),
        type=COALESCE($3,type),
        status=COALESCE($4, status),
        updated_at=CURRENT_TIMESTAMP
    WHERE id=$5 RETURNING *
    `,
    [title, description, type, status, id],
  );

  return result.rows[0];
};

export const issueService = {
  createIssueIntoDb,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueIntoDB,
};
