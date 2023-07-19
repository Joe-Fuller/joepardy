import { useEffect, useState } from "react";
import LargeAnswer from "./largeAnswer";

export default function AnswerTile({
  questionObject,
  adjustScore,
  incrementQuestionsAnswered,
  round,
  row,
  isDailyDouble,
  score,
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const value = row * round * 200;

  const hideAnswer = () => {
    setQuestionAnswered(true);
    setShowAnswer(false);
  };

  useEffect(() => {
    setQuestionAnswered(false);
  }, [questionObject]);

  return (
    <div
      className="w-40 h-24 bg-jeopardy-blue text-jeopardy-yellow text-center text-5xl flex items-center justify-center"
      onClick={() => {
        if (!questionAnswered) {
          setShowAnswer(true);
        }
      }}
    >
      <LargeAnswer
        answer={questionObject.answer}
        question={questionObject.question}
        clue_value={value}
        adjustScore={adjustScore}
        showAnswer={showAnswer}
        hideAnswer={hideAnswer}
        incrementQuestionsAnswered={incrementQuestionsAnswered}
        isDailyDouble={isDailyDouble}
        score={score}
        round={round}
      ></LargeAnswer>
      {questionAnswered ? "" : "$" + value}
    </div>
  );
}
