"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import type { WordHistoryRow } from "@/lib/connections-history";
import { CONN_COLORS, type ConnColor } from "./colors";

const ORDER: ConnColor[] = ["yellow", "green", "blue", "purple"];

function shortDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Four-segment bar: how often the word sat in each colour before. */
function ColorFingerprint({ counts }: { counts: WordHistoryRow["counts"] }) {
  const total = counts.reduce((a, b) => a + b, 0);
  const label = ORDER.map((c, i) => `${c} ${counts[i]}`).join(", ");
  if (total === 0) {
    return (
      <span
        className="block h-2.5 w-full rounded-full border border-dashed border-border"
        aria-label="No earlier appearances"
      />
    );
  }
  return (
    <span
      className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted"
      role="img"
      aria-label={`Earlier appearances: ${label}`}
      title={label}
    >
      {ORDER.map((c, i) =>
        counts[i] > 0 ? (
          <span
            key={c}
            className="h-full motion-safe:animate-fade-in-up"
            style={{
              width: `${(counts[i] / total) * 100}%`,
              backgroundColor: CONN_COLORS[c].bg,
            }}
          />
        ) : null
      )}
    </span>
  );
}

/**
 * "Have these words appeared before?" — the unique data block on the
 * Connections date pages. Sorted by how often each word showed up earlier.
 * This puzzle's own colour per word is a spoiler, so it can be hidden.
 */
export default function WordHistory({ rows }: { rows: WordHistoryRow[] }) {
  const [showColors, setShowColors] = useState(true);
  const sorted = [...rows].sort(
    (a, b) => b.total - a.total || a.word.localeCompare(b.word)
  );

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {ORDER.map((c) => (
            <span key={c} className="inline-flex items-center gap-1">
              <span
                className="h-2 w-2 rounded-sm"
                style={{ backgroundColor: CONN_COLORS[c].bg }}
                aria-hidden
              />
              {c}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShowColors((v) => !v)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
        >
          {showColors ? (
            <EyeOff className="h-3.5 w-3.5" />
          ) : (
            <Eye className="h-3.5 w-3.5" />
          )}
          {showColors ? "Hide this puzzle's colors" : "Show this puzzle's colors"}
        </button>
      </div>

      <ul className="divide-y divide-dashed divide-border rounded-2xl border border-border bg-card">
        {sorted.map((r) => {
          const color = ORDER[r.level];
          return (
            <li
              key={r.word}
              className="grid items-center gap-x-4 gap-y-1.5 px-4 py-3"
              style={{ gridTemplateColumns: "minmax(0, 1fr) auto" }}
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-3 w-3 shrink-0 rounded-sm border border-border transition-colors"
                  style={{
                    backgroundColor: showColors ? CONN_COLORS[color].bg : "transparent",
                  }}
                  title={showColors ? `${color} in this puzzle` : "Hidden"}
                  aria-label={showColors ? `${color} in this puzzle` : "Color hidden"}
                />
                <span className="truncate font-mono text-sm font-bold text-foreground">
                  {r.word}
                </span>
                {showColors && r.changedColor && (
                  <span className="shrink-0 rounded-full bg-cta/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cta">
                    changed color
                  </span>
                )}
              </div>
              <span className="text-right font-mono text-xs tabular-nums text-muted-foreground">
                {r.total === 0 ? "first time" : `${r.total}× before`}
              </span>
              <div className="col-span-2">
                <ColorFingerprint counts={r.counts} />
              </div>
              {r.last && (
                <p className="col-span-2 text-xs text-muted-foreground">
                  Last seen{" "}
                  {r.last.href ? (
                    <Link
                      href={r.last.href}
                      className="font-semibold text-primary hover:text-primary/80"
                    >
                      #{r.last.id}
                    </Link>
                  ) : (
                    <span className="font-semibold text-foreground">#{r.last.id}</span>
                  )}{" "}
                  ({shortDate(r.last.date)}) in{" "}
                  <span
                    className="font-semibold"
                    style={{ color: CONN_COLORS[ORDER[r.last.level]].bg }}
                  >
                    {ORDER[r.last.level]}
                  </span>
                  : {r.last.category}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
