"use client";

import { Root, Animation } from "~/lib/scrollytelling-client";
import s from "./divergent-futures.module.scss";
import { ProfessionCard } from "./profession-card";

const professions = [
  {
    id: 'journalism',
    name: 'Journalism',
    human: {
      title: 'Human-Led Reporting',
      story: 'Reporters focus on deep, investigative work, building trust through on-the-ground presence and nuanced storytelling.',
      image: '/images/section2/journalism_strong_human_presence.webp'
    },
    ai: {
      title: 'AI-Generated News',
      story: 'Algorithms generate news reports instantly, covering vast amounts of data with unparalleled speed and breadth.',
      image: '/images/section2/journalism_full_ai_automation.webp'
    }
  },
  {
    id: 'politics',
    name: 'Politics',
    human: {
      title: 'Community Governance',
      story: 'Politicians engage in local town halls, making decisions based on direct constituent feedback and personal charisma.',
      image: '/images/section2/politics_strong_human_presence.webp'
    },
    ai: {
      title: 'Algorithmic Policy',
      story: 'AI analyzes societal data to propose optimal policies, removing human bias and emotional rhetoric from governance.',
      image: '/images/section2/politics_full_ai_automation.webp'
    }
  },
  {
    id: 'therapy',
    name: 'Therapy',
    human: {
      title: 'Empathetic Counsel',
      story: 'Therapists provide a human connection, using intuition and shared experience to guide patients through complex emotions.',
      image: '/images/section2/therapy_strong_human_presence.webp'
    },
    ai: {
      title: 'Data-Driven Support',
      story: 'AI counselors offer 24/7 access, using data from millions of sessions to provide evidence-based cognitive support.',
      image: '/images/section2/therapy_full_ai_automation.webp'
    }
  },
  {
    id: 'food-service',
    name: 'Food Service',
    human: {
      title: 'Artisanal Dining',
      story: 'Chefs and servers create unique, personal dining experiences where hospitality and craft are the main ingredients.',
      image: '/images/section2/food service_strong_human_presence.webp'
    },
    ai: {
      title: 'Automated Sustenance',
      story: 'Robotic kitchens prepare nutritionally optimized meals delivered with maximum efficiency, freeing humans from culinary labor.',
      image: '/images/section2/food service_full_ai_automation.webp'
    }
  },
  {
    id: 'transportation',
    name: 'Transportation',
    human: {
      title: 'The Open Road',
      story: 'Human drivers navigate the world, offering personal service and the flexibility to go off the beaten path.',
      image: '/images/section2/transportation_strong_human_presence.webp'
    },
    ai: {
      title: 'Seamless Transit Networks',
      story: 'AI-controlled vehicles optimize traffic flow, eliminating accidents and making commutes faster and more predictable.',
      image: '/images/section2/transportation_full_ai_automation.webp'
    }
  },
  {
    id: 'education',
    name: 'Education',
    human: {
      title: 'Mentorship & Discovery',
      story: 'Teachers inspire curiosity and critical thinking, mentoring students through collaborative, in-person discovery.',
      image: '/images/section2/education_strong_human_presence.webp'
    },
    ai: {
      title: 'Personalized Learning',
      story: 'AI tutors adapt to each student\'s pace and style, delivering a perfectly customized curriculum for optimal knowledge retention.',
      image: '/images/section2/education_full_ai_automation.webp'
    }
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    human: {
      title: 'The Healing Touch',
      story: 'Doctors and nurses provide compassionate bedside care, making complex diagnoses based on experience and human intuition.',
      image: '/images/section2/healthcare_strong_human_presence.webp'
    },
    ai: {
      title: 'Precision Medicine',
      story: 'AI analyzes genetic and lifestyle data to predict illnesses and prescribe treatments with superhuman accuracy.',
      image: '/images/section2/healthcare_full_ai_automation.webp'
    }
  }
];

export const DivergentFutures = () => {
  return (
    <Root
      defaults={{
        ease: "power1.inOut",
      }}
      start="top 80%"
      end="bottom 20%"
      debug={
        process.env.NODE_ENV === 'development'
          ? { markers: true, label: 'DivergentFutures' }
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
              <div className={s["scenario-number"]}>2</div>
              <h2 className={s["scenario-title"]}>Divergent Futures</h2>
              <p className={s["scenario-subtitle"]}>Human-Centric or AI-Automated? You decide.</p>
            </div>
          </Animation>
        </div>

        {/* Introduction */}
        <div className={s["intro-section"]}>
          <div className={s["intro-content"]}>
            <Animation
              tween={{
                start: 10,
                end: 30,
                fromTo: [
                  { opacity: 0, y: 30 },
                  { opacity: 1, y: 0, ease: 'power2.out' },
                ],
              }}
            >
              <p className={s['intro-text']}>
                Conscious or not, AI is set to take on a much larger share of
                human tasks - though people disagree on where they would and
                would not like to see AI. What do you think?
              </p>
            </Animation>
            <Animation
              tween={{
                start: 15,
                end: 35,
                fromTo: [
                  { opacity: 0, y: 30 },
                  { opacity: 1, y: 0, ease: "power2.out" }
                ]
              }}
            >
              <p className={s["intro-text"]}>
                As AI capabilities grow, society faces a choice. Will we double down on human skills, or embrace automation?
              </p>
            </Animation>
            
            <Animation
              tween={{
                start: 25,
                end: 45,
                fromTo: [
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, ease: "power2.out" }
                ]
              }}
            >
              <p className={s["intro-text"]}>
                Survey results show that people have different opinions about where AI is appropriate.
              </p>
            </Animation>

            <Animation
              tween={{
                start: 35,
                end: 55,
                fromTo: [
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, ease: "power2.out" }
                ]
              }}
            >
              <h3 className={s["question"]}>Which future do you want?</h3>
            </Animation>
          </div>
        </div>

        {/* Professions Grid */}
        <div className={s["professions-container"]}>
          <div className={s["professions-grid"]}>
            {professions.map((profession, index) => (
              <Animation
                key={profession.id}
                tween={{
                  start: 10 + (index * 5),
                  end: 80 + (index * 3),
                  fromTo: [
                    { opacity: 0, y: 40, scale: 0.9 },
                    { opacity: 1, y: 0, scale: 1, ease: "power2.out" }
                  ]
                }}
              >
                <ProfessionCard profession={profession} />
              </Animation>
            ))}
          </div>
        </div>

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
            <p className={s["transition-text"]}>Performance becomes the new authenticity...</p>
          </Animation>
        </div>
      </section>
    </Root>
  );
};