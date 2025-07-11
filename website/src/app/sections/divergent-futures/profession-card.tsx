"use client";

import { forwardRef, useRef, useState, useEffect, memo } from "react";
import Image from "next/image";
import s from "./profession-card.module.scss";
import { useIsoLayoutEffect } from "../../hooks/use-iso-layout-effect";
import { gsap } from "gsap";

interface Profession {
  id: string;
  name: string;
  icon: string; // image path
  human: {
    title: string;
    story: string;
    image: string;
  };
  ai: {
    title: string;
    story: string;
    image: string;
  };
}

interface ProfessionCardProps {
  profession: Profession;
  onClose: () => void;
}

// Preload images for better performance
const preloadImage = (src: string) => {
  const img = new window.Image();
  img.src = src;
};

export const ProfessionCard = memo(forwardRef<HTMLDivElement, ProfessionCardProps>(
  ({ profession, onClose }, ref) => {
    console.log('[ProfessionCard] Rendered. Profession:', profession);
    const [choice, setChoice] = useState<"human" | "ai" | null>(null);
    const [isFlipping, setIsFlipping] = useState(false);
    const cardContentRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const humanButtonRef = useRef<HTMLButtonElement>(null);
    const aiButtonRef = useRef<HTMLButtonElement>(null);
    const backButtonRef = useRef<HTMLButtonElement>(null);

    // Preload both images when component mounts
    useEffect(() => {
      preloadImage(profession.human.image);
      preloadImage(profession.ai.image);
    }, [profession]);

    // Focus management
    useEffect(() => {
      if (choice === null) {
        // Focus the first choice button when card opens
        humanButtonRef.current?.focus();
      } else {
        // Focus the back button when flipped
        backButtonRef.current?.focus();
      }
    }, [choice]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (choice !== null) {
          handleBack();
        } else {
          onClose();
        }
      }
    };

    const handleChoice = (c: "human" | "ai") => {
      if (isFlipping) return;
      setChoice(c);
    };

    const handleBack = () => {
      if (isFlipping) return;
      setChoice(null);
    };

    useIsoLayoutEffect(() => {
      if (choice === null) {
        // We are on the front, do nothing initially
        return;
      }
      // We are on the back, set it instantly
      gsap.set(cardContentRef.current, { rotationY: 180 });
    }, []);

    useIsoLayoutEffect(() => {
      const ctx = gsap.context(() => {
        setIsFlipping(true);
        gsap.to(cardContentRef.current, {
          rotationY: choice ? 180 : 0,
          duration: 0.7,
          ease: "power2.inOut",
          onComplete: () => {
            setIsFlipping(false);
          },
        });
      }, cardContentRef);
      return () => ctx.revert();
    }, [choice]);

    const selectedOption = choice ? profession[choice] : null;

    return (
      <div 
        className={s.card} 
        ref={ref}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-labelledby="profession-title"
        aria-describedby="profession-description"
      >
        <button 
          className={s.closeButton} 
          onClick={onClose}
          ref={closeButtonRef}
          aria-label="Close profession card"
        >
          &times;
        </button>
        <div className={s.cardHeader}>
          <img src={profession.icon} className={s.professionIcon} alt="" aria-hidden="true" />
          <h3 className={s.professionName} id="profession-title">{profession.name}</h3>
        </div>

        <div className={s.cardContent}>
          <div ref={cardContentRef} className={s.flipContainer}>
            {/* Front of the card */}
            <div className={s.flippableContent}>
              <div className={s.choiceContainer}>
                <h4 className={s.choiceQuestion} id="profession-description">
                  What does the future of {profession.name.toLowerCase()} look
                  like?
                </h4>
                <p className={s.choiceSubtitle}>
                  Will we embrace AI automation, or double down on human
                  skills?
                </p>
                <div className={s.choiceButtons} role="group" aria-label="Choose future direction">
                  <button
                    ref={humanButtonRef}
                    className={`${s.choiceButton} ${s.humanChoice}`}
                    onClick={() => handleChoice("human")}
                    disabled={isFlipping}
                    aria-describedby="human-description"
                  >
                    Human
                  </button>
                  <button
                    ref={aiButtonRef}
                    className={`${s.choiceButton} ${s.aiChoice}`}
                    onClick={() => handleChoice("ai")}
                    disabled={isFlipping}
                    aria-describedby="ai-description"
                  >
                    AI
                  </button>
                </div>
                <div className="sr-only">
                  <div id="human-description">Choose human-led future for {profession.name.toLowerCase()}</div>
                  <div id="ai-description">Choose AI-automated future for {profession.name.toLowerCase()}</div>
                </div>
              </div>
            </div>

            {/* Back of the card */}
            <div
              className={s.flippableContent}
              style={{ transform: "rotateY(180deg)" }}
            >
              <button 
                className={s.backButton} 
                onClick={handleBack}
                ref={backButtonRef}
                disabled={isFlipping}
                aria-label="Go back to choice selection"
              >
                Choose Again
              </button>
              {selectedOption && (
                <div className={s.singleOption}>
                  <Image
                    src={selectedOption.image}
                    alt={selectedOption.title}
                    width={600}
                    height={400}
                    className={s.image}
                    priority
                    loading="eager"
                  />
                  <div className={s.text}>
                    <h4 className={s.optionTitle}>{selectedOption.title}</h4>
                    <p className={s.optionStory}>{selectedOption.story}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
));

ProfessionCard.displayName = "ProfessionCard";