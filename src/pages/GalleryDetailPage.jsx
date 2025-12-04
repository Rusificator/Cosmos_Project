import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../styles/gallery-detail.css';

const GalleryDetailPage = () => {
  const { imageId } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const galleryImages = [
    { 
      id: 1, 
      src: '/gallery/earth.jpg', 
      alt: 'Земля из космоса', 
      title: 'Голубая планета',
      description: 'Наша родная планета, вид из космоса. Более 70% поверхности покрыто водой.'
    },
    { 
      id: 2, 
      src: '/gallery/jupiter.jpg', 
      alt: 'Юпитер', 
      title: 'Газовый гигант',
      description: 'Крупнейшая планета Солнечной системы. Её масса в 2.5 раза превышает массу всех других планет вместе взятых.'
    },
    { 
      id: 3, 
      src: '/gallery/nebula.jpg', 
      alt: 'Туманность Ориона', 
      title: 'Колыбель звёзд',
      description: 'Одна из самых ярких туманностей, видимых невооруженным глазом. Расстояние: 1,344 световых года.'
    },
    { 
      id: 4, 
      src: '/gallery/mars.jpg', 
      alt: 'Марс', 
      title: 'Красная планета',
      description: 'Четвёртая планета от Солнца. Имеет самый большой вулкан в Солнечной системе - Олимп.'
    },
    { 
      id: 5, 
      src: '/gallery/saturn.jpg', 
      alt: 'Сатурн с кольцами', 
      title: 'Властелин колец',
      description: 'Планета с самой впечатляющей системой колец, состоящих из миллиардов частиц льда и камня.'
    },
    { 
      id: 6, 
      src: '/gallery/iss.jpg', 
      alt: 'Международная космическая станция', 
      title: 'Дом на орбите',
      description: 'Обитаемая космическая станция, вращающаяся на высоте 400 км. Скорость: 27,600 км/ч.'
    },
    { 
      id: 7, 
      src: '/gallery/andromeda.jpg', 
      alt: 'Галактика Андромеды', 
      title: 'Соседняя галактика',
      description: 'Ближайшая к Млечному Пути крупная галактика. Столкновение с нашей галактикой через 4.5 млрд лет.'
    },
    { 
      id: 8, 
      src: '/gallery/hubble.jpg', 
      alt: 'Снимок телескопа Хаббл', 
      title: 'Взгляд во Вселенную',
      description: 'Космический телескоп Хаббл сделал более 1.5 млн наблюдений за 30+ лет работы.'
    },
  ];

  useEffect(() => {
    // Находим изображение по ID из URL
    const image = galleryImages.find(img => img.id === parseInt(imageId));
    if (image) {
      setCurrentImage(image);
    } else {
      // Если изображение не найдено, перенаправляем на главную
      navigate('/');
    }
  }, [imageId, navigate]);

  const goToNextImage = () => {
    if (!currentImage) return;
    const currentIndex = galleryImages.findIndex(img => img.id === currentImage.id);
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    navigate(`/gallery/${galleryImages[nextIndex].id}`);
  };

  const goToPrevImage = () => {
    if (!currentImage) return;
    const currentIndex = galleryImages.findIndex(img => img.id === currentImage.id);
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    navigate(`/gallery/${galleryImages[prevIndex].id}`);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Управление клавиатурой
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'Escape':
          navigate('/');
          break;
        case 'ArrowRight':
          goToNextImage();
          break;
        case 'ArrowLeft':
          goToPrevImage();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentImage]);

  if (!currentImage) {
    return (
      <div className="gallery-detail-loading">
        <div className="loading-spinner"></div>
        <p>Загрузка изображения...</p>
      </div>
    );
  }

  return (
    <div className="gallery-detail-page">
      <header className="detail-header">
        <div className="container">
          <Link to="/" className="back-button">
            ← На главную
          </Link>
          <h1 className="detail-title">Космическая галерея</h1>
        </div>
      </header>

      <main className="detail-main">
        <div className="container">
          <div className="image-viewer">
            <button 
              className="nav-button prev-button"
              onClick={goToPrevImage}
              aria-label="Предыдущее изображение"
            >
              ←
            </button>
            
            <div className="image-container">
              {!imageLoaded && (
                <div className="loading-overlay">
                  <div className="loading-spinner"></div>
                  <p>Загрузка изображения...</p>
                </div>
              )}
              
              <img 
                src={currentImage.src} 
                alt={currentImage.alt}
                className={`detail-image ${imageLoaded ? 'loaded' : ''}`}
                onLoad={handleImageLoad}
                onError={() => setImageLoaded(true)}
              />
            </div>
            
            <button 
              className="nav-button next-button"
              onClick={goToNextImage}
              aria-label="Следующее изображение"
            >
              →
            </button>
          </div>

          <div className="image-info">
            <div className="info-header">
              <h2 className="image-title">{currentImage.title}</h2>
              <span className="image-counter">
                {galleryImages.findIndex(img => img.id === currentImage.id) + 1} / {galleryImages.length}
              </span>
            </div>
            
            <p className="image-description">{currentImage.description}</p>
            
            <div className="image-actions">
              <button 
                className="action-button download-button"
                onClick={() => window.open(currentImage.src, '_blank')}
              >
                <span className="button-icon">↗️</span>
                Открыть оригинал
              </button>
              
              <Link to="/" className="action-button close-button">
                <span className="button-icon">✕</span>
                Закрыть просмотр
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GalleryDetailPage;