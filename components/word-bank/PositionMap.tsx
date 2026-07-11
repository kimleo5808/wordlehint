import { cn } from "@/lib/utils";
import { Tile } from "./tiles";

export interface PositionDatum {
  index: number;
  label: string; // ordinal, e.g. "2nd"
  count: number;
}

/**
 * Horizontal five-slot map showing how often a contained letter sits in each
 * position — the "where does a yellow X usually go?" module. Yellow (present)
 * bars echo the roaming-yellow-tile motif of the /with-* pages.
 */
export function PositionMap({
  letter,
  positions,
}: {
  letter: string;
  positions: PositionDatum[];
}) {
  const L = letter.toUpperCase();
  const total = positions.reduce((sum, p) => sum + p.count, 0) || 1;
  const max = Math.max(...positions.map((p) => p.count), 1);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {positions.map((p) => {
          const pct = Math.round((p.count / total) * 100);
          const barPct = (p.count / max) * 100;
          return (
            <div key={p.index} className="flex flex-col items-center gap-2">
              <Tile letter={L} state="present" size="sm" />
              <span className="text-[11px] font-medium text-muted-foreground">
                {p.label}
              </span>
              <div className="flex h-24 w-full items-end justify-center">
                <div
                  className={cn(
                    "w-full max-w-[36px] rounded-t-md bg-wordle-present transition-all",
                    p.count === 0 && "bg-muted"
                  )}
                  style={{ height: `${Math.max(barPct, 2)}%` }}
                  aria-hidden
                />
              </div>
              <span className="font-mono text-xs font-bold text-foreground">
                {pct}%
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {p.count.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Share of five-letter words with {L} where the {L} lands in each slot. A
        yellow {L} in Wordle means it is in the word but <em>not</em> in the slot
        you tried — these odds show where to test it next.
      </p>
    </div>
  );
}
