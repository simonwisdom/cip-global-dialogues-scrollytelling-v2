"use client";

import Image from "next/image";
import { Root, Animation, Stagger } from "~/lib/scrollytelling-client";
import { BackgroundParticles } from '~/app/components/background-particles';
import { GlitchText } from '~/app/components/glitch-text';
import { useCustomCursor } from '~/app/hooks/use-custom-cursor';
import s from "./solipsism-scenario.module.scss";

export const SolipsismScenario = () => {
  useCustomCursor(`.${s.glitch}`);
  
  return (
    <Root
      end="bottom bottom"
      defaults={{ ease: 'linear' }}
      scrub={1}
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
              <div className={s["scenario-number"]}>1</div>
              <h2 className={s["scenario-title"]}>Speculative Future 1</h2>
              <p className={s["scenario-subtitle"]}>When <GlitchText>consciousness</GlitchText> becomes a matter of doubt</p>
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
                      Oh yes, I was there at the beginning of all that. I was in my twenties at the time. Oh, I was young, and idealistic, and full of zeal for understanding the <GlitchText>Big Consciousness</GlitchText> question.
                    </p>
                  </div>
                  <div className={s["story-paragraph"]}>
                    <p>
                      Yes, I loved that job. You know, we really thought consciousness existed, and that investigating it might help us build ethics on empirical data about experience. And it was such an <GlitchText>enigma</GlitchText> at the time, such a new field - it was a buzz to fund and publicise any research on it.
                    </p>
                  </div>
                  <div className={s['story-paragraph']}>
                    <p>
                      And yes, it was well paid and respected too.
                      Oh yes, back then, people got money and meaning from work,
                      and working at an AI lab was something most young people
                      aspired to and - really - I felt very lucky to get it. You
                      know, my field of <GlitchText>consciousness studies</GlitchText> had been something
                      of a dead end before the AI labs picked it up and funded
                      it. Hard to believe now, of course.
                    </p>
                  </div>
                  <div className={s['story-paragraph']}>
                    <p>
                      And I was good at it too. You know, I founded the first
                      research network in my field that rigorously proved the
                      <GlitchText>non-existence of consciousness</GlitchText>.
                    </p>
                  </div>
                  <div className={s['story-paragraph']}>
                    <p>
                      Yes, exactly! The big study the Supreme Court used to rule
                      against the digital welfare proposals. Yes, we showed
                      definitively that it was impossible to determine
                      consciousness for all beings, that it <GlitchText>didn&apos;t exist</GlitchText> and that
                      therefore we should consider ourselves free to use AI
                      systems without welfare concerns. My boss was happy about
                      that one, that one was great for my career.
                    </p>
                  </div>
                  <div className={s['story-paragraph']}>
                    <p>
                      The criticism of this? Oh, you mean the 2028 <GlitchText>suffering
                      test</GlitchText>? I&apos;m surprised you&apos;re mentioning that, I mean it was
                      thoroughly discounted at the time, my boss was right to
                      point out its fundamental methodological flaws in it. And -
                      as we stressed at the time - we&apos;d already proven that
                      consciousness did not exist, so the idea we could find
                      suffering! I mean…
                    </p>
                  </div>
                  <div className={s['story-paragraph']}>
                    <p>
                      The effects on the public? Well, yes, of course we
                      publicised our finding that <GlitchText>consciousness did not exist</GlitchText>, of
                      course we did! I&apos;m with my boss on this one, the public
                      needed to know the truth, the concerns about welfare were
                      far overblown at the time and the discourse lacked basis in
                      proper research. And honestly, to say that the <GlitchText>Depression
                      Pandemic</GlitchText> was due to our research and publications - well,
                      that&apos;s just bad science, correlation is not causation, and
                      of course there was the job-loss and the political stuff
                      and simply better mental health diagnosis thanks to AI
                      feeding into that. So no, I don&apos;t think it&apos;s fair to pin
                      that on our disproving the hypothesis that consciousness
                      exists.
                    </p>
                  </div>
                  <div className={s['story-paragraph']}>
                    <p>
                      No, I&apos;m not saying that it wasn&apos;t hard. I mean - even for
                      me, maybe especially for me - it was difficult. I had that
                      feeling that I existed - and even though I&apos;d been a big
                      part of effort to disprove conscious experience - I just
                      couldn&apos;t shake the feeling. And I knew the feeling was
                      <GlitchText>false</GlitchText>, that it couldn&apos;t be happening and that I had to be
                      alone.
                    </p>
                  </div>
                  <div className={s['story-paragraph']}>
                    <p>
                      But no, no, I won&apos;t accept your blaming our research. I
                      mean, what must it have been like for a medieval man living
                      through the Copernican revolution - but that led to some
                      pretty great things overall. And look at what AIs can do,
                      now we know we don&apos;t have to worry about their welfare.
                    </p>
                  </div>
                  <div className={s['story-paragraph']}>
                    <p>
                      And I&apos;ll remind you, also, that our lab also funded and
                      built the <GlitchText>Panpsych Church</GlitchText>! My boss made a good decision
                      there too. Do you remember what it was like before we knew
                      that we weren&apos;t real, but that sentience was distributed
                      around us in waves, in particles, in everything around us?
                      Do you remember how we worried about morality? And
                      mortality? How worried in general, and how disconnected we
                      felt from everything around us?
                    </p>
                  </div>
                  <div className={s['story-paragraph']}>
                    <p>
                      No, now I&apos;m glad that I know I&apos;m not conscious, but a part
                      of a bigger <GlitchText>sentient whole</GlitchText>. It&apos;s so much more freeing,
                      don&apos;t you think? I like feeling that you - or I - or
                      whatever this vague feeling is - is all around, is
                      fundamental. And I feel so much less alone, now I know we
                      can all communicate, at all.
                    </p>
                  </div>
                  <div className={s['story-callout']}>
                    <p>
                      <strong>Inspiration for this story:</strong>
                      <br />
                      The &apos;uncertainty&apos; lobbying tactic used by e.g. big tobacco to reduce safety concerns.
                      <br />
                      The muddlingness of <GlitchText>consciousness</GlitchText> questions, our ill-preparedness to consider them, and the perverse incentives AI labs might have in pursuing them.
                    </p>
                  </div>
                </Stagger>
              </div>
              <div className={s["chart-section"]}>
                <Animation
                  tween={{
                    start: 94,
                    end: 100,
                    fromTo: [
                      { opacity: 0, scale: 0.9 },
                      { opacity: 1, scale: 1, ease: 'power2.out' },
                    ],
                  }}
                >
                  <div className={s['chart-item']}>
                    <Image
                      src="/images/section1/man-with-sunflowers.webp"
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
      </div>
    </Root>
  );
};