import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller.js";
import {
  validateSignup,
  validateSignin,
  handleValidationErrors,
} from "../validation/validateUser.js";

import auth from "../middlewares/authMiddleware.js";

router.post(
  "/signup",
  validateSignup,
  handleValidationErrors,
  userController.signup,
);
router.post(
  "/signin",
  validateSignin,
  handleValidationErrors,
  userController.signin,
);

router.get("/me", auth, userController.profile);

router.get("/refresh", userController.refresh);
router.post("/logout", userController.logout);

export default router;
