import { GridCell } from "./GridCell";

export interface GridRow {
  cells: GridCell[];
  guessed: boolean;
}
