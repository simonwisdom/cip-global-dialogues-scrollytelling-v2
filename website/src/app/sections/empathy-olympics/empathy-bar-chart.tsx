"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import s from "./empathy-bar-chart.module.scss";

interface Contestant {
  id: string;
  name: string;
  score: number;
  color: string;
  type: 'human' | 'ai';
}

const baseContestants: Contestant[] = [
  { id: 'human-a', name: 'Human A', score: 60, color: '#1d6996', type: 'human' },
  { id: 'ai-3', name: 'AI Model 3', score: 55, color: '#73af48', type: 'ai' },
  { id: 'human-b', name: 'Human B', score: 40, color: '#1d6996', type: 'human' },
  { id: 'ai-4', name: 'AI Model 4', score: 85, color: '#73af48', type: 'ai' }
];

interface EmpathyBarChartProps {
  scenario: 'start' | 'scenario1' | 'scenario2';
}

export const EmpathyBarChart = forwardRef<
  HTMLDivElement,
  EmpathyBarChartProps
>(({ scenario }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    let newContestants = [...baseContestants];
    
    switch (scenario) {
      case 'start':
        setContestants(newContestants.sort((a, b) => a.score - b.score));
        break;
      case 'scenario1':
        // AI is better at recognizing subtle cues
        newContestants.find(c => c.id === 'ai-4')!.score = 90;
        newContestants.find(c => c.id === 'human-a')!.score = 70;
        setContestants(newContestants.sort((a, b) => a.score - b.score));
        break;
      case 'scenario2':
        // Human shows genuine, unprompted compassion
        newContestants.find(c => c.id === 'human-b')!.score = 95;
        newContestants.find(c => c.id === 'ai-4')!.score = 75;
        setContestants(newContestants.sort((a, b) => a.score - b.score));
        break;
    }
  }, [scenario]);

  useEffect(() => {
    // Animate progress from 0 to 1 over 1 second
    setAnimationProgress(0);
    const startTime = Date.now();
    const duration = 1000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimationProgress(eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => requestAnimationFrame(animate), 100);
    return () => clearTimeout(timer);
  }, [contestants]);

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

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

    // Chart dimensions
    const chartWidth = rect.width - 140;
    const chartHeight = rect.height - 80;
    const offsetX = 120;
    const offsetY = 40;
    const barHeight = chartHeight / contestants.length - 20;

    // Draw background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = offsetX + (i / 10) * chartWidth;
      ctx.beginPath();
      ctx.moveTo(x, offsetY);
      ctx.lineTo(x, offsetY + chartHeight);
      ctx.stroke();
    }

    // Draw contestants
    contestants.forEach((contestant, index) => {
      const y = offsetY + index * (barHeight + 20) + 10;
      const barWidth = (contestant.score / 100) * chartWidth * animationProgress;

      // Draw bar
      ctx.fillStyle = contestant.color;
      ctx.fillRect(offsetX, y, barWidth, barHeight);

      // Draw bar border
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.strokeRect(offsetX, y, barWidth, barHeight);

      // Draw contestant name
      ctx.fillStyle = '#333';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(contestant.name, offsetX - 10, y + barHeight / 2 + 5);

      // Draw score
      if (barWidth > 50) {
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.fillText(`${Math.round(contestant.score * animationProgress)}`, offsetX + 10, y + barHeight / 2 + 5);
      } else {
        ctx.fillStyle = '#333';
        ctx.textAlign = 'left';
        ctx.fillText(`${Math.round(contestant.score * animationProgress)}`, offsetX + barWidth + 10, y + barHeight / 2 + 5);
      }

      // Draw type indicator
      const typeIndicator = contestant.type === 'human' ? '👤' : '🤖';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(typeIndicator, offsetX - 30, y + barHeight / 2 + 8);
    });

    // Draw x-axis labels
    ctx.fillStyle = '#666';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    
    for (let i = 0; i <= 10; i++) {
      const x = offsetX + (i / 10) * chartWidth;
      const value = (i * 10);
      ctx.fillText(value.toString(), x, offsetY + chartHeight + 20);
    }

    // Draw axis title
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Empathy Score', offsetX + chartWidth / 2, offsetY + chartHeight + 40);

  }, [contestants, animationProgress]);

  const getScenarioDescription = () => {
    switch (scenario) {
      case 'start':
        return 'Initial empathy competition results';
      case 'scenario1':
        return 'AI demonstrates superior pattern recognition in emotional cues';
      case 'scenario2':
        return 'Human shows authentic, spontaneous compassion';
      default:
        return '';
    }
  };

  return (
    <div className={s["chart-container"]} ref={ref}>
      <h3 className={s["chart-title"]}>
        Empathy Competition Results
      </h3>
      <canvas
        ref={canvasRef}
        className={s["chart-canvas"]}
        width={500}
        height={350}
      />
      <p className={s["chart-description"]}>
        {getScenarioDescription()}
      </p>
      <div className={s["legend"]}>
        <div className={s["legend-item"]}>
          <div className={s["legend-color"]} style={{ backgroundColor: '#1d6996' }}></div>
          <span>Humans</span>
        </div>
        <div className={s["legend-item"]}>
          <div className={s["legend-color"]} style={{ backgroundColor: '#73af48' }}></div>
          <span>AI Models</span>
        </div>
      </div>
    </div>
  );
});

EmpathyBarChart.displayName = "EmpathyBarChart";