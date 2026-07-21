import { CONN_COLORS, type ConnColor } from "@/components/connections/colors";

const LEGEND: { color: ConnColor; label: string; note: string }[] = [
  { color: "yellow", label: "Yellow · Easiest", note: "Straightforward category" },
  { color: "green", label: "Green · Easy", note: "A small twist" },
  { color: "blue", label: "Blue · Hard", note: "Specific knowledge" },
  { color: "purple", label: "Purple · Trickiest", note: "Wordplay and traps" },
];

/**
 * DifficultyLegend — H2-3 four-colour ladder, newsprint style.
 * Colours applied inline from CONN_COLORS so JIT purge never drops them.
 */
export default function DifficultyLegend() {
  return (
    <div className="my-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
      {LEGEND.map((item) => {
        const c = CONN_COLORS[item.color];
        return (
          <div
            key={item.color}
            className="border border-brand-midInk/30 bg-brand-paper p-3 dark:border-brand-dark-ink/20 dark:bg-brand-dark-paper"
          >
            <span
              aria-hidden="true"
              className="block h-2 w-full rounded-sm"
              style={{ backgroundColor: c.bg }}
            />
            <div className="mt-2 font-plex-mono text-[10px] uppercase tracking-[0.14em] text-brand-ink dark:text-brand-dark-ink">
              {item.label}
            </div>
            <div className="font-newsreader text-[13px] text-brand-ink/70 dark:text-brand-dark-ink/70">
              {item.note}
            </div>
          </div>
        );
      })}
    </div>
  );
}
