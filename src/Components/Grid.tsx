import { FC } from "react";
import { Cell } from "./Cell";

export const Grid: FC = () => {
  const row = [0, 1, 2, 3, 4];
  const grid = [row, row, row, row, row, row];

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-5 gap-2 max-w-sm content-start">
        {grid.map((row, y) =>
          row.map((cell, x) => <Cell key={`${y}-${x}`} row={y} column={x} />)
        )}
      </div>
    </div>
  );
};
