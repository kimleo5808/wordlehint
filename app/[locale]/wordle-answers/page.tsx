import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import {
  breadcrumbSchema,
  datasetSchema,
  faqPageSchema,
  howToSchema,
  JsonLd,
  softwareApplicationSchema,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import {
  getAnswerStats,
  getArchiveEntries,
  getRecentAnswerEntries,
  getTodayEntry,
  getTrackedAnswerCount,
} from "@/lib/wordle-answers";
import { getTodayDateString } from "@/lib/wordle-daily";
import {
  FAQ_ITEMS,
  HOWTO_SCHEMA_DESCRIPTION,
  HOWTO_SCHEMA_NAME,
  OFFICIAL_ANSWER_DEFINITION,
  PAGE_META,
  RELATED_TOOLS,
  SECTIONS,
} from "@/data/wordle-answers/content";
import AnswerExplorer from "@/components/wordle-answers/AnswerExplorer";
import AnswersFAQ from "@/components/wordle-answers/AnswersFAQ";
import RelatedTools from "@/components/wordle-answers/RelatedTools";
import StatsViz from "@/components/wordle-answers/StatsViz";
import WeekStrip from "@/components/wordle-answers/WeekStrip";
import { BookOpen } from "lucide-react";
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
    page: "WordleAnswers",
    title: PAGE_META.title,
    description: PAGE_META.description,
    keywords: PAGE_META.keywords,
    locale: locale as Locale,
    path: "/wordle-answers",
    canonicalUrl: "/wordle-answers",
    images: ["og/wordle-answers.png"],
  });
}

/** Resolve {{tokens}} in FAQ answers from live stats so text + schema agree. */
function resolveFaq(facts: {
  topFirstLetterFact: string;
  duplicateFact: string;
}) {
  return FAQ_ITEMS.map((item) => ({
    ...item,
    answer: item.answer
      .replace("{{topFirstLetterFact}}", facts.topFirstLetterFact)
      .replace("{{duplicateFact}}", facts.duplicateFact),
  }));
}

export default async function WordleAnswersPage() {
  const stats = getAnswerStats();
  const archive = getArchiveEntries();
  const today = getTodayEntry();
  const recent = getRecentAnswerEntries(7);
  const total = getTrackedAnswerCount();
  const pageUrl = `${BASE_URL}/wordle-answers`;

  const topFirst = stats.firstLetters[0];
  const topFirstPct = Math.round(topFirst.share * 100);
  const topFirstLetterFact = `${topFirst.letter} is the most common starting letter, opening ${topFirst.count} of ${total} tracked Wordle answers (${topFirstPct}%).`;
  const duplicateFact =
    stats.duplicateAnswers.length === 0
      ? `In the ${total} answers we currently track, no solution has repeated.`
      : `${stats.duplicateAnswers.length} answer${
          stats.duplicateAnswers.length > 1 ? "s have" : " has"
        } appeared more than once in the answers we track.`;

  const faqItems = resolveFaq({ topFirstLetterFact, duplicateFact });
  const updatedLabel = new Date(`${getTodayDateString()}T12:00:00`).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <div className="w-full">
      {/* Schema.org */}
      <JsonLd
        data={softwareApplicationSchema({
          name: "Past Wordle Answers Archive",
          description: PAGE_META.description,
          url: pageUrl,
        })}
      />
      <JsonLd
        data={datasetSchema({
          name: "Past Wordle Answers",
          description:
            "Every official Wordle answer tracked by WordleHint, with dates, puzzle numbers, and definitions.",
          url: pageUrl,
          dateModified: getTodayDateString(),
          measurementCount: total,
        })}
      />
      <JsonLd data={faqPageSchema(faqItems)} />
      <JsonLd
        data={howToSchema(
          HOWTO_SCHEMA_NAME,
          HOWTO_SCHEMA_DESCRIPTION,
          SECTIONS.howTo.steps
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Past Wordle Answers", url: pageUrl },
        ])}
      />

      {/* ─── Hero ─── */}
      <section className="border-b border-border bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <BookOpen className="h-4 w-4" />
            {total} answers · updated daily
          </div>
          <h1 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl">
            {PAGE_META.h1}
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Search and browse the latest {total} Wordle answers. Every entry
            includes the word&apos;s meaning, date, and puzzle number — with a
            link to that day&apos;s full hints, and today&apos;s answer hidden
            until you choose to reveal it.
          </p>
          <p className="mt-4 font-mono text-xs text-slate-400">
            WordleHint Editorial · Updated {updatedLabel}
          </p>

          {/* This week, today spoiler-safe */}
          <div className="mt-8">
            <h2 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
              This week
            </h2>
            <WeekStrip today={today} recent={recent} />
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
              <Link
                href="/todays-wordle-answer"
                className="font-medium text-primary hover:text-primary/80"
              >
                Today&apos;s Wordle answer →
              </Link>
              <Link
                href="/yesterdays-wordle-answer"
                className="font-medium text-primary hover:text-primary/80"
              >
                Yesterday&apos;s answer →
              </Link>
              <Link
                href="/best-wordle-starting-words"
                className="font-medium text-primary hover:text-primary/80"
              >
                Best starting words →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* ─── Browse all answers (the tool) ─── */}
        <section aria-labelledby="browse-heading">
          <h2
            id="browse-heading"
            className="font-heading text-2xl font-bold text-foreground"
          >
            Browse Every Wordle Answer
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Search any word or puzzle number, or sort the full list by date,
            number, or alphabetically.
          </p>
          <div className="mt-5 rounded-2xl border border-border bg-card p-4 sm:p-6">
            <AnswerExplorer entries={archive} />
          </div>
        </section>

        {/* ─── Why useful ─── */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.whyUseful.heading}
          </h2>
          {SECTIONS.whyUseful.body.map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </section>

        {/* ─── What counts (definition block) ─── */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.whatCounts.heading}
          </h2>
          {SECTIONS.whatCounts.body.map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          <blockquote className="mt-4 border-l-4 border-wordle-correct bg-muted/40 px-5 py-4 text-foreground">
            <p className="font-medium leading-relaxed">
              {OFFICIAL_ANSWER_DEFINITION}
            </p>
          </blockquote>
        </section>

        {/* ─── Statistics ─── */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.stats.heading}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {SECTIONS.stats.intro}
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {stats.facts.map((fact, i) => (
              <li
                key={i}
                className="flex gap-2 rounded-lg bg-muted/40 px-3 py-2 text-sm text-foreground"
              >
                <span className="text-wordle-correct">▪</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <StatsViz stats={stats} />
          </div>
        </section>

        {/* ─── How to use ─── */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.howTo.heading}
          </h2>
          <ol className="mt-4 space-y-4">
            {SECTIONS.howTo.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-wordle-correct font-mono text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">
                    {step.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ─── Hints vs Answers ─── */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.hintsVsAnswers.heading}
          </h2>
          {SECTIONS.hintsVsAnswers.body.map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/60">
                <tr>
                  {SECTIONS.hintsVsAnswers.comparison.headers.map((h, i) => (
                    <th
                      key={i}
                      className="px-4 py-2.5 text-left font-heading font-semibold text-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {SECTIONS.hintsVsAnswers.comparison.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={
                          j === 0
                            ? "px-4 py-2.5 font-medium text-foreground"
                            : "px-4 py-2.5 text-muted-foreground"
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Mid-puzzle and want to keep your streak?{" "}
            <Link
              href="/wordle-hint-today"
              className="font-semibold text-cta underline-offset-2 hover:underline"
            >
              Get today&apos;s Wordle hints
            </Link>{" "}
            instead.
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mt-5">
            <AnswersFAQ items={faqItems} />
          </div>
        </section>

        {/* ─── Related tools ─── */}
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
