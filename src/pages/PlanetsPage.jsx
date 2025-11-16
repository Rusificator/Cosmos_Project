import React from 'react';
import '../styles/planets.css';

const PlanetsPage = () => {
  return (
    <div className="planets-page">
      <div className="video-background">
        <video 
          autoPlay 
          muted 
          loop 
          className="background-video"
          playsInline
        >
          <source src="/video/solar-system.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="planets-content">
        <div className="container">
          <h1 className="page-title">Планеты Солнечной системы</h1>
          <p className="page-subtitle">
            Исследуйте удивительные миры, вращающиеся вокруг нашего Солнца
          </p>
          
          <div className="planets-grid">
            <div className="planet-card">
              <div className="planet-image mercury"></div>
              <h3>Меркурий</h3>
              <p>Ближайшая к Солнцу планета</p>
              <button className="planet-btn">Исследовать</button>
            </div>
            
            <div className="planet-card">
              <div className="planet-image venus"></div>
              <h3>Венера</h3>
              <p>Планета с адской атмосферой</p>
              <button className="planet-btn">Исследовать</button>
            </div>
            
            <div className="planet-card">
              <div className="planet-image earth"></div>
              <h3>Земля</h3>
              <p>Наш дом в космосе</p>
              <button className="planet-btn">Исследовать</button>
            </div>
            
            <div className="planet-card">
              <div className="planet-image mars"></div>
              <h3>Марс</h3>
              <p>Красная планета</p>
              <button className="planet-btn">Исследовать</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetsPage;