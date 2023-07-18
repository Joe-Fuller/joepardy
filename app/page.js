"use client";

import getQuestions from "@/utils/getQuestions";
import JeopardyBoard from "./components/jeopardyBoard";
import { useState, useEffect } from "react";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  useEffect(() => {
    resetQuestions();
  }, []);

  const adjustScore = (adjustment) => {
    setScore(score + parseInt(adjustment));
  };

  const resetQuestions = () => {
    getQuestions().then((data) => {
      setQuestions(data);
    });
  };

  const incrementQuestionsAnswered = () => {
    setQuestionsAnswered(questionsAnswered + 1);
    if ((questionsAnswered + 1) % 30 === 0) {
      resetQuestions();
    }
  };

  return (
    <main>
      <JeopardyBoard
        questions={questions}
        adjustScore={adjustScore}
        incrementQuestionsAnswered={incrementQuestionsAnswered}
      ></JeopardyBoard>

      <p className="mx-20 my-20 text-3xl">Score: {score}</p>
    </main>
  );
}
