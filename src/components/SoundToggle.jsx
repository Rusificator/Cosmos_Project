import React from 'react';
import '../styles/sound-toggle.css';

const SoundToggle = ({ isSoundOn, onToggle }) => {
  return (
    <button 
      className={`sound-toggle ${isSoundOn ? 'on' : 'off'}`}
      onClick={onToggle}
      aria-label={isSoundOn ? 'Выключить звук' : 'Включить звук'}
    >
      <span className="sound-icon">
        {isSoundOn ? '🔊' : '🔇'}
      </span>
      <span className="sound-text">
        {isSoundOn ? 'Звук вкл' : 'Звук выкл'}
      </span>
    </button>
  );
};

export default SoundToggle;