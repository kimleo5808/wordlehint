// Build the static word bank used by the /5-letter-words/* landing pages.
//
// Source: the public Wordle valid-guess list (14,854 five-letter words),
// mirrored at https://raw.githubusercontent.com/tabatkins/wordle-list/main/words
// (public-domain word list — no NYT proprietary data).
//
// We tag each word as "common" when it belongs to the official Wordle answer
// pool (the ~2,315 curated everyday words that can be daily answers), so pages
// can surface the words players actually recognise first and flag the obscure
// guess-only words. Output: data/word-bank/5.json
//
// Run:  node scripts/build-word-bank.mjs
// Re-fetches from the network unless scripts/.cache/wordle-guesses.txt exists.

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CACHE = join(__dirname, ".cache", "wordle-guesses.txt");
const ANSWERS_CACHE = join(__dirname, ".cache", "wordle-answers.txt");
const OUT_DIR = join(ROOT, "data", "word-bank");
const OUT_PATH = join(OUT_DIR, "5.json");
const SOURCE_URL =
  "https://raw.githubusercontent.com/tabatkins/wordle-list/main/words";
const ANSWERS_URL =
  "https://gist.githubusercontent.com/cfreshman/a03ef2cba789d8cf00c08f767e0fad7b/raw";

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function loadList(cachePath, url, label) {
  if (await exists(cachePath)) {
    console.log(`Using cached ${label}: ${cachePath}`);
    return readFile(cachePath, "utf8");
  }
  console.log(`Fetching ${label} from ${url} …`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed (${label}): ${res.status}`);
  const txt = await res.text();
  await mkdir(dirname(cachePath), { recursive: true });
  await writeFile(cachePath, txt);
  return txt;
}

function parseWords(raw) {
  return raw
    .split(/[\s,]+/)
    .map((w) => w.trim().toUpperCase())
    .filter((w) => /^[A-Z]{5}$/.test(w));
}

async function main() {
  const raw = await loadList(CACHE, SOURCE_URL, "guess list");
  const answersRaw = await loadList(
    ANSWERS_CACHE,
    ANSWERS_URL,
    "answer list"
  );

  const words = Array.from(new Set(parseWords(raw))).sort();
  const answerSet = new Set(parseWords(answersRaw));
  // Guess list should be a superset of answers; union just in case.
  for (const a of answerSet) if (!words.includes(a)) words.push(a);
  words.sort();

  const common = words.filter((w) => answerSet.has(w));

  const data = {
    length: 5,
    source:
      "tabatkins/wordle-list (guesses) + cfreshman answer list — public domain",
    lastBuilt: new Date().toISOString(),
    count: words.length,
    commonCount: common.length,
    words, // all valid 5-letter guesses, A–Z sorted, uppercase
    common, // subset in the official answer pool (player-recognisable)
  };

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(data));
  console.log(
    `Wrote ${OUT_PATH}: ${words.length} words (${common.length} common).`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
