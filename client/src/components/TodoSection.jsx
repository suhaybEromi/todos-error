import { MdDelete } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";
import TableStyle from "./TableStyle";
import { useNavigate } from "react-router-dom";

export default function TodoSection({
  todos,
  title,
  onDelete,
  className,
  icon,
}) {
  const navigate = useNavigate();

  return (
    <div className={className}>
      {todos.length > 0 && (
        <div>
          <TableStyle todos={title} />
          {todos.map(todo => (
            <div
              key={todo._id}
              className="grid grid-cols-26 w-315 mx-auto text-[15px]"
            >
              <div className="col-span-8">
                <p className="px-4 py-2 border border-gray-300">{todo.title}</p>
              </div>

              <div className="col-span-3">
                <p className="px-4 py-2 border border-gray-300">
                  {icon} {todo.status}
                </p>
              </div>

              <div className="col-span-4">
                <p className="px-4 py-2 border border-gray-300">{todo.type}</p>
              </div>

              <div className="col-span-5">
                <p className="px-4 py-2 border border-gray-300">
                  {todo.createdAt
                    ? new Date(todo.createdAt).toLocaleString()
                    : "Not available"}
                </p>
              </div>

              <div className="col-span-2 text-center">
                <p className="px-4 py-2 border border-gray-300">
                  <button
                    className="cursor-pointer"
                    onClick={() => navigate(`/todo/${todo._id}`)}
                  >
                    <FaEye className="mx-auto text-blue-400 text-lg" />
                  </button>
                </p>
              </div>

              <div className="col-span-2 text-center">
                <p className="px-4 py-2 border border-gray-300">
                  <button
                    className="cursor-pointer"
                    onClick={() => navigate(`/edit-todo/${todo._id}`)}
                  >
                    <FaEdit className="mx-auto text-blue-600 text-lg" />
                  </button>
                </p>
              </div>

              <div className="col-span-2 text-center">
                <p className="px-4 py-2 border border-gray-300 text-red-600">
                  <button
                    className="cursor-pointer"
                    onClick={() => onDelete(todo._id)}
                  >
                    <MdDelete className="mx-auto text-lg" />
                  </button>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
