"use client";

import { useEffect, useRef, useState } from "react";
import s from "./emotion-chart.module.scss";

export const EmotionChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let animationFrame: number;
    let startTime: number;
    const duration = 3000; // 3 seconds

    const emotions = [
      { label: 'Fear', value: 0, targetValue: 85, color: '#ff6b6b', x: 100, y: 80 },
      { label: 'Uncertainty', value: 0, targetValue: 92, color: '#ffa726', x: 200, y: 60 },
      { label: 'Doubt', value: 0, targetValue: 78, color: '#ab47bc', x: 300, y: 90 }
    ];

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      // Draw background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 10; i++) {
        const x = i * 40;
        const y = i * 20;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 200);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(400, y);
        ctx.stroke();
      }

      // Animate emotion bars
      emotions.forEach((emotion, index) => {
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        emotion.value = emotion.targetValue * easeOutQuart;

        // Draw bar
        const barHeight = emotion.value * 1.5;
        const barWidth = 60;
        
        ctx.fillStyle = emotion.color;
        ctx.fillRect(emotion.x - barWidth/2, 180 - barHeight, barWidth, barHeight);

        // Draw label
        ctx.fillStyle = 'white';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(emotion.label, emotion.x, 200);

        // Draw value
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(`${Math.round(emotion.value)}%`, emotion.x, 180 - barHeight - 10);
      });

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (isAnimating) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isAnimating]);

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => setIsAnimating(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={s["chart-container"]}>
      <h3 className={s["chart-title"]}>Emotional Response to AI Consciousness Research</h3>
      <canvas
        ref={canvasRef}
        className={s["chart-canvas"]}
        width={400}
        height={200}
      />
      <p className={s["chart-description"]}>
        Measured emotional responses among consciousness researchers as AI capabilities advanced
      </p>
    </div>
  );
};