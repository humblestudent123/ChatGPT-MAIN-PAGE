import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      onLogin(user);
    } else {
      setError("Неверный email или пароль");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Вход в систему</h1>
        <form onSubmit={handleLogin}>
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="auth-input"
          />

          {/* Пароль */}
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="auth-input"
          />

          {/* Checkbox показать пароль */}
          <label style={{ display: "block", marginBottom: "15px", fontSize: "14px" }}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(prev => !prev)}
              style={{ marginRight: "8px" }}
            />
            Показать пароль
          </label>

          <button type="submit" className="btn-primary">Войти</button>
          {error && <p>{error}</p>}
        </form>
      </div>

      <div
        className="auth-image"
        style={{
          background: "url('/chatGPT.png",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
}
