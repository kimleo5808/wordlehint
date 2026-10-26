import { formatShortDate, hasPipsDatePage } from "@/lib/date-pages";
import { PIPS_LABEL, type PipsRecord } from "@/lib/pips-insights";
import Link from "next/link";

/** Record-board cards. Dates with their own page link there; older ones
 *  open in the archive explorer on this page (#d=YYYY-MM-DD). */
export default function PipsRecords({ records }: { records: PipsRecord[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {records.map((r) => (
        <section key={r.title} aria-label={r.title} className="rounded-2xl border border-dashed border-border bg-card px-4 py-4">
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{r.title}</h3>
          <p className="mt-1 font-mono text-3xl font-bold tabular-nums text-foreground">{r.value}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{r.note}</p>
          <ul className="mt-3 space-y-1 text-xs">
            {r.entries.map((e) => (
              <li key={`${e.date}-${e.level}`}>
                {hasPipsDatePage(e.date) ? (
                  <Link href={`/pips-answers/${e.date}`} className="font-semibold text-primary hover:text-primary/80">
                    #{e.id} {PIPS_LABEL[e.level]}
                  </Link>
                ) : (
                  <a href={`#d=${e.date}`} className="font-semibold text-primary hover:text-primary/80">
                    #{e.id} {PIPS_LABEL[e.level]}
                  </a>
                )}{" "}
                <span className="text-muted-foreground">· {formatShortDate(e.date)}</span>
              </li>
            ))}
            {r.more > 0 && <li className="text-muted-foreground">and {r.more} more</li>}
          </ul>
        </section>
      ))}
    </div>
  );
}
