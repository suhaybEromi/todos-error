import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthContextProvider, { AuthContext } from "./contexts/AuthContext";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { useContext, useEffect, useState } from "react";
import Todos from "./pages/Todos";
import TodoDetails from "./pages/TodoDetails";
import TodoForm from "./components/TodoForm";
import NotFound from "./components/NotFound";
import LoadingScreen from "./components/LoadingScreen";

function AppRoutes() {
  const { user, loading } = useContext(AuthContext);

  // 🔥 NEW — show loading only on refresh
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setInitialLoad(false), 500);
    return () => clearTimeout(t);
  }, []);

  if (initialLoad) return <LoadingScreen />; // First render
  if (loading) return <LoadingScreen />; // AuthContext checking token

  return (
    <div className="bg-linear-to-br from-gray-950 to-indigo-950 text-white min-h-screen">
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

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Todos />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />

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
