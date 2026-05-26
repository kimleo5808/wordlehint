/**
 * ScrollHint — small italic hint at the bottom of fold 1.
 * Tells the user there is full content below the game.
 * Arrow gently floats vertically (4px, 2s loop).
 */
export default function ScrollHint() {
  return (
    <div
      aria-hidden="true"
      className="mt-2 flex flex-col items-center gap-1 font-plex-mono text-[11px] italic text-brand-ink/50 dark:text-brand-dark-ink/50"
    >
      <span>Scroll for the full guide</span>
      <span className="animate-bounce text-base" style={{ animationDuration: "2s" }}>
        ⌄
      </span>
    </div>
  );
}
