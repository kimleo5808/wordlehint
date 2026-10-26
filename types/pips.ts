/** A board cell as [row, col]. */
export type PipsCell = [number, number];

export type PipsRegionType =
  | "sum" // dots in the region add up to `target`
  | "equals" // all the same number
  | "unequal" // all different numbers
  | "less" // region total < target
  | "greater" // region total > target
  | "empty"; // no condition

export interface PipsRegion {
  indices: PipsCell[];
  type: PipsRegionType;
  target?: number;
}

export interface PipsBoard {
  id: number;
  constructors: string;
  /** Each domino's two pip counts. */
  dominoes: [number, number][];
  regions: PipsRegion[];
  /** solution[i] = the two cells domino i covers, in the same order as its
   *  pip counts (dominoes[i][0] sits on solution[i][0]). */
  solution: [PipsCell, PipsCell][];
}

export type PipsDifficulty = "easy" | "medium" | "hard";

export interface PipsPuzzle {
  date: string; // YYYY-MM-DD
  id: number; // displayed puzzle number (days since 2025-08-18, +1)
  editor: string;
  easy: PipsBoard;
  medium: PipsBoard;
  hard: PipsBoard;
}

export interface PipsDataFile {
  lastUpdated: string;
  puzzles: PipsPuzzle[];
}
