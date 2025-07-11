"use client";

import { forwardRef, useState, useMemo } from "react";
import Image from "next/image";
import s from "./profession-card.module.scss";

interface Profession {
  id: string;
  name: string;
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
}

export const ProfessionCard = forwardRef<HTMLDivElement, ProfessionCardProps>(
  ({ profession }, ref) => {
    const [selectedMode, setSelectedMode] = useState<'human' | 'ai' | 'neutral'>('neutral');
    const [isFlipped, setIsFlipped] = useState(false);

    const handleSelect = (mode: 'human' | 'ai') => {
      setSelectedMode(mode);
      setIsFlipped(true);
    };

    const handleChooseAgain = () => {
      setIsFlipped(false);
      // We wait for the flip back animation to complete before resetting the content
      setTimeout(() => {
        setSelectedMode('neutral');
      }, 300); // This should match the transition duration in CSS
    };

    const cardContent = useMemo(() => {
      if (selectedMode === 'neutral') {
        return null;
      }
      return (
        <>
          <div className={s["header"]}>
            <h4 className={s["profession-name"]}>{profession[selectedMode].title}</h4>
          </div>
          <div className={s["content"]}>
            <div className={s["image-container"]}>
              <Image
                src={profession.human.image}
                alt={profession.human.title}
                width={300}
                height={200}
                className={`${s.image} ${selectedMode === 'human' ? s.active : ''}`}
              />
              <Image
                src={profession.ai.image}
                alt={profession.ai.title}
                width={300}
                height={200}
                className={`${s.image} ${selectedMode === 'ai' ? s.active : ''}`}
              />
            </div>
            <div className={s["text-content"]}>
              <p className={s["mode-story"]}>{profession[selectedMode].story}</p>
            </div>
          </div>
          <div className={s["choose-again-container"]}>
            <button className={s["choose-again-button"]} onClick={handleChooseAgain}>
              Choose Again
            </button>
          </div>
        </>
      );
    }, [selectedMode, profession]);


    return (
      <div className={s["card-perspective-container"]} ref={ref}>
        <div className={`${s["card-flipper"]} ${isFlipped ? s["flipped"] : ""}`}>
          <div className={s["card-front"]}>
            <div className={s["card"]}>
              <div className={s["header"]}>
                <h4 className={s["profession-name"]}>{profession.name}</h4>
              </div>
              <div className={s["neutral-content"]}>
                <div className={s["choice-buttons"]}>
                  <button
                    className={`${s["choice-button"]} ${s["human-button"]}`}
                    onClick={() => handleSelect('human')}
                  >
                    Human-Centric
                  </button>
                  <button
                    className={`${s["choice-button"]} ${s["ai-button"]}`}
                    onClick={() => handleSelect('ai')}
                  >
                    AI-Automated
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={s["card-back"]}>
            <div className={s["card"]}>
              {cardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ProfessionCard.displayName = "ProfessionCard";