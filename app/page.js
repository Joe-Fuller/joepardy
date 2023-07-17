"use client";

import getQuestions from "@/utils/getQuestions";
import JeopardyBoard from "./components/jeopardyBoard";
import { useState, useEffect } from "react";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    getQuestions().then((data) => {
      setQuestions(data);
    });
  }, []);

  const adjustScore = (adjustment) => {
    setScore(score + parseInt(adjustment));
  };

  return (
    <main>
      <JeopardyBoard
        questions={questions}
        adjustScore={adjustScore}
      ></JeopardyBoard>

      <p className="mx-20 my-20 text-3xl">Score: {score}</p>
    </main>
  );
}
