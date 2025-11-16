import React from 'react';
import '../styles/placeholder.css';

const SpaceQuizPage = () => {
  return (
    <div className="placeholder-page">
      <div className="video-background">
        <video autoPlay muted loop className="background-video" playsInline>
          <source src="/video/solar-system.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="placeholder-content">
        <div className="container">
          <div className="placeholder-card">
            <div className="placeholder-icon">🧠</div>
            <h1>Космическая викторина</h1>
            <p>Проверьте свои знания о космосе!</p>
            <div className="placeholder-features">
              <div className="feature">
                <span className="feature-icon">❓</span>
                <span>Интересные вопросы</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⭐</span>
                <span>Разные уровни сложности</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🏆</span>
                <span>Достижения и звания</span>
              </div>
            </div>
            <p className="coming-soon">Раздел в разработке</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceQuizPage;