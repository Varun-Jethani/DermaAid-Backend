import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();
// Build a clean allowlist for CORS (filter out undefined env vars)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g. mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'), false);
  },
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
};

app.use(cors(corsOptions));
// Ensure OPTIONS preflight requests are handled for all routes
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import historyRouter from "./routes/history.routes.js";

app.use("/api/users", userRouter);
app.use("/api/history", historyRouter);

export default app;