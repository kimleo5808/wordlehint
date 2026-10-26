import { BASE_URL } from "@/config/site";
import DateFaq, { type DateFaqItem } from "@/components/date-pages/DateFaq";
import PipsRuleExamples from "@/components/pips/PipsRuleExamples";
import PipsWorkedExample from "@/components/pips/PipsWorkedExample";
import { NYT_PIPS_HELP, PIPS_RULES } from "@/data/pips/content";
import { Locale, LOCALES } from "@/i18n/routing";
import { formatLongDate } from "@/lib/date-pages";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  howToSchema,
  JsonLd,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { getPipsByDate } from "@/lib/pips-daily";
import { getPipsStats } from "@/lib/pips-stats";
import { getTodayDateString } from "@/lib/wordle-daily";
import { BookOpen } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

type Params = Promise<{ locale: string }>;

const PAGE_PATH = "/how-to-play-pips";
/** The very first Pips (#1) — its Easy board is the worked example. */
const EXAMPLE_DATE = "2025-08-18";

const pct = (x: number) => `${Math.round(x * 100)}%`;

const HOWTO_STEPS = [
  { name: "Read the regions", text: "Each coloured region has a condition in its corner: a number, =, ≠, < or >. Grey regions have none." },
  { name: "Start with forced squares", text: "A one-square region marked with a number tells you that square's exact pips." },
  { name: "Fill the extremes", text: "A region that must total 0 is all blanks; one that must reach 6 per square is all sixes." },
  { name: "Think in regions", text: "Most dominoes cross a region border, so plan each region's totals and let the dominoes link them." },
  { name: "Use every domino once", text: "Track which pip values you have left; the last few placements are usually forced." },
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
  const s = getPipsStats();
  return constructMetadata({
    page: "HowToPlayPips",
    title: "How to Play NYT Pips: Rules, Symbols & 7 Strategies",
    description: `Pips rules in plain English, every region symbol explained with diagrams, and 7 strategies backed by ${s.puzzles} days of real NYT Pips puzzles.`,
    keywords: ["how to play pips", "nyt pips rules", "pips strategy", "pips symbols meaning", "pips tips"],
    locale: locale as Locale,
    path: PAGE_PATH,
    canonicalUrl: PAGE_PATH,
    images: ["og/how-to-play-pips.png"],
  });
}

export default function HowToPlayPipsPage() {
  const s = getPipsStats();
  const today = getTodayDateString();
  const pageUrl = `${BASE_URL}${PAGE_PATH}`;
  const { easy, medium, hard } = s.byDifficulty;
  const example = getPipsByDate(EXAMPLE_DATE);
  const share = (lvl: typeof hard, type: string) =>
    lvl.regionMix.find((r) => r.type === type)?.share ?? 0;
  const top = s.topSumTargets;
  const avgStraddle = (easy.straddleShare + medium.straddleShare + hard.straddleShare) / 3;
  const span = `${s.puzzles} days of puzzles (${formatLongDate(s.firstDate)} to ${formatLongDate(s.lastDate)})`;

  const faq: DateFaqItem[] = [
    {
      question: "How do you play Pips?",
      answer:
        "Place every domino on the board so that each coloured region meets the condition in its corner — an exact sum, all equal, all different, or a total below or above a number. Every square is covered by exactly one domino half, and every domino is used once.",
    },
    {
      question: "What do the symbols in Pips mean?",
      answer:
        "A number means the region's dots add up to exactly that number. = means all the same number, ≠ means all different, <N means the region's total is less than N, and >N means more than N. A grey region with no symbol has no condition.",
    },
    {
      question: "Does less than / greater than apply to each square in Pips?",
      answer: `No — it applies to the region's total. A region marked <4 needs all its dots added together to come to 3 or less. In our archive the typical target for these regions is ${hard.lessMedianTarget}, so they usually call for small numbers.`,
    },
    {
      question: "Is a blank domino half zero?",
      answer: "Yes. A blank half counts as 0 pips, which is how a region marked 0 can be filled.",
    },
    {
      question: "How many dominoes are in each Pips puzzle?",
      answer: `On average ${easy.avgDominoes.toFixed(1)} on Easy, ${medium.avgDominoes.toFixed(1)} on Medium and ${hard.avgDominoes.toFixed(1)} on Hard, based on ${span}.`,
    },
    {
      question: "When does a new Pips come out?",
      answer: "Every day at midnight in your own time zone, with all three difficulties at once.",
    },
  ];

  return (
    <div className="w-full">
      <JsonLd
        data={articleSchema({
          title: "How to Play NYT Pips: Rules, Symbols & 7 Strategies",
          description: `Rules, region types and data-backed strategies for NYT Pips, from ${span}.`,
          url: pageUrl,
          datePublished: "2026-10-26T12:00:00Z",
          dateModified: `${today}T06:00:00Z`,
        })}
      />
      <JsonLd data={howToSchema("How to Solve NYT Pips", "A five-step approach to any Pips board.", HOWTO_STEPS)} />
      <JsonLd data={faqPageSchema(faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Pips Answers", url: `${BASE_URL}/pips-answers` },
          { name: "How to Play Pips", url: pageUrl },
        ])}
      />

      <section className="border-b border-border bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <BookOpen className="h-4 w-4" />
            Backed by {s.puzzles} days of real puzzles
          </div>
          <h1 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl">
            How to Play NYT Pips: Rules, Symbols and Strategy
          </h1>
          <p className="mt-3 text-slate-300">
            Pips is the New York Times&apos; daily domino puzzle: place every
            domino so each coloured region meets its condition. This guide covers
            the rules in plain English, every region symbol with a solved
            example, and seven strategies we checked against every Easy, Medium
            and Hard board since the game launched.
          </p>
          <p className="mt-4 font-mono text-xs text-slate-400">
            Updated <time dateTime={today}>{formatLongDate(today)}</time> · Data from NYT Games puzzles
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
            <Link href="/pips-hint-today" className="text-sm font-semibold text-primary hover:text-primary/80">
              Today&apos;s Pips hints →
            </Link>
            <Link href="/pips-answers" className="text-sm font-semibold text-primary hover:text-primary/80">
              Past Pips answers →
            </Link>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          <section aria-labelledby="rules-heading">
            <h2 id="rules-heading" className="font-heading text-2xl font-bold text-foreground">
              Pips Rules in 60 Seconds
            </h2>
            <p className="mt-3">
              Every Pips puzzle gives you a board split into coloured regions and
              a set of dominoes. Each domino has two halves showing 0 to 6 dots —
              a blank half counts as 0. Your job is to place every domino on the
              board, each one covering two squares side by side, either across or
              down.
            </p>
            <p className="mt-3">
              When you finish, every square is covered by exactly one domino half
              and every domino has been used once. We checked this on all{" "}
              {(s.puzzles * 3).toLocaleString("en-US")} boards in our archive:
              not one leaves a square empty or a domino spare. The only thing that
              makes a placement right or wrong is the condition printed in each
              region&apos;s corner. NYT&apos;s{" "}
              <a href={NYT_PIPS_HELP} target="_blank" rel="noopener" className="underline hover:text-foreground">
                help page
              </a>{" "}
              words them like this:
            </p>
            <dl className="mt-4 divide-y divide-dashed divide-border rounded-2xl border border-border bg-card">
              {PIPS_RULES.map((r) => (
                <div key={r.name} className="flex items-start gap-4 px-4 py-3">
                  <dt className="flex w-28 shrink-0 items-center gap-2">
                    <span className="inline-flex h-6 min-w-[1.75rem] items-center justify-center rounded-md border border-border bg-background px-1 font-mono text-xs font-bold text-foreground">
                      {r.symbol || "–"}
                    </span>
                    <span className="text-xs font-semibold text-foreground">{r.name}</span>
                  </dt>
                  <dd className="text-sm">{r.rule}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3">
              Every day brings three separate boards — Easy, Medium and Hard —
              released together at midnight in your time zone. They are different
              puzzles, not one puzzle at three levels, so solving Easy tells you
              nothing about Hard.
            </p>
          </section>

          <section className="pt-10" aria-labelledby="types-heading">
            <h2 id="types-heading" className="font-heading text-2xl font-bold text-foreground">
              Every Region Type Explained
            </h2>
            <p className="mt-3">
              Each of these small boards is solved, so you can see how a condition
              plays out. They are our own examples, not NYT puzzles, and the
              dominoes show their numbers as digits instead of dots.
            </p>
            <div className="mt-5">
              <PipsRuleExamples />
            </div>
            <h3 className="mt-8 font-heading text-lg font-bold text-foreground">Number regions</h3>
            <p className="mt-2">
              The workhorse of the game: {pct(share(hard, "sum"))} of all regions on
              Hard boards are exact sums. A number region that is only one square
              big is a gift — that square must show exactly that many pips. Hard
              boards carry {hard.oneSquarePerBoard.toFixed(1)} of these on average.
              At the other extreme, a region whose target is 0 must be all blanks,
              and one whose target is six times its size must be all sixes.
            </p>
            <h3 className="mt-6 font-heading text-lg font-bold text-foreground">Equal and not-equal regions</h3>
            <p className="mt-2">
              An equal region needs the same number in every square; a not-equal
              region needs every square different. Not-equal is the rarest
              condition in the game — about {pct(share(hard, "unequal"))} of Hard
              regions — while equal regions make up {pct(share(hard, "equals"))}.
            </p>
            <h3 className="mt-6 font-heading text-lg font-bold text-foreground">Less-than and greater-than regions</h3>
            <p className="mt-2">
              These compare the region&apos;s <strong className="text-foreground">total</strong>,
              not each square. That is the most common misreading of the game. The
              targets are small: the typical less-than target is{" "}
              {hard.lessMedianTarget} and the typical greater-than target is{" "}
              {hard.greaterMedianTarget}, so a less-than region usually wants
              blanks and ones.
            </p>
            <h3 className="mt-6 font-heading text-lg font-bold text-foreground">Empty regions</h3>
            <p className="mt-2">
              Grey regions have no condition at all. They are where awkward dominoes
              go — but they still have to be covered, which makes them useful for
              absorbing the half of a domino you needed elsewhere.
            </p>
          </section>

          <section className="pt-10" aria-labelledby="levels-heading">
            <h2 id="levels-heading" className="font-heading text-2xl font-bold text-foreground">
              Easy vs Medium vs Hard
            </h2>
            <p className="mt-3">
              The difficulty jump is mostly about size. Here is what an average
              board looks like at each level, across {span}:
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dashed border-border text-left font-mono text-[11px] uppercase tracking-wider">
                    <th className="px-4 py-2.5"> </th>
                    <th className="px-4 py-2.5">Easy</th>
                    <th className="px-4 py-2.5">Medium</th>
                    <th className="px-4 py-2.5">Hard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dashed divide-border text-foreground">
                  <tr>
                    <td className="px-4 py-2.5 text-muted-foreground">Dominoes (range)</td>
                    {[easy, medium, hard].map((l, i) => (
                      <td key={i} className="px-4 py-2.5 font-mono tabular-nums">
                        {l.avgDominoes.toFixed(1)} ({l.minDominoes}–{l.maxDominoes})
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-muted-foreground">Doubles per board</td>
                    {[easy, medium, hard].map((l, i) => (
                      <td key={i} className="px-4 py-2.5 font-mono tabular-nums">{l.doublesPerBoard.toFixed(1)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-muted-foreground">Boards with a one-square number</td>
                    {[easy, medium, hard].map((l, i) => (
                      <td key={i} className="px-4 py-2.5 font-mono tabular-nums">{pct(l.oneSquareShare)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-muted-foreground">Boards with an all-0 or all-6 region</td>
                    {[easy, medium, hard].map((l, i) => (
                      <td key={i} className="px-4 py-2.5 font-mono tabular-nums">{pct(l.extremeSumShare)}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">
              Hard boards are not just bigger; they also lean harder on exact
              numbers. That sounds tougher, but it is good news for a solver:
              exact numbers — especially one-square ones — are where the
              deductions start.
            </p>
          </section>

          <section className="pt-10" aria-labelledby="strategy-heading">
            <h2 id="strategy-heading" className="font-heading text-2xl font-bold text-foreground">
              7 Pips Strategies Backed by {s.puzzles} Days of Puzzles
            </h2>
            <h3 className="mt-6 font-heading text-lg font-bold text-foreground">1. Start with one-square number regions</h3>
            <p className="mt-2">
              They are the only squares the rules decide on their own, and they
              are common: {pct(hard.oneSquareShare)} of Hard boards have at least
              one. Fill them in first, then ask which dominoes in your set even
              have those numbers — often only one or two do.
            </p>
            <h3 className="mt-6 font-heading text-lg font-bold text-foreground">2. Look for a total of 0 or the maximum</h3>
            <p className="mt-2">
              A region marked 0 is all blanks, and a two-square region marked 12
              is a pair of sixes. {pct(hard.extremeSumShare)} of Hard boards have
              at least one of these, and each one pins down several squares at
              once.
            </p>
            <h3 className="mt-6 font-heading text-lg font-bold text-foreground">3. Think in regions, not dominoes</h3>
            <p className="mt-2">
              About {pct(avgStraddle)} of dominoes in a finished board sit across
              two regions rather than inside one. So instead of asking where a
              domino goes, ask what each region needs, then look for dominoes
              whose halves satisfy two neighbouring regions at the same time.
            </p>
            <h3 className="mt-6 font-heading text-lg font-bold text-foreground">4. Don&apos;t assume an equal region needs a double</h3>
            <p className="mt-2">
              It is tempting to drop a 3–3 into a two-square equal region. Yet
              only {pct(hard.twoSquareEqualsDoubleShare)} of two-square equal
              regions are filled that way; usually the two matching numbers come
              from two different dominoes reaching in from outside. Doubles still
              matter — Hard boards carry {hard.doublesPerBoard.toFixed(1)} of them
              on average — just don&apos;t force them.
            </p>
            <h3 className="mt-6 font-heading text-lg font-bold text-foreground">5. Treat less-than regions as small numbers</h3>
            <p className="mt-2">
              With a typical target of {hard.lessMedianTarget}, a less-than region
              almost always wants blanks and ones. Reading it per square instead
              of as a total is the quickest way to get stuck.
            </p>
            <h3 className="mt-6 font-heading text-lg font-bold text-foreground">6. Keep a running count of your dominoes</h3>
            <p className="mt-2">
              Every domino is used exactly once, so the set itself is a clue. Once
              you have placed the forced pieces, check which numbers are left: if
              only one remaining domino has a 6, it has to go wherever a 6 is
              still needed.
            </p>
            <h3 className="mt-6 font-heading text-lg font-bold text-foreground">7. Be wary of number tips you read online</h3>
            <p className="mt-2">
              A widely shared tip says totals of 11, 12, 17 and 18 come up often.
              In our archive those four targets make up just{" "}
              {pct(s.popularTipShare)} of multi-square number regions. The most
              common target is{" "}
              {top[0] ? `${top[0].target} (${pct(top[0].share)})` : "small"}, followed
              by {top.slice(1, 4).map((t) => t.target).join(", ")}. Solve the
              board in front of you rather than playing the odds.
            </p>
          </section>

          <section className="pt-10" aria-labelledby="routine-heading">
            <h2 id="routine-heading" className="font-heading text-2xl font-bold text-foreground">
              A Five-Step Routine for Any Pips Board
            </h2>
            <p className="mt-3">
              Put the strategies together and you get a routine that works on
              Easy, Medium and Hard alike. Run through it in order, and go back to
              step 2 whenever a placement unlocks something new.
            </p>
            <ol className="mt-4 space-y-3">
              {HOWTO_STEPS.map((step, i) => (
                <li key={step.name} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cta font-mono text-sm font-bold text-cta-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">{step.name}</h3>
                    <p className="mt-1 text-sm">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4">
              An average Easy Pips board has only {easy.avgDominoes.toFixed(1)}{" "}
              dominoes, so there is little to loop through. A Hard board averages{" "}
              {hard.avgDominoes.toFixed(1)}, so expect to cycle through steps 2 to
              5 several times: each forced square narrows the dominoes that can
              reach its neighbours, and the board gives way region by region.
            </p>
          </section>

          {example && (
            <section className="pt-10" aria-labelledby="example-heading">
              <h2 id="example-heading" className="font-heading text-2xl font-bold text-foreground">
                Worked Example: The Very First Pips
              </h2>
              <p className="mt-3">
                Here is the Easy board from Pips #{example.id} ({formatLongDate(example.date)}),
                the first puzzle ever published, solved with the same four steps
                our{" "}
                <Link href="/pips-hint-today" className="font-semibold text-primary hover:text-primary/80">
                  daily hints
                </Link>{" "}
                use.
              </p>
              <div className="mt-5">
                <PipsWorkedExample board={example.easy} />
              </div>
            </section>
          )}

          <section className="pt-10" aria-labelledby="hints-heading">
            <h2 id="hints-heading" className="font-heading text-2xl font-bold text-foreground">
              How Our Pips Hints Work
            </h2>
            <p className="mt-3">
              Our{" "}
              <Link href="/pips-hint-today" className="font-semibold text-primary hover:text-primary/80">
                Pips hints for today
              </Link>{" "}
              follow the same logic as the worked example above, for all three
              boards. Step 1 never gives anything away that the rules don&apos;t
              already say: it points you to a one-square number region, or to a
              region that must be all blanks or all sixes, and tells you what that
              means. Step 2 places the domino on that square. Step 3 fills in half
              of the board, starting with the regions that leave the fewest
              choices, so the rest is yours to finish. Step 4 is NYT&apos;s full
              solution, with a text version listing where every domino goes.
            </p>
            <p className="mt-3">
              Every Pips board since the launch is in the{" "}
              <Link href="/pips-answers" className="font-semibold text-primary hover:text-primary/80">
                Pips answers archive
              </Link>
              , with the same four-step hint mode, so you can practise on old
              puzzles before tackling today&apos;s Hard board.
            </p>
          </section>

          <section className="pt-10" aria-labelledby="mistakes-heading">
            <h2 id="mistakes-heading" className="font-heading text-2xl font-bold text-foreground">
              Common Mistakes
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground">Reading &lt; and &gt; per square.</strong>{" "}
                They limit the region&apos;s total. A region marked &gt;8 can hold a
                6 and a 3.
              </li>
              <li>
                <strong className="text-foreground">Forgetting that blank is 0.</strong>{" "}
                Blanks are how small totals and 0 regions get filled.
              </li>
              <li>
                <strong className="text-foreground">Forcing a double into an equal region.</strong>{" "}
                Most two-square equal regions are filled by two different dominoes.
              </li>
              <li>
                <strong className="text-foreground">Leaving the grey regions for last.</strong>{" "}
                They have no condition, but they still have to be covered — plan
                them as places to put the spare halves.
              </li>
              <li>
                <strong className="text-foreground">Looking for a second solution.</strong>{" "}
                Harder boards occasionally allow more than one arrangement; any
                placement that satisfies every region is accepted.
              </li>
            </ul>
          </section>

          <section className="pt-10" aria-labelledby="makers-heading">
            <h2 id="makers-heading" className="font-heading text-2xl font-bold text-foreground">
              Who Makes Pips
            </h2>
            <p className="mt-3">
              Each board is credited to a constructor. Across our archive the
              boards come from{" "}
              {s.constructors.map((c, i) => (
                <span key={c.name}>
                  {i > 0 ? (i === s.constructors.length - 1 ? " and " : ", ") : ""}
                  <strong className="text-foreground">{c.name}</strong> ({c.boards.toLocaleString("en-US")} boards)
                </span>
              ))}
              . Their names appear under each board on our{" "}
              <Link href="/pips-answers" className="font-semibold text-primary hover:text-primary/80">
                Pips answers
              </Link>{" "}
              pages.
            </p>
          </section>
        </div>

        <DateFaq heading="Pips FAQ" items={faq} />
      </article>
    </div>
  );
}
