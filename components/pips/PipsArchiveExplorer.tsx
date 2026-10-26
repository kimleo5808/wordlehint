"use client";

import { useEffect, useMemo, useState } from "react";
import { getPipsHints } from "@/lib/pips-hints";
import type { PipsBoard, PipsDifficulty } from "@/types/pips";
import PipsHintLadder from "./PipsHintLadder";

type MonthIndex = { month: string; days: [string, number][] }[];
type ArchivePuzzle = { date: string; id: number } & Record<PipsDifficulty, PipsBoard>;

const LEVELS: PipsDifficulty[] = ["easy", "medium", "hard"];

function monthLabel(m: string): string {
  return new Date(`${m}-15T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "#d=2025-12-01" in the URL opens that date (used by the record links). */
function hashDate(): string | null {
  const m = window.location.hash.match(/^#d=(d{4}-d{2}-d{2})$/);
  return m ? m[1] : null;
}

/**
 * Every past Pips without a page per day: pick a month and a date, and the
 * three solved boards load from /data/pips/<month>.json (built before each
 * deploy from puzzles before today only).
 */
export default function PipsArchiveExplorer() {
  const [index, setIndex] = useState<MonthIndex | null>(null);
  const [month, setMonth] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [cache, setCache] = useState<Record<string, ArchivePuzzle[]>>({});
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/data/pips/index.json")
      .then((r) => r.json())
      .then((idx: MonthIndex) => {
        setIndex(idx);
        const wanted = hashDate();
        const hit = wanted ? idx.find((m) => m.days.some(([d]) => d === wanted)) : undefined;
        if (hit && wanted) {
          setMonth(hit.month);
          setDate(wanted);
          requestAnimationFrame(() => document.getElementById("archive-heading")?.scrollIntoView());
        } else if (idx[0]) {
          setMonth(idx[0].month);
          setDate(idx[0].days[0]?.[0] ?? "");
        }
      })
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    if (!index) return;
    const onHash = () => {
      const wanted = hashDate();
      const hit = wanted ? index.find((m) => m.days.some(([d]) => d === wanted)) : undefined;
      if (!hit || !wanted) return;
      setMonth(hit.month);
      setDate(wanted);
      document.getElementById("archive-heading")?.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [index]);

  useEffect(() => {
    if (!month || cache[month]) return;
    fetch(`/data/pips/${month}.json`)
      .then((r) => r.json())
      .then((list: ArchivePuzzle[]) => setCache((c) => ({ ...c, [month]: list })))
      .catch(() => setError(true));
  }, [month, cache]);

  const days = index?.find((m) => m.month === month)?.days ?? [];
  const puzzle = cache[month]?.find((p) => p.date === date);
  const boards = useMemo(
    () =>
      puzzle
        ? LEVELS.map((difficulty) => ({
            difficulty,
            board: puzzle[difficulty],
            steps: getPipsHints(puzzle[difficulty]),
          }))
        : [],
    [puzzle]
  );

  if (error) {
    return <p className="text-sm text-muted-foreground">The archive couldn&apos;t load. Please refresh the page.</p>;
  }
  if (!index) {
    return <p className="text-sm text-muted-foreground">Loading the Pips archive…</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="pips-month" className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Month
        </label>
        <select
          id="pips-month"
          value={month}
          onChange={(e) => {
            const m = e.target.value;
            setMonth(m);
            setDate(index.find((x) => x.month === m)?.days[0]?.[0] ?? "");
          }}
          className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground"
        >
          {index.map((m) => (
            <option key={m.month} value={m.month}>
              {monthLabel(m.month)}
            </option>
          ))}
        </select>
      </div>

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {days.map(([d, id]) => (
          <li key={d}>
            <button
              type="button"
              onClick={() => setDate(d)}
              aria-pressed={d === date}
              className={`rounded-lg border px-2.5 py-1 font-mono text-xs transition-colors ${
                d === date
                  ? "border-foreground bg-foreground text-background"
                  : "border-dashed border-border text-foreground hover:bg-muted"
              }`}
            >
              {Number(d.slice(8))} <span className="opacity-60">#{id}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        {puzzle ? (
          <PipsHintLadder key={puzzle.date} boards={boards} date={puzzle.date} initialStage={4} />
        ) : (
          <p className="text-sm text-muted-foreground">Loading…</p>
        )}
      </div>
    </div>
  );
}
