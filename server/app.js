import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
dotenv.config();
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;
const PREFIX = process.env.API_PREFIX;

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: "*",
  }),
);
app.use(express.json());

import userRoutes from "./routes/user.routes.js";
import todoRoutes from "./routes/todo.routes.js";

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(`/${PREFIX}`, userRoutes);
app.use(`/${PREFIX}`, todoRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection success");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.log("Database connection failed:", err);
  }
};

connectDB();
