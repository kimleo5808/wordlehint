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
  regionMix: { type: string; share: number }[];
}

export interface PipsStats {
  puzzles: number;
  firstDate: string;
  lastDate: string;
  byDifficulty: Record<PipsDifficulty, PipsDifficultyStats>;
  /** Targets of multi-square sum regions, most common first. */
  topSumTargets: { target: number; share: number }[];
  constructors: { name: string; boards: number }[];
}

const LEVELS: PipsDifficulty[] = ["easy", "medium", "hard"];

export const getPipsStats = cache((): PipsStats => {
  const archive = getArchivePips(); // newest first
  const byDifficulty = {} as Record<PipsDifficulty, PipsDifficultyStats>;
  const targets = new Map<number, number>();
  let sums = 0;
  const makers = new Map<string, number>();

  for (const lvl of LEVELS) {
    const boards = archive.map((p) => p[lvl]);
    const counts = boards.map((b) => b.dominoes.length);
    const types = new Map<string, number>();
    let regions = 0;
    for (const b of boards) {
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
      regionMix: [...types.entries()]
        .map(([type, n]) => ({ type, share: n / Math.max(1, regions) }))
        .sort((a, b) => b.share - a.share),
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
    constructors: [...makers.entries()]
      .map(([name, boards]) => ({ name, boards }))
      .sort((a, b) => b.boards - a.boards),
  };
});
