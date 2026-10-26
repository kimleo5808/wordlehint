import { describePlacement, type PipsHintStep } from "@/lib/pips-hints";
import type { PipsBoard } from "@/types/pips";

/**
 * The same four hint steps as the interactive ladder, as server-rendered
 * text. Each step is a collapsed <details>, so nothing is spoiled until it's
 * opened but the words are in the HTML.
 */
export default function PipsTextHints({
  board,
  steps,
  label,
}: {
  board: PipsBoard;
  steps: PipsHintStep[];
  label: string;
}) {
  return (
    <div className="divide-y divide-dashed divide-border rounded-2xl border border-border bg-card">
      {steps.map((s, i) => {
        const list = s.kind === "half" || s.kind === "full" ? s.dominoes : [];
        return (
          <details key={s.kind} className="group px-5 py-3.5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <span className="text-sm font-semibold text-foreground">
                <span className="mr-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {s.kind === "full" ? "Answer" : `Hint ${i + 1}`}
                </span>
                {s.kind === "full" ? `Full ${label} solution` : s.title}
              </span>
              <span className="font-mono text-muted-foreground transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            {list.length > 0 && (
              <>
                <ul className="mt-2 grid gap-x-6 gap-y-0.5 font-mono text-xs text-foreground sm:grid-cols-2">
                  {[...list].sort((a, b) => a - b).map((d) => (
                    <li key={d}>{describePlacement(board, d)}</li>
                  ))}
                </ul>
                <p className="mt-1.5 text-xs text-muted-foreground">Numbers read top to bottom, or left to right.</p>
              </>
            )}
          </details>
        );
      })}
    </div>
  );
}
