import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import { breadcrumbSchema, faqPageSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { ChevronDown, HelpCircle } from "lucide-react";
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
      "connections hint faq",
      "nyt connections questions",
      "connections puzzle help",
      "connections game faq",
      "how does connections work",
    ],
    locale: locale as Locale,
    path: `/connections-hint-faq`,
    canonicalUrl: `/connections-hint-faq`,
  });
}

const FAQ_ITEMS = [
  {
    question: "What is NYT Connections?",
    answer:
      "NYT Connections is a daily word puzzle by The New York Times. You're given 16 words and must find four groups of four words that share a common connection. The groups range from Yellow (easiest) to Purple (hardest).",
  },
  {
    question: "When does the new Connections puzzle come out?",
    answer:
      "A new Connections puzzle is released every day at midnight Eastern Time (ET). That's 9 PM Pacific, 5 AM GMT, and 1 PM JST. The same puzzle is available worldwide.",
  },
  {
    question: "How many guesses do I get in Connections?",
    answer:
      "You get 4 mistakes before the game ends. Each time you select 4 words that don't form a valid group, you lose one life. If you use all 4 mistakes, the remaining answers are revealed automatically.",
  },
  {
    question: "What do the colors mean in Connections?",
    answer:
      "Yellow is the easiest category (most straightforward connection), Green is moderate, Blue is tricky, and Purple is the hardest (often involving wordplay, puns, or abstract connections).",
  },
  {
    question: "How does ConnectionsHint work?",
    answer:
      "We provide progressive hints for each day's puzzle. You can reveal hints one at a time — from vague thematic clues to near-giveaway hints — so you can get just the right amount of help without fully spoiling the puzzle.",
  },
  {
    question: "Is ConnectionsHint affiliated with The New York Times?",
    answer:
      "No, ConnectionsHint is an independent fan site. We are not affiliated with, endorsed by, or connected to The New York Times in any way. NYT Connections is a trademark of The New York Times Company.",
  },
  {
    question: "Can I play past Connections puzzles?",
    answer:
      "The official NYT site only offers the current day's puzzle. However, our archive contains hints and answers for every past puzzle since Connections launched in June 2023, so you can review or study older puzzles.",
  },
  {
    question: "What's the best strategy for solving Connections?",
    answer:
      "Start by scanning all 16 words for an obvious Yellow group. Watch out for red herrings — words that seem to fit multiple categories. Save the Purple group for last, as it's often the trickiest and can be solved through elimination.",
  },
  {
    question: "Why do some words seem to fit multiple groups?",
    answer:
      "This is intentional! The puzzle designers include 'red herring' words that appear to belong in one category but actually belong in another. Words with multiple meanings are commonly used to create these traps.",
  },
  {
    question: "How are the hints generated?",
    answer:
      "Our hints are generated based on the puzzle data. We provide three levels of hints for each group: a vague thematic hint, the category name, and partial member reveals. This lets you choose how much help you want.",
  },
];

export default async function FAQPage({ params }: { params: Params }) {
  await params;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "FAQ", url: `${BASE_URL}/connections-hint-faq` },
        ])}
      />
      <JsonLd
        data={faqPageSchema(
          FAQ_ITEMS.map((item) => ({
            question: item.question,
            answer: item.answer,
          }))
        )}
      />

      {/* Header */}
      <header className="relative overflow-hidden rounded-2xl border border-purple-200/70 bg-gradient-to-br from-purple-50 via-white to-violet-50 p-6 sm:p-8 dark:border-purple-900/40 dark:from-zinc-900 dark:via-zinc-900 dark:to-purple-950/30">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              FAQ
            </span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-muted-foreground">
            Everything you need to know about NYT Connections and
            ConnectionsHint.
          </p>
        </div>
      </header>

      {/* FAQ Items */}
      <div className="mt-8 space-y-3">
        {FAQ_ITEMS.map((item, index) => (
          <details
            key={index}
            className="group rounded-xl border border-purple-100 bg-card transition-colors open:bg-purple-50/30 dark:border-purple-900/40 dark:open:bg-purple-900/10"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-foreground transition-colors hover:text-purple-700 dark:hover:text-purple-400 [&::-webkit-details-marker]:hidden">
              <h2 className="text-[0.95rem] leading-snug">{item.question}</h2>
              <ChevronDown className="h-4 w-4 shrink-0 text-purple-400 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-5 pb-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </div>
          </details>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-600 p-6 text-center text-white">
        <h2 className="font-heading text-xl font-bold">
          Still have questions?
        </h2>
        <p className="mt-1 text-sm text-purple-100">
          Check out our detailed guide or jump straight to today&apos;s puzzle.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/how-to-play-connections"
            className="rounded-xl bg-white px-5 py-2 text-sm font-bold text-purple-700 transition-all hover:bg-purple-50"
          >
            How to Play
          </Link>
          <Link
            href="/connections-hint-today"
            className="rounded-xl border-2 border-white/30 px-5 py-2 text-sm font-bold text-white transition-all hover:bg-white/10"
          >
            Today&apos;s Hints
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
