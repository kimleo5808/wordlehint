#!/usr/bin/env node

/**
 * generate-pips-archive.mjs
 *
 * Writes the data behind the /pips-answers archive explorer:
 *   public/data/pips/index.json   — months and their dates
 *   public/data/pips/<YYYY-MM>.json — that month's boards and solutions
 * Only puzzles before today (ET) are included, like the other archives, so
 * neither today's solutions nor the prefetched tomorrow are ever exposed.
 * Runs before every `next build` (see package.json); output is gitignored.
 *
 * Usage: node scripts/generate-pips-archive.mjs
 */

import { mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { toEasternDate } from "./lib/daily-updater.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "data", "pips");

const today = toEasternDate();
const puzzles = JSON.parse(readFileSync(join(ROOT, "data", "pips-daily.json"), "utf-8"))
  .puzzles.filter((p) => p.date < today);

const months = new Map();
for (const p of puzzles) {
  const m = p.date.slice(0, 7);
  if (!months.has(m)) months.set(m, []);
  months.get(m).push(p);
}

mkdirSync(OUT, { recursive: true });
for (const name of readdirSync(OUT)) unlinkSync(join(OUT, name)); // no stale files

const strip = (b) => ({
  constructors: b.constructors,
  dominoes: b.dominoes,
  regions: b.regions,
  solution: b.solution,
});
for (const [m, list] of months) {
  writeFileSync(
    join(OUT, `${m}.json`),
    JSON.stringify(
      list.map((p) => ({
        date: p.date,
        id: p.id,
        easy: strip(p.easy),
        medium: strip(p.medium),
        hard: strip(p.hard),
      }))
    )
  );
}
writeFileSync(
  join(OUT, "index.json"),
  JSON.stringify(
    [...months.entries()]
      .reverse()
      .map(([month, list]) => ({ month, days: list.map((p) => [p.date, p.id]).reverse() }))
  )
);
console.log(`✅ data/pips/: ${months.size} months, ${puzzles.length} puzzles (before ${today})`);
