"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import s from "./scatter-chart.module.scss";

interface DataPoint {
  x: number;
  y: number;
  group: 'Early Adopters' | 'Performers';
  size: number;
}

const baseData: DataPoint[] = [
  { x: 1, y: 2, group: 'Early Adopters', size: 6 },
  { x: 1.5, y: 2.5, group: 'Early Adopters', size: 8 },
  { x: 2, y: 1.8, group: 'Early Adopters', size: 7 },
];

const performativeData: DataPoint[] = [
  { x: 4, y: 5, group: 'Performers', size: 10 },
  { x: 4.5, y: 6, group: 'Performers', size: 12 },
  { x: 5, y: 5.5, group: 'Performers', size: 11 },
  { x: 6, y: 7, group: 'Performers', size: 14 },
  { x: 6.5, y: 8, group: 'Performers', size: 16 },
  { x: 7, y: 7.5, group: 'Performers', size: 15 },
];

interface ScatterChartProps {
  step: number;
}

export const ScatterChart = forwardRef<HTMLDivElement, ScatterChartProps>(
  ({ step }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentData, setCurrentData] = useState<DataPoint[]>(
      step === 0 ? [] : baseData
    );

    useEffect(() => {
      switch (step) {
        case 1:
          setCurrentData(baseData);
          break;
        case 2:
          setCurrentData([...baseData, ...performativeData.slice(0, 3)]);
          break;
        case 3:
          setCurrentData([...baseData, ...performativeData]);
          break;
        default:
          setCurrentData([]);
      }
    }, [step]);

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
      const chartWidth = rect.width - 80;
      const chartHeight = rect.height - 80;
      const offsetX = 60;
      const offsetY = 20;

      // Draw background grid
      ctx.strokeStyle = 'rgba(32, 96, 149, 0.1)';
      ctx.lineWidth = 1;
      
      // Vertical grid lines
      for (let i = 0; i <= 8; i++) {
        const x = offsetX + (i / 8) * chartWidth;
        ctx.beginPath();
        ctx.moveTo(x, offsetY);
        ctx.lineTo(x, offsetY + chartHeight);
        ctx.stroke();
      }
      
      // Horizontal grid lines
      for (let i = 0; i <= 10; i++) {
        const y = offsetY + chartHeight - (i / 10) * chartHeight;
        ctx.beginPath();
        ctx.moveTo(offsetX, y);
        ctx.lineTo(offsetX + chartWidth, y);
        ctx.stroke();
      }

      // Draw axes
      ctx.strokeStyle = '#206095';
      ctx.lineWidth = 2;
      
      // X-axis
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY + chartHeight);
      ctx.lineTo(offsetX + chartWidth, offsetY + chartHeight);
      ctx.stroke();
      
      // Y-axis
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
      ctx.lineTo(offsetX, offsetY + chartHeight);
      ctx.stroke();

      // Draw axis labels
      ctx.fillStyle = '#206095';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      
      // X-axis label
      ctx.fillText('Depth of Inquiry', offsetX + chartWidth / 2, offsetY + chartHeight + 35);
      
      // Y-axis label
      ctx.save();
      ctx.translate(25, offsetY + chartHeight / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('Perceived Consciousness', 0, 0);
      ctx.restore();

      // Draw data points
      currentData.forEach((point) => {
        const x = offsetX + (point.x / 8) * chartWidth;
        const y = offsetY + chartHeight - (point.y / 10) * chartHeight;
        
        // Point color based on group
        const color = point.group === 'Early Adopters' ? '#1d6996' : '#73af48';
        
        // Draw point
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, point.size, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw point border
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Draw legend
      const legendY = offsetY + 20;
      const legendSpacing = 120;
      
      // Early Adopters legend
      ctx.fillStyle = '#1d6996';
      ctx.beginPath();
      ctx.arc(offsetX + chartWidth - 180, legendY, 8, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.fillStyle = '#333';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Early Adopters', offsetX + chartWidth - 165, legendY + 4);
      
      // Performers legend (if data exists)
      if (currentData.some(d => d.group === 'Performers')) {
        ctx.fillStyle = '#73af48';
        ctx.beginPath();
        ctx.arc(offsetX + chartWidth - 60, legendY, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.fillStyle = '#333';
        ctx.fillText('Performers', offsetX + chartWidth - 45, legendY + 4);
      }

    }, [currentData]);

    return (
      <div className={s["chart-container"]} ref={ref}>
        <h3 className={s["chart-title"]}>
          The Performance of Consciousness
        </h3>
        <canvas
          ref={canvasRef}
          className={s["chart-canvas"]}
          width={500}
          height={400}
        />
        <p className={s["chart-description"]}>
          Correlation between depth of inquiry and perceived consciousness over
          time
        </p>
      </div>
    );
  }
);

ScatterChart.displayName = "ScatterChart";