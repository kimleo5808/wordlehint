import { PIPS_LABEL, type PipsComparison } from "@/lib/pips-insights";

const ROWS: { key: keyof PipsComparison["rows"]; label: string }[] = [
  { key: "dominoes", label: "Dominoes" },
  { key: "oneSquare", label: "One-square regions" },
  { key: "compare", label: "Less / greater regions" },
  { key: "doubles", label: "Doubles" },
  { key: "straddle", label: "Dominoes across two regions" },
];

/**
 * Each board's numbers next to the average of every earlier board of the
 * same difficulty, plus one factual sentence per board.
 */
export default function PipsComparisonTable({ comparisons }: { comparisons: PipsComparison[] }) {
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[30rem] text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th scope="col" className="px-4 py-2.5 font-mono text-[11px] font-normal uppercase tracking-wider text-muted-foreground">
                Signal
              </th>
              {comparisons.map((c) => (
                <th key={c.level} scope="col" className="px-4 py-2.5 text-right font-heading text-sm font-bold text-foreground">
                  {PIPS_LABEL[c.level]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-dashed divide-border">
            {ROWS.map((row) => (
              <tr key={row.key}>
                <th scope="row" className="px-4 py-2 text-left font-normal text-muted-foreground">
                  {row.label}
                </th>
                {comparisons.map((c) => (
                  <td key={c.level} className="px-4 py-2 text-right font-mono tabular-nums">
                    <span className="font-bold text-foreground">{c.rows[row.key].value}</span>
                    <span className="ml-1.5 text-[11px] text-muted-foreground">avg {c.rows[row.key].average}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
        {comparisons.map((c) => (
          <li key={c.level}>{c.sentence}</li>
        ))}
      </ul>
    </div>
  );
}
