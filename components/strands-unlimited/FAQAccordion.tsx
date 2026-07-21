import { FAQ_ITEMS } from "@/data/strands-unlimited/faq";

/**
 * FAQAccordion — H2-7 FAQ list (strands edition).
 * Native <details>/<summary> for free keyboard a11y + zero JS.
 */
export default function FAQAccordion() {
  return (
    <div className="my-6 divide-y divide-brand-midInk/30 border-y border-brand-midInk/40 dark:divide-brand-dark-ink/20 dark:border-brand-dark-ink/20">
      {FAQ_ITEMS.map((item) => (
        <details
          key={item.number}
          className="group [&[open]>summary>span:last-child]:rotate-45"
        >
          <summary className="flex cursor-pointer list-none items-center gap-4 px-2 py-4 text-left transition-colors hover:bg-brand-cream/40 sm:px-3 dark:hover:bg-brand-dark-paper/40">
            <span className="font-plex-mono text-[11px] uppercase tracking-[0.14em] text-brand-ink/40 dark:text-brand-dark-ink/40">
              {item.number}
            </span>
            <span className="flex-1 font-newsreader text-[16px] font-medium text-brand-ink sm:text-[17px] dark:text-brand-dark-ink">
              {item.question}
            </span>
            <span
              aria-hidden="true"
              className="font-plex-mono text-[20px] leading-none text-brand-signal transition-transform"
            >
              +
            </span>
          </summary>
          <div className="px-2 pb-5 sm:px-3 sm:pl-12">
            <p className="font-newsreader text-[15px] leading-[1.7] text-brand-ink/85 sm:text-[16px] dark:text-brand-dark-ink/85">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
