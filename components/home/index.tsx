import { PuzzleCardCompact } from "@/components/connections/PuzzleCard";
import { getLatestPuzzle, getRecentPuzzles } from "@/lib/connections-data";
import dayjs from "dayjs";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Eye,
  Grid3X3,
  Lightbulb,
  Puzzle,
  Search,
  Shield,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const GROUP_COLORS = [
  { name: "Yellow", bg: "bg-yellow-400", text: "text-yellow-900", border: "border-yellow-400" },
  { name: "Green", bg: "bg-emerald-500", text: "text-white", border: "border-emerald-500" },
  { name: "Blue", bg: "bg-blue-400", text: "text-white", border: "border-blue-400" },
  { name: "Purple", bg: "bg-purple-500", text: "text-white", border: "border-purple-500" },
];

const FEATURE_ICONS = [Lightbulb, Grid3X3, Clock, Puzzle, Shield, Sparkles];

function FaqAccordionItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-xl border border-purple-100 transition-colors open:bg-purple-50/40 dark:border-purple-900/40 dark:open:bg-purple-900/10">
      <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-foreground transition-colors hover:text-purple-700 dark:hover:text-purple-400 [&::-webkit-details-marker]:hidden">
        <h3 className="text-[0.95rem] leading-snug">{question}</h3>
        <ChevronDown className="h-4 w-4 shrink-0 text-purple-400 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {answer}
        </p>
      </div>
    </details>
  );
}

export default async function HomeComponent() {
  const t = await getTranslations("HomePage");
  const latestPuzzle = await getLatestPuzzle();
  const recentPuzzles = await getRecentPuzzles(7);

  const todayDate = latestPuzzle
    ? dayjs(latestPuzzle.date).format("MMMM D, YYYY")
    : "";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="flex flex-col gap-10">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50 via-white to-violet-50 p-8 sm:p-12 shadow-md dark:from-zinc-900 dark:via-zinc-900 dark:to-purple-950/30">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-600/10" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-600/10" />

          <div className="relative text-center max-w-3xl mx-auto">
            {/* Color dots */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {GROUP_COLORS.map((color) => (
                <span key={color.name} className={`h-3 w-3 rounded-full ${color.bg}`} />
              ))}
            </div>

            {latestPuzzle && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1.5 text-xs font-bold text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                <Clock className="h-3 w-3" />
                Puzzle #{latestPuzzle.id} · {todayDate}
              </div>
            )}

            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground sm:text-xl">
              {t("hero.subtitle")}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/connections-hint-today"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-purple-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:bg-purple-700 hover:shadow-purple-500/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("hero.ctaHints")}
                  <ArrowRight className="h-4 w-4" />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
              <Link
                href="/connections-hint-archive"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-purple-200 bg-white px-6 py-3.5 text-sm font-semibold text-purple-700 transition-all hover:border-purple-300 hover:bg-purple-50 dark:border-purple-800 dark:bg-zinc-900 dark:text-purple-300 dark:hover:bg-purple-950/50"
              >
                {t("hero.ctaArchive")}
                <Search className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Today's Preview + Recent Sidebar */}
        {latestPuzzle && (
          <section className="flex flex-col gap-6 lg:flex-row">
            {/* Today's preview card */}
            <div className="flex-1 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-foreground">
                  <Eye className="h-5 w-5 text-purple-500" />
                  Today&apos;s Puzzle Preview
                </h2>
                <Link
                  href="/connections-hint-today"
                  className="text-xs font-medium text-purple-600 hover:text-purple-700 transition-colors dark:text-purple-400"
                >
                  Get Hints →
                </Link>
              </div>

              {/* Scrambled word grid */}
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {[...latestPuzzle.answers.flatMap((g) => g.members)]
                  .sort(() => 0.5 - Math.random())
                  .map((word) => (
                    <div
                      key={word}
                      className="flex items-center justify-center rounded-lg bg-zinc-100 px-1 py-3 sm:py-4 text-center font-mono text-[0.6rem] sm:text-xs font-bold uppercase tracking-wide text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                    >
                      {word}
                    </div>
                  ))}
              </div>

              <div className="mt-4 flex items-center justify-center gap-3">
                {GROUP_COLORS.map((color) => (
                  <div key={color.name} className="flex items-center gap-1">
                    <span className={`h-2 w-2 rounded-full ${color.bg}`} />
                    <span className="text-[0.65rem] text-muted-foreground">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent puzzles sidebar */}
            <div className="w-full lg:w-72 shrink-0 rounded-2xl border border-border bg-card p-4 shadow-sm">
              <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-foreground">
                <Clock className="h-4 w-4 text-purple-500" />
                {t("recentPuzzles.title")}
              </h3>
              <div className="mt-3 divide-y divide-border">
                {recentPuzzles.slice(0, 7).map((p) => (
                  <PuzzleCardCompact key={p.date} puzzle={p} />
                ))}
              </div>
              <Link
                href="/connections-hint-archive"
                className="mt-3 block text-center text-xs font-medium text-purple-600 hover:text-purple-700 transition-colors dark:text-purple-400"
              >
                {t("recentPuzzles.viewAll")}
              </Link>
            </div>
          </section>
        )}

        {/* How It Works: 4 Color Groups */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GROUP_COLORS.map((color, i) => (
            <div
              key={color.name}
              className={`rounded-2xl border-l-4 ${color.border} border-t border-r border-b border-t-border border-r-border border-b-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md`}
            >
              <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${color.bg} ${color.text} text-sm font-bold`}>
                {i + 1}
              </div>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {color.name} Group
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {i === 0 && "Straightforward — the most obvious connections"}
                {i === 1 && "Moderate — requires a bit more thought"}
                {i === 2 && "Tricky — connections are less obvious"}
                {i === 3 && "Hardest — wordplay, puns, or abstract links"}
              </p>
            </div>
          ))}
        </section>

        {/* Features Grid */}
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Why Use ConnectionsHint?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((index) => {
              const Icon = FEATURE_ICONS[index];
              return (
                <div
                  key={index}
                  className="group rounded-xl border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md dark:hover:border-purple-800"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-transform group-hover:scale-110 dark:bg-purple-900/30 dark:text-purple-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-foreground">
                    {t(`features.${index}.title`)}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {t(`features.${index}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {t("faq.title")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t("faq.description")}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <FaqAccordionItem
                key={index}
                question={t(`faqItems.${index}.question`)}
                answer={t(`faqItems.${index}.answer`)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
