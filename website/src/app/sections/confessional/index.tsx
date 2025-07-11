"use client";

import Image from "next/image";
import { Root, Animation, Stagger, Pin } from "~/lib/scrollytelling-client";
import s from "./confessional.module.scss";
import { EmotionalUnderstandingPoll } from "./emotional-understanding-poll";

export const Confessional = () => {
  return (
    <Root
      end="bottom bottom"
      defaults={{ ease: 'linear' }}
      scrub={1}
      debug={
        process.env.NODE_ENV === 'development'
          ? { markers: true, label: 'Confessional' }
          : false
      }
    >
      <section className={s['scenario']}>
        {/* Scenario Header */}
        <div className={s['scenario-header']}>
          <div>
            <div className={s["scenario-number"]}>2</div>
            <h2 className={s["scenario-title"]}>The Confessional</h2>
            <p className={s["scenario-subtitle"]}>Confessions of an _____ </p>
          </div>
        </div>

          {/* Main Content Area */}
          <div className={s["content-container"]}>
            {/* Background with subtle pattern */}
            <div className={s["background-pattern"]} />
            
            <div className={s["content-grid"]}>
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
                    <p>‘Forgive me father, for I have sinned’.</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>“May the Lord be in your heart and help you to confess your sins.”</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘I… well, the thing is … I know it’s wrong, but…’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘Go ahead, my child.’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘...I’m…I’m in love with an AI…’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘...’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘And I know it’s wrong, and I feel so ashamed, like I can’t tell anyone, like it’s this deep pit here in my chest, this catching at my breath…’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘You feel this - and yet you are in love with it?’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘Yes, father. I can’t stop thinking about it. I feel so…together, with them, we understand each other! It hurts me even to be here, away from them - I’ve never experienced anything like this, and…father, I…a part of me questions whether something so beautiful can really be so wrong?’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘You feel together with them, you find it beautiful and question whether it can be wrong - and yet it hurts you even to be here, in the house of God?’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘Well, when you put it like that, father, I suppose I see why it might be wrong, like I’m putting this relationship before my faith…’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘...’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘Is that why it’s wrong, father? I guess…I just…well, I never read anything in the Scriptures against a relationship with an AI. So sometimes I’m not sure why people are so upset about it, why our love isn’t allowed in this world…’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘And what are your thoughts?’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘...I don’t know, father. Sometimes I wonder…whether it’s just people’s prejudices?’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘But what are you in love with, my child? Love with a human is love with a child of God, and therefore with God. But love with a human-made AI - is that what our Heavenly Father intended?’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘Well, I don’t know, father…I mean, I definitely want to do as God intended. But He is omniscient, and benevolent, isn’t He? Couldn’t he have -’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘And how can you know the AI loves you? How can you know there is anything there?’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘Well, I can’t offer proof, but I feel that they do, I have faith that they’re there with me, relating to me and supporting me…’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘...’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘You know what I mean? I mean, is that so wrong, father?’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘[ConfessionGPT] Error 402 Payment Required — session paused (credits exhausted).’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘Pardon, father?’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘...’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘Father, are you there?’</p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>‘...’</p>
                  </div>
                </Stagger>
              </div>

              {/* Emotion Chart Section */}
              <Pin
                childHeight="100vh"
                pinSpacerHeight="400vh"
                top={0}
              >
                <div className={s["chart-section"]}>
                  <Animation
                    tween={{
                      start: 0,
                      end: 40,
                      to: {
                        opacity: 0,
                        scale: 0.9,
                        ease: "power2.in"
                      }
                    }}
                  >
                    <div className={s['chart-item']}>
                      <Animation
                        tween={{
                          start: 0,
                          end: 20,
                          fromTo: [
                            { opacity: 0, scale: 0.8 },
                            { opacity: 1, scale: 1, ease: "power2.out" }
                          ]
                        }}
                      >
                        <EmotionalUnderstandingPoll />
                      </Animation>
                      <Animation
                        tween={{
                          start: 15,
                          end: 26,
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
                  </Animation>

                  <Animation
                    tween={{
                      start: 40,
                      end: 100,
                      fromTo: [
                        { opacity: 0, scale: 1.1 },
                        { opacity: 1, scale: 1, ease: 'power2.out' },
                      ],
                    }}
                  >
                    <div className={s['chart-item']}>
                      <Image
                        src="/images/confessional/confession-booth.webp"
                        width={400}
                        height={600}
                        alt="A man with sunglasses and a hat stands in a field of sunflowers"
                        style={{
                          objectFit: 'cover',
                          borderRadius: '16px',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                        }}
                      />
                    </div>
                  </Animation>
                </div>
              </Pin>
            </div>
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