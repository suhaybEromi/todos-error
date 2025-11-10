import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContextProvider, { AuthContext } from "./contexts/AuthContext";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import Todos from "./pages/Todos";
import TodoDetails from "./pages/TodoDetails";
import TodoForm from "./components/TodoForm";
import BoardTodos from "./pages/BoardTodos";
import NotFound from "./components/NotFound";

function AppRoutes() {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <></>;

  return (
    <div className="bg-linear-to-br from-gray-950 to-sky-950 text-white min-h-screen">
      <Navbar />
      <hr className="-mt-1" />
      <Routes>
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" replace />}
        />
        <Route
          path="/signin"
          element={!user ? <Signin /> : <Navigate to="/" replace />}
        />

        <Route path="*" element={<NotFound />} />

        <Route
          path="/board-todos"
          element={
            <ProtectedRoute>
              <BoardTodos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/todo/:id"
          element={
            <ProtectedRoute>
              <TodoDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-todo"
          element={
            <ProtectedRoute>
              <TodoForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-todo/:id"
          element={
            <ProtectedRoute>
              <TodoForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Todos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </BrowserRouter>
  );
}
