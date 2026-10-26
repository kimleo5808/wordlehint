import { BASE_URL } from "@/config/site";
import StagedHints, { type HintGroup } from "@/components/connections/StagedHints";
import StartingWords from "@/components/connections/StartingWords";
import WordHistory from "@/components/connections/WordHistory";
import { CONN_COLORS, type ConnColor } from "@/components/connections/colors";
import AlsoOnStrip from "@/components/date-pages/AlsoOnStrip";
import DateFaq, { type DateFaqItem } from "@/components/date-pages/DateFaq";
import DatePageHeader from "@/components/date-pages/DatePageHeader";
import DatePageNav from "@/components/date-pages/DatePageNav";
import FactCards from "@/components/date-pages/FactCards";
import { Locale, LOCALES } from "@/i18n/routing";
import {
  firstLetterHint,
  getConnectionsByDate,
  LEVEL_META,
} from "@/lib/connections-daily";
import {
  getConnectionsCategoryNotes,
  getConnectionsFacts,
  getConnectionsWordHistory,
} from "@/lib/connections-history";
import {
  formatLongDate,
  formatShortDate,
  getAlsoOnDate,
  getConnectionsDatePages,
  getConnectionsNeighbors,
} from "@/lib/date-pages";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  JsonLd,
} from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import type { ConnectionsPuzzle } from "@/types/connections";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ locale: string; date: string }>;

export async function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getConnectionsDatePages().map((p) => ({ locale, date: p.date }))
  );
}

export const dynamicParams = false;

function getPage(date: string): ConnectionsPuzzle | undefined {
  return getConnectionsDatePages().some((p) => p.date === date)
    ? getConnectionsByDate(date)
    : undefined;
}

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const COLOR_NAMES = ["Yellow", "Green", "Blue", "Purple"];

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
    page: "ConnectionsDate",
    title: `Connections #${puzzle.id} Hints & Answers — ${short}`,
    description: `Spoiler-safe hints for NYT Connections #${puzzle.id} (${short}), then every category and answer, plus how often each word has appeared before.`,
    keywords: [
      `connections #${puzzle.id}`,
      `connections answer ${formatLongDate(date).split(", ")[1].toLowerCase()}`,
      `connections hints ${date}`,
      "nyt connections answers",
    ],
    locale: locale as Locale,
    path: `/connections-answers/${date}`,
    canonicalUrl: `/connections-answers/${date}`,
    images: [`og/connections/${date}.png`],
  });
}

export default async function ConnectionsDatePage({
  params,
}: {
  params: Params;
}) {
  const { date } = await params;
  const puzzle = getPage(date);
  if (!puzzle) notFound();

  const longDate = formatLongDate(date);
  const shortDate = formatShortDate(date);
  const pageUrl = `${BASE_URL}/connections-answers/${date}`;
  const history = getConnectionsWordHistory(date);
  const facts = getConnectionsFacts(date);
  const neighbors = getConnectionsNeighbors(date);
  const purple = puzzle.groups.find((g) => g.level === 3);
  const allWords = puzzle.groups.flatMap((g) => g.words);
  const categoryNotes = getConnectionsCategoryNotes(date);

  const hintGroups: HintGroup[] = puzzle.groups.map((g) => ({
    level: g.level,
    color: LEVEL_META[g.level].color,
    label: LEVEL_META[g.level].label,
    name: g.name,
    words: g.words,
    firstLetters: firstLetterHint(g),
  }));

  const seenList = [...history]
    .filter((r) => r.total > 0)
    .sort((a, b) => b.total - a.total || a.word.localeCompare(b.word));

  const summary =
    facts.seenBeforeWords > 0
      ? `NYT Connections #${puzzle.id} (${longDate})${
          puzzle.editor ? ` was edited by ${puzzle.editor}` : ""
        }. ${facts.seenBeforeWords} of its 16 words had appeared in earlier puzzles, and ${facts.colorChangers} of those had been in a different color group before. Above: every answer, with a hint mode; below, notes on each category and every word's history.`
      : `NYT Connections #${puzzle.id} (${longDate})${
          puzzle.editor ? ` was edited by ${puzzle.editor}` : ""
        }. All 16 of its words were new to Connections. Above: every answer, with a hint mode; below, notes on each category.`;

  const faq: DateFaqItem[] = [
    {
      question: `What are the answers to Connections #${puzzle.id}?`,
      answer: puzzle.groups
        .map(
          (g) =>
            `${COLOR_NAMES[g.level]} (${g.name}): ${g.words.join(", ")}.`
        )
        .join(" "),
    },
  ];
  if (purple) {
    faq.push({
      question: `What was the purple group in Connections #${puzzle.id}?`,
      answer: `The purple group, usually the hardest, was "${purple.name}": ${purple.words.join(", ")}.${
        facts.purpleIsFillInBlank
          ? ` It is a fill-in-the-blank category, the style behind ${Math.round(facts.purpleFillInShare * 100)}% of earlier purple groups.`
          : ""
      }`,
    });
  }
  faq.push({
    question: `Which words in Connections #${puzzle.id} had appeared before?`,
    answer:
      seenList.length > 0
        ? `${seenList.length} of the 16 words had appeared in earlier Connections puzzles, most often ${seenList
            .slice(0, 4)
            .map((r) => `${r.word} (${r.total}×)`)
            .join(", ")}. ${facts.colorChangers} of them had been in a different color group before.`
        : `None — all 16 words appeared in Connections for the first time.`,
  });
  if (puzzle.editor && facts.editorPuzzleNumber) {
    faq.push({
      question: `Who edited Connections #${puzzle.id}?`,
      answer: `${puzzle.editor}. It is the ${ordinal(facts.editorPuzzleNumber)} Connections puzzle edited by ${puzzle.editor} in our archive.`,
    });
  }

  return (
    <div className="w-full">
      <JsonLd
        data={articleSchema({
          title: `NYT Connections #${puzzle.id} Hints & Answers — ${longDate}`,
          description: `Hints, answers and word history for NYT Connections #${puzzle.id} (${shortDate}).`,
          url: pageUrl,
          datePublished: `${date}T06:00:00Z`,
          dateModified: `${date}T06:00:00Z`,
          image: `${BASE_URL}/og/connections/${date}.png`,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Connections Answers", url: `${BASE_URL}/connections-answers` },
          { name: `#${puzzle.id}`, url: pageUrl },
        ])}
      />
      <JsonLd data={faqPageSchema(faq)} />

      <DatePageHeader
        kicker={`#${puzzle.id}`}
        title={`NYT Connections #${puzzle.id} — ${longDate}`}
        chips={[
          { label: `${facts.seenBeforeWords}/16 words seen before` },
          { label: `${facts.colorChangers} changed color` },
          ...(facts.purpleIsFillInBlank ? [{ label: "Purple: fill in the blank", highlight: true }] : []),
        ]}
        date={date}
        publishedLabel={longDate}
        editor={puzzle.editor || undefined}
        hub={{ label: "Connections answers", href: "/connections-answers" }}
        prev={neighbors.prev}
        next={neighbors.next}
        accent="#9333ea"
      />
      <AlsoOnStrip
        label={`Also on ${shortDate.replace(/, \d{4}$/, "")}`}
        links={getAlsoOnDate(date)}
        current="connections"
      />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {/* Answer cards first */}
        <section aria-labelledby="answers-heading">
          <h2
            id="answers-heading"
            className="font-heading text-xl font-bold text-foreground sm:text-2xl"
          >
            Hints &amp; Answers by Color
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The answers are open below. Switch to hint mode to reveal each group
            step by step — first letters, then the category, then the words.
          </p>
          <div className="mt-5">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              The 16 words (A–Z, as a reminder of the board)
            </p>
            <StartingWords words={allWords} />
          </div>
          <div className="mt-6">
            <StagedHints
              groups={hintGroups}
              date={date}
              initialStage={3}
              allowHide
            />
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {summary}
          </p>
        </section>

        {/* Unique data: one note per category */}
        <section className="mt-14" aria-labelledby="categories-heading">
          <h2
            id="categories-heading"
            className="font-heading text-2xl font-bold text-foreground"
          >
            Category Notes
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            What each group shared with earlier puzzles: words that had already
            sat in the same color, the group&apos;s most-used word, and whether the
            exact category name had run before.
          </p>
          <ul className="mt-4 space-y-3">
            {categoryNotes.map((n) => (
              <li
                key={n.level}
                className="rounded-xl border border-border bg-card px-4 py-3 text-sm leading-relaxed text-muted-foreground"
                style={{ borderLeft: `4px solid ${CONN_COLORS[LEVEL_META[n.level].color as ConnColor].bg}` }}
              >
                <span className="font-semibold text-foreground">
                  {COLOR_NAMES[n.level]} — {n.name}.
                </span>{" "}
                {n.sameColour.length > 0
                  ? `${n.sameColour.length} of its 4 words had been ${COLOR_NAMES[n.level].toLowerCase()} before (${n.sameColour.join(", ")}).`
                  : `None of its words had been ${COLOR_NAMES[n.level].toLowerCase()} before.`}{" "}
                {n.firstTimers > 0
                  ? `${n.firstTimers} ${n.firstTimers === 1 ? "word was" : "words were"} new to Connections.`
                  : ""}{" "}
                {n.veteran
                  ? `${n.veteran.word} is the group's most-used word (${n.veteran.total} earlier ${n.veteran.total === 1 ? "appearance" : "appearances"}).`
                  : ""}{" "}
                {n.sameNameBefore ? (
                  <>
                    The same category name ran in{" "}
                    {n.sameNameBefore.href ? (
                      <Link href={n.sameNameBefore.href} className="font-semibold text-primary hover:text-primary/80">
                        #{n.sameNameBefore.id}
                      </Link>
                    ) : (
                      <>#{n.sameNameBefore.id}</>
                    )}{" "}
                    ({formatShortDate(n.sameNameBefore.date)}).
                  </>
                ) : (
                  "The category name itself was new."
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Unique data: word history */}
        <section className="mt-14" aria-labelledby="history-heading">
          <h2
            id="history-heading"
            className="font-heading text-2xl font-bold text-foreground"
          >
            Word History: Have These Words Appeared Before?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We checked every one of the {facts.archiveSize.toLocaleString("en-US")}{" "}
            Connections puzzles published before #{puzzle.id}. Each bar shows how
            often a word appeared in yellow, green, blue and purple before this
            puzzle. A word marked “changed color” has sat in a different color
            group at least once before — exactly how Connections sets its traps.
          </p>
          <figure className="my-6">
            <Image
              src="/images/connections-answers/color-fingerprint.png"
              alt="How to read a word's color fingerprint: each bar segment counts the word's earlier appearances in yellow, green, blue and purple groups"
              width={1200}
              height={640}
              sizes="(max-width: 768px) 100vw, 720px"
              className="w-full rounded-xl border border-border"
            />
            <figcaption className="mt-2 text-center font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Reading a color fingerprint
            </figcaption>
          </figure>
          <WordHistory rows={history} />
        </section>

        {/* Unique data: in numbers */}
        <section className="mt-14" aria-labelledby="numbers-heading">
          <h2
            id="numbers-heading"
            className="font-heading text-2xl font-bold text-foreground"
          >
            Connections #{puzzle.id} in Numbers
          </h2>
          <div className="mt-4">
            <FactCards
              facts={[
                {
                  value: `${facts.seenBeforeWords}/16`,
                  label: "words seen in earlier puzzles",
                },
                {
                  value: String(facts.colorChangers),
                  label: "words that changed color",
                },
                {
                  value: String(facts.firstTimeWords),
                  label: "words used for the first time",
                },
                facts.mostSeen
                  ? {
                      value: facts.mostSeen.word,
                      label: `most-used word (${facts.mostSeen.total} earlier appearances)`,
                    }
                  : { value: "—", label: "no repeated words" },
              ]}
            />
          </div>
          {purple && (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {facts.purpleIsFillInBlank
                ? `The purple group is a fill-in-the-blank category — the most common purple style, used by ${Math.round(
                    facts.purpleFillInShare * 100
                  )}% of earlier purple groups.`
                : `The purple group is not a fill-in-the-blank this time; ${Math.round(
                    facts.purpleFillInShare * 100
                  )}% of earlier purple groups were.`}
              {puzzle.editor && facts.editorPuzzleNumber
                ? ` This is the ${ordinal(facts.editorPuzzleNumber)} puzzle edited by ${puzzle.editor} in our archive.`
                : ""}
            </p>
          )}
        </section>

        <DateFaq heading={`FAQ: Connections #${puzzle.id}`} items={faq} />

        <DatePageNav
          heading="More Connections Puzzles"
          game="Connections"
          date={date}
          neighbors={neighbors}
          links={[
            { label: "Today's Connections hint", href: "/connections-hint-today" },
            { label: "Every past Connections answer", href: "/connections-answers" },
            { label: "Play Connections Unlimited", href: "/connections-unlimited" },
          ]}
        />
      </div>
    </div>
  );
}
