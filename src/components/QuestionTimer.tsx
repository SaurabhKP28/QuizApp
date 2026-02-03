"use client";

import { useEffect, useState } from "react";

interface QuestionTimerProps {
  onTimeUp: () => void;
  setTimePerQuestion: React.Dispatch<React.SetStateAction<number>>;
  isAnswered: boolean;
  resetTimer: number;
}

const QuestionTimer = ({
  onTimeUp,
  setTimePerQuestion,
  isAnswered,
  resetTimer,
}: QuestionTimerProps) => {
  const [seconds, setSeconds] = useState<number>(10);

  useEffect(() => {
    if (isAnswered) return;

    if (seconds === 0) {
      onTimeUp();
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
      setTimePerQuestion((prev) => prev + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, isAnswered, onTimeUp, setTimePerQuestion]);

  useEffect(() => {
    setSeconds(10);
  }, [resetTimer]);

  return (
    <div className="mt-3 text-lg font-semibold text-gray-700">
      Time Left:{" "}
      <span
        className={
          seconds <= 3
            ? "text-red-600 font-bold"
            : "text-blue-600"
        }
      >
        {seconds}s
      </span>
    </div>
  );
};

export default QuestionTimer;
