import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import compress from "compression";
import path from "path";

import config from "./config/config";

const app = express();

// 1. Imports All Routes
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";

// 2. Imports All Controllers
import globalErrorHandler from "./controllers/errorController";

// 3. Define Attributes

// 4. Configure settings
app.set("port", config.port);

// 5. Define middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// 6. Define routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

if (config.env === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("App runnning on development envirenment...");
  });
}

// 7. Handle Error
// Catch unauthorised errors
app.use(globalErrorHandler);

export default app;
