import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const signup = async payload => {
    const res = await api.post("/signup", payload);
    return res.data;
  };

  const signin = async payload => {
    const res = await api.post("/signin", payload);
    if (res.data?.user) setUser(res.data.user);
    else setUser({ loggedIn: true });
    return res.data;
  };

  const logout = async () => {
    await api.post("/logout");
    setUser(null);
    navigate("/signin");
  };

  // restore session on refresh
  useEffect(() => {
    const restoreSession = async () => {
      try {
        await api.get("/refresh"); // refresh access token silently
        const res = await api.get("/me"); // get current user info
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, signup, signin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
