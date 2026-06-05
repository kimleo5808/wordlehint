import { cache } from "react";
import { getTodayDateString } from "@/lib/wordle-daily";
import type {
  ConnectionsDataFile,
  ConnectionsGroup,
  ConnectionsLevel,
  ConnectionsPuzzle,
} from "@/types/connections";

const loadData = cache((): ConnectionsDataFile => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@/data/connections-daily.json") as ConnectionsDataFile;
});

/* ------------------------------------------------------------------ */
/*  Difficulty colour metadata                                         */
/* ------------------------------------------------------------------ */

export interface LevelMeta {
  level: ConnectionsLevel;
  color: "yellow" | "green" | "blue" | "purple";
  label: string; // difficulty word
}

export const LEVEL_META: Record<ConnectionsLevel, LevelMeta> = {
  0: { level: 0, color: "yellow", label: "Easiest" },
  1: { level: 1, color: "green", label: "Easy" },
  2: { level: 2, color: "blue", label: "Hard" },
  3: { level: 3, color: "purple", label: "Trickiest" },
};

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export function getAllConnections(): ConnectionsPuzzle[] {
  return loadData().puzzles;
}

export function getConnectionsByDate(
  date: string
): ConnectionsPuzzle | undefined {
  return loadData().puzzles.find((p) => p.date === date);
}

export function getTodayConnections(): ConnectionsPuzzle | undefined {
  return getConnectionsByDate(getTodayDateString());
}

/** Most recent `count` puzzles up to and including today, newest first. */
export function getRecentConnections(count: number): ConnectionsPuzzle[] {
  const today = getTodayDateString();
  const all = loadData().puzzles;
  const upToToday = all.filter((p) => p.date <= today);
  return upToToday.slice(-count).reverse();
}

export function getConnectionsCount(): number {
  return loadData().puzzles.length;
}

/* ------------------------------------------------------------------ */
/*  Hint helpers                                                       */
/* ------------------------------------------------------------------ */

/** Tier-1 clue: the first letter of each word, e.g. "B · F · O · W". */
export function firstLetterHint(group: ConnectionsGroup): string {
  return group.words
    .map((w) => w[0])
    .sort()
    .join(" · ");
}

/* ------------------------------------------------------------------ */
/*  Archive + stats                                                    */
/* ------------------------------------------------------------------ */

/** All puzzles before today (today excluded to avoid spoilers), newest first. */
export const getArchiveConnections = cache((): ConnectionsPuzzle[] => {
  const today = getTodayDateString();
  return loadData()
    .puzzles.filter((p) => p.date < today)
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1));
});

export interface ConnectionsStats {
  total: number;
  firstDate: string;
  lastDate: string;
  facts: string[];
}

export const getConnectionsStats = cache((): ConnectionsStats => {
  const puzzles = loadData().puzzles;
  const total = puzzles.length;
  const dates = puzzles.map((p) => p.date).sort();

  const wordCounts = new Map<string, number>();
  let purpleCount = 0;
  for (const p of puzzles) {
    for (const g of p.groups) {
      for (const w of g.words) {
        wordCounts.set(w, (wordCounts.get(w) ?? 0) + 1);
      }
    }
    purpleCount += p.groups.length === 4 ? 1 : 0;
  }
  const topWord = Array.from(wordCounts.entries()).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
  )[0];

  const facts = [
    `${total} Connections puzzles have been published since June 12, 2023.`,
    topWord
      ? `${topWord[0]} is the most-used word in the archive, appearing in ${topWord[1]} puzzles.`
      : "",
    `Every puzzle has four colour groups: yellow (easiest) through purple (trickiest).`,
  ].filter(Boolean);

  return {
    total,
    firstDate: dates[0],
    lastDate: dates[dates.length - 1],
    facts,
  };
});
