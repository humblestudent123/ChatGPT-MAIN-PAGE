import React, { useState } from "react";
import bcrypt from "bcryptjs";

export default function Register({ onRegister, toggleAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Проверка email
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      setError("Введите корректный email");
      return;
    }

    // Проверка пароля
    if (password.length < 6) {
      setError("Пароль должен быть не меньше 6 символов");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Проверка на существующего пользователя
    if (users.find(u => u.email === email)) {
      setError("Пользователь с таким email уже существует");
      return;
    }

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { id: Date.now(), email, password: hashedPassword };
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

          <button type="submit" className="btn-primary">Зарегистрироваться</button>
        </form>

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
            Уже есть аккаунт? Войти
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
