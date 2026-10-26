"use client";

import { releasesAround, type ResetRule } from "@/lib/reset-times";
import { useResetClock } from "./ResetClock";

function inZone(ms: number, tz: string): string {
  return new Date(ms).toLocaleString("en-US", {
    timeZone: tz,
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function puzzleLabel(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", weekday: "short", month: "short", day: "numeric" });
}

/**
 * The next seven crossword-family puzzles and when each goes up in the
 * viewer's time zone. The Crossword, Midi and Sudoku share one schedule;
 * the Mini gets its own column because NYT documents it separately.
 */
export default function ReleaseCalendar({ crossword, mini }: { crossword: ResetRule; mini: ResetRule }) {
  const { timeZone, now } = useResetClock();
  if (!timeZone || now === null) {
    return <p className="text-sm text-muted-foreground">Loading your local schedule…</p>;
  }
  const upcoming = releasesAround(crossword, now, timeZone).filter((r) => r.at > now).slice(0, 7);
  const minis = releasesAround(mini, now, timeZone);

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full min-w-[26rem] text-sm">
        <thead>
          <tr className="border-b border-border text-left font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <th scope="col" className="px-4 py-2.5 font-normal">Puzzle for</th>
            <th scope="col" className="px-4 py-2.5 font-normal">Crossword · Midi · Sudoku</th>
            <th scope="col" className="px-4 py-2.5 font-normal">The Mini</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-dashed divide-border">
          {upcoming.map((r) => {
            const m = minis.find((x) => x.puzzleDate === r.puzzleDate);
            return (
              <tr key={r.puzzleDate}>
                <th scope="row" className="px-4 py-2 text-left font-semibold text-foreground">{puzzleLabel(r.puzzleDate)}</th>
                <td className="px-4 py-2 font-mono text-foreground">{inZone(r.at, timeZone)}</td>
                <td className={`px-4 py-2 font-mono ${m && m.at !== r.at ? "font-bold text-foreground" : "text-muted-foreground"}`}>
                  {m ? inZone(m.at, timeZone) : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
