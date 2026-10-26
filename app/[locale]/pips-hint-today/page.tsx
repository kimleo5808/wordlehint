import { BASE_URL } from "@/config/site";
import DateFaq from "@/components/date-pages/DateFaq";
import PipsHintLadder from "@/components/pips/PipsHintLadder";
import { NYT_PIPS_HELP, PIPS_RULES, PIPS_TODAY_FAQ } from "@/data/pips/content";
import { Locale, LOCALES } from "@/i18n/routing";
import { formatLongDate, hasPipsDatePage } from "@/lib/date-pages";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  howToSchema,
  JsonLd,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { getTodayPips, getYesterdayPips } from "@/lib/pips-daily";
import { getPipsHints } from "@/lib/pips-hints";
import { getTodayDateString } from "@/lib/wordle-daily";
import type { PipsDifficulty } from "@/types/pips";
import { ChevronRight, Dices } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

type Params = Promise<{ locale: string }>;

const PAGE_PATH = "/pips-hint-today";
const LEVELS: PipsDifficulty[] = ["easy", "medium", "hard"];

const HOWTO_STEPS = [
  { name: "Pick a difficulty", text: "Choose Easy, Medium or Hard. Hard is open by default." },
  { name: "Find the starting square", text: "Step 1 highlights a square the rules alone decide." },
  { name: "Place the first domino", text: "Step 2 shows which domino covers that square." },
  { name: "Get half the board", text: "Step 3 places half the dominoes, tightest regions first." },
  { name: "Check the solution", text: "Step 4 shows NYT's full solution, also as text." },
];

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const puzzle = getTodayPips();
  const date = getTodayDateString();
  return constructMetadata({
    page: "PipsHintToday",
    title: `NYT Pips Hints Today — ${formatLongDate(date).replace(/^\w+, /, "")}${puzzle ? ` (#${puzzle.id})` : ""}`,
    description:
      "Step-by-step hints for today's NYT Pips — Easy, Medium and Hard: a starting square the rules decide, then the first domino, half the board, and the full solution.",
    keywords: [
      "pips hints today",
      "nyt pips answer today",
      "pips hard solution",
      "pips hints",
      "nyt pips",
    ],
    locale: locale as Locale,
    path: PAGE_PATH,
    canonicalUrl: PAGE_PATH,
    images: ["og/pips-hint-today.png"],
  });
}

export default function PipsHintTodayPage() {
  const puzzle = getTodayPips();
  const today = getTodayDateString();
  const yesterday = getYesterdayPips();
  const pageUrl = `${BASE_URL}${PAGE_PATH}`;

  if (!puzzle) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground">NYT Pips Hints Today</h1>
        <p className="mt-4 text-muted-foreground">
          Today&apos;s Pips ({today}) isn&apos;t available just yet — it publishes
          automatically once the new puzzle goes live.
        </p>
        <Link
          href="/pips-answers"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cta px-5 py-2.5 text-sm font-bold text-cta-foreground"
        >
          Past Pips answers
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const longDate = formatLongDate(puzzle.date);
  const boards = LEVELS.map((difficulty) => ({
    difficulty,
    board: puzzle[difficulty],
    steps: getPipsHints(puzzle[difficulty]),
  }));

  return (
    <div className="w-full">
      <JsonLd
        data={articleSchema({
          title: `NYT Pips Hints Today — ${longDate} (#${puzzle.id})`,
          description: "Step-by-step hints and the full solution for today's NYT Pips, Easy to Hard.",
          url: pageUrl,
          datePublished: `${puzzle.date}T06:00:00Z`,
          dateModified: `${puzzle.date}T06:00:00Z`,
        })}
      />
      <JsonLd data={howToSchema("How to Use These Pips Hints", "Reveal today's NYT Pips one step at a time.", HOWTO_STEPS)} />
      <JsonLd data={faqPageSchema(PIPS_TODAY_FAQ)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Pips Hints Today", url: pageUrl },
        ])}
      />

      <section className="border-b border-border bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Dices className="h-4 w-4" />
            Spoiler-safe · revealed step by step
          </div>
          <h1 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl">
            NYT Pips Hints Today — {longDate}
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Stuck on today&apos;s Pips (#{puzzle.id})? Each difficulty has four
            steps: a square the rules decide for you, the first domino, half the
            board, then the full solution. Open only what you need.
          </p>
          <p className="mt-4 font-mono text-xs text-slate-400">
            Updated <time dateTime={puzzle.date}>{longDate}</time> · Puzzle data from NYT Games
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
            <Link href="/pips-answers" className="text-sm font-semibold text-primary hover:text-primary/80">
              Past Pips answers →
            </Link>
            <Link href="/how-to-play-pips" className="text-sm font-semibold text-primary hover:text-primary/80">
              How to play Pips →
            </Link>
            {hasPipsDatePage(puzzle.date) && (
              <Link href={`/pips-answers/${puzzle.date}`} className="text-sm font-semibold text-primary hover:text-primary/80">
                #{puzzle.id} answer page →
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <section aria-labelledby="boards-heading">
          <h2 id="boards-heading" className="font-heading text-2xl font-bold text-foreground">
            Today&apos;s Boards and Step-by-Step Hints
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick a difficulty, then reveal one step at a time.
          </p>
          <div className="mt-5">
            <PipsHintLadder boards={boards} date={puzzle.date} initialStage={0} />
          </div>
        </section>

        <section className="mt-14 max-w-3xl" aria-labelledby="rules-heading">
          <h2 id="rules-heading" className="font-heading text-2xl font-bold text-foreground">
            How the Pips Rules Work
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Place every domino so that each coloured region meets its condition.
            The badge in a region&apos;s corner tells you which one (wording from{" "}
            <a href={NYT_PIPS_HELP} target="_blank" rel="noopener" className="underline hover:text-foreground">
              NYT&apos;s Pips help page
            </a>
            ):
          </p>
          <dl className="mt-4 divide-y divide-dashed divide-border rounded-2xl border border-border bg-card">
            {PIPS_RULES.map((r) => (
              <div key={r.name} className="flex items-start gap-4 px-4 py-3">
                <dt className="flex w-24 shrink-0 items-center gap-2">
                  <span className="inline-flex h-6 min-w-[1.75rem] items-center justify-center rounded-md border border-border bg-background px-1 font-mono text-xs font-bold">
                    {r.symbol || "–"}
                  </span>
                  <span className="text-xs font-semibold text-foreground">{r.name}</span>
                </dt>
                <dd className="text-sm text-muted-foreground">{r.rule}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm text-muted-foreground">
            Diagrams for every region type and seven data-backed strategies:{" "}
            <Link href="/how-to-play-pips" className="font-semibold text-primary hover:text-primary/80">
              how to play Pips →
            </Link>
          </p>
        </section>

        {yesterday && (
          <section className="mt-14 max-w-3xl" aria-labelledby="yesterday-heading">
            <h2 id="yesterday-heading" className="font-heading text-2xl font-bold text-foreground">
              Yesterday&apos;s Pips
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pips #{yesterday.id} ({formatLongDate(yesterday.date)}):{" "}
              {hasPipsDatePage(yesterday.date) ? (
                <Link href={`/pips-answers/${yesterday.date}`} className="font-semibold text-primary hover:text-primary/80">
                  all three solutions →
                </Link>
              ) : (
                <Link href="/pips-answers" className="font-semibold text-primary hover:text-primary/80">
                  find it in the archive →
                </Link>
              )}
            </p>
          </section>
        )}

        <div className="max-w-3xl">
          <DateFaq heading="Pips Hints FAQ" items={PIPS_TODAY_FAQ} />
        </div>
      </div>
    </div>
  );
}
