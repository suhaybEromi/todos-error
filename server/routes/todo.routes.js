import express from "express";
const router = express.Router();
import todoController from "../controllers/todo.controller.js";

router.get("/", todoController.getTodos);
router.get("/:id", todoController.getTodosById);
router.post("/add-todo", todoController.addTodo);
router.put("/update-todo", todoController.updateTodo);
router.delete("/delete-todo", todoController.deleteTodo);

export default router;
