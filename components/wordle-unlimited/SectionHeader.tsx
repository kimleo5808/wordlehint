/**
 * SectionHeader — module header used at the top of every H2 block.
 *
 * Editorial-newsprint pattern: small mono-spaced section number above the
 * title, signal-red dashes flanking it, then the H2 itself in Fraunces
 * small-caps with wide tracking.
 *
 *               ─── 01 ───
 *       WHAT MAKES WORDLE UNLIMITED DIFFERENT
 */
export default function SectionHeader({
  number,
  children,
  id,
}: {
  number: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <header className="mt-24 mb-6 text-center first:mt-12 sm:mt-32">
      <div
        aria-hidden="true"
        className="flex items-center justify-center gap-2 font-plex-mono text-[11px] uppercase tracking-[0.24em] text-brand-signal"
      >
        <span className="h-px w-8 bg-brand-signal/60" />
        <span>{number}</span>
        <span className="h-px w-8 bg-brand-signal/60" />
      </div>
      <h2
        id={id}
        className="mt-3 font-fraunces text-[26px] font-bold leading-tight text-brand-ink sm:text-[32px] lg:text-[36px] dark:text-brand-dark-ink"
        style={{ letterSpacing: "0.01em" }}
      >
        {children}
      </h2>
    </header>
  );
}
