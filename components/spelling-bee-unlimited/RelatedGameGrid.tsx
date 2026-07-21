import { RELATED_GAMES } from "@/data/spelling-bee-unlimited/related-games";
import { Link as I18nLink } from "@/i18n/routing";

/**
 * RelatedGameGrid — H2-8 "Keep Playing" 4-card grid (spelling-bee edition).
 */
export default function RelatedGameGrid() {
  return (
    <div className="my-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {RELATED_GAMES.map((game) => (
        <I18nLink
          key={game.href}
          href={game.href}
          prefetch={false}
          className="group block border border-brand-midInk/40 bg-brand-paper p-4 transition-colors hover:border-brand-signal sm:p-5 dark:border-brand-dark-ink/30 dark:bg-brand-dark-paper"
        >
          <div className="font-plex-mono text-[10px] uppercase tracking-[0.18em] text-brand-signal">
            {game.label}
          </div>
          <div className="mt-2 font-fraunces text-base font-bold leading-tight text-brand-ink sm:text-lg dark:text-brand-dark-ink">
            {game.title}
          </div>
          <p className="mt-2 font-newsreader text-[13px] leading-relaxed text-brand-ink/75 sm:text-[14px] dark:text-brand-dark-ink/75">
            {game.description}
          </p>
          <div className="mt-3 inline-block border-b border-transparent font-plex-mono text-[10px] uppercase tracking-wider text-brand-signal transition-all group-hover:border-brand-signal">
            Open →
          </div>
        </I18nLink>
      ))}
    </div>
  );
}
