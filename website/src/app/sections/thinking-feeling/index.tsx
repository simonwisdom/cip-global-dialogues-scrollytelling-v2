"use client";

import { useEffect, useState } from "react";
import * as d3 from "d3";
import { Root, Animation } from "~/lib/scrollytelling-client";
import s from "./thinking-feeling.module.scss";
import { WordCloud } from "./word-cloud";

type Word = { text: string; size: number };

export const ThinkingFeeling = () => {
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
      defaults={{
        ease: "power1.inOut",
      }}
      start="top 80%"
      end="bottom 20%"
      debug={
        process.env.NODE_ENV === 'development'
          ? { markers: true, label: 'ThinkingFeeling' }
          : false
      }
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
              <div className={s["scenario-number"]}>3</div>
              <h2 className={s["scenario-title"]}>Thinking vs. Feeling</h2>
              <p className={s["scenario-subtitle"]}>Exploring the spectrum of cognition.</p>
            </div>
          </Animation>
        </div>

        {/* Word Cloud Chart */}
        <div className={s["chart-container"]}>
          <div className={s["word-cloud-wrapper"]}>
            <h3 className={s["cloud-title"]}>Thinking</h3>
            <WordCloud words={thinkingWords} color="rgb(56, 104, 178)" />
          </div>
          <div className={s["word-cloud-wrapper"]}>
            <h3 className={s["cloud-title"]}>Feeling</h3>
            <WordCloud words={feelingWords} color="rgb(224, 84, 126)" />
          </div>
        </div>

        {/* Data Source Note */}
        <Animation
            tween={{
              start: 60,
              end: 95,
              fromTo: [
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, ease: "power2.out" }
              ]
            }}
          >
          <div className={s["data-source-card"]}>
            <p className={s["data-source-note"]}>
              Source: Global Dialogues GD4 - Question: &quot;Have you ever felt an AI truly understood your emotions or seemed conscious?&quot;
            </p>
          </div>
        </Animation>

        {/* Transition Element */}
        <div className={s["transition"]}>
          <Animation
            tween={{
              start: 95,
              end: 100,
              fromTo: [
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, ease: "power2.out" }
              ]
            }}
          >
            <p className={s["transition-text"]}>The next section awaits...</p>
          </Animation>
        </div>
      </section>
    </Root>
  );
}; 