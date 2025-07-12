import React, { useEffect, useRef, useState, forwardRef } from "react";
import * as d3 from "d3";
import s from "./seems-conscious.module.scss";

const CSV_PATH = "/data/regional_consciousness_raw.csv";
const METRICS = ["Autonomy", "Originality", "Inner Life"];
const CELL_WIDTH = 80;
const CELL_HEIGHT = 32;
const MARGIN = { top: 60, right: 40, bottom: 40, left: 180 };

interface RegionalRow {
  Region: string;
  [metric: string]: string | number | undefined;
}

function getColorScale(min: number, max: number) {
  return d3.scaleSequential(d3.interpolateGreens).domain([min, max]);
}

export const RegionalConsciousnessTable = forwardRef<HTMLDivElement>((props, ref) => {
  const [data, setData] = useState<RegionalRow[]>([]);
  const [minValue, setMinValue] = useState(0.3);
  const [maxValue, setMaxValue] = useState(0.63);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    region: string;
    metric: string;
    value: number;
  } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    d3.csv(CSV_PATH, d3.autoType).then((rows) => {
      setData(rows as RegionalRow[]);
      // Compute min/max for color scale
      const values: number[] = [];
      (rows as RegionalRow[]).forEach((row) => {
        METRICS.forEach((metric) => {
          const v = row[metric];
          if (typeof v === "number") values.push(v);
        });
      });
      setMinValue(d3.min(values) ?? 0.3);
      setMaxValue(d3.max(values) ?? 0.63);
    });
  }, []);

  const colorScale = getColorScale(minValue, maxValue);
  const width = METRICS.length * CELL_WIDTH + MARGIN.left + MARGIN.right;
  const height = data.length * CELL_HEIGHT + MARGIN.top + MARGIN.bottom;

  return (
    <div ref={ref} className={s["regional-consciousness-split"]}>
      <div className={s["regional-consciousness-text"]}>
        <p>
          When an AI system does the following, how much does it make you feel that the AI might have some form of consciousness or self-awareness?
        </p>
      </div>
      <div className={s["regional-consciousness-table-container"]}>
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className={s["regional-consciousness-svg"]}
        >
          <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
            {/* Column headers */}
            {METRICS.map((metric, i) => (
              <text
                key={metric}
                className={s["metric-label"]}
                x={i * CELL_WIDTH + CELL_WIDTH / 2}
                y={-18}
                textAnchor="middle"
                fontWeight={700}
                fontSize={16}
                fill="#223"
              >
                {metric}
              </text>
            ))}
            {/* Rows */}
            {data.map((row, rowIdx) => (
              <g key={row.Region} transform={`translate(0,${rowIdx * CELL_HEIGHT})`}>
                {/* Region label */}
                <text
                  className={s["region-label"]}
                  x={-12}
                  y={CELL_HEIGHT / 2}
                  textAnchor="end"
                  fontWeight={700}
                  fontSize={14}
                  fill="#333"
                  alignmentBaseline="middle"
                >
                  {row.Region}
                </text>
                {/* Cells */}
                {METRICS.map((metric, colIdx) => {
                  const v = row[metric];
                  const value = typeof v === "number" ? v : 0;
                  return (
                    <g key={metric}>
                      <rect
                        className={s["cell"]}
                        x={colIdx * CELL_WIDTH}
                        y={0}
                        width={CELL_WIDTH}
                        height={CELL_HEIGHT}
                        rx={8}
                        fill={colorScale(value)}
                        stroke="#fff"
                        strokeWidth={2}
                        style={{ cursor: "pointer", transition: "stroke 0.2s" }}
                        onMouseMove={e => {
                          const svgRect = svgRef.current?.getBoundingClientRect();
                          setTooltip({
                            x: e.clientX - (svgRect?.left ?? 0) + 10,
                            y: e.clientY - (svgRect?.top ?? 0) - 28,
                            region: row.Region,
                            metric,
                            value,
                          });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      />
                      <text
                        className={s["cell-text"]}
                        x={colIdx * CELL_WIDTH + CELL_WIDTH / 2}
                        y={CELL_HEIGHT / 2}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fontWeight={700}
                        fontSize={12}
                        fill={value > (minValue + maxValue) / 2 ? "#fff" : "#222"}
                      >
                        {Math.round(value * 100)}%
                      </text>
                    </g>
                  );
                })}
              </g>
            ))}
          </g>
        </svg>
        {/* Tooltip */}
        {tooltip && (
          <div
            className={s["regional-consciousness-tooltip"]}
            style={{
              left: tooltip.x,
              top: tooltip.y,
              position: "absolute",
              background: "rgba(0,0,0,0.85)",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: 6,
              fontSize: 13,
              pointerEvents: "none",
              zIndex: 10,
              opacity: 1,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <strong>{tooltip.region}</strong>
            <br />
            {tooltip.metric}: {tooltip.value.toFixed(4)}
          </div>
        )}
        {/* Legend */}
        <div className={s["regional-consciousness-legend"]}>
          <div className={s["legend-item"]}>
            <div
              className={s["legend-color"]}
              style={{ background: d3.interpolateGreens(0.1) }}
            ></div>
            <span>Low (~0.30)</span>
          </div>
          <div className={s["legend-item"]}>
            <div
              className={s["legend-color"]}
              style={{ background: d3.interpolateGreens(0.55) }}
            ></div>
            <span>Medium (~0.47)</span>
          </div>
          <div className={s["legend-item"]}>
            <div
              className={s["legend-color"]}
              style={{ background: d3.interpolateGreens(0.85) }}
            ></div>
            <span>High (~0.63)</span>
          </div>
        </div>
      </div>
    </div>
  );
});

RegionalConsciousnessTable.displayName = "RegionalConsciousnessTable"; 