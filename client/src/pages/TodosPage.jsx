import { useEffect, useState } from "react";
import api from "../api/api";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
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

  const handleSuccess = () => {
    setSelectedTodo(null);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <p></p>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <TodoForm selectedTodo={selectedTodo} onSuccess={handleSuccess} />
      <TodoList
        todos={todos}
        onEdit={setSelectedTodo}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TodosPage;
