import { cache } from "react";
import type { DailyDataFile, DailyPuzzle } from "@/types/wordle-daily";

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
function toEasternDateString(d: Date = new Date()): string {
  return d
    .toLocaleDateString("en-CA", { timeZone: "America/New_York" })
    .slice(0, 10);
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export function getAllPuzzles(): DailyPuzzle[] {
  return loadData().puzzles;
}

export function getPuzzleByDate(date: string): DailyPuzzle | undefined {
  return loadData().puzzles.find((p) => p.date === date);
}

export function getTodayPuzzle(): DailyPuzzle | undefined {
  const today = toEasternDateString();
  return getPuzzleByDate(today);
}

export function getRecentPuzzles(count: number): DailyPuzzle[] {
  const today = toEasternDateString();
  const all = loadData().puzzles;
  const todayIdx = all.findIndex((p) => p.date === today);
  if (todayIdx === -1) return all.slice(-count).reverse();
  return all.slice(Math.max(0, todayIdx - count + 1), todayIdx + 1).reverse();
}

export function getPuzzlesByMonth(yearMonth: string): DailyPuzzle[] {
  // yearMonth = "2025-01"
  return loadData().puzzles.filter((p) => p.date.startsWith(yearMonth));
}

export function getAvailableMonths(): string[] {
  const months = new Set<string>();
  for (const p of loadData().puzzles) {
    months.add(p.date.slice(0, 7));
  }
  return Array.from(months).sort().reverse();
}

export function getPuzzleCount(): number {
  return loadData().puzzles.length;
}

export function getTodayDateString(): string {
  return toEasternDateString();
}
