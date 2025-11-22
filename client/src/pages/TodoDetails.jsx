import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import LoadingScreen from "../components/LoadingScreen";
import { motion } from "framer-motion";

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

  if (loading)
    return (
      <div class="flex items-center justify-center">
        <div class="h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-400 mt-5 border-t-transparent"></div>
      </div>
    );
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!todo) return <p>No data found.</p>;

  return (
    <div className="bg-linear-to-r from-gray-950 to-indigo-950 min-h-screen p-4 sm:p-6 text-white">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto mb-4 sm:mb-6">
        <Link
          to="/"
          className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 text-sm sm:text-base"
        >
          ← Back
        </Link>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-0">
        {/* Header (Mobile Friendly Layout) */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-6">
          <h1 className="text-2xl sm:text-3xl font-bold">{todo.title}</h1>

          <span className="text-gray-400 text-base sm:text-xl">
            {todo.createdAt
              ? new Date(todo.createdAt).toLocaleDateString()
              : "Not available"}
          </span>

          {todo.type && (
            <span className="bg-indigo-900 px-3 py-1 rounded-lg text-sm sm:text-base">
              {todo.type}
            </span>
          )}
        </div>

        {/* Description */}
        {todo.description && (
          <p className="text-gray-300 whitespace-pre-wrap wrap-break-word overflow-hidden mt-2 text-sm sm:text-base">
            {todo.description}
          </p>
        )}

        {/* Problem Steps */}
        {todo.problemSteps && (
          <div className="mt-10">
            <h3 className="text-lg sm:text-xl font-semibold">Problem Steps</h3>
            <pre className="text-gray-300 text-sm whitespace-pre-wrap wrap-break-word overflow-hidden mt-2">
              {todo.problemSteps}
            </pre>
          </div>
        )}

        {/* Fix Steps */}
        {todo.fixSteps && (
          <div className="mt-12 mb-20">
            <h3 className="text-lg sm:text-xl font-semibold">Fix Steps</h3>
            <pre className="text-gray-300 text-sm whitespace-pre-wrap wrap-break-word overflow-hidden mt-2">
              {todo.fixSteps}
            </pre>
          </div>
        )}

        {/* Code Block (mobile scrollable) */}
        {todo.code && (
          <div>
            <h3 className="text-lg sm:text-xl font-semibold">Code</h3>
            <div className="overflow-x-auto rounded-lg">
              <SyntaxHighlighter language="javascript" style={atomDark}>
                {todo.code}
              </SyntaxHighlighter>
            </div>
          </div>
        )}

        {/* Image */}
        {todo.imageUrl && (
          <div className="flex justify-center">
            {todo.imageUrl.endsWith(".txt") ? (
              <a
                href={`${import.meta.env.VITE_API_IMAGE}${todo.imageUrl}`}
                target="_blank"
                className="text-blue-400 underline text-sm sm:text-base"
              >
                View Text File
              </a>
            ) : (
              <img
                src={`${import.meta.env.VITE_API_IMAGE}${todo.imageUrl}`}
                alt="Todo"
                className="rounded-2xl max-w-full sm:max-w-xs"
                onError={e => (e.target.style.display = "none")}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoDetails;
