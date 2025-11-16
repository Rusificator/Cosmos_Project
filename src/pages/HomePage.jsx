import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const HomePage = () => {
  const navigate = useNavigate();

  const startJourney = () => {
    navigate('/planets');
  };

  return (
    <div className="home-page">
      <div className="video-background">
        <video 
          autoPlay 
          muted 
          loop 
          className="background-video"
          playsInline
        >
          <source src="../public/video/solar-system.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        <div className="video-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="container">
          <h1 className="hero-title">
            Откройте <span className="highlight">тайны Вселенной</span>
          </h1>
          <p className="hero-subtitle">
            Отправьтесь в незабываемое путешествие по Солнечной системе 
            и за её пределы
          </p>
          <button 
            className="cta-button"
            onClick={startJourney}
          >
            <span className="cta-icon">🚀</span>
            Отправиться в путешествие
          </button>
        </div>
      </div>

      <section className="features-section">
        <div className="container">
          <h2>Что вас ждет?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🪐</div>
              <h3>Планеты Солнечной системы</h3>
              <p>Изучите все 8 планет с уникальными характеристиками и фотографиями</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Интересные факты</h3>
              <p>Узнайте удивительные научные открытия и космические явления</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔭</div>
              <h3>Космические миссии</h3>
              <p>Исследуйте исторические и современные космические экспедиции</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;