import React, { useState } from "react";

export default function Login({ onLogin, toggleAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email);

    if (!user) {
      setError("Пользователь с таким email не найден");
      return;
    }

    if (user.password !== password) {
      setError("Неверный пароль");
      return;
    }

    // Авторизация успешна
    localStorage.setItem("currentUser", JSON.stringify(user));
    onLogin(user);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Вход</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="auth-input"
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="auth-input"
          />

          <label style={{ display: "block", marginBottom: "15px", fontSize: "14px" }}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(prev => !prev)}
              style={{ marginRight: "8px" }}
            />
            Показать пароль
          </label>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className="btn-primary">Войти</button>
        </form>

        {/* Переключатель на регистрацию */}
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <button
            type="button"
            onClick={toggleAuth}
            style={{
              background: "none",
              border: "none",
              color: "#7b5dff",
              cursor: "pointer",
              fontSize: "14px",
              textDecoration: "underline"
            }}
          >
            Нет аккаунта? Зарегистрироваться
          </button>
        </div>
      </div>

      <div
        className="auth-image"
        style={{ background: "url('/chatGPT.png') center/cover no-repeat" }}
      ></div>
    </div>
  );
}
