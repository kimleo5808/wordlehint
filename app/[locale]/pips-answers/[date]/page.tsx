import { BASE_URL } from "@/config/site";
import AlsoOnStrip from "@/components/date-pages/AlsoOnStrip";
import DateFaq, { type DateFaqItem } from "@/components/date-pages/DateFaq";
import DatePageHeader from "@/components/date-pages/DatePageHeader";
import DatePageNav from "@/components/date-pages/DatePageNav";
import FactCards from "@/components/date-pages/FactCards";
import PipsComparisonTable from "@/components/pips/PipsComparisonTable";
import PipsHintLadder from "@/components/pips/PipsHintLadder";
import PipsRegionAnswers from "@/components/pips/PipsRegionAnswers";
import { Locale, LOCALES } from "@/i18n/routing";
import {
  formatLongDate,
  formatShortDate,
  getAlsoOnDate,
  getPipsDatePages,
  getPipsNeighbors,
} from "@/lib/date-pages";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  JsonLd,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { getPipsByDate } from "@/lib/pips-daily";
import { getPipsBoardFacts, getPipsHints } from "@/lib/pips-hints";
import {
  comparePipsBoard,
  creditLine,
  getPipsHighlights,
  getRegionAnswers,
  singleSquareGrid,
} from "@/lib/pips-insights";
import type { PipsDifficulty, PipsPuzzle } from "@/types/pips";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{ locale: string; date: string }>;

const LEVELS: PipsDifficulty[] = ["easy", "medium", "hard"];
/** Hard first: it's the board most people look up. */
const TEXT_ORDER: PipsDifficulty[] = ["hard", "medium", "easy"];
const LABEL: Record<PipsDifficulty, string> = { easy: "Easy", medium: "Medium", hard: "Hard" };

export async function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getPipsDatePages().map((p) => ({ locale, date: p.date }))
  );
}

export const dynamicParams = false;

function getPage(date: string): PipsPuzzle | undefined {
  return getPipsDatePages().some((p) => p.date === date) ? getPipsByDate(date) : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, date } = await params;
  const puzzle = getPage(date);
  if (!puzzle) return {};
  const short = formatShortDate(date);
  return constructMetadata({
    page: "PipsDate",
    title: `NYT Pips #${puzzle.id} Answers & Hints — ${short}`,
    description: `NYT Pips #${puzzle.id} answers for ${short}: all three boards solved, every region explained in text, plus hint mode and how this board compares.`,
    keywords: [
      `pips #${puzzle.id}`,
      `pips answer ${formatLongDate(date).split(", ")[1].toLowerCase()}`,
      `nyt pips ${date}`,
      "pips answers",
    ],
    locale: locale as Locale,
    path: `/pips-answers/${date}`,
    canonicalUrl: `/pips-answers/${date}`,
    images: [`og/pips/${date}.png`],
  });
}

export default async function PipsDatePage({ params }: { params: Params }) {
  const { date } = await params;
  const puzzle = getPage(date);
  if (!puzzle) notFound();

  const longDate = formatLongDate(date);
  const shortDate = formatShortDate(date);
  const pageUrl = `${BASE_URL}/pips-answers/${date}`;
  const neighbors = getPipsNeighbors(date);
  const boards = LEVELS.map((difficulty) => ({
    difficulty,
    board: puzzle[difficulty],
    steps: getPipsHints(puzzle[difficulty]),
  }));
  const facts = Object.fromEntries(LEVELS.map((l) => [l, getPipsBoardFacts(puzzle[l])])) as Record<
    PipsDifficulty,
    ReturnType<typeof getPipsBoardFacts>
  >;
  const makers = [...new Set(LEVELS.map((l) => puzzle[l].constructors).filter(Boolean))];
  const hardStart = boards[2].steps[0].text;
  const highlights = getPipsHighlights(puzzle);
  const comparisons = LEVELS.map((l) => comparePipsBoard(puzzle, l));

  const summary = `NYT Pips #${puzzle.id} (${longDate}) has ${facts.easy.dominoes} dominoes on Easy, ${facts.medium.dominoes} on Medium and ${facts.hard.dominoes} on Hard — ${creditLine(puzzle)}. The solved boards are above; below, every region of every board is spelled out in text.`;

  const hardGrid = singleSquareGrid(puzzle.hard);
  const hardAnswer = hardGrid
    ? `Every Hard region is a single numbered square, so the answer is the number grid itself: ${hardGrid
        .map((row, r) => `row ${r + 1} reads ${row.filter((v) => v !== null).join(", ")}`)
        .join("; ")}.`
    : `Region by region: ${getRegionAnswers(puzzle.hard)
        .slice(0, 4)
        .map((a) => `${a.colour} ${a.badge || "(no rule)"} = ${a.answer}`)
        .join("; ")}; all ${facts.hard.regions} regions are listed on this page.`;

  const faq: DateFaqItem[] = [
    {
      question: `How many dominoes are in Pips #${puzzle.id}?`,
      answer: LEVELS.map((l) => `${LABEL[l]}: ${facts[l].dominoes} dominoes in ${facts[l].regions} regions`).join("; ") + ".",
    },
    {
      question: `What is the answer to Pips #${puzzle.id} Hard?`,
      answer: hardAnswer,
    },
    {
      question: `Where should I start on the Hard Pips #${puzzle.id}?`,
      answer: hardStart,
    },
    {
      question: `Who made Pips #${puzzle.id}?`,
      answer: makers.length
        ? LEVELS.map((l) => `${LABEL[l]} by ${puzzle[l].constructors || "NYT"}`).join(", ") + "."
        : "NYT Games doesn't credit a constructor for this one.",
    },
    {
      question: "Can a Pips board have more than one solution?",
      answer:
        "Occasionally, on harder boards. The solutions shown here are the ones NYT published; any arrangement that meets every region's condition is accepted in the game.",
    },
  ];

  return (
    <div className="w-full">
      <JsonLd
        data={articleSchema({
          title: `NYT Pips #${puzzle.id} Answers — ${longDate}`,
          description: `Easy, Medium and Hard solutions for NYT Pips #${puzzle.id} (${shortDate}).`,
          url: pageUrl,
          datePublished: `${date}T06:00:00Z`,
          dateModified: `${date}T06:00:00Z`,
          image: `${BASE_URL}/og/pips/${date}.png`,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Pips Answers", url: `${BASE_URL}/pips-answers` },
          { name: `#${puzzle.id}`, url: pageUrl },
        ])}
      />
      <JsonLd data={faqPageSchema(faq)} />

      <DatePageHeader
        kicker={`#${puzzle.id}`}
        title={`NYT Pips #${puzzle.id} — ${longDate}`}
        chips={[
          ...LEVELS.map((l) => ({ label: `${LABEL[l]} ${facts[l].dominoes}` })),
          ...highlights.slice(0, 2).map((h) => ({ label: h.short, highlight: true })),
        ]}
        date={date}
        publishedLabel={longDate}
        editor={puzzle.editor || undefined}
        hub={{ label: "Pips answers", href: "/pips-answers" }}
        prev={neighbors.prev}
        next={neighbors.next}
        accent="#f97316"
      />
      <AlsoOnStrip
        label={`Also on ${shortDate.replace(/, \d{4}$/, "")}`}
        links={getAlsoOnDate(date)}
        current="pips"
      />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <section aria-labelledby="solutions-heading">
          <h2 id="solutions-heading" className="font-heading text-xl font-bold text-foreground sm:text-2xl">
            Solutions: Easy, Medium and Hard
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The solutions are open. Use “Hide the solution” to work through the
            four hint steps instead.
          </p>
          <div className="mt-5">
            <PipsHintLadder boards={boards} date={date} initialStage={4} />
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">{summary}</p>
        </section>

        {TEXT_ORDER.map((level) => (
          <section key={level} className="mt-14 max-w-3xl" aria-labelledby={`answer-${level}-heading`}>
            <h2 id={`answer-${level}-heading`} className="font-heading text-2xl font-bold text-foreground">
              Pips #{puzzle.id} {LABEL[level]} Answer, Region by Region
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {LABEL[level]}: {facts[level].dominoes} dominoes, {facts[level].regions} regions,
              made by {puzzle[level].constructors || "NYT"}. Each line is one region — its colour
              and badge on the board, the square the badge sits on, and the numbers NYT&apos;s
              solution puts there.
            </p>
            <div className="mt-4">
              <PipsRegionAnswers board={puzzle[level]} />
            </div>
          </section>
        ))}

        <section className="mt-14 max-w-3xl" aria-labelledby="numbers-heading">
          <h2 id="numbers-heading" className="font-heading text-2xl font-bold text-foreground">
            Pips #{puzzle.id} in Numbers
          </h2>
          <div className="mt-4">
            <FactCards
              facts={[
                { value: String(facts.hard.dominoes), label: "dominoes on the Hard board" },
                { value: String(facts.hard.oneSquareSums), label: "one-square sum regions on Hard" },
                { value: String(facts.hard.doubles), label: "doubles on Hard" },
                {
                  value: String(LEVELS.reduce((n, l) => n + facts[l].constrainedRegions, 0)),
                  label: "regions with a condition across all three boards",
                },
              ]}
            />
          </div>
          {highlights.length > 0 && (
            <ul className="mt-4 space-y-2">
              {highlights.map((h) => (
                <li key={h.short} className="rounded-lg bg-amber-500/10 px-3 py-2 text-sm leading-relaxed text-foreground">
                  {h.text}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A one-square sum region gives away that square&apos;s number outright,
            which is why our first hint usually starts there. Doubles (like 3–3)
            are the dominoes that can fill an “equal” region on their own.
          </p>
          <h3 className="mt-8 font-heading text-lg font-bold text-foreground">
            Compared with Earlier Pips Boards
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Each board against the average of the {comparisons[0].pool} puzzles before it, same difficulty.
          </p>
          <div className="mt-4">
            <PipsComparisonTable comparisons={comparisons} />
          </div>
        </section>

        <div className="max-w-3xl">
          <DateFaq heading={`FAQ: Pips #${puzzle.id}`} items={faq} />
          <DatePageNav
            heading="More Pips Puzzles"
            game="Pips"
            date={date}
            neighbors={neighbors}
            links={[
              { label: "Today's Pips hints", href: "/pips-hint-today" },
              { label: "Every past Pips answer", href: "/pips-answers" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
