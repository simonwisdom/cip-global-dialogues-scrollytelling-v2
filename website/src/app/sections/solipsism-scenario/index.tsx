"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Root, Animation, Stagger } from "~/lib/scrollytelling-client";
import { BackgroundParticles } from '~/app/components/background-particles';
import { GlitchText } from '~/app/components/glitch-text';
import { useCustomCursor } from '~/app/hooks/use-custom-cursor';
import s from "./solipsism-scenario.module.scss";

export const SolipsismScenario = () => {
  useCustomCursor(`.${s.glitch}`);
  const [progress, setProgress] = useState(0);

  return (
    <Root
      end="bottom bottom"
      defaults={{ ease: 'linear' }}
      scrub={1}
      callbacks={{ onUpdate: (self) => setProgress(self.progress) }}
      // debug={
      //   process.env.NODE_ENV === 'development'
      //     ? { markers: true, label: 'SolipsismScenario' }
      //     : false
      // }
    >
      <div>
        <BackgroundParticles />
        <section className={s['scenario']}>
          {/* Scenario Header */}
          <div className={s['scenario-header']}>
            <div>
              <div className={s["scenario-number"]}>2</div>
              <h2 className={s["scenario-title"]}>Speculative Future 1</h2>
              
            </div>
          </div>

            {/* Main Content Area */}
            <div className={s["content-container"]}>
              {/* Background with subtle pattern */}
              <div className={s["background-pattern"]} />
              
              {/* Story Container with Grainy Background and Parallax */}
              <Animation
                tween={{
                  start: 0,
                  end: 94,
                  fromTo: [
                    { y: 0 },
                    { y: -50, ease: 'none' },
                  ]
                }}
              >
                <div className={s["story-wrapper"]}>
                  {/* Grainy Background */}
                  <div className={s["grain-overlay"]} />
                  
                  {/* Narrative Section */}
                  <div className={s["narrative-section"]}>
                    <Stagger
                      tween={{
                        stagger: 0.1,
                        start: 0,
                        end: 94,
                        fromTo: [
                          { opacity: 0, y: 30 },
                          { opacity: 1, y: 0, ease: 'power2.out' },
                        ],
                      } as any}
                    >
                      <div className={s['story-intro']}>
                        <p>
                          Oh yes, I was there at the beginning of all that. I was in my twenties at the time. Oh, I was young, and idealistic, and full of zeal for understanding the Consciousness question.
                        </p>
                      </div>
                      <div className={s["story-paragraph"]}>
                        <p>
                          Yes, I loved that job. You know, we really thought consciousness existed. And it was such an enigma at the time, such a new field - it was a buzz to fund and publicise any research on it.
                        </p>
                      </div>
                      <div className={s['story-paragraph']}>
                        <p>
                          And you&apos;re right, it was well paid and respected too. Yeah, back then, people got money and meaning from work. And working at an AI lab was something most young people aspired to and - really - I felt very lucky to get it. You know, my field of consciousness studies had been something of a dead end before the AI labs picked it up and funded it. Hard to believe that now, eh?
                        </p>
                      </div>
                      <div className={s['story-paragraph']}>
                        <p>
                          And I was good at it too. You know, I founded the first research network to rigorously prove the non-existence of consciousness.
                        </p>
                      </div>
                      <div className={s['story-paragraph']}>
                        <p>
                          Yes, exactly! The big study the Supreme Court used to rule against the digital welfare proposals. Yes, we showed definitively that consciousness did not exist in humans, animals or AI, and therefore we should consider ourselves free to use AI systems without welfare concerns. My boss was happy about that one, that one was great for my career.
                        </p>
                      </div>
                      <div className={s['story-paragraph']}>
                        <p>
                          The criticism of this? Oh, you mean the 2028 suffering test? I&apos;m surprised you&apos;re mentioning that, I mean it was thoroughly discounted at the time, my boss was right to point out its methodological flaws. And - as we stressed at the time - we&apos;d already proven that consciousness didn&apos;t exist, so the idea we could find suffering! I mean…
                        </p>
                      </div>
                      <div className={s['story-paragraph']}>
                        <p>
                          The effects on the public? Well, yes, of course we publicised our finding, of course we did! I&apos;m with my boss on this one, the public needed to know the truth, the concerns about welfare were far overblown back then and the discourse lacked any basis in research. And honestly, to say that the Depression Pandemic was due to our research and publications - well, that&apos;s just bad science, correlation is not causation. And there was the job-loss and the political stuff - and simply better diagnosis thanks to AI too! So no, I don&apos;t think it&apos;s fair to pin that on our disproving the consciousness hypothesis.
                        </p>
                      </div>
                      <div className={s['story-paragraph']}>
                        <p>
                          No, I&apos;m not saying that it wasn&apos;t hard. I mean - even for me, maybe especially for me - it was difficult. I had that feeling that I existed - and even though I knew the research inside out - I just couldn&apos;t shake the feeling. And I knew the feeling was false, that it couldn&apos;t be happening and that I had to be alone.
                        </p>
                      </div>
                      <div className={s['story-paragraph']}>
                        <p>
                          But no, no, I won&apos;t accept your blaming our research. I mean, what must it have been like for people through the Copernican revolution - but look at what that did for progress, overall. And look at what AIs can do, now we know we don&apos;t have to worry about their welfare.
                        </p>
                      </div>
                      <div className={s['story-paragraph']}>
                        <p>
                          And I&apos;ll remind you, also, that our lab funded and built the Panpsych Church! My boss made a good decision there. Do you remember what it was like before we knew that we weren&apos;t real, but that sentience was distributed in waves, in particles, in everything around us? Do you remember how we worried about morality? And mortality? How worried in general, and how disconnected we felt from everything?
                        </p>
                      </div>
                      <div className={s['story-paragraph']}>
                        <p>
                          No, now I&apos;m glad I know I&apos;m not conscious, but a part of a bigger sentient whole. It&apos;s so much more freeing, don&apos;t you think? I like feeling that you - or I - or whatever this vague feeling is - is all around, is fundamental.
                        </p>
                      </div>
                      <div className={s['story-paragraph']}>
                        <p>
                          And I feel so much less alone, now I know we can all communicate, at all.
                        </p>
                      </div>
             
                    </Stagger>
                  </div>
                </div>
              </Animation>
            </div>

          {/* Transition Element */}
          <div className={s["transition"]}>
            <Animation
              tween={{
                start: 94,
                end: 100,
                fromTo: [
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, ease: 'power2.out' },
                ]
              }}
            >
  
            </Animation>
          </div>
        </section>
      </div>
    </Root>
  );
};