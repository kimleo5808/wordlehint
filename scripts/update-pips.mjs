#!/usr/bin/env node

/**
 * update-pips.mjs
 *
 * Refreshes today's NYT Pips (all three difficulties) and prefetches
 * tomorrow's into data/pips-daily.json — see scripts/lib/daily-updater.mjs.
 *
 * Usage: node scripts/update-pips.mjs
 */

import { resolve, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { puzzlePerLineJson, updateDaily } from "./lib/daily-updater.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/pips-daily.json");
const NYT_API = "https://www.nytimes.com/svc/pips/v1";

const LAUNCH = Date.UTC(2025, 7, 18); // Pips #1 = 2025-08-18

function displayNumber(dateStr) {
  const d = Date.parse(`${dateStr}T00:00:00Z`);
  return Math.round((d - LAUNCH) / 86_400_000) + 1;
}

function board(b) {
  return {
    id: b.id,
    constructors: String(b.constructors || "").trim(),
    dominoes: b.dominoes,
    regions: b.regions.map((r) => ({
      indices: r.indices,
      type: r.type,
      ...(r.target !== undefined ? { target: r.target } : {}),
    })),
    solution: b.solution,
  };
}

export async function fetchPips(dateStr, init = {}) {
  const res = await fetch(`${NYT_API}/${dateStr}.json`, init);
  if (!res.ok) throw new Error(`NYT API returned ${res.status} for ${dateStr}`);
  const d = await res.json();
  return {
    date: d.printDate,
    id: displayNumber(d.printDate),
    editor: d.editor || "",
    easy: board(d.easy),
    medium: board(d.medium),
    hard: board(d.hard),
  };
}

/** Every board present, one solution pair per domino, solution satisfies
 *  every region (a malformed payload must never reach the site). */
export function validatePips(p) {
  return ["easy", "medium", "hard"].every((lvl) => {
    const b = p[lvl];
    if (!b || !b.dominoes.length || b.solution.length !== b.dominoes.length) {
      return false;
    }
    const value = new Map();
    b.solution.forEach(([c1, c2], i) => {
      value.set(c1.join(","), b.dominoes[i][0]);
      value.set(c2.join(","), b.dominoes[i][1]);
    });
    return b.regions.every((r) => {
      const v = r.indices.map((c) => value.get(c.join(",")));
      if (v.some((x) => x === undefined)) return false;
      const sum = v.reduce((a, x) => a + x, 0);
      switch (r.type) {
        case "sum": return sum === r.target;
        case "equals": return v.every((x) => x === v[0]);
        case "unequal": return new Set(v).size === v.length;
        case "less": return sum < r.target;
        case "greater": return sum > r.target;
        default: return true;
      }
    });
  });
}

// Run only when executed directly — backfill-pips.mjs imports fetchPips.
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  updateDaily({
    label: "Pips",
    dataPath: DATA_PATH,
    seedHint: "Run 'node scripts/backfill-pips.mjs' first.",
    fetchPuzzle: fetchPips,
    validate: validatePips,
    serialize: puzzlePerLineJson,
  }).catch((err) => {
    console.error("❌ Update failed:", err.message);
    process.exit(1);
  });
}
