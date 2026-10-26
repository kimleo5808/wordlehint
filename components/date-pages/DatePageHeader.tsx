import type { DateLink } from "@/lib/date-pages";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

/**
 * Compact masthead for per-date puzzle pages: breadcrumb, H1, one meta line
 * and a row of data chips — nothing else, so the answers start on the first
 * screen on mobile. The one-sentence summary goes right after the answers.
 */
export default function DatePageHeader({
  kicker,
  title,
  chips = [],
  date,
  publishedLabel,
  editor,
  hub,
  prev,
  next,
  accent,
}: {
  kicker: string;
  title: string;
  /** Short data points; `highlight` ones stand out (rare-board notes). */
  chips?: { label: string; highlight?: boolean }[];
  date: string;
  publishedLabel: string;
  editor?: string;
  hub: { label: string; href: string };
  prev: DateLink | null;
  next: DateLink | null;
  accent: string;
}) {
  return (
    <section
      className="border-b border-border bg-gradient-to-b from-slate-900 to-slate-800"
      style={{ boxShadow: `inset 0 3px 0 ${accent}` }}
    >
      <div className="mx-auto max-w-3xl px-4 pb-5 pt-5 sm:px-6">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-400"
        >
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span aria-hidden>›</span>
          <Link href={hub.href} className="hover:text-white">
            {hub.label}
          </Link>
          <span aria-hidden>›</span>
          <span className="text-slate-300">{kicker}</span>
        </nav>

        <div className="mt-3 flex items-start justify-between gap-4">
          <h1 className="font-heading text-2xl font-bold leading-tight text-white sm:text-3xl">
            {title}
          </h1>
          <div className="flex shrink-0 gap-1.5 pt-1">
            <NavArrow link={prev} dir="prev" />
            <NavArrow link={next} dir="next" />
          </div>
        </div>

        <p className="mt-2 font-mono text-xs text-slate-400">
          Published <time dateTime={date}>{publishedLabel}</time>
          {editor ? ` · Edited by ${editor}` : ""} · Puzzle data from NYT Games
        </p>

        {chips.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5 text-xs">
            {chips.map((c) => (
              <li
                key={c.label}
                className={
                  c.highlight
                    ? "rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-1 font-semibold text-amber-200"
                    : "rounded-full border border-slate-600 bg-slate-800/60 px-2.5 py-1 font-mono text-slate-200"
                }
              >
                {c.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function NavArrow({
  link,
  dir,
}: {
  link: DateLink | null;
  dir: "prev" | "next";
}) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  const label = dir === "prev" ? "Previous puzzle" : "Next puzzle";
  const base =
    "flex h-9 w-9 items-center justify-center rounded-lg border transition-colors";
  if (!link) {
    return (
      <span
        aria-hidden
        className={`${base} border-slate-700 text-slate-600`}
      >
        <Icon className="h-4 w-4" />
      </span>
    );
  }
  return (
    <Link
      href={link.href}
      aria-label={`${label}: #${link.id}`}
      title={`${label} (#${link.id})`}
      className={`${base} border-slate-600 text-slate-200 hover:border-slate-400 hover:text-white`}
    >
      <Icon className="h-4 w-4" />
    </Link>
  );
}
