"use client";

import { useEffect } from 'react';

const CURSOR_STYLE = `
  position: fixed;
  width: 20px;
  height: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease;
  mix-blend-mode: difference;
`;

export const useCustomCursor = (glitchSelector: string) => {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.style.cssText = CURSOR_STYLE;
    document.body.appendChild(cursor);

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX - 10}px`;
      cursor.style.top = `${e.clientY - 10}px`;
    };

    const onMouseEnter = () => {
      cursor.style.transform = 'scale(2)';
    };

    const onMouseLeave = () => {
      cursor.style.transform = 'scale(1)';
    };

    document.addEventListener('mousemove', onMouseMove);

    const glitchElements = document.querySelectorAll(glitchSelector);
    glitchElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      glitchElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      document.body.removeChild(cursor);
    };
  }, [glitchSelector]);
}; 