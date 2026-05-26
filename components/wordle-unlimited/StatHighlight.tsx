/**
 * StatHighlight — centered "big number" block.
 * Used inside H2-7 (the 14% lexical-retrieval data point).
 */
export default function StatHighlight({
  number,
  label,
  cite,
}: {
  number: string;
  label: string;
  cite?: string;
}) {
  return (
    <div className="my-8 flex flex-col items-center gap-3 py-4 text-center">
      <div className="font-fraunces text-[64px] font-bold leading-none text-brand-signal sm:text-[72px]">
        {number}
      </div>
      <div className="mx-auto h-px w-16 bg-brand-ink/20" />
      <p className="max-w-md font-newsreader text-[14px] leading-relaxed text-brand-ink dark:text-brand-dark-ink">
        {label}
      </p>
      {cite && (
        <p className="font-plex-mono text-[10px] uppercase tracking-[0.18em] text-brand-subtle">
          — {cite}
        </p>
      )}
    </div>
  );
}
