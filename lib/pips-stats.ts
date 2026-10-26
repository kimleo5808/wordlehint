import { cache } from "react";
import { getArchivePips } from "@/lib/pips-daily";
import type { PipsDifficulty } from "@/types/pips";

/**
 * Archive-wide Pips numbers (every released puzzle before today), used on
 * the hub and the how-to-play guide. All values are computed, nothing typed in.
 */

export interface PipsDifficultyStats {
  boards: number;
  avgDominoes: number;
  minDominoes: number;
  maxDominoes: number;
  oneSquareShare: number; // boards with at least one one-square sum region
  oneSquarePerBoard: number;
  extremeSumShare: number; // boards with a sum region of 0 or 6 × squares
  regionMix: { type: string; share: number }[];
  /** Dominoes whose two halves sit in different regions. */
  straddleShare: number;
  doublesPerBoard: number;
  /** Equal regions with a whole domino (a double) inside them. */
  equalsWithDoubleShare: number;
  /** …among two-square equal regions only. */
  twoSquareEqualsDoubleShare: number;
  lessMedianTarget: number;
  greaterMedianTarget: number;
}

export interface PipsStats {
  puzzles: number;
  firstDate: string;
  lastDate: string;
  byDifficulty: Record<PipsDifficulty, PipsDifficultyStats>;
  /** Targets of multi-square sum regions, most common first. */
  topSumTargets: { target: number; share: number }[];
  /** Share of multi-square sum targets that are 11, 12, 17 or 18 — a
   *  widely repeated tip claims these come up often. */
  popularTipShare: number;
  constructors: { name: string; boards: number }[];
}

const LEVELS: PipsDifficulty[] = ["easy", "medium", "hard"];

export const getPipsStats = cache((): PipsStats => {
  const archive = getArchivePips(); // newest first
  const byDifficulty = {} as Record<PipsDifficulty, PipsDifficultyStats>;
  const targets = new Map<number, number>();
  let sums = 0;
  const makers = new Map<string, number>();

  const median = (xs: number[]) => {
    const s = [...xs].sort((a, b) => a - b);
    return s.length ? s[Math.floor(s.length / 2)] : 0;
  };
  const key = (c: [number, number]) => `${c[0]},${c[1]}`;

  for (const lvl of LEVELS) {
    const boards = archive.map((p) => p[lvl]);
    const counts = boards.map((b) => b.dominoes.length);
    const types = new Map<string, number>();
    let regions = 0;
    let dominoes = 0;
    let straddling = 0;
    let doubles = 0;
    let oneSquare = 0;
    let equals = 0;
    let equalsWithDouble = 0;
    let equals2 = 0;
    let equals2Double = 0;
    const less: number[] = [];
    const greater: number[] = [];
    for (const b of boards) {
      const regionOf = new Map<string, number>();
      b.regions.forEach((r, i) => r.indices.forEach((c) => regionOf.set(key(c), i)));
      b.solution.forEach(([a, c], i) => {
        dominoes++;
        if (regionOf.get(key(a)) !== regionOf.get(key(c))) straddling++;
        if (b.dominoes[i][0] === b.dominoes[i][1]) doubles++;
      });
      b.regions.forEach((r, i) => {
        if (r.type === "sum" && r.indices.length === 1) oneSquare++;
        if (r.type === "less" && r.target !== undefined) less.push(r.target);
        if (r.type === "greater" && r.target !== undefined) greater.push(r.target);
        if (r.type === "equals") {
          const whole = b.solution.some(
            ([a, c]) => regionOf.get(key(a)) === i && regionOf.get(key(c)) === i
          );
          equals++;
          if (whole) equalsWithDouble++;
          if (r.indices.length === 2) {
            equals2++;
            if (whole) equals2Double++;
          }
        }
      });
      for (const r of b.regions) {
        regions++;
        types.set(r.type, (types.get(r.type) ?? 0) + 1);
        if (r.type === "sum" && r.indices.length > 1 && r.target !== undefined) {
          sums++;
          targets.set(r.target, (targets.get(r.target) ?? 0) + 1);
        }
      }
      for (const name of b.constructors.split(/\s*(?:,|&|\band\b)\s*/).filter(Boolean)) {
        makers.set(name, (makers.get(name) ?? 0) + 1);
      }
    }
    byDifficulty[lvl] = {
      boards: boards.length,
      avgDominoes: counts.reduce((a, b) => a + b, 0) / Math.max(1, counts.length),
      minDominoes: Math.min(...counts),
      maxDominoes: Math.max(...counts),
      oneSquareShare:
        boards.filter((b) => b.regions.some((r) => r.type === "sum" && r.indices.length === 1)).length /
        Math.max(1, boards.length),
      oneSquarePerBoard: oneSquare / Math.max(1, boards.length),
      extremeSumShare:
        boards.filter((b) =>
          b.regions.some(
            (r) => r.type === "sum" && (r.target === 0 || r.target === 6 * r.indices.length)
          )
        ).length / Math.max(1, boards.length),
      regionMix: [...types.entries()]
        .map(([type, n]) => ({ type, share: n / Math.max(1, regions) }))
        .sort((a, b) => b.share - a.share),
      straddleShare: straddling / Math.max(1, dominoes),
      doublesPerBoard: doubles / Math.max(1, boards.length),
      equalsWithDoubleShare: equalsWithDouble / Math.max(1, equals),
      twoSquareEqualsDoubleShare: equals2Double / Math.max(1, equals2),
      lessMedianTarget: median(less),
      greaterMedianTarget: median(greater),
    };
  }

  return {
    puzzles: archive.length,
    firstDate: archive.at(-1)?.date ?? "",
    lastDate: archive[0]?.date ?? "",
    byDifficulty,
    topSumTargets: [...targets.entries()]
      .map(([target, n]) => ({ target, share: n / Math.max(1, sums) }))
      .sort((a, b) => b.share - a.share)
      .slice(0, 5),
    popularTipShare:
      [11, 12, 17, 18].reduce((n, t) => n + (targets.get(t) ?? 0), 0) / Math.max(1, sums),
    constructors: [...makers.entries()]
      .map(([name, boards]) => ({ name, boards }))
      .sort((a, b) => b.boards - a.boards),
  };
});
