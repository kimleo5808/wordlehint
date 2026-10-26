#!/usr/bin/env node

/**
 * update-wordle.mjs
 *
 * Refreshes today's Wordle (ET) and prefetches tomorrow's from the NYT API
 * into data/wordle-daily.json — see scripts/lib/daily-updater.mjs.
 * Runs in the deploy workflow; Wordle is the hard dependency, so a missing,
 * unfetchable today fails the run.
 *
 * Usage: node scripts/update-wordle.mjs
 */

import { resolve, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { updateDaily } from "./lib/daily-updater.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/wordle-daily.json");
const NYT_API = "https://www.nytimes.com/svc/wordle/v2";

export async function fetchPuzzle(dateStr, init = {}) {
  const url = `${NYT_API}/${dateStr}.json`;
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`NYT API returned ${res.status} for ${dateStr}`);
  const data = await res.json();
  return {
    date: data.print_date,
    // The displayed Wordle puzzle number is `days_since_launch`, NOT `id`
    // (`id` is an internal CMS id that is effectively random).
    id: data.days_since_launch,
    answer: data.solution.toUpperCase(),
    editor: data.editor || "",
  };
}

// Run only when executed directly — backfill-wordle.mjs imports fetchPuzzle.
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  updateDaily({
    label: "Wordle",
    dataPath: DATA_PATH,
    seedHint: "Run 'pnpm run seed:wordle' first.",
    fetchPuzzle,
    validate: (p) => /^[A-Z]{5}$/.test(p.answer),
  }).catch((err) => {
    console.error("❌ Update failed:", err.message);
    process.exit(1);
  });
}
