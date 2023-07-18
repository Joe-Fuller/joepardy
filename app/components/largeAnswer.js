import { useState } from "react";

export default function LargeAnswer({
  answer,
  question,
  clue_value,
  adjustScore,
  hideAnswer,
  incrementQuestionsAnswered,
}) {
  const [guess, setGuess] = useState("");

  const checkGuess = (guessToCheck) => {
    console.log(guessToCheck);
    console.log(question);
    if (guessToCheck.toLowerCase().trim() === question.toLowerCase().trim()) {
      adjustScore(clue_value);
      incrementQuestionsAnswered(1);
      hideAnswer();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      checkGuess();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center">
      <div className="bg-jeopardy-blue w-4/5 h-3/5 p-40 flex flex-col items-center justify-center text-7xl">
        {answer}
      </div>
      <input
        className="mt-4 px-4 py-2 rounded-md border border-gray-400 focus:outline-none text-black"
        type="text"
        placeholder="Guess"
        value={guess}
        onChange={(e) => {
          setGuess(e.target.value);
          checkGuess(e.target.value);
        }}
        // onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  );
}
