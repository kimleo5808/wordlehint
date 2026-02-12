import { PuzzleCard } from "@/components/connections/PuzzleCard";
import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import {
  getAllPuzzles,
  getAvailableMonths,
  getPuzzleCount,
} from "@/lib/connections-data";
import { breadcrumbSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import dayjs from "dayjs";
import { Archive, Calendar } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Archive" });
  const count = await getPuzzleCount();

  return constructMetadata({
    page: "Archive",
    title: t("title"),
    description: `Browse all ${count} NYT Connections puzzles with hints and answers. ${t("description")}`,
    keywords: [
      "connections hint archive",
      "nyt connections archive",
      "connections answers archive",
      "connections puzzle history",
      "past connections puzzles",
    ],
    locale: locale as Locale,
    path: `/connections-hint-archive`,
    canonicalUrl: `/connections-hint-archive`,
  });
}

export default async function ArchivePage({ params }: { params: Params }) {
  await params;
  const allPuzzles = await getAllPuzzles();
  const months = await getAvailableMonths();

  // Group puzzles by month
  const puzzlesByMonth = new Map<string, typeof allPuzzles>();
  for (const puzzle of allPuzzles) {
    const month = puzzle.date.slice(0, 7);
    if (!puzzlesByMonth.has(month)) {
      puzzlesByMonth.set(month, []);
    }
    puzzlesByMonth.get(month)!.push(puzzle);
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Archive", url: `${BASE_URL}/connections-hint-archive` },
        ])}
      />

      {/* Header */}
      <header className="relative overflow-hidden rounded-2xl border border-purple-200/70 bg-gradient-to-br from-purple-50 via-white to-violet-50 p-6 sm:p-8 dark:border-purple-900/40 dark:from-zinc-900 dark:via-zinc-900 dark:to-purple-950/30">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2">
            <Archive className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              {allPuzzles.length} Puzzles
            </span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Connections Puzzle Archive
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse every NYT Connections puzzle with hints and answers.
          </p>
        </div>
      </header>

      {/* Puzzles by month */}
      <div className="mt-8 space-y-10">
        {months.map((month) => {
          const puzzles = puzzlesByMonth.get(month) || [];
          const monthLabel = dayjs(`${month}-01`).format("MMMM YYYY");

          return (
            <section key={month}>
              <h2 className="flex items-center gap-2 mb-4 font-heading text-lg font-bold text-foreground">
                <Calendar className="h-4 w-4 text-purple-500" />
                {monthLabel}
                <span className="ml-1 text-sm font-normal text-muted-foreground">
                  ({puzzles.length})
                </span>
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {puzzles.map((puzzle) => (
                  <PuzzleCard key={puzzle.date} puzzle={puzzle} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
