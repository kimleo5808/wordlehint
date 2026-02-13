#!/usr/bin/env node

/**
 * update-wordle.mjs
 *
 * Fetches today's Wordle puzzle from NYT API and appends to data/wordle-daily.json.
 * Designed to run daily via GitHub Actions cron.
 *
 * Usage: node scripts/update-wordle.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/wordle-daily.json");
const NYT_API = "https://www.nytimes.com/svc/wordle/v2";

function toEasternDate() {
  return new Date()
    .toLocaleDateString("en-CA", { timeZone: "America/New_York" })
    .slice(0, 10);
}

async function fetchPuzzle(dateStr) {
  const url = `${NYT_API}/${dateStr}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`NYT API returned ${res.status} for ${dateStr}`);
  const data = await res.json();
  return {
    date: data.print_date,
    id: data.id,
    answer: data.solution.toUpperCase(),
    editor: data.editor || "",
  };
}

async function main() {
  const today = toEasternDate();

  // Load existing data
  if (!existsSync(DATA_PATH)) {
    console.error("❌ data/wordle-daily.json not found. Run 'pnpm run seed:wordle' first.");
    process.exit(1);
  }

  const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  const existingDates = new Set(data.puzzles.map((p) => p.date));

  if (existingDates.has(today)) {
    const todayPuzzle = data.puzzles.find((p) => p.date === today);
    console.log(`✅ Today's puzzle already exists: #${todayPuzzle.id} (${today}) — ${todayPuzzle.answer}`);
    console.log(`Total puzzles: ${data.puzzles.length}`);
    return;
  }

  // Fetch today's puzzle
  console.log(`Fetching puzzle for ${today}...`);
  const puzzle = await fetchPuzzle(today);
  console.log(`✅ Fetched: #${puzzle.id} — ${puzzle.answer}`);

  // Append and sort
  data.puzzles.push(puzzle);
  data.puzzles.sort((a, b) => a.date.localeCompare(b.date));
  data.lastUpdated = new Date().toISOString();

  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");

  console.log(`✅ Updated data/wordle-daily.json`);
  console.log(`Total puzzles: ${data.puzzles.length}`);
  console.log(`Date range: ${data.puzzles[0].date} → ${data.puzzles.at(-1).date}`);
}

main().catch((err) => {
  console.error("❌ Update failed:", err.message);
  process.exit(1);
});
