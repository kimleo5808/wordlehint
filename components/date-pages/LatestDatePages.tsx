import { formatShortDate, type DateLink } from "@/lib/date-pages";
import Link from "next/link";

/** Hub block linking the most recent per-date pages, newest first. */
export default function LatestDatePages({
  heading,
  intro,
  game,
  pages,
}: {
  heading: string;
  intro: string;
  game: string;
  pages: DateLink[];
}) {
  if (pages.length === 0) return null;
  return (
    <section className="mt-8" aria-labelledby="latest-pages-heading">
      <h2
        id="latest-pages-heading"
        className="font-heading text-2xl font-bold text-foreground"
      >
        {heading}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{intro}</p>
      <ul
        className="mt-4 grid gap-2"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(9.5rem, 1fr))" }}
      >
        {pages.map((p) => (
          <li key={p.date}>
            <Link
              href={p.href}
              className="block rounded-xl border border-dashed border-border bg-card px-3 py-2.5 transition-colors hover:bg-muted"
            >
              <span className="block font-mono text-sm font-bold text-foreground">
                {game} #{p.id}
              </span>
              <span className="block text-xs text-muted-foreground">
                {formatShortDate(p.date)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
