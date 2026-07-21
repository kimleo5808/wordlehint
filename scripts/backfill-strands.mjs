#!/usr/bin/env node

/**
 * backfill-strands.mjs
 *
 * One-off backfill: fetches every NYT Strands puzzle between the game's
 * launch (2024-03-04, #1) and the oldest date already in
 * data/strands-daily.json, then merges them in. Idempotent — existing
 * dates are skipped, and progress is saved every 50 puzzles so an
 * interrupted run can simply be restarted.
 *
 * Usage: node scripts/backfill-strands.mjs [--from YYYY-MM-DD] [--to YYYY-MM-DD]
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { fetchStrands } from "./update-strands.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/strands-daily.json");

const LAUNCH = "2024-03-04";
const THROTTLE_MS = 120;
const SAVE_EVERY = 50;

const args = process.argv.slice(2);
const argVal = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : undefined;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function* dateRange(fromStr, toStr) {
  const d = new Date(`${fromStr}T00:00:00Z`);
  const end = new Date(`${toStr}T00:00:00Z`);
  while (d <= end) {
    yield d.toISOString().slice(0, 10);
    d.setUTCDate(d.getUTCDate() + 1);
  }
}

async function main() {
  const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  const existing = new Set(data.puzzles.map((p) => p.date));
  const oldest = data.puzzles.map((p) => p.date).sort()[0];

  const from = argVal("--from") ?? LAUNCH;
  // Default: fill the gap up to (not including) the oldest stored date.
  const to =
    argVal("--to") ??
    new Date(Date.parse(`${oldest}T00:00:00Z`) - 86_400_000)
      .toISOString()
      .slice(0, 10);

  const targets = [...dateRange(from, to)].filter((d) => !existing.has(d));
  console.log(`Backfilling ${targets.length} puzzles (${from} → ${to})…`);

  let added = 0;
  let failed = 0;
  const save = () => {
    data.puzzles.sort((a, b) => a.date.localeCompare(b.date));
    data.lastUpdated = new Date().toISOString();
    writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
  };

  for (const date of targets) {
    try {
      const puzzle = await fetchStrands(date);
      if (
        !puzzle.spangram ||
        puzzle.themeWords.length === 0 ||
        puzzle.board.join("").length !== 48
      ) {
        throw new Error("malformed payload");
      }
      data.puzzles.push(puzzle);
      added++;
      if (added % SAVE_EVERY === 0) {
        save();
        console.log(`  …${added}/${targets.length} (at ${date})`);
      }
    } catch (err) {
      failed++;
      console.warn(`  ⚠ ${date}: ${err.message}`);
    }
    await sleep(THROTTLE_MS);
  }

  save();
  console.log(
    `✅ Done — added ${added}, failed ${failed}, total now ${data.puzzles.length}`
  );
}

main().catch((err) => {
  console.error("❌ Backfill failed:", err.message);
  process.exit(1);
});
