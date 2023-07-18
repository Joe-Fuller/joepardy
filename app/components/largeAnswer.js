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
  const [secondTimeRemaining, setSecondTimeRemaining] = useState(5);
  const [secondTimerActive, setSecondTimerActive] = useState(false);

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    if (!timerActive && secondTimerActive) {
      startSecondTimer();
    }
  }, [timerActive, timeRemaining, secondTimerActive]);

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
    setSecondTimerActive(true);
  };

  const startSecondTimer = () => {
    setSecondTimerActive(true);

    const secondTimerId = setInterval(() => {
      setSecondTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(secondTimerId);
      setSecondTimerActive(false);
      handleSecondTimeOut();
    }, 5000);
  };

  const handleSecondTimeOut = () => {
    incrementQuestionsAnswered(1);
    hideAnswer();
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

      <p className="fixed bottom-32 right-20">
        {timerActive ? timeRemaining : secondTimeRemaining}
      </p>
    </div>
  );
}
