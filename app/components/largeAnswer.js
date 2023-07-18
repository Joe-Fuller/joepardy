import { useEffect, useState } from "react";

export default function LargeAnswer({
  answer,
  question,
  clue_value,
  adjustScore,
  showAnswer,
  hideAnswer,
  incrementQuestionsAnswered,
}) {
  const [guess, setGuess] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(15);
  const [timerActive, setTimerActive] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      startTimer();
    }
  }, [isVisible]);

  useEffect(() => {
    setIsVisible(showAnswer);
  }, [showAnswer]);

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
      adjustScore(2 * clue_value);
      incrementQuestionsAnswered(1);
      hideAnswer();
    }
  };

  const dismissQuestion = () => {
    hideAnswer();
    setIsVisible(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      checkGuess();
    }
  };

  return isVisible ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center">
      {timerActive ? (
        <div className="bg-jeopardy-blue w-4/5 h-3/5 p-10 flex flex-col items-center justify-center text-7xl">
          {answer}
        </div>
      ) : (
        <div
          className="bg-jeopardy-blue w-4/5 h-3/5 p-10 flex flex-col items-center justify-center text-7xl"
          onClick={dismissQuestion}
        >
          {question}
        </div>
      )}
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
        {timerActive ? timeRemaining : ""}
      </p>
    </div>
  ) : null;
}
