import { cache } from "react";
import { getTodayDateString } from "@/lib/wordle-daily";
import { RANK_LADDER, scoreWord } from "@/lib/spelling-bee-scoring";
import type {
  ScoredWord,
  SpellingBeeDataFile,
  SpellingBeePuzzle,
  SpellingBeeRank,
  SpellingBeeScoring,
} from "@/types/spelling-bee";

const loadData = cache((): SpellingBeeDataFile => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@/data/spelling-bee-daily.json") as SpellingBeeDataFile;
});

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export function getAllSpellingBee(): SpellingBeePuzzle[] {
  return loadData().puzzles;
}

export function getSpellingBeeByDate(
  date: string
): SpellingBeePuzzle | undefined {
  return loadData().puzzles.find((p) => p.date === date);
}

export function getTodaySpellingBee(): SpellingBeePuzzle | undefined {
  return getSpellingBeeByDate(getTodayDateString());
}

export function getYesterdaySpellingBee(): SpellingBeePuzzle | undefined {
  const today = getTodayDateString();
  const before = loadData().puzzles.filter((p) => p.date < today);
  return before[before.length - 1];
}

/** Most recent `count` puzzles up to and including today, newest first. */
export function getRecentSpellingBee(count: number): SpellingBeePuzzle[] {
  const today = getTodayDateString();
  const upToToday = loadData().puzzles.filter((p) => p.date <= today);
  return upToToday.slice(-count).reverse();
}

export function getSpellingBeeCount(): number {
  return loadData().puzzles.length;
}

/** All puzzles before today (today excluded to avoid spoilers), newest first. */
export const getArchiveSpellingBee = cache((): SpellingBeePuzzle[] => {
  const today = getTodayDateString();
  return loadData()
    .puzzles.filter((p) => p.date < today)
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1));
});

/* ------------------------------------------------------------------ */
/*  Scoring (pure helpers live in lib/spelling-bee-scoring.ts so the   */
/*  client game bundle can use them without pulling in the data JSON)  */
/* ------------------------------------------------------------------ */

export { RANK_LADDER, scoreWord };

export function getSpellingBeeScoring(
  puzzle: SpellingBeePuzzle
): SpellingBeeScoring {
  const pangramSet = new Set(puzzle.pangrams);
  const words: ScoredWord[] = puzzle.answers.map((word) => ({
    word,
    isPangram: pangramSet.has(word),
    points: scoreWord(word, pangramSet.has(word)),
  }));

  const byLength = new Map<number, ScoredWord[]>();
  for (const w of words) {
    const group = byLength.get(w.word.length) ?? [];
    group.push(w);
    byLength.set(w.word.length, group);
  }
  const sortedByLength = new Map(
    [...byLength.entries()].sort((a, b) => b[0] - a[0])
  );

  const totalPoints = words.reduce((sum, w) => sum + w.points, 0);
  const ranks: SpellingBeeRank[] = RANK_LADDER.map((r) => ({
    ...r,
    minScore: Math.round((totalPoints * r.percent) / 100),
  }));

  const firstLetters = new Set(words.map((w) => w.word[0]));
  const allLetters = [puzzle.centerLetter, ...puzzle.outerLetters];

  return {
    words,
    byLength: sortedByLength,
    totalWords: words.length,
    totalPoints,
    geniusScore: ranks.find((r) => r.name === "Genius")!.minScore,
    ranks,
    isBingo: allLetters.every((l) => firstLetters.has(l)),
  };
}

/* ------------------------------------------------------------------ */
/*  Stats                                                              */
/* ------------------------------------------------------------------ */

export interface SpellingBeeStats {
  total: number;
  firstDate: string;
  lastDate: string;
  facts: string[];
}

export const getSpellingBeeStats = cache((): SpellingBeeStats => {
  const puzzles = loadData().puzzles;
  const total = puzzles.length;
  const dates = puzzles.map((p) => p.date).sort();

  let multiPangram = 0;
  let bingoCount = 0;
  for (const p of puzzles) {
    if (p.pangrams.length > 1) multiPangram++;
    if (getSpellingBeeScoring(p).isBingo) bingoCount++;
  }

  const facts = [
    `Our archive covers ${total} NYT Spelling Bee puzzles.`,
    `${multiPangram} of them had more than one pangram.`,
    `${bingoCount} puzzles were a "bingo" — every letter started at least one word.`,
  ];

  return {
    total,
    firstDate: dates[0],
    lastDate: dates[dates.length - 1],
    facts,
  };
});
