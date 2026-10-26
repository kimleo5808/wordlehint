#!/usr/bin/env node

/**
 * backfill-wordle.mjs
 *
 * Fills data/wordle-daily.json with every Wordle from #0 (2021-06-19) up to
 * the day before the earliest stored puzzle, using the same transform as
 * update-wordle.mjs. Existing dates are skipped, so it can be re-run.
 *
 * Backfilled data does NOT create pages: lib/wordle-daily.ts only exposes
 * puzzles from data/date-pages.json "wordle" onward to the existing pages;
 * the full history is read via getFullWordleHistory() (e.g. /wordle-repeats).
 *
 * Usage: node scripts/backfill-wordle.mjs [--from YYYY-MM-DD] [--to YYYY-MM-DD]
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { addDays } from "./lib/daily-updater.mjs";
import { fetchPuzzle } from "./update-wordle.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/wordle-daily.json");
const LAUNCH = "2021-06-19"; // Wordle #0
const CONCURRENCY = 6;
// Without a timeout a stalled connection blocks its worker forever (seen
// through the local proxy); aborting closes the socket so the retry runs.
const REQUEST_TIMEOUT_MS = 20_000;

const args = process.argv.slice(2);
const argVal = (name) => {
  const i = args.indexOf(name);
  return i > -1 ? args[i + 1] : undefined;
};

async function main() {
  const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  const have = new Set(data.puzzles.map((p) => p.date));
  const earliest = data.puzzles.map((p) => p.date).sort()[0];
  const from = argVal("--from") ?? LAUNCH;
  const to = argVal("--to") ?? addDays(earliest, -1);

  const dates = [];
  for (let d = from; d <= to; d = addDays(d, 1)) if (!have.has(d)) dates.push(d);
  console.log(`Backfilling ${dates.length} Wordle puzzles (${from} → ${to})…`);

  const fetched = [];
  let failed = 0;
  let next = 0;
  async function worker() {
    while (next < dates.length) {
      const date = dates[next++];
      for (let attempt = 1; ; attempt++) {
        try {
          const p = await fetchPuzzle(date, {
            signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
          });
          if (p.date !== date) throw new Error(`asked for ${date}, got ${p.date}`);
          if (!/^[A-Z]{5}$/.test(p.answer)) throw new Error("malformed answer");
          fetched.push(p);
          if (fetched.length % 200 === 0) {
            console.log(`  … ${fetched.length}/${dates.length}`);
          }
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

  // With every date fetched, puzzle numbers must run without gaps. After
  // failures, save what we have — a re-run only fetches the missing dates.
  if (!failed) {
    const gaps = data.puzzles.filter(
      (p, i) => i > 0 && p.id !== data.puzzles[i - 1].id + 1
    );
    if (gaps.length) {
      throw new Error(`numbering gaps at ${gaps.map((p) => p.date).join(", ")}`);
    }
  } else {
    console.warn(`⚠️  ${failed} dates failed — saving the rest; re-run to fill them.`);
  }

  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
  console.log(
    `✅ Added ${fetched.length}, failed ${failed}, total ${data.puzzles.length} (#${data.puzzles[0].id} → #${data.puzzles.at(-1).id})`
  );
  process.exit(failed ? 1 : 0);
}

main().catch((err) => {
  console.error("❌ Backfill failed:", err.message);
  process.exit(1);
});
