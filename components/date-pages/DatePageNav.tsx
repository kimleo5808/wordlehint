import { formatShortDate, type DatePageNeighbors } from "@/lib/date-pages";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

/** Previous / next puzzle, the last 7 date pages, and related links. */
export default function DatePageNav({
  heading,
  game,
  date,
  neighbors,
  links,
}: {
  heading: string;
  game: string;
  date: string;
  neighbors: DatePageNeighbors;
  links: { label: string; href: string }[];
}) {
  const { prev, next, recent } = neighbors;
  return (
    <section className="mt-14" aria-labelledby="more-heading">
      <h2
        id="more-heading"
        className="font-heading text-2xl font-bold text-foreground"
      >
        {heading}
      </h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            href={prev.href}
            className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-x-0.5" />
            <span>
              <span className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Previous
              </span>
              <span className="font-heading text-sm font-semibold text-foreground">
                {game} #{prev.id} · {formatShortDate(prev.date)}
              </span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={next.href}
            className="group flex items-center justify-end gap-3 rounded-xl border border-border bg-card px-4 py-3 text-right transition-colors hover:bg-muted"
          >
            <span>
              <span className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Next
              </span>
              <span className="font-heading text-sm font-semibold text-foreground">
                {game} #{next.id} · {formatShortDate(next.date)}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      <ol className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {recent.map((r) => {
          const current = r.date === date;
          return (
            <li key={r.date} className="shrink-0">
              <Link
                href={r.href}
                aria-current={current ? "page" : undefined}
                className={`block rounded-lg border px-3 py-2 text-center transition-colors ${
                  current
                    ? "border-foreground bg-foreground text-background"
                    : "border-dashed border-border bg-card text-foreground hover:bg-muted"
                }`}
              >
                <span className="block font-mono text-xs font-bold">#{r.id}</span>
                <span className="block text-[11px] opacity-80">
                  {formatShortDate(r.date).replace(/, \d{4}$/, "")}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-sm font-semibold text-primary hover:text-primary/80"
          >
            {l.label} →
          </Link>
        ))}
      </div>
    </section>
  );
}
