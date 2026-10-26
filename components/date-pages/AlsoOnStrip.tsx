import type { AlsoOnLink } from "@/lib/date-pages";
import Link from "next/link";

const DOT: Record<string, string> = {
  wordle: "#22a06b",
  connections: "#9333ea",
  strands: "#3b82f6",
  "spelling-bee": "#eab308",
  pips: "#f97316",
};

/** "Also on Oct 26" — the other daily games for the same date. */
export default function AlsoOnStrip({
  label,
  links,
  current,
}: {
  label: string;
  links: AlsoOnLink[];
  current: string;
}) {
  const others = links.filter((l) => l.game !== current);
  if (others.length === 0) return null;
  return (
    <div className="border-b border-dashed border-border bg-muted/30">
      <div className="mx-auto flex max-w-3xl items-center gap-3 overflow-x-auto px-4 py-2.5 sm:px-6">
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {others.map((l) => (
          <Link
            key={l.game}
            href={l.href}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: DOT[l.game] }}
              aria-hidden
            />
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
