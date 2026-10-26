import { BASE_URL } from "@/config/site";
import DateFaq, { type DateFaqItem } from "@/components/date-pages/DateFaq";
import FactCards from "@/components/date-pages/FactCards";
import LatestDatePages from "@/components/date-pages/LatestDatePages";
import PipsArchiveExplorer from "@/components/pips/PipsArchiveExplorer";
import { Locale, LOCALES } from "@/i18n/routing";
import { formatLongDate, getLatestPipsDateLinks } from "@/lib/date-pages";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  JsonLd,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { getPipsStats } from "@/lib/pips-stats";
import { getTodayDateString } from "@/lib/wordle-daily";
import { Archive } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

type Params = Promise<{ locale: string }>;

const PAGE_PATH = "/pips-answers";

const pct = (x: number) => `${Math.round(x * 100)}%`;

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const s = getPipsStats();
  return constructMetadata({
    page: "PipsAnswers",
    title: "NYT Pips Answers Archive — Every Past Easy, Medium & Hard",
    description: `Every past NYT Pips solution since August 18, 2025 (${s.puzzles} days): pick a date to see all three solved boards, plus real statistics from the archive.`,
    keywords: ["pips answers", "nyt pips archive", "past pips answers", "pips solutions"],
    locale: locale as Locale,
    path: PAGE_PATH,
    canonicalUrl: PAGE_PATH,
    images: ["og/pips-answers.png"],
  });
}

export default function PipsAnswersPage() {
  const s = getPipsStats();
  const today = getTodayDateString();
  const pageUrl = `${BASE_URL}${PAGE_PATH}`;
  const { easy, medium, hard } = s.byDifficulty;
  const topTarget = s.topSumTargets[0];

  const faq: DateFaqItem[] = [
    {
      question: "Where can I find old NYT Pips answers?",
      answer: `Right here: pick any month and date in the archive above to see the solved Easy, Medium and Hard boards. It covers every puzzle from August 18, 2025 to yesterday — ${s.puzzles} days so far. Today's puzzle stays on the step-by-step hints page.`,
    },
    {
      question: "How many dominoes are in a Pips puzzle?",
      answer: `On average ${easy.avgDominoes.toFixed(1)} on Easy (${easy.minDominoes}–${easy.maxDominoes}), ${medium.avgDominoes.toFixed(1)} on Medium (${medium.minDominoes}–${medium.maxDominoes}) and ${hard.avgDominoes.toFixed(1)} on Hard (${hard.minDominoes}–${hard.maxDominoes}).`,
    },
    {
      question: "What is the most common number in Pips?",
      answer: topTarget
        ? `Among regions of two or more squares with a sum, ${topTarget.target} is the most common target (${pct(topTarget.share)} of them), followed by ${s.topSumTargets.slice(1, 4).map((t) => t.target).join(", ")}.`
        : "Not enough data yet.",
    },
    {
      question: "Who makes NYT Pips?",
      answer: `The boards in our archive are credited to ${s.constructors.map((c) => c.name).join(", ")}.`,
    },
  ];

  return (
    <div className="w-full">
      <JsonLd
        data={articleSchema({
          title: "NYT Pips Answers Archive",
          description: "Every past NYT Pips solution, Easy to Hard, with archive statistics.",
          url: pageUrl,
          datePublished: "2026-10-26T12:00:00Z",
          dateModified: `${today}T06:00:00Z`,
        })}
      />
      <JsonLd data={faqPageSchema(faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Pips Answers", url: pageUrl },
        ])}
      />

      <section className="border-b border-border bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Archive className="h-4 w-4" />
            {s.puzzles} days since Aug 18, 2025 · updated daily
          </div>
          <h1 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl">
            NYT Pips Answers — Every Past Puzzle
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Every Easy, Medium and Hard Pips solution since the game launched.
            Pick a date below to see the solved boards — today&apos;s puzzle stays
            on the spoiler-safe hints page.
          </p>
          <p className="mt-4 font-mono text-xs text-slate-400">
            Updated <time dateTime={today}>{formatLongDate(today)}</time> · Puzzle data from NYT Games
          </p>
          <Link
            href="/pips-hint-today"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cta px-5 py-2.5 text-sm font-bold text-cta-foreground"
          >
            Today&apos;s Pips hints
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <LatestDatePages
          heading="Latest Pips Puzzles, One Page Each"
          intro="Recent puzzles have their own page with all three solutions, a hint mode and notes on each board."
          game="Pips"
          pages={getLatestPipsDateLinks()}
        />

        <section className="mt-14" aria-labelledby="archive-heading">
          <h2 id="archive-heading" className="font-heading text-2xl font-bold text-foreground">
            Browse Every Past Pips Solution
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose a month and a day; switch difficulty with the tabs.
          </p>
          <div className="mt-5 rounded-2xl border border-border bg-card p-4 sm:p-6">
            <PipsArchiveExplorer />
          </div>
        </section>

        <section className="mt-14" aria-labelledby="numbers-heading">
          <h2 id="numbers-heading" className="font-heading text-2xl font-bold text-foreground">
            Pips by the Numbers
          </h2>
          <div className="mt-4">
            <FactCards
              facts={[
                { value: easy.avgDominoes.toFixed(1), label: "dominoes on an average Easy board" },
                { value: medium.avgDominoes.toFixed(1), label: "dominoes on an average Medium board" },
                { value: hard.avgDominoes.toFixed(1), label: "dominoes on an average Hard board" },
                { value: pct(hard.oneSquareShare), label: "of Hard boards have a one-square sum region" },
              ]}
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Counted from {s.puzzles} days × 3 boards ({formatLongDate(s.firstDate)} to{" "}
            {formatLongDate(s.lastDate)}). Sum regions make up {pct(hard.regionMix.find((r) => r.type === "sum")?.share ?? 0)} of
            all regions on Hard boards
            {topTarget ? `, and ${topTarget.target} is the most common target for a multi-square sum (${pct(topTarget.share)})` : ""}.
          </p>
        </section>

        <DateFaq heading="Pips Answers FAQ" items={faq} />
      </div>
    </div>
  );
}
