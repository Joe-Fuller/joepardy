"use client";

import getQuestions from "@/utils/getQuestions";
import JeopardyBoard from "./components/jeopardyBoard";
import { useState, useEffect } from "react";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    getQuestions().then((data) => {
      setQuestions(data);
    });
  }, []);

  return (
    <main>
      <JeopardyBoard questions={questions}></JeopardyBoard>
    </main>
  );
}
