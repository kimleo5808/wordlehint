import { BASE_URL } from "@/config/site";
import {
  INTRO,
  PAGE_META,
  SECTIONS,
} from "@/data/spelling-bee-unlimited/content";
import { FAQ_ITEMS } from "@/data/spelling-bee-unlimited/faq";
import type { Locale } from "@/i18n/routing";
import { LOCALES } from "@/i18n/routing";
import { getAllSpellingBee } from "@/lib/spelling-bee-daily";
import {
  breadcrumbSchema,
  faqPageSchema,
  howToSchema,
  JsonLd,
  videoGameSchema,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import type { UnlimitedBeePuzzle } from "@/components/spelling-bee-unlimited/gameReducer";
import type { Metadata } from "next";

import SectionRenderer from "@/components/spelling-bee-unlimited/SectionRenderer";
import UnlimitedSpellingBeeShell from "@/components/spelling-bee-unlimited/UnlimitedSpellingBeeShell";
import ScrollHint from "@/components/wordle-unlimited/ScrollHint";

type Params = Promise<{ locale: string }>;

/** Days of the freshest archive excluded from the pool (spoiler guard). */
const SPOILER_WINDOW = 14;
/** Puzzles served per build; the daily rebuild rotates the sample. */
const POOL_SIZE = 120;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    page: "SpellingBeeUnlimited",
    title: PAGE_META.title,
    description: PAGE_META.description,
    keywords: [
      "spelling bee unlimited",
      "unlimited spelling bee",
      "free spelling bee game",
      "spelling bee game no limit",
      "spelling bee practice",
      "hive word game",
    ],
    locale: locale as Locale,
    path: "/spelling-bee-unlimited",
    canonicalUrl: "/spelling-bee-unlimited",
    images: [PAGE_META.ogImage],
  });
}

/**
 * Build-time puzzle pool: drop the newest SPOILER_WINDOW days so the page
 * can never spoil a daily puzzle, then sample POOL_SIZE evenly across the
 * remaining archive. Puzzles are anonymised — no dates or NYT ids reach
 * the client; `id` is just the pool index.
 */
function buildPuzzlePool(): UnlimitedBeePuzzle[] {
  const all = getAllSpellingBee();
  const eligible = all.slice(0, Math.max(0, all.length - SPOILER_WINDOW));
  const sampled =
    eligible.length <= POOL_SIZE
      ? eligible
      : Array.from({ length: POOL_SIZE }, (_, i) => {
          const step = eligible.length / POOL_SIZE;
          return eligible[Math.floor(i * step)];
        });
  return sampled.map((p, i) => ({
    id: i,
    centerLetter: p.centerLetter,
    outerLetters: p.outerLetters,
    pangrams: p.pangrams,
    answers: p.answers,
  }));
}

export default async function SpellingBeeUnlimitedPage({
  params,
}: {
  params: Params;
}) {
  await params;

  const pool = buildPuzzlePool();
  const pageUrl = `${BASE_URL}/spelling-bee-unlimited`;

  return (
    <>
      {/* Schema.org — VideoGame + FAQPage + HowTo + BreadcrumbList */}
      <JsonLd
        data={videoGameSchema({
          name: "Spelling Bee Unlimited",
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
        data={howToSchema(
          "How to Play Spelling Bee Unlimited",
          "Build words from seven letters — every word must be at least four letters and use the center letter.",
          [
            {
              name: "Read the hive",
              text: "Seven letters, one highlighted center. Every word must include that center letter and be at least four letters long.",
            },
            {
              name: "Type or tap words",
              text: "Use your keyboard or tap the hexes, then press Enter. Letters can repeat as often as you like.",
            },
            {
              name: "Chase the pangram",
              text: "At least one word uses all seven letters — it scores its length plus a seven-point bonus.",
            },
            {
              name: "Climb to Genius",
              text: "Ranks run from Beginner to Genius at 70% of the maximum score; find every word for Queen Bee, then deal a new archive puzzle.",
            },
          ]
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Spelling Bee Unlimited", url: pageUrl },
        ])}
      />

      {/* ─── FOLD 1: Game only — visible H1 renders inside the shell.
          min-height pins the SEO stream below the first viewport. ─── */}
      <div className="flex min-h-[calc(100dvh-4rem)] flex-col">
        <UnlimitedSpellingBeeShell pool={pool} />
        <div className="mt-auto pb-6">
          <ScrollHint />
        </div>
      </div>

      {/* Visual hard-break between game shell and editorial body */}
      <div
        aria-hidden="true"
        className="mx-auto h-px max-w-5xl bg-brand-midInk/30 dark:bg-brand-dark-ink/20"
      />

      {/* ─── FOLD 2+: SEO content stream ─── */}
      <article className="mx-auto w-full max-w-3xl px-5 pb-24 sm:px-6 lg:px-8">
        <p className="mt-12 font-newsreader text-[17px] leading-[1.7] text-brand-ink sm:text-[18px] dark:text-brand-dark-ink">
          {INTRO}
        </p>

        {SECTIONS.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </article>
    </>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
