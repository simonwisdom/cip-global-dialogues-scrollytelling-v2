"use client";

import React from 'react';
import s from './glitch-text.module.scss';

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ children, className }) => {
  return (
    <span className={`${s.glitch} ${className || ''}`}>
      {children}
    </span>
  );
}; 