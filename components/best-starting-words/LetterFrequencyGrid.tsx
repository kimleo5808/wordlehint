import { cn } from "@/lib/utils";
import type { PositionLetter } from "@/lib/wordle-starting-words";

const ORDINAL = ["1st", "2nd", "3rd", "4th", "5th"];

/** Heat intensity 0–1 mapped to a green tint via inline alpha. */
function heatStyle(intensity: number): React.CSSProperties {
  // Use the Wordle green at variable opacity for a clean heatmap feel.
  return { backgroundColor: `hsl(var(--wordle-correct) / ${0.12 + intensity * 0.8})` };
}

export default function LetterFrequencyGrid({
  positionFrequency,
  overallFrequency,
}: {
  positionFrequency: PositionLetter[][];
  overallFrequency: PositionLetter[];
}) {
  const overallMax = overallFrequency[0]?.count ?? 1;

  return (
    <div className="space-y-8">
      {/* Position heatmap */}
      <div>
        <h3 className="font-heading text-base font-bold text-foreground">
          Most common letter by position
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          The top letters in each of the five slots. Darker means more frequent.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {positionFrequency.map((letters, pos) => {
            const max = letters[0]?.count ?? 1;
            return (
              <div
                key={pos}
                className="rounded-xl border border-border bg-card p-3"
              >
                <div className="mb-2 text-center font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {ORDINAL[pos]} letter
                </div>
                <div className="space-y-1">
                  {letters.slice(0, 6).map((l) => {
                    const intensity = l.count / max;
                    const dark = intensity > 0.55;
                    return (
                      <div
                        key={l.letter}
                        style={heatStyle(intensity)}
                        className={cn(
                          "flex items-center justify-between rounded px-2 py-1 font-mono text-xs",
                          dark ? "text-white" : "text-foreground"
                        )}
                      >
                        <span className="font-bold">{l.letter}</span>
                        <span className={dark ? "text-white/80" : "text-muted-foreground"}>
                          {Math.round(l.share * 100)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overall frequency bars */}
      <div>
        <h3 className="font-heading text-base font-bold text-foreground">
          Most common letters overall
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Share of answers that contain each letter anywhere in the word.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {overallFrequency.slice(0, 12).map((l) => (
            <div key={l.letter} className="flex items-center gap-3">
              <span className="w-6 shrink-0 font-mono text-sm font-bold text-foreground">
                {l.letter}
              </span>
              <div className="relative h-5 flex-1 overflow-hidden rounded bg-muted">
                <div
                  className="h-full rounded bg-wordle-correct"
                  style={{ width: `${Math.max((l.count / overallMax) * 100, 2)}%` }}
                />
              </div>
              <span className="w-14 shrink-0 text-right font-mono text-[11px] text-muted-foreground">
                {Math.round(l.share * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
