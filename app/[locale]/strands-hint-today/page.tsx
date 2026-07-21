import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  howToSchema,
  JsonLd,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { getTodayStrands } from "@/lib/strands-daily";
import { getTodayDateString } from "@/lib/wordle-daily";
import {
  FAQ_ITEMS,
  PAGE_META,
  SECTIONS,
  STRANDS_DEFINITION,
} from "@/data/strands/content";
import { RELATED_TOOLS } from "@/data/wordle-answers/content";
import AnswersFAQ from "@/components/wordle-answers/AnswersFAQ";
import RelatedTools from "@/components/wordle-answers/RelatedTools";
import SpoilerCurtain from "@/components/wordle-answers/SpoilerCurtain";
import StrandsHints from "@/components/strands/StrandsHints";
import BoardGrid from "@/components/strands/BoardGrid";
import { Spline, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

type Params = Promise<{ locale: string }>;

const HOWTO_STEPS = SECTIONS.howToUse.steps;

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
  const puzzle = getTodayStrands();
  const dateStr = getTodayDateString();
  return constructMetadata({
    page: "StrandsHintToday",
    title: `${PAGE_META.titleBase} — ${dateStr}${puzzle ? ` (#${puzzle.id})` : ""}`,
    description: PAGE_META.descriptionBase,
    keywords: PAGE_META.keywords,
    locale: locale as Locale,
    path: "/strands-hint-today",
    canonicalUrl: "/strands-hint-today",
    images: ["og/strands-hint-today.png"],
  });
}

export default function StrandsHintTodayPage() {
  const puzzle = getTodayStrands();
  const today = getTodayDateString();
  const pageUrl = `${BASE_URL}/strands-hint-today`;

  if (!puzzle) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Strands Hint Today
        </h1>
        <p className="mt-4 text-muted-foreground">
          Today&apos;s Strands ({today}) isn&apos;t available just yet — it
          publishes automatically once the new puzzle goes live.
        </p>
        <Link
          href="/wordle-hint-today"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cta px-5 py-2.5 text-sm font-bold text-cta-foreground"
        >
          Today&apos;s Wordle hint
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const formattedDate = formatLong(puzzle.date);

  return (
    <div className="w-full">
      <JsonLd
        data={articleSchema({
          title: `${PAGE_META.titleBase} — ${formattedDate} (#${puzzle.id})`,
          description: PAGE_META.descriptionBase,
          url: pageUrl,
          datePublished: `${puzzle.date}T06:00:00Z`,
          dateModified: `${puzzle.date}T06:00:00Z`,
        })}
      />
      <JsonLd
        data={howToSchema(
          "How to Use These Strands Hints",
          "Reveal a clue for the spangram, then each theme word for today's NYT Strands.",
          HOWTO_STEPS
        )}
      />
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Strands Hint Today", url: pageUrl },
        ])}
      />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Spline className="h-4 w-4" />
            Spoiler-safe · revealed step by step
          </div>
          <h1 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl">
            Strands Hint Today — {formattedDate}
          </h1>
          <p className="mt-3 text-slate-300">
            Stuck on today&apos;s NYT Strands (#{puzzle.id}
            {puzzle.editor ? `, editor ${puzzle.editor}` : ""})? Get a nudge for
            the spangram, then each theme word — revealed only when you ask.
          </p>
          <p className="mt-4 font-mono text-xs text-slate-400">
            WordleHint Editorial · Updated {formattedDate}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
            <Link
              href="/strands-answers"
              className="inline-block text-sm font-semibold text-primary hover:text-primary/80"
            >
              Browse past Strands answers →
            </Link>
            <Link
              href="/strands-unlimited"
              className="inline-block text-sm font-semibold text-primary hover:text-primary/80"
            >
              Play Strands Unlimited →
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        {/* Board */}
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Today&apos;s Strands Board
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The same 6×8 grid you see in the game — no spoilers here.
          </p>
          <div className="mt-4 rounded-2xl border border-border bg-muted/30 p-5">
            <BoardGrid board={puzzle.board} />
          </div>
        </section>

        {/* Staged hints */}
        <section className="mt-10" aria-labelledby="hints-heading">
          <h2 id="hints-heading" className="sr-only">
            Today&apos;s Strands hints
          </h2>
          <StrandsHints
            clue={puzzle.clue}
            spangram={puzzle.spangram}
            themeWords={puzzle.themeWords}
            date={puzzle.date}
          />
        </section>

        {/* Today's answers (full reveal) */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.todaysAnswer.heading}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {SECTIONS.todaysAnswer.intro}
          </p>
          <div className="mt-5">
            <SpoilerCurtain
              date={`${puzzle.date}-strands`}
              label="Reveal today's answers"
            >
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="mb-3">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Spangram
                  </span>
                  <div className="mt-1">
                    <span
                      className="rounded px-2 py-1 font-mono text-sm font-bold text-white"
                      style={{ backgroundColor: "#eab308" }}
                    >
                      {puzzle.spangram}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Theme words
                </span>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {puzzle.themeWords.map((w) => (
                    <span
                      key={w}
                      className="rounded px-2 py-1 font-mono text-sm font-bold text-white"
                      style={{ backgroundColor: "#3b82f6" }}
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </SpoilerCurtain>
          </div>
        </section>

        {/* How to use */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.howToUse.heading}
          </h2>
          <ol className="mt-4 space-y-4">
            {HOWTO_STEPS.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cta font-mono text-sm font-bold text-cta-foreground">
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

        {/* What is Strands */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.whatIs.heading}
          </h2>
          {SECTIONS.whatIs.body.map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          <blockquote className="mt-4 border-l-4 border-cta bg-muted/40 px-5 py-4 text-foreground">
            <p className="font-medium leading-relaxed">{STRANDS_DEFINITION}</p>
          </blockquote>
          <p className="mt-4 text-sm text-muted-foreground">
            For a site built entirely around Strands, visit{" "}
            <a
              href="https://strandshint.app/"
              target="_blank"
              rel="noopener"
              className="font-semibold text-cta hover:underline"
            >
              StrandsHint
            </a>{" "}
            for daily spangram and theme-word help.
          </p>
        </section>

        {/* Strategy */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.strategy.heading}
          </h2>
          {SECTIONS.strategy.body.map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </section>

        {/* Strands vs others */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.vsOthers.heading}
          </h2>
          {SECTIONS.vsOthers.body.map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/60">
                <tr>
                  {SECTIONS.vsOthers.comparison.headers.map((h, i) => (
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
                {SECTIONS.vsOthers.comparison.rows.map((row, i) => (
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
            Playing all three?{" "}
            <Link
              href="/connections-hint-today"
              className="font-semibold text-cta hover:underline"
            >
              Today&apos;s Connections hint
            </Link>{" "}
            and{" "}
            <Link
              href="/wordle-hint-today"
              className="font-semibold text-cta hover:underline"
            >
              today&apos;s Wordle hint
            </Link>{" "}
            are ready too.
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

        {/* More daily puzzle help */}
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
