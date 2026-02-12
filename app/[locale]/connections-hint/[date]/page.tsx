import { AnswerReveal } from "@/components/connections/AnswerReveal";
import { HintCardList } from "@/components/connections/HintCard";
import { PuzzleCardCompact } from "@/components/connections/PuzzleCard";
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
import { ArrowLeft, ArrowRight, Calendar, Clock, Lightbulb } from "lucide-react";
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

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
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

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main content */}
        <div className="flex-1 space-y-6">
          {/* Navigation */}
          <nav className="flex items-center justify-between">
            {prevPuzzle ? (
              <Link
                href={`/connections-hint/${prevPuzzle.date}`}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-purple-600 transition-colors"
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
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-purple-600 transition-colors"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <span />
            )}
          </nav>

          {/* Header */}
          <header className="relative overflow-hidden rounded-2xl border border-purple-200/70 bg-gradient-to-br from-purple-50 via-white to-violet-50 p-6 sm:p-8 dark:border-purple-900/40 dark:from-zinc-900 dark:via-zinc-900 dark:to-purple-950/30">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-200/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-violet-200/30 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {dayOfWeek}, {formattedDate}
                </span>
                <span className="mx-1">·</span>
                <span>Puzzle #{puzzle.id}</span>
              </div>
              <h1 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                Connections Hint — {formattedDate}
              </h1>
              <p className="mt-2 text-muted-foreground">
                Hints and answers for NYT Connections puzzle #{puzzle.id}.
              </p>
            </div>
          </header>

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

          {/* Full answers */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
            <AnswerReveal puzzle={puzzle} />
          </section>

          {/* Prev/Next navigation */}
          <nav className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            {prevPuzzle ? (
              <Link
                href={`/connections-hint/${prevPuzzle.date}`}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-purple-600 transition-colors"
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
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-purple-600 transition-colors"
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
            <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-foreground">
              <Clock className="h-4 w-4 text-purple-500" />
              Recent Puzzles
            </h3>
            <div className="mt-3 divide-y divide-border">
              {recentPuzzles
                .filter((p) => p.date !== puzzle.date)
                .slice(0, 6)
                .map((p) => (
                  <PuzzleCardCompact key={p.date} puzzle={p} />
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
    // Generate pages for recent 60 days to avoid too many static pages
    for (const puzzle of allPuzzles.slice(0, 60)) {
      params.push({ locale, date: puzzle.date });
    }
  }

  return params;
}
