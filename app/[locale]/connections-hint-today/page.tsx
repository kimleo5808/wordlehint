import { AnswerReveal } from "@/components/connections/AnswerReveal";
import { HintCardList } from "@/components/connections/HintCard";
import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import { getLatestPuzzle, getRecentPuzzles } from "@/lib/connections-data";
import { breadcrumbSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import dayjs from "dayjs";
import { ArrowRight, Calendar, Lightbulb } from "lucide-react";
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
  const t = await getTranslations({
    locale,
    namespace: "ConnectionsHintToday",
  });
  const puzzle = await getLatestPuzzle();
  const dateStr = puzzle
    ? dayjs(puzzle.date).format("MMMM D, YYYY")
    : "Today";

  return constructMetadata({
    page: "ConnectionsHintToday",
    title: `${t("title")} — ${dateStr}`,
    description: t("description"),
    keywords: [
      "connections hint today",
      "nyt connections hint",
      "connections answers today",
      "connections puzzle today",
      "nyt connections answers",
      "connections help today",
    ],
    locale: locale as Locale,
    path: `/connections-hint-today`,
    canonicalUrl: `/connections-hint-today`,
  });
}

export default async function ConnectionsHintTodayPage({
  params,
}: {
  params: Params;
}) {
  await params;
  const puzzle = await getLatestPuzzle();
  const recentPuzzles = await getRecentPuzzles(7);

  if (!puzzle) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="font-heading text-3xl font-bold">No Puzzle Available</h1>
        <p className="mt-4 text-muted-foreground">
          Today&apos;s puzzle hasn&apos;t been loaded yet. Check back soon!
        </p>
      </div>
    );
  }

  const formattedDate = dayjs(puzzle.date).format("MMMM D, YYYY");
  const dayOfWeek = dayjs(puzzle.date).format("dddd");

  // All words scrambled
  const allWords = [...puzzle.answers.flatMap((g) => g.members)].sort(() => 0.5 - Math.random());

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 grid-bg">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          {
            name: "Today's Hints",
            url: `${BASE_URL}/connections-hint-today`,
          },
        ])}
      />

      {/* Title */}
      <header className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4" />
          <span>{dayOfWeek}, {formattedDate}</span>
          <span className="mx-1">·</span>
          <span>Puzzle #{puzzle.id}</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Connections Hint Today
        </h1>
        <p className="mt-2 text-muted-foreground">
          Progressive hints for today&apos;s NYT Connections puzzle.
          Reveal one hint at a time to keep the challenge!
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
          {/* Hints section */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h2 className="font-heading text-xl font-bold text-foreground">
                Progressive Hints
              </h2>
            </div>
            <p className="mb-5 text-sm text-muted-foreground">
              Click each group to reveal hints one at a time. Try to solve with
              as few hints as possible!
            </p>
            <HintCardList groups={puzzle.answers} />
          </section>

          {/* Full answers */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
            <AnswerReveal puzzle={puzzle} />
          </section>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sticky top-24">
            <h3 className="font-heading text-sm font-bold text-foreground mb-3">
              Recent Puzzles
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
  return LOCALES.map((locale) => ({ locale }));
}
