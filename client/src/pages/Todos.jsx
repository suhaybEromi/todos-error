import { useEffect, useState } from "react";
import api from "../api/api";
import TodoList from "../components/TodoList";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const res = await api.get("/todo");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;
    try {
      await api.delete(`/delete-todo/${id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      {loading ? (
        <div class="flex items-center justify-center">
          <div class="h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-400 mt-5 border-t-transparent"></div>
        </div>
      ) : (
        <TodoList todos={todos} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Todos;
