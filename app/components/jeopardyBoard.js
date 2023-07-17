import React from "react";

export default function JeopardyBoard() {
  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {Array.from({ length: 5 }, (_, rowIndex) => (
        <div className="grid grid-rows-6 gap-4 p-4" key={rowIndex}>
          {Array.from({ length: 6 }, (_, colIndex) => (
            <div
              className="w-40 h-24 bg-blue-500 text-white flex items-center justify-center text-lg font-bold"
              key={colIndex}
            >
              Answer Here
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
