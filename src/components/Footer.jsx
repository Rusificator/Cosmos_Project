import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Cosmic Explorer</h3>
            <p>Исследуйте тайны Вселенной вместе с нами</p>
          </div>
          <div className="footer-section">
            <h4>Разделы</h4>
            <ul>
              <li><a href="/">Главная</a></li>
              <li><a href="/planets">Планеты</a></li>
              <li><a href="#missions">Космические миссии</a></li>
              <li><a href="#gallery">Галерея</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Контакты</h4>
            <p>email: info@cosmic-explorer.ru</p>
            <p>телефон: +7 (999) 123-45-67</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Cosmic Explorer. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;