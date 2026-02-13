#!/usr/bin/env node

/**
 * seed-wordle-answers.mjs
 *
 * Fetches the last 5 months of Wordle puzzles from NYT API
 * and generates data/wordle-daily.json
 *
 * Usage: node scripts/seed-wordle-answers.mjs
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, "../data");
const DATA_PATH = resolve(DATA_DIR, "wordle-daily.json");

const NYT_API = "https://www.nytimes.com/svc/wordle/v2";
const SEED_DAYS = 150; // ~5 months
const DELAY_MS = 100; // polite delay between requests

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function formatDate(d) {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

async function fetchPuzzle(dateStr) {
  const url = `${NYT_API}/${dateStr}.json`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      date: data.print_date,
      id: data.id,
      answer: data.solution.toUpperCase(),
      editor: data.editor || "",
    };
  } catch {
    return null;
  }
}

async function main() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }

  // Load existing data if present
  let existing = [];
  if (existsSync(DATA_PATH)) {
    try {
      const raw = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
      existing = raw.puzzles || [];
      console.log(`Found existing data: ${existing.length} puzzles`);
    } catch {
      existing = [];
    }
  }

  const existingDates = new Set(existing.map((p) => p.date));

  // Generate dates for last SEED_DAYS days
  const today = new Date();
  const dates = [];
  for (let i = SEED_DAYS - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    const dateStr = formatDate(d);
    if (!existingDates.has(dateStr)) {
      dates.push(dateStr);
    }
  }

  console.log(`Need to fetch ${dates.length} new puzzles...`);

  let fetched = 0;
  let failed = 0;
  const newPuzzles = [];

  for (const dateStr of dates) {
    const puzzle = await fetchPuzzle(dateStr);
    if (puzzle) {
      newPuzzles.push(puzzle);
      fetched++;
      process.stdout.write(`\r  Fetched ${fetched}/${dates.length} (failed: ${failed})`);
    } else {
      failed++;
      process.stdout.write(`\r  Fetched ${fetched}/${dates.length} (failed: ${failed})`);
    }
    await sleep(DELAY_MS);
  }

  console.log(""); // newline

  // Merge and sort by date
  const allPuzzles = [...existing, ...newPuzzles].sort(
    (a, b) => a.date.localeCompare(b.date)
  );

  // Deduplicate by date
  const seen = new Set();
  const deduplicated = allPuzzles.filter((p) => {
    if (seen.has(p.date)) return false;
    seen.add(p.date);
    return true;
  });

  const output = {
    lastUpdated: new Date().toISOString(),
    puzzles: deduplicated,
  };

  writeFileSync(DATA_PATH, JSON.stringify(output, null, 2), "utf-8");

  console.log("\n=== Seed Complete ===");
  console.log(`Total puzzles: ${deduplicated.length}`);
  console.log(`New fetched:   ${fetched}`);
  console.log(`Failed:        ${failed}`);
  if (deduplicated.length > 0) {
    console.log(`Date range:    ${deduplicated[0].date} → ${deduplicated.at(-1).date}`);
  }
  console.log(`Written:       ${DATA_PATH}`);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
