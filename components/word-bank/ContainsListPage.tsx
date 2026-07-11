import { BASE_URL } from "@/config/site";
import { Link as I18nLink } from "@/i18n/routing";
import {
  breadcrumbSchema,
  faqPageSchema,
  itemListSchema,
  JsonLd,
} from "@/lib/jsonld";
import {
  answeredWordsContaining,
  commonContainingByStart,
  groupByPosition,
  positionStats,
} from "@/lib/word-bank";
import { SectionHeading, StatCard } from "@/components/word-bank/primitives";
import { RoamingTiles, Tile, TilePattern, TileWord } from "@/components/word-bank/tiles";
import { PositionMap } from "@/components/word-bank/PositionMap";
import { WordGrid } from "@/components/word-bank/WordGrid";
import type { LetterContent } from "@/components/word-bank/LetterListPage";
import {
  ArrowRight,
  CalendarClock,
  Clock,
  Lightbulb,
  ListChecks,
  Shuffle,
  Sparkles,
} from "lucide-react";

const START_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const RELATED = [
  { href: "/wordle-solver", title: "Wordle Solver", desc: "Filter by green, yellow and gray letters to crack any board.", icon: ListChecks },
  { href: "/best-wordle-starting-words", title: "Best Starting Words", desc: "Data-ranked opening words to win in fewer guesses.", icon: Sparkles },
  { href: "/wordle-hint-today", title: "Today's Wordle Hint", desc: "Progressive clues for today's puzzle — reveal only what you need.", icon: Lightbulb },
  { href: "/wordle-unlimited", title: "Wordle Unlimited", desc: "Practice endless Wordle puzzles with no daily limit.", icon: Shuffle },
  { href: "/wordle-answers", title: "Past Wordle Answers", desc: "The full archive of previous daily answers.", icon: CalendarClock },
  { href: "/5-letter-words", title: "5-Letter Words Hub", desc: "Browse five-letter words by starting, ending and contained letters.", icon: ArrowRight },
];

function fillFaq(answer: string, n: number, common: number, answered: number) {
  return answer
    .replace("{N}", n.toLocaleString())
    .replace("{COMMON}", common.toLocaleString())
    .replace("{ANSWERED}", String(answered));
}

/** Shared template for every "5 letter words with X" landing page. */
export function ContainsListPage({ content }: { content: LetterContent }) {
  const L = content.letter.toUpperCase();
  const stats = positionStats(L);
  const groups = groupByPosition(L);
  const answered = answeredWordsContaining(L);
  const faq = content.faq.map((f) => ({
    question: f.question,
    answer: fillFaq(f.answer, stats.total, stats.common, stats.answered),
  }));

  const byStart = START_LETTERS.map((s) => ({
    start: s,
    words: commonContainingByStart(s, L, 6),
  })).filter((x) => x.words.length > 0);

  const jumpLinks = [
    { href: "#best-openers", label: "Best openers" },
    { href: "#positions", label: "Where it sits" },
    { href: "#full-list", label: "Full list" },
    { href: "#past-answers", label: "Past answers" },
    { href: "#strategy", label: "Strategy" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "5 Letter Words", url: `${BASE_URL}/5-letter-words` },
          { name: "Contains", url: `${BASE_URL}/5-letter-words/with` },
          { name: `With ${L}`, url: `${BASE_URL}${content.path}` },
        ])}
      />
      <JsonLd data={faqPageSchema(faq)} />
      <JsonLd
        data={itemListSchema(
          `Best 5-letter Wordle words with ${L}`,
          content.openers.map((o) => o.word)
        )}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
      >
        <I18nLink href="/" className="hover:text-foreground">
          Home
        </I18nLink>
        <span aria-hidden>/</span>
        <I18nLink href="/5-letter-words" className="hover:text-foreground">
          5 Letter Words
        </I18nLink>
        <span aria-hidden>/</span>
        <I18nLink href="/5-letter-words/with" className="hover:text-foreground">
          Contains
        </I18nLink>
        <span aria-hidden>/</span>
        <span className="text-foreground">With {L}</span>
      </nav>

      {/* HERO */}
      <header className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-10 sm:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08]"
          style={{
            backgroundImage: "url(/illustrations/dot-grid.svg)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 hidden h-56 w-56 rounded-full bg-wordle-present/10 blur-3xl lg:block"
        />

        <div className="relative z-10 max-w-2xl animate-fade-in-up">
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              5-Letter Word List
            </span>
          </div>

          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            5 Letter Words With {L}
          </h1>

          {/* Pattern cue: the yellow letter hops — it's in the word, not the slot. */}
          <div className="mt-5">
            <RoamingTiles letter={L} size="md" />
          </div>

          <p className="mt-4 text-lg text-muted-foreground">
            {content.heroSubhead}
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            Last updated: {content.lastUpdated}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
            <StatCard tone="present" value={stats.total.toLocaleString()} label={`words with ${L}`} />
            <StatCard tone="present" value={stats.common.toLocaleString()} label="common answer words" />
            <StatCard tone="present" value={content.topOpener} label={`top-rated word with ${L}`} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {jumpLinks.map((j) => (
              <a
                key={j.href}
                href={j.href}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-wordle-present hover:text-wordle-present"
              >
                {j.label}
              </a>
            ))}
          </div>
        </div>

        <div className="relative mt-8 flex flex-col items-start gap-3 rounded-2xl bg-cta p-5 text-cta-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-lg font-bold">
              Stuck on today&apos;s puzzle?
            </p>
            <p className="text-sm opacity-90">
              Get progressive hints for today&apos;s Wordle — reveal only what
              you need.
            </p>
          </div>
          <I18nLink
            href="/wordle-hint-today"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
          >
            Today&apos;s Hint <ArrowRight className="h-4 w-4" />
          </I18nLink>
        </div>
      </header>

      {/* Intro */}
      <section className="mt-10 max-w-3xl space-y-4 text-[15px] leading-relaxed text-muted-foreground">
        <p>
          There are{" "}
          <strong className="text-foreground">
            {stats.total.toLocaleString()} five-letter words that contain {L}
          </strong>{" "}
          in the Wordle dictionary, and{" "}
          <strong className="text-foreground">{stats.common.toLocaleString()}</strong>{" "}
          of them are common answer-pool words. A{" "}
          <strong className="text-wordle-present">yellow {L}</strong> in Wordle
          means {L} is in the answer, just not in the slot you guessed — so the
          strongest word to play next is{" "}
          <strong className="text-foreground">{content.topOpener}</strong>.
        </p>
        {content.introExtra}
      </section>

      {/* BEST OPENERS */}
      <section className="mt-12">
        <SectionHeading id="best-openers" title={`Best Wordle Words With ${L}`} />
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          {content.openersIntro}
        </p>

        <div className="mt-5 hidden overflow-hidden rounded-2xl border border-border md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Word</th>
                <th className="px-4 py-3 font-medium">Letters tested</th>
                <th className="px-4 py-3 font-medium">Why it works</th>
              </tr>
            </thead>
            <tbody>
              {content.openers.map((o) => (
                <tr
                  key={o.word}
                  className="border-t border-border transition-colors even:bg-muted/30 hover:bg-wordle-present/5"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <TileWord word={o.word} size="xs" highlightLetter={L} />
                      {o.best && (
                        <span className="rounded bg-wordle-present px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                          Best
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {o.tests}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{o.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 grid gap-3 md:hidden">
          {content.openers.map((o) => (
            <div key={o.word} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2">
                <TileWord word={o.word} size="xs" highlightLetter={L} />
                {o.best && (
                  <span className="rounded bg-wordle-present px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                    Best
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{o.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POSITION MAP */}
      <section className="mt-12">
        <SectionHeading id="positions" title={`Where Does ${L} Usually Sit?`} />
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          When you have a yellow {L}, the position it lands in is the whole game.
          Here is how the {stats.total.toLocaleString()} five-letter words with{" "}
          {L} distribute {L} across the five slots — play the likeliest open slot
          first.
        </p>
        <div className="mt-5">
          <PositionMap letter={L} positions={stats.positions} />
        </div>
      </section>

      {/* COMPLETE LIST */}
      <section className="mt-12">
        <SectionHeading
          id="full-list"
          title={`Complete List of 5-Letter Words With ${L}`}
          count={`${stats.total.toLocaleString()} words`}
        />
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          Every valid five-letter word containing {L}, grouped by the slot where
          the {L} first appears. Common answer-pool words are listed first; tap
          any highlighted word for its definition. A{" "}
          <span className="inline-block h-2 w-2 translate-y-[1px] rounded-full bg-wordle-present" />{" "}
          dot marks words that have already been a Wordle answer.
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {groups.map((g) => (
            <a
              key={g.index}
              href={`#slot-${g.index}`}
              className="rounded-md border border-border bg-background px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-wordle-present hover:text-wordle-present"
            >
              {g.label}
              <sup className="ml-0.5 text-[9px] opacity-70">{g.total}</sup>
            </a>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          {groups.map((g, i) => (
            <details
              key={g.index}
              id={`slot-${g.index}`}
              open={i < 3}
              className="group scroll-mt-24 rounded-2xl border border-border bg-card"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 sm:px-5">
                <span className="flex items-center gap-3">
                  <span className="font-mono text-lg font-bold text-foreground">
                    {L} · {g.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {g.total} words
                    {g.commonCount > 0 && ` · ${g.commonCount} common`}
                  </span>
                </span>
                <span className="text-muted-foreground transition-transform group-open:rotate-180">
                  <ArrowRight className="h-4 w-4 rotate-90" />
                </span>
              </summary>
              <div className="border-t border-border px-4 py-4 sm:px-5">
                <WordGrid words={g.words} highlightLetter={L} />
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* PAST ANSWERS */}
      <section className="mt-12">
        <SectionHeading id="past-answers" title={`Words With ${L} That Have Been Wordle Answers`} />
        <div className="mt-5 flex flex-col gap-6 rounded-2xl border-2 border-wordle-present/40 bg-wordle-present/5 p-6 sm:flex-row sm:items-start">
          <img
            src="/illustrations/past-answers-cal.svg"
            alt="Calendar marking past Wordle answers"
            width={84}
            height={84}
            className="shrink-0 text-foreground"
          />
          <div className="min-w-0">
            <p className="font-heading text-2xl font-bold text-foreground">
              {stats.answered} words with {L} have been official Wordle answers
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              These have already appeared as daily solutions in the puzzles we
              track. Since the NYT almost never repeats an answer, they are
              lower-probability guesses for today — handy to rule out.
            </p>
            {answered.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {answered.slice(0, 24).map((w) => (
                  <span
                    key={w}
                    className="rounded-md border border-border bg-background px-2 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {w}
                  </span>
                ))}
              </div>
            )}
            <I18nLink
              href="/wordle-answers"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-wordle-present hover:underline"
            >
              See the full Wordle answer archive <ArrowRight className="h-4 w-4" />
            </I18nLink>
          </div>
        </div>
      </section>

      {/* STRATEGY */}
      <section className="mt-12">
        <SectionHeading id="strategy" title={`How to Use a Yellow ${L} in Wordle`} />
        <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            {content.strategyParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-5">
              <img
                src="/illustrations/solve-strategy-board-present.svg"
                alt={`Mini Wordle board showing a yellow ${L} moving to a new column`}
                width={260}
                height={312}
                className="mx-auto text-foreground"
              />
            </div>
          </aside>
        </div>
      </section>

      {/* BY STARTING LETTER */}
      <section className="mt-12">
        <SectionHeading id="by-start" title={`5-Letter Words With ${L} by Starting Letter`} />
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          Already know the first letter too? These are the most common answer
          words that both start with each letter and contain {L}.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {byStart.map(({ start, words }) => (
            <div key={start} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <TilePattern filled={{ 0: start }} size="xs" />
                <I18nLink
                  href={`/5-letter-words/starting-with-${start.toLowerCase()}`}
                  className="text-xs font-medium text-wordle-present hover:underline"
                >
                  {start} words
                </I18nLink>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {words.map((w) => (
                  <span key={w} className="font-mono text-sm text-muted-foreground">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <SectionHeading id="faq" title="Frequently Asked Questions" />
        <div className="mt-5 space-y-3">
          {faq.map((f) => (
            <details
              key={f.question}
              className="group rounded-2xl border border-border bg-card px-5 py-4"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-heading text-base font-semibold text-foreground">
                {f.question}
                <span className="text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {f.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* RELATED TOOLS */}
      <section className="mt-12">
        <SectionHeading title="Related Wordle Tools & Lists" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RELATED.map((r) => {
            const Icon = r.icon;
            return (
              <I18nLink
                key={r.href}
                href={r.href}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-wordle-present"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-wordle-present/10 text-wordle-present">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 flex items-center gap-1 font-heading font-bold text-foreground">
                  {r.title}
                  <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
              </I18nLink>
            );
          })}
        </div>
      </section>

      {/* AUTHOR BIO */}
      <section className="mt-12">
        <div className="flex items-center gap-4 rounded-xl bg-muted p-5">
          <Tile letter={L} state="present" size="lg" />
          <div className="text-sm">
            <p className="font-heading font-bold text-foreground">
              WordleHint Editorial Team
            </p>
            <p className="mt-1 text-muted-foreground">
              We track every NYT Wordle answer and test opening strategies daily.{" "}
              <I18nLink href="/about" className="text-wordle-present hover:underline">
                About us
              </I18nLink>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
