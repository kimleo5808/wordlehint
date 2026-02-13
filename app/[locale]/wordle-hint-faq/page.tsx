import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import { breadcrumbSchema, faqPageSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import {
  ArrowRight,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FAQ" });

  return constructMetadata({
    page: "FAQ",
    title: t("title"),
    description: t("description"),
    keywords: [
      "wordle faq",
      "wordle questions",
      "wordle help",
      "how does wordle work",
      "wordle rules explained",
      "wordle tips faq",
      "wordle hard mode explained",
      "best wordle starting word",
      "wordle hint faq",
      "wordle common questions",
    ],
    locale: locale as Locale,
    path: `/wordle-hint-faq`,
    canonicalUrl: `/wordle-hint-faq`,
  });
}

const FAQ_ITEMS = [
  {
    category: "Basics",
    items: [
      {
        question: "What is Wordle?",
        answer:
          "Wordle is a word guessing game where you have 6 attempts to guess a hidden word. After each guess, tiles change color to indicate how close your guess is. Green means the letter is correct and in the right position. Yellow means the letter is in the word but in the wrong position. Gray means the letter is not in the word at all.",
      },
      {
        question: "How do I play Wordle on WordleHint?",
        answer:
          "Simply choose a word length (4 to 11 letters) from our homepage or navigation menu, and start guessing! Type your word and press Enter. The game gives you color-coded feedback after each guess. You have 6 attempts to find the hidden word. Our games are free, unlimited, and require no account.",
      },
      {
        question: "Is WordleHint the official Wordle?",
        answer:
          "No. WordleHint is an independent fan site offering unlimited Wordle-style games, hints, and strategy guides. The official Wordle is published daily by The New York Times. Wordle is a trademark of The New York Times Company.",
      },
      {
        question: "Do I need to create an account?",
        answer:
          "No. All games on WordleHint are completely free and require no account, no download, and no installation. Just visit the site and start playing.",
      },
    ],
  },
  {
    category: "Strategy",
    items: [
      {
        question: "What is the best starting word for Wordle?",
        answer:
          'The most popular and statistically effective starting words include CRANE, SLATE, TRACE, and ADIEU. These words contain high-frequency English letters (E, A, R, S, T, L, N) and help you gather maximum information on your first guess. CRANE is widely considered the single best starting word based on letter frequency analysis.',
      },
      {
        question: "Should I use the same starting word every time?",
        answer:
          "Most expert players recommend using the same starting word consistently. This builds familiarity with common patterns that follow your opener and helps you develop a systematic solving approach. CRANE or SLATE are excellent consistent choices.",
      },
      {
        question: "What is the best second word to play?",
        answer:
          'Your second word should test entirely new letters rather than confirming known ones. If you started with CRANE, try DOUBT or GLYPH to test 5 completely new letters. The goal is to test 10 unique high-frequency letters across your first two guesses.',
      },
      {
        question: "How can I improve my Wordle average?",
        answer:
          'Practice regularly with our unlimited games. Learn common letter patterns and word endings (-TION, -IGHT, -OUND, -ANCE). Start with a strong opening word, use your second guess to test new letters, and develop pattern recognition through repetition. Most experienced players average 3.5-4.0 guesses per solve.',
      },
    ],
  },
  {
    category: "Game Mechanics",
    items: [
      {
        question: "What word lengths are available?",
        answer:
          "WordleHint offers Wordle games in 8 different word lengths: 4, 5, 6, 7, 8, 9, 10, and 11 letters. The classic Wordle format is 5 letters. Shorter words (4 letters) are great for beginners, while longer words (8-11 letters) provide expert-level challenges.",
      },
      {
        question: "How many games can I play per day?",
        answer:
          "Unlimited! Unlike the official daily Wordle which offers one puzzle per day, WordleHint lets you play as many games as you want, in any word length, at any time. There are no daily limits.",
      },
      {
        question: "What is Wordle Hard Mode?",
        answer:
          "In Hard Mode, any revealed hints must be used in subsequent guesses. If a letter turns green, it must stay in that position in all future guesses. If a letter turns yellow, it must be included somewhere in your next guess. This prevents random guessing and forces strategic play.",
      },
      {
        question: "Are the answer words random?",
        answer:
          "Each game selects a random word from a curated word list appropriate for the chosen word length. The words are common English words — no obscure technical terms or proper nouns. Every game is a fresh challenge.",
      },
    ],
  },
  {
    category: "Tips & Tricks",
    items: [
      {
        question: "What are the most common letters in Wordle answers?",
        answer:
          "In 5-letter words, the most frequent letters are E, A, R, O, T, L, I, S, N, and C (in approximate order). Vowels appear in nearly every word, so identifying vowels early is a strong strategy. The letter E alone appears in about 40% of all 5-letter English words.",
      },
      {
        question: "Should I worry about double letters?",
        answer:
          "Yes! Many common words have double letters: HAPPY, TEETH, CHESS, CREEK, BOOKS. If you have 4-5 confirmed letters but can't find the word, consider that one letter might appear twice. About 10-15% of Wordle answers contain a repeated letter.",
      },
      {
        question: "What's the difference between longer and shorter Wordle?",
        answer:
          "Shorter words (4-5 letters) have smaller word pools and are solved faster. Longer words (7-11 letters) introduce compound words, prefixes, suffixes, and multi-syllable patterns. Each length requires different strategies — shorter words need letter frequency knowledge, while longer words need morphological awareness.",
      },
      {
        question: "How do I handle a word I've never heard of?",
        answer:
          "Our word lists use common English words, but you may occasionally encounter an unfamiliar word. This is actually a benefit — Wordle naturally builds vocabulary! Focus on letter patterns rather than trying to guess specific words, and the answer will emerge through elimination.",
      },
    ],
  },
];

// Flatten all FAQ items for schema
const ALL_FAQ_ITEMS = FAQ_ITEMS.flatMap((cat) => cat.items);

export default async function WordleHintFaqPage({
  params,
}: {
  params: Params;
}) {
  await params;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Wordle FAQ", url: `${BASE_URL}/wordle-hint-faq` },
        ])}
      />
      <JsonLd data={faqPageSchema(ALL_FAQ_ITEMS)} />

      {/* Header */}
      <header className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-white to-primary/5 p-6 sm:p-8 dark:border-primary/40 dark:from-zinc-900 dark:via-zinc-900 dark:to-primary/5">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">FAQ</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Wordle Hint FAQ
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Frequently asked questions about Wordle, our games, strategy tips,
            and how to improve your solving skills.
          </p>
        </div>
      </header>

      {/* FAQ Categories */}
      {FAQ_ITEMS.map((category) => (
        <section
          key={category.category}
          className="rounded-2xl border border-primary/20 bg-card p-6 sm:p-8"
        >
          <h2 className="font-heading text-xl font-bold text-foreground">
            {category.category}
          </h2>
          <div className="mt-5 space-y-3">
            {category.items.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-border bg-background transition-colors open:bg-primary/5"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-foreground transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[0.95rem] leading-snug">
                    {item.question}
                  </h3>
                  <ChevronDown className="h-4 w-4 shrink-0 text-primary/60 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="rounded-2xl bg-primary p-6 text-center text-primary-foreground sm:p-8">
        <h2 className="font-heading text-2xl font-bold">
          Still Have Questions?
        </h2>
        <p className="mt-2 text-sm text-primary-foreground/80">
          The best way to learn Wordle is to play! Jump in and start guessing.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            href="/5-letters"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary transition-all hover:bg-white/90"
          >
            Play 5-Letter Wordle
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/how-to-play-wordle"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
          >
            How to Play Guide
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
