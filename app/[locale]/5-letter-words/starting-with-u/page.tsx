import { Locale, LOCALES } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { letterStats } from "@/lib/word-bank";
import { LetterListPage } from "@/components/word-bank/LetterListPage";
import { content } from "@/data/word-bank/starting-with-u";
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
    title: "5 Letter Words Starting With U — Wordle Word List & Hints",
    description: `All ${total} five-letter words starting with U, organized for Wordle. See the best U opening words like UNTIE and UNDER, past answers, and definitions. Updated daily.`,
    keywords: [
      "5 letter words starting with u",
      "5 letter words that start with u",
      "5 letter words beginning with u",
      "wordle words starting with u",
      "5 letter u words",
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
