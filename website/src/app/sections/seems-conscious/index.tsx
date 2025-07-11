"use client";

import s from "./seems-conscious.module.scss";
import { WorldMap } from "./map";

export const SeemsConscious = () => {
  return (
      <section className={s["scenario"]}>
        {/* Scenario Header */}
        <div className={s["scenario-header"]}>
            <div>
              <div className={s["scenario-number"]}>2</div>
              <h2 className={s["scenario-title"]}>Seeming Conscious</h2>

            </div>
        </div>

        {/* Chart */}
        <div className={s["chart-container"]}>
          <h3 className={s["chart-title"]}>
            Have you ever felt an AI truly understood your emotions or seemed
            conscious?
          </h3>
          <WorldMap />
        </div>

        {/* Data Source Note */}
          <div className={s["data-source-card"]}>
            <p className={s["data-source-note"]}>
              Source: Global Dialogues GD4 - Question: &quot;Have you ever felt an AI truly understood your emotions or seemed conscious?&quot;
            </p>
          </div>
      </section>
  );
}; 