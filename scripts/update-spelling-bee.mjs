#!/usr/bin/env node

/**
 * update-spelling-bee.mjs
 *
 * Fetches today's NYT Spelling Bee puzzle and appends it to
 * data/spelling-bee-daily.json if missing. Mirrors update-connections.mjs.
 * Designed to run daily via GitHub Actions cron.
 *
 * The v1 endpoint's `answers` array excludes pangrams — they are merged
 * here so `answers` always holds the complete word list.
 *
 * Usage: node scripts/update-spelling-bee.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/spelling-bee-daily.json");
const NYT_API = "https://www.nytimes.com/svc/spelling-bee/v1";

function toEasternDate() {
  return new Date()
    .toLocaleDateString("en-CA", { timeZone: "America/New_York" })
    .slice(0, 10);
}

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

async function main() {
  const today = toEasternDate();

  if (!existsSync(DATA_PATH)) {
    console.error(
      "❌ data/spelling-bee-daily.json not found. Run 'pnpm run seed:spelling-bee' first."
    );
    process.exit(1);
  }

  const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  const existingDates = new Set(data.puzzles.map((p) => p.date));

  if (existingDates.has(today)) {
    const p = data.puzzles.find((x) => x.date === today);
    console.log(`✅ Today's Spelling Bee already exists: ${today} (${p.answers.length} words)`);
    console.log(`Total puzzles: ${data.puzzles.length}`);
    return;
  }

  console.log(`Fetching Spelling Bee for ${today}…`);
  const puzzle = await fetchSpellingBee(today);
  if (!validatePuzzle(puzzle)) {
    throw new Error("malformed payload");
  }
  console.log(
    `✅ Fetched: ${puzzle.date} — ${puzzle.answers.length} words, ${puzzle.pangrams.length} pangram(s)`
  );

  data.puzzles.push(puzzle);
  data.puzzles.sort((a, b) => a.date.localeCompare(b.date));
  data.lastUpdated = new Date().toISOString();

  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
  console.log(`✅ Updated data/spelling-bee-daily.json`);
  console.log(`Total puzzles: ${data.puzzles.length}`);
}

const isDirectRun =
  process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);

if (isDirectRun) {
  main().catch((err) => {
    console.error("❌ Update failed:", err.message);
    process.exit(1);
  });
}
