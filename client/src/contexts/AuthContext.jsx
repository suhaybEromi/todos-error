import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const signup = async payload => {
    const res = await api.post("/auth/signup", payload);
    return res.data;
  };

  const signin = async payload => {
    const res = await api.post("/auth/signin", payload);
    if (res.data?.user) setUser(res.data.user);
    else setUser({ loggedIn: true });
    return res.data;
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    navigate("/signin");
  };

  // restore session on refresh
  useEffect(() => {
    const restoreSession = async () => {
      try {
        // try to refresh token
        await api.get("/auth/refresh");

        // now try to get user info
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        // if backend says unauthorized (401), that’s normal after logout
        if (err.response && [401, 404].includes(err.response.status)) {
          console.log("No active session — user is logged out.");
        } else {
          console.error("Error restoring session:", err);
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        signup,
        signin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
