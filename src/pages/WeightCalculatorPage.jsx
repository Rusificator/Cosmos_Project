import React, { useState, useEffect } from 'react';
import '../styles/weight-calculator.css';

const WeightCalculatorPage = () => {
  const [earthWeight, setEarthWeight] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('kg');
  const [results, setResults] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  // Данные о планетах и их гравитации относительно Земли
  const celestialBodies = [
    {
      id: 'mercury',
      name: 'Меркурий',
      gravity: 0.38,
      image: 'mercury',
      fact: 'Здесь вы будете чувствовать себя невесомым!',
      description: 'Самая маленькая и быстрая планета'
    },
    {
      id: 'venus',
      name: 'Венера',
      gravity: 0.91,
      image: 'venus',
      fact: 'Почти как на Земле, но с кислотными облаками!',
      description: 'Планета с адской атмосферой'
    },
    {
      id: 'earth',
      name: 'Земля',
      gravity: 1.00,
      image: 'earth',
      fact: 'Ваш родной вес!',
      description: 'Наш дом в космосе'
    },
    {
      id: 'moon',
      name: 'Луна',
      gravity: 0.16,
      image: 'moon',
      fact: 'Прыгайте в 6 раз выше!',
      description: 'Естественный спутник Земли'
    },
    {
      id: 'mars',
      name: 'Марс',
      gravity: 0.38,
      image: 'mars',
      fact: 'Идеально для будущих колонистов!',
      description: 'Красная планета'
    },
    {
      id: 'jupiter',
      name: 'Юпитер',
      gravity: 2.34,
      image: 'jupiter',
      fact: 'На Юпитере тебя раздавит собственный вес!',
      description: 'Газовый гигант'
    },
    {
      id: 'saturn',
      name: 'Сатурн',
      gravity: 0.93,
      image: 'saturn',
      fact: 'Почти как дома, но с кольцами!',
      description: 'Властелин колец'
    },
    {
      id: 'uranus',
      name: 'Уран',
      gravity: 0.92,
      image: 'uranus',
      fact: 'Легче, чем кажется!',
      description: 'Ледяной гигант'
    },
    {
      id: 'neptune',
      name: 'Нептун',
      gravity: 1.12,
      image: 'neptune',
      fact: 'Немного тяжелее земных условий!',
      description: 'Голубая планета ветров'
    },
    {
      id: 'pluto',
      name: 'Плутон',
      gravity: 0.06,
      image: 'pluto',
      fact: 'Вы почти невесомы!',
      description: 'Карликовая планета'
    }
  ];

  // Расчет веса на других планетах
  const calculateWeights = () => {
    if (!earthWeight || isNaN(earthWeight) || earthWeight <= 0) {
      setResults([]);
      return;
    }

    const weight = parseFloat(earthWeight);
    const calculatedResults = celestialBodies.map(body => {
      const weightOnPlanet = (weight * body.gravity).toFixed(1);
      const difference = (body.gravity - 1).toFixed(2);
      
      let comparison = '';
      if (body.gravity > 1) {
        comparison = `Тяжелее на ${(weight * (body.gravity - 1)).toFixed(1)} ${selectedUnit}`;
      } else if (body.gravity < 1) {
        comparison = `Легче на ${(weight * (1 - body.gravity)).toFixed(1)} ${selectedUnit}`;
      } else {
        comparison = 'Такой же как на Земле';
      }

      return {
        ...body,
        weight: weightOnPlanet,
        comparison,
        difference
      };
    });

    setResults(calculatedResults);
  };

  // Авторасчет при изменении веса
  useEffect(() => {
    calculateWeights();
  }, [earthWeight, selectedUnit]);

  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && value >= 0)) {
      setEarthWeight(value);
    }
  };

  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
  };

  const handlePlanetSelect = (planet) => {
    setSelectedPlanet(planet);
  };

  const getWeightColor = (gravity) => {
    if (gravity > 1.5) return '#ff6b6b'; // Красный для очень тяжелых
    if (gravity > 1) return '#ffa726';    // Оранжевый для тяжелых
    if (gravity < 0.5) return '#4fc3f7';  // Голубой для очень легких
    return '#66bb6a';                     // Зеленый для нормальных
  };

  return (
    <div className="weight-calculator-page">
      <div className="video-background">
        <video autoPlay muted loop className="background-video" playsInline>
          <source src="/video/solar-system.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="calculator-content">
        <div className="container">
          <div className="calculator-header">
            <h1 className="page-title">Калькулятор веса на планетах</h1>
            <p className="page-subtitle">
              Узнайте, сколько бы вы весили на других планетах Солнечной системы
            </p>
          </div>

          {/* Панель ввода */}
          <div className="input-panel">
            <div className="weight-input-group">
              <label htmlFor="earth-weight" className="input-label">
                Ваш вес на Земле:
              </label>
              <div className="input-with-unit">
                <input
                  type="number"
                  id="earth-weight"
                  className="weight-input"
                  value={earthWeight}
                  onChange={handleWeightChange}
                  placeholder="Введите ваш вес"
                  min="0"
                  step="0.1"
                />
                <select 
                  className="unit-select"
                  value={selectedUnit}
                  onChange={handleUnitChange}
                >
                  <option value="kg">кг</option>
                  <option value="lb">фунты</option>
                </select>
              </div>
            </div>
            
            {earthWeight && (
              <div className="current-weight">
                <span>Ваш вес: </span>
                <strong>{earthWeight} {selectedUnit}</strong>
              </div>
            )}
          </div>

          {/* Результаты */}
          {results.length > 0 && (
            <div className="results-section">
              <h2 className="results-title">Ваш вес на других небесных телах:</h2>
              
              <div className="planets-grid">
                {results.map(planet => (
                  <div 
                    key={planet.id}
                    className={`planet-card ${selectedPlanet?.id === planet.id ? 'selected' : ''}`}
                    onClick={() => handlePlanetSelect(planet)}
                    style={{ 
                      '--weight-color': getWeightColor(planet.gravity),
                      '--gravity-value': planet.gravity 
                    }}
                  >
                    <div className="planet-image">
                      <div className={`planet-icon ${planet.image}`}></div>
                      <div className="gravity-badge">
                        g = {planet.gravity}
                      </div>
                    </div>
                    
                    <div className="planet-info">
                      <h3 className="planet-name">{planet.name}</h3>
                      <p className="planet-description">{planet.description}</p>
                      
                      <div className="weight-result">
                        <span className="weight-value">{planet.weight}</span>
                        <span className="weight-unit">{selectedUnit}</span>
                      </div>
                      
                      <div className="weight-comparison">
                        {planet.comparison}
                      </div>
                      
                      <div className="planet-fact">
                        {planet.fact}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Подсказка при пустом вводе */}
          {!earthWeight && (
            <div className="empty-state">
              <div className="empty-icon">⚖️</div>
              <h3>Введите ваш вес</h3>
              <p>Узнайте, как гравитация других планет повлияет на ваш вес</p>
              <div className="fun-facts">
                <div className="fun-fact">
                  <span>🪐</span>
                  На Юпитере ваш вес в 2.3 раза больше!
                </div>
                <div className="fun-fact">
                  <span>🌙</span>
                  На Луне ваш вес уменьшится в 6 раз!
                </div>
                <div className="fun-fact">
                  <span>🪐</span>
                  На Плутоне вы почти невесомы!
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeightCalculatorPage;