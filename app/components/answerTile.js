import { useEffect, useState } from "react";
import LargeAnswer from "./largeAnswer";

export default function AnswerTile({
  questionObject,
  adjustScore,
  incrementQuestionsAnswered,
  round,
  row,
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
      className="w-40 h-24 bg-jeopardy-blue text-white text-center text-5xl flex items-center justify-center"
      onClick={() => {
        if (!questionAnswered) {
          setShowAnswer(true);
        }
      }}
    >
      {showAnswer ? (
        <LargeAnswer
          answer={questionObject.answer}
          question={questionObject.question}
          clue_value={value}
          adjustScore={adjustScore}
          hideAnswer={hideAnswer}
          incrementQuestionsAnswered={incrementQuestionsAnswered}
        ></LargeAnswer>
      ) : questionAnswered ? (
        ""
      ) : (
        "$" + value
      )}
    </div>
  );
}
