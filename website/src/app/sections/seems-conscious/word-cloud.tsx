"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import cloud from "d3-cloud";
import * as d3 from "d3";
import { useMousePosition } from "~/app/hooks/use-mouse-position";

gsap.registerPlugin(ScrollTrigger);

type WordData = {
  text: string;
  size: number;
  x: number;
  y: number;
  ox: number;
  oy: number;
  jx: number;
  jy: number;
  rx: number;
  ry: number;
};

interface Props {
  words: Omit<WordData, 'x' | 'y' | 'ox' | 'oy' | 'jx' | 'jy' | 'rx' | 'ry'>[];
  color: string;
}

export const WordCloud = ({ words, color }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const mousePos = useMousePosition(svgRef);
  const wordDataRef = useRef<WordData[]>([]);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg || words.length === 0) return;

    d3.select(svg).selectAll("*").remove();

    const wordsCopy = words.map(w => ({ ...w }));

    const layout = cloud<any>()
      .size([800, 600])
      .words(wordsCopy)
      .padding(2)
      .rotate(0)
      .font("Inter")
      .fontSize(d => d.size)
      .on("end", (layoutWords: WordData[]) => {
        wordDataRef.current = layoutWords.map(lw => ({
          ...lw,
          ox: lw.x,
          oy: lw.y,
          jx: 0, jy: 0,
          rx: 0, ry: 0
        }));

        if (!svg) return;
        
        const g = d3
          .select(svg)
          .attr("viewBox", "-400 -300 800 600")
          .append("g")
          .attr("text-anchor", "middle");

        const texts = g
          .selectAll("text")
          .data(layoutWords)
          .enter()
          .append("text")
          .attr("fill", color)
          .attr("font-size", d => d.size)
          .text(d => d.text)
          .nodes() as SVGTextElement[];

        texts.forEach((el, i) => {
          const word = layoutWords[i];
          if (word) {
            gsap.set(el, { x: word.x, y: word.y });
          }
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: svg,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }).fromTo(
          texts,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            stagger: { each: 0.05, from: "random" },
            ease: "power2.out",
          },
        );
      });

    layout.start();

    return () => {
      layout.stop();
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (svg) {
        d3.select(svg).selectAll("*").remove();
      }
    };
  }, [words, color]);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg || wordDataRef.current.length === 0) return;

    const texts = svg.querySelectorAll('text');
    if (texts.length === 0) return;

    const jiggleTl = gsap.to(wordDataRef.current, {
      jx: () => gsap.utils.random(-16, 16),
      jy: () => gsap.utils.random(-16, 16),
      duration: 1.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: { each: 0.07, from: 'random' }
    });

    let repelTicker: (() => void) | undefined;
    const handleMouseEnter = () => {
      repelTicker = () => {
        const svgRect = svg.getBoundingClientRect();
        const viewBox = svg.viewBox.baseVal;
        if (!viewBox || svgRect.width === 0 || svgRect.height === 0) return;

        const scaleX = viewBox.width / svgRect.width;
        const scaleY = viewBox.height / svgRect.height;
        const mouseInSvgSpace = {
          x: mousePos.current.x * scaleX + viewBox.x,
          y: mousePos.current.y * scaleY + viewBox.y,
        };

        wordDataRef.current.forEach(wordData => {
          const dx = wordData.ox! - mouseInSvgSpace.x;
          const dy = wordData.oy! - mouseInSvgSpace.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          const maxRepelDistance = 150;
          let repelX = 0;
          let repelY = 0;

          if (distance < maxRepelDistance) {
            const repelForce = (maxRepelDistance - distance) / maxRepelDistance;
            repelX = (dx / distance) * repelForce * 80;
            repelY = (dy / distance) * repelForce * 80;
          }
  
          gsap.to(wordData, {
              rx: repelX,
              ry: repelY,
              duration: 0.3,
              ease: 'power2.out',
          });
        });
      };
      gsap.ticker.add(repelTicker);
    };

    const handleMouseLeave = () => {
      if (repelTicker) {
        gsap.ticker.remove(repelTicker);
        repelTicker = undefined;
      }
      gsap.to(wordDataRef.current, {
          rx: 0,
          ry: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.3)'
      });
    };

    svg.addEventListener('mouseenter', handleMouseEnter);
    svg.addEventListener('mouseleave', handleMouseLeave);

    const updatePositions = () => {
      wordDataRef.current.forEach((wordData, i) => {
        const textElement = texts[i];
        if (textElement) {
          gsap.set(textElement, {
            x: wordData.ox! + wordData.jx! + wordData.rx!,
            y: wordData.oy! + wordData.jy! + wordData.ry!,
          });
        }
      });
    };
    gsap.ticker.add(updatePositions);

    return () => {
      jiggleTl.kill();
      if (repelTicker) gsap.ticker.remove(repelTicker);
      gsap.ticker.remove(updatePositions);
      svg.removeEventListener('mouseenter', handleMouseEnter);
      svg.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [words, color, mousePos]);

  return <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />;
}; 