import React from "react";
import "../src/index.css";

export default function App() {
  return (
    <div className="page">
      <header className="header">
        <div className="logo">MyService</div>

        <nav className="nav">
          <a href="#features">Возможности</a>
          <a href="#about">О нас</a>
          <a href="#contact">Контакты</a>
        </nav>
      </header>

      <section className="hero">
        <h1>Сервис будущего, который работает на тебя</h1>
        <p>Быстро. Удобно. Умно. Современная платформа нового поколения.</p>
        <button className="btn-primary">Начать сейчас</button>
      </section>

      <section id="features" className="features">
        <h2>Возможности сервиса</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <span className="icon">⚡</span>
            <h3>Скорость</h3>
            <p>Молниеносная обработка данных и высокая стабильность работы.</p>
          </div>

          <div className="feature-card">
            <span className="icon">✨</span>
            <h3>Удобство</h3>
            <p>Интуитивный интерфейс, понятный каждому пользователю.</p>
          </div>

          <div className="feature-card">
            <span className="icon">🤝</span>
            <h3>Поддержка</h3>
            <p>Мы всегда рядом и готовы помочь в любой ситуации.</p>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <h2>О сервисе</h2>
        <p>
          Мы создаём инновационные решения, которые помогают пользователям достигать большего. 
          Наш подход основан на простоте, скорости и современном дизайне.
        </p>
      </section>

      <footer className="footer" id="contact">
        © {new Date().getFullYear()} MyService • Все права защищены
      </footer>
    </div>
  );
}
