import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import { Link as I18nLink } from "@/i18n/routing";
import { breadcrumbSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { Search } from "lucide-react";
import { Metadata } from "next";
import WordleSolver from "@/components/wordle/WordleSolver";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    page: "WordleSolver",
    title: "Wordle Solver — Find Matching Words Instantly",
    description:
      "Free Wordle solver and word finder. Enter your green, yellow, and gray letters to get a list of possible words. Works for 4 to 11 letter Wordle games.",
    keywords: [
      "wordle solver",
      "wordle helper",
      "wordle word finder",
      "wordle cheat",
      "wordle hint tool",
      "5 letter word finder",
      "wordle answer finder",
      "wordle filter",
      "wordle clue solver",
      "word puzzle solver",
    ],
    locale: locale as Locale,
    path: "/wordle-solver",
    canonicalUrl: "/wordle-solver",
  });
}

export default async function WordleSolverPage({
  params,
}: {
  params: Params;
}) {
  await params;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Wordle Solver", url: `${BASE_URL}/wordle-solver` },
        ])}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Wordle Solver",
          url: `${BASE_URL}/wordle-solver`,
          description:
            "Free Wordle solver tool. Enter your green, yellow, and gray letters to filter possible words from 4 to 11 letters.",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }}
      />

      {/* Header */}
      <header className="mb-8 text-center">
        <div className="mx-auto flex items-center justify-center gap-2">
          <Search className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            Word Finder Tool
          </span>
        </div>
        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Wordle Solver
        </h1>
        <p className="mt-2 text-muted-foreground">
          Enter your Wordle results to find all possible matching words. Works
          for 4 to 11 letter games.
        </p>
      </header>

      {/* Solver Tool */}
      <section className="rounded-2xl border border-blue-200/70 bg-gradient-to-b from-white to-blue-50/30 p-6 sm:p-8 dark:border-blue-900/40 dark:from-zinc-900 dark:to-zinc-900">
        <WordleSolver />
      </section>

      {/* How to Use */}
      <section className="mt-10 border-t border-blue-100 pt-8 dark:border-blue-900/40">
        <h2 className="font-heading text-xl font-bold text-foreground">
          How to Use the Wordle Solver
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-blue-100 bg-card p-5 dark:border-blue-900/40">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-green-500 text-sm font-bold text-white">
              1
            </div>
            <h3 className="font-heading font-semibold text-foreground">
              Enter Letters
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Type your guessed letters into the cells. The cursor moves
              automatically to the next position.
            </p>
          </div>
          <div className="rounded-xl border border-blue-100 bg-card p-5 dark:border-blue-900/40">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500 text-sm font-bold text-white">
              2
            </div>
            <h3 className="font-heading font-semibold text-foreground">
              Set Colors
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Click each cell to cycle its color — green (correct), yellow
              (wrong spot), or gray (not in word) — matching your Wordle
              feedback.
            </p>
          </div>
          <div className="rounded-xl border border-blue-100 bg-card p-5 dark:border-blue-900/40">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-sm font-bold text-white">
              3
            </div>
            <h3 className="font-heading font-semibold text-foreground">
              Review Results
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              See all matching words instantly. Use the keyboard below to mark
              additional absent letters for more precise filtering.
            </p>
          </div>
        </div>
      </section>

      {/* Strategy Tips */}
      <section className="mt-10 border-t border-blue-100 pt-8 dark:border-blue-900/40">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Wordle Solving Strategy
        </h2>
        <div className="mt-4 space-y-4 text-muted-foreground">
          <p>
            The key to solving Wordle efficiently is <strong className="text-foreground">eliminating as many letters as possible</strong> with
            each guess. Start with a word rich in common letters like{" "}
            <strong className="text-foreground">CRANE</strong>,{" "}
            <strong className="text-foreground">SLATE</strong>, or{" "}
            <strong className="text-foreground">ADIEU</strong> to maximize
            information from your first attempt.
          </p>
          <p>
            After your first guess, use this solver to see all remaining
            possibilities. If there are too many matches, choose your next guess
            to eliminate the most common letters among the remaining candidates.
            Focus on <strong className="text-foreground">letter frequency</strong> — letters like E, A, R,
            S, T, and L appear most often in English words.
          </p>
          <p>
            Pay attention to <strong className="text-foreground">letter position patterns</strong>. Many
            5-letter words end in -IGHT, -OUND, -TION, or -ATCH. Recognizing
            these patterns helps you narrow down possibilities faster than
            letter-by-letter elimination alone.
          </p>
          <p>
            For <strong className="text-foreground">Hard Mode</strong>, where you must reuse confirmed
            hints, this solver is especially valuable. Enter all your known
            constraints after each guess, and the tool will show you only valid
            remaining words that satisfy Hard Mode rules.
          </p>
        </div>
      </section>

      {/* Related Pages */}
      <section className="mt-10 border-t border-blue-100 pt-8 dark:border-blue-900/40">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Play Wordle Games
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[5, 6, 7, 4].map((n) => (
            <I18nLink
              key={n}
              href={`/${n}-letters`}
              prefetch={false}
              className="group rounded-xl border border-blue-100 bg-card p-4 text-center transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-blue-900/40 dark:hover:border-blue-700/60"
            >
              <div className="font-heading text-2xl font-bold text-blue-600 dark:text-blue-400">
                {n}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">letters</div>
            </I18nLink>
          ))}
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
