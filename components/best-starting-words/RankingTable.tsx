"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OpenerStat } from "@/lib/wordle-starting-words";
import { WordTiles } from "@/components/wordle-answers/WordTiles";

type SortKey = "entropy" | "expectedRemaining" | "greenProb";

const COLUMNS: {
  key: SortKey;
  label: string;
  hint: string;
  better: "high" | "low";
}[] = [
  { key: "entropy", label: "Entropy", hint: "bits — higher is better", better: "high" },
  { key: "expectedRemaining", label: "Avg. left", hint: "answers remaining — lower is better", better: "low" },
  { key: "greenProb", label: "≥1 green", hint: "chance of a green tile", better: "high" },
];

export default function RankingTable({ rankings }: { rankings: OpenerStat[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("entropy");

  const maxEntropy = useMemo(
    () => Math.max(...rankings.map((r) => r.entropy)),
    [rankings]
  );

  const sorted = useMemo(() => {
    const col = COLUMNS.find((c) => c.key === sortKey)!;
    return [...rankings].sort((a, b) =>
      col.better === "high"
        ? b[sortKey] - a[sortKey]
        : a[sortKey] - b[sortKey]
    );
  }, [rankings, sortKey]);

  return (
    <div>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-border sm:block">
        <table className="w-full text-sm">
          <thead className="bg-muted/60">
            <tr>
              <th className="w-12 px-3 py-3 text-left font-mono text-xs text-muted-foreground">
                #
              </th>
              <th className="px-3 py-3 text-left font-heading font-semibold text-foreground">
                Word
              </th>
              {COLUMNS.map((col) => {
                const active = sortKey === col.key;
                return (
                  <th key={col.key} className="px-3 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSortKey(col.key)}
                      title={col.hint}
                      aria-pressed={active}
                      className={cn(
                        "inline-flex items-center gap-1 font-heading font-semibold transition-colors",
                        active ? "text-cta" : "text-foreground hover:text-cta"
                      )}
                    >
                      {col.label}
                      {active &&
                        (col.better === "high" ? (
                          <ArrowDown className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowUp className="h-3.5 w-3.5" />
                        ))}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sorted.map((r) => (
              <tr
                key={r.word}
                className={cn(
                  "transition-colors hover:bg-muted/40",
                  r.rank <= 3 && "bg-wordle-correct/5",
                  r.avoid && "opacity-70"
                )}
              >
                <td className="px-3 py-2.5 font-mono text-xs font-semibold text-muted-foreground">
                  {r.rank}
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-3">
                    <WordTiles word={r.word} size="sm" className="shrink-0" />
                    <span className="font-mono text-sm font-bold tracking-wide text-foreground">
                      {r.word}
                    </span>
                    {r.avoid && (
                      <span className="rounded bg-wordle-absent/20 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                        avoid
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center justify-end gap-2">
                    <div className="hidden h-1.5 w-20 overflow-hidden rounded bg-muted md:block">
                      <div
                        className="h-full rounded bg-wordle-correct"
                        style={{ width: `${(r.entropy / maxEntropy) * 100}%` }}
                      />
                    </div>
                    <span className="w-10 text-right font-mono text-sm font-semibold text-foreground">
                      {r.entropy.toFixed(2)}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-right font-mono text-sm text-foreground">
                  {Math.round(r.expectedRemaining)}
                </td>
                <td className="px-3 py-2.5 text-right font-mono text-sm text-muted-foreground">
                  {Math.round(r.greenProb * 100)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-2 sm:hidden">
        <div className="flex items-center justify-end gap-1 text-xs">
          <span className="text-muted-foreground">Sort:</span>
          {COLUMNS.map((col) => (
            <button
              key={col.key}
              type="button"
              onClick={() => setSortKey(col.key)}
              className={cn(
                "rounded-md px-2 py-1 font-medium transition-colors",
                sortKey === col.key
                  ? "bg-cta text-cta-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {col.label}
            </button>
          ))}
        </div>
        {sorted.map((r) => (
          <div
            key={r.word}
            className={cn(
              "rounded-xl border border-border bg-card p-3",
              r.rank <= 3 && "border-wordle-correct/40"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-muted-foreground">
                #{r.rank}
              </span>
              <WordTiles word={r.word} size="sm" />
              <span className="font-mono text-sm font-bold text-foreground">
                {r.word}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 font-mono text-xs">
              <div>
                <div className="text-muted-foreground">Entropy</div>
                <div className="font-semibold text-foreground">
                  {r.entropy.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Avg. left</div>
                <div className="font-semibold text-foreground">
                  {Math.round(r.expectedRemaining)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">≥1 green</div>
                <div className="font-semibold text-foreground">
                  {Math.round(r.greenProb * 100)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
