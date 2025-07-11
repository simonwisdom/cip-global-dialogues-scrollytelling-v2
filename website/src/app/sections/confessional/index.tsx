"use client";

import Image from "next/image";
import { Root, Animation, Stagger } from "~/lib/scrollytelling-client";
import s from "./confessional.module.scss";

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
            <div className={s["scenario-number"]}>3</div>
            <h2 className={s["scenario-title"]}>Speculative Future 3</h2>
       
          </div>
        </div>

        {/* Main Content Area */}
        <div className={s["content-container"]}>
          {/* Background with subtle pattern */}
          <div className={s["background-pattern"]} />
          
          <div className={s["narrative-section"]}>
            <Stagger
              tween={{
                stagger: 0.1,
                start: 0,
                end: 75,
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
                <Image
                  src="/images/confessional/confessional-ticket.webp"
                  width={400}
                  height={235}
                  alt="A confessional ticket showing a transaction receipt"
                  style={{
                    display: 'block',
                    margin: '2rem auto',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  }}
                />
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

            <Animation
              tween={{
                start: 60,
                end: 80,
                fromTo: [
                  { opacity: 0, scale: 0.9 },
                  { opacity: 1, scale: 1, ease: 'power2.out' },
                ],
              }}
            >
              <div className={s['image-container']}>
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
    </Root>
  );
};