import { cache } from "react";
import { getAllPuzzles, getTodayDateString } from "@/lib/wordle-daily";
import { getDefinition } from "@/lib/wordle-definitions";
import type { DailyPuzzle } from "@/types/wordle-daily";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

/** One row in the archive — a puzzle enriched with a short definition. */
export interface AnswerEntry {
  date: string; // YYYY-MM-DD
  id: number; // Wordle puzzle number
  answer: string; // 5 uppercase letters
  /** First-meaning gloss, trimmed for the list view (null if unknown). */
  partOfSpeech: string | null;
  definition: string | null;
}

export interface MonthGroup {
  /** "2026-06" */
  key: string;
  /** "June 2026" */
  label: string;
  entries: AnswerEntry[];
}

export interface LetterCount {
  letter: string;
  count: number;
  /** 0–1 share of the total, for bar widths. */
  share: number;
}

export interface EndingCount {
  ending: string; // last two letters, e.g. "ER"
  count: number;
  share: number;
}

export interface VowelBucket {
  vowels: number; // 0..5
  count: number;
  share: number;
}

export interface AnswerStats {
  total: number;
  firstDate: string;
  lastDate: string;
  /** A–Z first-letter distribution, sorted by count desc. */
  firstLetters: LetterCount[];
  /** Top last-letter distribution, sorted by count desc. */
  lastLetters: LetterCount[];
  /** Top 8 two-letter endings, sorted by count desc. */
  topEndings: EndingCount[];
  /** Vowel-count buckets 0..5. */
  vowelDistribution: VowelBucket[];
  /** Share of answers containing at least one repeated letter (0–1). */
  repeatedLetterShare: number;
  repeatedLetterCount: number;
  /** Answers that have appeared more than once. */
  duplicateAnswers: { answer: string; dates: string[] }[];
  /** Pre-baked, human-readable, citable facts for copy + GEO. */
  facts: string[];
}

const VOWELS = new Set(["A", "E", "I", "O", "U"]);

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function trimDefinition(text: string | null, max = 90): string | null {
  if (!text) return null;
  const clean = text.trim().replace(/\s+/g, " ");
  if (clean.length <= max) return clean;
  // Cut on a word boundary, drop trailing punctuation, add an ellipsis.
  const slice = clean.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return `${slice.slice(0, lastSpace > 40 ? lastSpace : max).replace(/[.,;:]$/, "")}…`;
}

function formatMonthLabel(yearMonth: string): string {
  const [year, month] = yearMonth.split("-");
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function countVowels(word: string): number {
  let n = 0;
  for (const ch of word) if (VOWELS.has(ch)) n++;
  return n;
}

function hasRepeatedLetter(word: string): boolean {
  return new Set(word.split("")).size < word.length;
}

function toEntry(p: DailyPuzzle): AnswerEntry {
  const def = getDefinition(p.answer);
  return {
    date: p.date,
    id: p.id,
    answer: p.answer.toUpperCase(),
    partOfSpeech: def?.partOfSpeech ?? null,
    definition: trimDefinition(def?.definition ?? null),
  };
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

/**
 * All answers EXCLUDING today's (to avoid spoiling the live puzzle),
 * newest first. Today's entry is delivered separately via getTodayEntry().
 */
export const getArchiveEntries = cache((): AnswerEntry[] => {
  const today = getTodayDateString();
  return getAllPuzzles()
    .filter((p) => p.date < today)
    .map(toEntry)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
});

/** Today's entry, or undefined if the daily feed has not updated yet. */
export const getTodayEntry = cache((): AnswerEntry | undefined => {
  const today = getTodayDateString();
  const p = getAllPuzzles().find((x) => x.date === today);
  return p ? toEntry(p) : undefined;
});

/** The most recent `count` archive entries (today excluded), newest first. */
export function getRecentAnswerEntries(count: number): AnswerEntry[] {
  return getArchiveEntries().slice(0, count);
}

/** The most recent answer before today (i.e. yesterday), or undefined. */
export function getYesterdayEntry(): AnswerEntry | undefined {
  return getArchiveEntries()[0];
}

/** Archive entries grouped by month, newest month first. */
export const getArchiveByMonth = cache((): MonthGroup[] => {
  const groups = new Map<string, AnswerEntry[]>();
  for (const entry of getArchiveEntries()) {
    const key = entry.date.slice(0, 7);
    const bucket = groups.get(key);
    if (bucket) bucket.push(entry);
    else groups.set(key, [entry]);
  }
  return Array.from(groups.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([key, entries]) => ({ key, label: formatMonthLabel(key), entries }));
});

/**
 * Statistics computed over the full tracked answer set (today included —
 * the aggregate numbers are not a spoiler). Pre-computed at build time so
 * the client never aggregates thousands of rows.
 */
export const getAnswerStats = cache((): AnswerStats => {
  const puzzles = getAllPuzzles();
  const total = puzzles.length;
  const dates = puzzles.map((p) => p.date).sort();

  const firstLetterMap = new Map<string, number>();
  const lastLetterMap = new Map<string, number>();
  const endingMap = new Map<string, number>();
  const vowelMap = new Map<number, number>();
  const seen = new Map<string, string[]>();
  let repeatedLetterCount = 0;

  for (const p of puzzles) {
    const w = p.answer.toUpperCase();
    const first = w[0];
    const last = w[w.length - 1];
    const ending = w.slice(-2);

    firstLetterMap.set(first, (firstLetterMap.get(first) ?? 0) + 1);
    lastLetterMap.set(last, (lastLetterMap.get(last) ?? 0) + 1);
    endingMap.set(ending, (endingMap.get(ending) ?? 0) + 1);

    const v = countVowels(w);
    vowelMap.set(v, (vowelMap.get(v) ?? 0) + 1);

    if (hasRepeatedLetter(w)) repeatedLetterCount++;

    const datesForWord = seen.get(w);
    if (datesForWord) datesForWord.push(p.date);
    else seen.set(w, [p.date]);
  }

  const toLetterCounts = (m: Map<string, number>): LetterCount[] =>
    Array.from(m.entries())
      .map(([letter, count]) => ({ letter, count, share: count / total }))
      .sort((a, b) => b.count - a.count || a.letter.localeCompare(b.letter));

  const firstLetters = toLetterCounts(firstLetterMap);
  const lastLetters = toLetterCounts(lastLetterMap);

  const topEndings: EndingCount[] = Array.from(endingMap.entries())
    .map(([ending, count]) => ({ ending, count, share: count / total }))
    .sort((a, b) => b.count - a.count || a.ending.localeCompare(b.ending))
    .slice(0, 8);

  const vowelDistribution: VowelBucket[] = [0, 1, 2, 3, 4, 5].map((vowels) => {
    const count = vowelMap.get(vowels) ?? 0;
    return { vowels, count, share: count / total };
  });

  const duplicateAnswers = Array.from(seen.entries())
    .filter(([, ds]) => ds.length > 1)
    .map(([answer, ds]) => ({ answer, dates: ds.sort() }))
    .sort((a, b) => b.dates.length - a.dates.length);

  const repeatedLetterShare = repeatedLetterCount / total;

  // Pre-baked citable facts (used in copy + as GEO-friendly quotable lines).
  const topFirst = firstLetters[0];
  const topLast = lastLetters[0];
  const topEnding = topEndings[0];
  const twoVowels = vowelDistribution.find((b) => b.vowels === 2);

  const facts: string[] = [
    `${topFirst.letter} is the most common starting letter, opening ${topFirst.count} of ${total} tracked Wordle answers (${Math.round(topFirst.share * 100)}%).`,
    `${topLast.letter} is the most common final letter across the archive.`,
    topEnding
      ? `The two-letter ending "${topEnding.ending}" shows up more than any other, appearing in ${topEnding.count} answers.`
      : "",
    twoVowels
      ? `${Math.round(twoVowels.share * 100)}% of answers contain exactly two vowels — the most common pattern.`
      : "",
    `${Math.round(repeatedLetterShare * 100)}% of answers include at least one repeated letter.`,
    duplicateAnswers.length === 0
      ? `No answer has repeated in the tracked set of ${total} puzzles.`
      : `${duplicateAnswers.length} answer${duplicateAnswers.length > 1 ? "s have" : " has"} appeared more than once.`,
  ].filter(Boolean);

  return {
    total,
    firstDate: dates[0],
    lastDate: dates[dates.length - 1],
    firstLetters,
    lastLetters,
    topEndings,
    vowelDistribution,
    repeatedLetterShare,
    repeatedLetterCount,
    duplicateAnswers,
    facts,
  };
});

/** Total tracked puzzles (today included). */
export function getTrackedAnswerCount(): number {
  return getAllPuzzles().length;
}
