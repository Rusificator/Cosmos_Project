import React from 'react';
import '../styles/missions.css';

const MissionsPage = () => {
  const missions = [
    {
      id: 1,
      name: "Аполлон-11",
      agency: "NASA",
      year: "1969",
      description: "Первая пилотируемая миссия, в ходе которой человек впервые ступил на Луну.",
      image: "apollo11.jpg",
      achievements: ["Первая высадка на Луну", "Экипаж: Нил Армстронг, Базз Олдрин", "Длительность: 8 дней"]
    },
    {
      id: 2,
      name: "Вояджер-1",
      agency: "NASA",
      year: "1977",
      description: "Космический зонд, который стал первым искусственным объектом, покинувшим Солнечную систему.",
      image: "voyager1.jpg",
      achievements: ["Запущен в 1977 году", "Покинул Солнечную систему в 2012", "Все еще передает данные"]
    },
    {
      id: 3,
      name: "Марс-3",
      agency: "СССР",
      year: "1971",
      description: "Первая успешная посадка советского аппарата на Марс.",
      image: "mars3.jpg",
      achievements: ["Первая мягкая посадка на Марс", "Передавал данные 14.5 секунд", "Советская космическая программа"]
    },
    {
      id: 4,
      name: "Хаббл",
      agency: "NASA/ESA",
      year: "1990",
      description: "Космический телескоп, который произвел революцию в астрономии.",
      image: "hubble.jpg",
      achievements: ["Запущен в 1990 году", "Сделал более 1.5 млн наблюдений", "Обслуживался 5 миссиями"]
    },
    {
      id: 5,
      name: "Международная космическая станция",
      agency: "NASA, Роскосмос, ESA, JAXA, CSA",
      year: "1998",
      description: "Пилотируемая орбитальная станция, используемая как многоцелевой космический исследовательский комплекс.",
      image: "iss.jpg",
      achievements: ["Запуск первого модуля в 1998", "Постоянно обитаема с 2000 года", "Международное сотрудничество"]
    },
    {
      id: 6,
      name: "Чанъэ-4",
      agency: "CNSA",
      year: "2018",
      description: "Первая миссия, совершившая мягкую посадку на обратной стороне Луны.",
      image: "change4.jpg",
      achievements: ["Посадка на обратной стороне Луны", "Китайская космическая программа", "Исследование лунной геологии"]
    }
  ];

  return (
    <div className="missions-page">
      <div className="video-background">
        <video autoPlay muted loop className="background-video" playsInline>
          <source src="/video/solar-system.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="missions-content">
        <div className="container">
          <h1 className="page-title">Космические миссии</h1>
          <p className="page-subtitle">
            Исследуйте величайшие достижения человечества в освоении космоса
          </p>
          
          <div className="missions-grid">
            {missions.map(mission => (
              <div key={mission.id} className="mission-card">
                <div className="mission-image">
                  <div className="mission-agency">{mission.agency}</div>
                  <div className="mission-year">{mission.year}</div>
                </div>
                <div className="mission-content">
                  <h3>{mission.name}</h3>
                  <p className="mission-description">{mission.description}</p>
                  <div className="mission-achievements">
                    <h4>Достижения:</h4>
                    <ul>
                      {mission.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionsPage;