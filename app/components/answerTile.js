export default function AnswerTile({ questionObject }) {
  return (
    <div className="w-40 h-24 bg-blue-500 text-white text-center flex items-center justify-center">
      {questionObject.clue_value}
    </div>
  );
}
