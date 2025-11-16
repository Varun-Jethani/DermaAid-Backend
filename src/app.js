import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173","http://localhost:5174","http://localhost:3000",process.env.FRONTEND_URL, process.env.ADMIN_URL],
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import historyRouter from "./routes/history.routes.js";

app.use("/api/users", userRouter);
app.use("/api/history", historyRouter);

export default app;