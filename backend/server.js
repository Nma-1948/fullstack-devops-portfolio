import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import registerRoutes from "./routes/register.js";
import adminRoutes from "./routes/admin.js";
import contactRoutes from "./routes/contact.js";
import loginRoutes from "./routes/login.js";

import { accessLogger, errorLogger } from "./middleware/logger.js";

dotenv.config();

const app = express();

app.set("trust proxy", true);

app.use(cors());

app.use(
  morgan("combined", {
    stream: accessLogger.stream,
  })
);

app.use(express.json());

app.use(helmet());

app.use("/api/contact", contactRoutes);

app.use("/api/register", registerRoutes);

app.use("/api/login", loginRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/api/test401", (req, res) => {
  return res.status(401).json({
    success: false,
    message: "Unauthorized test",
  });
});

app.use("/api/admin", adminRoutes);

app.use((err, req, res, next) => {
  errorLogger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
  });

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});
