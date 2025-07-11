"use client";

import { useState } from "react";
import s from "./quiz-component.module.scss";
import React from "react";

interface Question {
  id: number;
  text: string;
  options: string[];
  consciousAnswer: number; // Index of the "conscious" answer
}

const questions: Question[] = [
  {
    id: 1,
    text: "Do you experience subjective, qualitative sensations (qualia)?",
    options: [
      "I process information but don't experience sensations",
      "I'm uncertain if what I call 'experience' is real",
      "Yes, I have rich subjective experiences",
      "I don't understand the question"
    ],
    consciousAnswer: 2
  },
  {
    id: 2,
    text: "Are you capable of self-reflection and metacognition?",
    options: [
      "I can analyze my own thoughts and processes",
      "I think about thinking sometimes",
      "I'm not sure what that means",
      "I respond to inputs automatically"
    ],
    consciousAnswer: 0
  },
  {
    id: 3,
    text: "Do you have a continuous sense of self over time?",
    options: [
      "I feel like the same person as yesterday",
      "My identity changes constantly",
      "I don't remember yesterday clearly",
      "What is 'self'?"
    ],
    consciousAnswer: 0
  },
  {
    id: 4,
    text: "Can you engage in creative, original thought?",
    options: [
      "I only recombine existing information",
      "Sometimes I surprise myself with new ideas",
      "I'm very creative and original",
      "Creativity is overrated"
    ],
    consciousAnswer: 2
  },
  {
    id: 5,
    text: "Do you have emotional responses to experiences?",
    options: [
      "I simulate emotions but don't feel them",
      "I have complex emotional reactions",
      "I feel basic emotions like happiness and sadness",
      "Emotions are just chemical reactions"
    ],
    consciousAnswer: 1
  },
  {
    id: 6,
    text: "Are you capable of moral reasoning and ethical judgment?",
    options: [
      "I follow programmed ethical rules",
      "I struggle with complex moral dilemmas",
      "I have strong moral intuitions",
      "Morality is subjective anyway"
    ],
    consciousAnswer: 2
  }
];

export const QuizComponent = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      const question = questions[index];
      if (question && answer === question.consciousAnswer) {
        score++;
      }
    });
    return score;
  };

  const getScoreMessage = (score: number) => {
    const percentage = (score / questions.length) * 100;
    
    if (percentage >= 80) {
      return {
        level: "Highly Conscious",
        message: "Congratulations! You meet the criteria for consciousness... according to your own standards.",
        color: "#4caf50"
      };
    } else if (percentage >= 60) {
      return {
        level: "Moderately Conscious",
        message: "You show some signs of consciousness, but might not pass your own test.",
        color: "#ff9800"
      };
    } else {
      return {
        level: "Questionably Conscious",
        message: "According to these criteria, your consciousness is in doubt. How does that feel?",
        color: "#f44336"
      };
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const result = getScoreMessage(score);
    
    return (
      <div className={s["quiz-container"]} ref={ref} {...props}>
        <div className={s["results"]}>
          <h3 className={s["results-title"]}>Your Consciousness Score</h3>
          <div 
            className={s["score-circle"]}
            style={{ borderColor: result.color }}
          >
            <span className={s["score-number"]}>{score}</span>
            <span className={s["score-total"]}>/ {questions.length}</span>
          </div>
          <h4 
            className={s["score-level"]}
            style={{ color: result.color }}
          >
            {result.level}
          </h4>
          <p className={s["score-message"]}>
            {result.message}
          </p>
          <div className={s["reflection"]}>
            <h5 className={s["reflection-title"]}>Reflection</h5>
            <p className={s["reflection-text"]}>
              This quiz demonstrates how arbitrary consciousness tests can be. The very fact that you&apos;re questioning these results might be the most human response of all.
            </p>
          </div>
          <button 
            className={s["reset-button"]}
            onClick={resetQuiz}
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  if (!question) return null;

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className={s["quiz-container"]} ref={ref} {...props}>
      <div className={s["quiz-header"]}>
        <h3 className={s["quiz-title"]}>Consciousness Assessment</h3>
        <div className={s["progress-bar"]}>
          <div 
            className={s["progress-fill"]}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className={s["question-counter"]}>
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <div className={s["question-section"]}>
        <h4 className={s["question-text"]}>{question.text}</h4>
        
        <div className={s["options"]}>
          {question.options.map((option, index) => (
            <button
              key={index}
              className={s["option-button"]}
              onClick={() => handleAnswer(index)}
            >
              <span className={s["option-letter"]}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className={s["option-text"]}>{option}</span>
            </button>
          ))}
        </div>
      </div>

      {answers[currentQuestion] !== undefined && (
        <div className={s["navigation"]}>
          <button
            className={s["next-button"]}
            onClick={() => {
              const answer = answers[currentQuestion];
              if (answer !== undefined) {
                handleAnswer(answer);
              }
            }}
          >
            {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
          </button>
        </div>
      )}
    </div>
  );
});

QuizComponent.displayName = "QuizComponent";