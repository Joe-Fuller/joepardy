import React from "react";
import AnswerTile from "./answerTile";

export default function JeopardyBoard({
  questions,
  adjustScore,
  incrementQuestionsAnswered,
}) {
  console.log("Jeopardy Board Questions: ", questions);
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
                  className="w-40 h-24 bg-jeopardy-blue text-jeopardy-yellow text-center flex items-center justify-center text-3xl p-4"
                  key={String(colIndex) + rowIndex}
                >
                  {rowIndex === 0 ? (
                    questions[colIndex][0].category
                  ) : (
                    <AnswerTile
                      questionObject={questions[colIndex][rowIndex - 1]}
                      adjustScore={adjustScore}
                      incrementQuestionsAnswered={incrementQuestionsAnswered}
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
