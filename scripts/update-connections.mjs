#!/usr/bin/env node

/**
 * update-connections.mjs
 *
 * Fetches today's NYT Connections puzzle and appends it to
 * data/connections-daily.json if missing. Mirrors update-wordle.mjs.
 * Designed to run daily via GitHub Actions cron.
 *
 * Usage: node scripts/update-connections.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/connections-daily.json");
const NYT_API = "https://www.nytimes.com/svc/connections/v2";

const LAUNCH = Date.UTC(2023, 5, 12); // Connections #1 = 2023-06-12

function toEasternDate() {
  return new Date()
    .toLocaleDateString("en-CA", { timeZone: "America/New_York" })
    .slice(0, 10);
}

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

async function main() {
  const today = toEasternDate();

  if (!existsSync(DATA_PATH)) {
    console.error(
      "❌ data/connections-daily.json not found. Run 'pnpm run seed:connections' first."
    );
    process.exit(1);
  }

  const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  const existingDates = new Set(data.puzzles.map((p) => p.date));

  if (existingDates.has(today)) {
    const p = data.puzzles.find((x) => x.date === today);
    console.log(`✅ Today's Connections already exists: #${p.id} (${today})`);
    console.log(`Total puzzles: ${data.puzzles.length}`);
    return;
  }

  console.log(`Fetching Connections for ${today}…`);
  const puzzle = await fetchPuzzle(today);
  if (puzzle.groups.length !== 4) {
    throw new Error(`Expected 4 groups, got ${puzzle.groups.length}`);
  }
  console.log(`✅ Fetched: #${puzzle.id} (editor ${puzzle.editor})`);

  data.puzzles.push(puzzle);
  data.puzzles.sort((a, b) => a.date.localeCompare(b.date));
  data.lastUpdated = new Date().toISOString();

  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
  console.log(`✅ Updated data/connections-daily.json`);
  console.log(`Total puzzles: ${data.puzzles.length}`);
}

main().catch((err) => {
  console.error("❌ Update failed:", err.message);
  process.exit(1);
});
