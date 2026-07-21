/**
 * StatsBadgeBar — top brand anchor under the nav (connections edition).
 * Mirrors the wordle-unlimited signal-red masthead strip. No puzzle count
 * in the strip by design — the number lives in the content stream instead.
 */
export default function StatsBadgeBar() {
  return (
    <div
      role="status"
      aria-label="Connections Unlimited stats: unlimited rounds, four mistakes, real NYT-style puzzles, no signup required"
      className="relative w-full bg-brand-signal text-brand-cream"
    >
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
        <span>4 Mistakes</span>
        <span className="opacity-50">│</span>
        <span>Real NYT-Style Puzzles</span>
        <span className="opacity-50">│</span>
        <span>No Signup</span>
      </div>

      {/* Mobile layout */}
      <div className="flex h-7 items-center justify-center gap-2 px-3 font-plex-mono text-[10px] uppercase tracking-[0.14em] sm:hidden">
        <span>∞ Unlimited</span>
        <span className="opacity-50">·</span>
        <span>4 ✕</span>
        <span className="opacity-50">·</span>
        <span>Real Puzzles</span>
        <span className="opacity-50">·</span>
        <span>Free</span>
      </div>
    </div>
  );
}
