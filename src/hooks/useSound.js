import { useRef, useEffect, useState, useCallback } from 'react';

const useSound = (soundFile, volume = 1.0) => {
  const audioRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Создаем audio элемент
    audioRef.current = new Audio(soundFile);
    audioRef.current.volume = volume;
    audioRef.current.preload = 'auto';

    const handleCanPlay = () => {
      setIsLoaded(true);
    };

    audioRef.current.addEventListener('canplaythrough', handleCanPlay);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplaythrough', handleCanPlay);
        audioRef.current = null;
      }
    };
  }, [soundFile, volume]);

  const play = useCallback(() => {
    if (audioRef.current && isLoaded) {
      audioRef.current.currentTime = 0; // Перематываем в начало
      audioRef.current.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    }
  }, [isLoaded]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { play, stop, isLoaded };
};

export default useSound;