import type { Response } from "express";

export interface IHandleErrorOptions {
  res: Response; 
  statusCode?: number;
  error: unknown;
}