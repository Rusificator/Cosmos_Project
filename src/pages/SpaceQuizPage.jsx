import React, { useState, useEffect, useCallback, useRef } from 'react';
import useSound from '../hooks/useSound';
import SoundToggle from '../components/SoundToggle';
import '../styles/space-quiz.css';

const SpaceQuizPage = () => {
  const [quizState, setQuizState] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);

  // Рефы для управления состоянием
  const timerRef = useRef(null);
  const isSoundOnRef = useRef(isSoundOn);
  const isAnswerSubmittedRef = useRef(isAnswerSubmitted);

  // Звуковые эффекты
  const correctSound = useSound('/sounds/correct.mp3', 0.6);
  const wrongSound = useSound('/sounds/wrong.mp3', 0.6);
  const clickSound = useSound('/sounds/click.mp3', 0.4);
  const timerSound = useSound('/sounds/timer.mp3', 0.3);
  const completeSound = useSound('/sounds/complete.mp3', 0.7);
  const startSound = useSound('/sounds/start.mp3', 0.7);

  // Вопросы для викторины
  const quizQuestions = [
    {
      id: 1,
      question: "Какая планета Солнечной системы самая горячая?",
      options: ["Меркурий", "Венера", "Марс", "Юпитер"],
      correctAnswer: 1,
      fact: "Венера - самая горячая планета из-за плотной атмосферы, создающей сильный парниковый эффект!",
      difficulty: "easy"
    },
    {
      id: 2,
      question: "Какой космический аппарат первым достиг Юпитера?",
      options: ["Вояджер-1", "Пионер-10", "Галилео", "Кассини"],
      correctAnswer: 1,
      fact: "Пионер-10 был запущен в 1972 году и первым достиг Юпитера в 1973!",
      difficulty: "medium"
    },
    {
      id: 3,
      question: "Сколько спутников у Марса?",
      options: ["0", "1", "2", "4"],
      correctAnswer: 2,
      fact: "У Марса два спутника - Фобос и Деймос, что в переводе означает 'Страх' и 'Ужас'!",
      difficulty: "easy"
    },
    {
      id: 4,
      question: "Какой элемент является основным в составе Солнца?",
      options: ["Гелий", "Кислород", "Водород", "Углерод"],
      correctAnswer: 2,
      fact: "Солнце на 73% состоит из водорода, который превращается в гелий в процессе термоядерного синтеза!",
      difficulty: "easy"
    },
    {
      id: 5,
      question: "В каком году человек впервые ступил на Луну?",
      options: ["1965", "1969", "1971", "1975"],
      correctAnswer: 1,
      fact: "Нил Армстронг ступил на Луну 20 июля 1969 года во время миссии Аполлон-11!",
      difficulty: "easy"
    },
    {
      id: 6,
      question: "Какая галактика является ближайшей к Млечному Пути?",
      options: ["Туманность Андромеды", "Галактика Треугольника", "Большое Магелланово Облако", "Малое Магелланово Облако"],
      correctAnswer: 0,
      fact: "Туманность Андромеды находится на расстоянии 2.5 миллионов световых лет и приближается к нам!",
      difficulty: "medium"
    },
    {
      id: 7,
      question: "Как называется самая высокая гора в Солнечной системе?",
      options: ["Эверест", "Олимп", "Аконкагуа", "Килиманджаро"],
      correctAnswer: 1,
      fact: "Гора Олимп на Марсе высотой 21 км - это в 2.5 раза выше Эвереста!",
      difficulty: "medium"
    },
    {
      id: 8,
      question: "Сколько длился полет Юрия Гагарина?",
      options: ["12 минут", "48 минут", "89 минут", "108 минут"],
      correctAnswer: 3,
      fact: "Полет Гагарина 12 апреля 1961 года длился 108 минут - один виток вокруг Земли!",
      difficulty: "medium"
    },
    {
      id: 9,
      question: "Что такое нейтронная звезда?",
      options: ["Молодая звезда", "Остаток сверхновой", "Звезда с нейтронной атмосферой", "Двойная звезда"],
      correctAnswer: 1,
      fact: "Нейтронные звезды - это сверхплотные остатки взорвавшихся массивных звезд!",
      difficulty: "hard"
    },
    {
      id: 10,
      question: "Какой телескоп был запущен в 2021 году как преемник Хаббла?",
      options: ["Джеймс Уэбб", "Спитцер", "Кеплер", "Чандра"],
      correctAnswer: 0,
      fact: "Телескоп Джеймса Уэбба изучает Вселенную в инфракрасном диапазоне!",
      difficulty: "easy"
    }
  ];

  // Обновление refs при изменении состояний
  useEffect(() => {
    isSoundOnRef.current = isSoundOn;
  }, [isSoundOn]);

  useEffect(() => {
    isAnswerSubmittedRef.current = isAnswerSubmitted;
  }, [isAnswerSubmitted]);

  // Звания в зависимости от результата
  const getRank = useCallback((score) => {
    const percentage = (score / quizQuestions.length) * 100;
    
    if (percentage >= 90) return {
      title: "👑 Повелитель Галактики",
      description: "Ваши знания о космосе поражают! Вы настоящий эксперт!",
      color: "#ffd700"
    };
    if (percentage >= 70) return {
      title: "🚀 Космический исследователь", 
      description: "Отличные знания! Вы готовы к межзвездным путешествиям!",
      color: "#4fc3f7"
    };
    if (percentage >= 50) return {
      title: "⭐ Юный астроном",
      description: "Хороший результат! Продолжайте изучать тайны Вселенной!",
      color: "#66bb6a"
    };
    if (percentage >= 30) return {
      title: "🌍 Начинающий космонавт",
      description: "Неплохо! Есть куда расти в изучении космоса!",
      color: "#ffa726"
    };
    return {
      title: "🌙 Космический турист",
      description: "Только начинаете свой путь? Космос ждет своих исследователей!",
      color: "#bdbdbd"
    };
  }, [quizQuestions.length]);

  // Очистка таймера
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerSound.stop();
  }, [timerSound]);

  // Запуск викторины
  const startQuiz = useCallback(() => {
    if (isSoundOn) {
      startSound.play();
    }
    setQuizState('playing');
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setAnsweredQuestions([]);
    setIsAnswerSubmitted(false);
    clearTimer();
  }, [isSoundOn, startSound, clearTimer]);

  // Обработка выбора ответа
  const handleAnswerSelect = useCallback((answerIndex) => {
    if (selectedAnswer !== null) return;
    
    clearTimer();
    
    if (isSoundOn) {
      clickSound.play();
    }
    
    setSelectedAnswer(answerIndex);
    setIsAnswerSubmitted(true);
    
    const isCorrect = answerIndex === quizQuestions[currentQuestion].correctAnswer;
    
    if (isSoundOn) {
      if (isCorrect) {
        correctSound.play();
      } else {
        wrongSound.play();
      }
    }
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    
    setAnsweredQuestions(prev => [...prev, {
      question: quizQuestions[currentQuestion],
      selectedAnswer: answerIndex,
      isCorrect,
      userAnswer: quizQuestions[currentQuestion].options[answerIndex],
      correctAnswerText: quizQuestions[currentQuestion].options[quizQuestions[currentQuestion].correctAnswer]
    }]);
  }, [currentQuestion, quizQuestions, isSoundOn, selectedAnswer, clearTimer, clickSound, correctSound, wrongSound]);

  // Переход к следующему вопросу
  const goToNextQuestion = useCallback(() => {
    clearTimer();
    
    if (isSoundOn) {
      clickSound.play();
    }
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
      setIsAnswerSubmitted(false);
    } else {
      if (isSoundOn) {
        completeSound.play();
      }
      setQuizState('results');
    }
  }, [currentQuestion, quizQuestions.length, isSoundOn, clearTimer, clickSound, completeSound]);

  // Обработка истечения времени
  const handleTimeOut = useCallback(() => {
    clearTimer();
    setIsAnswerSubmitted(true);
    setAnsweredQuestions(prev => [...prev, {
      question: quizQuestions[currentQuestion],
      selectedAnswer: null,
      isCorrect: false,
      userAnswer: "Время вышло",
      correctAnswerText: quizQuestions[currentQuestion].options[quizQuestions[currentQuestion].correctAnswer]
    }]);
  }, [currentQuestion, quizQuestions, clearTimer]);

  // Таймер с правильной логикой звука
  useEffect(() => {
    if (quizState === 'playing' && timeLeft > 0 && !isAnswerSubmitted) {
      timerRef.current = setTimeout(() => {
        const newTime = timeLeft - 1;
        setTimeLeft(newTime);

        // Воспроизводим звук таймера при 5,4,3,2,1 секундах
        if (newTime <= 5 && newTime > 0 && isSoundOnRef.current && !isAnswerSubmittedRef.current) {
          timerSound.play();
        }

        if (newTime === 0) {
          handleTimeOut();
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [quizState, timeLeft, isAnswerSubmitted, timerSound, handleTimeOut]);

  // Переключение звука
  const toggleSound = useCallback(() => {
    setIsSoundOn(prev => !prev);
  }, []);

  const getDifficultyColor = useCallback((difficulty) => {
    switch (difficulty) {
      case 'easy': return '#66bb6a';
      case 'medium': return '#ffa726';
      case 'hard': return '#ef5350';
      default: return '#bdbdbd';
    }
  }, []);

  const getDifficultyText = useCallback((difficulty) => {
    switch (difficulty) {
      case 'easy': return 'Легкий';
      case 'medium': return 'Средний';
      case 'hard': return 'Сложный';
      default: return 'Неизвестно';
    }
  }, []);

  return (
    <div className="space-quiz-page">
      <div className="video-background">
        <video autoPlay muted loop className="background-video" playsInline>
          <source src="/video/solar-system.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="sound-control">
        <SoundToggle isSoundOn={isSoundOn} onToggle={toggleSound} />
      </div>

      <div className="quiz-content">
        <div className="container">
          {quizState === 'intro' && (
            <div className="quiz-intro">
              <div className="intro-card">
                <div className="intro-icon">🧠</div>
                <h1>Космическая викторина</h1>
                <p className="intro-description">
                  Проверьте свои знания о космосе! Ответьте на {quizQuestions.length} вопросов 
                  и узнайте, какое космическое звание вы заслуживаете.
                </p>
                
                <div className="quiz-features">
                  <div className="feature">
                    <span className="feature-icon">⏱️</span>
                    <div className="feature-text">
                      <strong>30 секунд на вопрос</strong>
                      <span>Думайте быстро!</span>
                    </div>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">🎯</span>
                    <div className="feature-text">
                      <strong>3 уровня сложности</strong>
                      <span>От простого к сложному</span>
                    </div>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">🔊</span>
                    <div className="feature-text">
                      <strong>Звуковые эффекты</strong>
                      <span>Погрузитесь в атмосферу!</span>
                    </div>
                  </div>
                </div>

                <button className="start-quiz-btn" onClick={startQuiz}>
                  Начать викторину
                </button>
              </div>
            </div>
          )}

          {quizState === 'playing' && (
            <div className="quiz-playing">
              <div className="quiz-header">
                <div className="progress-info">
                  <span className="question-counter">
                    Вопрос {currentQuestion + 1} из {quizQuestions.length}
                  </span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="timer-score">
                  <div className={`timer ${timeLeft <= 10 && !isAnswerSubmitted ? 'warning' : ''}`}>
                    <span className="timer-icon">⏱️</span>
                    <span className="time-left">{timeLeft}с</span>
                  </div>
                  <div className="score">
                    <span className="score-icon">⭐</span>
                    <span className="score-value">{score}</span>
                  </div>
                </div>
              </div>

              <div className="question-card">
                <div className="question-header">
                  <span 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(quizQuestions[currentQuestion].difficulty) }}
                  >
                    {getDifficultyText(quizQuestions[currentQuestion].difficulty)}
                  </span>
                </div>
                
                <h2 className="question-text">
                  {quizQuestions[currentQuestion].question}
                </h2>

                <div className="answers-grid">
                  {quizQuestions[currentQuestion].options.map((option, index) => {
                    let buttonClass = "answer-btn";
                    
                    if (isAnswerSubmitted) {
                      if (index === quizQuestions[currentQuestion].correctAnswer) {
                        buttonClass += " correct";
                      } else if (index === selectedAnswer && index !== quizQuestions[currentQuestion].correctAnswer) {
                        buttonClass += " wrong";
                      }
                    }
                    
                    return (
                      <button
                        key={index}
                        className={buttonClass}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={isAnswerSubmitted}
                      >
                        <span className="answer-letter">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="answer-text">{option}</span>
                        
                        {isAnswerSubmitted && index === quizQuestions[currentQuestion].correctAnswer && (
                          <span className="answer-status">✓</span>
                        )}
                        {isAnswerSubmitted && index === selectedAnswer && index !== quizQuestions[currentQuestion].correctAnswer && (
                          <span className="answer-status">✗</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {isAnswerSubmitted && (
                  <div className="answer-feedback">
                    <div className="question-fact">
                      <div className="fact-icon">💡</div>
                      <p>{quizQuestions[currentQuestion].fact}</p>
                    </div>
                    
                    <button className="next-question-btn" onClick={goToNextQuestion}>
                      {currentQuestion < quizQuestions.length - 1 ? 'Следующий вопрос' : 'Завершить викторину'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {quizState === 'results' && (
            <div className="quiz-results">
              <div className="results-card">
                <div className="results-header">
                  <h1>Викторина завершена!</h1>
                  <p>Ваш результат:</p>
                  
                  <div className="score-circle">
                    <div className="score-number">{score}</div>
                    <div className="score-total">из {quizQuestions.length}</div>
                  </div>
                </div>

                <div className="rank-section">
                  {(() => {
                    const rank = getRank(score);
                    return (
                      <>
                        <h2 style={{ color: rank.color }}>{rank.title}</h2>
                        <p className="rank-description">{rank.description}</p>
                      </>
                    );
                  })()}
                </div>

                <div className="results-details">
                  <h3>Детали результатов:</h3>
                  <div className="questions-review">
                    {answeredQuestions.map((item, index) => (
                      <div key={index} className={`review-item ${item.isCorrect ? 'correct' : 'incorrect'}`}>
                        <div className="review-question">
                          <span className="question-number">Вопрос {index + 1}:</span>
                          <span className="question-text">{item.question.question}</span>
                        </div>
                        <div className="review-answers">
                          <div className="answer-detail">
                            <span className="answer-label">Ваш ответ:</span>
                            <span className={`answer-value ${item.isCorrect ? 'correct' : 'incorrect'}`}>
                              {item.userAnswer}
                              {item.isCorrect ? ' ✓' : ' ✗'}
                            </span>
                          </div>
                          {!item.isCorrect && (
                            <div className="answer-detail">
                              <span className="answer-label">Правильный ответ:</span>
                              <span className="answer-value correct">
                                {item.correctAnswerText} ✓
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="results-actions">
                  <button className="restart-btn" onClick={startQuiz}>
                    Пройти еще раз
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpaceQuizPage;