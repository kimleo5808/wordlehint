import DropCapParagraph from "@/components/wordle-unlimited/DropCapParagraph";
import PullQuote from "@/components/wordle-unlimited/PullQuote";
import SectionHeader from "@/components/wordle-unlimited/SectionHeader";
import StatHighlight from "@/components/wordle-unlimited/StatHighlight";
import type {
  ContentBlock,
  ContentSection,
} from "@/data/connections-unlimited/content";
import ComparisonCards from "./ComparisonCards";
import DifficultyLegend from "./DifficultyLegend";
import FAQAccordion from "./FAQAccordion";
import RelatedGameGrid from "./RelatedGameGrid";

/**
 * SectionRenderer — turns one ContentSection into editorial HTML.
 *
 * Shares the presentational primitives (SectionHeader, DropCapParagraph,
 * PullQuote, StatHighlight) with /wordle-unlimited; connections-specific
 * blocks (legend, comparison, FAQ, related) live in this directory.
 */
export default function SectionRenderer({ section }: { section: ContentSection }) {
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

    case "difficulty-legend":
      return <DifficultyLegend />;

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
