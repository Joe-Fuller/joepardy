import { useState } from "react";

export default function LargeAnswer({ answer, question }) {
  const [guess, setGuess] = useState("");

  const checkGuess = () => {
    console.log(guess);
    console.log(question);
    if (guess === question) {
      console.log("CORRRRRRECT!!");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      checkGuess();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center">
      <div className="bg-blue-700 w-4/5 h-3/5 p-40 flex flex-col items-center justify-center text-5xl">
        {answer}
      </div>
      <input
        className="mt-4 px-4 py-2 rounded-md border border-gray-400 focus:outline-none text-black"
        type="text"
        placeholder="Guess"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
