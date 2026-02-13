export interface DailyPuzzle {
  date: string; // YYYY-MM-DD
  id: number; // NYT puzzle ID
  answer: string; // 5 uppercase letters
  editor?: string; // NYT editor name
}

export interface DailyDataFile {
  lastUpdated: string;
  puzzles: DailyPuzzle[];
}
