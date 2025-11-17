import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/planet-comparison.css';

const PlanetComparisonPage = () => {
  const [selectedPlanets, setSelectedPlanets] = useState(['earth', 'mars']);
  const [comparisonData, setComparisonData] = useState([]);

  const planets = [
    { id: 'sun', name: 'Солнце', type: 'star' },
    { id: 'mercury', name: 'Меркурий', type: 'rocky' },
    { id: 'venus', name: 'Венера', type: 'rocky' },
    { id: 'earth', name: 'Земля', type: 'rocky' },
    { id: 'mars', name: 'Марс', type: 'rocky' },
    { id: 'jupiter', name: 'Юпитер', type: 'gas' },
    { id: 'saturn', name: 'Сатурн', type: 'gas' },
    { id: 'uranus', name: 'Уран', type: 'ice' },
    { id: 'neptune', name: 'Нептун', type: 'ice' },
    { id: 'pluto', name: 'Плутон', type: 'dwarf' }
  ];

  const planetDetails = {
    sun: {
      diameter: '1,391,000 км',
      mass: '1.989 × 10³⁰ кг',
      gravity: '274 м/с²',
      dayLength: '25-35 дней',
      distance: '0 км',
      temperature: '5,500°C',
      moons: 0,
      color: 'linear-gradient(45deg, #ff6b00, #ff9500)'
    },
    mercury: {
      diameter: '4,879 км',
      mass: '3.3 × 10²³ кг',
      gravity: '3.7 м/с²',
      dayLength: '58.6 дней',
      distance: '57.9 млн км',
      temperature: '-173°C до 427°C',
      moons: 0,
      color: 'linear-gradient(45deg, #8c8c8c, #bfbfbf)'
    },
    venus: {
      diameter: '12,104 км',
      mass: '4.9 × 10²⁴ кг',
      gravity: '8.9 м/с²',
      dayLength: '243 дня',
      distance: '108.2 млн км',
      temperature: '462°C',
      moons: 0,
      color: 'linear-gradient(45deg, #e6b87c, #f5d5a6)'
    },
    earth: {
      diameter: '12,742 км',
      mass: '6.0 × 10²⁴ кг',
      gravity: '9.8 м/с²',
      dayLength: '24 часа',
      distance: '149.6 млн км',
      temperature: '-89°C до 58°C',
      moons: 1,
      color: 'linear-gradient(45deg, #6b93d6, #9ec2f0)'
    },
    mars: {
      diameter: '6,779 км',
      mass: '6.4 × 10²³ кг',
      gravity: '3.7 м/с²',
      dayLength: '24.6 часа',
      distance: '227.9 млн км',
      temperature: '-153°C до 20°C',
      moons: 2,
      color: 'linear-gradient(45deg, #cc6b4f, #e68c6b)'
    },
    jupiter: {
      diameter: '139,820 км',
      mass: '1.9 × 10²⁷ кг',
      gravity: '24.8 м/с²',
      dayLength: '9.9 часа',
      distance: '778.5 млн км',
      temperature: '-145°C',
      moons: 79,
      color: 'linear-gradient(45deg, #d8ca9d, #f5e8b8)'
    },
    saturn: {
      diameter: '116,460 км',
      mass: '5.7 × 10²⁶ кг',
      gravity: '10.4 м/с²',
      dayLength: '10.7 часа',
      distance: '1.4 млрд км',
      temperature: '-178°C',
      moons: 82,
      color: 'linear-gradient(45deg, #e3d9b1, #f4ecc2)'
    },
    uranus: {
      diameter: '50,724 км',
      mass: '8.7 × 10²⁵ кг',
      gravity: '8.7 м/с²',
      dayLength: '17.2 часа',
      distance: '2.9 млрд км',
      temperature: '-224°C',
      moons: 27,
      color: 'linear-gradient(45deg, #9ec2f0, #c6dbf7)'
    },
    neptune: {
      diameter: '49,244 км',
      mass: '1.0 × 10²⁶ кг',
      gravity: '11.2 м/с²',
      dayLength: '16.1 часа',
      distance: '4.5 млрд км',
      temperature: '-218°C',
      moons: 14,
      color: 'linear-gradient(45deg, #5b9bd5, #8bb8e8)'
    },
    pluto: {
      diameter: '2,377 км',
      mass: '1.3 × 10²² кг',
      gravity: '0.6 м/с²',
      dayLength: '153 часа',
      distance: '5.9 млрд км',
      temperature: '-240°C до -218°C',
      moons: 5,
      color: 'linear-gradient(45deg, #a67c52, #c9a783)'
    }
  };

  useEffect(() => {
    const data = selectedPlanets.map(planetId => ({
      id: planetId,
      ...planetDetails[planetId],
      name: planets.find(p => p.id === planetId)?.name || '',
      type: planets.find(p => p.id === planetId)?.type || ''
    }));
    setComparisonData(data);
  }, [selectedPlanets]);

  const handlePlanetChange = (index, planetId) => {
    const newSelectedPlanets = [...selectedPlanets];
    newSelectedPlanets[index] = planetId;
    setSelectedPlanets(newSelectedPlanets);
  };

  const addComparison = () => {
    if (selectedPlanets.length < 4) {
      setSelectedPlanets([...selectedPlanets, 'earth']);
    }
  };

  const removeComparison = (index) => {
    if (selectedPlanets.length > 2) {
      const newSelectedPlanets = selectedPlanets.filter((_, i) => i !== index);
      setSelectedPlanets(newSelectedPlanets);
    }
  };

  const getPlanetType = (type) => {
    const types = {
      star: 'Звезда',
      rocky: 'Каменная',
      gas: 'Газовый гигант',
      ice: 'Ледяной гигант',
      dwarf: 'Карликовая'
    };
    return types[type] || type;
  };

  const formatComparisonValue = (value1, value2) => {
    if (value1 === value2) return 'одинаково';
    
    const num1 = parseFloat(value1.replace(/[^\d.-]/g, ''));
    const num2 = parseFloat(value2.replace(/[^\d.-]/g, ''));
    
    if (!isNaN(num1) && !isNaN(num2) && num2 !== 0) {
      const ratio = num1 / num2;
      if (ratio > 1) {
        return `в ${ratio.toFixed(1)} раза больше`;
      } else {
        return `в ${(1/ratio).toFixed(1)} раза меньше`;
      }
    }
    
    return 'разные значения';
  };

  return (
    <div className="planet-comparison-page">
      <div className="video-background">
        <video autoPlay muted loop className="background-video" playsInline>
          <source src="/video/solar-system.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="comparison-content">
        <div className="container">
          <div className="comparison-header">
            <h1 className="page-title">Сравнение планет</h1>
            <p className="page-subtitle">
              Сравните характеристики небесных тел Солнечной системы
            </p>
            
            <div className="comparison-controls">
              <div className="planets-selector">
                {selectedPlanets.map((planetId, index) => (
                  <div key={index} className="planet-selector">
                    <select
                      value={planetId}
                      onChange={(e) => handlePlanetChange(index, e.target.value)}
                      className="planet-select"
                    >
                      {planets.map(planet => (
                        <option key={planet.id} value={planet.id}>
                          {planet.name}
                        </option>
                      ))}
                    </select>
                    {selectedPlanets.length > 2 && (
                      <button
                        onClick={() => removeComparison(index)}
                        className="remove-planet-btn"
                        aria-label="Удалить планету из сравнения"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              {selectedPlanets.length < 4 && (
                <button onClick={addComparison} className="add-planet-btn">
                  + Добавить планету
                </button>
              )}
            </div>
          </div>

          <div className="comparison-grid">
            {/* Заголовки планет */}
            <div className="comparison-header-row">
              <div className="parameter-cell">Параметр</div>
              {comparisonData.map((planet, index) => (
                <div key={planet.id} className="planet-header-cell">
                  <div 
                    className="planet-comparison-image"
                    style={{ background: planet.color }}
                  >
                    <span className="planet-comparison-icon">
                      {planet.id === 'sun' ? '☀️' : 
                       planet.id === 'mercury' ? '☿' :
                       planet.id === 'venus' ? '♀' :
                       planet.id === 'earth' ? '♁' :
                       planet.id === 'mars' ? '♂' :
                       planet.id === 'jupiter' ? '♃' :
                       planet.id === 'saturn' ? '♄' :
                       planet.id === 'uranus' ? '♅' :
                       planet.id === 'neptune' ? '♆' : '⯓'}
                    </span>
                  </div>
                  <h3 className="planet-comparison-name">{planet.name}</h3>
                  <span className="planet-comparison-type">
                    {getPlanetType(planet.type)}
                  </span>
                  <Link 
                    to={`/planets/${planet.id}`}
                    className="comparison-detail-link"
                  >
                    Подробнее →
                  </Link>
                </div>
              ))}
            </div>

            {/* Строки сравнения */}
            <div className="comparison-row">
              <div className="parameter-cell">Диаметр</div>
              {comparisonData.map(planet => (
                <div key={planet.id} className="value-cell">
                  {planet.diameter}
                </div>
              ))}
            </div>

            <div className="comparison-row">
              <div className="parameter-cell">Масса</div>
              {comparisonData.map(planet => (
                <div key={planet.id} className="value-cell">
                  {planet.mass}
                </div>
              ))}
            </div>

            <div className="comparison-row">
              <div className="parameter-cell">Гравитация</div>
              {comparisonData.map(planet => (
                <div key={planet.id} className="value-cell">
                  {planet.gravity}
                </div>
              ))}
            </div>

            <div className="comparison-row">
              <div className="parameter-cell">Длина суток</div>
              {comparisonData.map(planet => (
                <div key={planet.id} className="value-cell">
                  {planet.dayLength}
                </div>
              ))}
            </div>

            <div className="comparison-row">
              <div className="parameter-cell">Расстояние от Солнца</div>
              {comparisonData.map(planet => (
                <div key={planet.id} className="value-cell">
                  {planet.distance}
                </div>
              ))}
            </div>

            <div className="comparison-row">
              <div className="parameter-cell">Температура</div>
              {comparisonData.map(planet => (
                <div key={planet.id} className="value-cell">
                  {planet.temperature}
                </div>
              ))}
            </div>

            <div className="comparison-row">
              <div className="parameter-cell">Количество спутников</div>
              {comparisonData.map(planet => (
                <div key={planet.id} className="value-cell">
                  {planet.moons}
                </div>
              ))}
            </div>

            {/* Строка сравнения */}
            {comparisonData.length >= 2 && (
              <div className="comparison-summary">
                <div className="summary-header">Сравнение</div>
                <div className="summary-content">
                  <p>
                    <strong>{comparisonData[0].name}</strong> имеет диаметр{' '}
                    {formatComparisonValue(
                      comparisonData[0].diameter, 
                      comparisonData[1].diameter
                    )}, чем <strong>{comparisonData[1].name}</strong>.
                  </p>
                  <p>
                    Гравитация на <strong>{comparisonData[0].name}</strong>{' '}
                    {formatComparisonValue(
                      comparisonData[0].gravity, 
                      comparisonData[1].gravity
                    )}, чем на <strong>{comparisonData[1].name}</strong>.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="comparison-actions">
            <Link to="/planets" className="back-to-planets-btn">
              ← Вернуться к планетам
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetComparisonPage;