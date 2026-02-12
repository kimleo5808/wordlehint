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
import { ArrowRight } from "lucide-react";
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
  const totalCount = await getPuzzleCount();

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
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 grid-bg">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Archive", url: `${BASE_URL}/connections-hint-archive` },
        ])}
      />

      {/* Header */}
      <header className="text-center py-6">
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          All Connections Answers (Updated Daily)
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Browse all {totalCount} NYT Connections puzzles with answers, hints, and group themes. Updated daily with the latest puzzle.
        </p>
      </header>

      {/* Puzzles by month */}
      <div className="mt-8 space-y-12">
        {months.map((month) => {
          const puzzles = puzzlesByMonth.get(month) || [];
          const monthLabel = dayjs(`${month}-01`).format("MMMM YYYY");
          const firstId = puzzles[puzzles.length - 1]?.id;
          const lastId = puzzles[0]?.id;

          return (
            <section key={month}>
              <h2 className="mb-5 font-heading text-lg font-bold text-foreground">
                Connections #{firstId}-{lastId} Answers ({monthLabel})
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {puzzles.map((puzzle) => {
                  const sorted = [...puzzle.answers].sort((a, b) => a.level - b.level);
                  return (
                    <Link
                      key={puzzle.date}
                      href={`/connections-hint/${puzzle.date}`}
                      className="group rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-700"
                    >
                      <div className="flex items-center justify-between">
                        <span className="inline-block rounded-md bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                          Puzzle #{puzzle.id}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {dayjs(puzzle.date).format("MMM D, YYYY")}
                        </span>
                      </div>
                      <h3 className="mt-3 text-sm font-bold text-foreground">
                        Connections #{puzzle.id} Answer & Hints
                      </h3>
                      <div className="mt-2 space-y-1">
                        {sorted.slice(0, 2).map((g) => (
                          <p key={g.level} className="truncate text-xs text-muted-foreground">
                            {g.members.join(", ")}
                          </p>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:text-blue-700 dark:text-blue-400">
                        Read Analysis
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center py-8">
        <Link
          href="/connections-hint-today"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-blue-700"
        >
          Get Today&apos;s Hints
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
