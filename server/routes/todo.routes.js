import express from "express";
const router = express.Router();
import todoController from "../controllers/todo.controller.js";
import upload from "../middlewares/upload.js";

router.get("/todo", todoController.getTodos);
router.get("/todo/:id", todoController.getTodosById);
router.post("/add-todo", upload.single("image"), todoController.addTodo);
router.put(
  "/update-todo/:id",
  upload.single("image"),
  todoController.updateTodo,
);
router.delete("/delete-todo/:id", todoController.deleteTodo);

export default router;
