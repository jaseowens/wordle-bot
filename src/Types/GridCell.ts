import { CellState } from "./CellState";

export interface GridCell {
  character?: string;
  state: CellState;
  active: boolean;
}
