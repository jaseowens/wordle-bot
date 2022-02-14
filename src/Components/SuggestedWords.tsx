import { FC } from "react";
import { useGame } from "../Hooks/useGame";
import { classNames } from "../Utils/classNames";

interface SuggestedWordData {
  word: string;
  percentage: number;
}

export const SuggestedWords: FC = () => {
  const startingWords: SuggestedWordData[] = [
    { word: "First", percentage: 99.9 },
    { word: "Secon", percentage: 98 },
    { word: "Third", percentage: 78 },
    { word: "Fourth", percentage: 70 },
    { word: "Fifth", percentage: 50 },
    { word: "Sixth", percentage: 20 },
  ];

  const { confirmGuess } = useGame()!;

  const SuggestedWord = (suggestion: SuggestedWordData, index: number) => (
    <div
      key={index}
      className={classNames(
        index % 2 === 0 ? "bg-gray-50" : "",
        "px-4 py-5 cursor-pointer"
      )}
      onClick={() => {
        confirmGuess(suggestion.word);
      }}
    >
      <div className="flex justify-between">
        <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {suggestion.word}
        </span>
        <span className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
          {suggestion.percentage}%
        </span>
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Suggested Words
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>{startingWords.map(SuggestedWord)}</dl>
      </div>
    </div>
  );
};
