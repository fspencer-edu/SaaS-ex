import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import projectsRouter from "./routes/projects.js";
import { initDb } from "./db.js";
import { initRedis } from "./redis.js";
import {
  httpRequestCounter,
  httpRequestDuration,
  metricsHandler
} from "./metrics.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();

  res.on("finish", () => {
    const route = req.route?.path || req.path || "unknown";
    httpRequestCounter.inc({
      method: req.method,
      route,
      status: String(res.statusCode)
    });

    end({
      method: req.method,
      route,
      status: String(res.statusCode)
    });
  });

  next();
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/metrics", metricsHandler);

app.use("/api/projects", projectsRouter);

async function start() {
  try {
    await initDb();
    await initRedis();

    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Backend failed to start:", error);
    process.exit(1);
  }
}

start();