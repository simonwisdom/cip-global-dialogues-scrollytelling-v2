"use client";

import Image from "next/image";
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
import { useRef, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { UncomfortableResponsesModal } from "./uncomfortable-responses-modal";

// Preload all profession images for instant loading
const preloadAllImages = () => {
  const allImages = [
    '/images/section2/journalism_strong_human_presence.webp',
    '/images/section2/journalism_full_ai_automation.webp',
    '/images/section2/politics_strong_human_presence.webp',
    '/images/section2/politics_full_ai_automation.webp',
    '/images/section2/therapy_strong_human_presence.webp',
    '/images/section2/therapy_full_ai_automation.webp',
    '/images/section2/food service_strong_human_presence.webp',
    '/images/section2/food service_full_ai_automation.webp',
    '/images/section2/transportation_strong_human_presence.webp',
    '/images/section2/transportation_full_ai_automation.webp',
    '/images/section2/education_strong_human_presence.webp',
    '/images/section2/education_full_ai_automation.webp',
    '/images/section2/healthcare_strong_human_presence.webp',
    '/images/section2/healthcare_full_ai_automation.webp',
    '/images/section2/religion_strong_human_presence.webp',
    '/images/section2/religion_full_ai_automation.webp',
  ];
  
  allImages.forEach(src => {
    const img = new window.Image();
    img.src = src;
  });
};

const professions = [
  {
    id: 'journalism',
    name: 'Journalism',
    icon: '/icons/journalism.png',
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
    icon: '/icons/politics.png',
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
    icon: '/icons/therapy.png',
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
    icon: '/icons/food-service.png',
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
    icon: '/icons/transportation.png',
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
    icon: '/icons/education.png',
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
    icon: '/icons/healthcare.png',
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
    icon: '/icons/religion.png',
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
  const [clickedProfessionId, setClickedProfessionId] = useState<string | null>(null);

  // Preload all images on component mount
  useEffect(() => {
    preloadAllImages();
  }, []);

  // Memoized callback for better performance
  const handleProfessionSelect = useCallback((profession: typeof professions[0]) => {
    // Set both states immediately for instant response
    setSelectedProfession(profession);
    setActiveProfession(profession);
    setClickedProfessionId(profession.id);
    
    // Clear clicked state after animation
    setTimeout(() => setClickedProfessionId(null), 300);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProfession(null);
    setActiveProfession(null);
  }, []);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    // Only close if clicking the overlay itself, not its children
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && activeProfession) {
      handleClose();
    }
  }, [activeProfession, handleClose]);

  // Add keyboard event listener for Escape key
  useEffect(() => {
    if (activeProfession) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [activeProfession, handleKeyDown]);

  // Simplified animation - only animate card appearance
  useIsoLayoutEffect(() => {
    if (!activeProfession) return;
    
    const ctx = gsap.context(() => {
      // Quick fade-in animation for the card
      gsap.fromTo(cardWrapperRef.current, 
        {
          autoAlpha: 0,
          y: 20,
          scale: 0.98,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
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
            <div className={s["scenario-number"]}>3</div>
            <h2 className={s["scenario-title"]}>Divergent Futures</h2>
    
          </div>
        </div>

        {/* Introduction */}
        <div className={s["intro-section"]}>
          <div className={s["intro-content"]}>
            <div className={s["section-title"]}>
              <h3>
                Conscious or not, AI is set to take on a much larger share of
                human tasks - though people disagree on where they would and
                would not like to see AI.
              </h3>
            </div>
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

        <div className={s["section-title"]}>
          <h3>What do you think?</h3>
        </div>

        <div className={s['professions-grid-container']}>
          <div ref={gridRef} className={s['professions-grid']}>
            {professions.map((p) => (
              <div
                key={p.id}
                className={`${s['profession-icon-container']} ${clickedProfessionId === p.id ? s.clicked : ''}`}
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
                <Image src={p.icon} className={s['profession-icon']} alt="" aria-hidden="true" width={48} height={48} />
                <span className={s['profession-name']}>{p.name}</span>
              </div>
            ))}
          </div>

          {activeProfession && (
            <div 
              className={s.overlay}
              onClick={handleOverlayClick}
              role="presentation"
            >
              <div 
                ref={cardWrapperRef} 
                className={`${s.cardWrapper} ${activeProfession ? s.visible : ''}`}
              >
                <ProfessionCard
                  profession={activeProfession}
                  onClose={handleClose}
                />
              </div>
            </div>
          )}
        </div>
      </section>
      <UncomfortableResponsesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};