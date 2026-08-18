"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const options = [
  {
    letter: "A",
    text: "Kashburi",
    mood: "happy",
    cloud: "Wow, you are so smart 😄",
  },
  {
    letter: "B",
    text: "Pani Puri",
    mood: "angry",
    cloud: "Unaku pudikuma? Enakkum pudikum 😏",
  },
  {
    letter: "C",
    text: "Phel Buri",
    mood: "very-angry",
    cloud: "Epa pathalum spaadu spaadu sapadu 😅",
  },
  {
    letter: "D",
    text: "Kasthuri",
    mood: "very-very-angry",
    cloud: "That is the name of the most beautiful girl, but not the panda 😌",
  },
];

const correctLetter = "A";

export default function KashPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const logQuizActivity = async (option: { letter: string; text: string }) => {
    try {
      await fetch("/api/quiz-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "answer",
          question: 1,
          optionLetter: option.letter,
          optionText: option.text,
          message: `Question 1 clicked option ${option.letter}: ${option.text}`,
        }),
      });
    } catch (error) {
      console.error("Unable to log quiz result", error);
    }
  };

  const activeOption = useMemo(
    () => options.find((option) => option.letter === selected) ?? options[0],
    [selected]
  );

  const isCorrect = selected === correctLetter;

  return (
    <main className="kbc-page">
      <div className="kbc-shell">
        <div className="kbc-layout">
          <div className="kbc-left">
            <div className="kbc-header">
              <div className="kbc-brand">
                <span className="kbc-brand-mark">K</span>
                KBC STYLE
              </div>
              <div className="kbc-pot">₹ 1,00,000</div>
            </div>

            <div className="kbc-question-box">
              <p className="kbc-question-label">Question 1</p>
              <h1 className="kbc-question">What is the name of the panda?</h1>
            </div>

            <div className="kbc-options">
              {options.map((option) => {
                const selectedClass = option.letter === selected ? "is-selected" : "";

                return (
                  <button
                    key={option.letter}
                    type="button"
                    className={`kbc-option ${selectedClass}`}
                    onClick={() => {
                      setSelected(option.letter);
                      void logQuizActivity(option);
                    }}
                  >
                    <span className="kbc-option-letter">{option.letter}</span>
                    <span>{option.text}</span>
                  </button>
                );
              })}
            </div>

            {selected && (
              <div className="kbc-footer-row">
                <div className="kbc-feedback">
                  {isCorrect ? activeOption.cloud : `Try a different option 😏`}
                </div>
                {isCorrect && (
                  <Link href="/2" className="kbc-next-button">
                    Next
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="kbc-right">
            <div className="kbc-host-box">
              <div className="kbc-speech">{selected ? activeOption.cloud : "Pick the right panda name!"}</div>

              <div className={`panda-stage ${selected ? activeOption.mood : "happy"}`}>
                <div className="panda" aria-label="Panda host reaction">
                  <div className="panda-face">
                    <span className="panda-eye left" />
                    <span className="panda-eye right" />
                    <span className="panda-nose" />
                    <span className="panda-mouth" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
