#!/usr/bin/env node

/**
 * backfill-pips.mjs
 *
 * Creates / fills data/pips-daily.json with every NYT Pips since #1
 * (2025-08-18) up to yesterday (ET), using update-pips.mjs's transform and
 * validation. Existing dates are skipped, so it can be re-run.
 *
 * Usage: node scripts/backfill-pips.mjs [--from YYYY-MM-DD] [--to YYYY-MM-DD]
 */

import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { addDays, puzzlePerLineJson, toEasternDate } from "./lib/daily-updater.mjs";
import { fetchPips, validatePips } from "./update-pips.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/pips-daily.json");
const LAUNCH = "2025-08-18"; // Pips #1
const CONCURRENCY = 6;
const REQUEST_TIMEOUT_MS = 20_000;

const args = process.argv.slice(2);
const argVal = (name) => {
  const i = args.indexOf(name);
  return i > -1 ? args[i + 1] : undefined;
};

async function main() {
  const data = existsSync(DATA_PATH)
    ? JSON.parse(readFileSync(DATA_PATH, "utf-8"))
    : { lastUpdated: "", puzzles: [] };
  const have = new Set(data.puzzles.map((p) => p.date));
  const from = argVal("--from") ?? LAUNCH;
  const to = argVal("--to") ?? addDays(toEasternDate(), -1);

  const dates = [];
  for (let d = from; d <= to; d = addDays(d, 1)) if (!have.has(d)) dates.push(d);
  console.log(`Backfilling ${dates.length} Pips puzzles (${from} → ${to})…`);

  const fetched = [];
  let failed = 0;
  let next = 0;
  async function worker() {
    while (next < dates.length) {
      const date = dates[next++];
      for (let attempt = 1; ; attempt++) {
        try {
          const p = await fetchPips(date, {
            signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
          });
          if (p.date !== date) throw new Error(`asked for ${date}, got ${p.date}`);
          if (!validatePips(p)) throw new Error("malformed payload");
          fetched.push(p);
          if (fetched.length % 100 === 0) console.log(`  … ${fetched.length}/${dates.length}`);
          break;
        } catch (err) {
          if (attempt === 3) {
            failed++;
            console.error(`⚠️  ${date}: ${err.message}`);
            break;
          }
        }
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  data.puzzles.push(...fetched);
  data.puzzles.sort((a, b) => a.date.localeCompare(b.date));
  if (fetched.length) data.lastUpdated = new Date().toISOString();
  writeFileSync(DATA_PATH, puzzlePerLineJson(data), "utf-8");
  console.log(
    `✅ Added ${fetched.length}, failed ${failed}, total ${data.puzzles.length}` +
      (failed ? " — re-run to fill the failed dates" : "")
  );
  process.exit(failed ? 1 : 0);
}

main().catch((err) => {
  console.error("❌ Backfill failed:", err.message);
  process.exit(1);
});
