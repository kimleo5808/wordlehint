import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import { breadcrumbSchema, faqPageSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { fillTemplate, getStartingFacts } from "@/lib/n-letter-template";
import { STARTING_TEMPLATES } from "@/data/word-bank/starting-templates";
import { STARTING_HOOKS } from "@/data/word-bank/letter-hooks";
import NLetterSpokePage from "@/components/word-bank/NLetterSpokePage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const LENGTH = 7 as const;
const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

type Params = Promise<{ locale: string; spoke: string }>;

function parseSpoke(spoke: string): string | null {
  const m = /^starting-with-([a-z])$/.exec(spoke);
  return m ? m[1] : null;
}

export async function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    LETTERS.map((l) => ({ locale, spoke: `starting-with-${l}` }))
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, spoke } = await params;
  const letter = parseSpoke(spoke);
  if (!letter) return {};
  const template = STARTING_TEMPLATES[LENGTH]!;
  const facts = getStartingFacts(letter, LENGTH);
  return constructMetadata({
    page: "SevenLetterWordsSpoke",
    title: fillTemplate(template.titlePattern, facts),
    description: fillTemplate(template.descriptionPattern, facts),
    keywords: [
      `7 letter words starting with ${letter}`,
      `seven letter words that start with ${letter}`,
    ],
    locale: locale as Locale,
    path: `/${LENGTH}-letter-words/${spoke}`,
    canonicalUrl: `/${LENGTH}-letter-words/${spoke}`,
    images: [`og/${LENGTH}-letter-words.png`],
  });
}

export default async function Spoke({ params }: { params: Params }) {
  const { spoke } = await params;
  const letter = parseSpoke(spoke);
  if (!letter) notFound();
  const template = STARTING_TEMPLATES[LENGTH]!;
  const facts = getStartingFacts(letter, LENGTH);
  const hook = STARTING_HOOKS[LENGTH]?.[letter] ?? "";
  const pageUrl = `${BASE_URL}/${LENGTH}-letter-words/${spoke}`;

  return (
    <>
      <JsonLd
        data={faqPageSchema(
          template.faq.map((f) => ({
            question: fillTemplate(f.question, facts),
            answer: fillTemplate(f.answer, facts),
          }))
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "7 Letter Words", url: `${BASE_URL}/7-letter-words` },
          { name: `Starting with ${letter.toUpperCase()}`, url: pageUrl },
        ])}
      />
      <NLetterSpokePage
        length={LENGTH}
        letter={letter}
        template={template}
        hook={hook}
      />
    </>
  );
}
