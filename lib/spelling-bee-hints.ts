import { cache } from "react";
import type { SpellingBeePuzzle } from "@/types/spelling-bee";
import { getSpellingBeeScoring } from "@/lib/spelling-bee-daily";

/* ------------------------------------------------------------------ */
/*  Definitions (per-word clues)                                       */
/* ------------------------------------------------------------------ */

type BeeDefinition = { definition: string; partOfSpeech: string | null };

const loadDefinitions = cache((): Record<string, BeeDefinition | null> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("@/data/spelling-bee-definitions.json") as Record<
      string,
      BeeDefinition | null
    >;
  } catch {
    return {};
  }
});

/** Strip a definition down to a spoiler-safe one-sentence clue. */
function toClue(word: string, def: BeeDefinition | null): string | null {
  if (!def?.definition) return null;
  const firstSentence = def.definition.split(/(?<=[.;])\s/)[0].trim();
  // A definition that names the word itself (or its stem) would spoil it.
  const stem = word.slice(0, Math.max(4, word.length - 2));
  if (firstSentence.toLowerCase().includes(stem)) return null;
  const clue =
    firstSentence.length > 140
      ? `${firstSentence.slice(0, 137)}…`
      : firstSentence;
  return def.partOfSpeech ? `(${def.partOfSpeech}) ${clue}` : clue;
}

/* ------------------------------------------------------------------ */
/*  Hints model                                                        */
/* ------------------------------------------------------------------ */

export interface HintsGridData {
  letters: string[]; // first letters present, alphabetical
  lengths: number[]; // word lengths present, ascending
  cells: Record<string, Record<number, number>>; // letter → length → count
  rowTotals: Record<string, number>;
  colTotals: Record<number, number>;
  total: number;
}

export interface TwoLetterGroup {
  letter: string;
  pairs: { prefix: string; count: number }[];
}

export interface WordClue {
  word: string; // full word (revealed client-side only)
  mask: string; // "F _ _ _ _"
  length: number;
  isPangram: boolean;
  clue: string | null; // dictionary-derived, spoiler-filtered
}

export interface PangramHint {
  word: string;
  length: number;
  firstTwo: string;
  clue: string | null;
}

export interface SpellingBeeHints {
  lengthDistribution: { length: number; count: number }[];
  grid: HintsGridData;
  twoLetterGroups: TwoLetterGroup[];
  wordClues: WordClue[]; // sorted by length desc, then A→Z
  pangramHints: PangramHint[];
  difficultyBlurb: string;
}

export function getSpellingBeeHints(
  puzzle: SpellingBeePuzzle
): SpellingBeeHints {
  const scoring = getSpellingBeeScoring(puzzle);
  const definitions = loadDefinitions();
  const words = puzzle.answers;

  const letters = [...new Set(words.map((w) => w[0]))].sort();
  const lengths = [...new Set(words.map((w) => w.length))].sort(
    (a, b) => a - b
  );

  const cells: HintsGridData["cells"] = {};
  const rowTotals: Record<string, number> = {};
  const colTotals: Record<number, number> = {};
  for (const l of letters) cells[l] = {};
  for (const w of words) {
    cells[w[0]][w.length] = (cells[w[0]][w.length] ?? 0) + 1;
    rowTotals[w[0]] = (rowTotals[w[0]] ?? 0) + 1;
    colTotals[w.length] = (colTotals[w.length] ?? 0) + 1;
  }

  const pairCounts = new Map<string, number>();
  for (const w of words) {
    const prefix = w.slice(0, 2).toUpperCase();
    pairCounts.set(prefix, (pairCounts.get(prefix) ?? 0) + 1);
  }
  const twoLetterGroups: TwoLetterGroup[] = letters.map((letter) => ({
    letter: letter.toUpperCase(),
    pairs: [...pairCounts.entries()]
      .filter(([prefix]) => prefix.startsWith(letter.toUpperCase()))
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([prefix, count]) => ({ prefix, count })),
  }));

  const pangramSet = new Set(puzzle.pangrams);
  const wordClues: WordClue[] = [...scoring.words]
    .sort(
      (a, b) => b.word.length - a.word.length || a.word.localeCompare(b.word)
    )
    .map(({ word }) => ({
      word: word.toUpperCase(),
      mask: `${word[0].toUpperCase()} ${"_ ".repeat(word.length - 1).trim()}`,
      length: word.length,
      isPangram: pangramSet.has(word),
      clue: toClue(word, definitions[word] ?? null),
    }));

  const pangramHints: PangramHint[] = puzzle.pangrams.map((word) => ({
    word: word.toUpperCase(),
    length: word.length,
    firstTwo: word.slice(0, 2).toUpperCase(),
    clue: toClue(word, definitions[word] ?? null),
  }));

  return {
    lengthDistribution: lengths.map((length) => ({
      length,
      count: colTotals[length],
    })),
    grid: {
      letters,
      lengths,
      cells,
      rowTotals,
      colTotals,
      total: words.length,
    },
    twoLetterGroups,
    wordClues,
    pangramHints,
    difficultyBlurb: buildDifficultyBlurb(puzzle, scoring.totalWords),
  };
}

/** Rule-based one-line editorial read on today's board — no spoilers. */
function buildDifficultyBlurb(
  puzzle: SpellingBeePuzzle,
  totalWords: number
): string {
  const words = puzzle.answers;
  const parts: string[] = [];

  const counts = new Map<string, number>();
  for (const w of words) counts.set(w[0], (counts.get(w[0]) ?? 0) + 1);
  const [topLetter, topCount] = [...counts.entries()].sort(
    (a, b) => b[1] - a[1]
  )[0];
  if (topCount / totalWords >= 0.4) {
    parts.push(
      `${topLetter.toUpperCase()}-words dominate today — ${topCount} of the ${totalWords} answers start with ${topLetter.toUpperCase()}`
    );
  }

  const maxLen = Math.max(...words.map((w) => w.length));
  if (maxLen >= 9) {
    parts.push(`there's a ${maxLen}-letter word hiding in the honeycomb`);
  }

  const shortShare =
    words.filter((w) => w.length === 4).length / totalWords;
  if (shortShare >= 0.45) {
    parts.push("lots of quick 4-letter points to bank early");
  } else if (shortShare <= 0.2) {
    parts.push("short words are scarce, so length is where the points are");
  }

  if (parts.length === 0) {
    return `A balanced board: ${totalWords} words with no single trick to lean on — steady work through the grid below will get you there.`;
  }
  const joined =
    parts.length === 1
      ? parts[0]
      : `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
  return `Today's read: ${joined}.`;
}
