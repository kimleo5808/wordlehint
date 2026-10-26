import { BASE_URL } from "@/config/site";
import AlsoOnStrip from "@/components/date-pages/AlsoOnStrip";
import DateFaq, { type DateFaqItem } from "@/components/date-pages/DateFaq";
import DatePageHeader from "@/components/date-pages/DatePageHeader";
import DatePageNav from "@/components/date-pages/DatePageNav";
import FactCards from "@/components/date-pages/FactCards";
import StrandsPathBoard from "@/components/strands/StrandsPathBoard";
import { Locale, LOCALES } from "@/i18n/routing";
import {
  formatLongDate,
  formatShortDate,
  getAlsoOnDate,
  getStrandsDatePages,
  getStrandsNeighbors,
} from "@/lib/date-pages";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  JsonLd,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { getStrandsByDate } from "@/lib/strands-daily";
import { getStrandsNotes } from "@/lib/strands-notes";
import type { StrandsPuzzle } from "@/types/strands";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ locale: string; date: string }>;

export async function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getStrandsDatePages().map((p) => ({ locale, date: p.date }))
  );
}

export const dynamicParams = false;

function getPage(date: string): StrandsPuzzle | undefined {
  return getStrandsDatePages().some((p) => p.date === date)
    ? getStrandsByDate(date)
    : undefined;
}

function listWords(words: string[]): string {
  if (words.length <= 1) return words.join("");
  return `${words.slice(0, -1).join(", ")} and ${words[words.length - 1]}`;
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
    page: "StrandsDate",
    title: `Strands #${puzzle.id} Hints, Spangram & Answers — ${short}`,
    description: `NYT Strands #${puzzle.id} (${short}): the theme clue, a spangram hint, then every answer traced on the board, with notes on each word.`,
    keywords: [
      `strands #${puzzle.id}`,
      `strands answers ${formatLongDate(date).split(", ")[1].toLowerCase()}`,
      `strands spangram ${date}`,
      "nyt strands answers",
    ],
    locale: locale as Locale,
    path: `/strands-answers/${date}`,
    canonicalUrl: `/strands-answers/${date}`,
    images: [`og/strands/${date}.png`],
  });
}

export default async function StrandsDatePage({ params }: { params: Params }) {
  const { date } = await params;
  const puzzle = getPage(date);
  if (!puzzle) notFound();
  const notes = getStrandsNotes(date);
  if (!notes) notFound();

  const longDate = formatLongDate(date);
  const shortDate = formatShortDate(date);
  const pageUrl = `${BASE_URL}/strands-answers/${date}`;
  const neighbors = getStrandsNeighbors(date);
  const repeated = notes.words.filter((w) => w.seenBefore);
  const sp = puzzle.spangram;

  const summary = `NYT Strands #${puzzle.id} (${longDate}) had the theme clue “${puzzle.clue}”. The spangram is ${sp.length} letters long and runs ${notes.spangramDirection}; ${puzzle.themeWords.length} theme words fill the rest of the board. Every answer is traced below — switch to hint mode to solve it yourself.`;

  const faq: DateFaqItem[] = [
    {
      question: `What is the spangram in Strands #${puzzle.id}?`,
      answer: `The spangram is ${sp} (${sp.length} letters). It runs ${notes.spangramDirection} across the board.`,
    },
    {
      question: `What are the theme words in Strands #${puzzle.id}?`,
      answer: `The ${puzzle.themeWords.length} theme words are ${listWords(puzzle.themeWords)}.`,
    },
    {
      question: `What was the theme clue for Strands #${puzzle.id}?`,
      answer: `The clue was “${puzzle.clue}”. The spangram ${sp} names the theme that links ${listWords(puzzle.themeWords)}.`,
    },
    {
      question: `Have any words in Strands #${puzzle.id} been used before?`,
      answer:
        repeated.length > 0
          ? `Yes — ${listWords(
              repeated.map((w) => `${w.word} (last in #${w.seenBefore!.id})`)
            )} also appeared in an earlier Strands puzzle.`
          : `No — none of these ${notes.words.length} words appeared in the ${notes.archiveSize.toLocaleString("en-US")} earlier Strands puzzles in our archive.`,
    },
  ];

  return (
    <div className="w-full">
      <JsonLd
        data={articleSchema({
          title: `NYT Strands #${puzzle.id} Hints, Spangram & Answers — ${longDate}`,
          description: `Theme clue, spangram and every answer for NYT Strands #${puzzle.id} (${shortDate}).`,
          url: pageUrl,
          datePublished: `${date}T06:00:00Z`,
          dateModified: `${date}T06:00:00Z`,
          image: `${BASE_URL}/og/strands/${date}.png`,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Strands Answers", url: `${BASE_URL}/strands-answers` },
          { name: `#${puzzle.id}`, url: pageUrl },
        ])}
      />
      <JsonLd data={faqPageSchema(faq)} />

      <DatePageHeader
        kicker={`#${puzzle.id}`}
        title={`NYT Strands #${puzzle.id} — ${longDate}`}
        summary={summary}
        date={date}
        publishedLabel={longDate}
        editor={puzzle.editor || undefined}
        hub={{ label: "Strands answers", href: "/strands-answers" }}
        prev={neighbors.prev}
        next={neighbors.next}
        accent="#3b82f6"
      />
      <AlsoOnStrip
        label={`Also on ${shortDate.replace(/, \d{4}$/, "")}`}
        links={getAlsoOnDate(date)}
        current="strands"
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <section aria-labelledby="board-heading">
          <h2
            id="board-heading"
            className="font-heading text-2xl font-bold text-foreground"
          >
            Theme &amp; Answers on the Board
          </h2>
          <div className="mt-4 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Today&apos;s theme clue
            </p>
            <p className="mt-1 font-heading text-lg font-semibold text-foreground">
              “{puzzle.clue}”
            </p>
          </div>
          <div className="mt-5">
            <StrandsPathBoard
              board={puzzle.board}
              words={notes.words.map(({ word, isSpangram, path }) => ({
                word,
                isSpangram,
                path,
              }))}
              date={date}
            />
          </div>
        </section>

        <section className="mt-14" aria-labelledby="notes-heading">
          <h2
            id="notes-heading"
            className="font-heading text-2xl font-bold text-foreground"
          >
            Strands #{puzzle.id} Puzzle Notes
          </h2>
          <div className="mt-4">
            <FactCards
              facts={[
                { value: String(sp.length), label: "letters in the spangram" },
                {
                  value: String(puzzle.themeWords.length),
                  label: "theme words besides the spangram",
                },
                {
                  value: notes.longestThemeWord,
                  label: `longest theme word (${notes.longestThemeWord.length} letters)`,
                },
                {
                  value: String(notes.repeatedWords),
                  label: "words used in an earlier puzzle",
                },
              ]}
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The spangram touches two opposite sides of the board — this one runs{" "}
            {notes.spangramDirection}. Strands boards always tile completely:
            the spangram and theme words use all 48 letters exactly once, so
            once you find the spangram, the leftover letters on each side of it
            belong to the theme words.
          </p>
          {repeated.length > 0 && (
            <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              {repeated.map((w) => (
                <li key={w.word}>
                  <span className="font-mono font-bold text-foreground">
                    {w.word}
                  </span>{" "}
                  was also an answer in{" "}
                  {w.seenBefore!.href ? (
                    <Link
                      href={w.seenBefore!.href}
                      className="font-semibold text-primary hover:text-primary/80"
                    >
                      Strands #{w.seenBefore!.id}
                    </Link>
                  ) : (
                    <span className="font-semibold text-foreground">
                      Strands #{w.seenBefore!.id}
                    </span>
                  )}{" "}
                  ({formatShortDate(w.seenBefore!.date)}).
                </li>
              ))}
            </ul>
          )}
        </section>

        <DateFaq heading={`FAQ: Strands #${puzzle.id}`} items={faq} />

        <DatePageNav
          heading="More Strands Puzzles"
          game="Strands"
          date={date}
          neighbors={neighbors}
          links={[
            { label: "Today's Strands hint", href: "/strands-hint-today" },
            { label: "Every past Strands answer", href: "/strands-answers" },
            { label: "Play Strands Unlimited", href: "/strands-unlimited" },
          ]}
        />
      </div>
    </div>
  );
}
