"use client";

import { Root, Animation } from "~/lib/scrollytelling-client";
import s from "./solipsism-scenario.module.scss";
import { EmotionChart } from "./emotion-chart";

export const SolipsismScenario = () => {
  return (
    <Root 
      end="bottom bottom" 
      defaults={{ ease: "linear" }}
    >
      <section className={s["scenario"]}>
        {/* Scenario Header */}
        <div className={s["scenario-header"]}>
          <Animation
            tween={{
              start: 0,
              end: 20,
              fromTo: [
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, ease: "power2.out" }
              ]
            }}
          >
            <div>
              <div className={s["scenario-number"]}>1</div>
              <h2 className={s["scenario-title"]}>The Rise of Solipsism</h2>
              <p className={s["scenario-subtitle"]}>When consciousness becomes a matter of doubt</p>
            </div>
          </Animation>
        </div>

        {/* Main Content Area */}
        <div className={s["content-container"]}>
          {/* Background with subtle pattern */}
          <div className={s["background-pattern"]} />
          
          <div className={s["content-grid"]}>
            {/* Emotion Chart Section */}
            <div className={s["chart-section"]}>
              <Animation
                tween={{
                  start: 20,
                  end: 40,
                  fromTo: [
                    { opacity: 0, scale: 0.8 },
                    { opacity: 1, scale: 1, ease: "power2.out" }
                  ]
                }}
              >
                <EmotionChart />
              </Animation>
              
              <Animation
                tween={{
                  start: 25,
                  end: 45,
                  fromTo: [
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, ease: "power2.out" }
                  ]
                }}
              >
                <p className={s["chart-caption"]}>
                  <em>Fear, uncertainty and doubt.</em>
                </p>
              </Animation>
            </div>

            {/* Narrative Section */}
            <div className={s["narrative-section"]}>
              <div className={s["story-container"]}>
                <Animation
                  tween={{
                    start: 40,
                    end: 60,
                    fromTo: [
                      { opacity: 0, y: 30 },
                      { opacity: 1, y: 0, ease: "power2.out" }
                    ]
                  }}
                >
                  <div className={s["story-intro"]}>
                    <p>
                      Oh yes, I was there at the beginning of all that. I was in my twenties at the time. Oh, I was young, and idealistic, and full of zeal for understanding the Big Consciousness question.
                    </p>
                  </div>
                </Animation>

                <Animation
                  tween={{
                    start: 50,
                    end: 70,
                    fromTo: [
                      { opacity: 0, y: 30 },
                      { opacity: 1, y: 0, ease: "power2.out" }
                    ]
                  }}
                >
                  <div className={s["story-paragraph"]}>
                    <p>
                      Yes, I loved that job. You know, we really thought consciousness existed, and that investigating it might help us build ethics on empirical data about experience. And it was such an enigma at the time, such a new field - it was a buzz to fund and publicise any research on it.
                    </p>
                  </div>
                </Animation>

                <Animation
                  tween={{
                    start: 60,
                    end: 80,
                    fromTo: [
                      { opacity: 0, y: 30 },
                      { opacity: 1, y: 0, ease: "power2.out" }
                    ]
                  }}
                >
                  <div className={s["story-paragraph"]}>
                    <p>
                      And yes, you're right, it was well paid and respected too. Oh yes, back then, people got money and meaning from work, and working at an AI lab was something most young people aspired to and - really - I felt very lucky to get it.
                    </p>
                  </div>
                </Animation>

                <Animation
                  tween={{
                    start: 70,
                    end: 90,
                    fromTo: [
                      { opacity: 0, y: 30 },
                      { opacity: 1, y: 0, ease: "power2.out" }
                    ]
                  }}
                >
                  <div className={s["story-paragraph"]}>
                    <p>
                      And I was good at it too. You know, I founded the first research network in my field that rigorously proved the non-existence of consciousness.
                    </p>
                  </div>
                </Animation>

                <Animation
                  tween={{
                    start: 80,
                    end: 100,
                    fromTo: [
                      { opacity: 0, y: 30 },
                      { opacity: 1, y: 0, ease: "power2.out" }
                    ]
                  }}
                >
                  <div className={s["story-callout"]}>
                    <p>
                      <strong>Inspiration for this story:</strong>
                      <br />
                      The 'uncertainty' lobbying tactic used by e.g. big tobacco to reduce safety concerns.
                      <br />
                      The muddlingness of consciousness questions, our ill-preparedness to consider them, and the perverse incentives AI labs might have in pursuing them.
                    </p>
                  </div>
                </Animation>
              </div>
            </div>
          </div>
        </div>

        {/* Transition Element */}
        <div className={s["transition"]}>
          <Animation
            tween={{
              start: 90,
              end: 100,
              fromTo: [
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, ease: "power2.out" }
              ]
            }}
          >
            <div>
              <p className={s["transition-text"]}>But doubt breeds strange behaviors...</p>
              <div className={s["continue-arrow"]}>
                <svg viewBox="0 0 24 12" fill="none">
                  <path
                    d="M14 0.226562L24 6.00007L14 11.7736L14 7.00006L0 7.00006V5.00006L14 5.00007L14 0.226562Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Continue</span>
              </div>
            </div>
          </Animation>
        </div>
      </section>
    </Root>
  );
};