import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const TodoDetails = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await api.get(`/todo/${id}`);
        setTodo(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch todo");
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!todo) return <p>No data found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-xl space-y-4">
      <Link
        to="/"
        className="inline-block bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
      >
        ← Back
      </Link>

      <h2 className="text-2xl font-bold text-gray-800">{todo.title}</h2>

      <p className="text-gray-600">
        <strong>Description:</strong> {todo.description}
      </p>

      <div>
        <h3 className="font-semibold">Problem Steps:</h3>
        <pre className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">
          {todo.problemSteps}
        </pre>
      </div>

      <div>
        <h3 className="font-semibold">Fix Steps:</h3>
        <pre className="bg-green-50 p-3 rounded text-sm whitespace-pre-wrap">
          {todo.fixSteps}
        </pre>
      </div>

      <div>
        <h3 className="font-semibold">Code:</h3>
        <SyntaxHighlighter language="javascript" style={atomDark}>
          {todo.code}
        </SyntaxHighlighter>
      </div>

      <p>
        <strong>Status:</strong>{" "}
        <span
          className={`${
            todo.status === "resolved" ? "text-green-600" : "text-yellow-600"
          } font-semibold`}
        >
          {todo.status}
        </span>
      </p>

      {todo.imageUrl && (
        <div>
          <h3 className="font-semibold mb-1">Attached Image:</h3>
          <img
            src={`${import.meta.env.VITE_API_IMAGE}${todo.imageUrl}`}
            alt="Todo"
            className="rounded-lg w-full max-w-md object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default TodoDetails;
