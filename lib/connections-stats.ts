import { cache } from "react";
import { getArchiveConnections } from "@/lib/connections-daily";
import type { ConnectionsLevel } from "@/types/connections";

/**
 * Archive-wide statistics for /connections-stats. Every number is computed
 * from puzzles before today (getArchiveConnections), so the page never
 * reveals today's grid or the prefetched tomorrow, and it updates itself
 * with each deploy. Counts are per appearance: a word that shows up in two
 * puzzles counts twice.
 */

export type ColourCounts = [number, number, number, number];

export interface WordRow {
  word: string;
  counts: ColourCounts;
  total: number;
}

export interface CategoryType {
  key: string;
  label: string;
  /** What the pattern matches, for the methodology note. */
  rule: string;
  examples: string[];
  count: number;
  counts: ColourCounts;
  purpleShare: number;
}

export interface ConnectionsStatsData {
  puzzles: number;
  firstDate: string;
  lastDate: string;
  firstId: number;
  lastId: number;
  cells: number;
  distinct: number;
  usedOnce: number;
  usedFivePlus: number;
  topWords: WordRow[];
  rainbow: WordRow[];
  topPurple: WordRow[];
  purpleBlankByYear: { year: string; purples: number; blanks: number; share: number }[];
  /** Purple groups per year by category type (keys of categoryTypes). */
  purpleTypesByYear: { year: string; purples: number; types: Record<string, number> }[];
  categoryTypes: CategoryType[];
  reusedNameCount: number;
  topNames: { name: string; count: number }[];
  repeatedGroups: { words: string[]; puzzles: { id: number; date: string }[] }[];
  topPairs: { a: string; b: string; count: number }[];
}

/** Category-name patterns, checked in order; the first match wins. */
const TYPES: { key: string; label: string; rule: string; test: (name: string) => boolean }[] = [
  { key: "blank", label: "Fill in the blank", rule: "the name contains ___", test: (n) => n.includes("___") },
  {
    key: "plusminus",
    label: "Add or remove letters",
    rule: "“+”, “MINUS” or “PLUS” in the name",
    test: (n) => /\+|\bMINUS\b|\bPLUS\b/.test(n),
  },
  {
    key: "hidden",
    label: "Beginnings, endings & hidden words",
    rule: "starting, beginning or ending with…, hidden…",
    test: (n) => /\b(STARTING|BEGINNING|ENDING|STARTS|BEGINS|ENDS) WITH\b|\bHIDDEN\b/.test(n),
  },
  {
    key: "sound",
    label: "Homophones & sound-alikes",
    rule: "homophone, sounds like…",
    test: (n) => /HOMOPHONE|SOUNDS? LIKE|SOUND-ALIKE/.test(n),
  },
  { key: "anagram", label: "Anagrams", rule: "anagram", test: (n) => n.includes("ANAGRAM") },
  { key: "palindrome", label: "Palindromes", rule: "palindrome", test: (n) => n.includes("PALINDROME") },
];

const pairKey = (a: string, b: string) => (a < b ? `${a}\u0000${b}` : `${b}\u0000${a}`);

export const getConnectionsStatsData = cache((): ConnectionsStatsData => {
  const archive = getArchiveConnections(); // newest first
  const chronological = [...archive].reverse();

  const words = new Map<string, ColourCounts>();
  const names = new Map<string, number>();
  const groups = new Map<string, { words: string[]; puzzles: { id: number; date: string }[] }>();
  const pairs = new Map<string, number>();
  const typeCounts = new Map<string, { counts: ColourCounts; examples: string[] }>();
  const other: ColourCounts = [0, 0, 0, 0];
  const years = new Map<string, { purples: number; blanks: number }>();
  const purpleTypes = new Map<string, Record<string, number>>();
  let cells = 0;

  for (const p of chronological) {
    for (const g of p.groups) {
      const level = g.level as ConnectionsLevel;
      for (const w of g.words) {
        cells++;
        const c = words.get(w) ?? [0, 0, 0, 0];
        c[level]++;
        words.set(w, c);
      }

      const name = g.name.trim().toUpperCase();
      names.set(name, (names.get(name) ?? 0) + 1);

      const sorted = [...g.words].sort();
      const gk = sorted.join("\u0000");
      const entry = groups.get(gk) ?? { words: sorted, puzzles: [] };
      entry.puzzles.push({ id: p.id, date: p.date });
      groups.set(gk, entry);

      for (let i = 0; i < sorted.length; i++) {
        for (let j = i + 1; j < sorted.length; j++) {
          const k = pairKey(sorted[i], sorted[j]);
          pairs.set(k, (pairs.get(k) ?? 0) + 1);
        }
      }

      const type = TYPES.find((t) => t.test(name));
      if (type) {
        const t = typeCounts.get(type.key) ?? { counts: [0, 0, 0, 0] as ColourCounts, examples: [] };
        t.counts[level]++;
        if (t.examples.length < 3 && !t.examples.includes(g.name)) t.examples.push(g.name);
        typeCounts.set(type.key, t);
      } else {
        other[level]++;
      }

      if (level === 3) {
        const y = p.date.slice(0, 4);
        const t = purpleTypes.get(y) ?? {};
        const k = type?.key ?? "other";
        t[k] = (t[k] ?? 0) + 1;
        purpleTypes.set(y, t);
        const row = years.get(y) ?? { purples: 0, blanks: 0 };
        row.purples++;
        if (g.name.includes("___")) row.blanks++;
        years.set(y, row);
      }
    }
  }

  const rows: WordRow[] = [...words.entries()].map(([word, counts]) => ({
    word,
    counts,
    total: counts[0] + counts[1] + counts[2] + counts[3],
  }));
  const byTotal = (a: WordRow, b: WordRow) => b.total - a.total || a.word.localeCompare(b.word);
  const sum = (c: ColourCounts) => c[0] + c[1] + c[2] + c[3];

  const categoryTypes: CategoryType[] = [
    ...TYPES.map((t) => {
      const found = typeCounts.get(t.key) ?? { counts: [0, 0, 0, 0] as ColourCounts, examples: [] };
      const count = sum(found.counts);
      return {
        key: t.key,
        label: t.label,
        rule: t.rule,
        examples: found.examples,
        count,
        counts: found.counts,
        purpleShare: found.counts[3] / Math.max(1, count),
      };
    }),
    {
      key: "other",
      label: "Everything else",
      rule: "plain meaning categories: things, people, synonyms…",
      examples: [],
      count: sum(other),
      counts: other,
      purpleShare: other[3] / Math.max(1, sum(other)),
    },
  ].filter((t) => t.count > 0);

  return {
    puzzles: archive.length,
    firstDate: chronological[0]?.date ?? "",
    lastDate: archive[0]?.date ?? "",
    firstId: chronological[0]?.id ?? 0,
    lastId: archive[0]?.id ?? 0,
    cells,
    distinct: rows.length,
    usedOnce: rows.filter((r) => r.total === 1).length,
    usedFivePlus: rows.filter((r) => r.total >= 5).length,
    topWords: [...rows].sort(byTotal).slice(0, 30),
    rainbow: rows.filter((r) => r.counts.every((n) => n > 0)).sort(byTotal),
    topPurple: [...rows].sort((a, b) => b.counts[3] - a.counts[3] || byTotal(a, b)).slice(0, 15),
    purpleBlankByYear: [...years.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([year, r]) => ({ year, ...r, share: r.blanks / Math.max(1, r.purples) })),
    purpleTypesByYear: [...years.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([year, r]) => ({ year, purples: r.purples, types: purpleTypes.get(year) ?? {} })),
    categoryTypes,
    reusedNameCount: [...names.values()].filter((n) => n > 1).length,
    topNames: [...names.entries()]
      .filter(([, n]) => n > 1)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 15)
      .map(([name, count]) => ({ name, count })),
    repeatedGroups: [...groups.values()]
      .filter((g) => g.puzzles.length > 1)
      .sort((a, b) => b.puzzles.length - a.puzzles.length || a.puzzles[0].id - b.puzzles[0].id),
    topPairs: [...pairs.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 15)
      .map(([k, count]) => {
        const [a, b] = k.split("\u0000");
        return { a, b, count };
      }),
  };
});
