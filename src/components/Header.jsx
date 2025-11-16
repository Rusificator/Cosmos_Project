import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FeedbackModal from './FeedbackModal';
import '../styles/header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openFeedback = () => {
    setIsFeedbackOpen(true);
    setIsMenuOpen(false);
  };

  const closeFeedback = () => {
    setIsFeedbackOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  const handleMoreMenuMouseEnter = () => {
    setIsMoreMenuOpen(true);
  };

  const handleMoreMenuMouseLeave = () => {
    setIsMoreMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <span className="logo-icon">🌌</span>
              <span className="logo-text">Cosmic Explorer</span>
            </Link>
            
            <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
              <ul className="nav-list">
                <li><Link to="/" className="nav-link" onClick={closeMobileMenu}>Главная</Link></li>
                <li><Link to="/planets" className="nav-link" onClick={closeMobileMenu}>Планеты</Link></li>
                <li><Link to="/missions" className="nav-link" onClick={closeMobileMenu}>Миссии</Link></li>
                <li><Link to="/gallery" className="nav-link" onClick={closeMobileMenu}>Галерея</Link></li>

                 <li 
                  className="nav-item dropdown"
                  onMouseEnter={handleMoreMenuMouseEnter}
                  onMouseLeave={handleMoreMenuMouseLeave}
                >
                  <button 
                    className="nav-link dropdown-toggle"
                    onClick={toggleMoreMenu}
                  >
                    Разное
                  </button>
                  <ul className={`dropdown-menu ${isMoreMenuOpen ? 'show' : ''}`}>
                    <li>
                      <Link 
                        to="/weight-calculator" 
                        className="dropdown-link"
                        onClick={closeMobileMenu}
                      >
                        <span className="dropdown-icon">⚖️</span>
                        Калькулятор веса на планетах
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/space-quiz" 
                        className="dropdown-link"
                        onClick={closeMobileMenu}
                      >
                        <span className="dropdown-icon">🧠</span>
                        Космическая викторина
                      </Link>
                    </li>
                  </ul>
                </li>



                <li><button className="contact-btn" onClick={openFeedback}>Связь с нами</button></li>
              </ul>
            </nav>

            <button 
              className="mobile-menu-btn"
              onClick={toggleMenu}
              aria-label="Открыть меню"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={closeFeedback} 
      />
    </>
  );
};

export default Header;