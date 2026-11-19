import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { getBeeWordIndex } from "@/lib/bee-word-history-index";
import { lookUpBeeWord } from "@/lib/bee-word-history";
import BeeHistoryLookup from "@/components/puzzle-tools/BeeHistoryLookup";
import ToolLanding from "@/components/puzzle-tools/ToolLanding";

const href = "/spelling-bee-word-history";
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    locale,
    page: "BeeWordHistory",
    path: href,
    canonicalUrl: href,
    title: "Spelling Bee Word History: Look Up Any Past Word",
    description:
      "Look up a Spelling Bee word across completed hives. See when it was listed, how often its letters fit, and whether it appeared as a pangram.",
    keywords: ["spelling bee word history", "spelling bee word checker archive", "past pangrams"],
  });
}

export default function BeeHistoryPage() {
  const index = getBeeWordIndex();
  return (
    <ToolLanding
      kind="bee"
      content="spelling-bee-word-history"
      title="Spelling Bee Word History"
      subtitle="Look up a word across completed hives. See when its letters fit and when it made the answer list."
      href={href}
      parent={{ name: "Spelling Bee archive", href: "/spelling-bee-answers" }}
      figure={{
        src: "/illustrations/bee-history-comparison.png",
        alt: "Listed and eligible hives: ONION 66 of 66, HIED 7 of 17, ADIT 0 of 19, and BLOWPIPE 3 of 3.",
        caption:
          "Spelling Bee word history from January 1, 2024 to November 3, 2026. Each bar uses that word’s eligible hives as its denominator.",
      }}
    >
      <BeeHistoryLookup
        initial={lookUpBeeWord(index, "HIED")}
        firstDate={index.hives.at(-1)?.date}
        lastDate={index.hives[0]?.date}
      />
    </ToolLanding>
  );
}
