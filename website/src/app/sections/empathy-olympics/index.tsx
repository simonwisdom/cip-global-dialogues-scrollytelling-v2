"use client";

import { Root, Animation, Waypoint } from "~/lib/scrollytelling-client";
import s from "./empathy-olympics.module.scss";
import { EmpathyBarChart } from "./empathy-bar-chart";
import { useState } from "react";

export const EmpathyOlympics = () => {
  const [currentScenario, setCurrentScenario] = useState<'start' | 'scenario1' | 'scenario2'>('start');

  return (
    <Root
      defaults={{ ease: "linear" }}
    >
      <section className={s["scenario"]}>
        {/* Scenario Header */}
        <div className={s["scenario-header"]}>
          <Animation
            tween={{
              start: 0,
              end: 15,
              fromTo: [
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, ease: "power2.out" }
              ]
            }}
          >
            <div>
              <div className={s["scenario-number"]}>4</div>
              <h2 className={s["scenario-title"]}>The Empathy Olympics</h2>
              <p className={s["scenario-subtitle"]}>Competitive compassion in the age of AI</p>
            </div>
          </Animation>
        </div>

        {/* Split Screen Content */}
        <div className={s["split-screen"]}>
          {/* Chart Section */}
          <div className={s["chart-section"]}>
            <div className={s["chart-container"]}>
              <Animation
                tween={{
                  start: 15,
                  end: 25,
                  fromTo: [
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, ease: "power2.out" }
                  ]
                }}
              >
                <EmpathyBarChart scenario={currentScenario} />
              </Animation>
            </div>
          </div>

          {/* Text Section */}
          <div className={s["text-section"]}>
            <div className={s["step-container"]}>
              <Waypoint
                at={25}
                onCall={() => setCurrentScenario('start')}
              />
              <Animation
                tween={{
                  start: 20,
                  end: 40,
                  fromTo: [
                    { opacity: 0, x: 30 },
                    { opacity: 1, x: 0, ease: "power2.out" }
                  ]
                }}
              >
                <div className={s["step"]}>
                  <div className={s["step-icon"]}>🏆</div>
                  <div className={s["step-content"]}>
                    <h4 className={s["step-title"]}>The Competition Begins</h4>
                    <p className={s["step-text"]}>
                      In a world desperately seeking uniquely human traits, empathy becomes a competitive sport. Humans start to compete against each other in tests of compassion.
                    </p>
                  </div>
                </div>
              </Animation>

              <Waypoint
                at={50}
                onCall={() => setCurrentScenario('scenario1')}
              />
              <Animation
                tween={{
                  start: 45,
                  end: 65,
                  fromTo: [
                    { opacity: 0, x: 30 },
                    { opacity: 1, x: 0, ease: "power2.out" }
                  ]
                }}
              >
                <div className={s["step"]}>
                  <div className={s["step-icon"]}>🎭</div>
                  <div className={s["step-content"]}>
                    <h4 className={s["step-title"]}>Performance Pressure</h4>
                    <p className={s["step-text"]}>
                      It's common for people to feign empathy in order to be seen as more human. The pressure to perform compassion becomes overwhelming.
                    </p>
                  </div>
                </div>
              </Animation>

              <Waypoint
                at={75}
                onCall={() => setCurrentScenario('scenario2')}
              />
              <Animation
                tween={{
                  start: 70,
                  end: 90,
                  fromTo: [
                    { opacity: 0, x: 30 },
                    { opacity: 1, x: 0, ease: "power2.out" }
                  ]
                }}
              >
                <div className={s["step"]}>
                  <div className={s["step-icon"]}>😔</div>
                  <div className={s["step-content"]}>
                    <h4 className={s["step-title"]}>The Breaking Point</h4>
                    <p className={s["step-text"]}>
                      This can become exhausting, and some people decide to stop pretending, or start to question whether they are human at all.
                    </p>
                  </div>
                </div>
              </Animation>
            </div>
          </div>
        </div>

        {/* Transition Element */}
        <div className={s["transition"]}>
          <Animation
            tween={{
              start: 85,
              end: 100,
              fromTo: [
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, ease: "power2.out" }
              ]
            }}
          >
            <p className={s["transition-text"]}>Perhaps we'll find meaning in what can't be measured...</p>
          </Animation>
        </div>
      </section>
    </Root>
  );
};