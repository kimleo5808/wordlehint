import { LENGTH_TABLE } from "@/data/wordle-unlimited/length-table";
import { Link as I18nLink } from "@/i18n/routing";

/**
 * EditorialDataTable — H2-3 length picker table.
 *
 * Eight rows (4-letter → 11-letter). ASCII-style difficulty bars built from
 * filled blocks. Last column is an internal link to the dedicated practice
 * page for that length.
 *
 * Desktop: full table layout.
 * Mobile: card stack (one card per row) for legibility.
 */

function DifficultyBar({ filled }: { filled: number }) {
  const total = 8;
  return (
    <span aria-label={`Difficulty ${filled} of ${total}`} className="font-plex-mono text-brand-ink">
      <span className="text-brand-signal">{"▓".repeat(filled)}</span>
      <span className="text-brand-tan">{"░".repeat(total - filled)}</span>
    </span>
  );
}

export default function EditorialDataTable() {
  return (
    <div className="my-6">
      {/* Desktop table */}
      <div className="hidden overflow-hidden border border-brand-midInk/50 bg-brand-paper sm:block dark:border-brand-dark-ink/30 dark:bg-brand-dark-paper">
        <table className="w-full font-plex-mono text-[13px]">
          <thead>
            <tr className="border-b border-brand-midInk/60 bg-brand-cream/40 text-left uppercase tracking-[0.12em] text-brand-subtle dark:bg-brand-dark-bg/40">
              <th className="px-4 py-2.5 text-[10px]">Len</th>
              <th className="px-4 py-2.5 text-[10px]">Dict Size</th>
              <th className="px-4 py-2.5 text-[10px]">Difficulty</th>
              <th className="px-4 py-2.5 text-[10px]">Starter</th>
              <th className="px-4 py-2.5 text-[10px]">Practice</th>
            </tr>
          </thead>
          <tbody>
            {LENGTH_TABLE.map((row) => (
              <tr
                key={row.length}
                className="border-b border-brand-tan/40 last:border-b-0 hover:bg-brand-cream/30 dark:border-brand-dark-ink/20"
              >
                <td className="px-4 py-2.5 font-semibold text-brand-ink dark:text-brand-dark-ink">
                  {row.length}
                </td>
                <td className="px-4 py-2.5 text-brand-ink/80 dark:text-brand-dark-ink/80">
                  {row.dictionarySize}
                </td>
                <td className="px-4 py-2.5">
                  <DifficultyBar filled={row.difficultyBars} />
                </td>
                <td className="px-4 py-2.5 font-semibold tracking-wider text-brand-ink dark:text-brand-dark-ink">
                  {row.starterWord}
                </td>
                <td className="px-4 py-2.5">
                  <I18nLink
                    href={row.slug}
                    prefetch={false}
                    className="text-brand-signal hover:text-brand-signalDark hover:underline"
                  >
                    {row.slug} →
                  </I18nLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 sm:hidden">
        {LENGTH_TABLE.map((row) => (
          <I18nLink
            key={row.length}
            href={row.slug}
            prefetch={false}
            className="block border border-brand-midInk/50 bg-brand-paper p-4 transition-colors hover:border-brand-signal dark:border-brand-dark-ink/30 dark:bg-brand-dark-paper"
          >
            <div className="flex items-center justify-between">
              <span className="font-fraunces text-lg font-bold text-brand-ink dark:text-brand-dark-ink">
                {row.label} mode
              </span>
              <span className="font-plex-mono text-[10px] uppercase tracking-wider text-brand-subtle">
                {row.difficultyLabel}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 font-plex-mono text-[12px] text-brand-ink/80 dark:text-brand-dark-ink/80">
              <div>
                <span className="text-brand-subtle">Dict:</span> {row.dictionarySize}
              </div>
              <div>
                <span className="text-brand-subtle">Avg:</span> {row.averageSolveGuesses}
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <span className="text-brand-subtle">Diff:</span>
                <DifficultyBar filled={row.difficultyBars} />
              </div>
              <div className="col-span-2">
                <span className="text-brand-subtle">Starter:</span>{" "}
                <span className="font-semibold tracking-wider">{row.starterWord}</span>
              </div>
            </div>
            <div className="mt-3 text-right font-plex-mono text-[11px] uppercase tracking-wider text-brand-signal">
              Practice {row.slug} →
            </div>
          </I18nLink>
        ))}
      </div>
    </div>
  );
}
