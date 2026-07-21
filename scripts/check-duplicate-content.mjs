/**
 * Duplicate-content check for the 4/6/7-letter spoke pages.
 *
 * Reads the prerendered HTML in .next/server/app/en/{4,6,7}-letter-words/,
 * strips markup and the word-list grids (which are unique by construction),
 * then computes pairwise Jaccard similarity on 5-gram shingles of the
 * remaining prose. Fails when template prose isn't sufficiently
 * differentiated by the dynamic facts + per-letter hooks.
 *
 * Thresholds: same-length pairs (shared template) must stay < 0.75;
 * cross-length pairs (different templates) must stay < 0.30.
 *
 * Run after `pnpm build`:  node scripts/check-duplicate-content.mjs
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(process.cwd(), ".next", "server", "app", "en");
const SAME_LENGTH_MAX = 0.75;
const CROSS_LENGTH_MAX = 0.3;

function textOf(htmlPath) {
  let html = readFileSync(htmlPath, "utf8");
  // Drop the word-grid sections (unique data, would mask template overlap).
  html = html.replace(/<div class="grid[^"]*"[\s\S]*?<\/div>/g, " ");
  html = html.replace(/<script[\s\S]*?<\/script>/g, " ");
  html = html.replace(/<style[\s\S]*?<\/style>/g, " ");
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function shingles(text, n = 5) {
  const words = text.split(" ").filter(Boolean);
  const set = new Set();
  for (let i = 0; i <= words.length - n; i++) {
    set.add(words.slice(i, i + n).join(" "));
  }
  return set;
}

function jaccard(a, b) {
  let inter = 0;
  for (const s of a) if (b.has(s)) inter++;
  return inter / (a.size + b.size - inter || 1);
}

const pages = [];
for (const len of [4, 6, 7]) {
  const dir = join(ROOT, `${len}-letter-words`);
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) {
    if (/^starting-with-[a-z]\.html$/.test(f)) {
      pages.push({ len, name: `${len}L/${f}`, sh: shingles(textOf(join(dir, f))) });
    }
  }
}

if (pages.length === 0) {
  console.error("No prerendered spoke pages found — run `pnpm build` first.");
  process.exit(1);
}

let worstSame = { v: 0 };
let worstCross = { v: 0 };
const offenders = [];

for (let i = 0; i < pages.length; i++) {
  for (let j = i + 1; j < pages.length; j++) {
    const v = jaccard(pages[i].sh, pages[j].sh);
    const same = pages[i].len === pages[j].len;
    const pair = `${pages[i].name} ↔ ${pages[j].name}`;
    if (same && v > worstSame.v) worstSame = { v, pair };
    if (!same && v > worstCross.v) worstCross = { v, pair };
    if ((same && v > SAME_LENGTH_MAX) || (!same && v > CROSS_LENGTH_MAX)) {
      offenders.push({ pair, v: v.toFixed(3), same });
    }
  }
}

console.log(`Checked ${pages.length} spoke pages (${(pages.length * (pages.length - 1)) / 2} pairs).`);
console.log(`Worst same-length similarity:  ${worstSame.v.toFixed(3)}  (${worstSame.pair ?? "-"})  [max ${SAME_LENGTH_MAX}]`);
console.log(`Worst cross-length similarity: ${worstCross.v.toFixed(3)}  (${worstCross.pair ?? "-"})  [max ${CROSS_LENGTH_MAX}]`);

if (offenders.length > 0) {
  console.error(`\n❌ ${offenders.length} pair(s) over threshold:`);
  for (const o of offenders.slice(0, 20)) {
    console.error(`  ${o.v}  ${o.pair}${o.same ? "" : "  (cross-length!)"}`);
  }
  process.exit(1);
}
console.log("✅ All pairs under thresholds.");
