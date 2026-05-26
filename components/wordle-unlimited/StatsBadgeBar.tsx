/**
 * StatsBadgeBar — top brand anchor under the nav.
 * Solid signal-red horizontal strip with mono small-caps content.
 *
 * Desktop: 36px tall, full width, four pipe-separated stats.
 * Mobile:  28px tall, dot-separated compact form.
 */
export default function StatsBadgeBar({ wordLength }: { wordLength: number }) {
  return (
    <div
      role="status"
      aria-label={`Wordle Unlimited stats: unlimited rounds, six tries, ${wordLength} letters, no signup required`}
      className="relative w-full bg-brand-signal text-brand-cream"
    >
      {/* Tick decorations at both ends (mock newsprint masthead cuts) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-2 bg-brand-signalDark sm:block"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-2 bg-brand-signalDark sm:block"
      />

      {/* Desktop layout */}
      <div className="hidden h-9 items-center justify-center gap-4 px-6 font-plex-mono text-[11px] uppercase tracking-[0.18em] sm:flex">
        <span>∞ Unlimited</span>
        <span className="opacity-50">│</span>
        <span>6 Tries</span>
        <span className="opacity-50">│</span>
        <span>{wordLength} Letters</span>
        <span className="opacity-50">│</span>
        <span>No Signup</span>
      </div>

      {/* Mobile layout (single compact line) */}
      <div className="flex h-7 items-center justify-center gap-2 px-3 font-plex-mono text-[10px] uppercase tracking-[0.14em] sm:hidden">
        <span>∞ Unlimited</span>
        <span className="opacity-50">·</span>
        <span>6</span>
        <span className="opacity-50">·</span>
        <span>{wordLength}L</span>
        <span className="opacity-50">·</span>
        <span>Free</span>
      </div>
    </div>
  );
}
