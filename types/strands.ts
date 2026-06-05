export interface StrandsPuzzle {
  date: string; // YYYY-MM-DD
  id: number; // displayed puzzle number (days since 2024-03-04, +1)
  editor: string;
  clue: string; // in-game theme clue, e.g. "With this ring ..."
  spangram: string; // the spanning word, e.g. "TYINGTHEKNOT"
  themeWords: string[]; // theme words to find
  board: string[]; // 8 rows of 6 letters
}

export interface StrandsDataFile {
  lastUpdated: string;
  puzzles: StrandsPuzzle[];
}
