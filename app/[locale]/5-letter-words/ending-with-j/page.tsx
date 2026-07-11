import { Locale, LOCALES } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { endingLetterStats } from "@/lib/word-bank";
import { EndingListPage } from "@/components/word-bank/EndingListPage";
import { content } from "@/data/word-bank/ending-with-j";
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
    title: "5 Letter Words Ending in J — The Complete (Tiny) Wordle List",
    description: `All ${total} five-letter words ending in J, the rarest Wordle ending. None are in the answer pool, so a J ending can't be the daily answer — here's the full list with honest advice.`,
    keywords: [
      "5 letter words ending in j",
      "5 letter words that end in j",
      "5 letter words ending with j",
      "wordle words ending in j",
      "5 letter words ending in j for wordle",
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
