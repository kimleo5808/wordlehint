import { BASE_URL } from "@/config/site";
import AnswerDefinition from "@/components/wordle/AnswerDefinition";
import DailyAnswerReveal from "@/components/wordle/DailyAnswerReveal";
import DailyCountdown from "@/components/wordle/DailyCountdown";
import DailyHintCard from "@/components/wordle/DailyHintCard";
import DifficultyRatingCard from "@/components/wordle/DifficultyRating";
import PuzzleCard from "@/components/wordle/PuzzleCard";
import WordleFAQ, { WORDLE_FAQ_ITEMS } from "@/components/wordle/WordleFAQ";
import WordleStrategyContent from "@/components/wordle/WordleStrategyContent";
import YesterdayRecap from "@/components/wordle/YesterdayRecap";
import { Locale, LOCALES } from "@/i18n/routing";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  JsonLd,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import {
  getTodayPuzzle,
  getYesterdayPuzzle,
  getRecentPuzzles,
  getTodayDateString,
} from "@/lib/wordle-daily";
import { generateHints } from "@/lib/wordle-hints";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { Metadata } from "next";
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
  const puzzle = getTodayPuzzle();
  const dateStr = getTodayDateString();

  return constructMetadata({
    page: "WordleHintToday",
    title: `Wordle Hint Today — ${dateStr} (Puzzle #${puzzle?.id ?? "?"})`,
    description: `Get today's Wordle hint for ${dateStr}. 5 progressive clues to help you solve Wordle #${puzzle?.id ?? "?"} without spoiling the answer. Reveal hints one at a time.`,
    keywords: [
      "wordle hint today",
      "wordle hint",
      "wordle clue today",
      "wordle answer today",
      "today wordle hint",
      "wordle help today",
      "daily wordle hint",
      `wordle ${dateStr}`,
      `wordle hint ${dateStr}`,
    ],
    locale: locale as Locale,
    path: "/wordle-hint-today",
    canonicalUrl: "/wordle-hint-today",
  });
}

export default function WordleHintTodayPage() {
  const puzzle = getTodayPuzzle();
  const yesterday = getYesterdayPuzzle();
  const today = getTodayDateString();
  const recentPuzzles = getRecentPuzzles(8);

  if (!puzzle) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Today&apos;s Wordle Hint
        </h1>
        <p className="mt-4 text-muted-foreground">
          No puzzle data available for today ({today}). Check back soon!
        </p>
        <Link
          href="/wordle-hint"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
        >
          Browse hint archive
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const hints = generateHints(puzzle);

  const formattedDate = new Date(
    puzzle.date + "T12:00:00Z"
  ).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="w-full">
      {/* Schema.org — Breadcrumb */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          {
            name: "Today's Wordle Hint",
            url: `${BASE_URL}/wordle-hint-today`,
          },
        ])}
      />
      {/* Schema.org — NewsArticle */}
      <JsonLd
        data={articleSchema({
          title: `Wordle Hint Today — ${formattedDate} (Puzzle #${puzzle.id})`,
          description: `5 progressive hints for Wordle #${puzzle.id} on ${formattedDate}. Reveal clues one at a time to solve today's NYT Wordle puzzle.`,
          url: `${BASE_URL}/wordle-hint-today`,
          datePublished: `${puzzle.date}T05:00:00Z`,
          dateModified: `${puzzle.date}T05:00:00Z`,
        })}
      />
      {/* Schema.org — FAQPage */}
      <JsonLd data={faqPageSchema(WORDLE_FAQ_ITEMS.slice(0, 10))} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Daily Wordle Hint
          </div>
          <h1 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Wordle Hint Today — {formattedDate}
          </h1>
          <div className="mt-3 flex items-center justify-center gap-3 text-slate-300">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">Puzzle #{puzzle.id}</span>
            <span className="text-slate-500">|</span>
            <span className="text-sm font-medium">5 Progressive Hints</span>
          </div>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Stuck on today&apos;s Wordle? Reveal hints one at a time — from a
            broad category clue down to the letter pattern. Use as few hints as
            possible to keep the challenge alive!
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-10 bg-background">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="space-y-6">
            {/* Hints */}
            <DailyHintCard hints={hints} />

            {/* Answer reveal */}
            <DailyAnswerReveal answer={puzzle.answer} />

            {/* Definition & Etymology */}
            <AnswerDefinition word={puzzle.answer} />

            {/* Difficulty Rating */}
            <DifficultyRatingCard word={puzzle.answer} />

            {/* Yesterday Recap */}
            <YesterdayRecap puzzle={yesterday ?? null} />

            {/* Countdown */}
            <DailyCountdown />

            {/* Play the game CTA */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-center">
              <Lightbulb className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-2 text-sm font-medium text-foreground">
                Want to practice? Play unlimited Wordle games for free!
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/5-letters"
                  className="inline-flex items-center gap-2 rounded-lg bg-cta px-5 py-2.5 text-sm font-bold text-cta-foreground shadow-md transition-all hover:bg-cta/90"
                >
                  Play 5-Letter Wordle
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/wordle-solver"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted"
                >
                  Try Wordle Solver
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent puzzles */}
      <section className="border-t border-border bg-muted/30 py-10">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-foreground">
              Recent Wordle Puzzles
            </h2>
            <Link
              href="/wordle-hint"
              className="text-sm font-medium text-primary hover:text-primary/80"
            >
              View All →
            </Link>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {recentPuzzles
              .filter((p) => p.date !== puzzle.date)
              .slice(0, 6)
              .map((p) => (
                <PuzzleCard key={p.date} puzzle={p} />
              ))}
          </div>
        </div>
      </section>

      {/* Strategy Content (evergreen) */}
      <WordleStrategyContent />

      {/* FAQ (evergreen, 10 items) */}
      <WordleFAQ maxItems={10} />

      {/* SEO content — How Our Hints Work */}
      <section className="border-t border-border bg-background py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-heading text-xl font-bold text-foreground">
            How Our Daily Wordle Hints Work
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Every day, we publish 5 progressive hints for the current NYT
              Wordle puzzle. Our system is designed to give you exactly the right
              amount of help — no more, no less. Start with Hint 1 (a broad
              category clue) and only reveal more if you&apos;re truly stuck.
              Most experienced players solve with just 1-2 hints.
            </p>
            <p>
              Unlike other hint sites that spoil the answer immediately, our
              click-to-reveal system ensures you never see information you
              didn&apos;t ask for. The answer itself is always hidden behind a
              clearly marked spoiler button — you&apos;re always in control.
            </p>
            <p>
              Looking for hints from previous days? Browse our{" "}
              <Link
                href="/wordle-hint"
                className="font-medium text-primary hover:text-primary/80"
              >
                complete hint archive
              </Link>{" "}
              with every past puzzle, or check our{" "}
              <Link
                href="/how-to-play-wordle"
                className="font-medium text-primary hover:text-primary/80"
              >
                How to Play Wordle
              </Link>{" "}
              guide for general strategy tips and best starting words.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
