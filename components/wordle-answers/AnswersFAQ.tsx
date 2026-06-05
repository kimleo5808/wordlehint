import type { FaqItem } from "@/data/wordle-answers/content";

/**
 * FAQ list using native <details>/<summary> for free keyboard a11y + zero JS.
 * Answer tokens are already resolved by the page before this renders.
 */
export default function AnswersFAQ({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details
          key={item.number}
          className="group [&[open]>summary>span:last-child]:rotate-45"
        >
          <summary className="flex cursor-pointer list-none items-center gap-4 py-4 text-left transition-colors hover:text-cta">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {item.number}
            </span>
            <span className="flex-1 font-heading text-base font-semibold text-foreground">
              {item.question}
            </span>
            <span
              aria-hidden="true"
              className="font-mono text-xl leading-none text-cta transition-transform"
            >
              +
            </span>
          </summary>
          <div className="pb-5 pl-10">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
