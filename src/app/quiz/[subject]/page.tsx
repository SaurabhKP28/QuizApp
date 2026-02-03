"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { usePoints } from "@/context/PointsContext";
import QuestionTimer from "@/components/QuestionTimer";
import Results from "@/components/Results";

/* ================= TYPES ================= */

interface Question {
  question: string;
  options: string[];
  answer: string;
}

/* ================= COMPONENT ================= */

const Quiz = () => {
  const params = useParams<{ subject: string }>();
  const subject = params.subject;

  const { points, setPoints } = usePoints();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [unattemptedQuestions, setUnattemptedQuestions] = useState<number>(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0);
  const [timePerQuestion, setTimePerQuestion] = useState<number>(0);

  /* ================= FETCH QUESTIONS ================= */

  useEffect(() => {
    if (!subject) return;

    const fetchQuestions = async () => {
      const response = await fetch("/data/questions.json");
      if (!response.ok) return;

      const data = await response.json();
      const subjectData = data.subjects.find(
        (s: { name: string }) =>
          s.name.toLowerCase() === subject
      );

      setQuestions(subjectData?.questions ?? []);
    };

    fetchQuestions();
  }, [subject]);

  /* ================= HANDLERS ================= */

  const handleAnswer = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);
    setTotalTimeSpent((prev) => prev + timePerQuestion);

    if (option === questions[currentQuestionIndex].answer) {
      setPoints((prev) => prev + 4);
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimePerQuestion(0);
    } else {
      setShowResults(true);
    }
  };

  const handleTimeUp = () => {
    if (isAnswered) return;

    setIsAnswered(true);
    setUnattemptedQuestions((prev) => prev + 1);
    setTotalTimeSpent((prev) => prev + 10);
    handleNext();
  };

  /* ================= CALCULATIONS ================= */

  const percentage =
    questions.length === 0
      ? 0
      : Math.round((correctAnswers / questions.length) * 100);

  const averageTimePerQuestion =
    questions.length === 0
      ? "0"
      : (totalTimeSpent / questions.length).toFixed(2);

  /* ================= RENDER ================= */

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {!showResults ? (
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6 relative">
          {/* Progress Bar */}
          <div
            className="absolute top-0 left-0 h-2 bg-blue-500 transition-all"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
            }}
          />

          <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>

          <h3 className="text-xl font-bold text-center mb-6 p-4 bg-blue-500 text-white rounded-lg">
            {questions[currentQuestionIndex]?.question}
          </h3>

          {/* Timer */}
          <QuestionTimer
            onTimeUp={handleTimeUp}
            setTimePerQuestion={setTimePerQuestion}
            isAnswered={isAnswered}
            resetTimer={currentQuestionIndex}
          />

          {/* Options */}
          <div className="mt-6 space-y-4">
            {questions[currentQuestionIndex]?.options.map((option) => (
              <button
                key={option}
                disabled={isAnswered}
                onClick={() => handleAnswer(option)}
                className={`w-full py-4 px-6 rounded-lg text-lg font-semibold transition ${
                  isAnswered &&
                  option === questions[currentQuestionIndex].answer
                    ? "bg-green-500 text-white"
                    : isAnswered && option === selectedOption
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                } ${isAnswered ? "cursor-not-allowed opacity-90" : ""}`}
              >
                {option}
              </button>
            ))}
          </div>

          {isAnswered && (
            <button
              onClick={handleNext}
              className="mt-8 w-full py-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              {currentQuestionIndex === questions.length - 1
                ? "Submit"
                : "Next Question"}
            </button>
          )}
        </div>
      ) : (
        <Results
          score={points}
          totalQuestions={questions.length}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          unattemptedQuestions={unattemptedQuestions}
          percentage={percentage}
          timeSpent={totalTimeSpent}
          averageTimePerQuestion={averageTimePerQuestion}
        />
      )}
    </div>
  );
};

export default Quiz;
