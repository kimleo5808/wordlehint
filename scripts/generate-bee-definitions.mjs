/**
 * Generate spelling-bee-definitions.json from the Free Dictionary API.
 * Fetches definitions for the most recent LOOKBACK_DAYS of Spelling Bee
 * answers (used as per-word clues on /spelling-bee-hints-today) and caches
 * them incrementally — words already present are never re-fetched.
 *
 * Usage: node scripts/generate-bee-definitions.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const DAILY_PATH = resolve("data/spelling-bee-daily.json");
const OUTPUT_PATH = resolve("data/spelling-bee-definitions.json");
const API_BASE = "https://api.dictionaryapi.dev/api/v2/entries/en";
const LOOKBACK_DAYS = 3;

let existing = {};
try {
  existing = JSON.parse(readFileSync(OUTPUT_PATH, "utf-8"));
} catch {
  // File doesn't exist yet
}

const daily = JSON.parse(readFileSync(DAILY_PATH, "utf-8"));
const recent = daily.puzzles.slice(-LOOKBACK_DAYS);
const words = [...new Set(recent.flatMap((p) => p.answers))];

console.log(`Words in last ${LOOKBACK_DAYS} puzzles: ${words.length}`);
const missing = words.filter((w) => !(w in existing));
console.log(`Need to fetch: ${missing.length}`);

async function fetchDefinition(word) {
  try {
    const res = await fetch(`${API_BASE}/${word}`);
    if (!res.ok) return null;
    const data = await res.json();
    const def = data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition;
    const partOfSpeech = data?.[0]?.meanings?.[0]?.partOfSpeech || null;
    if (!def) return null;
    return { definition: def, partOfSpeech };
  } catch (err) {
    console.error(`  Error fetching ${word}:`, err.message);
    return null;
  }
}

const BATCH_SIZE = 2;
const DELAY_MS = 1500;
let fetched = 0;

for (let i = 0; i < missing.length; i += BATCH_SIZE) {
  const batch = missing.slice(i, i + BATCH_SIZE);
  const results = await Promise.all(batch.map(fetchDefinition));
  batch.forEach((word, j) => {
    // Cache nulls too, so words the API lacks aren't re-fetched every day.
    existing[word] = results[j];
    if (results[j]) fetched++;
  });
  if (i + BATCH_SIZE < missing.length) {
    await new Promise((r) => setTimeout(r, DELAY_MS));
  }
  process.stdout.write(
    `\r  Progress: ${Math.min(i + BATCH_SIZE, missing.length)}/${missing.length}`
  );
}

console.log(`\nFetched ${fetched} new definitions`);

const sorted = Object.fromEntries(
  Object.entries(existing).sort(([a], [b]) => a.localeCompare(b))
);
writeFileSync(OUTPUT_PATH, JSON.stringify(sorted, null, 2));
console.log(`Total cached words: ${Object.keys(sorted).length}`);
console.log(`Saved to ${OUTPUT_PATH}`);
