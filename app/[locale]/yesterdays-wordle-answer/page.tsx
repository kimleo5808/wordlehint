import { Locale, LOCALES } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import {
  getArchiveEntries,
  getTodayEntry,
  getYesterdayEntry,
} from "@/lib/wordle-answers";
import SingleAnswerView from "@/components/wordle-answers/SingleAnswerView";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

type Params = Promise<{ locale: string }>;

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const entry = getYesterdayEntry();
  // Yesterday's answer is not a spoiler — naming it boosts CTR + keywords.
  return constructMetadata({
    page: "YesterdaysWordleAnswer",
    title: entry
      ? `Yesterday's Wordle Answer: ${entry.answer} (Puzzle #${entry.id})`
      : "Yesterday's Wordle Answer",
    description: entry
      ? `Yesterday's Wordle answer was ${entry.answer} (#${entry.id}). See its meaning, difficulty, and that day's full hints — plus today's answer and the past-answers archive.`
      : "Yesterday's Wordle answer with its definition, difficulty, and full hints.",
    keywords: [
      "yesterdays wordle answer",
      "yesterday wordle answer",
      "what was yesterdays wordle",
      "wordle answer yesterday",
      "previous wordle answer",
      "last wordle answer",
    ],
    locale: locale as Locale,
    path: "/yesterdays-wordle-answer",
    canonicalUrl: "/yesterdays-wordle-answer",
  });
}

export default function YesterdaysWordleAnswerPage() {
  const entry = getYesterdayEntry();
  const today = getTodayEntry();
  const recent = getArchiveEntries().slice(1, 7);

  if (!entry) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Yesterday&apos;s Wordle Answer
        </h1>
        <p className="mt-4 text-muted-foreground">
          We don&apos;t have yesterday&apos;s answer available right now. Browse
          the full archive of past Wordle answers instead.
        </p>
        <Link
          href="/wordle-answers"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cta px-5 py-2.5 text-sm font-bold text-cta-foreground"
        >
          Past answers archive
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <SingleAnswerView
      mode="yesterday"
      entry={entry}
      neighbor={today}
      recent={recent}
      path="/yesterdays-wordle-answer"
    />
  );
}
