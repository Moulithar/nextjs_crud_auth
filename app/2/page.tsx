"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const baseOptions = [
  {
    letter: "A",
    text: "Aishwarya Rai",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    mood: "angry",
    cloud: "She is gorgeous, but not the winner 😌",
  },
  {
    letter: "B",
    text: "Sushmita Sen",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    mood: "very-angry",
    cloud: "Beautiful, but this round is not yours 😏",
  },
  {
    letter: "C",
    text: "Priyanka Chopra",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    mood: "very-angry",
    cloud: "Stunning choice, but not the final answer 😬",
  },
  {
    letter: "D",
    text: "Mila Kunis",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    mood: "very-very-angry",
    cloud: "You missed the real option, you wanna see it?",
  },
];

const hiddenOption = {
  letter: "E",
  text: "Kasthuri",
  image:
    "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=800&q=80",
  mood: "happy",
  cloud: "❤️",
};

const options = [...baseOptions, hiddenOption];
const correctLetter = "E";

export default function PageTwo() {
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
          question: 2,
          optionLetter: option.letter,
          optionText: option.text,
          message: `Question 2 clicked option ${option.letter}: ${option.text}`,
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
              <div className="kbc-pot">Question 2</div>
            </div>

            <div className="kbc-question-box">
              <p className="kbc-question-label">Question 2</p>
              <h1 className="kbc-question">Who is the most beautiful among these 4?</h1>
            </div>

            <div className="kbc-photo-grid">
              {visibleOptions.map((option) => {
                const selectedClass = option.letter === selected ? "is-selected" : "";

                return (
                  <button
                    key={option.letter}
                    type="button"
                    className={`kbc-photo-option ${selectedClass}`}
                    onClick={() => {
                      handleSelect(option.letter);
                      void logQuizActivity(option);
                    }}
                  >
                    <span className="kbc-option-letter">{option.letter}</span>
                    <img src={option.image} alt={option.text} className="kbc-choice-image" />
                    <span className="kbc-photo-name">{option.text}</span>
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
                  <Link href="/3" className="kbc-next-button">
                    Next
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="kbc-right">
            <div className="kbc-host-box">
              <div className="kbc-speech">
                {selected ? activeOption.cloud : "Choose the most beautiful one!"}
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
