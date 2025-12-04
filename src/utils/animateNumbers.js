// src/utils/animateNumbers.js

export const animateNumber = (element, targetValue, duration = 2000) => {
  const startValue = 0;
  const startTime = performance.now();
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const animate = (currentTime) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easedProgress = easeOutQuart(progress);
    const currentValue = Math.floor(easedProgress * targetValue);
    
    // Форматируем число с разделителями
    element.textContent = currentValue.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Добавляем окончательное значение
      element.textContent = targetValue.toLocaleString();
    }
  };

  requestAnimationFrame(animate);
};

export const initStatsAnimation = () => {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach((element) => {
    const targetValue = parseInt(element.getAttribute('data-target'));
    if (!isNaN(targetValue)) {
      animateNumber(element, targetValue);
    }
  });
};

// Добавляем функцию для наблюдения за появлением элементов
export const observeStats = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumber = entry.target.querySelector('.stat-number');
          if (statNumber) {
            const targetValue = parseInt(statNumber.getAttribute('data-target'));
            if (!isNaN(targetValue) && statNumber.textContent === '0') {
              animateNumber(statNumber, targetValue);
            }
          }
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    }
  );

  const statItems = document.querySelectorAll('.stat-item');
  statItems.forEach((item) => {
    observer.observe(item);
  });

  return observer;
};