"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
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
};

export const BarChart = forwardRef(
  ({ chartId, data, title, sortBy = "percentage" }: BarChartProps, ref) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const gRef = useRef<SVGGElement | null>(null);
    const heightRef = useRef(0);
    const xRef = useRef<d3.ScaleLinear<number, number, never> | null>(null);

    useImperativeHandle(ref, () => ({
      animate() {
        if (!gRef.current || !xRef.current) return;
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
      },
      reset() {
        if (!gRef.current) return;
        const g = d3.select(gRef.current);
        g.selectAll(".bar").attr("width", 0);
        g.selectAll(".bar-label").style("opacity", 0);
      },
    }));


    const drawChart = () => {
      if (!chartContainerRef.current) return;

      // Clear previous chart
      d3.select(chartContainerRef.current).selectAll("*").remove();

      const container = d3.select(chartContainerRef.current);
      const containerNode = container.node();
      if (!containerNode) return;

      const containerRect = containerNode.getBoundingClientRect();
      const margin = { top: 20, right: 40, bottom: 40, left: 150 };
      const width = containerRect.width - margin.left - margin.right;
      heightRef.current = 400 - margin.top - margin.bottom;
      const height = heightRef.current;

      const sortedData =
        sortBy === "percentage"
          ? [...data].sort((a, b) => b.percentage - a.percentage)
          : [...data];

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
        .padding(0.2);

      g.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(5).tickFormat((d) => d + "%"));

      g.append("g")
        .attr("class", "axis y-axis")
        .call(d3.axisLeft(y));

      g.append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 5)
        .style("text-anchor", "middle")
        .text("Percentage");

      const bars = g
        .selectAll(".bar")
        .data(sortedData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("y", (d) => y(d.response)!)
        .attr("height", y.bandwidth())
        .attr("x", 0)
        .attr("width", 0);

      g.selectAll(".bar-label")
        .data(sortedData)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", (d) => x(d.percentage) + 5)
        .attr("y", (d) => y(d.response)! + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "start")
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
    };

    useEffect(() => {
      drawChart();

      const handleResize = () => {
        drawChart();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [data, sortBy]);

    const colorClassNumber = chartId.replace('chart', '');

    return (
      <div className={s["chart-wrapper"]}>
        {title && <div className={s["chart-title"]}>{title}</div>}
        <div
          id={chartId}
          ref={chartContainerRef}
          className={`${s.chart} ${s[`chart-colors-${colorClassNumber}`]}`}
        ></div>
        <div ref={tooltipRef} className={s.tooltip}></div>
      </div>
    );
  }
); 