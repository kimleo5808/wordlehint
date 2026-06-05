#!/usr/bin/env node

/**
 * seed-strands.mjs
 *
 * Seeds data/strands-daily.json by fetching a recent window of NYT Strands
 * puzzles (there is no public full-history mirror). Daily freshness is then
 * handled by update-strands.mjs.
 *
 * Usage: node scripts/seed-strands.mjs [days]   (default 45)
 */

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { fetchStrands } from "./update-strands.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/strands-daily.json");

function easternToday() {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "America/New_York",
  });
}

function addDays(dateStr, delta) {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

async function main() {
  const days = Number(process.argv[2]) || 45;
  const today = easternToday();
  const puzzles = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = addDays(today, -i);
    try {
      puzzles.push(await fetchStrands(date));
      process.stdout.write(".");
    } catch {
      // Missing day — skip quietly.
    }
  }
  process.stdout.write("\n");

  puzzles.sort((a, b) => a.date.localeCompare(b.date));
  writeFileSync(
    DATA_PATH,
    JSON.stringify({ lastUpdated: new Date().toISOString(), puzzles }, null, 2),
    "utf-8"
  );
  console.log(`✅ Seeded ${puzzles.length} Strands puzzles`);
  if (puzzles.length)
    console.log(`Range: ${puzzles[0].date} → ${puzzles.at(-1).date}`);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
