import { BASE_URL } from "@/config/site";
import PuzzleCard from "@/components/wordle/PuzzleCard";
import { Locale, LOCALES } from "@/i18n/routing";
import { breadcrumbSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import {
  getAvailableMonths,
  getPuzzlesByMonth,
  getPuzzleCount,
  getTodayDateString,
} from "@/lib/wordle-daily";
import { Calendar, ChevronRight } from "lucide-react";
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
  const count = getPuzzleCount();

  return constructMetadata({
    page: "WordleHintArchive",
    title: `Wordle Hint Archive — All ${count}+ Puzzles`,
    description: `Browse all ${count}+ Wordle hints and answers. Find hints for any past Wordle puzzle, organized by month. Progressive hints for every puzzle since June 2021.`,
    keywords: [
      "wordle hint archive",
      "wordle answers",
      "past wordle answers",
      "wordle hint history",
      "all wordle puzzles",
      "wordle puzzle list",
    ],
    locale: locale as Locale,
    path: "/wordle-hint",
    canonicalUrl: "/wordle-hint",
  });
}

function formatMonth(yearMonth: string): string {
  const [year, month] = yearMonth.split("-");
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function WordleHintArchivePage() {
  const months = getAvailableMonths();
  const today = getTodayDateString();
  const totalCount = getPuzzleCount();

  // Show first 6 months expanded, rest collapsed
  const INITIAL_MONTHS = 6;

  return (
    <div className="w-full">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Wordle Hint Archive", url: `${BASE_URL}/wordle-hint` },
        ])}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Calendar className="h-4 w-4" />
            {totalCount}+ Puzzles
          </div>
          <h1 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl">
            Wordle Hint Archive
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Browse hints and answers for every Wordle puzzle since June 2021.
            Click any puzzle to see 5 progressive hints.
          </p>
          <Link
            href="/wordle-hint-today"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cta px-6 py-3 text-sm font-bold text-cta-foreground shadow-lg transition-all hover:bg-cta/90"
          >
            Today&apos;s Hint
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Archive grid */}
      <section className="py-10 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="space-y-8">
            {months.slice(0, INITIAL_MONTHS).map((month) => {
              const puzzles = getPuzzlesByMonth(month).reverse();
              return (
                <MonthSection
                  key={month}
                  month={month}
                  puzzles={puzzles}
                  today={today}
                  defaultOpen
                />
              );
            })}

            {months.length > INITIAL_MONTHS && (
              <div className="space-y-8">
                {months.slice(INITIAL_MONTHS).map((month) => {
                  const puzzles = getPuzzlesByMonth(month).reverse();
                  return (
                    <MonthSection
                      key={month}
                      month={month}
                      puzzles={puzzles}
                      today={today}
                      defaultOpen={false}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function MonthSection({
  month,
  puzzles,
  today,
  defaultOpen,
}: {
  month: string;
  puzzles: ReturnType<typeof getPuzzlesByMonth>;
  today: string;
  defaultOpen: boolean;
}) {
  return (
    <details open={defaultOpen || undefined} className="group">
      <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-muted/50 px-4 py-3 transition-colors hover:bg-muted">
        <h2 className="font-heading text-base font-bold text-foreground">
          {formatMonth(month)}
        </h2>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
            {puzzles.length} puzzles
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
        </div>
      </summary>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {puzzles.map((p) => (
          <PuzzleCard key={p.date} puzzle={p} isToday={p.date === today} />
        ))}
      </div>
    </details>
  );
}
