import { useEffect, useState } from "react";

export default function LargeAnswer({
  answer,
  question,
  clue_value,
  adjustScore,
  hideAnswer,
  incrementQuestionsAnswered,
}) {
  const [guess, setGuess] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(15);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    startTimer();
  }, []);

  const startTimer = () => {
    setTimerActive(true);

    const timerId = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timerId);
      setTimerActive(false);
      handleTimeOut();
    }, 15000);
  };

  const handleTimeOut = () => {
    adjustScore(-clue_value);
  };

  const checkGuess = (guessToCheck) => {
    if (
      guessToCheck.toLowerCase().trim() === question.toLowerCase().trim() &&
      timerActive
    ) {
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

  const handleClick = () => {
    incrementQuestionsAnswered(1);
    hideAnswer();
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center">
      <div className="bg-jeopardy-blue w-4/5 h-3/5 p-10 flex flex-col items-center justify-center text-7xl">
        {timerActive ? answer : question}
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
      {timerActive ? (
        <p className="fixed bottom-32 right-20">{timeRemaining}</p>
      ) : (
        <button
          className="fixed bottom-20 bg-jeopardy-blue rounded-md p-4"
          onClick={handleClick}
        >
          Okay
        </button>
      )}
    </div>
  );
}
