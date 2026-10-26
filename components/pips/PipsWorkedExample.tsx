import { getPipsHints } from "@/lib/pips-hints";
import type { PipsBoard } from "@/types/pips";
import PipsBoardSvg from "./PipsBoardSvg";

/** The four hint steps for one board, drawn side by side. */
export default function PipsWorkedExample({ board }: { board: PipsBoard }) {
  const steps = getPipsHints(board);
  return (
    <ol className="grid gap-4 sm:grid-cols-2">
      {steps.map((s, i) => (
        <li key={s.kind} className="rounded-2xl border border-border bg-card p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            Step {i + 1} · {s.title}
          </p>
          <div className="mx-auto mt-3 max-w-[220px]">
            <PipsBoardSvg
              board={board}
              placed={s.dominoes}
              highlight={s.cells}
              label={`Worked example, step ${i + 1}: ${s.title}`}
            />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
