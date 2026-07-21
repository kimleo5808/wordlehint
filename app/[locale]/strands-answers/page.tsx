import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import {
  breadcrumbSchema,
  datasetSchema,
  faqPageSchema,
  JsonLd,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { getArchiveStrands, getStrandsStats } from "@/lib/strands-daily";
import { getTodayDateString } from "@/lib/wordle-daily";
import { RELATED_TOOLS } from "@/data/wordle-answers/content";
import AnswersFAQ from "@/components/wordle-answers/AnswersFAQ";
import RelatedTools from "@/components/wordle-answers/RelatedTools";
import StrandsArchive from "@/components/strands/StrandsArchive";
import { Archive } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

type Params = Promise<{ locale: string }>;

const FAQ_ITEMS = [
  {
    number: "01",
    question: "What's in the Strands archive?",
    answer:
      "Every recent NYT Strands puzzle with its theme clue, spangram, and full list of theme words, newest first. Search by any word, the spangram, the clue, or the puzzle number.",
  },
  {
    number: "02",
    question: "Can I search for a specific Strands word or spangram?",
    answer:
      "Yes. Type any theme word, a spangram, part of the clue, or a puzzle number into the search box and the list filters instantly.",
  },
  {
    number: "03",
    question: "Where is today's Strands answer?",
    answer:
      "Today's puzzle is on our Strands Hint Today page, revealed step by step so you stay spoiler-free. This archive shows past puzzles only.",
  },
  {
    number: "04",
    question: "What is a spangram?",
    answer:
      "The spangram is the special theme word that stretches from one side of the board to the opposite side and names the puzzle's theme.",
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
  return constructMetadata({
    page: "StrandsArchive",
    title: "NYT Strands Archive — Past Answers & Spangrams",
    description:
      "Browse past NYT Strands puzzles with every spangram and theme word. Search any answer, spangram, clue, or puzzle number. Updated daily, spoiler-free.",
    keywords: [
      "strands archive",
      "past strands answers",
      "strands answers list",
      "nyt strands archive",
      "strands spangram list",
      "previous strands answers",
    ],
    locale: locale as Locale,
    path: "/strands-answers",
    canonicalUrl: "/strands-answers",
    images: ["og/strands-answers.png"],
  });
}

export default function StrandsAnswersPage() {
  const puzzles = getArchiveStrands();
  const stats = getStrandsStats();
  const pageUrl = `${BASE_URL}/strands-answers`;
  const updated = new Date(`${getTodayDateString()}T12:00:00`).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <div className="w-full">
      <JsonLd
        data={datasetSchema({
          name: "NYT Strands Past Answers",
          description:
            "Recent NYT Strands puzzles with their spangrams and theme words.",
          url: pageUrl,
          dateModified: getTodayDateString(),
          measurementCount: stats.total,
        })}
      />
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Strands Archive", url: pageUrl },
        ])}
      />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Archive className="h-4 w-4" />
            {stats.total} recent puzzles · updated daily
          </div>
          <h1 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl">
            NYT Strands Archive — Past Answers
          </h1>
          <p className="mt-3 text-slate-300">
            Browse recent NYT Strands puzzles with every spangram and theme
            word. Search any answer, spangram, clue, or puzzle number —
            today&apos;s puzzle stays on the spoiler-safe hint page.
          </p>
          <p className="mt-4 font-mono text-xs text-slate-400">
            WordleHint Editorial · Updated {updated}
          </p>
          <Link
            href="/strands-hint-today"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cta px-5 py-2.5 text-sm font-bold text-cta-foreground"
          >
            Today&apos;s Strands hint
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

        <p className="mt-4 text-sm text-muted-foreground">
          Looking for{" "}
          <a
            href="https://strandshint.app/"
            target="_blank"
            rel="noopener"
            className="font-semibold text-cta hover:underline"
          >
            a dedicated Strands hints site
          </a>
          ? It tracks every day&apos;s spangram and theme words.
        </p>

        {/* Archive */}
        <section className="mt-8" aria-labelledby="browse-heading">
          <h2
            id="browse-heading"
            className="font-heading text-2xl font-bold text-foreground"
          >
            Browse Strands Answers
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Search a word, spangram, clue, or puzzle number, or scroll the list
            newest-first.
          </p>
          <div className="mt-5 rounded-2xl border border-border bg-card p-4 sm:p-6">
            <StrandsArchive puzzles={puzzles} />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Want to replay these boards instead of reading them?{" "}
            <Link
              href="/strands-unlimited"
              className="font-semibold text-cta hover:underline"
            >
              Play Strands Unlimited
            </Link>{" "}
            deals random past boards with the original clues and spangrams.
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
