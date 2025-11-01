import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex justify-center items-center bg-gray-800 p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-gray-800 text-3xl mb-6 text-center font-bold">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-gray-800 font-medium text-sm"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-cyan-400 text-base transition-colors"
              placeholder="Enter your username"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-gray-800 font-medium text-sm"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-cyan-400 text-base transition-colors"
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-cyan-400 text-gray-800 border-none px-3 py-2 rounded cursor-pointer text-base font-semibold transition-colors mt-2 hover:bg-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-400 no-underline font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
