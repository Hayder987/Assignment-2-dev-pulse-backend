import { Pool } from "pg";
import { config } from "../config/env.config";


export const pool = new Pool({
  connectionString: config.neonDbConnectionString,
});