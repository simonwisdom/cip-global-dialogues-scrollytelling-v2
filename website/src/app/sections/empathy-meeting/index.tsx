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
      debug={
        process.env.NODE_ENV === 'development'
          ? { markers: true, label: 'EmpathyMeeting' }
          : false
      }
    >
      <section className={s['scenario']}>
        {/* Scenario Header */}
        <div className={s['scenario-header']}>
          <div>
            <div className={s["scenario-number"]}>2</div>
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
                  end: 90,
                } as any}
              >
                <div className={s['story-intro']}>
                  <p>
                    Ugh, the Monday morning meeting. Same old, same old blah bleurgh blah.
                  </p>
                </div>
                <div className={s["story-paragraph"]}>
                  <p>
                    I mean, people say it’s different since the Empathy Act, but honestly -
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Classic manspreading from my boss - look at him, legs out, elbows out, wine-puffy face in these lights. God, I hate these migraine lights.
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Ok, here we go, the around the room ‘Empathic Check In’ - ugh, if I had a pound for every ‘that sounds really difficult’ or every knitted brow…
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Yeah, yeah, classic Brett, in there with a gentle ‘am I right in feeling some apprehension in the room?’. Way to go, Brett. I remember when you got promoted and promoted just by interrupting everyone with a ‘will it scale?’. Times change, but the repetition doesn’t, eh Brett?
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Oh shoot, my turn.
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    “Umm, I guess…I’m feeling a bit distracted right now and…like I’m struggling to be present”.
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Phew, pause for a bit.
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    I mean, I get it. They’re Type A big cheeses, they haven’t got anything to do anymore except empathise. And they have to too, we basically get paid these big bucks just to be accountable for the AIs, check for bias and to show how human and empathic we all are. But does nobody here question whether any of this is not…a bit…false?
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    “Saskia, I’m noticing we’ve not heard much from you, I see you as quite tense…and I’d really love to welcome your experiences into the room”.
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Oh, damn this giveaway face of mine. How am I meant to respond to that? I can’t afford another empathy warning. Ok, ok, focus: I’ll hear him, and be congruent. 
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    “Umm, I’m hearing your curiosity and sense of welcome. And… I guess, I am feeling tense, and…kind of…questioning what we’re doing here.”
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    “Questioning what we’re doing here?”
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    God, he looks so concerned from back in his big chair, they all do!
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    “Yeah…I guess I want to say…that…well, it’s kind of that I don’t remember meetings being like this before. I suppose I’m remembering when we used to discuss business and things, and be kind of - forceful and direct and stuff”. 
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    “Ah, ok, thank you for sharing this…I’m getting the sense that you’re comparing our Empathic Check-in with our previous Success Stand-ups, and I’m wondering whether you’re missing the business talk?” 
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    No fricking way. 
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    “Umm…I guess it’s less that, and maybe more that…well, I guess we have to be empathic now, and that makes me question whether we’re not all, maybe…going through the motions, play-acting empathy, not really feeling it?”
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Slow exhalation from the boss, gently intense gaze and he’s got his hand on his heart. God, he’s good at this. 
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    “So you’re questioning whether we’re truly feeling empathy, or just play-acting…Wow, I personally feel so grateful for you, Saskia, for being here and for bringing this into our space. I wonder whether we all have a small voice that sometimes worries about this, and what this might feel like, for the group..?”
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Ok, we’re going around the room now and wow they feel it too! 
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Yes, Lindsey, it kind of does feel like this itchy uncertainty. And old finance Dan, I’m sorry you’ve been feeling threatened in these meetings, I didn’t know. And yes, even you Brett - you’re so right, it’s lonely, not knowing if anything is heartfelt or just another KPI. 
                  </p>
                </div>
                <div className={s['story-paragraph']}>
                  <p>
                    Shoot. It worked. I feel better.
                  </p>
                </div>
              </Stagger>
            </div>

            {/* Chart Section */}
            <div className={s["chart-section"]}>
              <Animation
                tween={{
                  from: { opacity: 0, scale: 0.8, ease: "power2.out" },
                  start: 80,
                  end: 90,
                }}
              >
            
              </Animation>

              <Animation
                tween={{
                  from: { opacity: 0, scale: 1.1, ease: 'power2.out' },
                  start: 90,
                  end: 100,
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