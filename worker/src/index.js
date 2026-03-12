import dotenv from "dotenv";
import pg from "pg";
import { createClient } from "redis";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const redis = createClient({
  url: process.env.REDIS_URL
});

redis.on("error", (err) => {
  console.error("Worker Redis error:", err);
});

async function run() {
  await redis.connect();
  console.log("Worker started");

  setInterval(async () => {
    try {
      const result = await pool.query("SELECT COUNT(*)::int AS count FROM projects");
      await redis.set("stats:project_count", String(result.rows[0].count), {
        EX: 300
      });
      console.log("Updated stats:project_count =", result.rows[0].count);
    } catch (error) {
      console.error("Worker loop error:", error);
    }
  }, 30000);
}

run().catch((err) => {
  console.error("Worker failed:", err);
  process.exit(1);
});