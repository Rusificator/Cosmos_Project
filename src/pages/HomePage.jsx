import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

import { initStatsAnimation, observeStats } from '../utils/animateNumbers';

const HomePage = () => {
  const navigate = useNavigate();
  const galleryRef = useRef(null);
  const statsRef = useRef(null);
  const timelineRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [timelineVisible, setTimelineVisible] = useState(false);

  const startJourney = () => {
    navigate('/planets');
  };

  const galleryImages = [
    { id: 1, src: '/gallery/earth.jpg', alt: 'Земля из космоса', title: 'Голубая планета' },
    { id: 2, src: '/gallery/jupiter.jpg', alt: 'Юпитер', title: 'Газовый гигант' },
    { id: 3, src: '/gallery/nebula.jpg', alt: 'Туманность Ориона', title: 'Колыбель звёзд' },
    { id: 4, src: '/gallery/mars.jpg', alt: 'Марс', title: 'Красная планета' },
    { id: 5, src: '/gallery/saturn.jpg', alt: 'Сатурн с кольцами', title: 'Властелин колец' },
    { id: 6, src: '/gallery/iss.jpg', alt: 'Международная космическая станция', title: 'Дом на орбите' },
    { id: 7, src: '/gallery/andromeda.jpg', alt: 'Галактика Андромеды', title: 'Соседняя галактика' },
    { id: 8, src: '/gallery/hubble.jpg', alt: 'Снимок телескопа Хаббл', title: 'Взгляд во Вселенную' },
  ];

  // Продублируем изображения для бесшовной анимации
  const allImages = [...galleryImages, ...galleryImages];

  const openImageDetail = (imageId) => {
    navigate(`/gallery/${imageId}`);
  };

  // Массив с событиями для timeline
  const timelineEvents = [
    { 
      year: '1957', 
      title: 'Первый искусственный спутник', 
      description: 'Советский Союз запускает Спутник-1, начало космической эры',
      icon: '🛰️'
    },
    { 
      year: '1961', 
      title: 'Первый человек в космосе', 
      description: 'Юрий Гагарин на корабле "Восток-1" совершает первый полет человека в космос',
      icon: '👨‍🚀'
    },
    { 
      year: '1969', 
      title: 'Первая высадка на Луну', 
      description: 'Аполлон-11, Нил Армстронг делает первые шаги по поверхности Луны',
      icon: '🌕'
    },
    { 
      year: '1971', 
      title: 'Первая орбитальная станция', 
      description: 'Запуск станции Салют-1, первая в мире орбитальная станция',
      icon: '🛸'
    },
    { 
      year: '1990', 
      title: 'Телескоп Хаббл', 
      description: 'Запуск космического телескопа Хаббл, революция в астрономии',
      icon: '🔭'
    },
    { 
      year: '1998', 
      title: 'Начало МКС', 
      description: 'Запуск первого модуля Международной космической станции',
      icon: '🚀'
    },
    { 
      year: '2012', 
      title: 'Марсоход Curiosity', 
      description: 'Марсоход успешно садится на Марс и начинает исследования',
      icon: '🤖'
    },
    { 
      year: '2021', 
      title: 'Первые туристы в космосе', 
      description: 'Компании SpaceX и Blue Origin отправляют первых космических туристов',
      icon: '👩‍🚀'
    }
  ];

  // Наблюдатель за появлением статистики
  useEffect(() => {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        statsObserver.unobserve(statsRef.current);
      }
    };
  }, []);

  // Наблюдатель за появлением timeline
  useEffect(() => {
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimelineVisible(true);
            timelineObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (timelineRef.current) {
      timelineObserver.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        timelineObserver.unobserve(timelineRef.current);
      }
    };
  }, []);

  // Запуск анимации чисел
  useEffect(() => {
    if (statsVisible) {
      const timer = setTimeout(() => {
        initStatsAnimation();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [statsVisible]);

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
          <source src="/video/solar-system.mp4" type="video/mp4" />
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

      {/* Секция "Космический прогресс" (Timeline) */}
      <section className="timeline-section" ref={timelineRef}>
        <div className="container">
          <div className="timeline-header">
            <h2>Космический прогресс</h2>
            <p className="timeline-subtitle">
              Ключевые вехи в освоении космоса: от первых спутников до межзвездных миссий
            </p>
          </div>
          
          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            {timelineEvents.map((event, index) => (
              <div 
                className={`timeline-item ${timelineVisible ? 'visible' : ''}`} 
                key={index}
                style={{ '--index': index }}
              >
                <div className="timeline-marker">
                  <div className="marker-icon">{event.icon}</div>
                  <div className="marker-year">{event.year}</div>
                </div>
                
                <div className="timeline-content">
                  <h3 className="timeline-title">{event.title}</h3>
                  <p className="timeline-description">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="timeline-note">
            <p>История продолжается: новые миссии планируются каждый год</p>
          </div>
        </div>
      </section>

      {/* Секция интерактивной статистики */}
      <section className="statistics-section" ref={statsRef}>
        <div className="container">
          <div className="statistics-header">
            <h2>Космос в цифрах</h2>
            <p className="statistics-subtitle">
              Удивительные факты о нашей Вселенной, которые заставят вас задуматься
            </p>
          </div>
          
          <div className="statistics-grid">
            <div className="stat-item">
              <div className="stat-line"></div>
              <div className="stat-icon">🪐</div>
              <div className="stat-number-container">
                <span className="stat-number" data-target="8">
                  {statsVisible ? '0' : '0'}
                </span>
              </div>
              <div className="stat-label">
                <span className="stat-label-main">планет</span>
                <span className="stat-label-sub">в Солнечной системе</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-line"></div>
              <div className="stat-icon">🌕</div>
              <div className="stat-number-container">
                <span className="stat-number" data-target="200">
                  {statsVisible ? '0' : '0'}
                </span>
              </div>
              <div className="stat-label">
                <span className="stat-label-main">спутников</span>
                <span className="stat-label-sub">вращается вокруг планет</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-line"></div>
              <div className="stat-icon">☄️</div>
              <div className="stat-number-container">
                <span className="stat-number" data-target="500000">
                  {statsVisible ? '0' : '0'}
                </span>
                <span className="stat-plus">+</span>
              </div>
              <div className="stat-label">
                <span className="stat-label-main">космических объектов</span>
                <span className="stat-label-sub">отслеживается NASA</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-line"></div>
              <div className="stat-icon">🚀</div>
              <div className="stat-number-container">
                <span className="stat-number" data-target="197">
                  {statsVisible ? '0' : '0'}
                </span>
              </div>
              <div className="stat-label">
                <span className="stat-label-main">космических миссий</span>
                <span className="stat-label-sub">успешно выполнено</span>
              </div>
            </div>
          </div>
          
          <div className="statistics-note">
            <p>Все числа основаны на актуальных научных данных и обновляются по мере получения новой информации</p>
          </div>
        </div>
      </section>

      {/* Секция галереи */}
      <section className="auto-gallery-section">
        <div className="container">
          <div className="gallery-header">
            <h2>Космос в объективе</h2>
            <p className="gallery-subtitle">
              Самые впечатляющие фотографии космоса, сделанные телескопами и космическими аппаратами
            </p>
          </div>
          
          <div className="gallery-container">
            <div className="gallery-track" ref={galleryRef}>
              {allImages.map((image, index) => (
                <div 
                  className="gallery-item" 
                  key={`${image.id}-${index}`}
                  onClick={() => openImageDetail(image.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openImageDetail(image.id)}
                  aria-label={`Открыть ${image.title} в полном размере`}
                >
                  <div className="image-wrapper">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      loading="lazy"
                    />
                    <div className="image-overlay">
                      <span className="image-title">{image.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="gallery-controls">
            <div className="control-info">
              <span className="control-icon">🌍</span>
              <span>Впечатляющие изображения</span>
            </div>
            <button 
              className="view-gallery-btn"
              onClick={() => navigate('/gallery')}
            >
              <span className="btn-icon">📷</span>
              Смотреть всю галерею
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;