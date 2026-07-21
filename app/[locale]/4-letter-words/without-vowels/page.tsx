import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import { breadcrumbSchema, faqPageSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { withoutVowels, scrabbleScore } from "@/lib/word-bank";
import { WordGrid } from "@/components/word-bank/WordGrid";
import AnswersFAQ from "@/components/wordle-answers/AnswersFAQ";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

type Params = Promise<{ locale: string }>;

const FAQ = [
  {
    question: "How many 4 letter words have no vowels?",
    answer:
      "Counting words without A, E, I, O or U (Y allowed), the tournament word list has around 70 four-letter entries — the exact list is on this page. Strictly vowel-free words with no Y either, like PFFT and BRRR, number only a handful.",
  },
  {
    question: "Is Y a vowel in these words?",
    answer:
      "Functionally yes — in words like LYNX, MYTH and SYNC, the Y carries the vowel sound. That's exactly why these words exist: English still needs a syllable nucleus, and Y does the job when A/E/I/O/U are absent.",
  },
  {
    question: "Why do vowel-less words matter in word games?",
    answer:
      "Because racks without vowels happen to everyone. Knowing even five of these words converts a dead turn into points in Scrabble or Words With Friends — and they're legal, everyday-adjacent words, not obscure loopholes.",
  },
  {
    question: "What's the highest-scoring 4 letter word without vowels?",
    answer:
      "Among the vowel-free four-letter words, the top Scrabble scorers are the Y-heavy ones — check the point values marked on each word above; several clear 13+ points before any bonus squares.",
  },
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
  const words = withoutVowels(4);
  return constructMetadata({
    page: "FourLetterWordsWithoutVowels",
    title: `4 Letter Words Without Vowels — All ${words.length} of Them`,
    description: `Every 4 letter word with no A, E, I, O or U: LYNX, MYTH, SYNC and ${words.length - 3} more, with Scrabble values. The rack-saving list for vowel-starved turns.`,
    keywords: [
      "4 letter words without vowels",
      "four letter words with no vowels",
      "words without vowels",
    ],
    locale: locale as Locale,
    path: "/4-letter-words/without-vowels",
    canonicalUrl: "/4-letter-words/without-vowels",
    images: ["og/4-letter-words.png"],
  });
}

export default function WithoutVowelsPage() {
  const words = withoutVowels(4);
  const pageUrl = `${BASE_URL}/4-letter-words/without-vowels`;
  const top = [...words]
    .map((w) => ({ word: w.word, score: scrabbleScore(w.word) }))
    .sort((a, b) => b.score - a.score)[0];

  return (
    <div className="w-full">
      <JsonLd data={faqPageSchema(FAQ)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "4 Letter Words", url: `${BASE_URL}/4-letter-words` },
          { name: "Without Vowels", url: pageUrl },
        ])}
      />

      <section className="border-b border-border bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <nav className="text-xs text-slate-400">
            <Link href="/4-letter-words" className="hover:text-slate-200">
              4 Letter Words
            </Link>{" "}
            / Without Vowels
          </nav>
          <h1 className="mt-4 font-heading text-3xl font-bold text-white sm:text-4xl">
            4 Letter Words Without Vowels
          </h1>
          <p className="mt-3 text-slate-300">
            All {words.length} four-letter words with no A, E, I, O or U — the
            list that rescues a vowel-starved rack. Y is doing the heavy
            lifting in almost every one (LYNX, MYTH, SYNC), and the top scorer,{" "}
            {top.word}, is worth {top.score} points before bonuses.
          </p>
          <Link
            href="/4-letters"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cta px-5 py-2.5 text-sm font-bold text-cta-foreground shadow-lg transition-colors hover:bg-cta/90"
          >
            Play 4-Letter Wordle
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <section>
          <h2 className="font-heading text-2xl font-bold text-foreground">
            The Complete List ({words.length} words)
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Common words lead, the obscure tail follows. Tap any highlighted
            word for its meaning.
          </p>
          <div className="mt-6">
            <WordGrid words={words} />
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            How English Gets Away With This
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Every English syllable needs a nucleus — normally a vowel. In these
            words, Y steps into that role and behaves exactly like a vowel:
            say MYTH or SYNC aloud and the Y is carrying the sound. A tiny
            handful of interjections (the PFFT and BRRR family) skip the
            nucleus entirely, which is why they feel more like sound effects
            than words — but tournament lists accept them, and desperate
            Scrabble racks love them.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            For word-game purposes the practical takeaway is simple: memorize
            the common tier above. Five or six of these words cover the vast
            majority of no-vowel racks you&apos;ll ever draw, and they pair
            beautifully with a{" "}
            <Link
              href="/4-letter-words"
              className="font-semibold text-cta hover:underline"
            >
              broader four-letter vocabulary
            </Link>
            .
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mt-5">
            <AnswersFAQ
              items={FAQ.map((f, i) => ({
                ...f,
                number: String(i + 1).padStart(2, "0"),
              }))}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
