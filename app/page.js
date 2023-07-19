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
    setScore((prevScore) => prevScore + parseInt(adjustment));
  };

  const resetQuestions = () => {
    getQuestions().then((data) => {
      setQuestions(data);
    });
    incrementRound();
  };

  const incrementQuestionsAnswered = () => {
    setQuestionsAnswered(questionsAnswered + 1);
    if ((questionsAnswered + 1) % 30 === 0) {
      resetQuestions();
    }
  };

  const incrementRound = () => {
    setRound(round + 1);
  };

  const formatScore = () => {
    let scoreString = "";
    if (score < 0) {
      scoreString += "-";
    }
    scoreString += "$";
    scoreString += Math.abs(score).toLocaleString();

    return scoreString;
  };

  return (
    <main className="font-jeopardy">
      <JeopardyBoard
        questions={questions}
        adjustScore={adjustScore}
        incrementQuestionsAnswered={incrementQuestionsAnswered}
        round={round}
      ></JeopardyBoard>

      <div className="flex items-center mx-20 my-20 text-5xl">
        <p>Score: </p>
        <p className={`${score < 0 ? "text-jeopardy-red" : "text-white"} ml-4`}>
          {formatScore()}
        </p>
      </div>
    </main>
  );
}
