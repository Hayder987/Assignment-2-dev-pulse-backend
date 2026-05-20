import { Pool } from "pg";
import { config } from "../config/env.config";

export const pool = new Pool({
  connectionString: config.neonDbConnectionString,
});

export const initDB = async () => {
  try {

    // create users Table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        role VARCHAR(50) DEFAULT 'contributor' CHECK (role IN ('contributor', 'maintainer')),

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
           )
        `);

    console.log("Connected With Neon DB Successfully");
  } catch (error) {
    console.log(error);
  }
};
