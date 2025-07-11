"use client";
import { useLayoutEffect, useRef, forwardRef } from "react";
import { useMergeRefs } from "~/app/hooks/use-merge-refs";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import type { Topology } from "topojson-specification";
import s from "./map.module.scss";

interface CountryProps {
  name?: string;
  NAME?: string;
  admin?: string;
  ADMIN?: string;
  agreement_pct?: number | null;
  n?: number | null;
}

const WIDTH = 1000;
const HEIGHT = 500;
const COUNTRIES_URL = "/data/countries-with-agreement.json";
const LAND_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json";
const M49_URL = "/data/2022-09-24__JSON_UNSD_M49.json";

export const WorldMap = forwardRef<HTMLDivElement>((_p, ref) => {
  const host = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);
  const mergedRef = useMergeRefs([host, ref]);

  useLayoutEffect(() => {
    const el = host.current;
    if (!el || rendered.current) return;
    rendered.current = true;

    const svg = d3
      .select(el)
      .append("svg")
      .attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`)
      .attr("preserveAspectRatio", "xMidYMid meet");
    const layer = svg.append("g");
    const projection = d3.geoNaturalEarth1().fitSize([WIDTH, HEIGHT], { type: "Sphere" });
    const path = d3.geoPath(projection);
    const color = d3.scaleSequential(d3.interpolateRgb("#923bad", "#37a157")).domain([0, 100]);

    const tooltip = d3
      .select(el)
      .append("div")
      .attr("class", s.tooltip || '')
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("padding", "4px 8px")
      .style("background", "rgba(0,0,0,0.8)")
      .style("color", "#fff")
      .style("font-size", "12px")
      .style("border-radius", "4px")
      .style("opacity", 0);

    Promise.all([
      d3.json<Topology>(LAND_URL),
      d3.json<Topology>(COUNTRIES_URL),
      d3.json(M49_URL),
    ])
      .then(([landTopo, countryTopo, m49Data]) => {
        if (!countryTopo) throw new Error("country topo missing");
        if (!m49Data) throw new Error("m49 data missing");

        const countryIdToRegion = new Map<string, string>();
        for (const d of m49Data as any[]) {
          const region = d["Intermediate Region Name"] || d["Sub-region Name"] || d["Region Name"];
          if (d["M49 Code"] && region) {
            countryIdToRegion.set(String(d["M49 Code"]), region);
          }
        }

        if (landTopo) {
          layer
            .append("path")
            .datum(topojson.feature(landTopo, (landTopo.objects as any).land))
            .attr("d", path)
            .attr("fill", "#f4f4f4")
            .attr("stroke", "#ccc");
        }

        const countries = (
          topojson.feature(countryTopo, (countryTopo.objects as any).countries) as unknown as {
            type: "FeatureCollection";
            features: GeoJSON.Feature<GeoJSON.Geometry, CountryProps>[];
          }
        ).features;

        const paths = layer
          .selectAll<SVGPathElement, typeof countries[number]>("path.country")
          .data(countries)
          .join("path")
          .classed("country", true)
          .attr("d", path as any)
          .attr("fill", (d) =>
            d.properties.agreement_pct == null ? "#d9d9d9" : color(d.properties.agreement_pct)
          )
          .attr("stroke", "#111")
          .attr("vector-effect", "non-scaling-stroke")
          .on("mousemove", (ev, d) => {
            const [x, y] = d3.pointer(ev, el);
            const countryName =
              d.properties.name ||
              d.properties.NAME ||
              d.properties.admin ||
              d.properties.ADMIN ||
              "Unknown";
            const regionName = countryIdToRegion.get(d.id as string);

            tooltip
              .style("left", `${x + 12}px`)
              .style("top", `${y + 12}px`)
              .style("opacity", 1)
              .html(
                `Country: ${countryName}<br>Region: ${regionName || "N/A"}<br>Region Agreement: ${
                  d.properties.agreement_pct != null
                    ? `${Math.round(d.properties.agreement_pct)}%`
                    : "—"
                } (n=${d.properties.n ?? "N/A"})`
              );
            d3.select(ev.currentTarget).attr("stroke-width", 2);
          })
          .on("mouseleave", (ev) => {
            tooltip.style("opacity", 0);
            d3.select(ev.currentTarget).attr("stroke-width", 1);
          });

        layer
          .append("path")
          .datum(
            topojson.mesh(
              countryTopo,
              (countryTopo.objects as any).countries,
              (a: any, b: any) => a !== b
            )
          )
          .attr("d", path)
          .attr("fill", "none")
          .attr("stroke", "#fff")
          .attr("stroke-linejoin", "round")
          .attr("vector-effect", "non-scaling-stroke");

        /* legend */
        const legendW = 160,
          legendH = 10;
        const defs = svg.append("defs");
        const grad = defs
          .append("linearGradient")
          .attr("id", "grad")
          .attr("x1", "0%")
          .attr("x2", "100%")
          .attr("y1", "0%")
          .attr("y2", "0%");

        grad
          .selectAll("stop")
          .data(d3.range(0, 101, 10))
          .enter()
          .append("stop")
          .attr("offset", (d) => `${d}%`)
          .attr("stop-color", (d) => color(d));

        const legend = svg
          .append("g")
          .attr("transform", `translate(${WIDTH - legendW - 40},${HEIGHT - 40})`);
        legend
          .append("rect")
          .attr("width", legendW)
          .attr("height", legendH)
          .attr("fill", "url(#grad)");
        legend
          .append("g")
          .attr("transform", `translate(0,${legendH})`)
          .call(
            d3
              .axisBottom(d3.scaleLinear([0, 100], [0, legendW]))
              .ticks(5)
              .tickFormat((d) => `${d}%` as any)
          )
          .attr("font-size", 10);
        legend
          .append("text")
          .attr("x", 0)
          .attr("y", -4)
          .attr("font-size", 12)
          .attr("fill", "#333")
          .text("Agreement (%)");
      })
      .catch((e) => console.error("map load error", e));

    return () => {
      d3.select(el).selectAll("*").remove();
    };
  }, []);

  return <div ref={mergedRef} className={s.mapSection} />;
});
WorldMap.displayName = "WorldMap"; 