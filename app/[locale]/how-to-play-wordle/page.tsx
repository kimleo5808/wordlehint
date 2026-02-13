import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import { breadcrumbSchema, howToSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HowToPlay" });

  return constructMetadata({
    page: "HowToPlay",
    title: t("title"),
    description: t("description"),
    keywords: [
      "how to play wordle",
      "wordle rules",
      "wordle tutorial",
      "wordle instructions",
      "wordle for beginners",
      "wordle guide",
      "wordle tips",
      "wordle strategy",
      "wordle colors meaning",
      "wordle green yellow gray",
    ],
    locale: locale as Locale,
    path: `/how-to-play-wordle`,
    canonicalUrl: `/how-to-play-wordle`,
  });
}

const STEPS = [
  {
    icon: Target,
    title: "Start with a Strong First Word",
    description:
      'Choose a starting word with common letters. Words like CRANE, SLATE, or TRACE test high-frequency letters (E, A, R, S, T) and give you the most information on your first guess.',
  },
  {
    icon: Lightbulb,
    title: "Read the Color Feedback",
    description:
      "After each guess, tiles change color. Green means the letter is correct and in the right spot. Yellow means the letter is in the word but in the wrong position. Gray means the letter is not in the word.",
  },
  {
    icon: Zap,
    title: "Eliminate and Narrow Down",
    description:
      "Use the feedback to eliminate impossible letters and reposition yellow letters. Your second guess should test new letters rather than confirming known ones.",
  },
  {
    icon: CheckCircle2,
    title: "Think About Word Patterns",
    description:
      'Common English word endings like -TION, -IGHT, -OUND, and -ANCE can help you narrow down the answer. If you have 3-4 confirmed letters, think about what words could fit.',
  },
  {
    icon: Trophy,
    title: "Solve Within 6 Guesses",
    description:
      "You have 6 attempts to guess the word. Most experienced players solve in 3-4 guesses. If you're stuck after 4 guesses, consider less common letter combinations or double letters.",
  },
];

const TIPS = [
  {
    title: "Vowel Strategy",
    content:
      "Try ADIEU or AUDIO as your first word to locate 4 vowels immediately. Once you know which vowels are present, consonant placement becomes much easier.",
  },
  {
    title: "Two-Word Opening",
    content:
      "Play CRANE then DOUBT to test 10 different high-frequency letters in just 2 guesses. By guess 3, you'll often have enough information to solve.",
  },
  {
    title: "Avoid Repeating Gray Letters",
    content:
      "Once a letter turns gray, don't use it again. This seems obvious but is a common mistake that wastes guesses.",
  },
  {
    title: "Consider Double Letters",
    content:
      "Words like HAPPY, TEETH, CHESS, and CREEK have repeated letters. If you're stuck with 4 known letters, a double might be the answer.",
  },
  {
    title: "Position Matters for Yellow",
    content:
      "A yellow letter in position 3 means that letter is in the word but NOT in position 3. Use this to eliminate positions systematically.",
  },
  {
    title: "Hard Mode Practice",
    content:
      "Even in normal mode, try forcing yourself to use all known information in every guess. This builds better habits and improves your solving speed.",
  },
];

const COLOR_EXAMPLES = [
  {
    letter: "C",
    color: "bg-wordle-correct text-white",
    label: "Green — Correct",
    meaning: "The letter C is in the word and in the correct position.",
  },
  {
    letter: "R",
    color: "bg-wordle-present text-white",
    label: "Yellow — Present",
    meaning: "The letter R is in the word but in a different position.",
  },
  {
    letter: "X",
    color: "bg-wordle-absent text-white",
    label: "Gray — Absent",
    meaning: "The letter X is not in the word at all.",
  },
];

export default async function HowToPlayWordlePage({
  params,
}: {
  params: Params;
}) {
  await params;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "How to Play Wordle", url: `${BASE_URL}/how-to-play-wordle` },
        ])}
      />
      <JsonLd
        data={howToSchema(
          "How to Play Wordle",
          "Learn how to play Wordle step by step. Understand the rules, color feedback system, and strategies to solve the puzzle in fewer guesses.",
          STEPS.map((s) => ({ name: s.title, text: s.description }))
        )}
      />

      {/* Header */}
      <header className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-white to-primary/5 p-6 sm:p-8 dark:border-primary/40 dark:from-zinc-900 dark:via-zinc-900 dark:to-primary/5">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">
              Complete Guide
            </span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            How to Play Wordle
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Learn the rules, understand the color feedback, and master the
            strategies that will help you solve Wordle in fewer guesses.
          </p>
        </div>
      </header>

      {/* The Rules */}
      <section className="rounded-2xl border border-primary/20 bg-card p-6 sm:p-8">
        <h2 className="font-heading text-2xl font-bold text-foreground">
          The Rules
        </h2>
        <p className="mt-3 text-muted-foreground">
          Wordle is simple: guess the hidden word in 6 tries or fewer. Each
          guess must be a valid English word of the correct length. After each
          guess, the game gives you color-coded feedback on every letter.
        </p>

        {/* Color explanation */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {COLOR_EXAMPLES.map((ex) => (
            <div key={ex.letter} className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg text-xl font-bold ${ex.color}`}
                >
                  {ex.letter}
                </div>
                <h3 className="text-sm font-bold text-foreground">{ex.label}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{ex.meaning}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Step by Step */}
      <section className="rounded-2xl border border-primary/20 bg-card p-6 sm:p-8">
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Step-by-Step Guide
        </h2>
        <div className="mt-6 space-y-6">
          {STEPS.map((step, i) => (
            <div key={step.title} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <step.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  <span className="text-primary">Step {i + 1}:</span>{" "}
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategy Tips */}
      <section className="rounded-2xl border border-primary/20 bg-card p-6 sm:p-8">
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Strategy Tips
        </h2>
        <p className="mt-2 text-muted-foreground">
          These tips will help you solve Wordle faster and more consistently.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {TIPS.map((tip) => (
            <div
              key={tip.title}
              className="rounded-xl border border-border bg-background p-4"
            >
              <h3 className="text-sm font-bold text-foreground">{tip.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {tip.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Word Length Guide */}
      <section className="rounded-2xl border border-primary/20 bg-card p-6 sm:p-8">
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Choose Your Word Length
        </h2>
        <p className="mt-2 text-muted-foreground">
          We offer Wordle in 8 different word lengths. Start with the classic
          5-letter format, then challenge yourself with longer words.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[4, 5, 6, 7, 8, 9, 10, 11].map((n) => (
            <Link
              key={n}
              href={`/${n}-letters`}
              className="group rounded-xl border border-border bg-background p-4 text-center transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="font-heading text-2xl font-bold text-primary">
                {n}
              </div>
              <div className="text-xs font-medium text-foreground">
                {n} Letter{n > 1 ? "s" : ""}
              </div>
              <div className="mt-1 text-[10px] text-muted-foreground">
                {n <= 5
                  ? n === 4
                    ? "Beginner"
                    : "Classic"
                  : n <= 7
                    ? "Advanced"
                    : n <= 9
                      ? "Expert"
                      : "Extreme"}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-primary p-6 text-center text-primary-foreground sm:p-8">
        <h2 className="font-heading text-2xl font-bold">
          Ready to Play?
        </h2>
        <p className="mt-2 text-sm text-primary-foreground/80">
          Put your new skills to the test with unlimited free Wordle games.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            href="/5-letters"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary transition-all hover:bg-white/90"
          >
            Play 5-Letter Wordle
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
          >
            Strategy Guides
          </Link>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
