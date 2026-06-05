#!/usr/bin/env node

/**
 * update-strands.mjs
 *
 * Fetches today's NYT Strands puzzle and appends it to
 * data/strands-daily.json if missing. Mirrors update-connections.mjs.
 *
 * Usage: node scripts/update-strands.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/strands-daily.json");
const NYT_API = "https://www.nytimes.com/svc/strands/v2";

const LAUNCH = Date.UTC(2024, 2, 4); // Strands #1 = 2024-03-04

function toEasternDate() {
  return new Date()
    .toLocaleDateString("en-CA", { timeZone: "America/New_York" })
    .slice(0, 10);
}

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

async function main() {
  const today = toEasternDate();

  if (!existsSync(DATA_PATH)) {
    console.error(
      "❌ data/strands-daily.json not found. Run 'pnpm run seed:strands' first."
    );
    process.exit(1);
  }

  const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  const existingDates = new Set(data.puzzles.map((p) => p.date));

  if (existingDates.has(today)) {
    const p = data.puzzles.find((x) => x.date === today);
    console.log(`✅ Today's Strands already exists: #${p.id} (${today})`);
    return;
  }

  console.log(`Fetching Strands for ${today}…`);
  const puzzle = await fetchStrands(today);
  console.log(`✅ Fetched: #${puzzle.id} — spangram ${puzzle.spangram}`);

  data.puzzles.push(puzzle);
  data.puzzles.sort((a, b) => a.date.localeCompare(b.date));
  data.lastUpdated = new Date().toISOString();

  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
  console.log(`✅ Updated data/strands-daily.json (${data.puzzles.length} total)`);
}

main().catch((err) => {
  console.error("❌ Update failed:", err.message);
  process.exit(1);
});
