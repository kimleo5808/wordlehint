#!/usr/bin/env node

/**
 * update-strands.mjs
 *
 * Refreshes today's NYT Strands puzzle (ET) and prefetches tomorrow's into
 * data/strands-daily.json — see scripts/lib/daily-updater.mjs.
 *
 * Usage: node scripts/update-strands.mjs
 */

import { resolve, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { updateDaily } from "./lib/daily-updater.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/strands-daily.json");
const NYT_API = "https://www.nytimes.com/svc/strands/v2";

const LAUNCH = Date.UTC(2024, 2, 4); // Strands #1 = 2024-03-04

function displayNumber(dateStr) {
  const d = Date.parse(`${dateStr}T00:00:00Z`);
  return Math.round((d - LAUNCH) / 86_400_000) + 1;
}

export async function fetchStrands(dateStr) {
  const res = await fetch(`${NYT_API}/${dateStr}.json`);
  if (!res.ok) throw new Error(`NYT API returned ${res.status} for ${dateStr}`);
  const d = await res.json();
  return {
    date: d.printDate,
    id: displayNumber(d.printDate),
    editor: d.editor || "",
    clue: d.clue || "",
    spangram: String(d.spangram || "").toUpperCase(),
    themeWords: (d.themeWords || []).map((w) => String(w).toUpperCase()),
    board: d.startingBoard || [],
  };
}

// Run only when executed directly — backfill-strands.mjs imports fetchStrands.
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  updateDaily({
    label: "Strands",
    dataPath: DATA_PATH,
    seedHint: "Run 'pnpm run seed:strands' first.",
    fetchPuzzle: fetchStrands,
    validate: (p) =>
      p.spangram.length > 0 && p.themeWords.length > 0 && p.board.length > 0,
  }).catch((err) => {
    console.error("❌ Update failed:", err.message);
    process.exit(1);
  });
}
