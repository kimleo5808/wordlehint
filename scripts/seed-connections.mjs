#!/usr/bin/env node

/**
 * seed-connections.mjs
 *
 * Backfills data/connections-daily.json from the public Eyefyre mirror of
 * every past NYT Connections puzzle. Run once to seed; daily freshness is
 * handled by update-connections.mjs.
 *
 * Usage: node scripts/seed-connections.mjs
 */

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/connections-daily.json");
const MIRROR =
  "https://raw.githubusercontent.com/Eyefyre/NYT-Connections-Answers/main/connections.json";

// Connections #1 was 2023-06-12.
const LAUNCH = Date.UTC(2023, 5, 12);

function displayNumber(dateStr) {
  const d = Date.parse(`${dateStr}T00:00:00Z`);
  return Math.round((d - LAUNCH) / 86_400_000) + 1;
}

async function main() {
  console.log("Fetching Connections history from mirror…");
  const res = await fetch(MIRROR);
  if (!res.ok) throw new Error(`Mirror returned ${res.status}`);
  const raw = await res.json();

  const puzzles = raw
    .filter((item) => item.date && Array.isArray(item.answers))
    .map((item) => {
      // The mirror always lists groups easiest→hardest, so the array index is
      // the difficulty level. The explicit `level` field is unreliable for
      // puzzles after the Sept 2025 NYT API change (it becomes -1), so we
      // derive the level from position instead.
      const groups = item.answers.map((a, level) => ({
        level,
        name: String(a.group).toUpperCase(),
        words: a.members.map((m) => String(m).toUpperCase()),
      }));
      return {
        date: item.date,
        id: displayNumber(item.date),
        editor: "Wyna Liu",
        groups,
      };
    })
    .filter((p) => p.groups.length === 4)
    .sort((a, b) => a.date.localeCompare(b.date));

  const data = {
    lastUpdated: new Date().toISOString(),
    puzzles,
  };

  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
  console.log(`✅ Seeded ${puzzles.length} Connections puzzles`);
  console.log(`Date range: ${puzzles[0].date} → ${puzzles.at(-1).date}`);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
