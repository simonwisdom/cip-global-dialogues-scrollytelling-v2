"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle, useState, useCallback } from "react";
import * as d3 from "d3";
import s from "./bar-chart.module.scss";

type DataPoint = {
  response: string;
  percentage: number;
};

type BarChartProps = {
  chartId: string;
  data: DataPoint[];
  title?: string;
  sortBy?: "percentage" | "response";
  barColors?: { [key: string]: string };
  customOrder?: string[]; // New prop for manual ordering
};

export const BarChart = forwardRef(
  ({ chartId, data, title, sortBy = "percentage", barColors, customOrder }: BarChartProps, ref) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const gRef = useRef<SVGGElement | null>(null);
    const heightRef = useRef(0);
    const xRef = useRef<d3.ScaleLinear<number, number, never> | null>(null);

    // Track if animation has already run
    const [hasAnimated, setHasAnimated] = useState(false);

    useImperativeHandle(ref, () => ({
      animate() {
        if (!gRef.current || !xRef.current || hasAnimated) return;
        const g = d3.select(gRef.current);
        const x = xRef.current;
        g.selectAll(".bar")
          .transition()
          .duration(800)
          .delay((_d, i) => i * 100)
          .attr("width", (d: any) => x(d.percentage));
        g.selectAll(".bar-label")
          .transition()
          .duration(800)
          .delay((_d, i) => i * 100 + 400)
          .style("opacity", 1);
        setHasAnimated(true);
      },
      reset() {
        if (!gRef.current) return;
        const g = d3.select(gRef.current);
        g.selectAll(".bar").attr("width", 0);
        g.selectAll(".bar-label").style("opacity", 0);
        setHasAnimated(false);
      },
    }), [hasAnimated]);

    const wrap = (text: any, width: number) => {
      text.each(function (this: any) {
        const text = d3.select(this);
        const words = text.text().split(/\s+/).reverse();
        let word;
        let line: string[] = [];
        let lineNumber = 0;
        const lineHeight = 1.1; // ems
        const y = text.attr("y");
        const dy = parseFloat(text.attr("dy"));
        let tspan = text
          .text(null)
          .append("tspan")
          .attr("x", -10)
          .attr("y", y)
          .attr("dy", dy + "em");

        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node()!.getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text
              .append("tspan")
              .attr("x", -10)
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word);
          }
        }
      });
    };

    const drawChart = useCallback(() => {
      if (!chartContainerRef.current) return;

      // Clear previous chart
      d3.select(chartContainerRef.current).selectAll("*").remove();

      const container = d3.select(chartContainerRef.current);
      const containerNode = container.node();
      if (!containerNode) return;

      const containerRect = containerNode.getBoundingClientRect();
      // Dynamically calculate left margin based on longest label
      const labelFont = "14.4px Arial, sans-serif";
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      let maxLabelWidth = 0;
      let sortedData: DataPoint[];
      if (customOrder && Array.isArray(customOrder)) {
        // Sort by custom order
        sortedData = [...data].sort((a, b) => customOrder.indexOf(a.response) - customOrder.indexOf(b.response));
      } else if (sortBy === "percentage") {
        sortedData = [...data].sort((a, b) => b.percentage - a.percentage);
      } else {
        sortedData = [...data];
      }
      if (ctx) {
        ctx.font = labelFont;
        maxLabelWidth = Math.max(
          ...sortedData.map((d) => ctx.measureText(d.response).width)
        );
      }
      const margin = {
        top: 10,
        right: 20,
        bottom: 10,
        // Increase minimum left margin for y-axis labels
        left: Math.max(100, Math.ceil(maxLabelWidth) + 50), // 50px generous padding, min 100px
      };
      const barHeight = 36; // Minimum height per bar for readability
      const height = barHeight * data.length;
      heightRef.current = height;
      const width = containerRect.width - margin.left - margin.right;

      const svg = container
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      gRef.current = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)
        .node();

      const g = d3.select(gRef.current);

      xRef.current = d3
        .scaleLinear()
        .domain([0, d3.max(sortedData, (d) => d.percentage) ?? 0])
        .nice()
        .range([0, width]);
      const x = xRef.current;

      const y = d3
        .scaleBand()
        .domain(sortedData.map((d) => d.response))
        .range([0, height])
        .padding(0.2); // Slightly less padding for more bars

      g.append("g")
        .attr("class", "axis y-axis")
        .call(d3.axisLeft(y).tickSize(0))
        .selectAll(".tick text")
        .style("fill", "#223") // Ensure dark, visible color
        .style("font-size", "15px");
      g.select(".domain").remove();

      const bars = g
        .selectAll(".bar")
        .data(sortedData)
        .enter()
        .append("rect")
        .attr("class", (d) => {
          const baseClass = "bar";
          if (barColors) {
            return baseClass;
          }
          const responseClass = s[`bar-${d.response.toLowerCase()}`];
          return `${baseClass} ${responseClass || ""}`;
        })
        .attr("y", (d) => y(d.response)!)
        .attr("height", y.bandwidth())
        .attr("x", 0)
        .attr("width", 0);

      if (barColors) {
        bars.attr("fill", (d) => barColors[d.response.toLowerCase()] || null);
      }

      g.selectAll(".bar-label")
        .data(sortedData)
        .enter()
        .append("text")
        .attr("class", (d) => {
          const base = `bar-label bar-label-${d.response.toLowerCase()}`;
          // Will add 'outside' class if label is outside the bar
          return base;
        })
        .attr("x", (d) => {
          const barEnd = x(d.percentage);
          return barEnd < 40 ? barEnd + 6 : barEnd - 10;
        })
        .attr("y", (d) => y(d.response)! + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", (d) => {
          const barEnd = x(d.percentage);
          return barEnd < 40 ? "start" : "end";
        })
        .text((d) => d.percentage.toFixed(0) + "%")
        .style("opacity", 0);

      const tooltip = d3.select(tooltipRef.current);
      bars
        .on("mouseover", function (_event, d) {
          tooltip
            .style("opacity", 1)
            .html(`<strong>${d.response}</strong><br>${d.percentage.toFixed(0)}%`);
        })
        .on("mousemove", function (event) {
          tooltip
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 10 + "px");
        })
        .on("mouseout", function () {
          tooltip.style("opacity", 0);
        });
    }, [data, sortBy, customOrder, barColors]);

    useEffect(() => {
      drawChart();
      setHasAnimated(false); // Reset animation state on data/sortBy change

      const handleResize = () => {
        drawChart();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [data, sortBy, customOrder, drawChart]);

    const colorClassNumber = chartId.replace(/[^0-9]/g, '');
    const dynamicColorClass = s[`chart-colors-${colorClassNumber}`] || '';

    return (
      <div className={s["chart-wrapper"]}>
        {title && <div className={s["chart-title"]}>{title}</div>}
        <div
          id={chartId}
          ref={chartContainerRef}
          className={`${s.chart} ${dynamicColorClass}`}
        ></div>
        <div ref={tooltipRef} className={s.tooltip}></div>
      </div>
    );
  }
); 