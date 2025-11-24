import Todo from "../models/todo.js";
import deleteFile from "../utils/deleteFile.js";

// 🟢 Get all todos for logged-in user
const getTodos = async (req, res) => {
  const search = req.query.search || "";
  try {
    const query = { createdBy: req.user.id };

    if (search)
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { type: { $regex: search, $options: "i" } },
      ];

    const todos = await Todo.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json(todos);
  } catch (err) {
    console.error("Error getting todos:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Get single todo by ID
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.status(200).json(todo);
  } catch (err) {
    console.error("Error getting todo by id:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Add new todo
const addTodo = async (req, res) => {
  try {
    const { title, description, problemSteps, fixSteps, code, status, type } =
      req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const todo = new Todo({
      title,
      description,
      problemSteps,
      fixSteps,
      code,
      status,
      type,
      imageUrl,
      createdBy: req.user.id,
    });

    await todo.save();

    res.status(201).json({ message: "Todo created successfully", todo });
  } catch (err) {
    console.error("Error adding todo:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Update existing todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const existingTodo = await Todo.findOne({
      _id: id,
      createdBy: req.user.id,
    });
    if (!existingTodo)
      return res.status(404).json({ message: "Todo not found" });

    if (req.file && existingTodo.imageUrl) {
      await deleteFile(existingTodo.imageUrl);
    }

    const updatedFields = {
      ...req.body,
      imageUrl: req.file
        ? `/uploads/${req.file.filename}`
        : existingTodo.imageUrl,
    };

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true },
    );

    res
      .status(200)
      .json({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Delete todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (todo.imageUrl) await deleteFile(todo.imageUrl);

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export default { getTodos, getTodoById, addTodo, updateTodo, deleteTodo };
