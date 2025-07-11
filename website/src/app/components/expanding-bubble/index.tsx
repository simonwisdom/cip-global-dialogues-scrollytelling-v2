"use client";

import { useRef, forwardRef, useState, useImperativeHandle } from 'react';
import { gsap } from 'gsap';
import s from './expanding-bubble.module.scss';
import { useIsoLayoutEffect } from '~/app/hooks/use-iso-layout-effect';

interface Particle {
  r: number;
}

export interface ExpandingBubbleRef {
  burst: () => void;
}

export const ExpandingBubble = forwardRef<ExpandingBubbleRef, { onBurstComplete?: () => void }>(
  ({ onBurstComplete }, ref) => {
    const bubbleRef = useRef<SVGSVGElement>(null);
    const mainBubbleRef = useRef<SVGCircleElement>(null);
    const particlesRef = useRef<SVGGElement>(null);
    const [particles, setParticles] = useState<Particle[]>([]);

    // Generate particle data on the client to avoid hydration mismatch
    useIsoLayoutEffect(() => {
      setParticles(
        Array.from({ length: 15 }).map(() => ({
          r: gsap.utils.random(5, 15),
        }))
      );
    }, []);

    const burst = () => {
      if (particles.length === 0) return;
      
      const bubble = mainBubbleRef.current;
      if (!bubble || !particlesRef.current) return;

      const particleElements = Array.from(particlesRef.current.children);
      const tl = gsap.timeline({ onComplete: onBurstComplete });

      tl.to(bubble, {
        opacity: 0,
        duration: 0.1,
      });

      particleElements.forEach((p) => {
        const v = {
          x: gsap.utils.random(-200, 200),
          y: gsap.utils.random(-200, 200),
          scale: gsap.utils.random(0.2, 0.8),
        };
        tl.to(
          p,
          {
            x: v.x,
            y: v.y,
            scale: v.scale,
            opacity: 0,
            duration: gsap.utils.random(0.5, 1.5),
            ease: 'power2.out',
          },
          '<'
        );
      });
    };

    useImperativeHandle(ref, () => ({
      burst,
    }));

    return (
      <div className={s.container}>
        <svg ref={bubbleRef} className={s.bubbleSvg} viewBox="-200 -200 400 400">
          <defs>
            <radialGradient id="bubbleGradient" cx="40%" cy="40%" r="60%">
              <stop
                offset="0%"
                style={{ stopColor: 'rgba(255, 255, 255, 0.7)' }}
              />
              <stop
                offset="100%"
                style={{ stopColor: 'rgba(255, 107, 107, 0.3)' }}
              />
            </radialGradient>
          </defs>
          <circle
            ref={mainBubbleRef}
            cx="0"
            cy="0"
            r="100"
            fill="url(#bubbleGradient)"
          />
          <g ref={particlesRef}>
            {particles.map((particle, i) => (
              <circle
                key={i}
                cx="0"
                cy="0"
                r={particle.r}
                fill="url(#bubbleGradient)"
              />
            ))}
          </g>
        </svg>
      </div>
    );
  }
);

ExpandingBubble.displayName = 'ExpandingBubble'; 