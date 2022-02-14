import { createContext, FC, useState, useMemo, useEffect } from "react";
import { CellState } from "../Types/CellState";
import { GridCell } from "../Types/GridCell";
import { GridRow } from "../Types/GridRow";
import { WordScore } from "../Types/WordScore";
import { LetterFrequencies } from "../Utils/letterFrequencies";

interface Stats {
  possibleWords: WordScore[];
  possibleWordsCount: number;
  allWords: WordScore[];
  allWordsCount: number;
}

type GameContextType = {
  gameGrid: GridRow[];
  activeRow: number;
  stats: Stats;
  inactiveCharacters: string[];
  activeCharacters: { character: string; position: number }[];
  getCell: (row: number, column: number) => GridCell;
  setCell: (row: number, column: number) => void;
  setCellState: (row: number, column: number, newState: CellState) => void;
  confirmGuess: (word?: string) => void;
};

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameProvider: FC = ({ children }) => {
  const startingGrid: GridRow[] = useMemo(
    () => [
      {
        cells: [
          {
            active: true,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
        ],
        guessed: false,
      },
      {
        cells: [
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
        ],
        guessed: false,
      },
      {
        cells: [
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
        ],
        guessed: false,
      },
      {
        cells: [
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
        ],
        guessed: false,
      },
      {
        cells: [
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
        ],
        guessed: false,
      },
      {
        cells: [
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
          {
            active: false,
            state: CellState.BLANK,
          },
        ],
        guessed: false,
      },
    ],
    []
  );

  const [gameGrid, setGameGrid] = useState<GridRow[]>(startingGrid);
  const [currentGuess, setCurrentGuess] = useState("");
  const [activeRow, setActiveRow] = useState(0);
  const [inactiveCharacters, setInactiveCharacters] = useState<string[]>([]);
  const [activeCharacters, setActiveCharacters] = useState<
    { character: string; position: number }[]
  >([]);
  const [stats, setStats] = useState<Stats>({
    allWords: [],
    allWordsCount: 0,
    possibleWords: [],
    possibleWordsCount: 0,
  });

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.keyCode >= 65 && e.keyCode <= 90) {
        setCurrentGuess((prev) => {
          return `${prev}${e.key}`.slice(0, 5);
        });
      } else if (e.keyCode === 8) {
        setCurrentGuess((prev) => prev.slice(0, prev.length - 1));
      } else if (e.keyCode === 13) {
        // confirm guess
        confirmGuess();
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    fetch("wordscores.json")
      .then((response) => response.text())
      .then((data) => {
        const dat: WordScore[] = JSON.parse(data);
        setStats({
          allWords: dat,
          allWordsCount: dat.length,
          possibleWords: dat,
          possibleWordsCount: dat.length,
        });
      });
  }, []);

  useEffect(() => {
    const grid = gameGrid;
    if (activeRow !== -1) {
      let index = 0;
      const wordArray = currentGuess.split("");
      [0, 1, 2, 3, 4].forEach((char, i) => {
        grid[activeRow].cells[i].character = wordArray[i] ?? null;
        grid[activeRow].cells[i].active = false;
        index++;
      });
      if (index < 4) {
        grid[activeRow].cells[index].active = true;
      }
      setGameGrid([...grid]);
    }
  }, [currentGuess]);

  const confirmGuess = (word?: string) => {
    let toTest = word ?? currentGuess;
    const grid = gameGrid;
    if (word) {
      word.split("").forEach((char, i) => {
        grid[activeRow].cells[i].character = char;
      });
    } else {
      toTest = grid[activeRow].cells.map((el) => el.character).join("");
    }
    if (toTest && toTest.length === 5) {
      grid[activeRow].guessed = true;
      setGameGrid([...grid]);
      setActiveRow((prev) => (prev += 1));
      toTest.split("").forEach((character) => {
        setInactiveCharacters((prev) => {
          const i = prev.findIndex((e) => e === character.toUpperCase());
          const inActive = activeCharacters.some(
            (el) => el.character === character.toUpperCase()
          );
          if (i === -1 && !inActive) {
            prev.push(character.toUpperCase());
          }
          return [...prev];
        });
      });
    }
  };

  const getCell = (row: number, column: number): GridCell =>
    gameGrid[row].cells[column];

  const setCell = (row: number, column: number) => {
    setGameGrid((prev) => {
      prev[row].cells[column].active = false;
      if (column < 4) {
        prev[row].cells[column + 1].active = true;
      }
      return [...prev];
    });
  };

  const setCellState = (row: number, column: number, newState: CellState) => {
    let character = gameGrid[row].cells[column].character?.toUpperCase() ?? "";
    let position = newState === CellState.GREEN ? column : -1;

    setGameGrid((prev) => {
      prev[row].cells[column].state = newState;
      return [...prev];
    });

    // Add character to active/inactive state

    if (newState === CellState.BLANK) {
      setInactiveCharacters((prev) => {
        const i = prev.findIndex((e) => e === character);
        if (i === -1) {
          prev.push(character.toUpperCase());
        }
        return [...prev];
      });
      setActiveCharacters((prev) => {
        const index = prev.findIndex(
          (el) => el.position === column && el.character === character
        );
        if (index !== -1) {
          prev.splice(index);
        }
        return [...prev];
      });
    }

    if (newState === CellState.YELLOW) {
      setInactiveCharacters((prev) => prev.filter((ind) => ind !== character));
      const previous = activeCharacters;
      const index = previous.findIndex(
        (el) => el.character === character && el.position === -1
      );
      if (index === -1) {
        setActiveCharacters((prev) => [...prev, { character, position }]);
      }
    }

    if (newState === CellState.GREEN) {
      setInactiveCharacters((prev) => prev.filter((ind) => ind !== character));
      const previous = activeCharacters;
      const previousIndex = previous.findIndex(
        (el) => el.character === character && el.position === -1
      );
      const alreadyExistsInArray =
        previous.findIndex(
          (el) => el.character === character && el.position === position
        ) > -1;
      if (!alreadyExistsInArray) {
        if (previousIndex !== -1) {
          previous[previousIndex].position = position;
        } else {
          previous.push({ character, position });
        }
        setActiveCharacters([...previous]);
      } else {
        const deleteIndex = previous.findIndex(
          (el) => el.character === character && position === -1
        );
        previous.splice(deleteIndex);
        setActiveCharacters(previous);
      }
    }
  };

  useEffect(() => {
    setCurrentGuess("");
  }, [activeRow]);

  useEffect(() => {
    const possibles = stats.allWords;
    // Get rid of inactive chars
    const res = possibles.filter((possibleWord) => {
      let split = possibleWord.word.split("");

      split = split.map((el) => el.toUpperCase());
      let containsNoInactiveChars = true;
      let containsPossibleChars = true;
      let containsPossibleCharsAtIndex = true;
      activeCharacters.forEach((active) => {
        if (active.position === -1) {
          // just make sure letter exists in word
          if (!split.includes(active.character)) {
            containsPossibleChars = false;
          }
        } else {
          if (split[active.position].toUpperCase() !== active.character) {
            containsPossibleCharsAtIndex = false;
          }
        }
      });
      containsNoInactiveChars = !split.some((e) =>
        inactiveCharacters.includes(e.toUpperCase())
      );
      return (
        containsNoInactiveChars &&
        containsPossibleChars &&
        containsPossibleCharsAtIndex
      );
    });
    setStats((prev) => ({
      possibleWords: res,
      possibleWordsCount: res.length,
      allWordsCount: prev.allWordsCount,
      allWords: prev.allWords,
    }));
  }, [inactiveCharacters, activeCharacters]);

  return (
    <GameContext.Provider
      value={{
        gameGrid,
        activeRow,
        stats,
        inactiveCharacters,
        activeCharacters,
        getCell,
        setCell,
        setCellState,
        confirmGuess,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
