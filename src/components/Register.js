import { useState } from "react";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="hero">
      <h1>Регистрация</h1>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ marginBottom: '15px', padding: '10px', borderRadius: '8px', border: '1px solid #444' }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ marginBottom: '15px', padding: '10px', borderRadius: '8px', border: '1px solid #444' }}
        />
        <button type="submit" className="btn-primary">Зарегистрироваться</button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
}
