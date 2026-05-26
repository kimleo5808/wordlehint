/**
 * DropCapParagraph — first paragraph of H2-1 only.
 * The opening letter drops three lines tall in Fraunces signal-red.
 */
export default function DropCapParagraph({ text }: { text: string }) {
  const first = text.charAt(0);
  const rest = text.slice(1);

  return (
    <p className="font-newsreader text-[17px] leading-[1.7] text-brand-ink sm:text-[18px] dark:text-brand-dark-ink">
      <span
        aria-hidden="true"
        className="float-left mr-2 mt-1 font-fraunces text-[64px] font-bold leading-[0.85] text-brand-signal sm:text-[72px]"
      >
        {first}
      </span>
      {rest}
    </p>
  );
}
