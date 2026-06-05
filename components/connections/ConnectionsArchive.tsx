"use client";

import { useId, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONN_COLORS, type ConnColor } from "./colors";

const LEVEL_COLOR: ConnColor[] = ["yellow", "green", "blue", "purple"];
const PAGE_SIZE = 40;

export interface ArchiveGroup {
  level: number;
  name: string;
  words: string[];
}
export interface ArchivePuzzle {
  date: string;
  id: number;
  groups: ArchiveGroup[];
}

function formatDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ConnectionsArchive({
  puzzles,
}: {
  puzzles: ArchivePuzzle[];
}) {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const searchId = useId();

  const q = query.trim().toUpperCase();
  const digits = q.replace(/\D/g, "");

  const results = useMemo(() => {
    if (!q) return puzzles;
    return puzzles.filter((p) => {
      if (digits && String(p.id).includes(digits)) return true;
      return p.groups.some(
        (g) =>
          g.name.includes(q) || g.words.some((w) => w.includes(q))
      );
    });
  }, [puzzles, q, digits]);

  const shown = results.slice(0, limit);

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <label htmlFor={searchId} className="sr-only">
          Search Connections answers by word, category, or puzzle number
        </label>
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setLimit(PAGE_SIZE);
          }}
          placeholder="Search a word, category, or puzzle #…"
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
            No Connections puzzle matches &ldquo;{query.trim()}&rdquo;.
          </p>
        </div>
      )}

      {/* Results */}
      <div className="mt-4 space-y-3">
        {shown.map((p) => (
          <article
            key={p.date}
            className="overflow-hidden rounded-xl border border-border bg-card"
          >
            <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
              <span className="font-heading text-sm font-bold text-foreground">
                #{p.id}
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                {formatDate(p.date)}
              </span>
            </div>
            <div className="divide-y divide-border">
              {p.groups.map((g) => {
                const c = CONN_COLORS[LEVEL_COLOR[g.level] ?? "yellow"];
                return (
                  <div key={g.level} className="flex items-start gap-3 px-4 py-2">
                    <span
                      className="mt-1 inline-block h-3 w-3 shrink-0 rounded-sm"
                      style={{ backgroundColor: c.bg }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[11px] font-bold uppercase tracking-wide text-foreground">
                        {g.name}
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {g.words.join(", ")}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      {results.length > limit && (
        <button
          type="button"
          onClick={() => setLimit((l) => l + PAGE_SIZE)}
          className={cn(
            "mt-4 w-full rounded-lg border border-border py-2 text-sm font-semibold text-cta transition-colors hover:bg-muted"
          )}
        >
          Show more ({results.length - limit} left)
        </button>
      )}
    </div>
  );
}
