export interface DateFaqItem {
  question: string;
  answer: string;
}

/** Collapsed FAQ — answers stay in the HTML (and FAQPage JSON-LD). */
export default function DateFaq({
  heading,
  items,
}: {
  heading: string;
  items: DateFaqItem[];
}) {
  return (
    <section className="mt-14" aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="font-heading text-2xl font-bold text-foreground"
      >
        {heading}
      </h2>
      <div className="mt-4 divide-y divide-dashed divide-border rounded-2xl border border-border bg-card">
        {items.map((item) => (
          <details key={item.question} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-sm font-semibold text-foreground">
              {item.question}
              <span className="font-mono text-muted-foreground transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
