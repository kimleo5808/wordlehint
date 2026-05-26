import { BASE_URL } from "@/config/site";
import {
  INTRO,
  PAGE_META,
  SECTIONS,
} from "@/data/wordle-unlimited/content";
import { FAQ_ITEMS } from "@/data/wordle-unlimited/faq";
import type { Locale } from "@/i18n/routing";
import { LOCALES } from "@/i18n/routing";
import {
  breadcrumbSchema,
  faqPageSchema,
  JsonLd,
  videoGameSchema,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

import SectionRenderer from "@/components/wordle-unlimited/BlockRenderer";
import type { HintTodayData } from "@/components/wordle-unlimited/HintTodayCard";
import ScrollHint from "@/components/wordle-unlimited/ScrollHint";
import UnlimitedGameShell from "@/components/wordle-unlimited/UnlimitedGameShell";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    page: "WordleUnlimited",
    title: PAGE_META.title,
    description: PAGE_META.description,
    keywords: [
      "wordle unlimited",
      "unlimited wordle",
      "wordle unlimited unblocked",
      "infinite wordle",
      "endless wordle",
      "play wordle unlimited free",
      "wordle unlimited hard mode",
    ],
    locale: locale as Locale,
    path: "/wordle-unlimited",
    canonicalUrl: "/wordle-unlimited",
    images: [PAGE_META.ogImage],
  });
}

/**
 * Today's hint data — placeholder until the live data source is wired up.
 * The HintTodayCard component already takes its content via props so the
 * swap is a one-line change here once /wordle-hint-today exposes a getter.
 */
function getTodaysHint(): HintTodayData {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();

  return {
    date: dateStr,
    hints: [
      "Starts with the letter S.",
      "Contains exactly two vowels.",
      "The answer is a five-letter noun. Click to reveal more.",
    ],
  };
}

export default async function WordleUnlimitedPage({
  params,
}: {
  params: Params;
}) {
  await params;

  const hintToday = getTodaysHint();
  const pageUrl = `${BASE_URL}/wordle-unlimited`;

  return (
    <>
      {/* Schema.org — VideoGame + FAQPage + BreadcrumbList */}
      <JsonLd
        data={videoGameSchema({
          name: "Wordle Unlimited",
          description: PAGE_META.description,
          url: pageUrl,
          image: `${BASE_URL}${PAGE_META.ogImage}`,
        })}
      />
      <JsonLd
        data={faqPageSchema(
          FAQ_ITEMS.map((item) => ({
            question: item.question,
            answer: item.answer,
          }))
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Wordle Unlimited", url: pageUrl },
        ])}
      />

      {/* Visually-hidden H1 — the game IS the fold-1 hero per spec.
          The H1 still ships in the DOM for SEO and screen readers. */}
      <h1 className="sr-only">{PAGE_META.h1}</h1>

      {/* ─── FOLD 1: Game-First ─── */}
      <UnlimitedGameShell />
      <div className="pb-6">
        <ScrollHint />
      </div>

      {/* Visual hard-break between game shell and editorial body */}
      <div
        aria-hidden="true"
        className="mx-auto h-px max-w-5xl bg-brand-midInk/30 dark:bg-brand-dark-ink/20"
      />

      {/* ─── FOLD 2+: SEO content stream ─── */}
      <article className="mx-auto w-full max-w-3xl px-5 pb-24 sm:px-6 lg:px-8">
        {/* Intro paragraph sits between the divider and the first H2.
            No heading here — H1 lives in sr-only above. */}
        <p className="mt-12 font-newsreader text-[17px] leading-[1.7] text-brand-ink sm:text-[18px] dark:text-brand-dark-ink">
          {INTRO}
        </p>

        {SECTIONS.map((section) => (
          <SectionRenderer
            key={section.id}
            section={section}
            hintToday={hintToday}
          />
        ))}
      </article>
    </>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
