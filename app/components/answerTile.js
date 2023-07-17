import { useState } from "react";
import LargeAnswer from "./largeAnswer";

export default function AnswerTile({ questionObject, adjustScore }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [questionAnswered, setQuestionAnswered] = useState(false);

  const hideAnswer = () => {
    setQuestionAnswered(true);
    setShowAnswer(false);
  };

  return (
    <div
      className="w-40 h-24 bg-blue-500 text-white text-center flex items-center justify-center"
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
          clue_value={questionObject.clue_value}
          adjustScore={adjustScore}
          hideAnswer={hideAnswer}
        ></LargeAnswer>
      ) : questionAnswered ? (
        ""
      ) : (
        questionObject.clue_value
      )}
    </div>
  );
}