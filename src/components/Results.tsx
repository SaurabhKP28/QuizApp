"use client";

import { useEffect, useState } from "react";
import {
  FaTrophy,
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaPercentage,
  FaClock,
  FaStopwatch,
} from "react-icons/fa";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface ResultsProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unattemptedQuestions: number;
  percentage: number;
  timeSpent: number;
  averageTimePerQuestion: string;
}

const Results = ({
  score,
  totalQuestions,
  correctAnswers,
  wrongAnswers,
  unattemptedQuestions,
  percentage,
  timeSpent,
  averageTimePerQuestion,
}: ResultsProps) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {showConfetti && (
        <Confetti width={width} height={height} numberOfPieces={700} />
      )}

      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Quiz Results
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* Total Points */}
        <Card title="Total Points" value={score} valueClass="text-green-600">
          <FaTrophy className="text-yellow-500 text-3xl" />
        </Card>

        {/* Points Earned */}
        <Card
          title="Points Earned"
          value={correctAnswers * 4}
          valueClass="text-green-600"
        >
          <FaTrophy className="text-yellow-500 text-3xl" />
        </Card>

        {/* Correct Answers */}
        <Card
          title="Correct Answers"
          value={correctAnswers}
          valueClass="text-green-600"
        >
          <FaCheckCircle className="text-green-500 text-3xl" />
        </Card>

        {/* Wrong Answers */}
        <Card
          title="Wrong Answers"
          value={wrongAnswers}
          valueClass="text-red-600"
        >
          <FaTimesCircle className="text-red-500 text-3xl" />
        </Card>

        {/* Unattempted */}
        <Card
          title="Unattempted Questions"
          value={unattemptedQuestions}
          valueClass="text-yellow-600"
        >
          <FaQuestionCircle className="text-yellow-500 text-3xl" />
        </Card>

        {/* Percentage */}
        <Card
          title="Percentage"
          value={`${percentage}%`}
          valueClass="text-blue-600"
        >
          <FaPercentage className="text-blue-500 text-3xl" />
        </Card>

        {/* Time Spent */}
        <Card
          title="Total Time Spent"
          value={`${timeSpent.toFixed(2)}s`}
          valueClass="text-purple-600"
        >
          <FaClock className="text-purple-500 text-3xl" />
        </Card>

        {/* Avg Time */}
        <Card
          title="Avg Time / Question"
          value={`${averageTimePerQuestion}s`}
          valueClass="text-indigo-600"
        >
          <FaStopwatch className="text-indigo-500 text-3xl" />
        </Card>

        {/* Final Score */}
        <div className="p-5 bg-white shadow-md rounded-lg col-span-1 md:col-span-3 text-center">
  <p className="text-xl font-semibold text-gray-900 opacity-100">
    You scored{" "}
    <span className="text-green-600 font-bold">
      {correctAnswers * 4}
    </span>{" "}
    out of{" "}
    <span className="text-gray-900 font-bold">
      {totalQuestions * 4}
    </span>{" "}
    points!
  </p>
</div>

      </div>
    </div>
  );
};

/* ================= CARD COMPONENT ================= */

interface CardProps {
  title: string;
  value: string | number;
  valueClass: string;
  children: React.ReactNode;
}

const Card = ({ title, value, valueClass, children }: CardProps) => (
  <div className="p-5 bg-white shadow-md rounded-lg flex items-center justify-between hover:shadow-lg transition-shadow">
    <div>
      <p className="text-xl font-semibold text-gray-700">
        {title}
      </p>
      <p className={`text-lg font-bold ${valueClass}`}>
        {value}
      </p>
    </div>
    {children}
  </div>
);

export default Results;
