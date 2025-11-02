import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-indigo-600">FastAuth</h1>
          <div className="space-x-4">
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                `font-medium ${
                  isActive
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-500"
                }`
              }
            >
              Sign in
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `font-medium ${
                  isActive
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-500"
                }`
              }
            >
              Sign up
            </NavLink>
          </div>
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
