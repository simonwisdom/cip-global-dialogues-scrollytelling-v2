"use client";

import React, { useRef, createRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "../../hooks/use-iso-layout-effect";
import s from "./human-concerns.module.scss";
import { BarChart } from "../../components/bar-chart";
import { surveyData } from "./data";
import { devLog } from "~/lib/utils";

// Custom color schemes for each chart using the provided palette
const chartColors = {
  chart1: {
    "very likely": "#2d4a3d", // Deep Forest Green
    "somewhat likely": "#7a9b7e", // Sage Green
    "neutral / not sure": "#8b9b6b", // Muted Olive
    "somewhat unlikely": "#e6a380", // Dusty Rose/Coral
    "very unlikely": "#d4845a", // Terracotta Orange
  },
  chart2: {
    "true empathy": "#2d4a3d", // Deep Forest Green
    "physical comfort": "#d4845a", // Terracotta Orange
    "unconditional love": "#7a9b7e", // Sage Green
    "deep mutual trust": "#e6a380", // Dusty Rose/Coral
    "shared experiences": "#8b9b6b", // Muted Olive
    "spontaneity": "#f2c57c", // Golden Yellow
    "moral judgment": "#f7d4a8", // Soft Peach
    "other": "#f5f0d8", // Warm Cream/Ivory
    "none of the above": "#2d4a3d", // Deep Forest Green
  },
  chart3: {
    "strengthen connection": "#2d4a3d", // Deep Forest Green
    "mixed effects": "#7a9b7e", // Sage Green
    "weaken connection": "#d4845a", // Terracotta Orange
    "no significant impact": "#8b9b6b", // Muted Olive
    "not sure": "#e6a380", // Dusty Rose/Coral
  },
  chart4: {
    "loss of genuine connection": "#2d4a3d", // Deep Forest Green
    "over-dependence on ai": "#d4845a", // Terracotta Orange
    "decline in empathy/skills": "#7a9b7e", // Sage Green
    "manipulation of vulnerable": "#e6a380", // Dusty Rose/Coral
    "erosion of privacy": "#8b9b6b", // Muted Olive
    "widespread isolation": "#f2c57c", // Golden Yellow
    "no strong fears": "#f7d4a8", // Soft Peach
    "other": "#f5f0d8", // Warm Cream/Ivory
  },
  chart5: {
    "enhanced learning/growth": "#2d4a3d", // Deep Forest Green
    "accessible mental health": "#d4845a", // Terracotta Orange
    "stronger support networks": "#7a9b7e", // Sage Green
    "reduction in loneliness": "#e6a380", // Dusty Rose/Coral
    "increased happiness": "#8b9b6b", // Muted Olive
    "no strong hopes": "#f2c57c", // Golden Yellow
    "other": "#f7d4a8", // Soft Peach
  },
};

export const HumanConcerns = () => {
  // Development-only log that only fires once on mount
  devLog.log('[HumanConcerns] Component mounted');
  const containerRef = useRef<HTMLElement>(null);
  const chartRefs = useRef(surveyData.map(() => createRef<any>()));

  useIsoLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLDivElement>(
        containerRef.current?.querySelectorAll(`.${s["content-row"]}`) || []
      );

      rows.forEach((row, i) => {
        const chartRef = chartRefs.current[i];
        const chartWrapper = row.querySelector<HTMLDivElement>(
          `.${s["chart-wrapper"]}`
        );
        if (!chartWrapper) return;

        gsap.set(chartWrapper, { autoAlpha: 0 }); // hide initially

        const pinnedClass = s["pinned-row"] || "pinned-row";
        ScrollTrigger.create({
          trigger: row,
          pin: true,
          start: "top top",
          end: "+=100%",
          pinSpacing: true,
          onEnter: () => {
            row.classList.add(pinnedClass);
            gsap.to(chartWrapper, { autoAlpha: 1, duration: 0.5 });
            if (chartRef && chartRef.current) chartRef.current.animate();
          },
          onEnterBack: () => {
            row.classList.add(pinnedClass);
            gsap.to(chartWrapper, { autoAlpha: 1, duration: 0.5 });
            if (chartRef && chartRef.current) chartRef.current.animate();
          },
          onLeave: () => {
            row.classList.remove(pinnedClass);
          },
          onLeaveBack: () => {
            row.classList.remove(pinnedClass);
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const chart3OrdinalOrder = [
    "Strengthen connection",
    "Mixed effects",
    "Weaken connection",
    "No significant impact",
    "Not sure",
  ];

  return (
    <section className={s["human-concerns"]} ref={containerRef}>
      {/* New Section Header */}
      <div className={s["scenario-header"]}>
        <div>
          <div className={s["scenario-number"]}>4</div>
          <h2 className={s["scenario-title"]}>Human Concerns About AI Empathy</h2>
  
        </div>
      </div>
      {/* Animate header entrance */}
      {/* Narrative moved below header */}
 

      <div className={s["section-title"]}>
        <h3>
          Without a human sense of <b>‘care’ or ‘understanding’</b> -
          people reported being <b>reluctant to use an AI</b> for{" "}
          <b>emotional support</b> over the <b>long term</b>. Even if it had{" "}
          <b>helped them feel better</b> beforehand.
        </h3>
      </div>

      <div className={s["content-container"]}>
        {surveyData.map((chart, i) => {
          let chartData = chart.data;
          if (chart.id === "chart3") {
            chartData = [...chart.data].sort(
              (a, b) =>
                chart3OrdinalOrder.indexOf(a.response) -
                chart3OrdinalOrder.indexOf(b.response)
            );
          }
          return (
            <React.Fragment key={chart.id}>
              {chart.id === "chart2" && (
                <div className={s["section-title"]}>
                  <h3>
                    People believe <b>empathy</b> to be{" "}
                    <b>profoundly human</b>, something that{" "}
                    <b>cannot be properly performed</b> even by the{" "}
                    <b>most advanced AI</b>.
                  </h3>
                </div>
              )}
              {chart.id === "chart4" && (
                <div className={s["section-title"]}>
                  <h3>
                    Yet - despite some <b>optimism</b> about{" "}
                    <b>AI assisted connection</b> - they were particularly
                    concerned about a <b>decline in empathy</b> and{" "}
                    <b>human connection</b> due to AI.
                  </h3>
                </div>
              )}
              <div
                className={`${s["content-row"]} ${
                  i % 2 !== 0 ? s["row-reversed"] : ""
                }`}
              >
                <div className={s["text-wrapper"]}>
                  <div
                    className={`${s["text-section"]} ${s["speech-bubble"]} ${
                      i % 2 === 0 ? s.right : s.left
                    }`}
                  >
                    <p
                      dangerouslySetInnerHTML={{
                        __html: chart.title,
                      }}
                    />
                  </div>
                </div>
                <div className={s["chart-wrapper"]}>
                  <BarChart
                    ref={chartRefs.current[i]}
                    chartId={chart.id}
                    data={chartData}
                    sortBy={
                      chart.id === "chart1" || chart.id === "chart3"
                        ? "response"
                        : "percentage"
                    }
                    barColors={chartColors[chart.id as keyof typeof chartColors]}
                  />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <div className={s.narrative}>
        <p>
          It’s hard to know what conclusion to draw from this data, beyond a
          sense that people care about empathy, worry about AI in emotional
          roles (and yet use it for emotional support) and believe that empathy
          is deeply human.
        </p>
        <p>
          What’s a middle way between these responses? Might human empathy
          become a prized asset? one of the only remaining ways for humans to
          compete? And might that be so bad for human connection, after all?
        </p>
      </div>
    </section>
  );
}; 