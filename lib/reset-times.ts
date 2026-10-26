/**
 * When does the next NYT puzzle appear, for a viewer in any time zone?
 *
 * Reset rules come in four shapes (see data/nyt-reset-rules.ts). Eastern
 * times follow New York's wall clock, daylight saving included — NYT's help
 * pages write "EST" all year. Pure functions on Intl only, so they run on
 * the server, in the browser and in scripts/check-reset-times.mjs (no path
 * aliases in this file for that reason).
 */

export const NEW_YORK = "America/New_York";

export type ResetRule =
  /** New puzzle at midnight in the player's own time zone. */
  | { kind: "local-midnight" }
  /** Weekly, at local midnight on one weekday (0 = Sunday). */
  | { kind: "local-weekly"; weekday: number }
  /** Every day at a fixed hour, New York time. */
  | { kind: "et-daily"; hour: number }
  /** The evening before, New York time: hours[d] is the hour on the evening
   *  of weekday d (0 = Sunday) when the next day's puzzle goes up. */
  | { kind: "et-evening"; hours: number[] };

export interface ZonedParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  /** 0 = Sunday. */
  weekday: number;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const formatters = new Map<string, Intl.DateTimeFormat>();

function partsFormatter(timeZone: string): Intl.DateTimeFormat {
  let f = formatters.get(timeZone);
  if (!f) {
    f = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "short",
    });
    formatters.set(timeZone, f);
  }
  return f;
}

/** Wall-clock fields of an instant in a time zone. */
export function zonedParts(ms: number, timeZone: string): ZonedParts {
  const get: Record<string, string> = {};
  for (const p of partsFormatter(timeZone).formatToParts(new Date(ms))) get[p.type] = p.value;
  return {
    year: Number(get.year),
    month: Number(get.month),
    day: Number(get.day),
    hour: Number(get.hour) % 24,
    minute: Number(get.minute),
    second: Number(get.second),
    weekday: WEEKDAYS.indexOf(get.weekday),
  };
}

/** UTC instant of a wall-clock time in a time zone. A time that doesn't
 *  exist (inside a spring-forward gap) resolves to just after the gap. */
export function zonedTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string
): number {
  const target = Date.UTC(year, month - 1, day, hour, minute);
  let guess = target;
  for (let i = 0; i < 3; i++) {
    const p = zonedParts(guess, timeZone);
    const diff = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - target;
    if (diff === 0) break;
    guess -= diff;
  }
  return guess;
}

/** Minutes ahead of UTC in a time zone at an instant (New York in summer: -240). */
export function utcOffsetMinutes(ms: number, timeZone: string): number {
  const p = zonedParts(ms, timeZone);
  return Math.round((Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - Math.floor(ms / 1000) * 1000) / 60000);
}

type YMD = [number, number, number];

function addDays([y, m, d]: YMD, n: number): YMD {
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return [t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate()];
}

const weekdayOf = ([y, m, d]: YMD) => new Date(Date.UTC(y, m - 1, d)).getUTCDay();
const iso = ([y, m, d]: YMD) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

export interface Release {
  /** UTC instant the puzzle appears for this viewer. */
  at: number;
  /** The date printed on the puzzle (YYYY-MM-DD). */
  puzzleDate: string;
}

/** Every release of a rule within about a week either side of `now`, oldest first. */
export function releasesAround(rule: ResetRule, now: number, timeZone: string): Release[] {
  const out: Release[] = [];
  if (rule.kind === "local-midnight" || rule.kind === "local-weekly") {
    const p = zonedParts(now, timeZone);
    const today: YMD = [p.year, p.month, p.day];
    for (let i = -8; i <= 8; i++) {
      const day = addDays(today, i);
      if (rule.kind === "local-weekly" && weekdayOf(day) !== rule.weekday) continue;
      out.push({ at: zonedTimeToUtc(...day, 0, 0, timeZone), puzzleDate: iso(day) });
    }
  } else {
    const p = zonedParts(now, NEW_YORK);
    const today: YMD = [p.year, p.month, p.day];
    for (let i = -8; i <= 8; i++) {
      const day = addDays(today, i);
      if (rule.kind === "et-daily") {
        out.push({ at: zonedTimeToUtc(...day, rule.hour, 0, NEW_YORK), puzzleDate: iso(day) });
      } else {
        out.push({
          at: zonedTimeToUtc(...day, rule.hours[weekdayOf(day)], 0, NEW_YORK),
          puzzleDate: iso(addDays(day, 1)),
        });
      }
    }
  }
  return out.sort((a, b) => a.at - b.at);
}

/** The first release after `now`. */
export function nextRelease(rule: ResetRule, now: number, timeZone: string): Release {
  return releasesAround(rule, now, timeZone).find((r) => r.at > now)!;
}

/** The most recent release at or before `now`. */
export function lastRelease(rule: ResetRule, now: number, timeZone: string): Release {
  const past = releasesAround(rule, now, timeZone).filter((r) => r.at <= now);
  return past[past.length - 1];
}

/** "3h 12m", "12m 05s", "45s". */
export function formatCountdown(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m`;
  if (m > 0) return `${m}m ${String(sec).padStart(2, "0")}s`;
  return `${sec}s`;
}

/** The next moment New York's UTC offset changes, searched up to a year ahead. */
export function nextOffsetChange(from: number, timeZone: string = NEW_YORK): { at: number; before: number; after: number } | null {
  const HOUR = 3600_000;
  const start = utcOffsetMinutes(from, timeZone);
  for (let t = from + 24 * HOUR; t < from + 370 * 24 * HOUR; t += 24 * HOUR) {
    if (utcOffsetMinutes(t, timeZone) !== start) {
      let lo = t - 24 * HOUR;
      let hi = t;
      while (hi - lo > 60_000) {
        const mid = Math.floor((lo + hi) / 2);
        if (utcOffsetMinutes(mid, timeZone) === start) lo = mid;
        else hi = mid;
      }
      return { at: hi, before: start, after: utcOffsetMinutes(hi, timeZone) };
    }
  }
  return null;
}
