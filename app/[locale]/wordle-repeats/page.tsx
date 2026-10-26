import { BASE_URL } from "@/config/site";
import dateConfig from "@/data/date-pages.json";
import DateFaq, { type DateFaqItem } from "@/components/date-pages/DateFaq";
import FactCards from "@/components/date-pages/FactCards";
import SpoilerCurtain from "@/components/wordle-answers/SpoilerCurtain";
import RepeatArcTimeline from "@/components/wordle-repeats/RepeatArcTimeline";
import WordUsageChecker from "@/components/wordle-repeats/WordUsageChecker";
import { Locale, LOCALES } from "@/i18n/routing";
import { formatLongDate, formatShortDate } from "@/lib/date-pages";
import {
  articleSchema,
  breadcrumbSchema,
  datasetSchema,
  faqPageSchema,
  JsonLd,
  softwareApplicationSchema,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { getTodayDateString } from "@/lib/wordle-daily";
import {
  getTodayRepeat,
  getWordleRepeatStats,
  getWordleUsageIndex,
} from "@/lib/wordle-repeats";
import { Repeat } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

type Params = Promise<{ locale: string }>;

const PAGE_PATH = "/wordle-repeats";
const PAGES_START: string = dateConfig.wordle;
const NYT_ANNOUNCEMENT =
  "https://www.nytimes.com/2026/02/01/crosswords/wordle-review-1689.html";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const s = getWordleRepeatStats();
  return constructMetadata({
    page: "WordleRepeats",
    title: "Wordle Repeats: Every Reused Answer Since 2026 (Live)",
    description: `Wordle has reused ${s.repeats.length} past answers since Feb 2, 2026. See every repeat, when each word first ran, how long NYT waits, and check any word.`,
    keywords: [
      "wordle repeats",
      "has wordle repeated answers",
      "wordle repeated words list",
      "does wordle repeat words",
      "wordle reused answers",
    ],
    locale: locale as Locale,
    path: PAGE_PATH,
    canonicalUrl: PAGE_PATH,
    images: ["og/wordle-repeats.png"],
  });
}

function pct(x: number): string {
  return `${(x * 100).toFixed(1)}%`;
}

export default function WordleRepeatsPage() {
  const s = getWordleRepeatStats();
  const today = getTodayDateString();
  const todayRepeat = getTodayRepeat();
  const index = getWordleUsageIndex();
  const yesterday = s.totalPuzzles
    ? Object.values(index)
        .flat()
        .reduce((max, [d]) => (d > max ? d : max), "")
    : today;
  const pageUrl = `${BASE_URL}${PAGE_PATH}`;
  const first = s.first;
  const y2021 = s.byOriginYear.find((y) => y.year === "2021");
  const topYear = [...s.byOriginYear].sort((a, b) => b.repeats - a.repeats)[0];
  const maxYearRepeats = Math.max(1, ...s.byOriginYear.map((y) => y.repeats));

  const faq: DateFaqItem[] = [
    {
      question: "Does Wordle repeat answers?",
      answer: `Yes. Since February 2, 2026, the New York Times has been adding previously used words back into Wordle. Through ${formatShortDate(yesterday)} there have been ${s.repeats.length} repeats — ${pct(s.share)} of the puzzles since the change. Before 2026, no answer had ever repeated.`,
    },
    {
      question: "When did Wordle start repeating answers?",
      answer: `NYT announced it in Wordle Review No. 1,689 (February 1, 2026): "Starting today, we will begin adding previously run words back into play." The first repeat ran the next day.`,
    },
  ];
  if (first) {
    faq.push({
      question: "What was the first repeated Wordle answer?",
      answer: `${first.word}, on ${formatLongDate(first.date)} (Wordle #${first.id}). It was also the very first Wordle answer of all: #${first.previous.id} on ${formatLongDate(first.previous.date)}.`,
    });
  }
  faq.push(
    {
      question: "How often does Wordle repeat a word?",
      answer: `About ${(s.repeats.length / Math.max(1, s.puzzlesSinceFirst / 30.4)).toFixed(1)} times a month so far: ${s.repeats.length} repeats in ${s.puzzlesSinceFirst} puzzles. The shortest wait between a word's two runs has been ${s.minGap.toLocaleString("en-US")} days; the median is ${s.medianGap.toLocaleString("en-US")} days.`,
    },
    {
      question: "Has any Wordle answer been used three times?",
      answer:
        s.maxUses > 2
          ? `Yes — at least one word has now been the answer ${s.maxUses} times.`
          : "Not yet. Every repeated word so far has been the answer exactly twice.",
    },
    {
      question: "Is today's Wordle a repeat?",
      answer:
        "That would narrow down today's answer, so we keep it behind a reveal near the top of this page. The lists and statistics here only include puzzles up to yesterday.",
    }
  );

  return (
    <div className="w-full">
      <JsonLd
        data={articleSchema({
          title: "Wordle Repeats: Every Answer NYT Has Used Twice",
          description: "Every repeated Wordle answer since February 2026, with statistics and a word checker.",
          url: pageUrl,
          datePublished: "2026-10-26T12:00:00Z",
          dateModified: `${today}T06:00:00Z`,
        })}
      />
      <JsonLd
        data={datasetSchema({
          name: "Wordle answer history and repeats",
          description: `Every Wordle answer since #0 (June 19, 2021), with the ${s.repeats.length} answers NYT has reused since February 2, 2026.`,
          url: pageUrl,
          dateModified: today,
          measurementCount: s.totalPuzzles,
        })}
      />
      <JsonLd
        data={softwareApplicationSchema({
          name: "Wordle repeat checker",
          description: "Check whether a word has been a Wordle answer, and on which dates.",
          url: pageUrl,
          applicationCategory: "UtilitiesApplication",
        })}
      />
      <JsonLd data={faqPageSchema(faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Wordle Repeats", url: pageUrl },
        ])}
      />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Repeat className="h-4 w-4" />
            Every answer since #0 · updated daily
          </div>
          <h1 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl">
            Wordle Repeats: Every Answer NYT Has Used Twice
          </h1>
          <p className="mt-3 text-slate-300">
            Yes, Wordle repeats answers now. Since February 2, 2026, the New
            York Times has reused <strong className="text-white">{s.repeats.length} earlier answers</strong>{" "}
            — {pct(s.share)} of the puzzles since the change. Every repeat is
            listed below, and you can check any word&apos;s history.
          </p>
          <p className="mt-4 font-mono text-xs text-slate-400">
            Updated <time dateTime={today}>{formatLongDate(today)}</time> ·
            Puzzle data from NYT Games
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <WordUsageChecker
          index={index}
          pagesStart={PAGES_START}
          throughDate={yesterday}
        />

        {todayRepeat && (
          <section className="mt-8" aria-labelledby="today-heading">
            <h2 id="today-heading" className="font-heading text-lg font-bold text-foreground">
              Is today&apos;s Wordle (#{todayRepeat.id}) a repeat?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              This narrows down today&apos;s answer, so it stays hidden until you
              ask.
            </p>
            <div className="mt-3">
              <SpoilerCurtain date={`${today}-repeat`} label="Reveal: is it a repeat?">
                <div className="rounded-xl border border-border bg-card px-4 py-4 text-sm text-foreground">
                  {todayRepeat.previous ? (
                    <>
                      <strong>Yes.</strong> Today&apos;s answer was also the answer
                      to Wordle #{todayRepeat.previous.id} on{" "}
                      {formatLongDate(todayRepeat.previous.date)}.
                    </>
                  ) : (
                    <>
                      <strong>No.</strong> Today&apos;s answer has never been a
                      Wordle answer before.
                    </>
                  )}
                </div>
              </SpoilerCurtain>
            </div>
          </section>
        )}

        <section className="mt-14" aria-labelledby="does-heading">
          <h2 id="does-heading" className="font-heading text-2xl font-bold text-foreground">
            Does Wordle Repeat Answers?
          </h2>
          <div className="mt-3 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              For its first four and a half years, Wordle never used the same
              answer twice. That changed with the puzzle of February 2, 2026. The
              day before, NYT opened its Wordle Review with the news:
            </p>
            <blockquote className="border-l-4 border-wordle-correct pl-4 italic text-foreground">
              “Starting today, we will begin adding previously run words back
              into play.”
              <footer className="mt-1 not-italic text-xs text-muted-foreground">
                —{" "}
                <a href={NYT_ANNOUNCEMENT} target="_blank" rel="noopener" className="underline hover:text-foreground">
                  The New York Times, Wordle Review No. 1,689
                </a>{" "}
                (Feb 1, 2026)
              </footer>
            </blockquote>
            {first && (
              <p>
                The first repeat was <strong className="text-foreground">{first.word}</strong>{" "}
                (#{first.id}) — the very first Wordle answer of all, from{" "}
                {formatLongDate(first.previous.date)}. Since then the editors have
                mixed in an old word roughly{" "}
                {(s.repeats.length / Math.max(1, s.puzzlesSinceFirst / 30.4)).toFixed(0)}{" "}
                times a month, while most days still bring a word that has never
                been an answer.
              </p>
            )}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="numbers-heading">
          <h2 id="numbers-heading" className="font-heading text-2xl font-bold text-foreground">
            Wordle Repeats in Numbers
          </h2>
          <div className="mt-4">
            <FactCards
              facts={[
                { value: String(s.repeats.length), label: "answers reused since Feb 2, 2026" },
                { value: pct(s.share), label: "of puzzles since then were repeats" },
                { value: s.minGap.toLocaleString("en-US"), label: "days: the shortest wait before a word returned" },
                { value: s.medianGap.toLocaleString("en-US"), label: "days: the median wait" },
              ]}
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {s.maxUses > 2
              ? `At least one word has now been used ${s.maxUses} times.`
              : "No word has been used three times yet."}{" "}
            Counted from {s.totalPuzzles.toLocaleString("en-US")} puzzles (#0
            through yesterday) with {s.uniqueAnswers.toLocaleString("en-US")}{" "}
            different answers.
          </p>
        </section>

        <section className="mt-14" aria-labelledby="timeline-heading">
          <h2 id="timeline-heading" className="font-heading text-2xl font-bold text-foreground">
            Every Repeat on One Timeline
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Each arc joins a word&apos;s earlier run to its return. Hover an arc
            to see the word.
          </p>
          <div className="mt-5 rounded-2xl border border-border bg-card p-3 sm:p-5">
            <RepeatArcTimeline repeats={s.repeats} end={yesterday} />
          </div>
        </section>

        <section className="mt-14" aria-labelledby="origin-heading">
          <h2 id="origin-heading" className="font-heading text-2xl font-bold text-foreground">
            Where Repeats Come From
          </h2>
          {y2021 && topYear && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <strong className="text-foreground">
                {y2021.repeats} of the {s.repeats.length}
              </strong>{" "}
              repeats were first used in 2021, Wordle&apos;s first half-year —
              already {pct(y2021.repeats / Math.max(1, y2021.answersThatYear))} of
              that year&apos;s {y2021.answersThatYear} answers have run twice. So
              far NYT has reached back mostly to the oldest words.
            </p>
          )}
          <ul className="mt-4 space-y-2">
            {s.byOriginYear.map((y) => (
              <li key={y.year} className="grid items-center gap-3" style={{ gridTemplateColumns: "3.5rem 1fr 4.5rem" }}>
                <span className="font-mono text-sm font-bold text-foreground">{y.year}</span>
                <span className="h-3 overflow-hidden rounded-full bg-muted">
                  <span
                    className="block h-full rounded-full bg-wordle-correct"
                    style={{ width: `${(y.repeats / maxYearRepeats) * 100}%` }}
                  />
                </span>
                <span className="text-right font-mono text-xs tabular-nums text-muted-foreground">
                  {y.repeats} repeat{y.repeats === 1 ? "" : "s"}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="list-heading">
          <h2 id="list-heading" className="font-heading text-2xl font-bold text-foreground">
            Every Repeated Wordle Answer
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Newest first, through yesterday.</p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-dashed border-border text-left font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-2.5 py-2.5 sm:px-4">Word</th>
                  <th className="px-2.5 py-2.5 sm:px-4">Repeated</th>
                  <th className="px-2.5 py-2.5 sm:px-4">Previously</th>
                  <th className="px-2.5 py-2.5 sm:px-4 text-right">Gap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed divide-border">
                {s.repeats.map((r) => (
                  <tr key={`${r.word}-${r.date}`}>
                    <td className="px-2.5 py-2.5 sm:px-4 font-mono font-bold text-foreground">{r.word}</td>
                    <td className="px-2.5 py-2.5 sm:px-4">
                      {r.date >= PAGES_START ? (
                        <Link href={`/wordle-hint/${r.date}`} className="font-semibold text-primary hover:text-primary/80">
                          #{r.id}
                        </Link>
                      ) : (
                        <span className="font-semibold text-foreground">#{r.id}</span>
                      )}{" "}
                      <span className="text-muted-foreground">{formatShortDate(r.date)}</span>
                    </td>
                    <td className="px-2.5 py-2.5 sm:px-4 text-muted-foreground">
                      #{r.previous.id} · {formatShortDate(r.previous.date)}
                    </td>
                    <td className="whitespace-nowrap px-2.5 py-2.5 sm:px-4 text-right font-mono tabular-nums text-muted-foreground">
                      {r.gapDays.toLocaleString("en-US")} d
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="guesses-heading">
          <h2 id="guesses-heading" className="font-heading text-2xl font-bold text-foreground">
            What Repeats Mean for Your Guesses
          </h2>
          <div className="mt-3 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              For years, a popular shortcut was to rule out any word that had
              already been an answer. That no longer works: an old answer can come
              back on any day. The odds are still on your side, though —{" "}
              {Math.round((1 - s.share) * 100)}% of the puzzles since the change
              have been words that were never an answer before.
            </p>
            <p>
              Repeats so far have also come back only after a long wait: never
              sooner than {s.minGap.toLocaleString("en-US")} days after their
              previous run
              {s.minGap > 365
                ? ", so no word from the past year has returned yet."
                : "."}{" "}
              The{" "}
              <Link href="/wordle-solver" className="font-semibold text-primary hover:text-primary/80">
                Wordle solver
              </Link>{" "}
              marks earlier answers instead of hiding them, and the{" "}
              <Link href="/wordle-answers" className="font-semibold text-primary hover:text-primary/80">
                list of past answers
              </Link>{" "}
              shows recent ones with their meanings.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="method-heading">
          <h2 id="method-heading" className="font-heading text-2xl font-bold text-foreground">
            How We Track This
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            We store every Wordle answer from #0 (June 19, 2021) onward, taken
            from the puzzle data NYT publishes for each day, and the page rebuilds
            just after midnight Eastern Time. A repeat is any answer that matches
            an earlier answer exactly. Today&apos;s puzzle is left out of the
            lists, the statistics and the checker until tomorrow, so nothing here
            gives today&apos;s word away.
          </p>
        </section>

        <DateFaq heading="Wordle Repeats FAQ" items={faq} />

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/wordle-hint-today" className="text-sm font-semibold text-primary hover:text-primary/80">
            Today&apos;s Wordle hint →
          </Link>
          <Link href="/wordle-answers" className="text-sm font-semibold text-primary hover:text-primary/80">
            Past Wordle answers →
          </Link>
          <Link href="/wordle-solver" className="text-sm font-semibold text-primary hover:text-primary/80">
            Wordle solver →
          </Link>
        </div>
      </div>
    </div>
  );
}
