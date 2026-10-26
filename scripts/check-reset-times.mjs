#!/usr/bin/env node

/**
 * check-reset-times.mjs — asserts lib/reset-times.ts against hand-worked
 * cases: daylight-saving switches (US 2026-11-01, 2027-03-14), the week when
 * the UK has changed clocks and the US hasn't, India (no DST), the weekend
 * crossword evenings, weekly Bonus puzzles, and local midnight.
 *
 * Usage (Node 22.6+): node --experimental-strip-types scripts/check-reset-times.mjs
 */

import { pathToFileURL } from "url";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const lib = await import(pathToFileURL(join(ROOT, "lib", "reset-times.ts")).href);
const { nextRelease, lastRelease, nextOffsetChange } = lib;

const CROSSWORD = { kind: "et-evening", hours: [18, 22, 22, 22, 22, 22, 18] };
const BEE = { kind: "et-daily", hour: 3 };
const TILES = { kind: "et-daily", hour: 0 };
const LOCAL = { kind: "local-midnight" };
const BONUS = { kind: "local-weekly", weekday: 3 };

let failures = 0;
function expect(label, got, want) {
  const ok = got === want;
  if (!ok) failures++;
  console.log(`${ok ? "✅" : "❌"} ${label}: ${got}${ok ? "" : `  (expected ${want})`}`);
}
const at = (iso) => Date.parse(iso);
const utc = (ms) => new Date(ms).toISOString().replace(".000Z", "Z");

// Local midnight
expect("Wordle, London, Oct 26 23:30 GMT → next", utc(nextRelease(LOCAL, at("2026-10-26T23:30:00Z"), "Europe/London").at), "2026-10-27T00:00:00Z");
expect("Wordle, Kolkata, Dec 1 23:30 IST → next", utc(nextRelease(LOCAL, at("2026-12-01T18:00:00Z"), "Asia/Kolkata").at), "2026-12-01T18:30:00Z");
expect("Wordle, New York, Nov 1 (DST ends) → next", utc(nextRelease(LOCAL, at("2026-11-01T12:00:00Z"), "America/New_York").at), "2026-11-02T05:00:00Z");
expect("Wordle, puzzle date in Tokyo at 2026-10-26 16:00Z", nextRelease(LOCAL, at("2026-10-26T16:00:00Z"), "Asia/Tokyo").puzzleDate, "2026-10-28");
expect("Wordle, today's puzzle in Tokyo at 2026-10-26 16:00Z", lastRelease(LOCAL, at("2026-10-26T16:00:00Z"), "Asia/Tokyo").puzzleDate, "2026-10-27");

// 3 a.m. New York — UK on GMT, US still on EDT (the week of Oct 26, 2026)
expect("Spelling Bee, Oct 27 (EDT) → 07:00Z", utc(nextRelease(BEE, at("2026-10-27T05:00:00Z"), "Europe/London").at), "2026-10-27T07:00:00Z");
expect("Spelling Bee, Nov 2 (EST) → 08:00Z", utc(nextRelease(BEE, at("2026-11-02T05:00:00Z"), "Europe/London").at), "2026-11-02T08:00:00Z");
expect("Spelling Bee, Nov 1 (DST ends at 2 a.m.) → 08:00Z", utc(nextRelease(BEE, at("2026-11-01T05:00:00Z"), "Europe/London").at), "2026-11-01T08:00:00Z");
expect("Spelling Bee, Mar 14 2027 (DST starts) → 07:00Z", utc(nextRelease(BEE, at("2027-03-14T05:00:00Z"), "UTC").at), "2027-03-14T07:00:00Z");
expect("Spelling Bee in India, Dec (13:30 IST) → 08:00Z", utc(nextRelease(BEE, at("2026-12-10T04:00:00Z"), "Asia/Kolkata").at), "2026-12-10T08:00:00Z");
expect("Tiles, midnight New York (EDT) → 04:00Z", utc(nextRelease(TILES, at("2026-10-27T01:00:00Z"), "UTC").at), "2026-10-27T04:00:00Z");

// The crossword family: the evening before
expect("Crossword, Fri Oct 30 → Sat puzzle at 22:00 EDT", utc(nextRelease(CROSSWORD, at("2026-10-30T20:00:00Z"), "UTC").at), "2026-10-31T02:00:00Z");
expect("…that release is Saturday's puzzle", nextRelease(CROSSWORD, at("2026-10-30T20:00:00Z"), "UTC").puzzleDate, "2026-10-31");
expect("Crossword, Sat Oct 31 → Sun puzzle at 18:00 EDT", utc(nextRelease(CROSSWORD, at("2026-10-31T12:00:00Z"), "UTC").at), "2026-10-31T22:00:00Z");
expect("Crossword, Sun Nov 1 → Mon puzzle at 18:00 EST", utc(nextRelease(CROSSWORD, at("2026-11-01T12:00:00Z"), "UTC").at), "2026-11-01T23:00:00Z");
expect("Crossword, Mon Nov 2 → Tue puzzle at 22:00 EST", utc(nextRelease(CROSSWORD, at("2026-11-02T12:00:00Z"), "UTC").at), "2026-11-03T03:00:00Z");
expect("Crossword, last release seen Mon Nov 2 noon", lastRelease(CROSSWORD, at("2026-11-02T17:00:00Z"), "UTC").puzzleDate, "2026-11-02");

// Weekly, local midnight on Wednesdays
expect("Bonus, New York, Tue Oct 27 → Wed 00:00 EDT", utc(nextRelease(BONUS, at("2026-10-27T16:00:00Z"), "America/New_York").at), "2026-10-28T04:00:00Z");
expect("Bonus, Sydney, Wed Oct 28 10:00 AEDT → next week", utc(nextRelease(BONUS, at("2026-10-27T23:00:00Z"), "Australia/Sydney").at), "2026-11-03T13:00:00Z");

// Next New York clock change
const change = nextOffsetChange(at("2026-10-26T12:00:00Z"));
expect("Next New York clock change", utc(Math.ceil(change.at / 60000) * 60000), "2026-11-01T06:00:00Z");
expect("…from EDT to EST", `${change.before} → ${change.after}`, "-240 → -300");

console.log(failures ? `\n${failures} failed` : "\nAll reset-time checks passed.");
process.exit(failures ? 1 : 0);
