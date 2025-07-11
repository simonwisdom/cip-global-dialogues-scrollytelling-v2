"use client";

import { forwardRef } from "react";
import s from "./emotional-understanding-poll.module.scss";

export const EmotionalUnderstandingPoll = forwardRef<HTMLDivElement, {}>(
  (props, ref) => {
    const pollData = {
      question: "Have you ever felt an AI truly understood your emotions?",
      options: [
        { text: "Yes", percentage: 36 },
        { text: "No", percentage: 64 },
      ],
      insight:
        "More than 1 in 3 people have experienced emotional understanding from AI",
    };

    return (
      <div ref={ref} className={s["poll-container"]} {...props}>
        <h3 className={s["question"]}>{pollData.question}</h3>
        <div className={s["options"]}>
          {pollData.options.map((option, index) => (
            <div key={index} className={s["option-wrapper"]}>
              <span className={s["option-label"]}>{option.text}</span>
              <div className={s["bar-container"]}>
                <div
                  className={option.text === "Yes" ? s.bar_yes : s.bar_no}
                  style={{ width: `${option.percentage}%` }}
                >
                  <span className={s["percentage"]}>{option.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={s["insight-container"]}>
          <p className={s["insight-text"]}>{pollData.insight}</p>
        </div>
      </div>
    );
  }
);

EmotionalUnderstandingPoll.displayName = "EmotionalUnderstandingPoll"; 