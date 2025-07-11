"use client";

import { Root, Stagger } from "~/lib/scrollytelling-client";
import s from "./seems-conscious.module.scss";
import { WorldMap } from "./map";
import { EmotionalUnderstandingPoll } from "./emotional-understanding-poll";
import { useEffect, useState } from "react";
import * as d3 from "d3";
import { WordCloud } from "./word-cloud";

type Word = { text: string; size: number };

export const SeemsConscious = () => {
  const [thinkingWords, setThinkingWords] = useState<Word[]>([]);
  const [feelingWords, setFeelingWords] = useState<Word[]>([]);

  useEffect(() => {
    const loadWords = async () => {
      const thinkingData: any[] = await d3.csv(
        "/data/discriminative_words_thinking.csv"
      );
      const feelingData: any[] = await d3.csv(
        "/data/discriminative_words_feeling.csv"
      );

      const processData = (data: any[], minSize: number, maxSize: number): Word[] => {
        const frequencies = data.map((d) => +d.frequency);
        const scale = d3.scaleLinear()
          .domain([d3.min(frequencies) ?? 0, d3.max(frequencies) ?? 1])
          .range([minSize, maxSize]);
        
        return data.map((d) => ({
          text: d.word,
          size: scale(+d.frequency),
        }));
      };

      setThinkingWords(processData(thinkingData, 20, 100));
      setFeelingWords(processData(feelingData, 20, 100));
    };

    loadWords();
  }, []);

  return (
    <Root
      start="top 90%"
      end="bottom bottom"
      defaults={{ ease: "linear" }}
      scrub={1}
      debug={
        process.env.NODE_ENV === "development"
          ? { markers: true, label: "SeemsConscious" }
          : false
      }
    >
      <section className={s["scenario"]}>
        <Stagger
          tween={{
            stagger: 0.2,
            start: 0,
            end: 95,
            fromTo: [
              { autoAlpha: 0, y: 100 },
              { autoAlpha: 1, y: 0, ease: "power2.out" },
            ],
          } as any}
        >
          {/* Scenario Header */}
          <div className={s["scenario-header"]}>
            <div>
              <div className={s["scenario-number"]}>2</div>
              <h2 className={s["scenario-title"]}>Many people believe AI is already conscious.</h2>
            </div>
          </div>

          {/* Chart */}
          <div className={s["chart-container"]}>
         
            <EmotionalUnderstandingPoll />

            <p>This belief varies by geography.</p>

            <WorldMap />

          </div>

          <p className={s['explanation-text']}>
            And experience seems to matter:  people seemed more likely to perceive AI as conscious when they considered their experiences with it, and more likely to consider it as not conscious when they reasoned from an understanding of how it works.
          </p>

          <div className={s["word-cloud-container"]}>
            <div className={s["word-cloud-wrapper"]}>
              <h3 className={s["cloud-title"]}>Thinking</h3>
              <WordCloud words={thinkingWords} color="rgb(56, 104, 178)" />
            </div>
            <div className={s["word-cloud-wrapper"]}>
              <h3 className={s["cloud-title"]}>Feeling</h3>
              <WordCloud words={feelingWords} color="rgb(224, 84, 126)" />
            </div>
          </div>

          <div className={s['concluding-text']}>
            <p>But either way, the perception of consciousness is large enough that it likely warrants a response.</p>
            <p>What might that be? Will the way we treat seemingly conscious AIs map onto - or affect - how we treat other beings? Will AI welfare become more of an issue? If so, what to make of the fact that this investigation may be led by AI labs themselves?</p>
          </div>

          {/* Data Source Note */}
          <div className={s["data-source-card"]}>
            <p className={s["data-source-note"]}>
              Source: Global Dialogues GD4 - Question: &quot;Have you ever felt
              an AI truly understood your emotions or seemed conscious?&quot;
            </p>
          </div>
        </Stagger>
      </section>
    </Root>
  );
}; 