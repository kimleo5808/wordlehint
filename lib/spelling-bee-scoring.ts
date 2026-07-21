/**
 * Pure Spelling Bee scoring — no data imports, safe for client bundles.
 * lib/spelling-bee-daily.ts re-exports these for server use.
 */

/** NYT rank ladder as a percentage of the puzzle's max score. */
export const RANK_LADDER: ReadonlyArray<{ name: string; percent: number }> = [
  { name: "Beginner", percent: 0 },
  { name: "Good Start", percent: 2 },
  { name: "Moving Up", percent: 5 },
  { name: "Good", percent: 8 },
  { name: "Solid", percent: 15 },
  { name: "Nice", percent: 25 },
  { name: "Great", percent: 40 },
  { name: "Amazing", percent: 50 },
  { name: "Genius", percent: 70 },
  { name: "Queen Bee", percent: 100 },
];

/** 4-letter words score 1; longer words score their length; pangrams get +7. */
export function scoreWord(word: string, isPangram: boolean): number {
  const base = word.length === 4 ? 1 : word.length;
  return base + (isPangram ? 7 : 0);
}

export function totalPoints(answers: string[], pangrams: string[]): number {
  const pg = new Set(pangrams);
  return answers.reduce((sum, w) => sum + scoreWord(w, pg.has(w)), 0);
}

export function rankThresholds(total: number) {
  return RANK_LADDER.map((r) => ({
    ...r,
    minScore: Math.round((total * r.percent) / 100),
  }));
}

/** Current rank name for a score, given the puzzle's max. */
export function rankForScore(score: number, total: number): string {
  const ranks = rankThresholds(total);
  let current = ranks[0].name;
  for (const r of ranks) if (score >= r.minScore) current = r.name;
  return current;
}
