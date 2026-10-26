#!/usr/bin/env node

/**
 * check-future-leak.mjs
 *
 * Post-build guard for the D+1 prefetch (scripts/lib/daily-updater.mjs).
 * The daily JSON files may already hold tomorrow's puzzle; the read layer
 * (lib/*-daily.ts) must keep it out of every page until its release. This
 * scans the rendered build output — prerendered HTML / RSC payloads /
 * route bodies such as the sitemaps — plus the client JS chunks, and fails
 * if any unreleased puzzle date shows up in a file name or its contents.
 * It also checks the file names under public/ (per-date OG images).
 *
 * "Released" mirrors the read layer: Wordle, Connections and Strands roll
 * over at midnight ET, Spelling Bee at 3 AM ET. Between those two moments
 * the new ET date legitimately appears on Wordle pages, so not-yet-released
 * Spelling Bee dates from that window are only searched for in Spelling Bee
 * output.
 *
 * Run after `next build` (or `opennextjs-cloudflare build`), before deploy.
 * Matches are reported by path only — the repo's Actions logs are public.
 *
 * Usage: node scripts/check-future-leak.mjs [--now <ISO timestamp>]
 *   --now  pretend the check runs at this moment (to test the guard itself)
 */

import { existsSync, readdirSync, readFileSync } from "fs";
import { join, relative, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const NEXT_DIR = join(ROOT, ".next");
const RENDERED_DIR = join(NEXT_DIR, "server", "app");
const CLIENT_DIR = join(NEXT_DIR, "static");
const RENDERED_EXT = /\.(html|rsc|body|meta)$/;
const MAX_REPORTED = 25;

const nowArg = process.argv.indexOf("--now");
const now = nowArg > -1 ? new Date(process.argv[nowArg + 1]) : new Date();
if (Number.isNaN(now.getTime())) {
  console.error("❌ --now needs an ISO timestamp, e.g. 2026-10-26T12:00:00Z");
  process.exit(2);
}

function easternDate(d) {
  return d
    .toLocaleDateString("en-CA", { timeZone: "America/New_York" })
    .slice(0, 10);
}

const today = easternDate(now);
const beeToday = easternDate(new Date(now.getTime() - 3 * 60 * 60 * 1000));

function datesIn(file) {
  const data = JSON.parse(readFileSync(join(ROOT, "data", file), "utf-8"));
  return data.puzzles.map((p) => p.date);
}

// Unreleased everywhere: dated after today's ET date.
const unreleased = new Set();
for (const file of [
  "wordle-daily.json",
  "connections-daily.json",
  "strands-daily.json",
  "spelling-bee-daily.json",
]) {
  for (const date of datesIn(file)) if (date > today) unreleased.add(date);
}
// Unreleased Spelling Bee only: today's ET date during midnight–3 AM ET.
const beeOnly = new Set(
  datesIn("spelling-bee-daily.json").filter(
    (date) => date > beeToday && date <= today
  )
);

console.log(
  `Leak check at ${now.toISOString()} — today ${today} (Spelling Bee ${beeToday})`
);
if (unreleased.size === 0 && beeOnly.size === 0) {
  console.log("✅ No prefetched puzzles in data/ — nothing to check.");
  process.exit(0);
}
console.log(
  `Unreleased dates: ${[...unreleased].sort().join(", ") || "none"}` +
    (beeOnly.size ? ` · Spelling Bee only: ${[...beeOnly].join(", ")}` : "")
);

if (!existsSync(RENDERED_DIR)) {
  console.error("❌ .next/server/app not found — run the build first.");
  process.exit(2);
}

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

const everywhere = [...unreleased].map((d) => [d, Buffer.from(d)]);
const beeNeedles = [...beeOnly].map((d) => [d, Buffer.from(d)]);
const hits = [];
let scanned = 0;

function scan(path) {
  scanned++;
  const rel = relative(ROOT, path).split("\\").join("/");
  const isBee = rel.includes("spelling-bee");
  const needles = isBee ? everywhere.concat(beeNeedles) : everywhere;
  if (needles.length === 0) return;
  const buf = readFileSync(path);
  for (const [date, needle] of needles) {
    if (rel.includes(date) || buf.includes(needle)) hits.push({ rel, date });
  }
}

for (const path of walk(RENDERED_DIR)) {
  // Route code (*.js) and manifests (*.json) embed the raw data on the
  // server by design; only rendered output reaches visitors and crawlers.
  if (RENDERED_EXT.test(path)) scan(path);
}
if (existsSync(CLIENT_DIR)) {
  for (const path of walk(CLIENT_DIR)) if (path.endsWith(".js")) scan(path);
}
// Static files are served as-is: a per-date image (public/og/<game>/<date>.png)
// for an unreleased date would be a leak by file name alone.
const PUBLIC_DIR = join(ROOT, "public");
if (existsSync(PUBLIC_DIR)) {
  for (const path of walk(PUBLIC_DIR)) {
    scanned++;
    const rel = relative(ROOT, path).split("\\").join("/");
    const dates = rel.includes("spelling-bee")
      ? [...unreleased, ...beeOnly]
      : [...unreleased];
    for (const date of dates) if (rel.includes(date)) hits.push({ rel, date });
  }
}

if (hits.length === 0) {
  console.log(`✅ No unreleased puzzle dates in ${scanned} rendered/client files.`);
  process.exit(0);
}

console.error(`❌ ${hits.length} leak(s) of unreleased puzzle dates:`);
for (const { rel, date } of hits.slice(0, MAX_REPORTED)) {
  console.error(`   ${date}  ${rel}`);
}
if (hits.length > MAX_REPORTED) {
  console.error(`   … and ${hits.length - MAX_REPORTED} more`);
}
process.exit(1);
