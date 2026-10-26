import { BASE_URL } from "@/config/site";
import DateFaq, { type DateFaqItem } from "@/components/date-pages/DateFaq";
import FactCards from "@/components/date-pages/FactCards";
import PipsArchiveExplorer from "@/components/pips/PipsArchiveExplorer";
import PipsLatestTable from "@/components/pips/PipsLatestTable";
import PipsRecords from "@/components/pips/PipsRecords";
import { Locale, LOCALES } from "@/i18n/routing";
import { formatLongDate, formatShortDate, getLatestPipsDateLinks } from "@/lib/date-pages";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  JsonLd,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import {
  getPipsByMonth,
  getPipsByWeekday,
  getPipsConstructors,
  getPipsIntegrity,
  getPipsRecords,
  getPipsSumTargets,
  getRecentPipsLinks,
  PIPS_LABEL,
  PIPS_LEVELS,
} from "@/lib/pips-insights";
import { getPipsStats } from "@/lib/pips-stats";
import { getTodayDateString } from "@/lib/wordle-daily";
import type { Metadata } from "next";
import Link from "next/link";

type Params = Promise<{ locale: string }>;

const PAGE_PATH = "/pips-answers";

const pct = (x: number) => `${Math.round(x * 100)}%`;

const REGION_TYPES: { type: string; label: string }[] = [
  { type: "sum", label: "Number (sum)" },
  { type: "equals", label: "Equal" },
  { type: "unequal", label: "Not equal" },
  { type: "less", label: "Less than" },
  { type: "greater", label: "Greater than" },
  { type: "empty", label: "Empty" },
];

function monthName(m: string): string {
  return new Date(`${m}-15T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const s = getPipsStats();
  return constructMetadata({
    page: "PipsAnswers",
    title: "NYT Pips Answers Archive: Every Past Puzzle",
    description: `Every NYT Pips solution since Aug 18, 2025: the last 7 days at a glance, record boards, constructor stats, and a date picker for all ${s.puzzles} puzzles.`,
    keywords: ["pips answers", "nyt pips archive", "past pips answers", "pips solutions"],
    locale: locale as Locale,
    path: PAGE_PATH,
    canonicalUrl: PAGE_PATH,
    images: ["og/pips-answers.png"],
  });
}

export default function PipsAnswersPage() {
  const s = getPipsStats();
  const today = getTodayDateString();
  const pageUrl = `${BASE_URL}${PAGE_PATH}`;
  const { easy, medium, hard } = s.byDifficulty;
  const topTarget = s.topSumTargets[0];
  const latest = getLatestPipsDateLinks();
  const records = getPipsRecords();
  const months = getPipsByMonth();
  const makers = getPipsConstructors();
  const firstMonth = months[0];
  const lastFull = months.length > 1 ? months[months.length - 2] : months[0];
  const singles = records.find((r) => r.title === "Every square its own region");
  const recent = getRecentPipsLinks(14);
  const weekdays = getPipsByWeekday();
  const byHard = [...weekdays].sort((a, b) => b.avg.hard - a.avg.hard);
  const biggestDay = byHard[0];
  const smallestDay = byHard[byHard.length - 1];
  const risesThroughWeek = weekdays.slice(0, 6).every((d, i, xs) => i === 0 || d.avg.hard >= xs[i - 1].avg.hard);
  const weekdaySentence = `Hard boards are biggest on ${biggestDay.day}s (${biggestDay.avg.hard.toFixed(1)} dominoes on average) and smallest on ${smallestDay.day}s (${smallestDay.avg.hard.toFixed(1)}) — a gap of ${(biggestDay.avg.hard - smallestDay.avg.hard).toFixed(1)} dominoes. ${
    risesThroughWeek
      ? "Board size climbs from Monday to Saturday, much like the NYT crossword."
      : "Unlike the NYT crossword, Pips doesn't climb steadily in size from Monday to Saturday."
  }`;
  const targets = getPipsSumTargets();
  const integrity = getPipsIntegrity();
  const share = (l: (typeof PIPS_LEVELS)[number], type: string) =>
    s.byDifficulty[l].regionMix.find((m) => m.type === type)?.share ?? 0;
  const mostEasy = records.find((r) => r.title === "Most dominoes on Easy");
  const mostMedium = records.find((r) => r.title === "Most dominoes on Medium");

  const faq: DateFaqItem[] = [
    {
      question: "Where can I find old NYT Pips answers?",
      answer: `Right here: the table at the top links the last seven puzzles, and the archive below opens any date from August 18, 2025 to yesterday — ${s.puzzles} days so far, all three difficulties. Today's puzzle stays on the step-by-step hints page.`,
    },
    {
      question: "How many dominoes are in a Pips puzzle?",
      answer: `On average ${easy.avgDominoes.toFixed(1)} on Easy (${easy.minDominoes}–${easy.maxDominoes}), ${medium.avgDominoes.toFixed(1)} on Medium (${medium.minDominoes}–${medium.maxDominoes}) and ${hard.avgDominoes.toFixed(1)} on Hard (${hard.minDominoes}–${hard.maxDominoes}).`,
    },
    {
      question: "Has Pips got harder since it launched?",
      answer:
        firstMonth && lastFull
          ? `By board size, Hard went from ${firstMonth.avg.hard.toFixed(1)} dominoes on average in ${monthName(firstMonth.month)} to ${lastFull.avg.hard.toFixed(1)} in ${monthName(lastFull.month)}; Medium from ${firstMonth.avg.medium.toFixed(1)} to ${lastFull.avg.medium.toFixed(1)}. The month-by-month table on this page has every month.`
          : "Not enough data yet.",
    },
    {
      question: "Is Pips harder on weekends?",
      answer: `Not by much. ${weekdaySentence}`,
    },
    {
      question: "Which Pips puzzle had the most dominoes?",
      answer: `On Easy, ${mostEasy ? `#${mostEasy.entries[0]?.id} with ${mostEasy.value}` : "—"}; on Medium, ${mostMedium ? `#${mostMedium.entries[0]?.id} with ${mostMedium.value}` : "—"}. Hard boards top out at ${hard.maxDominoes} dominoes, a size many Hard puzzles reach. The Record Boards section lists these and the other outliers.`,
    },
    {
      question: "What is the most common number in Pips?",
      answer: topTarget
        ? `Among regions of two or more squares with a sum, ${topTarget.target} is the most common target (${pct(topTarget.share)} of them), followed by ${s.topSumTargets.slice(1, 4).map((t) => t.target).join(", ")}.`
        : "Not enough data yet.",
    },
    {
      question: "Who makes NYT Pips?",
      answer: `${makers
        .map((m) => `${m.name} (${m.total} boards)`)
        .join(", ")}, counted over every board in the archive.`,
    },
    {
      question: "Are there Pips boards where every square is its own region?",
      answer: singles
        ? `Yes — ${singles.value} so far. With no shared regions, the board is a grid of numbers and the whole puzzle is fitting dominoes onto it. The Record Boards section links each one.`
        : "Not so far.",
    },
  ];

  return (
    <div className="w-full">
      <JsonLd
        data={articleSchema({
          title: "NYT Pips Answers Archive",
          description: "Every past NYT Pips solution, Easy to Hard, with record boards and archive statistics.",
          url: pageUrl,
          datePublished: "2026-10-26T12:00:00Z",
          dateModified: `${today}T06:00:00Z`,
        })}
      />
      <JsonLd data={faqPageSchema(faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Pips Answers", url: pageUrl },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Latest NYT Pips answers",
          itemListElement: latest.map((l, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${BASE_URL}${l.href}`,
            name: `NYT Pips #${l.id} answers (${formatShortDate(l.date)})`,
          })),
        }}
      />

      {/* Compact masthead: the data table has to start on the first screen. */}
      <section className="border-b border-border bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-4xl px-4 pb-6 pt-6 sm:px-6 sm:pt-8">
          <h1 className="font-heading text-2xl font-bold leading-tight text-white sm:text-4xl">
            NYT Pips Answers — Every Past Puzzle
          </h1>
          <p className="mt-2 font-mono text-xs text-slate-400">
            {s.puzzles} puzzles · {(s.puzzles * 3).toLocaleString("en-US")} boards · {formatShortDate(s.firstDate)} – {formatShortDate(s.lastDate)} ·
            Updated <time dateTime={today}>{formatLongDate(today)}</time>
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/pips-hint-today"
              className="inline-flex items-center rounded-lg bg-cta px-4 py-2 text-sm font-bold text-cta-foreground"
            >
              Today&apos;s Pips hints
            </Link>
            <Link href="/how-to-play-pips" className="text-sm font-semibold text-primary hover:text-primary/80">
              How to play Pips →
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <section aria-labelledby="latest-heading">
          <h2 id="latest-heading" className="font-heading text-xl font-bold text-foreground sm:text-2xl">
            Last 14 Days of Pips
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Dominoes per board, with anything unusual. Recent puzzles open on their own page with all
            three solutions, every region in text and a hint mode; older ones open in the archive below.
          </p>
          <div className="mt-4">
            <PipsLatestTable pages={recent} />
          </div>
        </section>

        <section className="mt-14" aria-labelledby="archive-heading">
          <h2 id="archive-heading" className="font-heading text-2xl font-bold text-foreground">
            Browse Every Past Pips Solution
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose a month and a day; switch difficulty with the tabs.
          </p>
          <div className="mt-5 rounded-2xl border border-border bg-card p-4 sm:p-6">
            <PipsArchiveExplorer />
          </div>
        </section>

        <section className="mt-14" aria-labelledby="records-heading">
          <h2 id="records-heading" className="font-heading text-2xl font-bold text-foreground">
            Record Boards
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The outliers among all {(s.puzzles * 3).toLocaleString("en-US")} boards: the biggest and smallest, the most
            doubles, the largest single region, and the rare boards where every square is a region
            of its own. Recent ones link to their page; older ones open in the archive above.
          </p>
          <div className="mt-4">
            <PipsRecords records={records} />
          </div>
        </section>

        <section className="mt-14 max-w-3xl" aria-labelledby="months-heading">
          <h2 id="months-heading" className="font-heading text-2xl font-bold text-foreground">
            Pips by Month
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Average dominoes per board for each month since launch — the simplest measure of
            how big the puzzles have been.
            {firstMonth && lastFull
              ? ` Hard averaged ${firstMonth.avg.hard.toFixed(1)} in ${monthName(firstMonth.month)} and ${lastFull.avg.hard.toFixed(1)} in ${monthName(lastFull.month)}.`
              : ""}
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[26rem] text-sm">
              <thead>
                <tr className="border-b border-border text-left font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th scope="col" className="px-4 py-2.5 font-normal">Month</th>
                  <th scope="col" className="px-3 py-2.5 text-right font-normal">Puzzles</th>
                  {PIPS_LEVELS.map((l) => (
                    <th key={l} scope="col" className="px-3 py-2.5 text-right font-normal">
                      {PIPS_LABEL[l]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed divide-border">
                {months.map((m) => (
                  <tr key={m.month}>
                    <th scope="row" className="px-4 py-2 text-left font-normal text-foreground">
                      {monthName(m.month)}
                    </th>
                    <td className="px-3 py-2 text-right font-mono tabular-nums text-muted-foreground">{m.puzzles}</td>
                    {PIPS_LEVELS.map((l) => (
                      <td key={l} className="px-3 py-2 text-right font-mono tabular-nums text-foreground">
                        {m.avg[l].toFixed(1)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14 max-w-3xl" aria-labelledby="weekday-heading">
          <h2 id="weekday-heading" className="font-heading text-2xl font-bold text-foreground">
            Does Pips Get Harder Through the Week?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{weekdaySentence}</p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[26rem] text-sm">
              <thead>
                <tr className="border-b border-border text-left font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th scope="col" className="px-4 py-2.5 font-normal">Day</th>
                  <th scope="col" className="px-3 py-2.5 text-right font-normal">Puzzles</th>
                  {PIPS_LEVELS.map((l) => (
                    <th key={l} scope="col" className="px-3 py-2.5 text-right font-normal">
                      {PIPS_LABEL[l]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed divide-border">
                {weekdays.map((d) => (
                  <tr key={d.day}>
                    <th scope="row" className="px-4 py-2 text-left font-normal text-foreground">{d.day}</th>
                    <td className="px-3 py-2 text-right font-mono tabular-nums text-muted-foreground">{d.puzzles}</td>
                    {PIPS_LEVELS.map((l) => (
                      <td key={l} className="px-3 py-2 text-right font-mono tabular-nums text-foreground">
                        {d.avg[l].toFixed(1)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Average dominoes per board, by the day the puzzle ran.</p>
        </section>

        <section className="mt-14 max-w-3xl" aria-labelledby="types-heading">
          <h2 id="types-heading" className="font-heading text-2xl font-bold text-foreground">
            Region Types by Difficulty
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The share of each kind of region on Easy, Medium and Hard boards. Exact sums are the
            most common region at every level, rising from {pct(share("easy", "sum"))} of regions on
            Easy to {pct(share("hard", "sum"))} on Hard, while empty regions drop from{" "}
            {pct(share("easy", "empty"))} to {pct(share("hard", "empty"))}: harder boards leave fewer
            squares free.
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[26rem] text-sm">
              <thead>
                <tr className="border-b border-border text-left font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th scope="col" className="px-4 py-2.5 font-normal">Region</th>
                  {PIPS_LEVELS.map((l) => (
                    <th key={l} scope="col" className="px-3 py-2.5 text-right font-normal">
                      {PIPS_LABEL[l]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed divide-border">
                {REGION_TYPES.map((t) => (
                  <tr key={t.type}>
                    <th scope="row" className="px-4 py-2 text-left font-normal text-foreground">{t.label}</th>
                    {PIPS_LEVELS.map((l) => (
                      <td key={l} className="px-3 py-2 text-right font-mono tabular-nums text-foreground">
                        {pct(share(l, t.type))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14 max-w-3xl" aria-labelledby="makers-heading">
          <h2 id="makers-heading" className="font-heading text-2xl font-bold text-foreground">
            Who Makes Pips
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Every board carries a constructor credit. Counted across the whole archive:
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[26rem] text-sm">
              <thead>
                <tr className="border-b border-border text-left font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th scope="col" className="px-4 py-2.5 font-normal">Constructor</th>
                  {PIPS_LEVELS.map((l) => (
                    <th key={l} scope="col" className="px-3 py-2.5 text-right font-normal">
                      {PIPS_LABEL[l]}
                    </th>
                  ))}
                  <th scope="col" className="px-3 py-2.5 text-right font-normal">Total</th>
                  <th scope="col" className="px-4 py-2.5 font-normal">First board</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed divide-border">
                {makers.map((m) => (
                  <tr key={m.name}>
                    <th scope="row" className="px-4 py-2 text-left font-semibold text-foreground">{m.name}</th>
                    {PIPS_LEVELS.map((l) => (
                      <td key={l} className="px-3 py-2 text-right font-mono tabular-nums">{m.counts[l]}</td>
                    ))}
                    <td className="px-3 py-2 text-right font-mono font-bold tabular-nums">{m.total}</td>
                    <td className="px-4 py-2 text-muted-foreground">{formatShortDate(m.first)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Rules, symbols and seven strategies drawn from these boards:{" "}
            <Link href="/how-to-play-pips" className="font-semibold text-primary hover:text-primary/80">
              how to play Pips →
            </Link>
          </p>
        </section>

        <section className="mt-14" aria-labelledby="numbers-heading">
          <h2 id="numbers-heading" className="font-heading text-2xl font-bold text-foreground">
            Pips by the Numbers
          </h2>
          <div className="mt-4">
            <FactCards
              facts={[
                { value: easy.avgDominoes.toFixed(1), label: "dominoes on an average Easy board" },
                { value: medium.avgDominoes.toFixed(1), label: "dominoes on an average Medium board" },
                { value: hard.avgDominoes.toFixed(1), label: "dominoes on an average Hard board" },
                { value: pct(hard.oneSquareShare), label: "of Hard boards have a one-square sum region" },
              ]}
            />
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Counted from {s.puzzles} days × 3 boards ({formatLongDate(s.firstDate)} to{" "}
            {formatLongDate(s.lastDate)}). Sum regions make up {pct(hard.regionMix.find((r) => r.type === "sum")?.share ?? 0)} of
            all regions on Hard boards
            {topTarget ? `, and ${topTarget.target} is the most common target for a multi-square sum (${pct(topTarget.share)})` : ""}.
          </p>
          <h3 className="mt-8 font-heading text-lg font-bold text-foreground">Most Common Sum Targets</h3>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            Numbers on regions of two or more squares, across all three difficulties. A two-square
            region marked 12 can only be 6 + 6, and one marked 0 only 0 + 0 — the high and low ends
            are where a board gives itself away.
          </p>
          <ol className="mt-3 grid gap-2 sm:grid-cols-2">
            {targets.slice(0, 10).map((t, i) => (
              <li key={t.target} className="flex items-center justify-between rounded-lg border border-dashed border-border bg-card px-3 py-2 text-sm">
                <span className="text-muted-foreground">
                  <span className="mr-2 font-mono text-xs">{i + 1}.</span>
                  Target <span className="font-mono font-bold text-foreground">{t.target}</span>
                </span>
                <span className="font-mono tabular-nums text-foreground">
                  {t.count} regions · {pct(t.share)}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 max-w-3xl" aria-labelledby="use-heading">
          <h2 id="use-heading" className="font-heading text-2xl font-bold text-foreground">
            How to Use This Archive
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">Checking a recent answer?</span> The
              table at the top links each of the last seven puzzles to its own page, with every
              region of every board written out.
            </li>
            <li>
              <span className="font-semibold text-foreground">Going further back?</span> Pick the
              month and day in the archive. Boards open solved; &ldquo;Hide the solution&rdquo; turns
              any of them back into a four-step hint ladder, so old puzzles double as practice.
            </li>
            <li>
              <span className="font-semibold text-foreground">Stuck on today&apos;s?</span> Today is
              left out of the archive on purpose. Use the{" "}
              <Link href="/pips-hint-today" className="font-semibold text-primary hover:text-primary/80">
                spoiler-safe hints for today
              </Link>{" "}
              instead.
            </li>
          </ul>
        </section>

        <section className="mt-14 max-w-3xl" aria-labelledby="source-heading">
          <h2 id="source-heading" className="font-heading text-2xl font-bold text-foreground">
            Where These Answers Come From
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Every solution here is the one NYT published, taken from the same puzzle data the game
            loads, on the day the puzzle goes live. Before a puzzle is saved, our updater checks all
            three solutions against every region&apos;s rule, and this page re-checks the whole archive
            each time it&apos;s built:{" "}
            <span className="font-semibold text-foreground">
              {integrity.valid === integrity.boards
                ? `all ${integrity.boards.toLocaleString("en-US")} boards`
                : `${integrity.valid.toLocaleString("en-US")} of ${integrity.boards.toLocaleString("en-US")} boards`}
            </span>{" "}
            cover every square exactly once and meet all {integrity.regions.toLocaleString("en-US")} region
            conditions ({integrity.squares.toLocaleString("en-US")} squares in all).
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The statistics on this page count puzzles before today only, so they never give away
            today&apos;s boards. Hard boards can sometimes be solved more than one way; the archive shows
            NYT&apos;s arrangement, and any other that meets every condition is just as valid in the game.
          </p>
        </section>

        <div className="max-w-3xl">
          <DateFaq heading="Pips Answers FAQ" items={faq} />
        </div>
      </div>
    </div>
  );
}
