"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const baseOptions = [
  {
    letter: "A",
    text: "Chilli Chicken",
    mood: "angry",
    cloud: "This is not the vibe, my panda brain says no 😅",
  },
  {
    letter: "B",
    text: "Ice Cream",
    mood: "very-angry",
    cloud: "Cute idea, but not the one I was waiting for 😏",
  },
  {
    letter: "C",
    text: "Chicken Biryani",
    mood: "very-angry",
    cloud: "Yummy, but not the real answer 😬",
  },
  {
    letter: "D",
    text: "Fish Fry",
    mood: "very-very-angry",
    cloud: "You missed the real option, you wanna see it?",
  },
];

const hiddenOption = {
  letter: "E",
  text: "Kasthuri Chicken",
  mood: "happy",
  cloud: "❤️",
};

const options = [...baseOptions, hiddenOption];
const correctLetter = "E";

export default function PageThree() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showHiddenOption, setShowHiddenOption] = useState(false);
  const [clickedBaseOptions, setClickedBaseOptions] = useState<Set<string>>(new Set());

  const logQuizActivity = async (option: { letter: string; text: string }) => {
    try {
      await fetch("/api/quiz-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "answer",
          question: 3,
          optionLetter: option.letter,
          optionText: option.text,
          message: `Question 3 clicked option ${option.letter}: ${option.text}`,
        }),
      });
    } catch (error) {
      console.error("Unable to log quiz result", error);
    }
  };

  const visibleOptions = showHiddenOption ? options : baseOptions;

  const activeOption = useMemo(
    () => options.find((option) => option.letter === selected) ?? options[0],
    [selected]
  );

  const isCorrect = selected === correctLetter;
  const hasSeenAllFour = clickedBaseOptions.size >= 4;
  const canRevealHidden = !showHiddenOption && selected !== null && !isCorrect && hasSeenAllFour;

  const handleSelect = (letter: string) => {
    setSelected(letter);

    if (baseOptions.some((option) => option.letter === letter)) {
      setClickedBaseOptions((current) => {
        const next = new Set(current);
        next.add(letter);
        return next;
      });
    }
  };

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
              <div className="kbc-pot">Question 3</div>
            </div>

            <div className="kbc-question-box">
              <p className="kbc-question-label">Question 3</p>
              <h1 className="kbc-question">What is Moulis favourite dish?</h1>
            </div>

            <div className="kbc-options">
              {visibleOptions.map((option) => {
                const selectedClass = option.letter === selected ? "is-selected" : "";

                return (
                  <button
                    key={option.letter}
                    type="button"
                    className={`kbc-option ${selectedClass}`}
                    onClick={() => {
                      handleSelect(option.letter);
                      void logQuizActivity(option);
                    }}
                  >
                    <span className="kbc-option-letter">{option.letter}</span>
                    <span>{option.text}</span>
                  </button>
                );
              })}
            </div>

            {canRevealHidden && (
              <div className="kbc-footer-row">
                <div className="kbc-feedback">Do you want to see one more option?</div>
                <button type="button" className="kbc-next-button" onClick={() => setShowHiddenOption(true)}>
                  Show
                </button>
              </div>
            )}

            {selected && (
              <div className="kbc-footer-row">
                <div className="kbc-feedback">{isCorrect ? activeOption.cloud : activeOption.cloud}</div>
                {isCorrect && (
                  <Link href="/4" className="kbc-next-button">
                    Next
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="kbc-right">
            <div className="kbc-host-box">
              <div className="kbc-speech">
                {selected ? activeOption.cloud : "Pick the favourite dish!"}
              </div>

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
