import { Locale, LOCALES } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { positionStats } from "@/lib/word-bank";
import { ContainsListPage } from "@/components/word-bank/ContainsListPage";
import { content } from "@/data/word-bank/with-g";
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
  const { total, common } = positionStats(content.letter);
  return constructMetadata({
    page: "WordList",
    title: "5 Letter Words With G — Wordle List & Hints",
    description: `All ${total} five-letter words containing G, sorted for Wordle — the ${common} common answers first, mapped by position, past answers flagged, and why a yellow G points front or to an -NG. Updated daily.`,
    keywords: [
      "5 letter words with g",
      "5 letter words containing g",
      "5 letter words that have g",
      "wordle words with g",
      "5 letter words with g in them",
    ],
    locale: locale as Locale,
    path: content.path,
    canonicalUrl: content.path,
  });
}

export default async function Page({ params }: { params: Params }) {
  await params;
  return <ContainsListPage content={content} />;
}
