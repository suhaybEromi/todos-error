import TodoSection from "./TodoSection";

const TodoList = ({ todos, onDelete }) => {
  const inProgressTodos = todos.filter(todo => todo.status === "In Progress");
  const completeTodos = todos.filter(todo => todo.status === "Complete");

  return (
    <div className="mt-10">
      {todos.length === 0 && <p className="text-white">No todos found.</p>}

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
