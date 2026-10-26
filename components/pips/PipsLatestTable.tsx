import { formatShortDate } from "@/lib/date-pages";
import { getPipsByDate } from "@/lib/pips-daily";
import { getPipsHighlights, PIPS_LEVELS } from "@/lib/pips-insights";
import Link from "next/link";

/**
 * The newest Pips puzzles as a data table: board sizes per difficulty,
 * the Hard constructor and anything unusual — nothing that places a domino.
 */
export default function PipsLatestTable({
  pages,
}: {
  pages: { date: string; id: number; href: string; archived: boolean }[];
}) {
  const rows = pages
    .map((link) => ({ link, puzzle: getPipsByDate(link.date) }))
    .filter((r) => r.puzzle !== undefined);
  if (rows.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full text-sm sm:min-w-[34rem]">
        <thead>
          <tr className="border-b border-border text-left font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <th scope="col" className="px-4 py-2.5 font-normal">Puzzle</th>
            <th scope="col" className="px-2 py-2.5 text-right font-normal">Easy</th>
            <th scope="col" className="px-2 py-2.5 text-right font-normal">Medium</th>
            <th scope="col" className="px-2 py-2.5 text-right font-normal">Hard</th>
            <th scope="col" className="hidden px-4 py-2.5 font-normal sm:table-cell">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-dashed divide-border">
          {rows.map(({ link, puzzle }) => {
            const p = puzzle!;
            const note = getPipsHighlights(p)[0]?.short;
            return (
              <tr key={link.date}>
                <th scope="row" className="px-4 py-2.5 text-left font-normal">
                  {link.archived ? (
                    <a href={link.href} className="font-mono font-bold text-primary hover:text-primary/80">
                      Pips #{link.id}
                    </a>
                  ) : (
                    <Link href={link.href} className="font-mono font-bold text-primary hover:text-primary/80">
                      Pips #{link.id}
                    </Link>
                  )}
                  <span className="block text-xs text-muted-foreground">{formatShortDate(link.date)}</span>
                  {note && <span className="mt-0.5 block text-xs font-semibold text-foreground sm:hidden">{note}</span>}
                </th>
                {PIPS_LEVELS.map((l) => (
                  <td key={l} className="px-2 py-2.5 text-right font-mono tabular-nums text-foreground">
                    {p[l].dominoes.length}
                  </td>
                ))}
                <td className="hidden px-4 py-2.5 text-xs text-muted-foreground sm:table-cell">
                  {note ? <span className="font-semibold text-foreground">{note}</span> : null}
                  <span className="block">Hard by {p.hard.constructors || "NYT"}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
