'use client';

import { useState, useEffect } from 'react';
import styles from './custom-cursor.module.scss';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Don't render anything on the server to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={styles.customCursor}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}; 