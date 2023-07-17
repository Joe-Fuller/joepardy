import React from "react";

export default function JeopardyBoard({ questions }) {
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
                  className="w-40 h-24 bg-blue-500 text-white flex items-center justify-center"
                  key={rowIndex}
                >
                  Loading...
                </div>
              );
            } else {
              // Otherwise, check if it's the first row (category) or other rows (clue_value)
              return (
                <div
                  className="w-40 h-24 bg-blue-500 text-white flex items-center justify-center"
                  key={colIndex}
                >
                  {rowIndex === 0
                    ? questions[colIndex][0].category
                    : questions[colIndex][rowIndex - 1].clue_value}
                </div>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
}
