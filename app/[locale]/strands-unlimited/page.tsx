import { BASE_URL } from "@/config/site";
import { INTRO, PAGE_META, SECTIONS } from "@/data/strands-unlimited/content";
import { FAQ_ITEMS } from "@/data/strands-unlimited/faq";
import type { Locale } from "@/i18n/routing";
import { LOCALES } from "@/i18n/routing";
import {
  breadcrumbSchema,
  faqPageSchema,
  howToSchema,
  JsonLd,
  videoGameSchema,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { getAllStrands, getStrandsCount } from "@/lib/strands-daily";
import { solveStrands } from "@/lib/strands-solver";
import type { Metadata } from "next";

import type { PlayableStrandsPuzzle } from "@/components/strands-unlimited/gameReducer";
import SectionRenderer from "@/components/strands-unlimited/SectionRenderer";
import UnlimitedStrandsShell from "@/components/strands-unlimited/UnlimitedStrandsShell";
import ScrollHint from "@/components/wordle-unlimited/ScrollHint";

type Params = Promise<{ locale: string }>;

/** Days of the freshest archive excluded from the pool (spoiler guard). */
const SPOILER_WINDOW = 14;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    page: "StrandsUnlimited",
    title: PAGE_META.title,
    description: PAGE_META.description,
    keywords: [
      "strands unlimited",
      "nyt strands unlimited",
      "strands game unlimited",
      "strands unlimited free",
      "play strands unlimited",
      "strands practice",
      "strands archive game",
    ],
    locale: locale as Locale,
    path: "/strands-unlimited",
    canonicalUrl: "/strands-unlimited",
    images: [PAGE_META.ogImage],
  });
}

/**
 * Build-time pool: drop the newest SPOILER_WINDOW days, then run the tiling
 * solver over every remaining board so the client gets canonical word paths.
 * Boards the solver cannot tile (malformed data) are dropped with a build
 * log warning rather than shipping a broken game.
 */
function buildPuzzlePool(): PlayableStrandsPuzzle[] {
  const all = getAllStrands();
  const eligible = all.slice(0, Math.max(0, all.length - SPOILER_WINDOW));
  const pool: PlayableStrandsPuzzle[] = [];
  for (const puzzle of eligible) {
    const paths = solveStrands(puzzle);
    if (paths) {
      pool.push({ ...puzzle, paths });
    } else {
      console.warn(`[strands-unlimited] no tiling found for ${puzzle.date}, skipping`);
    }
  }
  return pool;
}

export default async function StrandsUnlimitedPage({
  params,
}: {
  params: Params;
}) {
  await params;

  const pool = buildPuzzlePool();
  const totalPuzzles = getStrandsCount();
  const pageUrl = `${BASE_URL}/strands-unlimited`;

  return (
    <>
      {/* Schema.org — VideoGame + FAQPage + HowTo + BreadcrumbList */}
      <JsonLd
        data={videoGameSchema({
          name: "Strands Unlimited",
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
          "How to Play Strands Unlimited",
          "Trace theme words and the spangram on a 6-by-8 letter board until all 48 cells are used.",
          [
            {
              name: "Read the clue",
              text: "The clue names the theme every word on the board shares. Guess candidate words before touching a letter.",
            },
            {
              name: "Trace a word",
              text: "Drag across adjacent letters or tap them one at a time, then release, tap the last letter again, or press Submit.",
            },
            {
              name: "Find the spangram",
              text: "One yellow answer describes the theme itself and touches two opposite sides of the board.",
            },
            {
              name: "Fill the board",
              text: "Every letter belongs to exactly one answer. Find them all, then deal the next archived board.",
            },
          ]
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Strands Unlimited", url: pageUrl },
        ])}
      />

      {/* ─── FOLD 1: Game only — visible H1 renders inside the shell. ─── */}
      <div className="flex min-h-[calc(100dvh-4rem)] flex-col">
        <UnlimitedStrandsShell pool={pool} totalPuzzles={totalPuzzles} />
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
