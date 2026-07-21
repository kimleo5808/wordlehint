import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  JsonLd,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import {
  getSpellingBeeScoring,
  getTodaySpellingBee,
} from "@/lib/spelling-bee-daily";
import { getSpellingBeeHints } from "@/lib/spelling-bee-hints";
import { getTodayDateString } from "@/lib/wordle-daily";
import {
  FAQ_ITEMS,
  GRID_DEFINITION,
  PAGE_META,
  SECTIONS,
} from "@/data/spelling-bee/hints-content";
import { RELATED_GAMES } from "@/data/spelling-bee/content";
import AnswersFAQ from "@/components/wordle-answers/AnswersFAQ";
import RelatedTools from "@/components/wordle-answers/RelatedTools";
import SpoilerCurtain from "@/components/wordle-answers/SpoilerCurtain";
import HintsGrid from "@/components/spelling-bee/HintsGrid";
import PangramHints from "@/components/spelling-bee/PangramHints";
import SpellingBeeHive from "@/components/spelling-bee/SpellingBeeHive";
import StatsTrio from "@/components/spelling-bee/StatsTrio";
import TwoLetterList from "@/components/spelling-bee/TwoLetterList";
import WordClueList from "@/components/spelling-bee/WordClueList";
import { ChevronRight, Hexagon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

type Params = Promise<{ locale: string }>;

function formatLong(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const dateStr = getTodayDateString();
  return constructMetadata({
    page: "SpellingBeeHintsToday",
    title: `${PAGE_META.titleBase} — ${dateStr}`,
    description: PAGE_META.descriptionBase,
    keywords: PAGE_META.keywords,
    locale: locale as Locale,
    path: "/spelling-bee-hints-today",
    canonicalUrl: "/spelling-bee-hints-today",
    images: ["og/spelling-bee-hints-today.png"],
  });
}

export default function SpellingBeeHintsTodayPage() {
  const puzzle = getTodaySpellingBee();
  const today = getTodayDateString();
  const pageUrl = `${BASE_URL}/spelling-bee-hints-today`;

  if (!puzzle) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          NYT Spelling Bee Hints Today
        </h1>
        <p className="mt-4 text-muted-foreground">
          Today&apos;s Spelling Bee ({today}) isn&apos;t available just yet — it
          publishes automatically once the new puzzle goes live at 3 AM ET.
        </p>
        <Link
          href="/spelling-bee-answers"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cta px-5 py-2.5 text-sm font-bold text-cta-foreground"
        >
          Browse Spelling Bee answers
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const scoring = getSpellingBeeScoring(puzzle);
  const hints = getSpellingBeeHints(puzzle);
  const formattedDate = formatLong(puzzle.date);

  return (
    <div className="w-full">
      <JsonLd
        data={articleSchema({
          title: `${PAGE_META.titleBase} — ${formattedDate}`,
          description: PAGE_META.descriptionBase,
          url: pageUrl,
          datePublished: `${puzzle.date}T07:00:00Z`,
          dateModified: `${puzzle.date}T07:00:00Z`,
        })}
      />
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Spelling Bee Hints Today", url: pageUrl },
        ])}
      />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto grid max-w-4xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-wordle-present/30 bg-wordle-present/10 px-4 py-1.5 text-sm font-medium text-wordle-present">
              <Hexagon className="h-4 w-4" />
              {SECTIONS.hero.badge}
            </div>
            <h1 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl">
              NYT Spelling Bee Hints Today —{" "}
              <time dateTime={puzzle.date}>{formattedDate}</time>
            </h1>
            <p className="mt-3 text-slate-300">{SECTIONS.hero.intro}</p>
            <p className="mt-4 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm italic text-slate-200">
              {hints.difficultyBlurb}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1">
              <Link
                href="/spelling-bee-answers"
                className="inline-block text-sm font-semibold text-wordle-present hover:text-wordle-present/80"
              >
                Need the full answer list? →
              </Link>
              <a
                href="https://www.nytimes.com/puzzles/spelling-bee"
                target="_blank"
                rel="noopener nofollow"
                className="inline-block text-sm font-semibold text-wordle-present hover:text-wordle-present/80"
              >
                Play on NYT →
              </a>
            </div>
          </div>
          <div>
            <SpellingBeeHive
              centerLetter={puzzle.centerLetter}
              outerLetters={puzzle.outerLetters}
            />
            <div className="mt-6">
              <StatsTrio
                totalWords={scoring.totalWords}
                totalPoints={scoring.totalPoints}
                geniusScore={scoring.geniusScore}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* L1: length distribution */}
        <section>
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.lengths.heading}
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {SECTIONS.lengths.intro}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {hints.lengthDistribution.map((d) => (
              <span
                key={d.length}
                className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-sm text-foreground"
              >
                {d.length}L{" "}
                <strong className="text-wordle-present">× {d.count}</strong>
              </span>
            ))}
          </div>
        </section>

        {/* L2: grid */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.grid.heading}
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {SECTIONS.grid.intro}
          </p>
          <div className="mt-5 max-w-xl">
            <HintsGrid grid={hints.grid} centerLetter={puzzle.centerLetter} />
          </div>
          <h3 className="mt-8 font-heading text-lg font-semibold text-foreground">
            {SECTIONS.grid.howToRead.heading}
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {SECTIONS.grid.howToRead.body}
          </p>
          <blockquote className="mt-4 border-l-4 border-wordle-present bg-muted/40 px-5 py-4 text-foreground">
            <p className="font-medium leading-relaxed">{GRID_DEFINITION}</p>
          </blockquote>
        </section>

        {/* L3: two-letter list (folded) */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.twoLetter.heading}
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {SECTIONS.twoLetter.intro}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {SECTIONS.twoLetter.note}
          </p>
          <SpoilerCurtain
            date={`${puzzle.date}-bee-twoletter`}
            label="Show the two-letter list"
            className="mt-5"
          >
            <TwoLetterList groups={hints.twoLetterGroups} />
          </SpoilerCurtain>
        </section>

        {/* L4: pangram staged reveal */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.pangram.heading}
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {SECTIONS.pangram.intro}
          </p>
          <div className="mt-5">
            <PangramHints hints={hints.pangramHints} />
          </div>
        </section>

        {/* L5: per-word clues */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.wordClues.heading}
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {SECTIONS.wordClues.intro}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {SECTIONS.wordClues.note}
          </p>
          <div className="mt-6">
            <WordClueList clues={hints.wordClues} />
          </div>
        </section>

        {/* Hint ladder */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.ladder.heading}
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {SECTIONS.ladder.intro}
          </p>
          {SECTIONS.ladder.rungs.map((rung) => (
            <div key={rung.heading}>
              <h3 className="mt-8 font-heading text-lg font-semibold text-foreground">
                {rung.heading}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {rung.body}
              </p>
            </div>
          ))}
        </section>

        {/* Strategy */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.strategy.heading}
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {SECTIONS.strategy.intro}
          </p>
          {SECTIONS.strategy.tips.map((tip) => (
            <div key={tip.heading}>
              <h3 className="mt-8 font-heading text-lg font-semibold text-foreground">
                {tip.heading}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {tip.body}
              </p>
            </div>
          ))}
        </section>

        {/* Why hints */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.whatIs.heading}
          </h2>
          {SECTIONS.whatIs.body.map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          <p className="mt-4 text-sm text-muted-foreground">
            Ready to check your list?{" "}
            <Link
              href="/spelling-bee-answers"
              className="font-semibold text-cta hover:underline"
            >
              See today&apos;s full Spelling Bee answers
            </Link>{" "}
            — pangram, point values, and the Genius cutoff included.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mt-5">
            <AnswersFAQ
              items={FAQ_ITEMS.map((f, i) => ({
                ...f,
                number: String(i + 1).padStart(2, "0"),
              }))}
            />
          </div>
        </section>

        {/* Related */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            More NYT Puzzle Answers &amp; Hints
          </h2>
          <div className="mt-5">
            <RelatedTools
              tools={RELATED_GAMES.filter(
                (t) => t.href !== "/spelling-bee-hints-today"
              )}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
