"use client";

import { forwardRef, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "~/app/hooks/use-iso-layout-effect";
import { BarChart } from "~/app/components/bar-chart";
import s from "./emotional-understanding-poll.module.scss";

export const EmotionalUnderstandingPoll = forwardRef<HTMLDivElement, {}>(
  (props, ref) => {
    const pollData = {
      question:
        "Have you ever felt an AI truly understood your emotions or seemed conscious?",
      options: [
        { response: "Yes", percentage: 36 },
        { response: "No", percentage: 64 },
      ],
      insight:
        "More than 1 in 3 people have experienced emotional understanding from AI",
    };

    const chartRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useIsoLayoutEffect(() => {
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 80%",
          onEnter: () => {
            console.log("ScrollTrigger entered for EmotionalUnderstandingPoll. chartRef.current:", chartRef.current);
            if (chartRef.current) {
              chartRef.current.animate();
            }
          },
          once: true,
        });
      }, containerRef);
      return () => ctx.revert();
    }, []);

    return (
      <div ref={ref}>
        <div ref={containerRef} className={s["poll-container"]} {...props}>
          <h3 className={s["question"]}>{pollData.question}</h3>
          <div className={s["chart-wrapper"]}>
            <BarChart
              ref={chartRef}
              chartId="emotional-understanding-poll"
              data={pollData.options}
              sortBy="response"
              barColors={{ yes: '#2ecc71', no: '#a8d8b9' }}
            />
          </div>
          <div className={s["insight-container"]}>
            <p className={s["insight-text"]}>{pollData.insight}</p>
          </div>
        </div>
      </div>
    );
  }
);

EmotionalUnderstandingPoll.displayName = "EmotionalUnderstandingPoll";