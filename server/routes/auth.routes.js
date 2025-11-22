import express from "express";
import passport from "passport";

const router = express.Router();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
import userController from "../controllers/user.controller.js";

// Google Login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${FRONTEND_URL}/signin?error=google`,
  }),
  userController.oauthSuccess,
);

// GitHub Login
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: `${FRONTEND_URL}/signin?error=github`,
  }),
  userController.oauthSuccess,
);

export default router;
