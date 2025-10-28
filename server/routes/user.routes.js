import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller.js";

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/refresh", userController.refresh);
router.post("/logout", userController.logout);

export default router;
