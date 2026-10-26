import { cache } from "react";
import { getTodayDateString } from "@/lib/wordle-daily";
import type { PipsDataFile, PipsPuzzle } from "@/types/pips";

/**
 * NYT Pips read layer. Pips resets at local midnight like Wordle, so the
 * site's "today" is the shared ET date. The updater prefetches tomorrow —
 * every accessor reads through released(), never loadData() directly.
 */

const loadData = cache((): PipsDataFile => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@/data/pips-daily.json") as PipsDataFile;
});

const releasedPuzzles = cache((today: string): PipsPuzzle[] =>
  loadData().puzzles.filter((p) => p.date <= today)
);

function released(): PipsPuzzle[] {
  return releasedPuzzles(getTodayDateString());
}

export function getAllPips(): PipsPuzzle[] {
  return released();
}

export function getPipsByDate(date: string): PipsPuzzle | undefined {
  return released().find((p) => p.date === date);
}

export function getTodayPips(): PipsPuzzle | undefined {
  return getPipsByDate(getTodayDateString());
}

/** Most recent puzzle before today. */
export function getYesterdayPips(): PipsPuzzle | undefined {
  const today = getTodayDateString();
  const before = released().filter((p) => p.date < today);
  return before[before.length - 1];
}

/** All puzzles before today (today excluded for spoilers), newest first. */
export const getArchivePips = cache((): PipsPuzzle[] => {
  const today = getTodayDateString();
  return released()
    .filter((p) => p.date < today)
    .slice()
    .reverse();
});
