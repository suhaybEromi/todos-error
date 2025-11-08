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
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-xl space-y-5">
      {/* Back button */}
      <Link
        to="/"
        className="inline-block bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
      >
        ← Back
      </Link>

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800">{todo.title}</h2>

      {/* ID */}
      <p className="text-sm text-gray-500">ID: {todo._id}</p>

      {/* Description */}
      <div>
        <h3 className="font-semibold text-lg">Description:</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{todo.description}</p>
      </div>

      {/* Problem Steps */}
      {todo.problemSteps && (
        <div>
          <h3 className="font-semibold text-lg">Problem Steps:</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">
            {todo.problemSteps}
          </pre>
        </div>
      )}

      {/* Fix Steps */}
      {todo.fixSteps && (
        <div>
          <h3 className="font-semibold text-lg">Fix Steps:</h3>
          <pre className="bg-green-50 p-3 rounded text-sm whitespace-pre-wrap">
            {todo.fixSteps}
          </pre>
        </div>
      )}

      {todo.type && (
        <div>
          <h3 className="font-semibold text-lg">Type</h3>
          <pre className="bg-green-50 p-3 rounded text-sm whitespace-pre-wrap">
            {todo.type}
          </pre>
        </div>
      )}

      {/* Code */}
      {todo.code && (
        <div>
          <h3 className="font-semibold text-lg">Code:</h3>
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {todo.code}
          </SyntaxHighlighter>
        </div>
      )}

      {/* Status */}
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

      {/* Dates */}
      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <strong>Created At:</strong>{" "}
          {todo.createdAt
            ? new Date(todo.createdAt).toLocaleString()
            : "Not available"}
        </p>
      </div>

      {/* Image */}
      {todo.imageUrl && (
        <div>
          <h3 className="font-semibold mb-1">Attached File:</h3>
          {todo.imageUrl.endsWith(".txt") ? (
            <a
              href={`${import.meta.env.VITE_API_IMAGE}${todo.imageUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Text File
            </a>
          ) : (
            <img
              src={`${import.meta.env.VITE_API_IMAGE}${todo.imageUrl}`}
              alt="Todo"
              className="rounded-lg w-full max-w-md object-cover"
              onError={e => (e.target.style.display = "none")}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TodoDetails;
