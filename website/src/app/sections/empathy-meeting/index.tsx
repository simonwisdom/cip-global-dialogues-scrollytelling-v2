"use client";

import Image from "next/image";
import { Root, Animation, Stagger } from "~/lib/scrollytelling-client";
import s from "./empathy-meeting.module.scss";


export const EmpathyMeeting = () => {
  return (
    <Root
      end="bottom bottom"
      defaults={{ ease: 'linear' }}
      scrub={1}
      // debug={
      //   process.env.NODE_ENV === 'development'
      //     ? { markers: true, label: 'EmpathyMeeting' }
      //     : false
      // }
    >
      <section className={s['scenario']}>
        {/* Scenario Header */}
        <div className={s['scenario-header']}>
          <div>
            <div className={s["scenario-number"]}>5</div>
            <h2 className={s["scenario-title"]}>Speculative Future 2</h2>
          </div>
        </div>

          {/* Main Content Area */}
          <div className={s["content-container"]}>
            {/* Background with subtle pattern */}
            <div className={s["background-pattern"]} />
            
            {/* Narrative Section */}
            <div className={s["narrative-section"]}>
              <Stagger
                tween={{
                  stagger: 0.1,
                  from: { opacity: 0, y: 30 },
                  ease: 'power2.out',
                  start: 0,
                  end: 85,
                } as any}
              >
                <div className={s['story-intro']}>
                  <p>
                    Ugh, the Monday morning meeting. Same old, same old blah bleurgh blah.
                  </p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>
                    I mean, people say it&apos;s different since the Empathy Act, but honestly -
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Classic manspreading from my boss - look at him, legs out, elbows out, wine-puffy face in these lights. God, I hate these migraine lights.
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Ok, here we go, the around the room &apos;Empathic Check In&apos; - ugh, if I had a pound for every &apos;that sounds really difficult&apos; or every knitted brow…
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Yeah, yeah, classic Brett, in there with a gentle &apos;am I right in feeling some apprehension in the room?&apos;. Way to go, Brett. I remember when you got promoted and promoted just by interrupting everyone with a &apos;will it scale?&apos;. Times change, but the repetition doesn&apos;t, eh Brett?
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Oh shoot, my turn.
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    &quot;Umm, I guess…I&apos;m feeling a bit distracted right now and…like I&apos;m struggling to be present&quot;.
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Phew, pause for a bit.
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    I mean, I get it. They&apos;re Type A big cheeses, they haven&apos;t got anything to do anymore except empathise. And they have to too, we basically get paid these big bucks just to be accountable for the AIs, check for bias and to show how human and empathic we all are. But does nobody here question whether any of this is not…a bit…false?
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    &quot;Saskia, I&apos;m noticing we&apos;ve not heard much from you, I see you as quite tense…and I&apos;d really love to welcome your experiences into the room&quot;.
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Oh, damn this giveaway face of mine. How am I meant to respond to that? I can&apos;t afford another empathy warning. Ok, ok, focus: I&apos;ll hear him, and be congruent. 
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    &quot;Umm, I&apos;m hearing your curiosity and sense of welcome. And… I guess, I am feeling tense, and…kind of…questioning what we&apos;re doing here.&quot;
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    &quot;Questioning what we&apos;re doing here?&quot;
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    God, he looks so concerned from back in his big chair, they all do!
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    &quot;Yeah…I guess I want to say…that…well, it&apos;s kind of that I don&apos;t remember meetings being like this before. I suppose I&apos;m remembering when we used to discuss business and things, and be kind of - forceful and direct and stuff&quot;. 
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    &quot;Ah, ok, thank you for sharing this…I&apos;m getting the sense that you&apos;re comparing our Empathic Check-in with our previous Success Stand-ups, and I&apos;m wondering whether you&apos;re missing the business talk?&quot; 
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    No fricking way. 
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    &quot;Umm…I guess it&apos;s less that, and maybe more that…well, I guess we have to be empathic now, and that makes me question whether we&apos;re not all, maybe…going through the motions, play-acting empathy, not really feeling it?&quot;
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Slow exhalation from the boss, gently intense gaze and he&apos;s got his hand on his heart. God, he&apos;s good at this. 
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    &quot;So you&apos;re questioning whether we&apos;re truly feeling empathy, or just play-acting…Wow, I personally feel so grateful for you, Saskia, for being here and for bringing this into our space. I wonder whether we all have a small voice that sometimes worries about this, and what this might feel like, for the group..?&quot;
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Ok, we&apos;re going around the room now and wow they feel it too! 
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Yes, Lindsey, it kind of does feel like this itchy uncertainty. And old finance Dan, I&apos;m sorry you&apos;ve been feeling threatened in these meetings, I didn&apos;t know. And yes, even you Brett - you&apos;re so right, it&apos;s lonely, not knowing if anything is heartfelt or just another KPI. 
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Shoot. It worked. I feel better.
                  </p>
                </div>
              </Stagger>
            </div>

            {/* Chart Section - Now positioned below narrative */}
            <div className={s["chart-section"]}>
              <Animation
                tween={{
                  from: { opacity: 0, scale: 1.1, ease: 'power2.out' },
                  start: 85,
                  end: 95,
                }}
              >
                <div className={s['chart-item']}>
                  <Image
                    src="/images/empathy-meeting/empathy-meeting.webp"
                    width={400}
                    height={600}
                    alt="A diverse group of people in a meeting, showing various emotions."
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
              start: 95,
              end: 100,
              fromTo: [
                {
                  backgroundColor: 'transparent'
                },
                {
                  backgroundColor: '#000000', // Transition to black
                }
              ],
            }}
          />
        </div>
      </section>
    </Root>
  );
}; 