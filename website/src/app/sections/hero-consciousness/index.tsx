"use client";

import {
  Root,
  Pin,
  Animation,
  useScrollytelling,
} from "~/lib/scrollytelling-client";
import { useRef, forwardRef, type ForwardedRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useIsoLayoutEffect } from "../../hooks/use-iso-layout-effect";
import { useMergeRefs } from "../../hooks/use-merge-refs";

import s from "./hero-consciousness.module.scss";
import { useMedia } from "~/hooks/use-media";

const HeroConsciousnessContent = forwardRef(
  (_props: {}, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { timeline } = useScrollytelling();
    const mergedRef = useMergeRefs([containerRef, forwardedRef]);

    useIsoLayoutEffect(() => {
      if (!timeline) return;
      gsap.registerPlugin(SplitText);

      const ctx = gsap.context(() => {
        const split = new SplitText(titleRef.current, { type: "chars" });
        const chars = split.chars;
        gsap.set(titleRef.current, { opacity: 1 });

        timeline.from(
          chars,
          {
            duration: 0.5, // this will take 50% of the timeline duration
            opacity: 0,
            stagger: { from: "random", each: 0.01 },
            ease: "power2.out",
          },
          0 // start at the beginning of the timeline
        );
      }, containerRef);

      return () => ctx.revert();
    }, [timeline]);

    return (
      <Pin
        childHeight={"100vh"}
        pinSpacerHeight={"300vh"}
        pinSpacerClassName={s["pin-spacer"]}
        ref={mergedRef}
      >
        <header className={s["header"]}>
          {/* Background image */}
          <div className={s["background-image"]} />

          {/* Content overlay */}
          <div className={s["content-overlay"]}>
            <div className={s["title-container"]}>
              <h1 className={s["main-title"]} ref={titleRef}>
                Are you there?
              </h1>

              <Animation
                tween={{
                  start: 20,
                  end: 70,
                  fromTo: [
                    {
                      opacity: 0,
                      y: 30,
                    },
                    {
                      opacity: 1,
                      y: 0,
                      ease: "power2.out",
                    },
                  ],
                }}
              >
                <p className={s["subtitle"]}>
                  Consciousness and connection in the age of AI.
                </p>
              </Animation>
            </div>

            <Animation
              tween={{
                start: 70,
                end: 100,
                fromTo: [
                  {
                    opacity: 0,
                    y: 20,
                  },
                  {
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                  },
                ],
              }}
            >
              <div className={s["scroll-indicator"]}>
                <div className={s["arrow"]}>
                  <svg
                    viewBox="0 0 24 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5.5L12 10.5L23 5.5L12 0.5L1 5.5Z"
                      stroke="white"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>
                </div>
                <span className={s["scroll-text"]}>Scroll to begin</span>
              </div>
            </Animation>
          </div>

          {/* Animated consciousness visualization */}
          <div className={s["consciousness-visual"]}>
            <Animation
              tween={{
                start: 0,
                end: 100,
                to: {
                  rotate: 360,
                  scale: 1.2,
                  opacity: 0.8,
                },
              }}
            >
              <div className={s["neural-network"]}>
                {/* Simple neural network visualization */}
                <svg className={s["network-svg"]} viewBox="0 0 400 400">
                  <g className={s["nodes"]}>
                    {/* Create a simple network of connected nodes */}
                    <circle
                      cx="100"
                      cy="100"
                      r="8"
                      fill="rgba(255,255,255,0.6)"
                    />
                    <circle
                      cx="200"
                      cy="80"
                      r="6"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <circle
                      cx="300"
                      cy="120"
                      r="7"
                      fill="rgba(255,255,255,0.6)"
                    />
                    <circle
                      cx="150"
                      cy="180"
                      r="5"
                      fill="rgba(255,255,255,0.4)"
                    />
                    <circle
                      cx="250"
                      cy="200"
                      r="8"
                      fill="rgba(255,255,255,0.6)"
                    />
                    <circle
                      cx="120"
                      cy="280"
                      r="6"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <circle
                      cx="280"
                      cy="300"
                      r="7"
                      fill="rgba(255,255,255,0.6)"
                    />
                  </g>
                  <g className={s["connections"]}>
                    <line
                      x1="100"
                      y1="100"
                      x2="200"
                      y2="80"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1"
                    />
                    <line
                      x1="200"
                      y1="80"
                      x2="300"
                      y2="120"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1"
                    />
                    <line
                      x1="100"
                      y1="100"
                      x2="150"
                      y2="180"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1"
                    />
                    <line
                      x1="150"
                      y1="180"
                      x2="250"
                      y2="200"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1"
                    />
                    <line
                      x1="250"
                      y1="200"
                      x2="280"
                      y2="300"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1"
                    />
                    <line
                      x1="150"
                      y1="180"
                      x2="120"
                      y2="280"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1"
                    />
                  </g>
                </svg>
              </div>
            </Animation>
          </div>
        </header>
      </Pin>
    );
  }
);
HeroConsciousnessContent.displayName = "HeroConsciousnessContent";

export const HeroConsciousness = () => {
  return (
    <Root defaults={{ ease: "linear" }}>
      <HeroConsciousnessContent />
    </Root>
  );
};