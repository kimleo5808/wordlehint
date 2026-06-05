import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import { Link as I18nLink } from "@/i18n/routing";
import {
  breadcrumbSchema,
  faqPageSchema,
  howToSchema,
  JsonLd,
  softwareApplicationSchema,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { getAnswerLookup } from "@/lib/wordle-answer-lookup";
import { getStartingWordData } from "@/lib/wordle-starting-words";
import {
  FAQ_ITEMS,
  PAGE_META,
  SECTIONS,
  SOLVER_DEFINITION,
} from "@/data/wordle-solver/content";
import { RELATED_TOOLS } from "@/data/wordle-answers/content";
import { WordTiles } from "@/components/wordle-answers/WordTiles";
import AnswersFAQ from "@/components/wordle-answers/AnswersFAQ";
import RelatedTools from "@/components/wordle-answers/RelatedTools";
import WordleSolver from "@/components/wordle/WordleSolver";
import { Search } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

type Params = Promise<{ locale: string }>;

const HOWTO_STEPS = [
  {
    name: "Enter your letters",
    text: "Type your guessed letters into the cells. The cursor moves automatically to the next position.",
  },
  {
    name: "Set the colors",
    text: "Click each cell to cycle its color — green (correct), yellow (wrong spot), or gray (not in word) — to match your Wordle feedback.",
  },
  {
    name: "Review the results",
    text: "See all matching words instantly, with real past answers flagged and defined. Use the keyboard to mark more absent letters.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    page: "WordleSolver",
    title: PAGE_META.title,
    description: PAGE_META.description,
    keywords: PAGE_META.keywords,
    locale: locale as Locale,
    path: "/wordle-solver",
    canonicalUrl: "/wordle-solver",
  });
}

const COLOR_CLASS = {
  correct: "bg-wordle-correct",
  present: "bg-wordle-present",
  absent: "bg-wordle-absent",
} as const;

export default async function WordleSolverPage({
  params,
}: {
  params: Params;
}) {
  await params;

  const answerLookup = getAnswerLookup();
  const starterWords = getStartingWordData().rankings.slice(0, 3).map((r) => r.word);
  const pageUrl = `${BASE_URL}/wordle-solver`;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Wordle Solver", url: pageUrl },
        ])}
      />
      <JsonLd
        data={softwareApplicationSchema({
          name: "Wordle Solver & Word Finder",
          description: PAGE_META.description,
          url: pageUrl,
          applicationCategory: "UtilitiesApplication",
        })}
      />
      <JsonLd
        data={howToSchema(
          "How to Use the Wordle Solver",
          "Enter your green, yellow, and gray letters to find every matching Wordle word.",
          HOWTO_STEPS
        )}
      />
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />

      {/* Header */}
      <header className="mb-8 text-center">
        <div className="mx-auto flex items-center justify-center gap-2">
          <Search className="h-5 w-5 text-cta" />
          <span className="text-sm font-medium text-cta">Word Finder Tool</span>
        </div>
        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {PAGE_META.h1}
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Enter the letters you know — green, yellow, and gray — and get every
          possible word, with real past Wordle answers flagged and defined.
          Works for 4 to 11 letters.
        </p>
      </header>

      {/* Solver Tool */}
      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <WordleSolver answerLookup={answerLookup} starterWords={starterWords} />
      </section>

      {/* How to Use */}
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-heading text-xl font-bold text-foreground">
          How to Use the Wordle Solver
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {HOWTO_STEPS.map((step, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-wordle-correct text-sm font-bold text-white">
                {i + 1}
              </div>
              <h3 className="font-heading font-semibold text-foreground">
                {step.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What is a solver */}
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-heading text-xl font-bold text-foreground">
          {SECTIONS.whatIs.heading}
        </h2>
        {SECTIONS.whatIs.body.map((p, i) => (
          <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
            {p}
          </p>
        ))}
        <blockquote className="mt-4 border-l-4 border-wordle-correct bg-muted/40 px-5 py-4 text-foreground">
          <p className="font-medium leading-relaxed">{SOLVER_DEFINITION}</p>
        </blockquote>
      </section>

      {/* Colors */}
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-heading text-xl font-bold text-foreground">
          {SECTIONS.colors.heading}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {SECTIONS.colors.items.map((item) => (
            <div
              key={item.color}
              className="rounded-xl border border-border bg-card p-5"
            >
              <span
                className={`inline-block h-7 w-7 rounded ${COLOR_CLASS[item.color]}`}
              />
              <h3 className="mt-3 font-heading font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          📝 {SECTIONS.colors.note}
        </p>
      </section>

      {/* Real answers */}
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-heading text-xl font-bold text-foreground">
          {SECTIONS.realAnswers.heading}
        </h2>
        {SECTIONS.realAnswers.body.map((p, i) => (
          <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
            {p}
          </p>
        ))}
        <p className="mt-3 text-sm text-muted-foreground">
          See them all in our{" "}
          <Link
            href="/wordle-answers"
            className="font-semibold text-cta hover:underline"
          >
            archive of real Wordle answers
          </Link>
          .
        </p>
      </section>

      {/* Solver vs hints vs answers */}
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-heading text-xl font-bold text-foreground">
          {SECTIONS.vsHints.heading}
        </h2>
        {SECTIONS.vsHints.body.map((p, i) => (
          <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
            {p}
          </p>
        ))}
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/60">
              <tr>
                {SECTIONS.vsHints.comparison.headers.map((h, i) => (
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
              {SECTIONS.vsHints.comparison.rows.map((row, i) => (
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
          Want less help?{" "}
          <Link
            href="/wordle-hint-today"
            className="font-semibold text-cta hover:underline"
          >
            Today&apos;s hints
          </Link>{" "}
          reveal the answer one clue at a time, or jump straight to{" "}
          <Link
            href="/todays-wordle-answer"
            className="font-semibold text-cta hover:underline"
          >
            today&apos;s answer
          </Link>
          .
        </p>
      </section>

      {/* First guess */}
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-heading text-xl font-bold text-foreground">
          {SECTIONS.firstGuess.heading}
        </h2>
        {SECTIONS.firstGuess.body.map((p, i) => (
          <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
            {p}
          </p>
        ))}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {starterWords.map((w) => (
            <WordTiles key={w} word={w} size="sm" />
          ))}
          <Link
            href="/best-wordle-starting-words"
            className="text-sm font-semibold text-cta hover:underline"
          >
            See the best starting words →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Frequently Asked Questions
        </h2>
        <div className="mt-4">
          <AnswersFAQ items={FAQ_ITEMS} />
        </div>
      </section>

      {/* Related tools */}
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Related Tools
        </h2>
        <div className="mt-4">
          <RelatedTools tools={RELATED_TOOLS} />
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
