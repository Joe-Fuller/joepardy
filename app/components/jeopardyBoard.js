import React, { useState, useEffect } from "react";
import AnswerTile from "./answerTile";

export default function JeopardyBoard({
  questions,
  adjustScore,
  incrementQuestionsAnswered,
  round,
}) {
  const [dailyDoubleSquares, setDailyDoubleSquares] = useState(null);

  useEffect(() => {
    setDailyDoubleSquares(getDailyDoubleSquares());
  }, []);

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getDailyDoubleSquares = () => {
    const pairs = [];
    for (let i = 1; i <= 5; i++) {
      for (let j = 1; j <= 6; j++) {
        pairs.push([i, j]);
      }
    }

    const index1 = getRandomNumber(0, pairs.length - 1);
    let index2 = getRandomNumber(0, pairs.length - 1);

    // Ensure index2 is different from index1
    while (index2 === index1) {
      index2 = getRandomNumber(0, pairs.length - 1);
    }

    const pair1 = pairs[index1];
    const pair2 = pairs[index2];

    console.log(pair1, pair2);

    return [pair1, pair2];
  };

  function isPairInArray(pairToCheck, arrayOfPairs) {
    return arrayOfPairs.some(
      (pair) => pair[0] === pairToCheck[0] && pair[1] === pairToCheck[1]
    );
  }

  return (
    <div className="grid grid-cols-6 gap-4 p-4">
      {Array.from({ length: 6 }, (_, colIndex) => (
        <div className="grid grid-rows-6 gap-4 p-4" key={colIndex}>
          {Array.from({ length: 6 }, (_, rowIndex) => {
            if (questions.length === 0) {
              // If questions is empty, return a placeholder or loading state
              return (
                <div
                  className="w-40 h-24 bg-jeopardy-blue text-jeopardy-yellow flex items-center justify-center text-3xl"
                  key={rowIndex}
                >
                  Loading...
                </div>
              );
            } else {
              // Otherwise, check if it's the first row (category) or other rows (clue_value)
              return (
                <div
                  className="w-40 h-24 bg-jeopardy-blue text-center flex items-center justify-center"
                  key={String(colIndex) + rowIndex}
                >
                  {rowIndex === 0 ? (
                    <p className="flex items-center justify-center text-3xl min-w-min min-h-min">
                      {questions[colIndex][0].category.replace(/\\/g, "")}
                    </p>
                  ) : (
                    <AnswerTile
                      questionObject={questions[colIndex][rowIndex - 1]}
                      row={rowIndex}
                      adjustScore={adjustScore}
                      incrementQuestionsAnswered={incrementQuestionsAnswered}
                      round={round}
                      isDailyDouble={isPairInArray(
                        [rowIndex, colIndex + 1],
                        dailyDoubleSquares
                      )}
                    ></AnswerTile>
                  )}
                </div>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
}
