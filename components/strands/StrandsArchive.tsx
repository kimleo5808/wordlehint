"use client";

import { useId, useMemo, useState } from "react";
import { Search } from "lucide-react";

const SPANGRAM = "#eab308"; // yellow
const THEME = "#3b82f6"; // blue

export interface ArchiveStrands {
  date: string;
  id: number;
  clue: string;
  spangram: string;
  themeWords: string[];
}

function formatDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function StrandsArchive({
  puzzles,
}: {
  puzzles: ArchiveStrands[];
}) {
  const [query, setQuery] = useState("");
  const searchId = useId();

  const q = query.trim().toUpperCase();
  const digits = q.replace(/\D/g, "");

  const results = useMemo(() => {
    if (!q) return puzzles;
    return puzzles.filter((p) => {
      if (digits && String(p.id).includes(digits)) return true;
      if (p.spangram.includes(q)) return true;
      if (p.clue.toUpperCase().includes(q)) return true;
      return p.themeWords.some((w) => w.includes(q));
    });
  }, [puzzles, q, digits]);

  return (
    <div>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <label htmlFor={searchId} className="sr-only">
          Search Strands answers by word, spangram, clue, or puzzle number
        </label>
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a word, spangram, clue, or puzzle #…"
          autoComplete="off"
          className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-cta focus:ring-2 focus:ring-cta/30"
        />
      </div>

      <p className="mt-3 font-mono text-xs text-muted-foreground" aria-live="polite">
        {q
          ? `${results.length} puzzle${results.length === 1 ? "" : "s"} match "${query.trim()}"`
          : `${results.length} puzzles`}
      </p>

      {results.length === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-border bg-muted/30 px-5 py-8 text-center">
          <p className="font-medium text-foreground">
            No Strands puzzle matches &ldquo;{query.trim()}&rdquo;.
          </p>
        </div>
      )}

      <div className="mt-4 space-y-3">
        {results.map((p) => (
          <article
            key={p.date}
            className="overflow-hidden rounded-xl border border-border bg-card"
          >
            <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
              <span className="font-heading text-sm font-bold text-foreground">
                #{p.id}
                {p.clue ? (
                  <span className="ml-2 font-body text-xs font-normal italic text-muted-foreground">
                    &ldquo;{p.clue}&rdquo;
                  </span>
                ) : null}
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                {formatDate(p.date)}
              </span>
            </div>
            <div className="space-y-2 p-4">
              <div className="flex items-center gap-2">
                <span className="w-20 shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Spangram
                </span>
                <span
                  className="rounded px-2 py-0.5 font-mono text-xs font-bold text-white"
                  style={{ backgroundColor: SPANGRAM }}
                >
                  {p.spangram}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-20 shrink-0 pt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Theme
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {p.themeWords.map((w) => (
                    <span
                      key={w}
                      className="rounded px-2 py-0.5 font-mono text-xs font-bold text-white"
                      style={{ backgroundColor: THEME }}
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
