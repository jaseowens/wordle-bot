import { FC } from "react";
import { useGame } from "../Hooks/useGame";
import { WordScore } from "../Types/WordScore";
import { classNames } from "../Utils/classNames";

interface PossibleWordData {
  word: string;
  percentage: number;
}

export const PossibleWords: FC = () => {
  const startingWords: PossibleWordData[] = [
    { word: "First", percentage: 99.9 },
    { word: "Secon", percentage: 98 },
    { word: "Third", percentage: 78 },
    { word: "Fourth", percentage: 70 },
    { word: "Fifth", percentage: 50 },
    { word: "Sixth", percentage: 20 },
  ];

  const { confirmGuess, stats, inactiveCharacters, activeCharacters } =
    useGame()!;

  const SuggestedWord = (suggestion: WordScore, index: number) => (
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
        <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {suggestion.score}
        </span>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-white shadow sm:rounded-lg overflow-scroll max-h-128">
        <div className="px-4 py-5 sm:px-6 sticky top-0 bg-white">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Possible Words - {stats.possibleWordsCount.toLocaleString()}
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>{stats.possibleWords.slice(0, 50).map(SuggestedWord)}</dl>
        </div>
      </div>
    </>
  );
};
