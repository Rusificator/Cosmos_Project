import React, { useState } from 'react';
import '../styles/gallery.css';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      id: 1,
      title: "Туманность Ориона",
      description: "Облако межзвездного газа и пыли, место активного звездообразования.",
      category: "Туманности",
      image: "orion-nebula.jpg"
    },
    {
      id: 2,
      title: "Галактика Андромеды",
      description: "Ближайшая к Млечному Пути крупная галактика.",
      category: "Галактики",
      image: "andromeda.jpg"
    },
    {
      id: 3,
      title: "Кольцевая туманность",
      description: "Планетарная туманность в созвездии Лиры.",
      category: "Туманности",
      image: "ring-nebula.jpg"
    },
    {
      id: 4,
      title: "Столпы творения",
      description: "Скопления межзвездного газа и пыли в туманности Орёл.",
      category: "Туманности",
      image: "pillars-of-creation.jpg"
    },
    {
      id: 5,
      title: "Галактика Сомбреро",
      description: "Спиральная галактика в созвездии Девы.",
      category: "Галактики",
      image: "sombrero-galaxy.jpg"
    },
    {
      id: 6,
      title: "Крабовидная туманность",
      description: "Остаток сверхновой звезды в созвездии Тельца.",
      category: "Туманности",
      image: "crab-nebula.jpg"
    },
    {
      id: 7,
      title: "Центавр A",
      description: "Линзообразная галактика в созвездии Центавра.",
      category: "Галактики",
      image: "centaurus-a.jpg"
    },
    {
      id: 8,
      title: "Туманность Кошачий глаз",
      description: "Одна из самых сложных по структуре планетарных туманностей.",
      category: "Туманности",
      image: "cat-eye-nebula.jpg"
    },
    {
      id: 9,
      title: "Галактика Водоворот",
      description: "Взаимодействующая галактика в созвездии Гончие Псы.",
      category: "Галактики",
      image: "whirlpool-galaxy.jpg"
    }
  ];

  const categories = ["Все", "Туманности", "Галактики"];
  const [activeCategory, setActiveCategory] = useState("Все");

  const filteredImages = activeCategory === "Все" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-page">
      <div className="video-background">
        <video autoPlay muted loop className="background-video" playsInline>
          <source src="/video/solar-system.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="gallery-content">
        <div className="container">
          <h1 className="page-title">Космическая галерея</h1>
          <p className="page-subtitle">
            Удивительные фотографии космоса, сделанные телескопами NASA и ESA
          </p>

          {/* Фильтры по категориям */}
          <div className="gallery-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Сетка изображений */}
          <div className="gallery-grid">
            {filteredImages.map(image => (
              <div 
                key={image.id} 
                className="gallery-item"
                onClick={() => openModal(image)}
              >
                <div className="image-placeholder">
                  <div className="image-category">{image.category}</div>
                </div>
                <div className="image-info">
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Модальное окно для просмотра изображения */}
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            <div className="modal-image-placeholder">
              <div className="modal-category">{selectedImage.category}</div>
            </div>
            <div className="modal-info">
              <h2>{selectedImage.title}</h2>
              <p>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;