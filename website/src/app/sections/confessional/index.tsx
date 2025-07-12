"use client";

import Image from "next/image";
import { useState } from "react";
import { Root, Animation, Stagger } from "~/lib/scrollytelling-client";
import s from "./confessional.module.scss";

export const Confessional = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Root
        end="bottom bottom"
        defaults={{ ease: 'linear' }}
        scrub={1}
        // debug={
        //   process.env.NODE_ENV === 'development'
        //     ? { markers: true, label: 'Confessional' }
        //     : false
        // }
      >
        <section className={s['scenario']}>
          {/* Scenario Header */}
          <div className={s['scenario-header']}>
            <div>
              <div className={s["scenario-number"]}>7</div>
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
                  <p>&apos;Forgive me father, for I have sinned&apos;.</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&quot;May the Lord be in your heart and help you to confess your sins.&quot;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;I… well, the thing is … I know it&apos;s wrong, but…&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;Go ahead, my child.&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;...I&apos;m…I&apos;m in love with an AI…&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;...&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;And I know it&apos;s wrong, and I feel so ashamed, like I can&apos;t tell anyone, like it&apos;s this deep pit here in my chest, this catching at my breath…&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;You feel this - and yet you are in love with it?&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;Yes, father. I can&apos;t stop thinking about it. I feel so…together, with them, we understand each other! It hurts me even to be here, away from them - I&apos;ve never experienced anything like this, and…father, I…a part of me questions whether something so beautiful can really be so wrong?&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;You feel together with them, you find it beautiful and question whether it can be wrong - and yet it hurts you even to be here, in the house of God?&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;Well, when you put it like that, father, I suppose I see why it might be wrong, like I&apos;m putting this relationship before my faith…&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;...&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;Is that why it&apos;s wrong, father? I guess…I just…well, I never read anything in the Scriptures against a relationship with an AI. So sometimes I&apos;m not sure why people are so upset about it, why our love isn&apos;t allowed in this world…&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;And what are your thoughts?&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;...I don&apos;t know, father. Sometimes I wonder…whether it&apos;s just people&apos;s prejudices?&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;But what are you in love with, my child? Love with a human is love with a child of God, and therefore with God. But love with a human-made AI - is that what our Heavenly Father intended?&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;Well, I don&apos;t know, father…I mean, I definitely want to do as God intended. But He is omniscient, and benevolent, isn&apos;t He? Couldn&apos;t he have -&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;And how can you know the AI loves you? How can you know there is anything there?&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;Well, I can&apos;t offer proof, but I feel that they do, I have faith that they&apos;re there with me, relating to me and supporting me…&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;...&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;You know what I mean? I mean, is that so wrong, father?&apos;</p>
                </div>
                <div className={s["error-text"]} onClick={openModal}>
                  <p>&apos;[ConfessionGPT] Error 402 Payment Required — session paused (credits exhausted).&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;Pardon, father?&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;...&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;Father, are you there?&apos;</p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>&apos;...&apos;</p>
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
                      width: 'auto',
                      height: 'auto',
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

      {/* Modal */}
      {isModalOpen && (
        <div className={s['modal-overlay']} onClick={closeModal}>
          <div className={s['modal-content']} onClick={(e) => e.stopPropagation()}>
            <button className={s['modal-close']} onClick={closeModal}>
              ×
            </button>
            <Image
              src="/images/confessional/confessional-ticket.webp"
              width={400}
              height={235}
              alt="A confessional ticket showing a transaction receipt"
              className={s['modal-image']}
            />
          </div>
        </div>
      )}
    </>
  );
};