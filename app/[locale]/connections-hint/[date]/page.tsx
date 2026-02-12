import { AnswerReveal } from "@/components/connections/AnswerReveal";
import { HintCardList } from "@/components/connections/HintCard";
import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import {
  getAllPuzzles,
  getPuzzleByDate,
  getRecentPuzzles,
} from "@/lib/connections-data";
import { articleSchema, breadcrumbSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import dayjs from "dayjs";
import { ArrowLeft, ArrowRight, Calendar, Lightbulb } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ locale: string; date: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, date } = await params;
  const puzzle = await getPuzzleByDate(date);
  if (!puzzle) return {};

  const formattedDate = dayjs(date).format("MMMM D, YYYY");

  return constructMetadata({
    page: "Daily",
    title: `Connections Hint ${formattedDate} — Puzzle #${puzzle.id}`,
    description: `Hints and answers for NYT Connections puzzle #${puzzle.id} on ${formattedDate}. Progressive hints to help you solve today's puzzle.`,
    keywords: [
      `connections hint ${date}`,
      `connections answers ${formattedDate}`,
      `nyt connections ${formattedDate}`,
      "connections puzzle answers",
    ],
    locale: locale as Locale,
    path: `/connections-hint/${date}`,
    canonicalUrl: `/connections-hint/${date}`,
  });
}

export default async function DailyPuzzlePage({
  params,
}: {
  params: Params;
}) {
  const { date } = await params;
  const puzzle = await getPuzzleByDate(date);

  if (!puzzle) {
    notFound();
  }

  const allPuzzles = await getAllPuzzles();
  const currentIndex = allPuzzles.findIndex((p) => p.date === date);
  const prevPuzzle = currentIndex < allPuzzles.length - 1 ? allPuzzles[currentIndex + 1] : null;
  const nextPuzzle = currentIndex > 0 ? allPuzzles[currentIndex - 1] : null;
  const recentPuzzles = await getRecentPuzzles(7);

  const formattedDate = dayjs(puzzle.date).format("MMMM D, YYYY");
  const dayOfWeek = dayjs(puzzle.date).format("dddd");

  // All words scrambled
  const allWords = [...puzzle.answers.flatMap((g) => g.members)].sort(() => 0.5 - Math.random());

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 grid-bg">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Archive", url: `${BASE_URL}/connections-hint-archive` },
          {
            name: formattedDate,
            url: `${BASE_URL}/connections-hint/${date}`,
          },
        ])}
      />
      <JsonLd
        data={articleSchema({
          title: `Connections Hint ${formattedDate} — Puzzle #${puzzle.id}`,
          description: `Hints and answers for NYT Connections puzzle #${puzzle.id} on ${formattedDate}.`,
          url: `${BASE_URL}/connections-hint/${date}`,
          datePublished: puzzle.date,
          dateModified: puzzle.date,
        })}
      />

      {/* Navigation */}
      <nav className="flex items-center justify-between mb-6">
        {prevPuzzle ? (
          <Link
            href={`/connections-hint/${prevPuzzle.date}`}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Link>
        ) : (
          <span />
        )}
        {nextPuzzle ? (
          <Link
            href={`/connections-hint/${nextPuzzle.date}`}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-600 transition-colors"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <span />
        )}
      </nav>

      {/* Title */}
      <header className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4" />
          <span>{dayOfWeek}, {formattedDate}</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Connections #{puzzle.id} Answer & Analysis
        </h1>
        <p className="mt-2 text-muted-foreground">
          ({formattedDate})
        </p>
      </header>

      {/* Blue banner with word chips */}
      <section className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-8 mb-8">
        <h2 className="text-center font-heading text-lg font-bold text-white mb-4">
          Today&apos;s 16 Words
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {allWords.map((word) => (
            <span
              key={word}
              className="rounded-lg bg-blue-600/20 border border-blue-500/30 px-4 py-2 text-sm font-mono font-bold text-blue-200 uppercase tracking-wide"
            >
              {word}
            </span>
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main content */}
        <div className="flex-1 space-y-6">
          {/* Full answers reveal */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
            <AnswerReveal puzzle={puzzle} />
          </section>

          {/* Hints section */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h2 className="font-heading text-xl font-bold text-foreground">
                Progressive Hints
              </h2>
            </div>
            <HintCardList groups={puzzle.answers} />
          </section>

          {/* Prev/Next navigation */}
          <nav className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            {prevPuzzle ? (
              <Link
                href={`/connections-hint/${prevPuzzle.date}`}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>#{prevPuzzle.id} — {dayjs(prevPuzzle.date).format("MMM D")}</span>
              </Link>
            ) : (
              <span />
            )}
            {nextPuzzle ? (
              <Link
                href={`/connections-hint/${nextPuzzle.date}`}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-blue-600 transition-colors"
              >
                <span>#{nextPuzzle.id} — {dayjs(nextPuzzle.date).format("MMM D")}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sticky top-24">
            <h3 className="font-heading text-sm font-bold text-foreground mb-3">
              Recent Connections Answers
            </h3>
            <div className="space-y-2">
              {recentPuzzles
                .filter((p) => p.date !== puzzle.date)
                .slice(0, 6)
                .map((p) => (
                  <Link
                    key={p.date}
                    href={`/connections-hint/${p.date}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-blue-50 dark:hover:bg-blue-950/20"
                  >
                    <span className="font-medium text-foreground">
                      #{p.id} — {dayjs(p.date).format("MMM D")}
                    </span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  </Link>
                ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const allPuzzles = await getAllPuzzles();
  const params: { locale: string; date: string }[] = [];

  for (const locale of LOCALES) {
    for (const puzzle of allPuzzles.slice(0, 60)) {
      params.push({ locale, date: puzzle.date });
    }
  }

  return params;
}
