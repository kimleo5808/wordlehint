import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import {
  breadcrumbSchema,
  datasetSchema,
  faqPageSchema,
  JsonLd,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import {
  getArchiveConnections,
  getConnectionsStats,
} from "@/lib/connections-daily";
import { getTodayDateString } from "@/lib/wordle-daily";
import { RELATED_TOOLS } from "@/data/wordle-answers/content";
import AnswersFAQ from "@/components/wordle-answers/AnswersFAQ";
import RelatedTools from "@/components/wordle-answers/RelatedTools";
import ConnectionsArchive from "@/components/connections/ConnectionsArchive";
import ColorLegend from "@/components/connections/ColorLegend";
import { Archive } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

type Params = Promise<{ locale: string }>;

const FAQ_ITEMS = [
  {
    number: "01",
    question: "How far back does the Connections archive go?",
    answer:
      "All the way to the first puzzle on June 12, 2023 (#1). Every puzzle since then is here with its four color groups and sixteen words.",
  },
  {
    number: "02",
    question: "Can I search for a specific Connections word?",
    answer:
      "Yes. Type any word, category name, or puzzle number into the search box and the archive filters instantly to the puzzles that match.",
  },
  {
    number: "03",
    question: "Where is today's Connections answer?",
    answer:
      "Today's puzzle is kept on our Connections Hint Today page, revealed step by step so you stay spoiler-free. This archive lists past puzzles only.",
  },
  {
    number: "04",
    question: "What do the four colors mean?",
    answer:
      "Each group has a difficulty color: yellow is easiest, then green, then blue, and purple is the trickiest — usually a wordplay twist.",
  },
  {
    number: "05",
    question: "How often is the archive updated?",
    answer:
      "Daily. Yesterday's puzzle joins the archive automatically once a new puzzle goes live.",
  },
];

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const { total } = getConnectionsStats();
  return constructMetadata({
    page: "ConnectionsArchive",
    title: `NYT Connections Archive — All ${total}+ Past Answers`,
    description: `Browse every past NYT Connections puzzle with all four color groups and sixteen words. Search any answer, category, or puzzle number. Updated daily.`,
    keywords: [
      "connections archive",
      "past connections answers",
      "connections answers list",
      "nyt connections archive",
      "all connections answers",
      "previous connections answers",
    ],
    locale: locale as Locale,
    path: "/connections-answers",
    canonicalUrl: "/connections-answers",
    images: ["og/connections-answers.png"],
  });
}

export default function ConnectionsAnswersPage() {
  const puzzles = getArchiveConnections();
  const stats = getConnectionsStats();
  const pageUrl = `${BASE_URL}/connections-answers`;
  const updated = new Date(`${getTodayDateString()}T12:00:00`).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <div className="w-full">
      <JsonLd
        data={datasetSchema({
          name: "NYT Connections Past Answers",
          description:
            "Every past NYT Connections puzzle with its four color groups and sixteen words.",
          url: pageUrl,
          dateModified: getTodayDateString(),
          measurementCount: stats.total,
        })}
      />
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Connections Archive", url: pageUrl },
        ])}
      />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Archive className="h-4 w-4" />
            {stats.total} puzzles since June 2023 · updated daily
          </div>
          <h1 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl">
            NYT Connections Archive — Every Past Answer
          </h1>
          <p className="mt-3 text-slate-300">
            Browse every past NYT Connections puzzle, each with all four color
            groups and its sixteen words. Search any answer, category, or puzzle
            number — today&apos;s puzzle stays on the spoiler-safe hint page.
          </p>
          <p className="mt-4 font-mono text-xs text-slate-400">
            WordleHint Editorial · Updated {updated}
          </p>
          <Link
            href="/connections-hint-today"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cta px-5 py-2.5 text-sm font-bold text-cta-foreground"
          >
            Today&apos;s Connections hint
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        {/* Stats facts */}
        <ul className="grid gap-2 sm:grid-cols-2">
          {stats.facts.map((fact, i) => (
            <li
              key={i}
              className="flex gap-2 rounded-lg bg-muted/40 px-3 py-2 text-sm text-foreground"
            >
              <span className="text-cta">▪</span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>

        {/* Archive explorer */}
        <section className="mt-8" aria-labelledby="browse-heading">
          <h2
            id="browse-heading"
            className="font-heading text-2xl font-bold text-foreground"
          >
            Browse Every Connections Answer
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Search a word, category, or puzzle number, or scroll the full list
            newest-first.
          </p>
          <div className="mt-5 rounded-2xl border border-border bg-card p-4 sm:p-6">
            <ConnectionsArchive puzzles={puzzles} />
          </div>
        </section>

        {/* Colors */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            The Connections Colors
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Every puzzle sorts its 16 words into four color groups by difficulty.
          </p>
          <div className="mt-5">
            <ColorLegend />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Prefer{" "}
            <a
              href="https://connectionshint.app/"
              target="_blank"
              rel="noopener"
              className="font-semibold text-cta hover:underline"
            >
              a site dedicated to NYT Connections
            </a>
            ? It covers the daily puzzle in depth.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mt-5">
            <AnswersFAQ items={FAQ_ITEMS} />
          </div>
        </section>

        {/* Related */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            More Daily Puzzle Help
          </h2>
          <div className="mt-5">
            <RelatedTools tools={RELATED_TOOLS} />
          </div>
        </section>
      </div>
    </div>
  );
}
