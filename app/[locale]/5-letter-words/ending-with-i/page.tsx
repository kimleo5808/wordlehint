import { Locale, LOCALES } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { endingLetterStats } from "@/lib/word-bank";
import { EndingListPage } from "@/components/word-bank/EndingListPage";
import { content } from "@/data/word-bank/ending-with-i";
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
  const { total, common } = endingLetterStats(content.letter);
  return constructMetadata({
    page: "WordList",
    title: "5 Letter Words Ending in I — Wordle List & Hints",
    description: `All ${total} five-letter words ending in I, sorted for Wordle. The ${common} common answer words first, definitions, past answers flagged, and honest opener advice. Updated daily.`,
    keywords: [
      "5 letter words ending in i",
      "5 letter words that end in i",
      "5 letter words ending with i",
      "wordle words ending in i",
      "5 letter words ending in i for wordle",
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
