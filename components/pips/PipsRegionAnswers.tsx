import { describePlacement } from "@/lib/pips-hints";
import { getRegionAnswers, singleSquareGrid } from "@/lib/pips-insights";
import type { PipsBoard } from "@/types/pips";

/**
 * The solution as text, region by region (server-rendered, so it's in the
 * HTML). Colour names match the drawn board; each region is located by the
 * square that carries its badge. An all-single-square board is shown as the
 * number grid it is.
 */
export default function PipsRegionAnswers({ board }: { board: PipsBoard }) {
  const grid = singleSquareGrid(board);
  const regions = grid ? [] : getRegionAnswers(board);

  return (
    <div>
      {grid ? (
        <div className="overflow-x-auto">
          <table className="border-separate border-spacing-1 font-mono text-sm">
            <caption className="sr-only">The solved board, row by row</caption>
            <tbody>
              {grid.map((row, r) => (
                <tr key={r}>
                  <th scope="row" className="pr-2 text-left text-[11px] font-normal uppercase tracking-wider text-muted-foreground">
                    Row {r + 1}
                  </th>
                  {row.map((v, c) => (
                    <td
                      key={c}
                      className={`h-8 w-8 rounded-md text-center font-bold ${v === null ? "" : "border border-border bg-card text-foreground"}`}
                    >
                      {v ?? ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <ul className="divide-y divide-dashed divide-border rounded-2xl border border-border bg-card">
          {regions.map((a) => (
            <li key={a.start} className="flex items-center gap-3 px-4 py-2.5">
              <span
                className="inline-flex h-7 min-w-[2.25rem] shrink-0 items-center justify-center rounded-md border border-slate-700/40 px-1 font-mono text-xs font-bold text-slate-800"
                style={{ backgroundColor: a.fill }}
              >
                {a.badge || "–"}
              </span>
              <span className="min-w-0 flex-1 text-sm text-muted-foreground">
                <span className="font-semibold capitalize text-foreground">{a.colour}</span>{" "}
                {a.rule} · from {a.start}
                {a.size > 1 ? ` · ${a.size} squares` : ""}
              </span>
              <span className="shrink-0 font-mono text-sm font-bold tabular-nums text-foreground">{a.answer}</span>
            </li>
          ))}
        </ul>
      )}

      <details className="mt-3 text-sm text-muted-foreground">
        <summary className="cursor-pointer font-semibold text-foreground">
          Domino positions ({board.dominoes.length})
        </summary>
        <p className="mt-2 text-xs">Numbers read top to bottom, or left to right.</p>
        <ul className="mt-1.5 grid gap-x-6 gap-y-0.5 font-mono text-xs sm:grid-cols-2">
          {board.solution.map((_, i) => (
            <li key={i}>{describePlacement(board, i)}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}
