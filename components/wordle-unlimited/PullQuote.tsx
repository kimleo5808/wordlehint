/**
 * PullQuote — editorial-style block quote with signal-red side rule.
 * Used inside H2-4 to surface the CRANE opener insight.
 */
export default function PullQuote({
  text,
  cite,
}: {
  text: string;
  cite?: string;
}) {
  return (
    <blockquote className="my-6 border-l-4 border-brand-signal pl-5 sm:pl-6">
      <p className="font-fraunces text-[20px] italic leading-snug text-brand-ink sm:text-[22px] dark:text-brand-dark-ink">
        &ldquo;{text}&rdquo;
      </p>
      {cite && (
        <footer className="mt-2 font-plex-mono text-[11px] uppercase tracking-[0.16em] text-brand-subtle">
          — {cite}
        </footer>
      )}
    </blockquote>
  );
}
