import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import { breadcrumbSchema, faqPageSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { content } from "@/data/word-bank/hub-7";
import NLetterHubPage from "@/components/word-bank/NLetterHubPage";
import type { Metadata } from "next";

type Params = Promise<{ locale: string }>;

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    page: "SevenLetterWords",
    title: content.title,
    description: content.description,
    keywords: ["7 letter words", "seven letter words", "7 letter words list"],
    locale: locale as Locale,
    path: "/7-letter-words",
    canonicalUrl: "/7-letter-words",
    images: ["og/7-letter-words.png"],
  });
}

export default function SevenLetterWordsHub() {
  return (
    <>
      <JsonLd data={faqPageSchema(content.faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "7 Letter Words", url: `${BASE_URL}/7-letter-words` },
        ])}
      />
      <NLetterHubPage content={content} />
    </>
  );
}
