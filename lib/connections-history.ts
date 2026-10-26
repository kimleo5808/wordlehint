import { cache } from "react";
import { getAllConnections, LEVEL_META } from "@/lib/connections-daily";
import { hasConnectionsDatePage } from "@/lib/date-pages";
import type { ConnectionsLevel, ConnectionsPuzzle } from "@/types/connections";

/**
 * Word history for a Connections date page: how often each of the puzzle's
 * 16 words appeared in EARLIER puzzles, and in which colour. Only puzzles
 * before the page's date count, so a published page never changes as new
 * puzzles arrive.
 */

export interface PastAppearance {
  date: string;
  id: number;
  level: ConnectionsLevel;
  category: string;
  /** Link to that puzzle's own date page, when it has one. */
  href: string | null;
}

export interface WordHistoryRow {
  word: string;
  /** This puzzle's colour group for the word (a spoiler — UI hides it). */
  level: ConnectionsLevel;
  /** Earlier appearances per colour: [yellow, green, blue, purple]. */
  counts: [number, number, number, number];
  total: number;
  last: PastAppearance | null;
  /** Seen before in a different colour from today's. */
  changedColor: boolean;
}

export interface ConnectionsFacts {
  archiveSize: number;
  firstTimeWords: number;
  seenBeforeWords: number;
  colorChangers: number;
  mostSeen: { word: string; total: number } | null;
  purpleIsFillInBlank: boolean;
  /** Share (0–1) of earlier purple groups that were fill-in-the-blank. */
  purpleFillInShare: number;
  editorPuzzleNumber: number | null;
}

export const getConnectionsWordHistory = cache(
  (date: string): WordHistoryRow[] => {
    const all = getAllConnections();
    const puzzle = all.find((p) => p.date === date);
    if (!puzzle) return [];

    const rows = new Map<string, WordHistoryRow>();
    for (const g of puzzle.groups) {
      for (const word of g.words) {
        rows.set(word, {
          word,
          level: g.level,
          counts: [0, 0, 0, 0],
          total: 0,
          last: null,
          changedColor: false,
        });
      }
    }

    // Puzzles are sorted by date; walk everything before this one.
    for (const p of all) {
      if (p.date >= date) break;
      for (const g of p.groups) {
        for (const word of g.words) {
          const row = rows.get(word);
          if (!row) continue;
          row.counts[g.level]++;
          row.total++;
          row.last = {
            date: p.date,
            id: p.id,
            level: g.level,
            category: g.name,
            href: hasConnectionsDatePage(p.date)
              ? `/connections-answers/${p.date}`
              : null,
          };
          if (g.level !== row.level) row.changedColor = true;
        }
      }
    }

    // Board order would hint at the groups; alphabetical is spoiler-free.
    return [...rows.values()].sort((a, b) => a.word.localeCompare(b.word));
  }
);

export const getConnectionsFacts = cache((date: string): ConnectionsFacts => {
  const all = getAllConnections();
  const puzzle = all.find((p) => p.date === date) as ConnectionsPuzzle;
  const rows = getConnectionsWordHistory(date);
  const before = all.filter((p) => p.date < date);

  const seen = rows.filter((r) => r.total > 0);
  const mostSeen = [...seen].sort(
    (a, b) => b.total - a.total || a.word.localeCompare(b.word)
  )[0];
  const purple = puzzle.groups.find((g) => g.level === 3);
  const editor = puzzle.editor.trim().toLowerCase();
  const earlierPurples = before
    .map((p) => p.groups.find((g) => g.level === 3))
    .filter((g) => g !== undefined);

  return {
    archiveSize: before.length,
    firstTimeWords: rows.length - seen.length,
    seenBeforeWords: seen.length,
    colorChangers: rows.filter((r) => r.changedColor).length,
    mostSeen: mostSeen ? { word: mostSeen.word, total: mostSeen.total } : null,
    purpleIsFillInBlank: Boolean(purple?.name.includes("___")),
    purpleFillInShare: earlierPurples.length
      ? earlierPurples.filter((g) => g.name.includes("___")).length /
        earlierPurples.length
      : 0,
    editorPuzzleNumber: editor
      ? all.filter(
          (p) => p.date <= date && p.editor.trim().toLowerCase() === editor
        ).length
      : null,
  };
});

export interface ConnectionsCategoryNote {
  level: ConnectionsLevel;
  name: string;
  /** Words that had already been in this same colour. */
  sameColour: string[];
  /** Words appearing in Connections for the first time. */
  firstTimers: number;
  /** The group's most-used word before this puzzle. */
  veteran: { word: string; total: number } | null;
  /** The latest earlier puzzle with the exact same category name. */
  sameNameBefore: { id: number; date: string; href: string | null } | null;
}

/** One note per colour group, from the word history and earlier categories. */
export const getConnectionsCategoryNotes = cache(
  (date: string): ConnectionsCategoryNote[] => {
    const all = getAllConnections();
    const puzzle = all.find((p) => p.date === date);
    if (!puzzle) return [];
    const rows = new Map(getConnectionsWordHistory(date).map((r) => [r.word, r]));
    const lastName = new Map<string, { id: number; date: string }>();
    for (const p of all) {
      if (p.date >= date) break;
      for (const g of p.groups) lastName.set(g.name.trim().toLowerCase(), { id: p.id, date: p.date });
    }
    return [...puzzle.groups]
      .sort((a, b) => a.level - b.level)
      .map((g) => {
        const words = g.words.map((w) => rows.get(w)).filter((r) => r !== undefined);
        const veteran = [...words].sort((a, b) => b.total - a.total || a.word.localeCompare(b.word))[0];
        const same = lastName.get(g.name.trim().toLowerCase());
        return {
          level: g.level,
          name: g.name,
          sameColour: words.filter((r) => r.counts[g.level] > 0).map((r) => r.word),
          firstTimers: words.filter((r) => r.total === 0).length,
          veteran: veteran && veteran.total > 0 ? { word: veteran.word, total: veteran.total } : null,
          sameNameBefore: same
            ? { ...same, href: hasConnectionsDatePage(same.date) ? `/connections-answers/${same.date}` : null }
            : null,
        };
      });
  }
);

export function levelColorName(level: ConnectionsLevel): string {
  return LEVEL_META[level].color;
}
