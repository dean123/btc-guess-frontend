import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { GuessProvider } from "./contexts/GuessContext";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Guess from "./components/Guess";

function Home() {
  return (
    <div className="bg-gray-800 min-h-screen">
      <Guess />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <GuessProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </GuessProvider>
    </AuthProvider>
  );
}

export default App;
