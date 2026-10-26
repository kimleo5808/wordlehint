#!/usr/bin/env node

/**
 * update-spelling-bee.mjs
 *
 * Refreshes today's NYT Spelling Bee (ET) and prefetches tomorrow's into
 * data/spelling-bee-daily.json — see scripts/lib/daily-updater.mjs. The site
 * itself only rolls over at 3 AM ET (lib/spelling-bee-daily.ts).
 *
 * The v1 endpoint's `answers` array excludes pangrams — they are merged
 * here so `answers` always holds the complete word list.
 *
 * Usage: node scripts/update-spelling-bee.mjs
 */

import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { updateDaily } from "./lib/daily-updater.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/spelling-bee-daily.json");
const NYT_API = "https://www.nytimes.com/svc/spelling-bee/v1";

export async function fetchSpellingBee(dateStr) {
  const res = await fetch(`${NYT_API}/${dateStr}.json`);
  if (!res.ok) throw new Error(`NYT API returned ${res.status} for ${dateStr}`);
  const data = await res.json();
  const pangrams = data.pangrams.map((w) => String(w).toLowerCase());
  const answers = Array.from(
    new Set([...data.answers.map((w) => String(w).toLowerCase()), ...pangrams])
  ).sort();
  return {
    date: data.print_date,
    id: data.id,
    centerLetter: String(data.center_letter).toLowerCase(),
    outerLetters: String(data.outer_letters).toLowerCase().split(""),
    pangrams,
    answers,
    editor: data.editor || "Sam Ezersky",
  };
}

export function validatePuzzle(puzzle) {
  return (
    puzzle.centerLetter.length === 1 &&
    puzzle.outerLetters.length === 6 &&
    puzzle.pangrams.length >= 1 &&
    puzzle.answers.length >= puzzle.pangrams.length &&
    puzzle.pangrams.every((p) => puzzle.answers.includes(p))
  );
}

const isDirectRun =
  process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);

if (isDirectRun) {
  updateDaily({
    label: "Spelling Bee",
    dataPath: DATA_PATH,
    seedHint: "Run 'pnpm run seed:spelling-bee' first.",
    fetchPuzzle: fetchSpellingBee,
    validate: validatePuzzle,
  }).catch((err) => {
    console.error("❌ Update failed:", err.message);
    process.exit(1);
  });
}
