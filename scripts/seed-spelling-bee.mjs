#!/usr/bin/env node

/**
 * seed-spelling-bee.mjs
 *
 * Seeds / backfills data/spelling-bee-daily.json from the NYT v1 endpoint.
 * Creates the file if missing. Idempotent — existing dates are skipped, and
 * progress is saved every 50 puzzles so an interrupted run can be restarted.
 *
 * Usage: node scripts/seed-spelling-bee.mjs [--from YYYY-MM-DD] [--to YYYY-MM-DD]
 * Defaults: --from 2024-01-01, --to today (America/New_York).
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { fetchSpellingBee, validatePuzzle } from "./update-spelling-bee.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/spelling-bee-daily.json");

const DEFAULT_FROM = "2024-01-01";
const THROTTLE_MS = 120;
const SAVE_EVERY = 50;

const args = process.argv.slice(2);
const argVal = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : undefined;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function toEasternDate() {
  return new Date()
    .toLocaleDateString("en-CA", { timeZone: "America/New_York" })
    .slice(0, 10);
}

function* dateRange(fromStr, toStr) {
  const d = new Date(`${fromStr}T00:00:00Z`);
  const end = new Date(`${toStr}T00:00:00Z`);
  while (d <= end) {
    yield d.toISOString().slice(0, 10);
    d.setUTCDate(d.getUTCDate() + 1);
  }
}

async function main() {
  const data = existsSync(DATA_PATH)
    ? JSON.parse(readFileSync(DATA_PATH, "utf-8"))
    : { lastUpdated: "", puzzles: [] };
  const existing = new Set(data.puzzles.map((p) => p.date));

  const from = argVal("--from") ?? DEFAULT_FROM;
  const to = argVal("--to") ?? toEasternDate();

  const targets = [...dateRange(from, to)].filter((d) => !existing.has(d));
  console.log(`Seeding ${targets.length} puzzles (${from} → ${to})…`);

  let added = 0;
  let failed = 0;
  const save = () => {
    data.puzzles.sort((a, b) => a.date.localeCompare(b.date));
    data.lastUpdated = new Date().toISOString();
    writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
  };

  for (const date of targets) {
    try {
      const puzzle = await fetchSpellingBee(date);
      if (!validatePuzzle(puzzle)) throw new Error("malformed payload");
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
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
