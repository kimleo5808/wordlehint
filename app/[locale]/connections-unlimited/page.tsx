import { BASE_URL } from "@/config/site";
import {
  INTRO,
  PAGE_META,
  SECTIONS,
} from "@/data/connections-unlimited/content";
import { FAQ_ITEMS } from "@/data/connections-unlimited/faq";
import type { Locale } from "@/i18n/routing";
import { LOCALES } from "@/i18n/routing";
import { getAllConnections } from "@/lib/connections-daily";
import {
  breadcrumbSchema,
  faqPageSchema,
  howToSchema,
  JsonLd,
  videoGameSchema,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import type { ConnectionsPuzzle } from "@/types/connections";
import type { Metadata } from "next";

import SectionRenderer from "@/components/connections-unlimited/SectionRenderer";
import UnlimitedConnectionsShell from "@/components/connections-unlimited/UnlimitedConnectionsShell";
import ScrollHint from "@/components/wordle-unlimited/ScrollHint";

type Params = Promise<{ locale: string }>;

/** Days of the freshest archive excluded from the pool (spoiler guard). */
const SPOILER_WINDOW = 14;
/** Boards served per build; the daily rebuild rotates the sample. */
const POOL_SIZE = 120;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    page: "ConnectionsUnlimited",
    title: PAGE_META.title,
    description: PAGE_META.description,
    keywords: [
      "connections unlimited",
      "unlimited connections",
      "connections nyt unlimited",
      "connections unlimited free",
      "connections game unlimited",
      "play connections unlimited",
      "connections practice",
    ],
    locale: locale as Locale,
    path: "/connections-unlimited",
    canonicalUrl: "/connections-unlimited",
    images: [PAGE_META.ogImage],
  });
}

/**
 * Build-time puzzle pool: drop the newest SPOILER_WINDOW days so the page
 * can never spoil a daily grid, then sample POOL_SIZE boards evenly across
 * the remaining archive. Deterministic per build; the daily cron rebuild
 * shifts the sample.
 */
function buildPuzzlePool(): ConnectionsPuzzle[] {
  const all = getAllConnections();
  const eligible = all.slice(0, Math.max(0, all.length - SPOILER_WINDOW));
  if (eligible.length <= POOL_SIZE) return eligible;
  const step = eligible.length / POOL_SIZE;
  const pool: ConnectionsPuzzle[] = [];
  for (let i = 0; i < POOL_SIZE; i++) {
    pool.push(eligible[Math.floor(i * step)]);
  }
  return pool;
}

export default async function ConnectionsUnlimitedPage({
  params,
}: {
  params: Params;
}) {
  await params;

  const pool = buildPuzzlePool();
  const pageUrl = `${BASE_URL}/connections-unlimited`;

  return (
    <>
      {/* Schema.org — VideoGame + FAQPage + HowTo + BreadcrumbList */}
      <JsonLd
        data={videoGameSchema({
          name: "Connections Unlimited",
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
          "How to Play Connections Unlimited",
          "Sort 16 words into four hidden groups of four before making four mistakes.",
          [
            {
              name: "Scan all 16 words",
              text: "Read the full grid twice before touching anything, and note words that could fit more than one theme.",
            },
            {
              name: "Select four words",
              text: "Tap four words you believe share a hidden category. Tap again to deselect.",
            },
            {
              name: "Submit your group",
              text: "A correct group collapses into a colored banner. A wrong guess costs one of four mistakes; three correct words trigger a one-away warning.",
            },
            {
              name: "Solve all four groups",
              text: "Clear yellow, green, blue, and purple, then start a new puzzle from the archive of 1,100+ real boards.",
            },
          ]
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Connections Unlimited", url: pageUrl },
        ])}
      />

      {/* ─── FOLD 1: Game only — visible H1 renders inside the shell.
          min-height pins the SEO stream below the first viewport. ─── */}
      <div className="flex min-h-[calc(100dvh-4rem)] flex-col">
        <UnlimitedConnectionsShell pool={pool} />
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
