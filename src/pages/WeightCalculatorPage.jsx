import React from 'react';
import '../styles/placeholder.css';

const WeightCalculatorPage = () => {
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
            <div className="placeholder-icon">⚖️</div>
            <h1>Калькулятор веса на планетах</h1>
            <p>Сколько бы вы весили на других планетах?</p>
            <div className="placeholder-features">
              <div className="feature">
                <span className="feature-icon">🌍</span>
                <span>Вес на Земле</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🪐</span>
                <span>Вес на других планетах</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🚀</span>
                <span>Интересные сравнения</span>
              </div>
            </div>
            <p className="coming-soon">Раздел в разработке</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightCalculatorPage;