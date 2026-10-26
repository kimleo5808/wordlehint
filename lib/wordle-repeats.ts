import { cache } from "react";
import { getFullWordleHistory, getTodayDateString } from "@/lib/wordle-daily";

/**
 * Wordle repeats: NYT began reusing past answers on 2026-02-02 (CIGAR, the
 * original #0). Everything here is computed from the full history since #0
 * and excludes today's puzzle — whether today's answer is a repeat is a
 * hint, so it only appears behind a spoiler curtain (getTodayRepeat).
 */

export interface PuzzleRef {
  date: string;
  id: number;
}

export interface WordleRepeat {
  word: string;
  /** The repeat itself. */
  date: string;
  id: number;
  /** The previous time this word was the answer. */
  previous: PuzzleRef;
  gapDays: number;
}

export interface WordleRepeatStats {
  repeats: WordleRepeat[]; // newest first
  first: WordleRepeat | null;
  latest: WordleRepeat | null;
  totalPuzzles: number;
  uniqueAnswers: number;
  /** Puzzles since (and including) the first repeat. */
  puzzlesSinceFirst: number;
  share: number; // repeats / puzzlesSinceFirst
  minGap: number;
  medianGap: number;
  maxGap: number;
  /** Year the repeated word first ran → how many repeats. */
  byOriginYear: { year: string; repeats: number; answersThatYear: number }[];
  maxUses: number;
}

function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T12:00:00Z`) - Date.parse(`${a}T12:00:00Z`)) / 86_400_000);
}

/** Full history before today, oldest first. */
const pastHistory = cache((today: string) =>
  getFullWordleHistory().filter((p) => p.date < today)
);

export const getWordleRepeatStats = cache((): WordleRepeatStats => {
  const history = pastHistory(getTodayDateString());
  const last = new Map<string, PuzzleRef>();
  const uses = new Map<string, number>();
  const repeats: WordleRepeat[] = [];

  for (const p of history) {
    const prev = last.get(p.answer);
    if (prev) {
      repeats.push({
        word: p.answer,
        date: p.date,
        id: p.id,
        previous: prev,
        gapDays: daysBetween(prev.date, p.date),
      });
    }
    last.set(p.answer, { date: p.date, id: p.id });
    uses.set(p.answer, (uses.get(p.answer) ?? 0) + 1);
  }

  const first = repeats[0] ?? null;
  const gaps = repeats.map((r) => r.gapDays).sort((a, b) => a - b);
  const puzzlesSinceFirst = first
    ? history.filter((p) => p.date >= first.date).length
    : 0;

  const answersByYear = new Map<string, number>();
  for (const p of history) {
    const y = p.date.slice(0, 4);
    answersByYear.set(y, (answersByYear.get(y) ?? 0) + 1);
  }
  const repeatsByYear = new Map<string, number>();
  for (const r of repeats) {
    const y = r.previous.date.slice(0, 4);
    repeatsByYear.set(y, (repeatsByYear.get(y) ?? 0) + 1);
  }

  return {
    repeats: [...repeats].reverse(),
    first,
    latest: repeats.at(-1) ?? null,
    totalPuzzles: history.length,
    uniqueAnswers: uses.size,
    puzzlesSinceFirst,
    share: puzzlesSinceFirst ? repeats.length / puzzlesSinceFirst : 0,
    minGap: gaps[0] ?? 0,
    medianGap: gaps.length ? gaps[Math.floor(gaps.length / 2)] : 0,
    maxGap: gaps.at(-1) ?? 0,
    byOriginYear: [...answersByYear.keys()].sort().map((year) => ({
      year,
      repeats: repeatsByYear.get(year) ?? 0,
      answersThatYear: answersByYear.get(year) ?? 0,
    })),
    maxUses: Math.max(0, ...uses.values()),
  };
});

/** word → every date/number it was the answer (before today), oldest first. */
export const getWordleUsageIndex = cache((): Record<string, [string, number][]> => {
  const index: Record<string, [string, number][]> = {};
  for (const p of pastHistory(getTodayDateString())) {
    (index[p.answer] ??= []).push([p.date, p.id]);
  }
  return index;
});

/**
 * Is today's answer a repeat? Spoiler-adjacent (it narrows the answer), so
 * pages must keep it behind a reveal.
 */
export function getTodayRepeat(): { id: number; previous: PuzzleRef | null } | null {
  const today = getTodayDateString();
  const all = getFullWordleHistory();
  const todayPuzzle = all.find((p) => p.date === today);
  if (!todayPuzzle) return null;
  const prev = [...pastHistory(today)].reverse().find((p) => p.answer === todayPuzzle.answer);
  return {
    id: todayPuzzle.id,
    previous: prev ? { date: prev.date, id: prev.id } : null,
  };
}
