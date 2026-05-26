import { GAME_MODES } from "@/data/wordle-unlimited/modes";

/**
 * ModeGrid — H2-6 2x2 grid of game-mode cards.
 * Each card holds the mode label (Fraunces) plus a one-line description
 * (Newsreader).
 */
export default function ModeGrid() {
  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
      {GAME_MODES.map((mode) => (
        <div
          key={mode.id}
          className="border border-brand-midInk/50 bg-brand-paper p-4 sm:p-5 dark:border-brand-dark-ink/30 dark:bg-brand-dark-paper"
        >
          <div className="font-fraunces text-lg font-bold text-brand-ink dark:text-brand-dark-ink">
            {mode.label}
          </div>
          <p className="mt-1.5 font-newsreader text-[14px] leading-relaxed text-brand-ink/80 dark:text-brand-dark-ink/80">
            {mode.description}
          </p>
        </div>
      ))}
    </div>
  );
}
