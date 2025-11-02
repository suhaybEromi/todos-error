import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // 🕓 Wait until we know if user is logged in
  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Checking session...
      </div>
    );

  // 🔐 Once loaded, redirect if no user
  if (!user) return <Navigate to="/signin" replace />;

  return children;
}
