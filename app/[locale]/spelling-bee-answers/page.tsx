import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  itemListSchema,
  JsonLd,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import {
  getRecentSpellingBee,
  getSpellingBeeScoring,
  getTodaySpellingBee,
  getYesterdaySpellingBee,
} from "@/lib/spelling-bee-daily";
import { getTodayDateString } from "@/lib/wordle-daily";
import {
  FAQ_ITEMS,
  PAGE_META,
  PANGRAM_DEFINITION,
  RELATED_GAMES,
  SECTIONS,
  SPELLING_BEE_DEFINITION,
} from "@/data/spelling-bee/content";
import AnswersFAQ from "@/components/wordle-answers/AnswersFAQ";
import RelatedTools from "@/components/wordle-answers/RelatedTools";
import SpoilerCurtain from "@/components/wordle-answers/SpoilerCurtain";
import AnswerGroups from "@/components/spelling-bee/AnswerGroups";
import RankTable from "@/components/spelling-bee/RankTable";
import SpellingBeeHive from "@/components/spelling-bee/SpellingBeeHive";
import StatsTrio from "@/components/spelling-bee/StatsTrio";
import WordCard from "@/components/spelling-bee/WordCard";
import YesterdayFold from "@/components/spelling-bee/YesterdayFold";
import { ChevronRight, Hexagon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

type Params = Promise<{ locale: string }>;

function formatLong(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
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
  const dateStr = getTodayDateString();
  return constructMetadata({
    page: "SpellingBeeAnswers",
    title: `${PAGE_META.titleBase} — ${dateStr}`,
    description: PAGE_META.descriptionBase,
    keywords: PAGE_META.keywords,
    locale: locale as Locale,
    path: "/spelling-bee-answers",
    canonicalUrl: "/spelling-bee-answers",
    images: ["og/spelling-bee-answers.png"],
  });
}

export default function SpellingBeeAnswersPage() {
  const puzzle = getTodaySpellingBee();
  const today = getTodayDateString();
  const pageUrl = `${BASE_URL}/spelling-bee-answers`;

  if (!puzzle) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          NYT Spelling Bee Answers Today
        </h1>
        <p className="mt-4 text-muted-foreground">
          Today&apos;s Spelling Bee ({today}) isn&apos;t available just yet — it
          publishes automatically once the new puzzle goes live at 3 AM ET.
        </p>
        <Link
          href="/wordle-hint-today"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cta px-5 py-2.5 text-sm font-bold text-cta-foreground"
        >
          Today&apos;s Wordle hint
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const scoring = getSpellingBeeScoring(puzzle);
  const yesterday = getYesterdaySpellingBee();
  const formattedDate = formatLong(puzzle.date);
  const byLength = [...scoring.byLength.entries()];
  const pangramWords = scoring.words.filter((w) => w.isPangram);
  const recent = getRecentSpellingBee(20).filter((p) => p.date !== puzzle.date);

  return (
    <div className="w-full">
      <JsonLd
        data={articleSchema({
          title: `${PAGE_META.titleBase} — ${formattedDate}`,
          description: PAGE_META.descriptionBase,
          url: pageUrl,
          datePublished: `${puzzle.date}T07:00:00Z`,
          dateModified: `${puzzle.date}T07:00:00Z`,
        })}
      />
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />
      <JsonLd
        data={itemListSchema(
          "Recent NYT Spelling Bee puzzles",
          recent.map((p) => `Spelling Bee ${p.date}`)
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Spelling Bee Answers", url: pageUrl },
        ])}
      />

      {/* Hero — core data first, SEO content below the fold */}
      <section className="border-b border-border bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto grid max-w-4xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-wordle-present/30 bg-wordle-present/10 px-4 py-1.5 text-sm font-medium text-wordle-present">
              <Hexagon className="h-4 w-4" />
              {SECTIONS.hero.badge}
            </div>
            <h1 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl">
              Today&apos;s NYT Spelling Bee Answers —{" "}
              <time dateTime={puzzle.date}>{formattedDate}</time>
            </h1>
            <p className="mt-3 text-slate-300">{SECTIONS.hero.intro}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#todays-answers"
                className="inline-flex items-center gap-2 rounded-xl bg-cta px-6 py-3 text-sm font-bold text-cta-foreground shadow-lg transition-colors hover:bg-cta/90"
              >
                Reveal Today&apos;s Answers
                <ChevronRight className="h-4 w-4 rotate-90" />
              </a>
              <a
                href="https://www.nytimes.com/puzzles/spelling-bee"
                target="_blank"
                rel="noopener nofollow"
                className="text-sm font-semibold text-wordle-present hover:text-wordle-present/80"
              >
                Play on NYT →
              </a>
            </div>
          </div>
          <div>
            <SpellingBeeHive
              centerLetter={puzzle.centerLetter}
              outerLetters={puzzle.outerLetters}
            />
            <div className="mt-6">
              <StatsTrio
                totalWords={scoring.totalWords}
                totalPoints={scoring.totalPoints}
                geniusScore={scoring.geniusScore}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Pangram */}
        <section aria-labelledby="pangram-heading">
          <h2
            id="pangram-heading"
            className="font-heading text-2xl font-bold text-foreground"
          >
            {SECTIONS.pangram.heading} (
            <time dateTime={puzzle.date}>{puzzle.date}</time>)
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {SECTIONS.pangram.intro}
          </p>
          <SpoilerCurtain
            date={`${puzzle.date}-bee-pangram`}
            label={`Reveal today's pangram${pangramWords.length > 1 ? "s" : ""}`}
            className="mt-5"
          >
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {pangramWords.map((w) => (
                <WordCard key={w.word} word={w} />
              ))}
            </ul>
          </SpoilerCurtain>
        </section>

        {/* All answers */}
        <section id="todays-answers" className="mt-14 scroll-mt-24">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.answers.heading}
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {SECTIONS.answers.intro}
          </p>
          <div className="mt-6">
            <AnswerGroups byLength={byLength} date={puzzle.date} />
          </div>
        </section>

        {/* Genius score & ranks */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.genius.heading}
          </h2>
          <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
            {SECTIONS.genius.subQuestion}
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {SECTIONS.genius.subAnswer}{" "}
            <strong className="text-foreground">
              Today you need {scoring.geniusScore} points for Genius
            </strong>{" "}
            out of a possible {scoring.totalPoints}.
          </p>
          <h3 className="mt-8 font-heading text-lg font-semibold text-foreground">
            {SECTIONS.genius.tableHeading}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {SECTIONS.genius.tableIntro}
          </p>
          <div className="mt-5 rounded-xl border border-border bg-card p-5">
            <RankTable ranks={scoring.ranks} totalPoints={scoring.totalPoints} />
          </div>
        </section>

        {/* Yesterday */}
        {yesterday && (
          <section id="yesterday" className="mt-14 scroll-mt-24">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              {SECTIONS.yesterday.heading}
            </h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {SECTIONS.yesterday.intro}
            </p>
            <div className="mt-5">
              <YesterdayFold puzzle={yesterday} />
            </div>
          </section>
        )}

        {/* Recent archive */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Recent Spelling Bee Answers
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Full word lists and pangrams for the last few puzzles — spoiler-free
            until you open a day.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {recent.slice(0, 8).map((p) => {
              const s = getSpellingBeeScoring(p);
              return (
                <Link
                  key={p.date}
                  href={`/spelling-bee-answers/${p.date}`}
                  className="group rounded-xl border border-border bg-card p-4 transition-all hover:scale-[1.02] hover:border-wordle-present/60"
                >
                  <time
                    dateTime={p.date}
                    className="font-mono text-xs text-muted-foreground"
                  >
                    {p.date}
                  </time>
                  <h3 className="mt-1 font-heading font-semibold text-foreground">
                    {formatLong(p.date)}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {s.totalWords} words · {s.totalPoints} pts · Genius{" "}
                    {s.geniusScore}
                  </p>
                  <span className="mt-2 inline-block text-xs font-semibold text-cta group-hover:underline">
                    View answers →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Scoring rules */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.scoring.heading}
          </h2>
          {SECTIONS.scoring.body.map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          <h3 className="mt-8 font-heading text-lg font-semibold text-foreground">
            {SECTIONS.scoring.lengthTable.heading}
          </h3>
          <div className="mt-4 max-w-md overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/60">
                <tr>
                  {SECTIONS.scoring.lengthTable.headers.map((h, i) => (
                    <th
                      key={i}
                      className="px-4 py-2.5 text-left font-heading font-semibold text-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {SECTIONS.scoring.lengthTable.rows.map((row, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2.5 font-medium text-foreground">
                      {row[0]}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {row[1]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="mt-8 font-heading text-lg font-semibold text-foreground">
            {SECTIONS.scoring.pangramHeading}
          </h3>
          <blockquote className="mt-3 border-l-4 border-wordle-present bg-muted/40 px-5 py-4 text-foreground">
            <p className="font-medium leading-relaxed">{PANGRAM_DEFINITION}</p>
          </blockquote>
          <h3 className="mt-8 font-heading text-lg font-semibold text-foreground">
            {SECTIONS.scoring.bingoHeading}
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {SECTIONS.scoring.bingoBody}
            {scoring.isBingo && (
              <strong className="text-foreground">
                {" "}
                Today&apos;s puzzle is a bingo.
              </strong>
            )}
          </p>
        </section>

        {/* Strategy */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.strategy.heading}
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {SECTIONS.strategy.intro}
          </p>
          {SECTIONS.strategy.tips.map((tip) => (
            <div key={tip.heading}>
              <h3 className="mt-8 font-heading text-lg font-semibold text-foreground">
                {tip.heading}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {tip.body}
              </p>
              {tip.sub?.map((sub) => (
                <div key={sub.heading}>
                  <h4 className="mt-5 font-heading font-semibold text-foreground">
                    {sub.heading}
                  </h4>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {sub.body}
                  </p>
                </div>
              ))}
            </div>
          ))}
          <p className="mt-6 text-sm text-muted-foreground">
            Sharpening your five-letter instincts helps here too — see our{" "}
            <Link
              href="/best-wordle-starting-words"
              className="font-semibold text-cta hover:underline"
            >
              best Wordle starting words
            </Link>{" "}
            for the letter-frequency habits that carry over.
          </p>
        </section>

        {/* What is */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {SECTIONS.whatIs.heading}
          </h2>
          {SECTIONS.whatIs.body.map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          <blockquote className="mt-4 border-l-4 border-wordle-present bg-muted/40 px-5 py-4 text-foreground">
            <p className="font-medium leading-relaxed">
              {SPELLING_BEE_DEFINITION}
            </p>
          </blockquote>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mt-5">
            <AnswersFAQ
              items={FAQ_ITEMS.map((f, i) => ({
                ...f,
                number: String(i + 1).padStart(2, "0"),
              }))}
            />
          </div>
        </section>

        {/* Related */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            More NYT Puzzle Answers &amp; Hints
          </h2>
          <div className="mt-5">
            <RelatedTools tools={RELATED_GAMES} />
          </div>
        </section>
      </div>
    </div>
  );
}
