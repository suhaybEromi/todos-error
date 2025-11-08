import { Link } from "react-router-dom";

const TodoList = ({ todos, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {todos.length === 0 && <p>No todos found.</p>}
      {todos.map(todo => (
        <div
          key={todo._id}
          className="border p-3 rounded-lg shadow-sm flex justify-between items-start bg-gray-50"
        >
          <div>
            <h3 className="font-bold text-lg">{todo.title}</h3>
            <p className="text-sm text-gray-600">{todo.type}</p>
            <p>
              Status: <strong>{todo.status}</strong>
            </p>
            {todo.imageUrl && (
              <img
                src={`${import.meta.env.VITE_API_IMAGE}${todo.imageUrl}`}
                alt="Todo"
                className="w-24 h-24 mt-2 rounded object-cover"
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Link
              to={`/todo/${todo._id}`}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-center"
            >
              View
            </Link>
            <button
              onClick={() => onEdit(todo)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
