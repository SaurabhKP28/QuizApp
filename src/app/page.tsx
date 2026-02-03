"use client";

import { useEffect, useState } from "react";
import SubjectCard from "@/components/SubjectCard";

/* ================= TYPES ================= */

interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface Subject {
  name: string;
  image: string;
  questions: Question[];
}

/* ================= COMPONENT ================= */

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await fetch("/data/questions.json");
      if (!response.ok) return;

      const data = await response.json();
      setSubjects(data.subjects as Subject[]);
    };

    fetchSubjects();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Welcome to the Quiz App
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        Select a subject to get started and test your knowledge!
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
        {subjects.length > 0 ? (
          subjects.map((subject) => (
            <SubjectCard
              key={subject.name}
              subject={subject}
            />
          ))
        ) : (
          <p className="text-lg text-center text-gray-500 animate-pulse">
            Loading subjects...
          </p>
        )}
      </div>
    </div>
  );
}
