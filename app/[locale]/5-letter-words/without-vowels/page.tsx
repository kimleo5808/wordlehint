import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { getFullWordleHistory, getTodayDateString } from "@/lib/wordle-daily";
import { withoutVowels } from "@/lib/word-bank";
import datePages from "@/data/date-pages.json";
import ToolLanding from "@/components/puzzle-tools/ToolLanding";
import VowelFinder, { type VowellessWord } from "@/components/puzzle-tools/VowelFinder";

const href = "/5-letter-words/without-vowels";
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    locale,
    page: "VowellessWords",
    path: href,
    canonicalUrl: href,
    title: "5 Letter Words Without Vowels for Wordle",
    description:
      "Filter five-letter words with no A, E, I, O or U. Place known letters, allow or exclude Y, and compare common guesses with documented past answers.",
    keywords: [
      "5 letter words without vowels",
      "five letter words with no vowels or y",
      "vowelless Wordle answers",
    ],
  });
}

export default function VowellessWordsPage() {
  const today = getTodayDateString();
  const history = getFullWordleHistory().filter((puzzle) => puzzle.date < today);
  const entries = new Map<string, VowellessWord>();
  for (const { word, common } of withoutVowels(5)) {
    entries.set(word, { word, guess: true, common, dates: [] });
  }
  for (const puzzle of history) {
    const word = puzzle.answer.toUpperCase();
    if (/[AEIOU]/.test(word)) continue;
    const entry = entries.get(word) ?? { word, guess: false, common: false, dates: [] };
    entry.dates.unshift(puzzle.date);
    entries.set(word, entry);
  }
  return (
    <ToolLanding
      kind="word"
      content="five-letter-words-without-vowels"
      title="5 Letter Words Without Vowels"
      subtitle="Filter five-letter guesses with no A, E, I, O or U. Y is allowed unless you exclude it."
      href={href}
      parent={{ name: "5 Letter Words", href: "/5-letter-words" }}
      figure={{
        src: "/illustrations/vowelless-board-narrowing.png",
        alt: "Thirteen common entries narrow to seven with Y in the middle and three after R is excluded.",
        caption: "The same reference list is used at every step. November 3, 2026 snapshot.",
      }}
    >
      <VowelFinder words={[...entries.values()]} earliestPage={datePages.wordle} />
      {history.length > 0 && (
        <p className="pt-footnote">
          Past answers through{" "}
          <time dateTime={history[history.length - 1].date}>{history[history.length - 1].date}</time>.
          Today’s puzzle is excluded.
        </p>
      )}
    </ToolLanding>
  );
}
