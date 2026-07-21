// Build the static word banks used by the /N-letter-words/* landing pages.
//
// Length 5 (the original bank): the public Wordle valid-guess list
// (14,854 words, tabatkins/wordle-list) with "common" = the official Wordle
// answer pool (~2,315 words, cfreshman list). No NYT proprietary data.
//
// Lengths 4/6/7: the ENABLE list (public domain, the de-facto standard for
// word-game tools) with "common" = intersection with the google-10000-english
// frequency list — there is no NYT answer pool at these lengths, so "common"
// means "everyday high-frequency word" instead.
//
// Output: data/word-bank/<len>.json
// Run:  node scripts/build-word-bank.mjs [len …]   (default: 5)
//       node scripts/build-word-bank.mjs 4 6 7
// Re-fetches from the network unless the scripts/.cache/ copy exists.

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CACHE_DIR = join(__dirname, ".cache");
const OUT_DIR = join(ROOT, "data", "word-bank");

const WORDLE_GUESSES_URL =
  "https://raw.githubusercontent.com/tabatkins/wordle-list/main/words";
const WORDLE_ANSWERS_URL =
  "https://gist.githubusercontent.com/cfreshman/a03ef2cba789d8cf00c08f767e0fad7b/raw";
const ENABLE_URL =
  "https://raw.githubusercontent.com/dolph/dictionary/master/enable1.txt";
const FREQUENCY_URL =
  "https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt";

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function loadList(cacheName, url, label) {
  const cachePath = join(CACHE_DIR, cacheName);
  if (await exists(cachePath)) {
    console.log(`Using cached ${label}: ${cachePath}`);
    return readFile(cachePath, "utf8");
  }
  console.log(`Fetching ${label} from ${url} …`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed (${label}): ${res.status}`);
  const txt = await res.text();
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(cachePath, txt);
  return txt;
}

function parseWords(raw, len) {
  const re = new RegExp(`^[A-Z]{${len}}$`);
  return raw
    .split(/[\s,]+/)
    .map((w) => w.trim().toUpperCase())
    .filter((w) => re.test(w));
}

async function buildLength5() {
  const raw = await loadList("wordle-guesses.txt", WORDLE_GUESSES_URL, "guess list");
  const answersRaw = await loadList("wordle-answers.txt", WORDLE_ANSWERS_URL, "answer list");

  const words = Array.from(new Set(parseWords(raw, 5))).sort();
  const answerSet = new Set(parseWords(answersRaw, 5));
  // Guess list should be a superset of answers; union just in case.
  for (const a of answerSet) if (!words.includes(a)) words.push(a);
  words.sort();

  return {
    length: 5,
    source:
      "tabatkins/wordle-list (guesses) + cfreshman answer list — public domain",
    words,
    common: words.filter((w) => answerSet.has(w)),
  };
}

async function buildEnableLength(len) {
  const raw = await loadList("enable1.txt", ENABLE_URL, "ENABLE list");
  const freqRaw = await loadList(
    "google-10000-english.txt",
    FREQUENCY_URL,
    "frequency list"
  );

  const words = Array.from(new Set(parseWords(raw, len))).sort();
  const freqSet = new Set(parseWords(freqRaw, len));

  return {
    length: len,
    source:
      "ENABLE (public domain) + google-10000-english frequency list for the common tier",
    words,
    common: words.filter((w) => freqSet.has(w)),
  };
}

async function main() {
  const lengths = process.argv.slice(2).map(Number).filter(Boolean);
  if (lengths.length === 0) lengths.push(5);

  await mkdir(OUT_DIR, { recursive: true });
  for (const len of lengths) {
    const bank = len === 5 ? await buildLength5() : await buildEnableLength(len);
    const data = {
      length: bank.length,
      source: bank.source,
      lastBuilt: new Date().toISOString(),
      count: bank.words.length,
      commonCount: bank.common.length,
      words: bank.words,
      common: bank.common,
    };
    const outPath = join(OUT_DIR, `${len}.json`);
    await writeFile(outPath, JSON.stringify(data));
    console.log(
      `Wrote ${outPath}: ${data.count} words (${data.commonCount} common).`
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
