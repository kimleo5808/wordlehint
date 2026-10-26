#!/usr/bin/env node

/**
 * generate-connections-word-index.mjs
 *
 * Writes public/data/connections-words.json, the data behind the word
 * lookup on /connections-stats: every word's appearances (puzzle + colour)
 * plus the puzzle and category tables they point into. Only puzzles before
 * today (ET) are included, so neither today's grid nor the prefetched
 * tomorrow is ever exposed. Runs before every `next build` (see
 * package.json); output is gitignored and scanned by check-future-leak.mjs.
 *
 * Shape (kept compact — it's ~9k words):
 *   { pagesFrom, puzzles: [[id, date]], categories: [name] (puzzle * 4 + level),
 *     words: { WORD: [puzzleIndex, level, puzzleIndex, level, …] } }
 *
 * Usage: node scripts/generate-connections-word-index.mjs
 */

import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { toEasternDate } from "./lib/daily-updater.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public", "data");

const today = toEasternDate();
const puzzles = JSON.parse(readFileSync(join(ROOT, "data", "connections-daily.json"), "utf-8"))
  .puzzles.filter((p) => p.date < today)
  .sort((a, b) => a.date.localeCompare(b.date));
const pagesFrom = JSON.parse(readFileSync(join(ROOT, "data", "date-pages.json"), "utf-8")).connections;

const categories = [];
const words = {};
puzzles.forEach((p, i) => {
  const byLevel = [...p.groups].sort((a, b) => a.level - b.level);
  for (let level = 0; level < 4; level++) {
    const g = byLevel.find((x) => x.level === level);
    categories[i * 4 + level] = g ? g.name : "";
    for (const w of g ? g.words : []) (words[w] ??= []).push(i, level);
  }
});

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(
  join(OUT_DIR, "connections-words.json"),
  JSON.stringify({
    pagesFrom,
    puzzles: puzzles.map((p) => [p.id, p.date]),
    categories,
    words,
  })
);
console.log(
  `connections word index: ${Object.keys(words).length} words from ${puzzles.length} puzzles before ${today}`
);
