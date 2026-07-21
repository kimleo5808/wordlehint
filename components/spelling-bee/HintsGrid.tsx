import type { HintsGridData } from "@/lib/spelling-bee-hints";

/**
 * The classic NYT-forum hints grid: first letter × word length with row and
 * column totals. Server-rendered — it's statistics, not spoilers, so it
 * stays visible by convention.
 */
export default function HintsGrid({
  grid,
  centerLetter,
}: {
  grid: HintsGridData;
  centerLetter: string;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full font-mono text-sm tabular-nums">
        <thead className="bg-muted/60">
          <tr>
            <th className="px-3 py-2 text-left font-semibold text-foreground" />
            {grid.lengths.map((len) => (
              <th
                key={len}
                className="px-3 py-2 text-center font-semibold text-foreground"
              >
                {len}
              </th>
            ))}
            <th className="px-3 py-2 text-center font-bold text-foreground">
              Σ
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {grid.letters.map((letter) => (
            <tr key={letter}>
              <td
                className={`px-3 py-2 uppercase ${
                  letter === centerLetter
                    ? "font-bold text-wordle-present"
                    : "font-semibold text-foreground"
                }`}
              >
                {letter}
              </td>
              {grid.lengths.map((len) => (
                <td
                  key={len}
                  className="px-3 py-2 text-center text-muted-foreground"
                >
                  {grid.cells[letter][len] ?? "-"}
                </td>
              ))}
              <td className="px-3 py-2 text-center font-semibold text-foreground">
                {grid.rowTotals[letter]}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-muted/60">
          <tr>
            <td className="px-3 py-2 font-bold text-foreground">Σ</td>
            {grid.lengths.map((len) => (
              <td
                key={len}
                className="px-3 py-2 text-center font-semibold text-foreground"
              >
                {grid.colTotals[len]}
              </td>
            ))}
            <td className="px-3 py-2 text-center font-bold text-wordle-present">
              {grid.total}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
