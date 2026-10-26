import { cache } from "react";
import { getAllStrands } from "@/lib/strands-daily";
import { hasStrandsDatePage } from "@/lib/date-pages";
import { COLS, ROWS, solveStrands, type SolvedPaths } from "@/lib/strands-solver";

/**
 * Deterministic notes for a Strands date page: each word's path on the
 * board (from lib/strands-solver.ts), which way the spangram runs, which
 * words were already answers in an earlier puzzle, and how the puzzle
 * compares with every earlier one. Only earlier puzzles are counted, so a
 * published page never changes.
 */

export interface StrandsWordNote {
  word: string;
  isSpangram: boolean;
  /** Board cell indices (row * 6 + col) in reading order of the word. */
  path: number[];
  /** The most recent earlier puzzle that also used this word. */
  seenBefore: { date: string; id: number; clue: string; href: string | null } | null;
  /** How many earlier puzzles used this word. */
  timesBefore: number;
  /** First and last letter squares, 1-based. */
  start: { row: number; col: number };
  end: { row: number; col: number };
}

export interface StrandsNotes {
  /** Spangram first, then theme words in the order NYT lists them. */
  words: StrandsWordNote[];
  /** Which sides the spangram connects (not the order its letters read in). */
  spangramDirection: "side to side" | "top to bottom" | "corner to corner";
  longestThemeWord: string;
  repeatedWords: number;
  archiveSize: number;
  /** Factual comparisons with earlier puzzles (empty for the first one). */
  comparisons: string[];
}

const pct = (x: number) => (x > 0 && x < 0.01 ? "under 1%" : `${Math.round(x * 100)}%`);

function cellOf(i: number | undefined): { row: number; col: number } {
  const n = i ?? 0;
  return { row: Math.floor(n / COLS) + 1, col: (n % COLS) + 1 };
}

/** Where a value sits among earlier values: the common case, or which way
 *  it leans and by how much. */
function standing(value: number, pool: number[], unit: string, more: string, fewer: string): string {
  const counts = new Map<number, number>();
  for (const v of pool) counts.set(v, (counts.get(v) ?? 0) + 1);
  const [mode, n] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  const below = pool.filter((v) => v < value).length / pool.length;
  const above = pool.filter((v) => v > value).length / pool.length;
  if (value === mode) return `the most common ${unit} (${pct(n / pool.length)} of earlier puzzles)`;
  return below >= above
    ? `${more} than ${pct(below)} of the ${pool.length.toLocaleString("en-US")} puzzles before it`
    : `${fewer} than ${pct(above)} of the ${pool.length.toLocaleString("en-US")} puzzles before it`;
}

function spangramDirection(path: number[]): StrandsNotes["spangramDirection"] {
  const cols = new Set(path.map((c) => c % COLS));
  const rows = new Set(path.map((c) => Math.floor(c / COLS)));
  const across = cols.has(0) && cols.has(COLS - 1);
  const down = rows.has(0) && rows.has(ROWS - 1);
  if (across && down) return "corner to corner";
  return down ? "top to bottom" : "side to side";
}

export const getStrandsNotes = cache((date: string): StrandsNotes | null => {
  const all = getAllStrands();
  const puzzle = all.find((p) => p.date === date);
  if (!puzzle) return null;
  const paths: SolvedPaths | null = solveStrands(puzzle);
  if (!paths) return null;

  const before = all.filter((p) => p.date < date);
  const lastSeen = new Map<string, { date: string; id: number; clue: string }>();
  const uses = new Map<string, number>();
  for (const p of before) {
    for (const w of [p.spangram, ...p.themeWords]) {
      lastSeen.set(w, { date: p.date, id: p.id, clue: p.clue });
      uses.set(w, (uses.get(w) ?? 0) + 1);
    }
  }

  const words: StrandsWordNote[] = [puzzle.spangram, ...puzzle.themeWords].map(
    (word, i) => {
      const seen = lastSeen.get(word);
      const path = paths[word] ?? [];
      return {
        word,
        isSpangram: i === 0,
        path,
        timesBefore: uses.get(word) ?? 0,
        start: cellOf(path[0]),
        end: cellOf(path[path.length - 1]),
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
    comparisons: before.length
      ? (() => {
          const themeLen = (p: { themeWords: string[] }) =>
            p.themeWords.reduce((n, w) => n + w.length, 0) / Math.max(1, p.themeWords.length);
          const avgThemeLen = before.reduce((n, p) => n + themeLen(p), 0) / before.length;
          return [
            `${puzzle.themeWords.length} theme words besides the spangram: ${standing(
              puzzle.themeWords.length,
              before.map((p) => p.themeWords.length),
              "count",
              "more",
              "fewer"
            )}. Fewer theme words means longer ones, since the board always has 48 letters.`,
            `${/^(8|11|18)$/.test(String(puzzle.spangram.length)) ? "An" : "A"} ${puzzle.spangram.length}-letter spangram: ${standing(
              puzzle.spangram.length,
              before.map((p) => p.spangram.length),
              "length",
              "longer",
              "shorter"
            )}.`,
            `Theme words average ${themeLen(puzzle).toFixed(1)} letters here, against ${avgThemeLen.toFixed(1)} across all earlier puzzles.`,
          ];
        })()
      : [],
  };
});
