/**
 * Generate wordle-definitions.json from Free Dictionary API
 * Usage: node scripts/generate-definitions.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const DAILY_PATH = resolve("data/wordle-daily.json");
const OUTPUT_PATH = resolve("data/wordle-definitions.json");
const API_BASE = "https://api.dictionaryapi.dev/api/v2/entries/en";

// Load existing definitions if any
let existing = {};
try {
  existing = JSON.parse(readFileSync(OUTPUT_PATH, "utf-8"));
} catch {
  // File doesn't exist yet
}

// Load all answer words
const daily = JSON.parse(readFileSync(DAILY_PATH, "utf-8"));
const words = [...new Set(daily.puzzles.map((p) => p.answer.toUpperCase()))];

console.log(`Total unique words: ${words.length}`);
console.log(`Already have definitions: ${Object.keys(existing).length}`);

const missing = words.filter((w) => !existing[w]);
console.log(`Need to fetch: ${missing.length}`);

async function fetchDefinition(word) {
  try {
    const res = await fetch(`${API_BASE}/${word.toLowerCase()}`);
    if (!res.ok) return null;

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const entry = data[0];
    const meanings = entry.meanings || [];

    // Get first meaning
    const firstMeaning = meanings[0];
    if (!firstMeaning) return null;

    const firstDef = firstMeaning.definitions?.[0];
    if (!firstDef) return null;

    // Get origin/etymology
    const origin = entry.origin || null;

    // Collect all parts of speech with definitions
    const allDefs = meanings.slice(0, 2).map((m) => ({
      partOfSpeech: m.partOfSpeech,
      definition: m.definitions?.[0]?.definition || "",
      example: m.definitions?.[0]?.example || null,
    }));

    return {
      definition: firstDef.definition,
      partOfSpeech: firstMeaning.partOfSpeech,
      example: firstDef.example || null,
      origin: origin,
      meanings: allDefs,
    };
  } catch (err) {
    console.error(`  Error fetching ${word}:`, err.message);
    return null;
  }
}

// Fetch in batches to avoid rate limiting
const BATCH_SIZE = 2;
const DELAY_MS = 1500;
let fetched = 0;

for (let i = 0; i < missing.length; i += BATCH_SIZE) {
  const batch = missing.slice(i, i + BATCH_SIZE);
  const results = await Promise.all(batch.map(fetchDefinition));

  for (let j = 0; j < batch.length; j++) {
    if (results[j]) {
      existing[batch[j]] = results[j];
      fetched++;
    } else {
      console.log(`  No definition found for: ${batch[j]}`);
    }
  }

  if (i + BATCH_SIZE < missing.length) {
    await new Promise((r) => setTimeout(r, DELAY_MS));
  }

  process.stdout.write(`\r  Progress: ${Math.min(i + BATCH_SIZE, missing.length)}/${missing.length}`);
}

console.log(`\nFetched ${fetched} new definitions`);
console.log(`Total definitions: ${Object.keys(existing).length}`);

// Sort keys alphabetically
const sorted = Object.fromEntries(
  Object.entries(existing).sort(([a], [b]) => a.localeCompare(b))
);

writeFileSync(OUTPUT_PATH, JSON.stringify(sorted, null, 2));
console.log(`Saved to ${OUTPUT_PATH}`);
