"use client";

import { useEffect, useRef } from 'react';
import s from './background-particles.module.scss';

export const BackgroundParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particleCount = 50;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = s.particle ?? '';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 20}s`;
      particle.style.animationDuration = `${15 + Math.random() * 10}s`;
      fragment.appendChild(particle);
    }

    container.appendChild(fragment);

    return () => {
      // Clean up particles when the component unmounts
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div ref={containerRef} className={s['bg-particles']} />;
}; 