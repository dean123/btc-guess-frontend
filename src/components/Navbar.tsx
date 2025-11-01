import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors no-underline"
          >
            BTC Guess
          </Link>
          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <span className="text-gray-400 text-sm">
                  Welcome, {user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-cyan-400 hover:bg-cyan-500 text-gray-900 px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors no-underline font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-cyan-400 hover:bg-cyan-500 text-gray-900 px-4 py-2 rounded-lg font-semibold transition-colors no-underline"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
