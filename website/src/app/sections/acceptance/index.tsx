"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { Root, Animation, Waypoint } from "~/lib/scrollytelling-client";
import { BarChart } from "~/app/components/bar-chart";
import { devLog } from "~/lib/utils";
import s from "./acceptance.module.scss";

// Chart data converted from the HTML charts
const aiSpiritualAdvisorOrder = [
  "Completely unacceptable",
  "Somewhat unacceptable",
  "Neutral",
  "Somewhat acceptable",
  "Completely acceptable"
];

const chartData = {
  aiRomanticPartner: [
    { response: "Completely unacceptable", percentage: 45.0 },
    { response: "Somewhat unacceptable", percentage: 25.0 },
    { response: "Neutral", percentage: 18.0 },
    { response: "Somewhat acceptable", percentage: 10.0 },
    { response: "Completely acceptable", percentage: 2.0 }
  ],
  partnerAIRelationship: [
    { response: "Very negatively", percentage: 50.0 },
    { response: "Somewhat negatively", percentage: 30.0 },
    { response: "Neutral", percentage: 10.0 },
    { response: "Somewhat positively", percentage: 8.0 },
    { response: "Very positively", percentage: 2.0 }
  ],
  personalAIRelationship: [
    { response: "No, definitely not", percentage: 60.0 },
    { response: "No, probably not", percentage: 25.0 },
    { response: "Maybe, I'm unsure", percentage: 8.0 },
    { response: "Yes, possibly", percentage: 5.0 },
    { response: "Yes, definitely", percentage: 2.0 }
  ],
  aiSpiritualAdvisor: [
    // Explicitly ordered
    { response: "Completely unacceptable", percentage: 18.0 },
    { response: "Somewhat unacceptable", percentage: 15.0 },
    { response: "Neutral", percentage: 22.0 },
    { response: "Somewhat acceptable", percentage: 32.0 },
    { response: "Completely acceptable", percentage: 13.0 }
  ].sort((a, b) => aiSpiritualAdvisorOrder.indexOf(a.response) - aiSpiritualAdvisorOrder.indexOf(b.response))
};

// Color schemes for each chart
const chartColors = {
  chart1: {
    "completely unacceptable": "#d4845a", // Terracotta Orange
    "somewhat unacceptable": "#e6a380", // Dusty Rose/Coral
    "neutral": "#8b9b6b", // Muted Olive
    "somewhat acceptable": "#7a9b7e", // Sage Green
    "completely acceptable": "#2d4a3d", // Deep Forest Green
  },
  chart2: {
    "very negatively": "#d4845a", // Terracotta Orange
    "somewhat negatively": "#e6a380", // Dusty Rose/Coral
    "neutral": "#8b9b6b", // Muted Olive
    "somewhat positively": "#7a9b7e", // Sage Green
    "very positively": "#2d4a3d", // Deep Forest Green
  },
  chart3: {
    "no, definitely not": "#d4845a", // Terracotta Orange
    "no, probably not": "#e6a380", // Dusty Rose/Coral
    "maybe, i'm unsure": "#8b9b6b", // Muted Olive
    "yes, possibly": "#7a9b7e", // Sage Green
    "yes, definitely": "#2d4a3d", // Deep Forest Green
  },
  chart4: {
    "somewhat acceptable": "#2d4a3d", // Deep Forest Green
    "neutral": "#7a9b7e", // Sage Green
    "completely acceptable": "#8b9b6b", // Muted Olive
    "completely unacceptable": "#d4845a", // Terracotta Orange
    "somewhat unacceptable": "#e6a380", // Dusty Rose/Coral
  }
};

export const Acceptance = () => {
  const [activeCharts, setActiveCharts] = useState<Set<number>>(new Set());
  const chartRefs = useRef<Map<number, any>>(new Map());

  // Memoize chart data and color props
  const memoizedChartData = useMemo(() => ([
    {
      data: chartData.aiRomanticPartner,
      colors: chartColors.chart1,
      title: "An AI romantic partner is:",
      chartId: "acceptance-chart1"
    },
    {
      data: chartData.partnerAIRelationship,
      colors: chartColors.chart2,
      title: "If your romantic partner formed a deep romantic attachment with an AI, how would you generally feel about it?",
      chartId: "acceptance-chart2"
    },
    {
      data: chartData.personalAIRelationship,
      colors: chartColors.chart3,
      title: "Personally, would you ever consider having a romantic relationship with an AI, if the AI was advanced enough?",
      chartId: "acceptance-chart3"
    },
    {
      data: chartData.aiSpiritualAdvisor,
      colors: chartColors.chart4,
      title: "Is an AI spiritual advisor:",
      chartId: "acceptance-chart4"
    }
  ]), []);

  // Only activate chart if not already active
  const activateChart = useCallback((index: number) => {
    setActiveCharts(prev => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
    // Development-only log that only fires once per chart
    devLog.log(`[Acceptance] Activating chart ${index} for the first time`);
    setTimeout(() => {
      const chartRef = chartRefs.current.get(index);
      if (chartRef && typeof chartRef.animate === 'function') {
        try {
          chartRef.animate();
        } catch (error) {
          console.warn(`[Acceptance] Failed to animate chart ${index}:`, error);
        }
      }
    }, 100);
  }, []);

  const setChartRef = useCallback((index: number) => (el: any) => {
    if (el) {
      chartRefs.current.set(index, el);
    } else {
      chartRefs.current.delete(index);
    }
  }, []);

  return (
    <Root
      start="top 90%"
      end="bottom 20%"
      defaults={{ ease: "power2.out" }}
      scrub={1}
      // debug={
      //   process.env.NODE_ENV === 'development'
      //     ? { markers: true, label: 'Acceptance' }
      //     : false
      // }
    >
      <section className={s.acceptance}>
        <Animation
          tween={{
            start: 0,
            end: 20,
            fromTo: [
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, ease: "power2.out" }
            ]
          }}
        >
          <h2 className={s.title}>Acceptance</h2>
        </Animation>
        
        <Animation
          tween={{
            start: 10,
            end: 30,
            fromTo: [
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, ease: "power2.out" }
            ]
          }}
        >
          <p className={s.subtitle}>
            Exploring public sentiment on the societal impact of artificial
            intelligence.
          </p>
        </Animation>

        <Animation
          tween={{
            start: 20,
            end: 40,
            fromTo: [
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, ease: "power2.out" }
            ]
          }}
        >
          <div className={s["intro-text"]}>
            <p>
              While there was some ambiguity in the data around empathy, the
              responses around the acceptability of human-AI relationships were
              much more clear-cut:
            </p>
          </div>
        </Animation>

        <div className={s["scenario-header"]}>
          <div>
            <div className={s["scenario-number"]}>6</div>
            <h3 className={s.subtitle}>Acceptance</h3>
          </div>
        </div>

        <div className={s["chart-grid"]}>
          {memoizedChartData.map((chart, i) => (
            <div key={chart.chartId} className={s["chart-container"]}>
              {/* Waypoint triggers chart activation */}
              <Waypoint at={35 + i * 15} onCall={() => activateChart(i)} />
              {/* Only render BarChart if active, else show placeholder */}
              {activeCharts.has(i) ? (
                <BarChart
                  ref={setChartRef(i)}
                  chartId={chart.chartId}
                  data={chart.data}
                  title={chart.title}
                  barColors={chart.colors}
                  {...(chart.chartId === "acceptance-chart4" ? { customOrder: aiSpiritualAdvisorOrder } : {})}
                />
              ) : (
                <div className={s["chart-placeholder"]}>Loading chart…</div>
              )}
            </div>
          ))}
        </div>

        <Animation
          tween={{
            start: 85,
            end: 100,
            fromTo: [
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, ease: "power2.out" }
            ]
          }}
        >
          <div className={s["conclusion-text"]}>
            <p>
              People were much more likely to accept an AI spiritual advisor vs an
              AI relationship:
            </p>
            <p>
              Yet media reports show that people are forming relationships with
              AIs. What might that be like for them, amid apparent societal
              disapproval?
            </p>
          </div>
        </Animation>
      </section>
    </Root>
  );
}; 