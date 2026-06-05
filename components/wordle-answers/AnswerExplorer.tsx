"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AnswerEntry } from "@/lib/wordle-answers";
import { WordTiles } from "./WordTiles";

type SortKey = "date" | "number" | "alpha";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "date", label: "Date" },
  { key: "number", label: "Puzzle #" },
  { key: "alpha", label: "A–Z" },
];

function formatDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function monthLabel(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function AnswerExplorer({ entries }: { entries: AnswerEntry[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("date");
  const searchId = useId();

  const q = query.trim().toUpperCase();
  const digits = q.replace(/\D/g, "");

  const results = useMemo(() => {
    const filtered = q
      ? entries.filter(
          (e) =>
            e.answer.includes(q) ||
            (digits.length > 0 && String(e.id).includes(digits))
        )
      : entries;

    const sorted = [...filtered];
    if (sort === "date") sorted.sort((a, b) => (a.date < b.date ? 1 : -1));
    else if (sort === "number") sorted.sort((a, b) => b.id - a.id);
    else sorted.sort((a, b) => a.answer.localeCompare(b.answer));
    return sorted;
  }, [entries, q, digits, sort]);

  const showMonthDividers = sort === "date" && !q;

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <label htmlFor={searchId} className="sr-only">
            Search past Wordle answers by word or puzzle number
          </label>
          <input
            id={searchId}
            type="search"
            inputMode="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any word or puzzle #…"
            autoComplete="off"
            className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 font-mono text-sm uppercase tracking-wide outline-none transition-colors placeholder:normal-case placeholder:tracking-normal placeholder:text-muted-foreground focus:border-cta focus:ring-2 focus:ring-cta/30"
          />
        </div>

        <div
          role="group"
          aria-label="Sort answers"
          className="inline-flex shrink-0 rounded-xl border border-input bg-muted/40 p-1"
        >
          {SORTS.map((s) => (
            <button
              key={s.key}
              type="button"
              aria-pressed={sort === s.key}
              onClick={() => setSort(s.key)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                sort === s.key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <p className="mt-3 font-mono text-xs text-muted-foreground" aria-live="polite">
        {q
          ? `${results.length} match${results.length === 1 ? "" : "es"} for "${query.trim()}"`
          : `${results.length} answers`}
      </p>

      {/* Empty state */}
      {results.length === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-border bg-muted/30 px-5 py-8 text-center">
          <p className="font-medium text-foreground">
            No tracked Wordle answer matches &ldquo;{query.trim()}&rdquo;.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            It may not have been used yet, or it falls outside the answers we
            currently track.
          </p>
        </div>
      )}

      {/* Results */}
      <ul className="mt-4 divide-y divide-border">
        {results.map((entry, i) => {
          const isNewMonth =
            showMonthDividers &&
            (i === 0 || monthLabel(results[i - 1].date) !== monthLabel(entry.date));
          return (
            <li key={entry.date}>
              {isNewMonth && (
                <div className="sticky top-0 z-10 -mx-1 bg-background/95 px-1 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/80">
                  <h3 className="font-heading text-sm font-bold text-foreground">
                    {monthLabel(entry.date)}
                  </h3>
                </div>
              )}
              <AnswerRow entry={entry} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function AnswerRow({ entry }: { entry: AnswerEntry }) {
  return (
    <Link
      href={`/wordle-hint/${entry.date}`}
      className="group flex items-center gap-3 py-3 transition-colors hover:bg-muted/40 sm:gap-4 sm:px-2"
    >
      <WordTiles word={entry.answer} size="sm" className="shrink-0" />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-mono text-sm font-bold tracking-wide text-foreground">
            {entry.answer}
          </span>
          {entry.partOfSpeech && (
            <span className="font-mono text-[11px] italic text-muted-foreground">
              {entry.partOfSpeech}
            </span>
          )}
        </div>
        {entry.definition && (
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
            {entry.definition}
          </p>
        )}
      </div>

      <div className="shrink-0 text-right">
        <div className="font-mono text-xs font-semibold text-foreground">
          #{entry.id}
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">
          {formatDate(entry.date)}
        </div>
      </div>

      <ChevronRight
        className="hidden h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-cta sm:block"
        aria-hidden="true"
      />
    </Link>
  );
}
