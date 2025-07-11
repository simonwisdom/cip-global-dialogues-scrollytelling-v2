"use client";

import { useRef, createRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "../../hooks/use-iso-layout-effect";
import s from "./human-concerns.module.scss";
import { BarChart } from "../../components/bar-chart";
import { surveyData } from "./data";

export const HumanConcerns = () => {
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

        ScrollTrigger.create({
          trigger: row,
          pin: true,
          start: "top top",
          end: "+=100%",
          pinSpacing: true,
          onEnter: () => {
            gsap.to(chartWrapper, { autoAlpha: 1, duration: 0.5 });
            if (chartRef && chartRef.current) chartRef.current.animate();
          },
          onLeave: () => {
            gsap.to(chartWrapper, { autoAlpha: 0, duration: 0.2 });
            if (chartRef && chartRef.current) chartRef.current.reset();
          },
          onEnterBack: () => {
            gsap.to(chartWrapper, { autoAlpha: 1, duration: 0.5 });
            if (chartRef && chartRef.current) chartRef.current.animate();
          },
          onLeaveBack: () => {
            gsap.to(chartWrapper, { autoAlpha: 0, duration: 0.2 });
            if (chartRef && chartRef.current) chartRef.current.reset();
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
      <div className={s.narrative}>
        <p>
          Are we choosing where we want AI just based on where we value
          humanity? Or maybe consciousness?
        </p>
        <p>
          People seem to care about consciousness as it relates to empathy and
          connection.
        </p>
        <p>
          In fact - without a human sense of ‘care’ or ‘understanding’ - people
          reported being reluctant to use an AI for emotional support over the
          long term. Even if it had helped them feel better beforehand.
        </p>
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
            <div
              key={chart.id}
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
                />
              </div>
            </div>
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