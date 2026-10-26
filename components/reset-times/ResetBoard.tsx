"use client";

import Link from "next/link";
import { formatCountdown, lastRelease, nextRelease, utcOffsetMinutes, type ResetRule } from "@/lib/reset-times";
import { useResetClock } from "./ResetClock";

export interface BoardGame {
  id: string;
  name: string;
  rule: ResetRule;
  summary: string;
  todayHref?: string;
}

const ZONES = [
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Africa/Johannesburg",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
];

const HOUR = 3600_000;

function offsetLabel(tz: string, now: number): string {
  const m = utcOffsetMinutes(now, tz);
  const sign = m < 0 ? "−" : "+";
  const a = Math.abs(m);
  return `UTC${sign}${Math.floor(a / 60)}${a % 60 ? `:${String(a % 60).padStart(2, "0")}` : ""}`;
}

function when(ms: number, tz: string, now: number): string {
  const day = (t: number) => new Date(t).toLocaleDateString("en-CA", { timeZone: tz });
  const time = new Date(ms).toLocaleTimeString("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" });
  if (day(ms) === day(now)) return `Today ${time}`;
  if (day(ms) === day(now + 24 * HOUR)) return `Tomorrow ${time}`;
  return `${new Date(ms).toLocaleDateString("en-US", { timeZone: tz, weekday: "short" })} ${time}`;
}

function puzzleLabel(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", weekday: "short", month: "short", day: "numeric" });
}

/**
 * The live "departures board": every game's next reset in the viewer's time
 * zone, soonest first, with a countdown. Before mount it shows the rules
 * only, so server and client HTML match.
 */
export default function ResetBoard({ games }: { games: BoardGame[] }) {
  const { timeZone, setTimeZone, now, detected } = useResetClock();
  const ready = timeZone !== null && now !== null;

  const rows = games.map((g) => {
    if (!ready) return { g, next: null, last: null };
    return { g, next: nextRelease(g.rule, now, timeZone), last: lastRelease(g.rule, now, timeZone) };
  });
  if (ready) rows.sort((a, b) => a.next!.at - b.next!.at);
  const zones = detected && !ZONES.includes(detected) ? [detected, ...ZONES] : ZONES;
  if (timeZone && !zones.includes(timeZone)) zones.unshift(timeZone);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 px-4 py-3">
        <label className="flex items-center gap-2 text-xs text-slate-400">
          <span className="font-mono uppercase tracking-wider">Time zone</span>
          <select
            value={timeZone ?? ""}
            onChange={(e) => setTimeZone(e.target.value)}
            disabled={!ready}
            className="rounded-md border border-slate-600 bg-slate-800 px-2 py-1 font-mono text-xs text-slate-100"
          >
            {!ready && <option value="">Detecting…</option>}
            {ready &&
              zones.map((z) => (
                <option key={z} value={z}>
                  {z.replace(/_/g, " ")} ({offsetLabel(z, now)}){z === detected ? " · detected" : ""}
                </option>
              ))}
          </select>
        </label>
        <span className="font-mono text-xs text-slate-400" aria-live="off">
          {ready
            ? `Now ${new Date(now).toLocaleTimeString("en-US", { timeZone, hour: "numeric", minute: "2-digit", second: "2-digit" })}`
            : "—"}
        </span>
      </div>

      <ul className="divide-y divide-slate-800">
        {rows.map(({ g, next, last }) => {
          const fresh = ready && last && now! - last.at < 2 * HOUR;
          const soon = ready && next && next.at - now! < HOUR;
          return (
            <li key={g.id} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 px-4 py-3 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_7rem_6.5rem]">
              <div className="min-w-0">
                <a href={`#${g.id}`} className="font-semibold text-white hover:underline">
                  {g.name}
                </a>
                <p className="truncate text-xs text-slate-400">{g.summary}</p>
              </div>
              <div className="col-start-1 font-mono text-sm text-slate-200 sm:col-start-auto">
                {ready && next ? when(next.at, timeZone!, now!) : "—"}
                {ready && last && (
                  <span className="block text-[11px] text-slate-500">Playing: {puzzleLabel(last.puzzleDate)} puzzle</span>
                )}
              </div>
              <div
                className="col-start-2 row-span-2 row-start-1 text-right font-mono text-lg font-bold tabular-nums text-white sm:col-start-auto sm:row-span-1 sm:row-start-auto"
                aria-live="off"
              >
                {ready && next ? formatCountdown(next.at - now!) : "—"}
              </div>
              <div className="col-span-2 flex items-center gap-2 sm:col-span-1 sm:justify-end">
                {fresh ? (
                  <span className="rounded-full bg-wordle-correct px-2 py-0.5 text-[11px] font-bold text-white">
                    New · {formatCountdown(now! - last!.at).replace(/ \d+s$/, "")} ago
                  </span>
                ) : soon ? (
                  <span className="rounded-full bg-wordle-present px-2 py-0.5 text-[11px] font-bold text-slate-900">Soon</span>
                ) : null}
                {g.todayHref && (
                  <Link href={g.todayHref} className="text-[11px] font-semibold text-primary hover:underline">
                    Hints →
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
