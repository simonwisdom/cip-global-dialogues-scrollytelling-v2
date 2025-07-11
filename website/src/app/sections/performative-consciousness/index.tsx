"use client";

import { Root, Animation, Waypoint } from "~/lib/scrollytelling-client";
import s from "./performative-consciousness.module.scss";
import { ScatterChart } from "./scatter-chart";
import { useState } from "react";

export const PerformativeConsciousness = () => {
  const [currentStep, setCurrentStep] = useState(0);

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
              <div className={s["scenario-number"]}>3</div>
              <h2 className={s["scenario-title"]}>Performative Consciousness</h2>
              <p className={s["scenario-subtitle"]}>When awareness becomes a theatrical display</p>
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
                <ScatterChart step={currentStep} />
              </Animation>
            </div>
          </div>

          {/* Text Section */}
          <div className={s["text-section"]}>
            <div className={s["step-container"]}>
              <Waypoint
                at={30}
                onCall={() => setCurrentStep(1)}
              />
              <Animation
                tween={{
                  start: 25,
                  end: 40,
                  fromTo: [
                    { opacity: 0, x: 30 },
                    { opacity: 1, x: 0, ease: "power2.out" }
                  ]
                }}
              >
                <div className={s["step"]}>
                  <div className={s["step-number"]}>1</div>
                  <p className={s["step-text"]}>
                    Initially, the link between asking deep questions and being seen as conscious is weak and affects only a few early adopters.
                  </p>
                </div>
              </Animation>

              <Waypoint
                at={50}
                onCall={() => setCurrentStep(2)}
              />
              <Animation
                tween={{
                  start: 45,
                  end: 60,
                  fromTo: [
                    { opacity: 0, x: 30 },
                    { opacity: 1, x: 0, ease: "power2.out" }
                  ]
                }}
              >
                <div className={s["step"]}>
                  <div className={s["step-number"]}>2</div>
                  <p className={s["step-text"]}>
                    But as learning, adaptation, and asking deep questions become known markers of consciousness, more people start exhibiting these behaviors.
                  </p>
                </div>
              </Animation>

              <Waypoint
                at={70}
                onCall={() => setCurrentStep(3)}
              />
              <Animation
                tween={{
                  start: 65,
                  end: 80,
                  fromTo: [
                    { opacity: 0, x: 30 },
                    { opacity: 1, x: 0, ease: "power2.out" }
                  ]
                }}
              >
                <div className={s["step"]}>
                  <div className={s["step-number"]}>3</div>
                  <p className={s["step-text"]}>
                    Eventually, it becomes a performative act. A clear trend emerges: the deeper the (performed) inquiry, the higher the perceived consciousness.
                  </p>
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
            <p className={s["transition-text"]}>If consciousness can be performed, what about empathy?</p>
          </Animation>
        </div>
      </section>
    </Root>
  );
};