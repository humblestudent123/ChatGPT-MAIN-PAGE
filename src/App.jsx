import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) setUser(currentUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  const toggleAuth = () => setIsRegister(prev => !prev);

  // Если пользователь не авторизован
  if (!user) {
    return (
      <div className="auth-page">
        {isRegister ? (
          <Register onRegister={setUser} toggleAuth={toggleAuth} />
        ) : (
          <Login onLogin={setUser} toggleAuth={toggleAuth} />
        )}
      </div>
    );
  }

  // Если пользователь авторизован
  return (
    <div className="page">
      <header className="header">
        <div className="logo">MyService</div>
        <button
          onClick={handleLogout}
          className="btn-primary"
          style={{ fontSize: "14px", padding: "8px 15px" }}
        >
          Выйти
        </button>
      </header>

      <ProtectedRoute user={user}>
        <section className="hero">
          <h1>Привет, {user.email}!</h1>
          <p>Ты вошел в систему. Твой ID: {user.id}</p>
        </section>
      </ProtectedRoute>
    </div>
  );
}
