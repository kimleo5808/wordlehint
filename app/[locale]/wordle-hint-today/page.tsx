import { BASE_URL } from "@/config/site";
import DailyAnswerReveal from "@/components/wordle/DailyAnswerReveal";
import DailyCountdown from "@/components/wordle/DailyCountdown";
import DailyHintCard from "@/components/wordle/DailyHintCard";
import PuzzleCard from "@/components/wordle/PuzzleCard";
import { Locale, LOCALES } from "@/i18n/routing";
import { breadcrumbSchema, faqPageSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import {
  getTodayPuzzle,
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

  const formattedDate = new Date(puzzle.date + "T12:00:00Z").toLocaleDateString(
    "en-US",
    { weekday: "long", month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <div className="w-full">
      {/* Schema.org */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          {
            name: "Today's Wordle Hint",
            url: `${BASE_URL}/wordle-hint-today`,
          },
        ])}
      />
      <JsonLd
        data={faqPageSchema([
          {
            question: `What is the Wordle hint for ${formattedDate}?`,
            answer: `We provide 5 progressive hints for Wordle #${puzzle.id}. Start with a category clue, then reveal vowel info, first letter, last letter, and finally a letter pattern. Use as few hints as you need!`,
          },
          {
            question: "How do Wordle hints work?",
            answer:
              "Our hint system gives you 5 levels of progressive clues. Each hint reveals a little more about the answer. Try to solve it with as few hints as possible for the best challenge.",
          },
        ])}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Daily Wordle Hint
          </div>
          <h1 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Wordle Hint Today
          </h1>
          <div className="mt-3 flex items-center justify-center gap-3 text-slate-300">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">{formattedDate}</span>
            <span className="text-slate-500">|</span>
            <span className="text-sm font-medium">Puzzle #{puzzle.id}</span>
          </div>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Reveal hints one at a time to help you solve today&apos;s Wordle.
            Try to use as few hints as possible!
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

            {/* Countdown */}
            <DailyCountdown />

            {/* Play the game CTA */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-center">
              <Lightbulb className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-2 text-sm font-medium text-foreground">
                Want to practice? Play unlimited Wordle games for free!
              </p>
              <Link
                href="/5-letters"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-cta px-5 py-2.5 text-sm font-bold text-cta-foreground shadow-md transition-all hover:bg-cta/90"
              >
                Play 5-Letter Wordle
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent puzzles */}
      <section className="border-t border-border bg-muted/30 py-10">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-foreground">
              Recent Puzzles
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

      {/* SEO content */}
      <section className="border-t border-border bg-background py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-heading text-xl font-bold text-foreground">
            About Today&apos;s Wordle Hint
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Every day, we provide 5 progressive hints for the daily NYT Wordle
            puzzle. Our hint system is designed to give you just enough
            information to solve the puzzle without completely spoiling the
            answer. Start with a category clue, then gradually reveal more
            specific information like vowel count, first letter, last letter,
            and finally a letter pattern.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Tip:</strong> Try to solve the
            puzzle using only the first hint or two. The more hints you use, the
            easier it gets — but the real satisfaction comes from solving with
            minimal help. If you&apos;re stuck, check our{" "}
            <Link
              href="/how-to-play-wordle"
              className="font-medium text-primary hover:text-primary/80"
            >
              How to Play Wordle
            </Link>{" "}
            guide for general strategy tips.
          </p>
        </div>
      </section>
    </div>
  );
}
