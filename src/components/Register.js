import React, { useState } from "react";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // состояние для чекбокса
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === email)) {
      setError("Пользователь с таким email уже существует");
      return;
    }

    const newUser = { id: Date.now(), email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    onRegister(newUser);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Регистрация</h1>
        <form onSubmit={handleRegister}>
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

          <button type="submit" className="btn-primary">Зарегистрироваться</button>
          {error && <p>{error}</p>}
        </form>
      </div>

      <div
        className="auth-image"
        style={{
          background: "url('/chatgpt-logo-chat-gpt-icon-on-black-background-free-vector.jpg') center/cover no-repeat"
        }}
      ></div>
    </div>
  );
}
