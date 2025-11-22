import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Signin = () => {
  const { signin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await signin(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signin failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-indigo-50 to-blue-100 text-black">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Create one
          </Link>
        </p>

        <p className="text-center my-5 font-medium">or</p>

        <Link
          to={`${import.meta.env.VITE_API_URL}/auth/google`}
          className="flex items-center justify-center gap-2 border border-gray-600 text-black py-2 rounded-full hover:bg-black hover:text-white transition-all"
        >
          <FaGoogle className="text-red-500" />
          Continue with Google
        </Link>

        <Link
          to={`${import.meta.env.VITE_API_URL}/auth/github`}
          className="flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded-full hover:bg-black transition-all mt-3"
        >
          <FaGithub />
          Continue with GitHub
        </Link>
      </div>
    </div>
  );
};

export default Signin;
