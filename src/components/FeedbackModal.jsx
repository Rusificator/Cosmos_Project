import React, { useState, useEffect } from 'react';
import './FeedbackModal.css';

const FeedbackModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
    agree: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Восстановление данных из LocalStorage при загрузке компонента
  useEffect(() => {
    const savedData = localStorage.getItem('feedbackFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (e) {
        console.error('Error restoring form data:', e);
      }
    }
  }, []); // Пустой массив зависимостей - выполняется только при монтировании

  // Сохранение данных в LocalStorage при каждом изменении формы
  useEffect(() => {
    if (Object.values(formData).some(value => value !== '' && value !== false)) {
      localStorage.setItem('feedbackFormData', JSON.stringify(formData));
    }
  }, [formData]); // Зависимость от formData - выполняется при каждом изменении

  // Обработка изменения полей формы
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Валидация формы
  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.message || !formData.agree) {
      setMessage({ text: 'Пожалуйста, заполните все обязательные поля', type: 'error' });
      return false;
    }

    if (!isValidEmail(formData.email)) {
      setMessage({ text: 'Введите корректный email адрес', type: 'error' });
      return false;
    }

    if (!isValidPhone(formData.phone)) {
      setMessage({ text: 'Введите корректный номер телефона', type: 'error' });
      return false;
    }

    return true;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  // Отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Здесь будет ваша реальная endpoint URL от formcarry.com
      const response = await fetch('https://formcarry.com/s/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.code === 200) {
        setMessage({ text: 'Сообщение успешно отправлено!', type: 'success' });
        
        // Очистка формы и LocalStorage только после успешной отправки
        setTimeout(() => {
          clearFormData();
          onClose();
          setMessage({ text: '', type: '' });
        }, 2000);
      } else {
        throw new Error(result.message || 'Ошибка отправки');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage({ text: 'Ошибка при отправке формы. Попробуйте еще раз.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для очистки данных формы
  const clearFormData = () => {
    const emptyFormData = {
      fullName: '',
      email: '',
      phone: '',
      organization: '',
      message: '',
      agree: false
    };
    setFormData(emptyFormData);
    localStorage.removeItem('feedbackFormData');
  };

  // Закрытие модального окна при клике на фон
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Обработчик закрытия модального окна (без очистки данных)
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Обратная связь</h2>
          <button 
            type="button" 
            className="close-btn"
            onClick={handleClose}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">ФИО *</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email *</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">Телефон *</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="organization" className="form-label">Организация</label>
              <input
                type="text"
                className="form-control"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Сообщение *</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                className="form-checkbox"
                id="agree"
                name="agree"
                checked={formData.agree}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="agree" className="checkbox-label">
                Согласен с политикой обработки персональных данных *
              </label>
            </div>

            {message.text && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}

            <div className="form-buttons">
              <button 
                type="button" 
                className="clear-btn"
                onClick={clearFormData}
                disabled={isLoading}
              >
                Очистить форму
              </button>
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Отправка...' : 'Отправить'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;