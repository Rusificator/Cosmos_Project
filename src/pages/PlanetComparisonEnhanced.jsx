import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../styles/planet-comparison-enhanced.css';

const PlanetComparisonEnhanced = () => {
  const [selectedPlanets, setSelectedPlanets] = useState(['earth', 'mars', 'jupiter']);
  const [comparisonData, setComparisonData] = useState([]);
  const [activePlanet, setActivePlanet] = useState('earth');

  const planets = [
    { id: 'sun', name: 'Солнце', type: 'star', color: '#ff6b00' },
    { id: 'mercury', name: 'Меркурий', type: 'rocky', color: '#8c8c8c' },
    { id: 'venus', name: 'Венера', type: 'rocky', color: '#e6b87c' },
    { id: 'earth', name: 'Земля', type: 'rocky', color: '#6b93d6' },
    { id: 'mars', name: 'Марс', type: 'rocky', color: '#cc6b4f' },
    { id: 'jupiter', name: 'Юпитер', type: 'gas', color: '#d8ca9d' },
    { id: 'saturn', name: 'Сатурн', type: 'gas', color: '#e3d9b1' },
    { id: 'uranus', name: 'Уран', type: 'ice', color: '#9ec2f0' },
    { id: 'neptune', name: 'Нептун', type: 'ice', color: '#5b9bd5' },
    { id: 'pluto', name: 'Плутон', type: 'dwarf', color: '#a67c52' }
  ];

  const planetDetails = {
    sun: {
      diameter: 1391000,
      mass: 1.989e30,
      gravity: 274,
      dayLength: 600,
      distance: 0,
      temperature: 5500,
      moons: 0,
      density: 1.41,
      orbitPeriod: 0
    },
    mercury: {
      diameter: 4879,
      mass: 3.3e23,
      gravity: 3.7,
      dayLength: 1407.6,
      distance: 57.9,
      temperature: 167,
      moons: 0,
      density: 5.43,
      orbitPeriod: 88
    },
    venus: {
      diameter: 12104,
      mass: 4.87e24,
      gravity: 8.9,
      dayLength: 5832.5,
      distance: 108.2,
      temperature: 464,
      moons: 0,
      density: 5.24,
      orbitPeriod: 225
    },
    earth: {
      diameter: 12742,
      mass: 5.97e24,
      gravity: 9.8,
      dayLength: 24,
      distance: 149.6,
      temperature: 15,
      moons: 1,
      density: 5.52,
      orbitPeriod: 365.25
    },
    mars: {
      diameter: 6779,
      mass: 6.42e23,
      gravity: 3.7,
      dayLength: 24.7,
      distance: 227.9,
      temperature: -65,
      moons: 2,
      density: 3.93,
      orbitPeriod: 687
    },
    jupiter: {
      diameter: 139820,
      mass: 1.9e27,
      gravity: 24.8,
      dayLength: 9.9,
      distance: 778.5,
      temperature: -110,
      moons: 79,
      density: 1.33,
      orbitPeriod: 4333
    },
    saturn: {
      diameter: 116460,
      mass: 5.68e26,
      gravity: 10.4,
      dayLength: 10.7,
      distance: 1434,
      temperature: -140,
      moons: 82,
      density: 0.69,
      orbitPeriod: 10759
    },
    uranus: {
      diameter: 50724,
      mass: 8.68e25,
      gravity: 8.7,
      dayLength: 17.2,
      distance: 2871,
      temperature: -195,
      moons: 27,
      density: 1.27,
      orbitPeriod: 30687
    },
    neptune: {
      diameter: 49244,
      mass: 1.02e26,
      gravity: 11.2,
      dayLength: 16.1,
      distance: 4495,
      temperature: -200,
      moons: 14,
      density: 1.64,
      orbitPeriod: 60190
    },
    pluto: {
      diameter: 2376,
      mass: 1.31e22,
      gravity: 0.6,
      dayLength: 153.3,
      distance: 5906,
      temperature: -225,
      moons: 5,
      density: 1.85,
      orbitPeriod: 90560
    }
  };

  const normalizeValue = useCallback((value, min, max) => {
    if (min === max) return 50;
    return ((value - min) / (max - min)) * 100;
  }, []);

  const formatNumber = useCallback((num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + ' млрд';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + ' млн';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + ' тыс';
    return num.toString();
  }, []);

  const getPlanetType = useCallback((type) => {
    const types = {
      star: 'Звезда',
      rocky: 'Каменная планета',
      gas: 'Газовый гигант',
      ice: 'Ледяной гигант',
      dwarf: 'Карликовая планета'
    };
    return types[type] || type;
  }, []);

  useEffect(() => {
    const data = selectedPlanets.map(planetId => {
      const planet = planets.find(p => p.id === planetId);
      const details = planetDetails[planetId];
      return {
        id: planetId,
        name: planet?.name || '',
        type: planet?.type || '',
        color: planet?.color || '#666',
        ...details
      };
    });
    setComparisonData(data);
  }, [selectedPlanets]);

  const togglePlanetSelection = useCallback((planetId) => {
    setSelectedPlanets(prev => {
      if (prev.includes(planetId)) {
        return prev.filter(id => id !== planetId);
      } else {
        return [...prev, planetId];
      }
    });
  }, []);

  const getMaxValues = useCallback(() => {
    if (comparisonData.length === 0) return {};
    
    return {
      diameter: Math.max(...comparisonData.map(p => p.diameter)),
      mass: Math.max(...comparisonData.map(p => p.mass)),
      gravity: Math.max(...comparisonData.map(p => p.gravity)),
      distance: Math.max(...comparisonData.map(p => p.distance)),
      moons: Math.max(...comparisonData.map(p => p.moons)),
      density: Math.max(...comparisonData.map(p => p.density))
    };
  }, [comparisonData]);

  const maxValues = getMaxValues();

  const calculateRelativeSize = useCallback((diameter) => {
    const maxDiameter = Math.max(...comparisonData.map(p => p.diameter));
    const minSize = 30;
    const maxSize = 150;
    return minSize + (diameter / maxDiameter) * (maxSize - minSize);
  }, [comparisonData]);

  const RadialChart = ({ value, maxValue, color, title, unit }) => {
    const percentage = Math.min((value / maxValue) * 100, 100);
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="radial-chart-container fade-in">
        <div className="radial-chart-title">{title}</div>
        <div className="radial-chart">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="45"
              className="radial-chart-bg"
            />
            <circle
              cx="60"
              cy="60"
              r="45"
              className="radial-chart-fill"
              stroke={color}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="radial-chart-value">
            {unit === 'ratio' ? value.toFixed(1) : formatNumber(value)}
          </div>
        </div>
        <div className="radial-chart-label">
          {unit !== 'ratio' && unit}
        </div>
      </div>
    );
  };

  return (
    <div className="planet-comparison-enhanced">
      <div className="video-background">
        <video autoPlay muted loop className="background-video" playsInline>
          <source src="/video/solar-system.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="comparison-enhanced-content">
        <div className="container">
          <div className="comparison-enhanced-header">
            <h1 className="comparison-title">Сравнение планет</h1>
            <p className="page-subtitle">
              Интерактивная визуализация характеристик небесных тел Солнечной системы
            </p>
          </div>

          <div className="comparison-container">
            {/* Панель выбора планет */}
            <div className="planets-selection-panel">
              <h3 className="selection-title">Выберите планеты</h3>
              <div className="planet-selection-list">
                {planets.map(planet => (
                  <div
                    key={planet.id}
                    className={`planet-selection-item ${
                      selectedPlanets.includes(planet.id) ? 'active' : ''
                    }`}
                    onClick={() => togglePlanetSelection(planet.id)}
                  >
                    <div
                      className="planet-selection-color"
                      style={{ backgroundColor: planet.color }}
                    />
                    <span className="planet-selection-name">{planet.name}</span>
                    <span className="planet-selection-type">
                      {getPlanetType(planet.type)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <Link to="/planets" className="back-to-planets-btn">
                  ← К списку планет
                </Link>
              </div>
            </div>

            {/* Основная область сравнения */}
            <div className="comparison-main-area">
              {/* Визуализация размеров */}
              <div className="size-comparison-section fade-in">
                <h2 className="section-title">Сравнение размеров</h2>
                <div className="planets-size-container">
                  {comparisonData.map(planet => {
                    const size = calculateRelativeSize(planet.diameter);
                    return (
                      <div key={planet.id} className="planet-size-item">
                        <div
                          className="planet-size-visual"
                          style={{
                            width: size,
                            height: size,
                            backgroundColor: planet.color,
                            background: `radial-gradient(circle at 30% 30%, ${planet.color}cc, ${planet.color})`
                          }}
                        />
                        <div className="planet-size-name">{planet.name}</div>
                        <div className="planet-size-diameter">
                          {formatNumber(planet.diameter)} км
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Радиальные диаграммы */}
              <div className="radial-charts-section">
                {comparisonData.map(planet => (
                  <div key={planet.id} className="fade-in">
                    <h3 className="section-title" style={{ color: planet.color }}>
                      {planet.name}
                    </h3>
                    <div className="radial-charts-grid">
                      <RadialChart
                        value={planet.diameter}
                        maxValue={maxValues.diameter}
                        color={planet.color}
                        title="Диаметр"
                        unit="км"
                      />
                      <RadialChart
                        value={planet.mass}
                        maxValue={maxValues.mass}
                        color={planet.color}
                        title="Масса"
                        unit="кг"
                      />
                      <RadialChart
                        value={planet.gravity}
                        maxValue={maxValues.gravity}
                        color={planet.color}
                        title="Гравитация"
                        unit="м/с²"
                      />
                      <RadialChart
                        value={planet.density}
                        maxValue={maxValues.density}
                        color={planet.color}
                        title="Плотность"
                        unit="г/см³"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Сравнительные шкалы */}
              <div className="comparison-scales">
                <div className="comparison-scale fade-in">
                  <h3 className="scale-title">
                    Расстояние от Солнца
                    <span className="scale-unit">млн км</span>
                  </h3>
                  <div className="scale-bars">
                    {comparisonData.map(planet => (
                      <div key={planet.id} className="scale-bar">
                        <div
                          className="scale-bar-color"
                          style={{ backgroundColor: planet.color }}
                        />
                        <span className="scale-bar-name">{planet.name}</span>
                        <div className="scale-bar-track">
                          <div
                            className="scale-bar-fill"
                            style={{
                              width: `${normalizeValue(planet.distance, 0, maxValues.distance)}%`,
                              backgroundColor: planet.color
                            }}
                          />
                        </div>
                        <span className="scale-bar-value">
                          {planet.distance} млн км
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="comparison-scale fade-in">
                  <h3 className="scale-title">
                    Количество спутников
                    <span className="scale-unit">шт</span>
                  </h3>
                  <div className="scale-bars">
                    {comparisonData.map(planet => (
                      <div key={planet.id} className="scale-bar">
                        <div
                          className="scale-bar-color"
                          style={{ backgroundColor: planet.color }}
                        />
                        <span className="scale-bar-name">{planet.name}</span>
                        <div className="scale-bar-track">
                          <div
                            className="scale-bar-fill"
                            style={{
                              width: `${normalizeValue(planet.moons, 0, maxValues.moons)}%`,
                              backgroundColor: planet.color
                            }}
                          />
                        </div>
                        <span className="scale-bar-value">
                          {planet.moons} спутников
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Инфографика */}
              <div className="infographic-section">
                {comparisonData.map(planet => (
                  <div key={planet.id} className="infographic-card fade-in">
                    <div className="infographic-icon">
                      {planet.id === 'sun' ? '☀️' : 
                       planet.id === 'mercury' ? '☿' :
                       planet.id === 'venus' ? '♀' :
                       planet.id === 'earth' ? '♁' :
                       planet.id === 'mars' ? '♂' :
                       planet.id === 'jupiter' ? '♃' :
                       planet.id === 'saturn' ? '♄' :
                       planet.id === 'uranus' ? '♅' :
                       planet.id === 'neptune' ? '♆' : '⯓'}
                    </div>
                    <div className="infographic-value" style={{ color: planet.color }}>
                      {planet.dayLength}
                    </div>
                    <div className="infographic-label">Длина суток (часы)</div>
                    
                    <div style={{ marginTop: '1rem' }}>
                      <div className="infographic-value" style={{ color: planet.color }}>
                        {planet.temperature}°C
                      </div>
                      <div className="infographic-label">Средняя температура</div>
                    </div>
                    
                    <div style={{ marginTop: '1rem' }}>
                      <div className="infographic-value" style={{ color: planet.color }}>
                        {planet.orbitPeriod}
                      </div>
                      <div className="infographic-label">Год (земных дней)</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetComparisonEnhanced;