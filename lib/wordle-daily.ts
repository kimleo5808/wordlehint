import { cache } from "react";
import dateConfig from "@/data/date-pages.json";
import type { DailyDataFile, DailyPuzzle } from "@/types/wordle-daily";

/**
 * First date the site's Wordle pages cover. The JSON holds every puzzle
 * since #0 (2021-06-19), but older puzzles are history data only: they get
 * no /wordle-hint/[date] page and don't change any existing page. Only
 * getFullWordleHistory() reads further back.
 */
const PAGES_START: string = dateConfig.wordle;

/* ------------------------------------------------------------------ */
/*  Load data (cached per request)                                     */
/* ------------------------------------------------------------------ */

const loadData = cache((): DailyDataFile => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@/data/wordle-daily.json") as DailyDataFile;
});

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Format a Date as YYYY-MM-DD in US Eastern timezone */
export function toEasternDateString(d: Date = new Date()): string {
  return d
    .toLocaleDateString("en-CA", { timeZone: "America/New_York" })
    .slice(0, 10);
}

/**
 * Puzzles released as of `today`. The updater prefetches tomorrow's puzzle
 * so the midnight-ET rebuild already has it — the raw JSON can run a day
 * ahead, so every accessor below reads through this, never `loadData()`.
 */
const releasedPuzzles = cache((today: string): DailyPuzzle[] =>
  loadData().puzzles.filter((p) => p.date <= today)
);

/** Released puzzles within the pages' range (PAGES_START onward). */
const pageRangePuzzles = cache((today: string): DailyPuzzle[] =>
  releasedPuzzles(today).filter((p) => p.date >= PAGES_START)
);

function released(): DailyPuzzle[] {
  return pageRangePuzzles(toEasternDateString());
}

/**
 * Every released Wordle since #0 (2021-06-19), oldest first. For history
 * features (e.g. /wordle-repeats); page accessors below stay in range.
 */
export function getFullWordleHistory(): DailyPuzzle[] {
  return releasedPuzzles(toEasternDateString());
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export function getAllPuzzles(): DailyPuzzle[] {
  return released();
}

export function getPuzzleByDate(date: string): DailyPuzzle | undefined {
  return released().find((p) => p.date === date);
}

export function getTodayPuzzle(): DailyPuzzle | undefined {
  const today = toEasternDateString();
  return getPuzzleByDate(today);
}

/** Most recent puzzle before today — correct even if today's entry is missing. */
export function getYesterdayPuzzle(): DailyPuzzle | undefined {
  const today = toEasternDateString();
  const before = released().filter((p) => p.date < today);
  return before[before.length - 1];
}

/** Most recent `count` puzzles up to and including today, newest first. */
export function getRecentPuzzles(count: number): DailyPuzzle[] {
  return released().slice(-count).reverse();
}

export function getPuzzlesByMonth(yearMonth: string): DailyPuzzle[] {
  // yearMonth = "2025-01"
  return released().filter((p) => p.date.startsWith(yearMonth));
}

export function getAvailableMonths(): string[] {
  const months = new Set<string>();
  for (const p of released()) {
    months.add(p.date.slice(0, 7));
  }
  return Array.from(months).sort().reverse();
}

export function getPuzzleCount(): number {
  return released().length;
}

export function getTodayDateString(): string {
  return toEasternDateString();
}
