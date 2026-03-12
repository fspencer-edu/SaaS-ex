import express from "express";
import { pool } from "../db.js";
import { redis } from "../redis.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const cacheKey = "projects:all";

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const result = await pool.query(
      "SELECT id, name, status FROM projects ORDER BY name ASC"
    );

    await redis.set(cacheKey, JSON.stringify(result.rows), {
      EX: 60
    });

    res.json(result.rows);
  } catch (error) {
    console.error("GET /projects error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;