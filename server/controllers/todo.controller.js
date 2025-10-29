import Todo from "../models/todo.js";
import deleteFile from "../utils/deleteFile.js";

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    if (!todos) return res.status(404).json({ message: "No todos found" });

    return res.status(200).json(todos);
  } catch (err) {
    console.log(err);
  }
};

const getTodosById = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    return res.status(200).json(todo);
  } catch (err) {
    console.log(err);
  }
};

const addTodo = async (req, res) => {
  try {
    const { title, description, problemSteps, fixSteps, code, status } =
      req.body;

    if (
      !title ||
      !description ||
      !problemSteps ||
      !fixSteps ||
      !code ||
      !status
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newTodo = new Todo({
      title,
      description,
      problemSteps,
      fixSteps,
      code,
      status,
      imageUrl,
      //   userId: req.user?._id,
    });

    await newTodo.save();

    return res.status(201).json({
      message: "Todo created successfully",
      todo: newTodo,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, problemSteps, fixSteps, code, status } =
      req.body;

    // 1️⃣ Find existing todo first
    const existingTodo = await Todo.findById(id);
    if (!existingTodo)
      return res.status(404).json({ message: "Todo not found" });

    // 2️⃣ If new image uploaded → delete old image
    if (req.file && existingTodo.imageUrl) {
      await deleteFile(existingTodo.imageUrl);
    }

    // 3️⃣ Prepare updated fields
    const updatedFields = {
      title,
      description,
      problemSteps,
      fixSteps,
      code,
      status,
      imageUrl: req.file
        ? `/uploads/${req.file.filename}`
        : existingTodo.imageUrl, // keep old image if no new file
    };

    // 4️⃣ Update todo
    const updatedTodo = await Todo.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    return res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!id) return res.status(404).json({ message: "Todo not found" });

    if (todo.imageUrl) {
      await deleteFile(todo.imageUrl);
    }

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};

export default { getTodos, getTodosById, addTodo, updateTodo, deleteTodo };
