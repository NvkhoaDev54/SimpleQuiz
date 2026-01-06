const express = require("express");
const quizRoutes = require("./routes/quiz.route");
const authRoutes = require("./routes/auth.route");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*", // cho phép mọi origin (dev)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

module.exports = app;
