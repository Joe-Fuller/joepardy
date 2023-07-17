import { useState } from "react";

export default function AnswerTile({ questionObject }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div
      className="w-40 h-24 bg-blue-500 text-white text-center flex items-center justify-center"
      onClick={() => {
        setShowAnswer(!showAnswer);
      }}
    >
      {showAnswer ? questionObject.answer : questionObject.clue_value}
    </div>
  );
}
