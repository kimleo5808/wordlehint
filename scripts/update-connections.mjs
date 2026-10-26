#!/usr/bin/env node

/**
 * update-connections.mjs
 *
 * Refreshes today's NYT Connections puzzle (ET) and prefetches tomorrow's
 * into data/connections-daily.json — see scripts/lib/daily-updater.mjs.
 * Runs in the deploy workflow.
 *
 * Usage: node scripts/update-connections.mjs
 */

import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { updateDaily } from "./lib/daily-updater.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/connections-daily.json");
const NYT_API = "https://www.nytimes.com/svc/connections/v2";

const LAUNCH = Date.UTC(2023, 5, 12); // Connections #1 = 2023-06-12

function displayNumber(dateStr) {
  const d = Date.parse(`${dateStr}T00:00:00Z`);
  return Math.round((d - LAUNCH) / 86_400_000) + 1;
}

async function fetchPuzzle(dateStr) {
  const res = await fetch(`${NYT_API}/${dateStr}.json`);
  if (!res.ok) throw new Error(`NYT API returned ${res.status} for ${dateStr}`);
  const data = await res.json();
  // V2 returns categories ordered easiest→hardest (yellow→purple).
  const groups = data.categories.map((cat, level) => ({
    level,
    name: String(cat.title).toUpperCase(),
    words: cat.cards
      .map((c) => String(c.content).toUpperCase()),
  }));
  return {
    date: data.print_date,
    id: displayNumber(data.print_date),
    editor: data.editor || "Wyna Liu",
    groups,
  };
}

updateDaily({
  label: "Connections",
  dataPath: DATA_PATH,
  seedHint: "Run 'pnpm run seed:connections' first.",
  fetchPuzzle,
  validate: (p) => p.groups.length === 4,
}).catch((err) => {
  console.error("❌ Update failed:", err.message);
  process.exit(1);
});
