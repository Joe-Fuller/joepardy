"use client";

import getQuestions from "@/utils/getQuestions";
import JeopardyBoard from "./components/jeopardyBoard";

export default function Home() {
  getQuestions();

  return (
    <main>
      <JeopardyBoard></JeopardyBoard>
    </main>
  );
}
