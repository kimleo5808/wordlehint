// Verify the /5-letter-words word-list spokes stay in sync across every place
// that has to know which letters are live. Adding an ending-letter page means
// touching several files by hand; this catches the one you forgot.
//
// For each direction (starting / ending) it cross-checks four sources:
//   1. route dir      app/[locale]/5-letter-words/<dir>-<letter>/page.tsx
//   2. content file   data/word-bank/<dir>-<letter>.ts   (and its `letter:` field)
//   3. sitemap array  lib/sitemap.ts  wordList{Starting,Ending}Letters
//   4. hub live list  the ending-with hub's LIVE_ENDING  (ending only)
// Any letter present in some sources but missing from others is an error.
// It also warns about live pages whose word bank has 0 common answer-pool
// words (thin content — e.g. why J/Q/V endings are intentionally skipped).
//
// Run:  node scripts/check-word-bank-sync.mjs   (exit 1 on any mismatch)

import { readdir, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ROUTE_DIR = join(ROOT, "app", "[locale]", "5-letter-words");
const DATA_DIR = join(ROOT, "data", "word-bank");
const SITEMAP = join(ROOT, "lib", "sitemap.ts");
const HUB_PAGE = join(ROUTE_DIR, "ending-with", "page.tsx");
const WITH_HUB_PAGE = join(ROUTE_DIR, "with", "page.tsx");

// Content-file name for a given direction + letter.
const dataFileName = (dir, letter) =>
  dir === "contains"
    ? `with-${letter.toLowerCase()}.ts`
    : `${dir}-with-${letter.toLowerCase()}.ts`;

const problems = [];
const warnings = [];
const fail = (msg) => problems.push(msg);
const warn = (msg) => warnings.push(msg);

/** Uppercase A–Z letters from a set/array of single-letter strings. */
const toLetterSet = (letters) => new Set([...letters].map((l) => l.toUpperCase()));

/** Sorted letters that are in `a` but not in `b`. */
const missingFrom = (a, b) => [...a].filter((l) => !b.has(l)).sort();

/** Parse a `const NAME = [ "a", "b", ... ]` letter array out of a .ts source. */
function parseLetterArray(source, name) {
  const re = new RegExp(`${name}\\s*=\\s*\\[([\\s\\S]*?)\\]`);
  const m = source.match(re);
  if (!m) return null;
  return toLetterSet(m[1].match(/["']([a-z])["']/gi)?.map((s) => s.replace(/["']/g, "")) ?? []);
}

// --- Collect route directories and content files ------------------------------

const routeDirs = await readdir(ROUTE_DIR, { withFileTypes: true });
const dataFiles = await readdir(DATA_DIR);

const routeLetters = { starting: new Set(), ending: new Set(), contains: new Set() };
for (const d of routeDirs) {
  if (!d.isDirectory()) continue;
  const m = d.name.match(/^(starting|ending)-with-([a-z])$/);
  if (m) routeLetters[m[1]].add(m[2].toUpperCase());
  const c = d.name.match(/^with-([a-z])$/);
  if (c) routeLetters.contains.add(c[1].toUpperCase());
}

const dataLetters = { starting: new Set(), ending: new Set(), contains: new Set() };
for (const f of dataFiles) {
  const m = f.match(/^(starting|ending)-with-([a-z])\.ts$/);
  if (m) dataLetters[m[1]].add(m[2].toUpperCase());
  const c = f.match(/^with-([a-z])\.ts$/);
  if (c) dataLetters.contains.add(c[1].toUpperCase());
}

// --- Parse the sitemap arrays and the hub LIVE_ENDING -------------------------

const sitemapSrc = await readFile(SITEMAP, "utf-8");
const hubSrc = await readFile(HUB_PAGE, "utf-8");

// Starting letters in sitemap are generated as 'a..z'.split(''); detect that too.
let sitemapStarting = parseLetterArray(sitemapSrc, "wordListStartingLetters");
if (!sitemapStarting && /wordListStartingLetters\s*=\s*["']abcdefghijklmnopqrstuvwxyz["']\s*\.split/.test(sitemapSrc)) {
  sitemapStarting = toLetterSet("abcdefghijklmnopqrstuvwxyz");
}
const sitemapEnding = parseLetterArray(sitemapSrc, "wordListEndingLetters");
const hubLiveEnding = parseLetterArray(hubSrc, "LIVE_ENDING");
const sitemapContains = parseLetterArray(sitemapSrc, "wordListContainsLetters");
const withHubSrc = await readFile(WITH_HUB_PAGE, "utf-8");
const hubLiveWith = parseLetterArray(withHubSrc, "LIVE_WITH");

if (!sitemapStarting) fail("Could not parse wordListStartingLetters from lib/sitemap.ts");
if (!sitemapEnding) fail("Could not parse wordListEndingLetters from lib/sitemap.ts");
if (!hubLiveEnding) fail("Could not parse LIVE_ENDING from the ending-with hub page");
if (!sitemapContains) fail("Could not parse wordListContainsLetters from lib/sitemap.ts");
if (!hubLiveWith) fail("Could not parse LIVE_WITH from the with hub page");

// --- Cross-check each direction ----------------------------------------------

function crossCheck(label, sources) {
  const names = Object.keys(sources);
  // Union of every letter that appears anywhere.
  const union = new Set(names.flatMap((n) => [...sources[n]]));
  for (const name of names) {
    const gap = missingFrom(union, sources[name]);
    if (gap.length) {
      fail(`[${label}] ${name} is missing: ${gap.join(", ")} (present in other sources)`);
    }
  }
}

crossCheck("starting", {
  "route dir": routeLetters.starting,
  "data file": dataLetters.starting,
  "sitemap array": sitemapStarting ?? new Set(),
});

crossCheck("ending", {
  "route dir": routeLetters.ending,
  "data file": dataLetters.ending,
  "sitemap array": sitemapEnding ?? new Set(),
  "hub LIVE_ENDING": hubLiveEnding ?? new Set(),
});

crossCheck("contains", {
  "route dir": routeLetters.contains,
  "data file": dataLetters.contains,
  "sitemap array": sitemapContains ?? new Set(),
  "hub LIVE_WITH": hubLiveWith ?? new Set(),
});

// --- Check each content file's `letter:` field matches its filename -----------

for (const dir of ["starting", "ending", "contains"]) {
  for (const L of dataLetters[dir]) {
    const file = dataFileName(dir, L);
    const src = await readFile(join(DATA_DIR, file), "utf-8");
    const m = src.match(/letter:\s*["']([A-Za-z])["']/);
    if (!m) {
      fail(`[${dir}] data/word-bank/${file} has no letter: field`);
    } else if (m[1].toUpperCase() !== L) {
      fail(`[${dir}] ${file} declares letter "${m[1]}" but filename says "${L}"`);
    }
  }
}

// --- Warn about thin pages (0 common answer-pool words) -----------------------

const bank = JSON.parse(await readFile(join(DATA_DIR, "5.json"), "utf-8"));
const commonByFirst = {};
const commonByLast = {};
for (const w of bank.common) {
  commonByFirst[w[0]] = (commonByFirst[w[0]] ?? 0) + 1;
  commonByLast[w[4]] = (commonByLast[w[4]] ?? 0) + 1;
}
for (const L of routeLetters.starting) {
  if (!commonByFirst[L]) warn(`[starting] page for "${L}" has 0 common answer-pool words (thin content)`);
}
for (const L of routeLetters.ending) {
  if (!commonByLast[L]) warn(`[ending] page for "${L}" has 0 common answer-pool words (thin content)`);
}

// Report letters that are safely skippable because they have no common words.
const skippableEnding = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  .split("")
  .filter((L) => !commonByLast[L] && !routeLetters.ending.has(L));
if (skippableEnding.length) {
  console.log(`ℹ  ending letters with no common words (intentionally unbuilt): ${skippableEnding.join(", ")}`);
}

// --- Report -------------------------------------------------------------------

for (const w of warnings) console.log(`⚠  ${w}`);
if (problems.length) {
  console.error(`\n✗ word-bank sync check failed (${problems.length}):`);
  for (const p of problems) console.error(`   ✗ ${p}`);
  process.exit(1);
}
console.log(
  `✓ word-bank spokes in sync — starting: ${routeLetters.starting.size}, ending: ${routeLetters.ending.size}, contains: ${routeLetters.contains.size} letters live`
);
