import { useEffect, useState, useRef } from "react";

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
  const [timerActive, setTimerActive] = useState(false); // Start timer as inactive
  const [isVisible, setIsVisible] = useState(false);
  const timerIdRef = useRef(null); // Reference to the timer ID

  useEffect(() => {
    setIsVisible(showAnswer);
  }, [showAnswer]);

  useEffect(() => {
    if (isVisible) {
      startTimer();
    } else {
      pauseTimer();
    }
  }, [isVisible]);

  useEffect(() => {
    if (timeRemaining === 0 && timerActive) {
      handleTimeOut();
    }
  }, [timeRemaining, timerActive]);

  const startTimer = () => {
    setTimerActive(true);
    setTimeRemaining(15);
    timerIdRef.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1);
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timerIdRef.current);
    setTimerActive(false);
  };

  const handleTimeOut = () => {
    adjustScore(-clue_value);
    setTimerActive(false);
  };

  const checkGuess = (guessToCheck) => {
    const wordsInGuess = guessToCheck.toLowerCase().trim().split(" ");
    if (["a", "an", "the"].includes(wordsInGuess[0])) {
      wordsInGuess.shift();
    }
    const formattedGuess = wordsInGuess.join("");

    const wordsInQuestion = question.toLowerCase().trim().split(" ");
    if (["a", "an", "the"].includes(wordsInQuestion[0])) {
      wordsInQuestion.shift();
    }
    const formattedQuestion = wordsInQuestion.join("");

    if (formattedGuess === formattedQuestion && timerActive) {
      adjustScore(clue_value);
      incrementQuestionsAnswered(1);
      hideAnswer();
      setIsVisible(false);
      pauseTimer();
    }
  };

  const dismissQuestion = () => {
    hideAnswer();
    setIsVisible(false);
  };

  const skipQuestion = () => {
    pauseTimer();
    handleTimeOut();
  };

  return isVisible ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center">
      {timerActive ? (
        <div className="bg-jeopardy-blue w-4/5 h-3/5 p-10 flex flex-col items-center justify-center text-7xl">
          {answer.replace(/\\/g, "")}
        </div>
      ) : (
        <div
          className="bg-jeopardy-blue w-4/5 h-3/5 p-10 flex flex-col items-center justify-center text-7xl"
          onClick={dismissQuestion}
        >
          {question.replace(/\\/g, "")}
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
        autoFocus
      />

      <p className="fixed bottom-32 right-20">
        {timerActive ? timeRemaining : ""}
      </p>
      {timerActive ? (
        <button
          className="fixed bottom-16 bg-jeopardy-blue p-2 rounded-lg"
          onClick={skipQuestion}
        >
          Skip
        </button>
      ) : null}
    </div>
  ) : null;
}
