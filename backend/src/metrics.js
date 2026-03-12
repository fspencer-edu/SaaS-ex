import client from "prom-client";

client.collectDefaultMetrics();

export const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status"]
});

export const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.05, 0.1, 0.25, 0.5, 1, 2, 5]
});

export async function metricsHandler(req, res) {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
}