"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

function shortDate(d: string): string {
  return new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * "Has this word been a Wordle answer?" — looks a word up in every answer
 * since #0. Today's answer is deliberately left out of the index (it would
 * turn the checker into an answer oracle), so it only appears tomorrow.
 */
export default function WordUsageChecker({
  index,
  pagesStart,
  throughDate,
}: {
  /** word → [date, puzzle number][] */
  index: Record<string, [string, number][]>;
  /** Dates from here on have a /wordle-hint/[date] page to link to. */
  pagesStart: string;
  /** Last date included (yesterday). */
  throughDate: string;
}) {
  const [query, setQuery] = useState("");
  const word = query.trim().toUpperCase();
  const valid = /^[A-Z]{5}$/.test(word);
  const uses = useMemo(() => (valid ? index[word] ?? [] : []), [index, word, valid]);

  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <label htmlFor="wordle-check" className="font-heading text-sm font-semibold text-foreground">
        Has this word been a Wordle answer?
      </label>
      <div className="mt-2 flex items-center gap-2 rounded-xl border border-border bg-background px-3 focus-within:ring-2 focus-within:ring-primary/40">
        <Search className="h-4 w-4 text-muted-foreground" aria-hidden />
        <input
          id="wordle-check"
          value={query}
          onChange={(e) => setQuery(e.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 5))}
          placeholder="Type a 5-letter word"
          autoComplete="off"
          spellCheck={false}
          className="h-11 w-full bg-transparent font-mono text-lg font-bold uppercase tracking-[0.3em] text-foreground outline-none placeholder:font-body placeholder:text-sm placeholder:font-normal placeholder:normal-case placeholder:tracking-normal"
        />
      </div>

      <div className="mt-3 min-h-[3rem] text-sm" aria-live="polite">
        {!word && (
          <p className="text-muted-foreground">
            Checks every answer from #0 through {shortDate(throughDate)}.
          </p>
        )}
        {word && !valid && (
          <p className="text-muted-foreground">Keep typing — Wordle answers have 5 letters.</p>
        )}
        {valid && uses.length === 0 && (
          <p className="text-foreground">
            <span className="font-mono font-bold">{word}</span> hasn&apos;t been a Wordle
            answer (through {shortDate(throughDate)}).
          </p>
        )}
        {valid && uses.length > 0 && (
          <div>
            <p className="text-foreground">
              <span className="font-mono font-bold">{word}</span> has been the answer{" "}
              <strong>{uses.length === 1 ? "once" : `${uses.length} times`}</strong>
              {uses.length > 1 ? " — a repeat." : "."}
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {uses.map(([date, id]) => (
                <li key={date}>
                  {date >= pagesStart ? (
                    <Link
                      href={`/wordle-hint/${date}`}
                      className="inline-block rounded-lg border border-border px-2.5 py-1 font-mono text-xs font-semibold text-primary hover:bg-muted"
                    >
                      #{id} · {shortDate(date)}
                    </Link>
                  ) : (
                    <span className="inline-block rounded-lg border border-dashed border-border px-2.5 py-1 font-mono text-xs text-muted-foreground">
                      #{id} · {shortDate(date)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Today&apos;s answer is added tomorrow, so this box can&apos;t spoil today&apos;s puzzle.
      </p>
    </div>
  );
}
