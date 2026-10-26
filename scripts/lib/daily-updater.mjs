/**
 * daily-updater.mjs
 *
 * Shared driver for the scripts/update-*.mjs daily updaters.
 *
 * Every run refreshes today's puzzle (ET) and prefetches tomorrow's, so the
 * rebuild fired right after the NYT rollover already has the new puzzle.
 * The read layer (lib/*-daily.ts) hides anything dated after today, so a
 * prefetched puzzle never renders early.
 *
 * - Today missing and unfetchable → throws (callers exit non-zero).
 * - Today stored but the refetch fails → keep the stored copy.
 * - Tomorrow unavailable → warning only.
 * - A stored puzzle that differs from NYT's current payload is replaced,
 *   in case NYT edits a puzzle after we prefetched it.
 *
 * Logs never print answers: the repo (and its Actions logs) are public.
 */

import { existsSync, readFileSync, writeFileSync } from "fs";

export function toEasternDate(d = new Date()) {
  return d
    .toLocaleDateString("en-CA", { timeZone: "America/New_York" })
    .slice(0, 10);
}

export function addDays(dateStr, n) {
  const d = new Date(`${dateStr}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/**
 * @param {object} opts
 * @param {string} opts.label        Game name for log lines.
 * @param {string} opts.dataPath     Absolute path to data/<game>-daily.json.
 * @param {string} opts.seedHint     Shown when the data file is missing.
 * @param {(date: string) => Promise<{ date: string, id: number }>} opts.fetchPuzzle
 * @param {(puzzle: object) => boolean} [opts.validate]
 */
export async function updateDaily({
  label,
  dataPath,
  seedHint,
  fetchPuzzle,
  validate = () => true,
}) {
  if (!existsSync(dataPath)) {
    throw new Error(`${dataPath} not found. ${seedHint}`);
  }

  const data = JSON.parse(readFileSync(dataPath, "utf-8"));
  const today = toEasternDate();
  let changed = false;

  for (const date of [today, addDays(today, 1)]) {
    const idx = data.puzzles.findIndex((p) => p.date === date);

    let fresh;
    try {
      fresh = await fetchPuzzle(date);
      if (fresh.date !== date) {
        throw new Error(`asked for ${date}, got ${fresh.date}`);
      }
      if (!validate(fresh)) throw new Error("malformed payload");
    } catch (err) {
      if (date === today && idx === -1) throw err;
      const outcome = idx === -1 ? "not available yet" : "keeping stored copy";
      console.warn(`⚠️  ${label} ${date}: ${err.message} — ${outcome}`);
      continue;
    }

    if (idx === -1) {
      data.puzzles.push(fresh);
      changed = true;
      console.log(`✅ ${label} ${date} (#${fresh.id}) added`);
    } else if (JSON.stringify(data.puzzles[idx]) !== JSON.stringify(fresh)) {
      data.puzzles[idx] = fresh;
      changed = true;
      console.log(`🔄 ${label} ${date} (#${fresh.id}) changed upstream — refreshed`);
    } else {
      console.log(`✅ ${label} ${date} (#${fresh.id}) up to date`);
    }
  }

  if (!changed) {
    console.log(`Total ${label} puzzles: ${data.puzzles.length}`);
    return;
  }

  data.puzzles.sort((a, b) => a.date.localeCompare(b.date));
  data.lastUpdated = new Date().toISOString();
  writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`✅ Updated ${dataPath} (${data.puzzles.length} total)`);
}
