import { cache } from "react";
import { getAllStrands } from "@/lib/strands-daily";
import { hasStrandsDatePage } from "@/lib/date-pages";
import { COLS, ROWS, solveStrands, type SolvedPaths } from "@/lib/strands-solver";

/**
 * Deterministic notes for a Strands date page: each word's path on the
 * board (from lib/strands-solver.ts), which way the spangram runs, and
 * which words were already answers in an earlier puzzle.
 */

export interface StrandsWordNote {
  word: string;
  isSpangram: boolean;
  /** Board cell indices (row * 6 + col) in reading order of the word. */
  path: number[];
  /** The most recent earlier puzzle that also used this word. */
  seenBefore: { date: string; id: number; href: string | null } | null;
}

export interface StrandsNotes {
  /** Spangram first, then theme words in the order NYT lists them. */
  words: StrandsWordNote[];
  spangramDirection: "left to right" | "top to bottom" | "corner to corner";
  longestThemeWord: string;
  repeatedWords: number;
  archiveSize: number;
}

function spangramDirection(path: number[]): StrandsNotes["spangramDirection"] {
  const cols = new Set(path.map((c) => c % COLS));
  const rows = new Set(path.map((c) => Math.floor(c / COLS)));
  const across = cols.has(0) && cols.has(COLS - 1);
  const down = rows.has(0) && rows.has(ROWS - 1);
  if (across && down) return "corner to corner";
  return down ? "top to bottom" : "left to right";
}

export const getStrandsNotes = cache((date: string): StrandsNotes | null => {
  const all = getAllStrands();
  const puzzle = all.find((p) => p.date === date);
  if (!puzzle) return null;
  const paths: SolvedPaths | null = solveStrands(puzzle);
  if (!paths) return null;

  const before = all.filter((p) => p.date < date);
  const lastSeen = new Map<string, { date: string; id: number }>();
  for (const p of before) {
    for (const w of [p.spangram, ...p.themeWords]) {
      lastSeen.set(w, { date: p.date, id: p.id });
    }
  }

  const words: StrandsWordNote[] = [puzzle.spangram, ...puzzle.themeWords].map(
    (word, i) => {
      const seen = lastSeen.get(word);
      return {
        word,
        isSpangram: i === 0,
        path: paths[word] ?? [],
        seenBefore: seen
          ? {
              ...seen,
              href: hasStrandsDatePage(seen.date)
                ? `/strands-answers/${seen.date}`
                : null,
            }
          : null,
      };
    }
  );

  return {
    words,
    spangramDirection: spangramDirection(paths[puzzle.spangram] ?? []),
    longestThemeWord: [...puzzle.themeWords].sort(
      (a, b) => b.length - a.length || a.localeCompare(b)
    )[0],
    repeatedWords: words.filter((w) => w.seenBefore).length,
    archiveSize: before.length,
  };
});
