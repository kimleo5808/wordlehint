/**
 * Backfill definitions for common (answer-pool) words in the word bank into
 * data/wordle-definitions.json, so the /5-letter-words/* pages can show inline
 * definition popovers for the words players recognise.
 *
 * Usage:
 *   node scripts/backfill-word-defs.mjs S     # only common words starting with S
 *   node scripts/backfill-word-defs.mjs       # all common words
 *
 * Idempotent: skips words already present. Source: Free Dictionary API.
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const OUTPUT_PATH = resolve("data/wordle-definitions.json");
const BANK_PATH = resolve("data/word-bank/5.json");
const API_BASE = "https://api.dictionaryapi.dev/api/v2/entries/en";

const letter = (process.argv[2] || "").toUpperCase();

let existing = {};
try {
  existing = JSON.parse(readFileSync(OUTPUT_PATH, "utf-8"));
} catch {
  /* file may not exist */
}

const bank = JSON.parse(readFileSync(BANK_PATH, "utf-8"));
let pool = bank.common;
if (letter) pool = pool.filter((w) => w[0] === letter);
const missing = pool.filter((w) => !existing[w]);

console.log(
  `Common pool: ${pool.length}${letter ? ` (letter ${letter})` : ""}; missing defs: ${missing.length}`
);

async function fetchDefinition(word) {
  try {
    const res = await fetch(`${API_BASE}/${word.toLowerCase()}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    const entry = data[0];
    const meanings = entry.meanings || [];
    const firstMeaning = meanings[0];
    if (!firstMeaning) return null;
    const firstDef = firstMeaning.definitions?.[0];
    if (!firstDef) return null;
    const allDefs = meanings.slice(0, 2).map((m) => ({
      partOfSpeech: m.partOfSpeech,
      definition: m.definitions?.[0]?.definition || "",
      example: m.definitions?.[0]?.example || null,
    }));
    return {
      definition: firstDef.definition,
      partOfSpeech: firstMeaning.partOfSpeech,
      example: firstDef.example || null,
      origin: entry.origin || null,
      meanings: allDefs,
    };
  } catch (err) {
    console.error(`  Error ${word}: ${err.message}`);
    return null;
  }
}

const BATCH = 3;
const DELAY = 1200;
let fetched = 0;
for (let i = 0; i < missing.length; i += BATCH) {
  const batch = missing.slice(i, i + BATCH);
  const results = await Promise.all(batch.map(fetchDefinition));
  for (let j = 0; j < batch.length; j++) {
    if (results[j]) {
      existing[batch[j]] = results[j];
      fetched++;
    }
  }
  if (i + BATCH < missing.length) await new Promise((r) => setTimeout(r, DELAY));
  process.stdout.write(
    `\r  Progress: ${Math.min(i + BATCH, missing.length)}/${missing.length} (got ${fetched})`
  );
}

const sorted = Object.fromEntries(
  Object.entries(existing).sort(([a], [b]) => a.localeCompare(b))
);
writeFileSync(OUTPUT_PATH, JSON.stringify(sorted, null, 2));
console.log(
  `\nFetched ${fetched} new; total definitions: ${Object.keys(existing).length}`
);
