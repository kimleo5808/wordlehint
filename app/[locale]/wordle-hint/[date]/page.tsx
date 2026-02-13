import { BASE_URL } from "@/config/site";
import AnswerDefinition from "@/components/wordle/AnswerDefinition";
import DailyAnswerReveal from "@/components/wordle/DailyAnswerReveal";
import DailyHintCard from "@/components/wordle/DailyHintCard";
import DifficultyRatingCard from "@/components/wordle/DifficultyRating";
import PuzzleCard from "@/components/wordle/PuzzleCard";
import WordleFAQ, { WORDLE_FAQ_ITEMS } from "@/components/wordle/WordleFAQ";
import WordleStrategyContent from "@/components/wordle/WordleStrategyContent";
import { Locale, LOCALES } from "@/i18n/routing";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  JsonLd,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import {
  getAllPuzzles,
  getPuzzleByDate,
  getTodayDateString,
} from "@/lib/wordle-daily";
import { generateHints } from "@/lib/wordle-hints";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ locale: string; date: string }>;

export async function generateStaticParams() {
  const puzzles = getAllPuzzles();
  const params: { locale: string; date: string }[] = [];
  for (const locale of LOCALES) {
    for (const p of puzzles) {
      params.push({ locale, date: p.date });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, date } = await params;
  const puzzle = getPuzzleByDate(date);

  if (!puzzle) return {};

  const formattedDate = new Date(date + "T12:00:00Z").toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );

  return constructMetadata({
    page: "WordleHintDate",
    title: `Wordle Hint for ${formattedDate} — Puzzle #${puzzle.id}`,
    description: `Wordle hints and answer for ${formattedDate} (Puzzle #${puzzle.id}). 5 progressive clues, word definition, difficulty rating, and strategy tips.`,
    keywords: [
      `wordle hint ${date}`,
      `wordle ${formattedDate}`,
      `wordle #${puzzle.id}`,
      "wordle hint",
      "wordle answer",
      "wordle clue",
    ],
    locale: locale as Locale,
    path: `/wordle-hint/${date}`,
    canonicalUrl: `/wordle-hint/${date}`,
  });
}

export default async function WordleHintDatePage({
  params,
}: {
  params: Params;
}) {
  const { date } = await params;
  const puzzle = getPuzzleByDate(date);

  if (!puzzle) notFound();

  const hints = generateHints(puzzle);
  const today = getTodayDateString();
  const isToday = puzzle.date === today;

  const allPuzzles = getAllPuzzles();
  const currentIdx = allPuzzles.findIndex((p) => p.date === date);
  const prevPuzzle = currentIdx > 0 ? allPuzzles[currentIdx - 1] : null;
  const nextPuzzle =
    currentIdx < allPuzzles.length - 1 ? allPuzzles[currentIdx + 1] : null;

  // Nearby puzzles (exclude current)
  const nearby = allPuzzles
    .slice(Math.max(0, currentIdx - 3), currentIdx + 4)
    .filter((p) => p.date !== date);

  const formattedDate = new Date(date + "T12:00:00Z").toLocaleDateString(
    "en-US",
    { weekday: "long", month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <div className="w-full">
      {/* Schema.org — Breadcrumb */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Wordle Hints", url: `${BASE_URL}/wordle-hint` },
          {
            name: `Puzzle #${puzzle.id}`,
            url: `${BASE_URL}/wordle-hint/${date}`,
          },
        ])}
      />
      {/* Schema.org — NewsArticle */}
      <JsonLd
        data={articleSchema({
          title: `Wordle Hint for ${formattedDate} — Puzzle #${puzzle.id}`,
          description: `5 progressive hints for Wordle #${puzzle.id} on ${formattedDate}. Includes word definition, difficulty rating, and solving tips.`,
          url: `${BASE_URL}/wordle-hint/${date}`,
          datePublished: `${puzzle.date}T05:00:00Z`,
          dateModified: `${puzzle.date}T05:00:00Z`,
        })}
      />
      {/* Schema.org — FAQPage */}
      <JsonLd data={faqPageSchema(WORDLE_FAQ_ITEMS.slice(0, 5))} />

      {/* Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          {isToday && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-500/10 border border-green-500/20 px-4 py-1.5 text-sm font-medium text-green-400">
              Today&apos;s Puzzle
            </div>
          )}
          <h1 className="font-heading text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Wordle Hint for {formattedDate}
          </h1>
          <div className="mt-2 flex items-center justify-center gap-2 text-slate-300">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Puzzle #{puzzle.id}</span>
            <span className="text-slate-500">|</span>
            <span className="text-sm">5 Progressive Hints</span>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3 sm:px-6">
          {prevPuzzle ? (
            <Link
              href={`/wordle-hint/${prevPuzzle.date}`}
              className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
            >
              <ChevronLeft className="h-4 w-4" />
              #{prevPuzzle.id}
            </Link>
          ) : (
            <div />
          )}
          <Link
            href="/wordle-hint"
            className="text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            All Puzzles
          </Link>
          {nextPuzzle ? (
            <Link
              href={`/wordle-hint/${nextPuzzle.date}`}
              className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
            >
              #{nextPuzzle.id}
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Content */}
      <section className="py-10 bg-background">
        <div className="mx-auto max-w-2xl space-y-6 px-4 sm:px-6">
          <DailyHintCard hints={hints} />
          <DailyAnswerReveal answer={puzzle.answer} />

          {/* Definition & Etymology */}
          <AnswerDefinition word={puzzle.answer} />

          {/* Difficulty Rating */}
          <DifficultyRatingCard word={puzzle.answer} />
        </div>
      </section>

      {/* Nearby puzzles */}
      {nearby.length > 0 && (
        <section className="border-t border-border bg-muted/30 py-10">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <h2 className="font-heading text-lg font-bold text-foreground">
              Nearby Puzzles
            </h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {nearby.map((p) => (
                <PuzzleCard
                  key={p.date}
                  puzzle={p}
                  isToday={p.date === today}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Strategy Content (evergreen, shared component) */}
      <WordleStrategyContent />

      {/* FAQ (evergreen, 5 items for archive pages) */}
      <WordleFAQ maxItems={5} />
    </div>
  );
}
