export interface SpellingBeePuzzle {
  date: string; // YYYY-MM-DD (NYT print_date)
  id: number; // NYT internal puzzle id
  centerLetter: string; // lowercase, e.g. "i"
  outerLetters: string[]; // 6 lowercase letters
  pangrams: string[]; // lowercase, also included in answers
  answers: string[]; // ALL valid words including pangrams, lowercase, sorted
  editor: string;
}

export interface SpellingBeeDataFile {
  lastUpdated: string;
  puzzles: SpellingBeePuzzle[];
}

export interface ScoredWord {
  word: string;
  points: number;
  isPangram: boolean;
}

export interface SpellingBeeRank {
  name: string;
  percent: number; // of max score, 0–100
  minScore: number; // computed per-puzzle
}

export interface SpellingBeeScoring {
  words: ScoredWord[]; // sorted A→Z
  byLength: Map<number, ScoredWord[]>; // key = word length, longest first
  totalWords: number;
  totalPoints: number;
  geniusScore: number;
  ranks: SpellingBeeRank[]; // Beginner → Queen Bee
  isBingo: boolean; // every puzzle letter starts at least one word
}
