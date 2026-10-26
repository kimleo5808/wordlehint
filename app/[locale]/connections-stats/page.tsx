import { BASE_URL } from "@/config/site";
import { CONN_COLORS } from "@/components/connections/colors";
import ColourBar from "@/components/connections-stats/ColourBar";
import WordLookup from "@/components/connections-stats/WordLookup";
import DateFaq, { type DateFaqItem } from "@/components/date-pages/DateFaq";
import FactCards from "@/components/date-pages/FactCards";
import { NYT_CONNECTIONS_HELP } from "@/data/connections/content";
import { Locale, LOCALES } from "@/i18n/routing";
import { getConnectionsStatsData } from "@/lib/connections-stats";
import { formatLongDate, formatShortDate, hasConnectionsDatePage } from "@/lib/date-pages";
import { articleSchema, breadcrumbSchema, faqPageSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { getTodayDateString } from "@/lib/wordle-daily";
import type { Metadata } from "next";
import Link from "next/link";

type Params = Promise<{ locale: string }>;

const PAGE_PATH = "/connections-stats";
const PURPLE = CONN_COLORS.purple.bg;

const n = (x: number) => x.toLocaleString("en-US");
const pct = (x: number) => `${Math.round(x * 100)}%`;

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = getConnectionsStatsData();
  return constructMetadata({
    page: "ConnectionsStats",
    title: "NYT Connections Stats: Every Puzzle, Analyzed",
    description: `Live statistics from all ${n(d.puzzles)} NYT Connections puzzles: the most-used words, words seen in every color, repeated categories, and how purple has changed.`,
    keywords: [
      "connections stats",
      "connections statistics",
      "most common connections words",
      "nyt connections purple categories",
      "connections words that repeat",
    ],
    locale: locale as Locale,
    path: PAGE_PATH,
    canonicalUrl: PAGE_PATH,
    images: ["og/connections-stats.png"],
  });
}

function PuzzleRef({ id, date }: { id: number; date: string }) {
  return hasConnectionsDatePage(date) ? (
    <Link href={`/connections-answers/${date}`} className="font-semibold text-primary hover:text-primary/80">
      #{id}
    </Link>
  ) : (
    <span className="font-semibold text-foreground">#{id}</span>
  );
}

export default function ConnectionsStatsPage() {
  const d = getConnectionsStatsData();
  const today = getTodayDateString();
  const pageUrl = `${BASE_URL}${PAGE_PATH}`;
  const top = d.topWords[0];
  const scale = top?.total ?? 1;
  const repeatSlots = (d.cells - d.distinct) / Math.max(1, d.cells);
  const onceShare = d.usedOnce / Math.max(1, d.distinct);
  const years = d.purpleBlankByYear;
  const firstYear = years[0];
  const lastYear = years[years.length - 1];
  const maxYearShare = Math.max(...years.map((y) => y.share), 0.01);
  const purpleTotal = years.reduce((s, y) => s + y.purples, 0);
  const blankTotal = years.reduce((s, y) => s + y.blanks, 0);
  const blankType = d.categoryTypes.find((t) => t.key === "blank");
  const otherType = d.categoryTypes.find((t) => t.key === "other");
  const topGroup = d.repeatedGroups[0];
  const topPurple = d.topPurple[0];
  const rainbowShown = d.rainbow.slice(0, 40);
  const rainbowRest = d.rainbow.slice(40);
  const range = `${formatShortDate(d.firstDate)} – ${formatShortDate(d.lastDate)}`;
  const typeLabel = Object.fromEntries(d.categoryTypes.map((t) => [t.key, t.label]));
  const trendTypes = d.categoryTypes.filter((t) => t.key !== "other").map((t) => t.key);
  const yearShare = (y: (typeof d.purpleTypesByYear)[number], k: string) => (y.types[k] ?? 0) / Math.max(1, y.purples);
  const firstTypes = d.purpleTypesByYear[0];
  const lastTypes = d.purpleTypesByYear[d.purpleTypesByYear.length - 1];
  const risers =
    firstTypes && lastTypes && firstTypes !== lastTypes
      ? trendTypes
          .filter((k) => k !== "blank")
          .map((k) => ({ k, from: yearShare(firstTypes, k), to: yearShare(lastTypes, k) }))
          .filter((r) => r.to - r.from >= 0.03)
          .sort((a, b) => b.to - b.from - (a.to - a.from))
          .slice(0, 2)
      : [];

  const faq: DateFaqItem[] = [
    {
      question: "What is the most common word in NYT Connections?",
      answer: top
        ? `${top.word}, with ${top.total} appearances in ${n(d.puzzles)} puzzles, followed by ${d.topWords
            .slice(1, 5)
            .map((w) => `${w.word} (${w.total})`)
            .join(", ")}. The count runs from puzzle #${d.firstId} to #${d.lastId} and updates every day.`
        : "Not enough data yet.",
    },
    {
      question: "How many different words have been used in Connections?",
      answer: `${n(d.distinct)} different words have filled the ${n(d.cells)} squares of ${n(d.puzzles)} puzzles. ${n(d.usedOnce)} of them (${pct(onceShare)}) have appeared exactly once.`,
    },
    {
      question: "Do NYT Connections words repeat?",
      answer: `Constantly. ${pct(repeatSlots)} of all squares hold a word that had already appeared in an earlier puzzle, and ${n(d.usedFivePlus)} words have appeared five times or more. Most repeats change color, which is what makes them good traps.`,
    },
    {
      question: "Which words have appeared in all four Connections colors?",
      answer: `${n(d.rainbow.length)} words have been yellow, green, blue and purple at least once each — led by ${d.rainbow
        .slice(0, 5)
        .map((w) => w.word)
        .join(", ")}. The full list is on this page.`,
    },
    {
      question: "How often is the purple group a fill-in-the-blank?",
      answer:
        firstYear && lastYear
          ? `${pct(blankTotal / Math.max(1, purpleTotal))} of all purple groups so far (${n(blankTotal)} of ${n(purpleTotal)}). The share has fallen from ${pct(firstYear.share)} in ${firstYear.year} to ${pct(lastYear.share)} in ${lastYear.year}.`
          : "Not enough data yet.",
    },
    {
      question: "Has NYT ever reused the exact same group of four words?",
      answer: topGroup
        ? `Yes — ${d.repeatedGroups.length} sets of four have run more than once. ${topGroup.words.join(" / ")} has appeared ${topGroup.puzzles.length} times, most recently in #${topGroup.puzzles[topGroup.puzzles.length - 1].id}.`
        : "Not so far.",
    },
    {
      question: "Where can I see my own Connections stats?",
      answer:
        "In the game: they appear after you finish a puzzle, and the bar-graph icon at the top right opens them mid-game. NYT counts puzzles you've played since June 15, 2024, and a puzzle finished after local midnight breaks your streak.",
    },
  ];

  return (
    <div className="w-full">
      <JsonLd
        data={articleSchema({
          title: "NYT Connections Statistics (Updated Daily)",
          description: "Statistics computed from every past NYT Connections puzzle: word frequency, colors, categories and repeats.",
          url: pageUrl,
          datePublished: "2026-10-27T00:00:00Z",
          dateModified: `${today}T06:00:00Z`,
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: "NYT Connections puzzle statistics",
          description: `Word frequency, color distribution, category types and repeats across ${n(d.puzzles)} NYT Connections puzzles (#${d.firstId}–#${d.lastId}), recomputed daily.`,
          url: pageUrl,
          temporalCoverage: `${d.firstDate}/${d.lastDate}`,
          dateModified: today,
          isAccessibleForFree: true,
          creator: { "@type": "Organization", name: "WordleHint", url: BASE_URL },
          variableMeasured: [
            "Appearances per word and color",
            "Category type by color",
            "Fill-in-the-blank share of purple groups by year",
            "Repeated category names, groups and word pairs",
          ],
        }}
      />
      <JsonLd data={faqPageSchema(faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Connections Answers", url: `${BASE_URL}/connections-answers` },
          { name: "Connections Stats", url: pageUrl },
        ])}
      />

      {/* Compact masthead: the numbers and the lookup start on the first screen. */}
      <section className="border-b border-border bg-gradient-to-b from-slate-900 to-slate-800" style={{ boxShadow: `inset 0 3px 0 ${PURPLE}` }}>
        <div className="mx-auto max-w-4xl px-4 pb-6 pt-6 sm:px-6 sm:pt-8">
          <h1 className="font-heading text-2xl font-bold leading-tight text-white sm:text-4xl">
            NYT Connections Statistics (Updated Daily)
          </h1>
          <p className="mt-2 font-mono text-xs text-slate-400">
            {n(d.puzzles)} puzzles · #{d.firstId}–#{d.lastId} · {range} · Updated{" "}
            <time dateTime={today}>{formatLongDate(today)}</time>
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <FactCards
          facts={[
            { value: n(d.puzzles), label: "puzzles analyzed, all before today" },
            { value: n(d.distinct), label: "different words used" },
            { value: n(d.rainbow.length), label: "words seen in all four colors" },
            top ? { value: top.word, label: `most-used word (${top.total} times)` } : { value: "—", label: "most-used word" },
          ]}
        />

        <section className="mt-8" aria-labelledby="lookup-heading">
          <h2 id="lookup-heading" className="font-heading text-xl font-bold text-foreground sm:text-2xl">
            Look Up Any Word
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Every time a word has appeared in Connections: the puzzle, its color and the category it
            belonged to.
          </p>
          <div className="mt-4">
            <WordLookup lastDate={d.lastDate} />
          </div>
        </section>

        <section className="mt-14 max-w-3xl" aria-labelledby="numbers-heading">
          <h2 id="numbers-heading" className="font-heading text-2xl font-bold text-foreground">
            Connections by the Numbers
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">{n(d.puzzles)} puzzles, {n(d.cells)} squares.</span>{" "}
              Every Connections grid has sixteen words in four groups, from puzzle #{d.firstId} on{" "}
              {formatLongDate(d.firstDate)} to #{d.lastId} on {formatLongDate(d.lastDate)}.
            </li>
            <li>
              <span className="font-semibold text-foreground">{pct(repeatSlots)} of squares are repeats.</span>{" "}
              Only {n(d.distinct)} different words fill those {n(d.cells)} squares, so more than half the
              time a word on the grid has been used before. That is not the same as “most words repeat”:
              {" "}{n(d.usedOnce)} words ({pct(onceShare)}) have appeared exactly once.
            </li>
            <li>
              <span className="font-semibold text-foreground">{n(d.usedFivePlus)} words are regulars.</span>{" "}
              They have appeared five times or more — the core vocabulary worth recognising on sight.
            </li>
            {otherType && blankType && (
              <li>
                <span className="font-semibold text-foreground">Wordplay lives in purple.</span>{" "}
                {pct(blankType.purpleShare)} of fill-in-the-blank groups are purple, against{" "}
                {pct(otherType.purpleShare)} of plain-meaning groups.
              </li>
            )}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="top-heading">
          <h2 id="top-heading" className="font-heading text-2xl font-bold text-foreground">
            The Most-Used Connections Words
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The thirty words that have appeared most often, with the colors they appeared in. Short
            words with several meanings dominate — {d.topWords.slice(0, 3).map((w) => w.word).join(", ")}{" "}
            fit many kinds of group, so NYT keeps coming back to them.
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[22rem] text-sm">
              <thead>
                <tr className="border-b border-border text-left font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th scope="col" className="w-10 px-3 py-2.5 font-normal">#</th>
                  <th scope="col" className="px-3 py-2.5 font-normal">Word</th>
                  <th scope="col" className="px-3 py-2.5 text-right font-normal">Times</th>
                  <th scope="col" className="w-1/2 px-3 py-2.5 font-normal">Colors (Y · G · B · P)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed divide-border">
                {d.topWords.map((w, i) => (
                  <tr key={w.word}>
                    <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{i + 1}</td>
                    <th scope="row" className="px-3 py-2 text-left font-mono font-bold text-foreground">{w.word}</th>
                    <td className="px-3 py-2 text-right font-mono tabular-nums">{w.total}</td>
                    <td className="px-3 py-2">
                      <ColourBar counts={w.counts} scale={scale} />
                      <span className="mt-1 block font-mono text-[11px] text-muted-foreground">
                        {w.counts.join(" · ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="rainbow-heading">
          <h2 id="rainbow-heading" className="font-heading text-2xl font-bold text-foreground">
            Words That Have Been Every Color
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {n(d.rainbow.length)} words have been yellow, green, blue and purple at least once each.
            These are the ones to distrust: seeing one on the grid tells you nothing about which group
            it belongs to. Sorted by total appearances.
          </p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {rainbowShown.map((w) => (
              <li key={w.word} className="rounded-md border border-border bg-card px-2 py-1 font-mono text-xs text-foreground">
                {w.word} <span className="text-muted-foreground">{w.total}</span>
              </li>
            ))}
          </ul>
          {rainbowRest.length > 0 && (
            <details className="mt-3">
              <summary className="cursor-pointer text-sm font-semibold text-primary">
                Show all {n(d.rainbow.length)} words
              </summary>
              <p className="mt-3 font-mono text-xs leading-relaxed text-foreground">
                {rainbowRest.map((w) => `${w.word} ${w.total}`).join(" · ")}
              </p>
            </details>
          )}
        </section>

        <section className="mt-14" aria-labelledby="purple-heading">
          <h2 id="purple-heading" className="font-heading text-2xl font-bold text-foreground">
            What Makes a Purple Group
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Purple is usually the trickiest group because it is about the words themselves rather than
            their meaning. We sorted every category by its name — the rule for each type is in the
            methodology below — and counted which color it landed in.
          </p>
          <ul className="mt-4 space-y-4">
            {d.categoryTypes.map((t) => (
              <li key={t.key}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-semibold text-foreground">
                    {t.label} <span className="font-mono text-xs font-normal text-muted-foreground">{n(t.count)} groups</span>
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    <span className="font-bold" style={{ color: PURPLE }}>{pct(t.purpleShare)}</span> purple
                  </span>
                </div>
                <div className="mt-1.5">
                  <ColourBar counts={t.counts} className="h-3" />
                </div>
                {t.examples.length > 0 && (
                  <p className="mt-1 text-xs text-muted-foreground">e.g. {t.examples.join(" · ")}</p>
                )}
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-heading text-lg font-bold text-foreground">Words Used Most Often in Purple</h3>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            {topPurple
              ? `${topPurple.word} has been purple ${topPurple.counts[3]} times, more than any other word. Each count is out of the word's total appearances in any color.`
              : ""}
          </p>
          <ol className="mt-3 grid gap-2 sm:grid-cols-3">
            {d.topPurple.map((w, i) => (
              <li key={w.word} className="flex items-center justify-between rounded-lg border border-dashed border-border bg-card px-3 py-2 text-sm">
                <span className="font-mono text-foreground">
                  <span className="mr-2 text-xs text-muted-foreground">{i + 1}.</span>
                  {w.word}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {w.counts[3]} of {w.total}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 max-w-3xl" aria-labelledby="trend-heading">
          <h2 id="trend-heading" className="font-heading text-2xl font-bold text-foreground">
            Purple Is Changing: Fill-in-the-Blank by Year
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {firstYear && lastYear
              ? `Fill-in-the-blank used to be purple's signature: ${pct(firstYear.share)} of purple groups in ${firstYear.year}. By ${lastYear.year} it is down to ${pct(lastYear.share)}${
                  risers.length
                    ? `, while ${risers
                        .map((r) => `${typeLabel[r.k].toLowerCase()} rose from ${pct(r.from)} to ${pct(r.to)}`)
                        .join(" and ")}`
                    : ""
                }.`
              : ""}{" "}
            {firstYear ? `${firstYear.year} starts with puzzle #${d.firstId} in June, and ${lastYear?.year} runs to yesterday.` : ""}
          </p>
          <ul className="mt-4 space-y-2">
            {years.map((y) => (
              <li key={y.year} className="grid grid-cols-[3rem_1fr_6.5rem] items-center gap-3">
                <span className="font-mono text-sm text-foreground">{y.year}</span>
                <span className="h-6 overflow-hidden rounded bg-muted">
                  <span className="block h-full rounded" style={{ width: `${(y.share / maxYearShare) * 100}%`, backgroundColor: PURPLE }} />
                </span>
                <span className="text-right font-mono text-xs text-muted-foreground">
                  <span className="font-bold text-foreground">{pct(y.share)}</span> ({y.blanks}/{y.purples})
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-muted-foreground">
            Share of each year&apos;s purple groups whose category contains a blank (___).
          </p>

          <h3 className="mt-8 font-heading text-lg font-bold text-foreground">Purple Groups by Type, Year by Year</h3>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[28rem] text-sm">
              <thead>
                <tr className="border-b border-border text-left font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th scope="col" className="px-4 py-2.5 font-normal">Type</th>
                  {d.purpleTypesByYear.map((y) => (
                    <th key={y.year} scope="col" className="px-3 py-2.5 text-right font-normal">
                      {y.year}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed divide-border">
                {[...trendTypes, "other"].map((k) => (
                  <tr key={k}>
                    <th scope="row" className="px-4 py-2 text-left font-normal text-foreground">{typeLabel[k]}</th>
                    {d.purpleTypesByYear.map((y) => (
                      <td key={y.year} className="px-3 py-2 text-right font-mono tabular-nums">
                        {pct(yearShare(y, k))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Each column adds up to 100% of that year&apos;s purple groups (rounding aside).
          </p>
        </section>

        <section className="mt-14 max-w-3xl" aria-labelledby="repeats-heading">
          <h2 id="repeats-heading" className="font-heading text-2xl font-bold text-foreground">
            Repeats: Categories, Groups and Word Pairs NYT Reuses
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Words are not the only thing that comes back. Category names, word pairs and even whole
            groups of four reappear — worth knowing, because a group you have solved before is a group
            you can spot faster.
          </p>

          <h3 className="mt-6 font-heading text-lg font-bold text-foreground">Category Names Used More Than Once</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {n(d.reusedNameCount)} category names have appeared at least twice. The most frequent:
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {d.topNames.map((c) => (
              <li key={c.name} className="rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground">
                {c.name} <span className="font-mono text-muted-foreground">{c.count}×</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 font-heading text-lg font-bold text-foreground">The Same Four Words, Again</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {d.repeatedGroups.length > 0
              ? `${d.repeatedGroups.length} sets of four words have formed a group more than once. The ten most repeated:`
              : "No group of four has repeated yet."}
          </p>
          <ul className="mt-3 divide-y divide-dashed divide-border rounded-2xl border border-border bg-card">
            {d.repeatedGroups.slice(0, 10).map((g) => (
              <li key={g.words.join("/")} className="px-4 py-2.5 text-sm">
                <span className="font-mono font-bold text-foreground">{g.words.join(" · ")}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {g.puzzles.length} times:{" "}
                  {g.puzzles.map((p, i) => (
                    <span key={p.id}>
                      {i > 0 && ", "}
                      <PuzzleRef id={p.id} date={p.date} /> ({formatShortDate(p.date)})
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 font-heading text-lg font-bold text-foreground">Words That Keep Ending Up Together</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Pairs of words that have shared a group most often. If one shows up, look for its partner.
          </p>
          <ol className="mt-3 grid gap-2 sm:grid-cols-3">
            {d.topPairs.map((p) => (
              <li key={`${p.a}-${p.b}`} className="flex items-center justify-between rounded-lg border border-dashed border-border bg-card px-3 py-2 text-xs">
                <span className="font-mono text-foreground">
                  {p.a} + {p.b}
                </span>
                <span className="font-mono text-muted-foreground">{p.count}×</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 max-w-3xl" aria-labelledby="mine-heading">
          <h2 id="mine-heading" className="font-heading text-2xl font-bold text-foreground">
            Where to Find Your Own Connections Stats
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            This page is about the puzzles. Your personal record lives in the game, according to{" "}
            <a href={NYT_CONNECTIONS_HELP} target="_blank" rel="noopener" className="underline hover:text-foreground">
              NYT&apos;s Connections help page
            </a>
            :
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Your stats appear when you finish a puzzle; mid-game, the bar-graph icon at the top right opens them.</li>
            <li>They cover puzzles completed, win rate, current and max streak, and how many puzzles you solved with 0 to 4 mistakes.</li>
            <li>They count puzzles played from June 15, 2024 onwards and follow your New York Times account across devices.</li>
            <li>A puzzle finished after midnight local time breaks your streak, and a broken streak can&apos;t be restored.</li>
            <li>Archive puzzles count toward your totals and win rate, but not toward streaks.</li>
          </ul>
        </section>

        <section className="mt-14 max-w-3xl" aria-labelledby="method-heading">
          <h2 id="method-heading" className="font-heading text-2xl font-bold text-foreground">
            How We Count
          </h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">Source.</span> Each puzzle is NYT&apos;s own data, saved the
              day it goes live. On the few picture-card editions, the words are NYT&apos;s alt text for each card.
            </li>
            <li>
              <span className="font-semibold text-foreground">Range.</span> Every puzzle before today — #{d.firstId} to
              #{d.lastId} — so nothing here gives away today&apos;s grid. The page rebuilds with each new puzzle.
            </li>
            <li>
              <span className="font-semibold text-foreground">Counting.</span> A word counts once per puzzle it appears
              in. Colors are NYT&apos;s four difficulty levels: yellow, green, blue, purple.
            </li>
            <li>
              <span className="font-semibold text-foreground">Category types.</span> Matched on the category name, first
              rule wins:{" "}
              {d.categoryTypes.map((t, i) => (
                <span key={t.key}>
                  {i > 0 && "; "}
                  {t.label.toLowerCase()} — {t.rule}
                </span>
              ))}
              . Names that fit none of them are counted as everything else.
            </li>
            <li>
              <span className="font-semibold text-foreground">What we don&apos;t measure.</span> Without players&apos; results
              there&apos;s no honest way to rate a puzzle&apos;s difficulty, so this page doesn&apos;t try.
            </li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Every past puzzle, searchable:{" "}
            <Link href="/connections-answers" className="font-semibold text-primary hover:text-primary/80">
              Connections answers archive →
            </Link>{" "}
            · Today&apos;s puzzle, spoiler-safe:{" "}
            <Link href="/connections-hint-today" className="font-semibold text-primary hover:text-primary/80">
              Connections hint today →
            </Link>
          </p>
        </section>

        <div className="max-w-3xl">
          <DateFaq heading="Connections Stats FAQ" items={faq} />
        </div>
      </div>
    </div>
  );
}
