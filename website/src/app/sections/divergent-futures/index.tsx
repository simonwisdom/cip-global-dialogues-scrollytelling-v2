"use client";

import s from "./divergent-futures.module.scss";
import { ProfessionCard } from "./profession-card";
import {
  EducationIcon,
  FoodServiceIcon,
  HealthcareIcon,
  JournalismIcon,
  PoliticsIcon,
  ReligionIcon,
  TherapyIcon,
  TransportationIcon,
} from "./professions-icons";
import { useIsoLayoutEffect } from "../../hooks/use-iso-layout-effect";
import { useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { UncomfortableResponsesModal } from "./uncomfortable-responses-modal";

const professions = [
  {
    id: 'journalism',
    name: 'Journalism',
    icon: JournalismIcon,
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
    icon: PoliticsIcon,
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
    icon: TherapyIcon,
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
    icon: FoodServiceIcon,
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
    icon: TransportationIcon,
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
    icon: EducationIcon,
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
    icon: HealthcareIcon,
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
  },
  {
    id: 'religion',
    name: 'Religion',
    icon: ReligionIcon,
    human: {
      title: 'Human-Led Worship',
      story: 'Religious leaders remain central, guiding through lived tradition. AI may assist with scripture research or translation, but worship, confession, and meaning-making are communal, embodied, and relational.',
      image: '/images/section2/religion_strong_human_presence.webp'
    },
    ai: {
      title: 'AI-Automated Spirituality',
      story: 'Spiritual guidance is delivered via AI avatars trained on sacred texts, offering personalized sermons, rituals, and meditative practices. Temples and churches become immersive centers of automated reflection.',
      image: '/images/section2/religion_full_ai_automation.webp'
    }
  }
];

export const DivergentFutures = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const [selectedProfession, setSelectedProfession] = useState<typeof professions[0] | null>(null);
  const [activeProfession, setActiveProfession] = useState<typeof professions[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoized callback for better performance
  const handleProfessionSelect = useCallback((profession: typeof professions[0]) => {
    setSelectedProfession(profession);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProfession(null);
  }, []);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (selectedProfession && !activeProfession) {
        // Animate grid out with new CSS classes
        gsap.to(gridRef.current, {
          autoAlpha: 0,
          scale: 0.95,
          y: 20,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            setActiveProfession(selectedProfession);
          },
        });
      } else if (!selectedProfession && activeProfession) {
        // Animate card out, then reset
        gsap.to(cardWrapperRef.current, {
          autoAlpha: 0,
          y: 50,
          scale: 0.95,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            setActiveProfession(null);
            // Animate grid back in
            gsap.to(gridRef.current, {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          },
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, [selectedProfession, activeProfession]);

  // Card fade-in animation with improved timing
  useIsoLayoutEffect(() => {
    if (!activeProfession) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(cardWrapperRef.current, 
        {
          autoAlpha: 0,
          y: 50,
          scale: 0.95,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeProfession]);
  
  return (
    <>
      <section className={s["scenario"]} ref={containerRef}>
        {/* Scenario Header */}
        <div className={s["scenario-header"]}>
          <div>
            <div className={s["scenario-number"]}>2</div>
            <h2 className={s["scenario-title"]}>Divergent Futures</h2>
            <p className={s["scenario-subtitle"]}>
              Human-Centric or AI-Automated? You decide.
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className={s["intro-section"]}>
          <div className={s["intro-content"]}>
            <p className={s["intro-text"]}>
              Conscious or not, AI is set to take on a much larger share of
              human tasks - though people disagree on where they would and
              would not like to see AI. What do you think?
            </p>

          </div>
        </div>

        <div className={s['professions-grid-container']}>
          <div ref={gridRef} className={s['professions-grid']}>
            {professions.map((p) => (
              <div
                key={p.id}
                className={s['profession-icon-container']}
                onClick={() => handleProfessionSelect(p)}
                role="button"
                tabIndex={0}
                aria-label={`Select ${p.name} profession`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProfessionSelect(p);
                  }
                }}
              >
                <p.icon className={s['profession-icon']} aria-hidden="true" />
                <span className={s['profession-name']}>{p.name}</span>
              </div>
            ))}
          </div>

          <div 
            ref={cardWrapperRef} 
            className={`${s.cardWrapper} ${activeProfession ? s.visible : ''}`}
          >
            {activeProfession && (
              <ProfessionCard
                profession={activeProfession}
                onClose={handleClose}
              />
            )}
          </div>
        </div>
        <div className={s["data-source-card"]}>
          <button 
            className={s.ctaButton} 
            onClick={() => setIsModalOpen(true)}
            aria-label="Read uncomfortable AI responses"
          >
            Read what people are uncomfortable with AI deciding
          </button>
        </div>
      </section>
      <UncomfortableResponsesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};