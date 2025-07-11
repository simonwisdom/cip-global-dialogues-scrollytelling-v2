"use client";

import { forwardRef, useRef, useState } from "react";
import Image from "next/image";
import s from "./profession-card.module.scss";
import { useIsoLayoutEffect } from "../../hooks/use-iso-layout-effect";
import { gsap } from "gsap";

interface Profession {
  id: string;
  name: string;
  icon: React.ElementType;
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

export const ProfessionCard = forwardRef<HTMLDivElement, ProfessionCardProps>(
  ({ profession, onClose }, ref) => {
    const [choice, setChoice] = useState<"human" | "ai" | null>(null);
    const [isFlipping, setIsFlipping] = useState(false);
    const cardContentRef = useRef<HTMLDivElement>(null);

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
      <div className={s.card} ref={ref}>
        <button className={s.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={s.cardHeader}>
          <profession.icon className={s.professionIcon} />
          <h3 className={s.professionName}>{profession.name}</h3>
        </div>

        <div className={s.cardContent}>
          <div ref={cardContentRef} className={s.flipContainer}>
            {/* Front of the card */}
            <div className={s.flippableContent}>
              <div className={s.choiceContainer}>
                <h4 className={s.choiceQuestion}>
                  What does the future of {profession.name.toLowerCase()} look
                  like?
                </h4>
                <p className={s.choiceSubtitle}>
                  Will we embrace AI automation, or double down on human
                  skills?
                </p>
                <div className={s.choiceButtons}>
                  <button
                    className={`${s.choiceButton} ${s.humanChoice}`}
                    onClick={() => handleChoice("human")}
                  >
                    Human
                  </button>
                  <button
                    className={`${s.choiceButton} ${s.aiChoice}`}
                    onClick={() => handleChoice("ai")}
                  >
                    AI
                  </button>
                </div>
              </div>
            </div>

            {/* Back of the card */}
            <div
              className={s.flippableContent}
              style={{ transform: "rotateY(180deg)" }}
            >
              <button className={s.backButton} onClick={handleBack}>
                &larr; Back
              </button>
              {selectedOption && (
                <div className={s.singleOption}>
                  <Image
                    src={selectedOption.image}
                    alt={selectedOption.title}
                    width={600}
                    height={400}
                    className={s.image}
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
);

ProfessionCard.displayName = "ProfessionCard";