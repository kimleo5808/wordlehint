"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { CONN_COLORS } from "@/components/connections/colors";
import ColourBar from "./ColourBar";

type Index = {
  pagesFrom: string;
  puzzles: [number, string][];
  categories: string[];
  words: Record<string, number[]>;
};

const COLOURS = [
  { name: "Yellow", ...CONN_COLORS.yellow },
  { name: "Green", ...CONN_COLORS.green },
  { name: "Blue", ...CONN_COLORS.blue },
  { name: "Purple", ...CONN_COLORS.purple },
];
const QUICK = ["BALL", "RING", "FISH", "JACK", "BLUE"];

function shortDate(d: string): string {
  return new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Look up any word's Connections career: every appearance before today,
 * its colour and category. The index (public/data/connections-words.json,
 * built before each deploy) loads on first use, not with the page.
 */
export default function WordLookup({ lastDate }: { lastDate: string }) {
  const [index, setIndex] = useState<Index | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [word, setWord] = useState<string | null>(null);
  const loading = useRef(false);

  function load() {
    if (index || loading.current) return;
    loading.current = true;
    fetch("/data/connections-words.json")
      .then((r) => r.json())
      .then((data: Index) => setIndex(data))
      .catch(() => setFailed(true));
  }

  const q = query.trim().toUpperCase();
  const suggestions = useMemo(() => {
    if (!index || q.length < 2) return [];
    return Object.keys(index.words)
      .filter((w) => w.startsWith(q))
      .sort((a, b) => index.words[b].length - index.words[a].length || a.localeCompare(b))
      .slice(0, 8);
  }, [index, q]);

  const result = useMemo(() => {
    if (!index || !word) return null;
    const flat = index.words[word];
    if (!flat) return { word, rows: [], counts: [0, 0, 0, 0] as [number, number, number, number] };
    const counts: [number, number, number, number] = [0, 0, 0, 0];
    const rows = [];
    for (let i = 0; i < flat.length; i += 2) {
      const [id, date] = index.puzzles[flat[i]];
      const level = flat[i + 1];
      counts[level]++;
      rows.push({ id, date, level, category: index.categories[flat[i] * 4 + level], page: date >= index.pagesFrom });
    }
    rows.reverse();
    return { word, rows, counts };
  }, [index, word]);

  function pick(w: string) {
    load();
    setQuery(w);
    setWord(w.trim().toUpperCase());
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (q) pick(q);
        }}
        className="flex gap-2"
      >
        <label htmlFor="conn-word" className="sr-only">
          Look up a Connections word
        </label>
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="conn-word"
            value={query}
            onFocus={load}
            onChange={(e) => {
              load();
              setQuery(e.target.value);
            }}
            placeholder="Any word, e.g. BALL"
            autoComplete="off"
            className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 font-mono text-sm uppercase text-foreground placeholder:normal-case placeholder:text-muted-foreground"
          />
        </div>
        <button type="submit" className="rounded-lg bg-cta px-4 text-sm font-bold text-cta-foreground">
          Look up
        </button>
      </form>

      {suggestions.length > 0 && q !== word && (
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => pick(s)}
                className="rounded-md border border-dashed border-border px-2 py-0.5 font-mono text-xs text-foreground hover:bg-muted"
              >
                {s} <span className="text-muted-foreground">{index!.words[s].length / 2}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {!word && (
        <p className="mt-3 text-xs text-muted-foreground">
          Try{" "}
          {QUICK.map((w, i) => (
            <span key={w}>
              {i > 0 && ", "}
              <button type="button" onClick={() => pick(w)} className="font-mono font-semibold text-primary hover:text-primary/80">
                {w}
              </button>
            </span>
          ))}
          . Covers every puzzle up to {shortDate(lastDate)}; today&apos;s words are added tomorrow, so this can&apos;t spoil today&apos;s grid.
        </p>
      )}

      {failed && <p className="mt-3 text-sm text-muted-foreground">The word list couldn&apos;t load. Please refresh the page.</p>}
      {word && !index && !failed && <p className="mt-3 text-sm text-muted-foreground">Loading the word list…</p>}

      {result && (
        <div className="mt-4">
          {result.rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              <span className="font-mono font-bold text-foreground">{result.word}</span> hasn&apos;t appeared in any
              Connections puzzle before today.
            </p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                <span className="font-mono text-base font-bold text-foreground">{result.word}</span>{" "}
                appeared in <span className="font-semibold text-foreground">{result.rows.length}</span>{" "}
                {result.rows.length === 1 ? "puzzle" : "puzzles"}:{" "}
                {result.counts
                  .map((n, i) => (n ? `${n} ${COLOURS[i].name.toLowerCase()}` : ""))
                  .filter(Boolean)
                  .join(", ")}
                .
              </p>
              <div className="mt-2 max-w-sm">
                <ColourBar counts={result.counts} className="h-3" />
              </div>
              <ul className="mt-4 max-h-80 divide-y divide-dashed divide-border overflow-y-auto rounded-xl border border-border">
                {result.rows.map((r) => (
                  <li key={`${r.id}-${r.level}`} className="flex items-center gap-3 px-3 py-2 text-sm">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: COLOURS[r.level].bg }} aria-hidden />
                    <span className="shrink-0 whitespace-nowrap font-mono text-xs text-muted-foreground">
                      {r.page ? (
                        <Link href={`/connections-answers/${r.date}`} className="font-semibold text-primary hover:text-primary/80">
                          #{r.id}
                        </Link>
                      ) : (
                        <>#{r.id}</>
                      )}{" "}
                      · {shortDate(r.date)}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-foreground" title={r.category}>
                      <span className="sr-only">{COLOURS[r.level].name}: </span>
                      {r.category}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
