import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import TodoList from "../components/TodoList";
import TodoSearchDropdown from "../components/TodoSearchDropdown";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      setTodos(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // When user selects a suggestion from the dropdown
  const handleSelectSuggestion = todo => {
    // Option A: navigate to detail page
    navigate(`/todo/${todo._id}`);

    // Option B: filter list to that todo (comment Option A and uncomment below)
    // setTodos([todo]);

    // Option C: prepend to list if not already there
    // setTodos((prev) =>
    //   prev.some((t) => t._id === todo._id) ? prev : [todo, ...prev]
    // );
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-center mt-5">
        <TodoSearchDropdown onSelect={handleSelectSuggestion} />
      </div>

      {loading ? null : <TodoList todos={todos} onDelete={handleDelete} />}
    </div>
  );
};
export default Todos;
