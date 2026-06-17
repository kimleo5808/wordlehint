import { Locale, LOCALES } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { letterStats } from "@/lib/word-bank";
import { LetterListPage } from "@/components/word-bank/LetterListPage";
import { content } from "@/data/word-bank/starting-with-w";
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
  const { total } = letterStats(content.letter);
  return constructMetadata({
    page: "WordList",
    title: "5 Letter Words Starting With W — Wordle Word List & Hints",
    description: `All ${total} five-letter words starting with W, organized for Wordle. See the best W opening words like WASTE and WATER, past answers, and definitions. Updated daily.`,
    keywords: [
      "5 letter words starting with w",
      "5 letter words that start with w",
      "5 letter words beginning with w",
      "wordle words starting with w",
      "5 letter w words",
    ],
    locale: locale as Locale,
    path: content.path,
    canonicalUrl: content.path,
  });
}

export default async function Page({ params }: { params: Params }) {
  await params;
  return <LetterListPage content={content} />;
}
