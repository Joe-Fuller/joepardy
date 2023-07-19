import { useEffect, useState, useRef } from "react";

export default function LargeAnswer({
  answer,
  question,
  clue_value,
  adjustScore,
  showAnswer,
  hideAnswer,
  incrementQuestionsAnswered,
  isDailyDouble,
  score,
  round,
}) {
  const [guess, setGuess] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(15);
  const [timerActive, setTimerActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isGettingDailyDoubleAmount, setIsGettingDailyDoubleAmount] =
    useState(isDailyDouble);
  const [dailyDoubleBet, setDailyDoubleBet] = useState("");
  const timerIdRef = useRef(null);

  useEffect(() => {
    setIsVisible(showAnswer);
  }, [showAnswer]);

  useEffect(() => {
    if (isVisible && isDailyDouble) {
      setTimerActive(true);
      setIsGettingDailyDoubleAmount(true);
    } else if (isVisible) {
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
    adjustScore(isDailyDouble ? -dailyDoubleBet : -clue_value);
    incrementQuestionsAnswered(1);
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
      adjustScore(isDailyDouble ? dailyDoubleBet : clue_value);
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

  const handleChange = (e) => {
    if (isGettingDailyDoubleAmount) {
      setDailyDoubleBet(e.target.value);
    } else {
      setGuess(e.target.value);
      checkGuess(e.target.value);
    }
  };

  const submitDailyDoubleBet = () => {
    if (
      dailyDoubleBet !== "" &&
      0 <= dailyDoubleBet &&
      dailyDoubleBet <= Math.max(score, 1000 * round)
    ) {
      setIsGettingDailyDoubleAmount(false);
      startTimer();
    }
  };

  return isVisible ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center">
      {timerActive ? (
        <div className="bg-jeopardy-blue w-4/5 h-3/5 p-10 flex flex-col items-center justify-center text-7xl">
          <div className="mt-0 mb-auto text-center">
            {isDailyDouble ? "Daily Double" : ""}
          </div>
          <div className="flex items-center justify-center flex-grow">
            {isGettingDailyDoubleAmount
              ? `Enter your bet. You can bet up to $${Math.max(
                  score,
                  1000 * round
                ).toLocaleString("number")}`
              : answer.replace(/\\/g, "")}
          </div>
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
        placeholder={isGettingDailyDoubleAmount ? "Bet" : " Guess"}
        value={isGettingDailyDoubleAmount ? dailyDoubleBet || "" : guess}
        onChange={(e) => {
          handleChange(e);
        }}
        autoFocus
      />

      <p className="fixed bottom-32 right-20">
        {timerActive ? timeRemaining : ""}
      </p>
      {timerActive ? (
        <button
          className="fixed bottom-16 bg-jeopardy-blue p-2 rounded-lg"
          onClick={
            isGettingDailyDoubleAmount ? submitDailyDoubleBet : skipQuestion
          }
        >
          {isGettingDailyDoubleAmount ? "Bet" : "Skip"}
        </button>
      ) : null}
    </div>
  ) : null;
}
