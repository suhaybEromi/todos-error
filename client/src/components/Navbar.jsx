import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-linear-to-bt from-gray-950 to-indigo-950 mb-1">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">Todo List</h1>

        {/* Mobile Toggle Button */}
        <button
          className="text-white md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`
            absolute md:static left-0 top-14 w-full md:w-auto bg-gray-900 md:bg-transparent 
            md:flex md:space-x-6 z-50 px-6 md:px-0 py-4 md:py-0 
            transition-all duration-300 
            ${
              open
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0 overflow-hidden md:max-h-none md:opacity-100"
            }
          `}
        >
          {user && (
            <>
              <li className="py-2 md:py-0">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `hover:text-indigo-400 transition text-lg ${
                      isActive ? "text-indigo-500 font-semibold" : "text-white"
                    }`
                  }
                >
                  Todos
                </NavLink>
              </li>

              <li className="py-2 md:py-0">
                <NavLink
                  to="/add-todo"
                  className={({ isActive }) =>
                    `hover:text-indigo-400 transition text-lg ${
                      isActive ? "text-indigo-500 font-semibold" : "text-white"
                    }`
                  }
                >
                  Add Todo
                </NavLink>
              </li>
            </>
          )}

          {/* Auth Links (mobile view inside menu) */}
          {!user && (
            <>
              <li className="py-2 md:py-0">
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg font-medium transition block md:hidden ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "text-white hover:text-indigo-400"
                    }`
                  }
                >
                  Sign In
                </NavLink>
              </li>
              <li className="py-2 md:py-0">
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg font-medium transition block md:hidden ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "text-white hover:text-indigo-400"
                    }`
                  }
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Right-side Auth Buttons (Desktop Only) */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
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
                      ? "bg-indigo-600 text-white"
                      : "text-white hover:text-indigo-400"
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
                      ? "bg-indigo-600 text-white"
                      : "text-white hover:text-indigo-400"
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
