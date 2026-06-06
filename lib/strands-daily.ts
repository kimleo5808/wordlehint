import { cache } from "react";
import { getTodayDateString } from "@/lib/wordle-daily";
import type { StrandsDataFile, StrandsPuzzle } from "@/types/strands";

const loadData = cache((): StrandsDataFile => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@/data/strands-daily.json") as StrandsDataFile;
});

export function getAllStrands(): StrandsPuzzle[] {
  return loadData().puzzles;
}

export function getStrandsByDate(date: string): StrandsPuzzle | undefined {
  return loadData().puzzles.find((p) => p.date === date);
}

export function getTodayStrands(): StrandsPuzzle | undefined {
  return getStrandsByDate(getTodayDateString());
}

/** Most recent `count` puzzles up to and including today, newest first. */
export function getRecentStrands(count: number): StrandsPuzzle[] {
  const today = getTodayDateString();
  return loadData()
    .puzzles.filter((p) => p.date <= today)
    .slice(-count)
    .reverse();
}

export function getStrandsCount(): number {
  return loadData().puzzles.length;
}

/** Spangram clue: first letter + letter count, e.g. "Starts with T · 12 letters". */
export function spangramClue(spangram: string): string {
  return `Starts with ${spangram[0]} · ${spangram.length} letters`;
}

/** First-letter + length chip for a theme word, e.g. "V — 4 letters". */
export function themeWordClue(word: string): string {
  return `${word[0]} — ${word.length} letters`;
}

/* ------------------------------------------------------------------ */
/*  Archive + stats                                                    */
/* ------------------------------------------------------------------ */

/** All puzzles before today (today excluded for spoilers), newest first. */
export const getArchiveStrands = cache((): StrandsPuzzle[] => {
  const today = getTodayDateString();
  return loadData()
    .puzzles.filter((p) => p.date < today)
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1));
});

export interface StrandsStats {
  total: number;
  firstDate: string;
  lastDate: string;
  facts: string[];
}

export const getStrandsStats = cache((): StrandsStats => {
  const puzzles = loadData().puzzles;
  const total = puzzles.length;
  const dates = puzzles.map((p) => p.date).sort();

  let longest = "";
  let themeWordTotal = 0;
  for (const p of puzzles) {
    if (p.spangram.length > longest.length) longest = p.spangram;
    themeWordTotal += p.themeWords.length;
  }
  const avgTheme = total ? Math.round((themeWordTotal / total) * 10) / 10 : 0;

  const facts = [
    `${total} recent Strands puzzles, each with its spangram and theme words.`,
    longest
      ? `The longest spangram in this set is ${longest} (${longest.length} letters).`
      : "",
    `Each puzzle averages ${avgTheme} theme words plus one spangram.`,
  ].filter(Boolean);

  return {
    total,
    firstDate: dates[0],
    lastDate: dates[dates.length - 1],
    facts,
  };
});
