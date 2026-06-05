export interface DailyPuzzle {
  date: string; // YYYY-MM-DD
  id: number; // Wordle puzzle number (NYT API `days_since_launch`)
  answer: string; // 5 uppercase letters
  editor?: string; // NYT editor name
}

export interface DailyDataFile {
  lastUpdated: string;
  puzzles: DailyPuzzle[];
}
