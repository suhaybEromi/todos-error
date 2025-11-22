import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 4000;
const PREFIX = process.env.API_PREFIX;
const PREFIX_AUTH = process.env.API_AUTH_PREFIX;
import session from "express-session";
import passport from "./config/passport.js";

import userRoutes from "./routes/user.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import authRoutes from "./routes/auth.routes.js";

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Only true with HTTPS
      httpOnly: true, // Prevents JS access to cookies
      sameSite: "lax", // Helps with cross-site auth
      maxAge: 24 * 60 * 60 * 1000, // Optional: 1 day
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(`/${PREFIX}`, userRoutes);
app.use(`/${PREFIX}`, todoRoutes);
app.use(`/${PREFIX_AUTH}`, authRoutes);

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
