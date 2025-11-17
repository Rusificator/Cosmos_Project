import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/planets.css';

const PlanetsPage = () => {
  const planets = [
    {
      id: 'mercury',
      name: 'Меркурий',
      description: 'Ближайшая к Солнцу планета',
      type: 'rocky',
      distance: '57.9 млн км',
      diameter: '4,879 км',
      facts: ['Самый короткий год', 'Нет спутников', 'Экстремальные перепады температуры'],
      color: 'linear-gradient(45deg, #8c8c8c, #bfbfbf)',
      icon: '☿'
    },
    {
      id: 'venus',
      name: 'Венера',
      description: 'Планета с адской атмосферой',
      type: 'rocky',
      distance: '108.2 млн км',
      diameter: '12,104 км',
      facts: ['Самая горячая планета', 'Вращается в обратную сторону', 'Кислотные облака'],
      color: 'linear-gradient(45deg, #e6b87c, #f5d5a6)',
      icon: '♀'
    },
    {
      id: 'earth',
      name: 'Земля',
      description: 'Наш дом в космосе',
      type: 'rocky',
      distance: '149.6 млн км',
      diameter: '12,742 км',
      facts: ['Единственная обитаемая планета', '71% поверхности - вода', '1 спутник'],
      color: 'linear-gradient(45deg, #6b93d6, #9ec2f0)',
      icon: '♁'
    },
    {
      id: 'mars',
      name: 'Марс',
      description: 'Красная планета',
      type: 'rocky',
      distance: '227.9 млн км',
      diameter: '6,779 км',
      facts: ['2 спутника', 'Самая высокая гора в Солнечной системе', 'Следы воды'],
      color: 'linear-gradient(45deg, #cc6b4f, #e68c6b)',
      icon: '♂'
    },
    {
      id: 'jupiter',
      name: 'Юпитер',
      description: 'Газовый гигант',
      type: 'gas',
      distance: '778.5 млн км',
      diameter: '139,820 км',
      facts: ['Самый большой шторм', '79 спутников', 'Короткие сутки'],
      color: 'linear-gradient(45deg, #d8ca9d, #f5e8b8)',
      icon: '♃'
    },
    {
      id: 'saturn',
      name: 'Сатурн',
      description: 'Властелин колец',
      type: 'gas',
      distance: '1.4 млрд км',
      diameter: '116,460 км',
      facts: ['Великолепные кольца', '82 спутника', 'Меньше плотности воды'],
      color: 'linear-gradient(45deg, #e3d9b1, #f4ecc2)',
      icon: '♄'
    },
    {
      id: 'uranus',
      name: 'Уран',
      description: 'Ледяной гигант',
      type: 'ice',
      distance: '2.9 млрд км',
      diameter: '50,724 км',
      facts: ['Вражается на боку', 'Холодная планета', '13 колец'],
      color: 'linear-gradient(45deg, #9ec2f0, #c6dbf7)',
      icon: '♅'
    },
    {
      id: 'neptune',
      name: 'Нептун',
      description: 'Голубая планета ветров',
      type: 'ice',
      distance: '4.5 млрд км',
      diameter: '49,244 км',
      facts: ['Самые быстрые ветра', 'Открыт математически', '14 спутников'],
      color: 'linear-gradient(45deg, #5b9bd5, #8bb8e8)',
      icon: '♆'
    },
    {
      id: 'pluto',
      name: 'Плутон',
      description: 'Карликовая планета',
      type: 'dwarf',
      distance: '5.9 млрд км',
      diameter: '2,377 км',
      facts: ['Карликовая планета', '5 спутников', 'Сложная орбита'],
      color: 'linear-gradient(45deg, #a67c52, #c9a783)',
      icon: '⯓'
    }
  ];

  const getPlanetType = (type) => {
    const types = {
      rocky: 'Каменная планета',
      gas: 'Газовый гигант',
      ice: 'Ледяной гигант',
      dwarf: 'Карликовая планета'
    };
    return types[type] || 'Планета';
  };

  return (
    <div className="planets-page">
      <div className="video-background">
        <video autoPlay muted loop className="background-video" playsInline>
          <source src="/video/solar-system.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="planets-content">
        <div className="container">
          <div className="planets-header">
            <h1 className="page-title">Планеты Солнечной системы</h1>
            <p className="page-subtitle">
              Исследуйте удивительные миры, вращающиеся вокруг нашего Солнца
            </p>
            
            <div className="solar-system-stats">
              <div className="stat-card">
                <div className="stat-number">8</div>
                <div className="stat-label">Планет</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">5</div>
                <div className="stat-label">Карликовых планет</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">200+</div>
                <div className="stat-label">Спутников</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">4.6</div>
                <div className="stat-label">Млрд лет</div>
              </div>
            </div>
          </div>

          <div className="planets-grid">
            {planets.map(planet => (
              <div key={planet.id} className="planet-card">
                <div 
                  className="planet-image"
                  style={{ background: planet.color }}
                >
                  <span className="planet-icon">{planet.icon}</span>
                  <div className="planet-type-badge">
                    {getPlanetType(planet.type)}
                  </div>
                </div>
                
                <div className="planet-info">
                  <h3 className="planet-name">{planet.name}</h3>
                  <p className="planet-description">{planet.description}</p>
                  
                  <div className="planet-stats">
                    <div className="planet-stat">
                      <span className="stat-label">Расстояние от Солнца:</span>
                      <span className="stat-value">{planet.distance}</span>
                    </div>
                    <div className="planet-stat">
                      <span className="stat-label">Диаметр:</span>
                      <span className="stat-value">{planet.diameter}</span>
                    </div>
                  </div>

                  <div className="planet-facts">
                    <h4>Интересные факты:</h4>
                    <ul>
                      {planet.facts.slice(0, 2).map((fact, index) => (
                        <li key={index}>{fact}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link 
                  to={`/planets/${planet.id}`}
                  className="planet-btn"
                >
                  Исследовать
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetsPage;