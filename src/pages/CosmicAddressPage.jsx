import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/cosmic-address.css';

const CosmicAddressPage = () => {
  const [userAddress, setUserAddress] = useState({
    country: '',
    region: '',
    city: '',
    street: '',
    house: ''
  });
  const [cosmicAddress, setCosmicAddress] = useState([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [copyStatus, setCopyStatus] = useState(''); // 'idle', 'copying', 'success', 'error'
  const [imageStatus, setImageStatus] = useState(''); // 'idle', 'generating', 'success', 'error'

  // Полный космический адрес Земли
  const earthCosmicAddress = [
    { level: "Вселенная", name: "Наблюдаемая Вселенная", description: "Вся наблюдаемая материя и пространство" },
    { level: "Сверхскопление", name: "Сверхскопление Девы", description: "Гигантская структура диаметром 110 млн световых лет" },
    { level: "Галактическая нить", name: "Комплекс сверхскоплений Рыб-Кита", description: "Одна из крупнейших известных структур" },
    { level: "Сверхскопление", name: "Сверхскопление Девы", description: "Содержит около 100 галактических групп" },
    { level: "Местная группа", name: "Местная группа галактик", description: "Группа из 54 галактик, включая Млечный Путь и Андромеду" },
    { level: "Галактика", name: "Млечный Путь", description: "Спиральная галактика диаметром 100 000 световых лет" },
    { level: "Рукав", name: "Рукав Ориона", description: "Малый спиральный рукав, где расположено Солнце" },
    { level: "Звездное скопление", name: "Местный пузырь", description: "Область разреженного горячего газа" },
    { level: "Звездная система", name: "Солнечная система", description: "Планетная система с Солнцем в центре" },
    { level: "Планета", name: "Земля", description: "Третья планета от Солнца, единственная обитаемая" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateCosmicAddress = () => {
    if (!userAddress.country || !userAddress.city) {
      alert('Пожалуйста, заполните хотя бы страну и город');
      return;
    }

    const fullAddress = [
      ...earthCosmicAddress,
      { level: "Страна", name: userAddress.country, description: "Ваше государство" },
      { level: "Регион", name: userAddress.region, description: "Ваш регион или область" },
      { level: "Город", name: userAddress.city, description: "Ваш город или населенный пункт" },
      { level: "Улица", name: userAddress.street, description: "Ваша улица" },
      { level: "Дом", name: userAddress.house, description: "Ваш дом или здание" }
    ].filter(item => item.name); // Убираем пустые значения

    setCosmicAddress(fullAddress);
    setIsGenerated(true);
    
    // Прокрутка к результату
    setTimeout(() => {
      document.getElementById('cosmic-result').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 300);
  };

  const resetForm = () => {
    setUserAddress({
      country: '',
      region: '',
      city: '',
      street: '',
      house: ''
    });
    setIsGenerated(false);
    setCopyStatus('');
    setImageStatus('');
  };

  // Функция для копирования космического адреса в буфер обмена
  const copyCosmicAddress = async () => {
    if (!isGenerated || cosmicAddress.length === 0) return;

    setCopyStatus('copying');

    try {
      // Формируем красивый текстовый адрес
      const addressText = cosmicAddress
        .map((item, index) => {
          const prefix = `${index + 1}. ${item.level}:`;
          return `${prefix} ${item.name}`;
        })
        .join('\n');

      const fullText = `🌌 Мой космический адрес:\n\n${addressText}\n\nСгенерировано на Cosmic Explorer - исследуйте Вселенную!`;

      // Используем современный Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(fullText);
      } else {
        // Fallback для старых браузеров
        const textArea = document.createElement('textarea');
        textArea.value = fullText;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopyStatus('success');
      
      // Автоматически сбрасываем статус через 3 секунды
      setTimeout(() => {
        setCopyStatus('');
      }, 3000);

    } catch (error) {
      console.error('Ошибка при копировании:', error);
      setCopyStatus('error');
      
      setTimeout(() => {
        setCopyStatus('');
      }, 3000);
    }
  };

  // Функция для создания изображения (заглушка с улучшенным UX)
  const createCosmicImage = () => {
    setImageStatus('generating');
    
    // Имитация процесса создания изображения
    setTimeout(() => {
      setImageStatus('success');
      
      // Показываем сообщение о том, что функция в разработке
      alert('Функция создания изображения находится в разработке! 🎨\n\nСкоро вы сможете сохранить свой космический адрес как красивое изображение для социальных сетей.');
      
      setTimeout(() => {
        setImageStatus('');
      }, 2000);
    }, 1500);
  };

  // Получаем текст для кнопки копирования в зависимости от статуса
  const getCopyButtonText = () => {
    switch (copyStatus) {
      case 'copying': return '⏳ Копируем...';
      case 'success': return '✅ Скопировано!';
      case 'error': return '❌ Ошибка';
      default: return '📋 Скопировать адрес';
    }
  };

  // Получаем текст для кнопки изображения в зависимости от статуса
  const getImageButtonText = () => {
    switch (imageStatus) {
      case 'generating': return '⏳ Создаём...';
      case 'success': return '✅ Готово!';
      case 'error': return '❌ Ошибка';
      default: return '🖼️ Создать изображение';
    }
  };

  // Получаем класс для кнопки копирования в зависимости от статуса
  const getCopyButtonClass = () => {
    switch (copyStatus) {
      case 'success': return 'share-btn copy-btn success';
      case 'error': return 'share-btn copy-btn error';
      case 'copying': return 'share-btn copy-btn copying';
      default: return 'share-btn copy-btn';
    }
  };

  // Получаем класс для кнопки изображения в зависимости от статуса
  const getImageButtonClass = () => {
    switch (imageStatus) {
      case 'success': return 'share-btn image-btn success';
      case 'error': return 'share-btn image-btn error';
      case 'generating': return 'share-btn image-btn generating';
      default: return 'share-btn image-btn';
    }
  };

  return (
    <div className="cosmic-address-page">
      <div className="video-background">
        <video autoPlay muted loop className="background-video" playsInline>
          <source src="/video/solar-system.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="cosmic-address-content">
        <div className="container">
          {/* Навигация */}
          <nav className="cosmic-breadcrumb">
            <Link to="/" className="breadcrumb-link">Главная</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Космический адрес</span>
          </nav>

          {/* Заголовок */}
          <div className="cosmic-header">
            <h1 className="cosmic-title">Космический адрес</h1>
            <p className="cosmic-subtitle">
              Узнайте ваш полный адрес во Вселенной — от вашего дома до границ наблюдаемого космоса
            </p>
          </div>

          <div className="cosmic-layout">
            {/* Форма ввода */}
            <div className="address-form-section">
              <div className="form-card">
                <h2>Ваш земной адрес</h2>
                <p className="form-description">
                  Введите ваш адрес, и мы покажем ваше место во Вселенной
                </p>

                <div className="address-form">
                  <div className="form-group">
                    <label htmlFor="country">Страна *</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={userAddress.country}
                      onChange={handleInputChange}
                      placeholder="Например: Россия"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="region">Регион / Область</label>
                    <input
                      type="text"
                      id="region"
                      name="region"
                      value={userAddress.region}
                      onChange={handleInputChange}
                      placeholder="Например: Московская область"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="city">Город *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={userAddress.city}
                      onChange={handleInputChange}
                      placeholder="Например: Москва"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="street">Улица</label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={userAddress.street}
                      onChange={handleInputChange}
                      placeholder="Например: Ленина"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="house">Дом / Здание</label>
                    <input
                      type="text"
                      id="house"
                      name="house"
                      value={userAddress.house}
                      onChange={handleInputChange}
                      placeholder="Например: 15"
                    />
                  </div>

                  <div className="form-actions">
                    <button 
                      className="generate-btn"
                      onClick={generateCosmicAddress}
                    >
                      <span className="btn-icon">🌍</span>
                      Сгенерировать космический адрес
                    </button>
                    
                    {isGenerated && (
                      <button 
                        className="reset-btn"
                        onClick={resetForm}
                      >
                        Очистить
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Результат */}
            <div className="cosmic-result-section">
              {!isGenerated ? (
                <div className="placeholder-card">
                  <div className="placeholder-icon">🚀</div>
                  <h3>Ваш космический адрес</h3>
                  <p>Заполните форму слева, чтобы увидеть ваше место во Вселенной</p>
                  
                  <div className="cosmic-facts">
                    <div className="fact-item">
                      <span className="fact-number">93 млрд</span>
                      <span className="fact-label">световых лет</span>
                      <span className="fact-description">Диаметр наблюдаемой Вселенной</span>
                    </div>
                    <div className="fact-item">
                      <span className="fact-number">100 000</span>
                      <span className="fact-label">световых лет</span>
                      <span className="fact-description">Диаметр Млечного Пути</span>
                    </div>
                    <div className="fact-item">
                      <span className="fact-number">4.5 млрд</span>
                      <span className="fact-label">лет</span>
                      <span className="fact-description">Возраст Земли</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div id="cosmic-result" className="result-card">
                  <div className="result-header">
                    <h2>Ваш полный космический адрес</h2>
                    <p className="result-subtitle">
                      От бескрайней Вселенной до вашего дома
                    </p>
                  </div>

                  <div className="cosmic-address-list">
                    {cosmicAddress.map((item, index) => (
                      <div key={index} className="address-level">
                        <div className="level-header">
                          <div className="level-number">{index + 1}</div>
                          <div className="level-info">
                            <h3 className="level-name">{item.name}</h3>
                            <span className="level-type">{item.level}</span>
                          </div>
                          <div className="level-icon">
                            {index === 0 && '🌌'}
                            {index === 1 && '⭐'}
                            {index === 2 && '🌀'}
                            {index === 3 && '🌟'}
                            {index === 4 && '🌠'}
                            {index === 5 && '💫'}
                            {index === 6 && '✨'}
                            {index === 7 && '🔭'}
                            {index === 8 && '☀️'}
                            {index === 9 && '🌍'}
                            {index > 9 && '📍'}
                          </div>
                        </div>
                        <p className="level-description">{item.description}</p>
                        
                        {index < cosmicAddress.length - 1 && (
                          <div className="level-connector">
                            <div className="connector-line"></div>
                            <div className="connector-arrow">↓</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="share-section">
                    <h4>Поделиться космическим адресом</h4>
                    <p className="share-description">
                      Скопируйте ваш адрес текстом или создайте красивое изображение для социальных сетей
                    </p>
                    <div className="share-buttons">
                      <button 
                        className={getCopyButtonClass()}
                        onClick={copyCosmicAddress}
                        disabled={copyStatus === 'copying'}
                      >
                        {getCopyButtonText()}
                      </button>
                      <button 
                        className={getImageButtonClass()}
                        onClick={createCosmicImage}
                        disabled={imageStatus === 'generating'}
                      >
                        {getImageButtonText()}
                      </button>
                    </div>
                    
                    {copyStatus === 'success' && (
                      <div className="status-message success">
                        ✅ Адрес скопирован в буфер обмена! Теперь вы можете вставить его куда угодно.
                      </div>
                    )}
                    
                    {copyStatus === 'error' && (
                      <div className="status-message error">
                        ❌ Не удалось скопировать адрес. Попробуйте еще раз.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Информация о космической иерархии */}
          <div className="cosmic-info-section">
            <h2>О космической иерархии</h2>
            <div className="info-grid">
              <div className="info-card">
                <h3>🏠 Ваш дом на Земле</h3>
                <p>Ваш точный адрес на третьей планете от Солнца</p>
              </div>
              <div className="info-card">
                <h3>🌍 Планета Земля</h3>
                <p>Единственная известная обитаемая планета в Солнечной системе</p>
              </div>
              <div className="info-card">
                <h3>☀️ Солнечная система</h3>
                <p>Наша звездная система с 8 планетами, расположенная в рукаве Ориона</p>
              </div>
              <div className="info-card">
                <h3>💫 Млечный Путь</h3>
                <p>Спиральная галактика диаметром 100 000 световых лет</p>
              </div>
              <div className="info-card">
                <h3>🌌 Местная группа</h3>
                <p>Группа из 54 галактик, включая Млечный Путь и Андромеду</p>
              </div>
              <div className="info-card">
                <h3>🌟 Наблюдаемая Вселенная</h3>
                <p>Вся материя, которую мы можем наблюдать с Земли</p>
              </div>
            </div>
          </div>

          {/* Кнопка возврата */}
          <div className="cosmic-actions">
            <Link to="/" className="back-home-btn">
              ← На главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CosmicAddressPage;