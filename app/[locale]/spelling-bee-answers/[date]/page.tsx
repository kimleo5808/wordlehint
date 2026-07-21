import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import { articleSchema, breadcrumbSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import {
  getArchiveSpellingBee,
  getSpellingBeeByDate,
  getSpellingBeeScoring,
} from "@/lib/spelling-bee-daily";
import { getTodayDateString } from "@/lib/wordle-daily";
import RankTable from "@/components/spelling-bee/RankTable";
import SpellingBeeHive from "@/components/spelling-bee/SpellingBeeHive";
import StatsTrio from "@/components/spelling-bee/StatsTrio";
import WordCard from "@/components/spelling-bee/WordCard";
import { ChevronRight, Hexagon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ locale: string; date: string }>;

function formatLong(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getArchiveSpellingBee().map((p) => ({ locale, date: p.date }))
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, date } = await params;
  const puzzle = getSpellingBeeByDate(date);
  if (!puzzle) return {};
  const formatted = formatLong(date);
  return constructMetadata({
    page: "SpellingBeeAnswersArchive",
    title: `NYT Spelling Bee Answers for ${formatted} - All Words & Pangram`,
    description: `The complete NYT Spelling Bee answers for ${formatted}: full word list, pangram, total points, and the Genius score for that day's puzzle.`,
    keywords: [
      `spelling bee answers ${date}`,
      `nyt spelling bee ${formatted.toLowerCase()}`,
      "spelling bee answers",
      "spelling bee pangram",
    ],
    locale: locale as Locale,
    path: `/spelling-bee-answers/${date}`,
    canonicalUrl: `/spelling-bee-answers/${date}`,
    images: ["og/spelling-bee-answers.png"],
  });
}

export default async function SpellingBeeArchivePage({
  params,
}: {
  params: Params;
}) {
  const { date } = await params;
  const puzzle = getSpellingBeeByDate(date);
  // Today's puzzle lives on the main page only — archive covers closed days.
  if (!puzzle || date >= getTodayDateString()) notFound();

  const scoring = getSpellingBeeScoring(puzzle);
  const formattedDate = formatLong(puzzle.date);
  const byLength = [...scoring.byLength.entries()];
  const pangramWords = scoring.words.filter((w) => w.isPangram);
  const pageUrl = `${BASE_URL}/spelling-bee-answers/${puzzle.date}`;

  return (
    <div className="w-full">
      <JsonLd
        data={articleSchema({
          title: `NYT Spelling Bee Answers for ${formattedDate}`,
          description: `Complete word list, pangram, and scores for the ${formattedDate} NYT Spelling Bee.`,
          url: pageUrl,
          datePublished: `${puzzle.date}T07:00:00Z`,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          {
            name: "Spelling Bee Answers",
            url: `${BASE_URL}/spelling-bee-answers`,
          },
          { name: formattedDate, url: pageUrl },
        ])}
      />

      <section className="border-b border-border bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto grid max-w-4xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-wordle-present/30 bg-wordle-present/10 px-4 py-1.5 text-sm font-medium text-wordle-present">
              <Hexagon className="h-4 w-4" />
              Archived puzzle · no spoiler curtain
            </div>
            <h1 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl">
              Spelling Bee Answers —{" "}
              <time dateTime={puzzle.date}>{formattedDate}</time>
            </h1>
            <p className="mt-3 text-slate-300">
              Every word from the {formattedDate} NYT Spelling Bee, with the
              pangram highlighted and the full score breakdown. This puzzle is
              closed, so everything is shown in the open.
            </p>
            <Link
              href="/spelling-bee-answers"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cta px-6 py-3 text-sm font-bold text-cta-foreground shadow-lg transition-colors hover:bg-cta/90"
            >
              Today&apos;s Spelling Bee answers
              <ChevronRight className="h-4 w-4" />
            </Link>
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
        <section>
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Pangram{pangramWords.length > 1 ? "s" : ""} for {formattedDate}
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {pangramWords.map((w) => (
              <WordCard key={w.word} word={w} />
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            All {scoring.totalWords} Words
          </h2>
          <div className="mt-5 space-y-8">
            {byLength.map(([length, words]) => (
              <div key={length}>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {length}-Letter Words{" "}
                  <span className="font-normal text-muted-foreground">
                    ({words.length})
                  </span>
                </h3>
                <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {words.map((w) => (
                    <WordCard key={w.word} word={w} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Rank Thresholds That Day
          </h2>
          <div className="mt-5 rounded-xl border border-border bg-card p-5">
            <RankTable ranks={scoring.ranks} totalPoints={scoring.totalPoints} />
          </div>
        </section>
      </div>
    </div>
  );
}
