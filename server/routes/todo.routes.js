import express from "express";
const router = express.Router();
import todoController from "../controllers/todo.controller.js";
import upload from "../middlewares/upload.js";
import auth from "../middlewares/authMiddleware.js";

import {
  handleValidationErrors,
  validateTodo,
  validateId,
} from "../validation/validateTodo.js";

router.get("/todo", auth, todoController.getTodos);

router.get(
  "/todo/:id",
  auth,
  validateId,
  handleValidationErrors,
  todoController.getTodosById,
);

router.post(
  "/add-todo",
  auth,
  upload.single("image"),
  validateTodo,
  handleValidationErrors,
  todoController.addTodo,
);

router.put(
  "/update-todo/:id",
  auth,
  upload.single("image"),
  validateId,
  validateTodo,
  handleValidationErrors,
  todoController.updateTodo,
);

router.delete(
  "/delete-todo/:id",
  auth,
  validateId,
  handleValidationErrors,
  todoController.deleteTodo,
);

export default router;
