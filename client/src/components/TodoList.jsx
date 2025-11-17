import { Link } from "react-router-dom";
import TodoSection from "./TodoSection";

const TodoList = ({ todos, onDelete }) => {
  const inProgressTodos = todos.filter(todo => todo.status === "In Progress");
  const completeTodos = todos.filter(todo => todo.status === "Complete");

  if (todos.length === 0)
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <h2 className="text-white text-2xl font-semibold mt-6 font-poppins">
          No Todos Found
        </h2>

        <p className="text-gray-300 mt-2 font-light">
          Start by creating your first task.
        </p>

        <Link
          to="/add-todo"
          className="mt-6 px-6 py-2 bg-sky-600 hover:bg-sky-700 transition rounded-xl font-medium"
        >
          + Add New Todo
        </Link>
      </div>
    );

  return (
    <div className="mt-10">
      <TodoSection
        icon="⏳"
        title="Active Task"
        todos={inProgressTodos}
        onDelete={onDelete}
      />

      <TodoSection
        className="mt-25"
        icon="✅"
        title="Complete Task"
        todos={completeTodos}
        onDelete={onDelete}
      />
    </div>
  );
};

export default TodoList;
