import { getBoardSize, getPipsBoardFacts } from "@/lib/pips-hints";
import { PIPS_LABEL, PIPS_LEVELS, regionMixText, type PipsHighlight } from "@/lib/pips-insights";
import type { PipsPuzzle } from "@/types/pips";

/** Three ledger cards — one per difficulty — with the board's vital numbers. */
export default function PipsGlance({
  puzzle,
  highlights,
}: {
  puzzle: PipsPuzzle;
  highlights: PipsHighlight[];
}) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {PIPS_LEVELS.map((level) => {
        const board = puzzle[level];
        const facts = getPipsBoardFacts(board);
        const size = getBoardSize(board);
        const notes = highlights.filter((h) => h.level === level);
        return (
          <section
            key={level}
            aria-label={`${PIPS_LABEL[level]} board`}
            className="rounded-2xl border border-dashed border-border bg-card px-4 py-4"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-heading text-base font-bold text-foreground">{PIPS_LABEL[level]}</h3>
              <span className="font-mono text-xs text-muted-foreground">
                by {board.constructors || "NYT"}
              </span>
            </div>
            <p className="mt-1 font-mono text-3xl font-bold tabular-nums text-foreground">
              {facts.dominoes}
              <span className="ml-1.5 text-sm font-semibold text-muted-foreground">dominoes</span>
            </p>
            <dl className="mt-3 space-y-1 text-xs">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Board</dt>
                <dd className="font-mono text-foreground">{size.rows} × {size.cols}, {facts.dominoes * 2} squares</dd>
              </div>
              <div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Regions</dt>
                  <dd className="font-mono text-foreground">{facts.regions}</dd>
                </div>
                <dd className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{regionMixText(board)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">One-square regions</dt>
                <dd className="font-mono text-foreground">{facts.oneSquareSums}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Doubles</dt>
                <dd className="font-mono text-foreground">{facts.doubles}</dd>
              </div>
            </dl>
            {notes.map((n) => (
              <p key={n.short} className="mt-3 rounded-lg bg-amber-500/10 px-3 py-2 text-xs leading-relaxed text-foreground">
                {n.text}
              </p>
            ))}
          </section>
        );
      })}
    </div>
  );
}
