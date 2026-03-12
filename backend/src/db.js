import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id UUID PRIMARY KEY,
      name TEXT NOT NULL,
      status TEXT NOT NULL
    )
  `);

  await pool.query(`
    INSERT INTO projects (id, name, status)
    VALUES
      ('11111111-1111-1111-1111-111111111111', 'Platform Migration', 'active'),
      ('22222222-2222-2222-2222-222222222222', 'Billing Rewrite', 'planning')
    ON CONFLICT (id) DO NOTHING
  `);
}