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

function AppRoutes() {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <></>;

  return (
    <>
      <Navbar />
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
              <Home />
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
          path="/todos"
          element={
            <ProtectedRoute>
              <Todos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
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
