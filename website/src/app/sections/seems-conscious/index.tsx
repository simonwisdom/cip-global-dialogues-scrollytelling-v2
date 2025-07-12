"use client";

import { Root, Stagger } from "~/lib/scrollytelling-client";
import s from "./seems-conscious.module.scss";
import { WorldMap } from "./map";
import { EmotionalUnderstandingPoll } from "./emotional-understanding-poll";
import { useEffect, useState } from "react";
import * as d3 from "d3";
import { WordCloud } from "./word-cloud";
import { ResponsesModal } from "./responses-modal";
import { RegionalConsciousnessTable } from "./RegionalConsciousnessTable";

type Word = { text: string; size: number };

export const SeemsConscious = () => {
  const [thinkingWords, setThinkingWords] = useState<Word[]>([]);
  const [feelingWords, setFeelingWords] = useState<Word[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <>
      <Root
        start="top 90%"
        end="bottom bottom"
        defaults={{ ease: "linear" }}
        scrub={1}
        // debug={
        //   process.env.NODE_ENV === "development"
        //     ? { markers: true, label: "SeemsConscious" }
        //     : false
        // }
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
                <div className={s["scenario-number"]}>1</div>
                <h2 className={s["scenario-title"]}>Many people believe AI is already conscious.</h2>
              </div>
            </div>

            {/* Chart */}
            <div className={s["chart-container"]}>
          
              <EmotionalUnderstandingPoll />

              <p>This belief varies by geography.</p>

              <WorldMap />

            </div>

            <div className={s['explanation-container']}>
              <p className={s['explanation-intro']}>
                And how people reasoned about the question seemed to matter.
              </p>
              <div className={s['explanation-split']}>
                <div className={s['explanation-side']}>
                  <h4>Those who considered their <span className={s['highlight-feeling']}>experiences with AI</span> were more likely to perceive it as conscious.</h4>
                  <div className={s["word-cloud-wrapper"]}>
                    <h3 className={s["cloud-title"]}>Experiencing</h3>
                    <WordCloud words={feelingWords} color="rgb(224, 84, 126)" />
                  </div>
                </div>
                <div className={s['explanation-side']}>
                  <h4>Those who reasoned from an <span className={s['highlight-thinking']}>understanding of how it works</span> were more likely to say it&apos;s not.</h4>
                  <div className={s["word-cloud-wrapper"]}>
                    <h3 className={s["cloud-title"]}>Reasoning</h3>
                    <WordCloud words={thinkingWords} color="rgb(56, 104, 178)" />
                  </div>
                </div>
              </div>
            </div>

            {/* Data Source Note */}
            <div className={s["data-source-card"]}>
              <button className={s.ctaButton} onClick={() => setIsModalOpen(true)}>
                Want to read some actual responses from people?
              </button>
              <p className={s["data-source-note"]}>
                Source: Global Dialogues GD4 - Question: &quot;Have you ever felt
                an AI truly understood your emotions or seemed conscious?&quot; Word counts extracted from free text responses to the survey question.
              </p>
            </div>

            {/* <RegionalConsciousnessTable /> */}

            <div className={s['concluding-text']}>
              <p>Either way, the perception of consciousness is large enough that it likely warrants a response. What might that response look like? Will the way we treat seemingly conscious AIs map onto - or affect - how we treat other beings? Will AI welfare become more of an issue? If so, what to make of the fact that this investigation may be led by AI labs themselves?</p>
            </div>
          </Stagger>
        </section>
      </Root>
      <ResponsesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}; 