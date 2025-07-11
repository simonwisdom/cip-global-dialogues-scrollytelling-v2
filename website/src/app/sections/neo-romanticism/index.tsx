"use client";

import { Root, Animation } from "~/lib/scrollytelling-client";
import s from "./neo-romanticism.module.scss";
import { ImageGallery } from "./image-gallery";

export const NeoRomanticism = () => {
  return (
    <Root
      defaults={{ ease: "linear" }}
    >
      <section className={s["scenario"]}>
        {/* Dark gradient background */}
        <div className={s["background-gradient"]} />
        
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
              <div className={s["scenario-number"]}>5</div>
              <h2 className={s["scenario-title"]}>Neo-Romanticism</h2>
              <p className={s["scenario-subtitle"]}>Finding humanity in the ineffable</p>
            </div>
          </Animation>
        </div>

        {/* Main Content */}
        <div className={s["content-container"]}>
          <div className={s["text-section"]}>
            <Animation
              tween={{
                start: 15,
                end: 40,
                fromTo: [
                  { opacity: 0, y: 30 },
                  { opacity: 1, y: 0, ease: "power2.out" }
                ]
              }}
            >
              <p className={s["intro-text"]}>
                In response to AI's encroachment, humanity embraces what can't be quantified: raw emotion, spontaneous beauty, irrational love. We become more romantic than ever, cherishing the messy, unpredictable aspects of being human.
              </p>
            </Animation>
          </div>

          {/* Image Gallery Section */}
          <div className={s["gallery-section"]}>
            <Animation
              tween={{
                start: 30,
                end: 50,
                fromTo: [
                  { opacity: 0, scale: 0.9 },
                  { opacity: 1, scale: 1, ease: "power2.out" }
                ]
              }}
            >
              <ImageGallery />
            </Animation>
          </div>

          {/* Philosophical Quote */}
          <div className={s["quote-section"]}>
            <Animation
              tween={{
                start: 60,
                end: 80,
                fromTo: [
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, ease: "power2.out" }
                ]
              }}
            >
              <blockquote className={s["quote"]}>
                "The most beautiful things in the world cannot be seen or touched, they are felt with the heart."
                <cite>— A reminder of what makes us irreplaceably human</cite>
              </blockquote>
            </Animation>
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
            <p className={s["transition-text"]}>But how do we even test for consciousness anymore?</p>
          </Animation>
        </div>
      </section>
    </Root>
  );
};