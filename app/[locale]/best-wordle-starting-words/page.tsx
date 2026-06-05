import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import {
  articleSchema,
  breadcrumbSchema,
  datasetSchema,
  faqPageSchema,
  itemListSchema,
  JsonLd,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import {
  AVOID_WORDS,
  getStartingWordData,
} from "@/lib/wordle-starting-words";
import {
  FAQ_ITEMS,
  GOOD_OPENER_DEFINITION,
  OPENER_NOTES,
  PAGE_META,
  SECTIONS,
} from "@/data/best-starting-words/content";
import { RELATED_TOOLS } from "@/data/wordle-answers/content";
import { WordTiles } from "@/components/wordle-answers/WordTiles";
import AnswersFAQ from "@/components/wordle-answers/AnswersFAQ";
import RelatedTools from "@/components/wordle-answers/RelatedTools";
import RankingTable from "@/components/best-starting-words/RankingTable";
import LetterFrequencyGrid from "@/components/best-starting-words/LetterFrequencyGrid";
import AvoidSection from "@/components/best-starting-words/AvoidSection";
import { Trophy } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

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
    page: "BestWordleStartingWords",
    title: PAGE_META.title,
    description: PAGE_META.description,
    keywords: PAGE_META.keywords,
    locale: locale as Locale,
    path: "/best-wordle-starting-words",
    canonicalUrl: "/best-wordle-starting-words",
  });
}

export default function BestStartingWordsPage() {
  const data = getStartingWordData();
  const { best, rankings, total } = data;
  const pageUrl = `${BASE_URL}/best-wordle-starting-words`;

  const crane = data.byWord["CRANE"];
  const adieu = data.byWord["ADIEU"];
  const topLetters = data.overallFrequency.slice(0, 5).map((l) => l.letter);

  // Resolve FAQ tokens from live stats.
  const facts = {
    bestWordFact: `${best.word} is the best Wordle starting word against the ${total} answers we track, scoring ${best.entropy.toFixed(2)} bits.`,
    slateVsCraneFact: crane
      ? `${best.word} edges out CRANE here: ${best.word} scores ${best.entropy.toFixed(2)} bits versus CRANE's ${crane.entropy.toFixed(2)}.`
      : `${best.word} tops the ranking with ${best.entropy.toFixed(2)} bits.`,
    adieuFact: adieu
      ? `ADIEU ranks #${adieu.rank} of ${rankings.length} in our data, well behind the leaders.`
      : "ADIEU underperforms balanced openers in our data.",
    topLettersFact: `In the answers we track, the most common letters are ${topLetters.join(", ")}.`,
  };
  const faqItems = FAQ_ITEMS.map((item) => ({
    ...item,
    answer: item.answer
      .replace("{{bestWordFact}}", facts.bestWordFact)
      .replace("{{slateVsCraneFact}}", facts.slateVsCraneFact)
      .replace("{{adieuFact}}", facts.adieuFact)
      .replace("{{topLettersFact}}", facts.topLettersFact),
  }));

  const topTen = rankings.slice(0, 10);
  const avoidStats = AVOID_WORDS.map((w) => data.byWord[w]).filter(Boolean);
  const updatedLabel = new Date(`${data.lastUpdated}T12:00:00`).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <div className="w-full">
      <JsonLd
        data={articleSchema({
          title: PAGE_META.h1,
          description: PAGE_META.description,
          url: pageUrl,
          datePublished: "2026-06-05T05:00:00Z",
          dateModified: `${data.lastUpdated}T05:00:00Z`,
        })}
      />
      <JsonLd data={faqPageSchema(faqItems)} />
      <JsonLd
        data={itemListSchema(
          "Best Wordle Starting Words",
          topTen.map((r) => r.word)
        )}
      />
      <JsonLd
        data={datasetSchema({
          name: "Wordle Starting Word Performance",
          description:
            "Entropy and expected-remaining scores for Wordle opening words, computed against real tracked NYT answers.",
          url: pageUrl,
          dateModified: data.lastUpdated,
          measurementCount: rankings.length,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Best Wordle Starting Words", url: pageUrl },
        ])}
      />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Trophy className="h-4 w-4" />
            Ranked from {total} real answers · updated daily
          </div>
          <h1 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl">
            {PAGE_META.h1}
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            We ran every top opener through information theory against the{" "}
            {total} real Wordle answers we track. Here&apos;s what actually
            narrows the field fastest — recomputed every day.
          </p>
          <p className="mt-4 font-mono text-xs text-slate-400">
            WordleHint Editorial · Updated {updatedLabel}
          </p>

          {/* #1 pick */}
          <div className="mt-8 inline-flex flex-col items-start gap-3 rounded-2xl border border-wordle-correct/30 bg-white/5 p-5 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-wordle-correct">
                #1 pick
              </span>
              <WordTiles word={best.word} size="lg" />
            </div>
            <div className="font-mono text-sm text-slate-300">
              <div>
                <span className="text-slate-400">Entropy</span>{" "}
                <span className="font-bold text-white">
                  {best.entropy.toFixed(2)} bits
                </span>
              </div>
              <div className="mt-1">
                <span className="text-slate-400">Cuts field to</span>{" "}
                <span className="font-bold text-white">
                  ~{Math.round(best.expectedRemaining)} answers
                </span>
              </div>
              <div className="mt-1">
                <span className="text-slate-400">Hits a green</span>{" "}
                <span className="font-bold text-white">
                  {Math.round(best.greenProb * 100)}%
                </span>{" "}
                of the time
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Ranking table */}
        <section aria-labelledby="ranking-heading">
          <h2
            id="ranking-heading"
            className="font-heading text-2xl font-bold text-foreground"
          >
            The Starting Word Rankings
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sorted by information gain. Tap any column header to re-sort by
            answers remaining or green rate.
          </p>
          <div className="mt-5">
            <RankingTable rankings={rankings} />
          </div>
        </section>

        {/* Best now */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.bestNow.heading}
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {facts.bestWordFact} It puts five common letters in their most
            likely positions, lighting up greens and yellows more often than any
            other opener we tested. If you only remember one word, make it{" "}
            <span className="font-semibold text-foreground">{best.word}</span>.
          </p>
        </section>

        {/* What makes a good opener */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.whatMakes.heading}
          </h2>
          {SECTIONS.whatMakes.body.map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {SECTIONS.whatMakes.bullets.map((b, i) => (
              <li
                key={i}
                className="flex gap-2 rounded-lg bg-muted/40 px-3 py-2 text-sm text-foreground"
              >
                <span className="text-wordle-correct">▪</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <blockquote className="mt-4 border-l-4 border-wordle-correct bg-muted/40 px-5 py-4 text-foreground">
            <p className="font-medium leading-relaxed">{GOOD_OPENER_DEFINITION}</p>
          </blockquote>
        </section>

        {/* Method */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.method.heading}
          </h2>
          {SECTIONS.method.body.map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          <p className="mt-3 text-sm text-muted-foreground">
            The answer set comes from our{" "}
            <Link
              href="/wordle-answers"
              className="font-semibold text-cta hover:underline"
            >
              archive of real Wordle answers
            </Link>
            .
          </p>
        </section>

        {/* Top 10 cards */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.topTen.heading}
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {topTen.map((r) => (
              <div
                key={r.word}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-muted-foreground">
                    #{r.rank}
                  </span>
                  <WordTiles word={r.word} size="md" />
                  <span className="ml-auto font-mono text-xs text-muted-foreground">
                    {r.entropy.toFixed(2)} bits
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {OPENER_NOTES[r.word] ??
                    `Tests ${r.word.split("").join(", ")} — a balanced spread of common letters.`}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Letter frequency */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.frequency.heading}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {SECTIONS.frequency.intro}
          </p>
          <div className="mt-6">
            <LetterFrequencyGrid
              positionFrequency={data.positionFrequency}
              overallFrequency={data.overallFrequency}
            />
          </div>
        </section>

        {/* Avoid */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.avoid.heading}
          </h2>
          {SECTIONS.avoid.body.map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          <div className="mt-5">
            <AvoidSection words={avoidStats} best={best} />
          </div>
        </section>

        {/* Second word */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.secondWord.heading}
          </h2>
          {SECTIONS.secondWord.body.map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          <Link
            href="/wordle-solver"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cta px-5 py-2.5 text-sm font-bold text-cta-foreground shadow-md transition-all hover:bg-cta/90"
          >
            Open the Wordle Solver
          </Link>
        </section>

        {/* Same word */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.sameWord.heading}
          </h2>
          {SECTIONS.sameWord.body.map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mt-5">
            <AnswersFAQ items={faqItems} />
          </div>
        </section>

        {/* Related */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Related Tools
          </h2>
          <div className="mt-5">
            <RelatedTools tools={RELATED_TOOLS} />
          </div>
        </section>
      </div>
    </div>
  );
}
