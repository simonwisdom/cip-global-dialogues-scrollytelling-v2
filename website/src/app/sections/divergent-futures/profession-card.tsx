"use client";

import { useState } from "react";
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

export const ProfessionCard = ({ profession }: ProfessionCardProps) => {
  const [selectedMode, setSelectedMode] = useState<'human' | 'ai'>('human');

  const currentMode = profession[selectedMode];

  return (
    <div className={s["card"]}>
      <div className={s["header"]}>
        <h4 className={s["profession-name"]}>{profession.name}</h4>
        <div className={s["toggle-container"]}>
          <button
            className={`${s["toggle-button"]} ${selectedMode === 'human' ? s["active"] : ''}`}
            onClick={() => setSelectedMode('human')}
          >
            Human
          </button>
          <button
            className={`${s["toggle-button"]} ${selectedMode === 'ai' ? s["active"] : ''}`}
            onClick={() => setSelectedMode('ai')}
          >
            AI
          </button>
        </div>
      </div>

      <div className={s["content"]}>
        <div className={s["image-container"]}>
          <div className={s["emoji-image"]}>
            {currentMode.image}
          </div>
        </div>

        <div className={s["text-content"]}>
          <h5 className={s["mode-title"]}>{currentMode.title}</h5>
          <p className={s["mode-story"]}>{currentMode.story}</p>
        </div>
      </div>

      <div className={s["mode-indicator"]}>
        <div className={`${s["indicator"]} ${s[selectedMode]}`}>
          {selectedMode === 'human' ? '👤' : '🤖'} {selectedMode.toUpperCase()}
        </div>
      </div>
    </div>
  );
};