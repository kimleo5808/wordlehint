import { AnswerReveal } from "@/components/connections/AnswerReveal";
import { HintCardList } from "@/components/connections/HintCard";
import { PuzzleCardCompact } from "@/components/connections/PuzzleCard";
import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import { getLatestPuzzle, getRecentPuzzles } from "@/lib/connections-data";
import { breadcrumbSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import dayjs from "dayjs";
import { Calendar, Clock, Lightbulb } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          {
            name: "Today's Hints",
            url: `${BASE_URL}/connections-hint-today`,
          },
        ])}
      />

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main content */}
        <div className="flex-1 space-y-6">
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
                Connections Hint Today
              </h1>
              <p className="mt-2 text-muted-foreground">
                Progressive hints for today&apos;s NYT Connections puzzle.
                Reveal one hint at a time to keep the challenge!
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
  return LOCALES.map((locale) => ({ locale }));
}
