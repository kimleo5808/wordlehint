import type { ContentBlock, ContentSection } from "@/data/wordle-unlimited/content";
import ComparisonCards from "./ComparisonCards";
import DropCapParagraph from "./DropCapParagraph";
import EditorialDataTable from "./EditorialDataTable";
import FAQAccordion from "./FAQAccordion";
import HintTodayCard, { type HintTodayData } from "./HintTodayCard";
import ModeGrid from "./ModeGrid";
import PullQuote from "./PullQuote";
import RelatedGameGrid from "./RelatedGameGrid";
import SectionHeader from "./SectionHeader";
import StatHighlight from "./StatHighlight";
import TileDemo from "./TileDemo";

/**
 * SectionRenderer — turns one ContentSection into editorial HTML.
 *
 * Each block type maps to its purpose-built visual component. Paragraph and
 * h3 blocks render inline, while richer block types (table, cards, quote,
 * etc.) render as their own self-contained modules.
 *
 * Drop cap is applied to the first paragraph of a section when dropCap is
 * true, and only that first paragraph.
 */
export default function SectionRenderer({
  section,
  hintToday,
}: {
  section: ContentSection;
  hintToday: HintTodayData;
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

          return <BlockRenderer key={idx} block={block} hintToday={hintToday} />;
        })}
      </div>
    </section>
  );
}

function BlockRenderer({
  block,
  hintToday,
}: {
  block: ContentBlock;
  hintToday: HintTodayData;
}) {
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

    case "tile-demo":
      return <TileDemo />;

    case "hint-today-card":
      return <HintTodayCard data={hintToday} />;

    case "length-table":
      return <EditorialDataTable />;

    case "comparison-cards":
      return <ComparisonCards />;

    case "mode-grid":
      return <ModeGrid />;

    case "faq":
      return <FAQAccordion />;

    case "related-games":
      return <RelatedGameGrid />;

    default:
      // Exhaustiveness guard — unknown block types render nothing.
      return null;
  }
}
