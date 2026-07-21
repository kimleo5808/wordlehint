import DropCapParagraph from "@/components/wordle-unlimited/DropCapParagraph";
import PullQuote from "@/components/wordle-unlimited/PullQuote";
import SectionHeader from "@/components/wordle-unlimited/SectionHeader";
import StatHighlight from "@/components/wordle-unlimited/StatHighlight";
import type {
  ContentBlock,
  ContentSection,
} from "@/data/spelling-bee-unlimited/content";
import { RANK_TIERS } from "@/data/spelling-bee-unlimited/content";
import ComparisonCards from "./ComparisonCards";
import FAQAccordion from "./FAQAccordion";
import RelatedGameGrid from "./RelatedGameGrid";

/**
 * SectionRenderer — turns one ContentSection into editorial HTML
 * (spelling-bee edition). Shares the presentational primitives with
 * /wordle-unlimited; bee-specific blocks (rank table, comparison, FAQ,
 * related) live in this directory.
 */
export default function SectionRenderer({
  section,
}: {
  section: ContentSection;
}) {
  let paragraphCount = 0;

  return (
    <section id={section.id} className="scroll-mt-24">
      <SectionHeader number={section.number} id={`${section.id}-heading`}>
        {section.h2}
      </SectionHeader>

      <div className="mx-auto max-w-2xl space-y-5 px-1 sm:px-0">
        {section.blocks.map((block, idx) => {
          if (block.type === "paragraph") {
            const isFirstParagraph = paragraphCount === 0;
            paragraphCount++;
            if (section.dropCap && isFirstParagraph) {
              return <DropCapParagraph key={idx} text={block.text} />;
            }
            return (
              <p
                key={idx}
                className="font-newsreader text-[17px] leading-[1.7] text-brand-ink sm:text-[18px] dark:text-brand-dark-ink"
              >
                {block.text}
              </p>
            );
          }

          return <BlockRenderer key={idx} block={block} />;
        })}
      </div>
    </section>
  );
}

function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "h3":
      return (
        <h3 className="mt-6 font-fraunces text-[20px] font-semibold text-brand-ink sm:text-[22px] dark:text-brand-dark-ink">
          {block.text}
        </h3>
      );

    case "list":
      return block.ordered ? (
        <ol className="ml-5 list-decimal space-y-2 font-newsreader text-[16px] text-brand-ink/85 dark:text-brand-dark-ink/85">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="ml-5 list-disc space-y-2 font-newsreader text-[16px] text-brand-ink/85 dark:text-brand-dark-ink/85">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case "pullquote":
      return <PullQuote text={block.text} cite={block.cite} />;

    case "stathighlight":
      return (
        <StatHighlight
          number={block.number}
          label={block.label}
          cite={block.cite}
        />
      );

    case "rank-table":
      return (
        <div className="my-6 overflow-hidden border border-brand-midInk/40 dark:border-brand-dark-ink/30">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="border-b border-brand-midInk/40 dark:border-brand-dark-ink/30">
                <th className="px-3 py-2 text-left font-plex-mono text-[11px] uppercase tracking-[0.14em] text-brand-ink/60 dark:text-brand-dark-ink/60">
                  Rank
                </th>
                <th className="px-3 py-2 text-right font-plex-mono text-[11px] uppercase tracking-[0.14em] text-brand-ink/60 dark:text-brand-dark-ink/60">
                  % of max score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-midInk/30 dark:divide-brand-dark-ink/20">
              {RANK_TIERS.map((tier) => (
                <tr key={tier.rank}>
                  <td
                    className={`px-3 py-2 font-newsreader ${
                      tier.rank === "Genius" || tier.rank === "Queen Bee"
                        ? "font-bold text-brand-signal"
                        : "text-brand-ink dark:text-brand-dark-ink"
                    }`}
                  >
                    {tier.rank}
                  </td>
                  <td className="px-3 py-2 text-right font-plex-mono tabular-nums text-brand-ink/80 dark:text-brand-dark-ink/80">
                    {tier.percent}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "comparison-cards":
      return <ComparisonCards />;

    case "faq":
      return <FAQAccordion />;

    case "related-games":
      return <RelatedGameGrid />;

    default:
      return null;
  }
}
