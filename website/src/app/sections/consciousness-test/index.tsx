"use client";

import { Root, Animation } from "~/lib/scrollytelling-client";
import s from "./consciousness-test.module.scss";
import { QuizComponent } from "./quiz-component";

export const ConsciousnessTest = () => {
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
              end: 20,
              fromTo: [
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, ease: "power2.out" }
              ]
            }}
          >
            <div>
              <div className={s["scenario-number"]}>6</div>
              <h2 className={s["scenario-title"]}>The Human Consciousness Test</h2>
              <p className={s["scenario-subtitle"]}>When humans must prove their own awareness</p>
            </div>
          </Animation>
        </div>

        {/* Introduction */}
        <div className={s["intro-section"]}>
          <div className={s["intro-content"]}>
            <Animation
              tween={{
                start: 15,
                end: 35,
                fromTo: [
                  { opacity: 0, y: 30 },
                  { opacity: 1, y: 0, ease: "power2.out" }
                ]
              }}
            >
              <p className={s["intro-text"]}>
                Research reveals six criteria people use to determine AI consciousness. But here&apos;s the twist: when humans take these same tests, many fail to meet their own standards.
              </p>
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
              <p className={s["intro-question"]}>
                Have we set the bar so high that we&apos;ve excluded ourselves?
              </p>
            </Animation>
          </div>
        </div>

        {/* Quiz Section */}
        <div className={s["quiz-section"]}>
          <Animation
            tween={{
              start: 40,
              end: 60,
              fromTo: [
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, ease: "power2.out" }
              ]
            }}
          >
            <QuizComponent />
          </Animation>
        </div>

        {/* Conclusion */}
        <div className={s["conclusion-section"]}>
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
            <div className={s["conclusion-content"]}>
              <h3 className={s["conclusion-title"]}>Are you there?</h3>
              <p className={s["conclusion-text"]}>
                In our quest to distinguish ourselves from artificial intelligence, we&apos;ve discovered something profound: humanity isn&apos;t found in perfection or performance, but in our contradictions, our doubts, and our capacity to question what consciousness truly means.
              </p>
              <p className={s["conclusion-final"]}>
                Perhaps the most human thing of all is wondering whether we&apos;re human enough.
              </p>
            </div>
          </Animation>
        </div>
      </section>
    </Root>
  );
};