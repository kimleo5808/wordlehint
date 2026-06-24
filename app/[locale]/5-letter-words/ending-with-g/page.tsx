import { Locale, LOCALES } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { endingLetterStats } from "@/lib/word-bank";
import { EndingListPage } from "@/components/word-bank/EndingListPage";
import { content } from "@/data/word-bank/ending-with-g";
import { Metadata } from "next";

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const { total } = endingLetterStats(content.letter);
  return constructMetadata({
    page: "WordList",
    title: "5 Letter Words Ending in G — Wordle List & Hints",
    description: `All ${total} five-letter words ending in G, sorted for Wordle. Common answers first, definitions, past answers flagged, and the best G-ending openers like ALONG. Updated daily.`,
    keywords: [
      "5 letter words ending in g",
      "5 letter words that end in g",
      "5 letter words ending with g",
      "wordle words ending in g",
      "5 letter words ending in g for wordle",
    ],
    locale: locale as Locale,
    path: content.path,
    canonicalUrl: content.path,
  });
}

export default async function Page({ params }: { params: Params }) {
  await params;
  return <EndingListPage content={content} />;
}
