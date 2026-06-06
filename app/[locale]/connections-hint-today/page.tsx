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
import {
  firstLetterHint,
  getRecentConnections,
  getTodayConnections,
  LEVEL_META,
} from "@/lib/connections-daily";
import { getTodayDateString } from "@/lib/wordle-daily";
import {
  CONNECTIONS_DEFINITION,
  FAQ_ITEMS,
  PAGE_META,
  SECTIONS,
} from "@/data/connections/content";
import { RELATED_TOOLS } from "@/data/wordle-answers/content";
import AnswersFAQ from "@/components/wordle-answers/AnswersFAQ";
import RelatedTools from "@/components/wordle-answers/RelatedTools";
import SpoilerCurtain from "@/components/wordle-answers/SpoilerCurtain";
import StagedHints, {
  type HintGroup,
} from "@/components/connections/StagedHints";
import AnswerGrid, { type AnswerRow } from "@/components/connections/AnswerGrid";
import ColorLegend from "@/components/connections/ColorLegend";
import { Grid3x3, ChevronRight } from "lucide-react";
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
  const puzzle = getTodayConnections();
  const dateStr = getTodayDateString();
  return constructMetadata({
    page: "ConnectionsHintToday",
    title: `${PAGE_META.titleBase} — ${dateStr}${puzzle ? ` (#${puzzle.id})` : ""}`,
    description: PAGE_META.descriptionBase,
    keywords: PAGE_META.keywords,
    locale: locale as Locale,
    path: "/connections-hint-today",
    canonicalUrl: "/connections-hint-today",
    images: ["og/connections-hint-today.png"],
  });
}

export default function ConnectionsHintTodayPage() {
  const puzzle = getTodayConnections();
  const today = getTodayDateString();
  const pageUrl = `${BASE_URL}/connections-hint-today`;

  if (!puzzle) {
    const recent = getRecentConnections(1)[0];
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Connections Hint Today
        </h1>
        <p className="mt-4 text-muted-foreground">
          Today&apos;s Connections ({today}) isn&apos;t available just yet — it
          publishes automatically once the new puzzle goes live.
        </p>
        {recent && (
          <Link
            href="/wordle-hint-today"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cta px-5 py-2.5 text-sm font-bold text-cta-foreground"
          >
            Today&apos;s Wordle hint
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    );
  }

  const formattedDate = formatLong(puzzle.date);

  const hintGroups: HintGroup[] = puzzle.groups.map((g) => ({
    level: g.level,
    color: LEVEL_META[g.level].color,
    label: LEVEL_META[g.level].label,
    name: g.name,
    words: g.words,
    firstLetters: firstLetterHint(g),
  }));

  const answerRows: AnswerRow[] = puzzle.groups.map((g) => ({
    color: LEVEL_META[g.level].color,
    name: g.name,
    words: g.words,
  }));

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
          "How to Use These Connections Hints",
          "Reveal a clue, then the category, then the words for each Connections group.",
          HOWTO_STEPS
        )}
      />
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Connections Hint Today", url: pageUrl },
        ])}
      />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Grid3x3 className="h-4 w-4" />
            Spoiler-safe · revealed step by step
          </div>
          <h1 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl">
            Connections Hint Today — {formattedDate}
          </h1>
          <p className="mt-3 text-slate-300">
            Stuck on today&apos;s NYT Connections (#{puzzle.id}, editor{" "}
            {puzzle.editor})? Reveal help one step at a time — a clue for each
            color group, then the category names, then the answers — so you only
            see what you ask for.
          </p>
          <p className="mt-4 font-mono text-xs text-slate-400">
            WordleHint Editorial · Updated {formattedDate}
          </p>
          <Link
            href="/connections-answers"
            className="mt-4 inline-block text-sm font-semibold text-primary hover:text-primary/80"
          >
            Browse past Connections answers →
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        {/* Staged hints */}
        <section aria-labelledby="hints-heading">
          <h2 id="hints-heading" className="sr-only">
            Today&apos;s Connections hints
          </h2>
          <StagedHints groups={hintGroups} date={puzzle.date} />
        </section>

        {/* Today's answer (full grid behind curtain) */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.todaysAnswer.heading}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {SECTIONS.todaysAnswer.intro}
          </p>
          <div className="mt-5">
            <SpoilerCurtain
              date={`${puzzle.date}-grid`}
              label="Reveal today's answers"
            >
              <AnswerGrid rows={answerRows} />
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

        {/* What is Connections */}
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
            <p className="font-medium leading-relaxed">
              {CONNECTIONS_DEFINITION}
            </p>
          </blockquote>
          <p className="mt-4 text-sm text-muted-foreground">
            Want a site focused entirely on Connections?{" "}
            <a
              href="https://connectionshint.app/"
              target="_blank"
              rel="noopener"
              className="font-semibold text-cta hover:underline"
            >
              ConnectionsHint
            </a>{" "}
            publishes daily Connections hints and answers.
          </p>
        </section>

        {/* Colors */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.colors.heading}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {SECTIONS.colors.intro}
          </p>
          <div className="mt-5">
            <ColorLegend />
          </div>
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

        {/* Connections vs Wordle */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.vsWordle.heading}
          </h2>
          {SECTIONS.vsWordle.body.map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/60">
                <tr>
                  {SECTIONS.vsWordle.comparison.headers.map((h, i) => (
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
                {SECTIONS.vsWordle.comparison.rows.map((row, i) => (
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
            Playing both today?{" "}
            <Link
              href="/wordle-hint-today"
              className="font-semibold text-cta hover:underline"
            >
              Get today&apos;s Wordle hint
            </Link>{" "}
            or browse{" "}
            <Link
              href="/wordle-answers"
              className="font-semibold text-cta hover:underline"
            >
              past Wordle answers
            </Link>
            .
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
