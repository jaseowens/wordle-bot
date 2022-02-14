import { FC } from "react";
import { useGame } from "../Hooks/useGame";
import { CellState } from "../Types/CellState";

interface CellProps {
  row: number;
  column: number;
}

export const Cell: FC<CellProps> = ({ row, column }) => {
  const { getCell, activeRow, setCellState } = useGame()!;
  const cell = getCell(row, column);
  const isPreviousRow = row < activeRow;
  const isEditableRow = row === activeRow - 1;
  const isRowActive = activeRow === row;

  const getStatusColor = () => {
    if (cell.state === CellState.GREEN) return "bg-green-400 ";
    if (cell.state === CellState.YELLOW) return "bg-yellow-400 ";
    return "bg-stone-400 ";
  };

  const handleToggleCellState = () => {
    if (!isEditableRow) return;
    let newState: CellState = CellState.BLANK;
    if (cell.state === CellState.BLANK) newState = CellState.YELLOW;
    if (cell.state === CellState.YELLOW) newState = CellState.GREEN;
    if (cell.state === CellState.GREEN) newState = CellState.BLANK;
    setCellState(row, column, newState);
  };

  const getClasses = () => {
    let classes: string =
      "text-3xl border-4 rounded h-16 w-16 text-center flex flex-wrap justify-center content-center hover:cursor-pointer ";
    if (isPreviousRow && !isRowActive) {
      classes += getStatusColor();
    }
    if (!isPreviousRow) {
      isRowActive
        ? (classes += "border-slate-400 ")
        : (classes += "border-slate-200 ");
    }
    return classes;
  };

  return (
    <div onClick={() => handleToggleCellState()} className={getClasses()}>
      {cell.character?.toUpperCase()}
    </div>
  );
};
