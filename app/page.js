"use client";

import getQuestions from "@/utils/getQuestions";
import JeopardyBoard from "./components/jeopardyBoard";
import { useState, useEffect } from "react";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [round, setRound] = useState(0);

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
    incrementRound();
  };

  const incrementQuestionsAnswered = () => {
    console.log(questionsAnswered);
    setQuestionsAnswered(questionsAnswered + 1);
    if ((questionsAnswered + 1) % 30 === 0) {
      resetQuestions();
    }
  };

  const incrementRound = () => {
    setRound(round + 1);
  };

  return (
    <main className="font-jeopardy">
      <JeopardyBoard
        questions={questions}
        adjustScore={adjustScore}
        incrementQuestionsAnswered={incrementQuestionsAnswered}
        round={round}
      ></JeopardyBoard>

      <p className="mx-20 my-20 text-5xl">Score: {score}</p>
    </main>
  );
}
