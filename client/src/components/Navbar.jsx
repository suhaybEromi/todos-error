import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold text-yellow-400">ErrorTodos</h1>

        {/* Navigation Links (only when logged in) */}
        {user && (
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-yellow-400 transition ${
                    isActive ? "text-yellow-400" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/todos"
                className={({ isActive }) =>
                  `hover:text-yellow-400 transition ${
                    isActive ? "text-yellow-400" : ""
                  }`
                }
              >
                Todos
              </NavLink>
            </li>
          </ul>
        )}

        {/* Right-side Auth Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition ${
                    isActive
                      ? "bg-yellow-400 text-gray-900"
                      : "text-white hover:text-yellow-400"
                  }`
                }
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition ${
                    isActive
                      ? "bg-yellow-400 text-gray-900"
                      : "text-white hover:text-yellow-400"
                  }`
                }
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
