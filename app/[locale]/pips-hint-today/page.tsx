import { BASE_URL } from "@/config/site";
import DateFaq, { type DateFaqItem } from "@/components/date-pages/DateFaq";
import PipsComparisonTable from "@/components/pips/PipsComparisonTable";
import PipsGlance from "@/components/pips/PipsGlance";
import PipsHintLadder from "@/components/pips/PipsHintLadder";
import PipsTextHints from "@/components/pips/PipsTextHints";
import { NYT_PIPS_HELP, PIPS_RULES, PIPS_TODAY_FAQ } from "@/data/pips/content";
import { Locale, LOCALES } from "@/i18n/routing";
import { formatLongDate, formatShortDate, hasPipsDatePage } from "@/lib/date-pages";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  howToSchema,
  JsonLd,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { getTodayPips, getYesterdayPips } from "@/lib/pips-daily";
import { getPipsBoardFacts, getPipsHints } from "@/lib/pips-hints";
import {
  comparePipsBoard,
  creditLine,
  getPipsHighlights,
  PIPS_LABEL,
  PIPS_LEVELS,
} from "@/lib/pips-insights";
import { getTodayDateString } from "@/lib/wordle-daily";
import type { PipsDifficulty } from "@/types/pips";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

type Params = Promise<{ locale: string }>;

const PAGE_PATH = "/pips-hint-today";
/** Hard first: it's the board most people get stuck on. */
const TEXT_ORDER: PipsDifficulty[] = ["hard", "medium", "easy"];

const HOWTO_STEPS = [
  { name: "Pick a difficulty", text: "Choose Easy, Medium or Hard on the board above. Hard is open by default." },
  { name: "Find the starting square", text: "Hint 1 points to a square the rules alone decide, usually a one-square region whose number is its pip count." },
  { name: "Place the first domino", text: "Hint 2 names the domino that covers that square and which way round it goes." },
  { name: "Get half the board", text: "Hint 3 places half the dominoes, starting with the most tightly constrained regions." },
  { name: "Check the solution", text: "The last step shows NYT's full solution, on the board and as text." },
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
  const day = formatShortDate(date).replace(/, \d{4}$/, "");
  return constructMetadata({
    page: "PipsHintToday",
    title: `NYT Pips Hints & Answers Today: ${day}${puzzle ? ` (#${puzzle.id})` : ""}`,
    description: `Hints for today's NYT Pips${puzzle ? ` #${puzzle.id}` : ""}, Easy to Hard: the square to start on, the first domino, half the board, then the full solution in text.`,
    keywords: [
      "pips hints today",
      "nyt pips answer today",
      "pips hard answer today",
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
  const boards = PIPS_LEVELS.map((difficulty) => ({
    difficulty,
    board: puzzle[difficulty],
    steps: getPipsHints(puzzle[difficulty]),
  }));
  const steps = Object.fromEntries(boards.map((b) => [b.difficulty, b.steps])) as Record<
    PipsDifficulty,
    (typeof boards)[number]["steps"]
  >;
  const facts = Object.fromEntries(PIPS_LEVELS.map((l) => [l, getPipsBoardFacts(puzzle[l])])) as Record<
    PipsDifficulty,
    ReturnType<typeof getPipsBoardFacts>
  >;
  const highlights = getPipsHighlights(puzzle);
  const comparisons = PIPS_LEVELS.map((l) => comparePipsBoard(puzzle, l));
  const pool = comparisons[0].pool;
  const hasDatePage = hasPipsDatePage(puzzle.date);

  const yFacts = yesterday
    ? (Object.fromEntries(PIPS_LEVELS.map((l) => [l, getPipsBoardFacts(yesterday[l])])) as Record<
        PipsDifficulty,
        ReturnType<typeof getPipsBoardFacts>
      >)
    : null;
  const yHighlights = yesterday ? getPipsHighlights(yesterday) : [];

  const faq: DateFaqItem[] = [
    {
      question: "How many dominoes are in today's Pips?",
      answer: `Pips #${puzzle.id} (${longDate}) has ${facts.easy.dominoes} dominoes on Easy, ${facts.medium.dominoes} on Medium and ${facts.hard.dominoes} on Hard, in ${facts.easy.regions + facts.medium.regions + facts.hard.regions} regions across the three boards.`,
    },
    {
      question: "Where should I start on today's Hard Pips?",
      answer: `${steps.hard[0].text} Hint 2 on this page shows which domino covers it.`,
    },
    ...PIPS_TODAY_FAQ,
  ];

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
      <JsonLd data={faqPageSchema(faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Pips Hints Today", url: pageUrl },
        ])}
      />

      {/* Compact masthead: the board has to start on the first screen. */}
      <section className="border-b border-border bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-4xl px-4 pb-6 pt-6 sm:px-6 sm:pt-8">
          <h1 className="font-heading text-2xl font-bold leading-tight text-white sm:text-4xl">
            NYT Pips Hints Today — {longDate}
          </h1>
          <p className="mt-2 font-mono text-xs text-slate-400">
            Pips #{puzzle.id} · Updated <time dateTime={puzzle.date}>{longDate}</time> · Puzzle data from NYT Games
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5 text-xs">
            {PIPS_LEVELS.map((l) => (
              <li key={l} className="rounded-full border border-slate-600 bg-slate-800/60 px-2.5 py-1 font-mono text-slate-200">
                {PIPS_LABEL[l]} <span className="font-bold text-white">{facts[l].dominoes}</span>
              </li>
            ))}
            {highlights.slice(0, 2).map((h) => (
              <li key={h.short} className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-1 font-semibold text-amber-200">
                {h.short}
              </li>
            ))}
            <li className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-semibold text-primary">
              Spoiler-safe
            </li>
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <section aria-labelledby="boards-heading">
          <h2 id="boards-heading" className="font-heading text-xl font-bold text-foreground sm:text-2xl">
            Today&apos;s Boards and Step-by-Step Hints
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick a difficulty, then reveal one step at a time.
          </p>
          <div className="mt-4">
            <PipsHintLadder boards={boards} date={puzzle.date} initialStage={0} />
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Today&apos;s NYT Pips is #{puzzle.id} ({longDate}): {facts.easy.dominoes} dominoes on
            Easy, {facts.medium.dominoes} on Medium and {facts.hard.dominoes} on Hard —{" "}
            {creditLine(puzzle)}. Every hint below comes from the rules and NYT&apos;s
            own solution, so it&apos;s always right for today&apos;s boards.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
            {hasDatePage && (
              <Link href={`/pips-answers/${puzzle.date}`} className="text-sm font-semibold text-primary hover:text-primary/80">
                #{puzzle.id} answers, region by region →
              </Link>
            )}
            <Link href="/pips-answers" className="text-sm font-semibold text-primary hover:text-primary/80">
              Past Pips answers →
            </Link>
            <Link href="/how-to-play-pips" className="text-sm font-semibold text-primary hover:text-primary/80">
              How to play Pips →
            </Link>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="glance-heading">
          <h2 id="glance-heading" className="font-heading text-2xl font-bold text-foreground">
            Today&apos;s Pips at a Glance
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The size and make-up of each board. None of this gives away where a domino goes.
          </p>
          <div className="mt-4">
            <PipsGlance puzzle={puzzle} highlights={highlights} />
          </div>
        </section>

        <section className="mt-14 max-w-3xl" aria-labelledby="difficulty-heading">
          <h2 id="difficulty-heading" className="font-heading text-2xl font-bold text-foreground">
            How Hard Is Today&apos;s Pips?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We compare today&apos;s boards with all {pool} earlier puzzles of the same
            difficulty (since August 18, 2025). Bigger boards take longer; fewer one-square
            regions mean fewer free starting points; less-than and greater-than regions
            leave more combinations open than an exact sum does.
          </p>
          <div className="mt-4">
            <PipsComparisonTable comparisons={comparisons} />
          </div>
        </section>

        {TEXT_ORDER.map((level) => (
          <section key={level} className="mt-14 max-w-3xl" aria-labelledby={`text-${level}-heading`}>
            <h2 id={`text-${level}-heading`} className="font-heading text-2xl font-bold text-foreground">
              Today&apos;s {PIPS_LABEL[level]} Pips Hints and Answer
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The {PIPS_LABEL[level]} board has {facts[level].dominoes} dominoes in{" "}
              {facts[level].regions} regions, {facts[level].constrainedRegions} of them with a
              condition, made by {puzzle[level].constructors || "NYT"}. Open one hint at a time;
              the answer is last.
            </p>
            <div className="mt-4">
              <PipsTextHints board={puzzle[level]} steps={steps[level]} label={PIPS_LABEL[level]} />
            </div>
          </section>
        ))}

        <section className="mt-14 max-w-3xl" aria-labelledby="howto-heading">
          <h2 id="howto-heading" className="font-heading text-2xl font-bold text-foreground">
            How These Pips Hints Work
          </h2>
          <ol className="mt-4 space-y-3">
            {HOWTO_STEPS.map((s, i) => (
              <li key={s.name} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs font-bold text-foreground">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">{s.name}.</span> {s.text}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The hints are worked out from the puzzle data, not written by hand: the first
            one is always a fact the rules force, whichever way you solve the board, and the
            rest follow the solution NYT published. Hard boards can occasionally be solved more
            than one way — if your arrangement meets every region&apos;s condition, the game
            accepts it.
          </p>
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

        {yesterday && yFacts && (
          <section className="mt-14 max-w-3xl" aria-labelledby="yesterday-heading">
            <h2 id="yesterday-heading" className="font-heading text-2xl font-bold text-foreground">
              Yesterday&apos;s Pips
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Pips #{yesterday.id} ({formatLongDate(yesterday.date)}) had{" "}
              {yFacts.easy.dominoes} dominoes on Easy, {yFacts.medium.dominoes} on Medium and{" "}
              {yFacts.hard.dominoes} on Hard — {creditLine(yesterday)}.
            </p>
            {yHighlights.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {yHighlights.map((h) => (
                  <li key={h.short}>{h.text}</li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-sm">
              {hasPipsDatePage(yesterday.date) ? (
                <Link href={`/pips-answers/${yesterday.date}`} className="font-semibold text-primary hover:text-primary/80">
                  All three #{yesterday.id} solutions, region by region →
                </Link>
              ) : (
                <Link href="/pips-answers" className="font-semibold text-primary hover:text-primary/80">
                  Find it in the archive →
                </Link>
              )}
            </p>
          </section>
        )}

        <div className="max-w-3xl">
          <DateFaq heading="Pips Hints FAQ" items={faq} />
        </div>
      </div>
    </div>
  );
}
