import express from "express";
import cors from "cors";

import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import graphRoutes from "./routes/graphRoutes.js";

const app = express();

app.use(
  cors({
    origin: "*"
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// API root + health endpoints
app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SkillGraph API is running",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SkillGraph API is running",
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use("/api/jobs", jobRoutes);

app.use("/api/users", userRoutes);

app.use("/api/graph", graphRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

export default app;