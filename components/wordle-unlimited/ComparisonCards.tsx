import { COMPARISON_ROWS } from "@/data/wordle-unlimited/comparison";

/**
 * ComparisonCards — H2-5 side-by-side cards.
 *
 * Desktop: two columns, one card per side, eight dimensions stacked inside.
 * Mobile:  collapses to alternating dimension blocks (label → both values).
 *
 * Left card (Wordle Unlimited) has the signal-red accent edge to claim
 * primacy on this page.
 */
export default function ComparisonCards() {
  return (
    <div className="my-6">
      {/* Desktop two-column */}
      <div className="hidden grid-cols-2 gap-3 sm:grid">
        <Column
          label="Wordle Unlimited"
          subLabel="this page"
          accent
          rows={COMPARISON_ROWS.map((r) => ({ dim: r.dimension, val: r.unlimited }))}
        />
        <Column
          label="NYT Wordle"
          subLabel="official"
          rows={COMPARISON_ROWS.map((r) => ({ dim: r.dimension, val: r.nyt }))}
        />
      </div>

      {/* Mobile alternating blocks */}
      <div className="space-y-4 sm:hidden">
        {COMPARISON_ROWS.map((row) => (
          <div
            key={row.dimension}
            className="border-l-2 border-brand-tan pl-3"
          >
            <div className="font-plex-mono text-[10px] uppercase tracking-[0.16em] text-brand-subtle">
              {row.dimension}
            </div>
            <div className="mt-1 flex flex-col gap-0.5 font-fraunces text-[16px] text-brand-ink dark:text-brand-dark-ink">
              <div>
                <span className="font-plex-mono text-[10px] text-brand-signal">
                  Unlimited:
                </span>{" "}
                {row.unlimited}
              </div>
              <div>
                <span className="font-plex-mono text-[10px] text-brand-subtle">
                  NYT:
                </span>{" "}
                {row.nyt}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Column({
  label,
  subLabel,
  accent,
  rows,
}: {
  label: string;
  subLabel: string;
  accent?: boolean;
  rows: { dim: string; val: string }[];
}) {
  return (
    <div
      className={`border bg-brand-paper p-4 sm:p-5 dark:bg-brand-dark-paper ${
        accent
          ? "border-brand-signal dark:border-brand-signal"
          : "border-brand-midInk/50 dark:border-brand-dark-ink/30"
      }`}
    >
      <div className="border-b border-brand-tan/40 pb-3 dark:border-brand-dark-ink/20">
        <div className="font-fraunces text-lg font-bold text-brand-ink dark:text-brand-dark-ink">
          {label}
        </div>
        <div className="font-plex-mono text-[10px] uppercase tracking-[0.18em] text-brand-subtle">
          {subLabel}
        </div>
      </div>
      <div className="mt-3 space-y-3">
        {rows.map((row) => (
          <div key={row.dim}>
            <div className="font-plex-mono text-[10px] uppercase tracking-[0.14em] text-brand-subtle">
              {row.dim}
            </div>
            <div className="font-fraunces text-[17px] text-brand-ink dark:text-brand-dark-ink">
              {row.val}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
