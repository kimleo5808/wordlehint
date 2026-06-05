import { Locale, LOCALES } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import {
  getRecentAnswerEntries,
  getTodayEntry,
  getYesterdayEntry,
} from "@/lib/wordle-answers";
import { getTodayDateString } from "@/lib/wordle-daily";
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
  const entry = getTodayEntry();
  const dateStr = getTodayDateString();
  // Intentionally spoiler-free meta — never print the solution in the SERP.
  return constructMetadata({
    page: "TodaysWordleAnswer",
    title: `Today's Wordle Answer — ${dateStr}${entry ? ` (Puzzle #${entry.id})` : ""}`,
    description: `The answer to today's Wordle (${dateStr}) with its definition, kept behind a spoiler reveal. Prefer a clue? Get today's progressive hints instead.`,
    keywords: [
      "wordle answer today",
      "todays wordle answer",
      "what is todays wordle answer",
      "wordle answer",
      "todays wordle",
      "wordle solution today",
      `wordle answer ${dateStr}`,
    ],
    locale: locale as Locale,
    path: "/todays-wordle-answer",
    canonicalUrl: "/todays-wordle-answer",
  });
}

export default function TodaysWordleAnswerPage() {
  const entry = getTodayEntry();
  const yesterday = getYesterdayEntry();
  const recent = getRecentAnswerEntries(6);
  const today = getTodayDateString();

  if (!entry) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Today&apos;s Wordle Answer
        </h1>
        <p className="mt-4 text-muted-foreground">
          Today&apos;s answer ({today}) isn&apos;t available just yet — it
          publishes automatically once the new puzzle goes live. In the
          meantime, check yesterday&apos;s answer or the full archive.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/yesterdays-wordle-answer"
            className="inline-flex items-center gap-2 rounded-lg bg-cta px-5 py-2.5 text-sm font-bold text-cta-foreground"
          >
            Yesterday&apos;s answer
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href="/wordle-answers"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
          >
            Past answers archive
          </Link>
        </div>
      </div>
    );
  }

  return (
    <SingleAnswerView
      mode="today"
      entry={entry}
      neighbor={yesterday}
      recent={recent}
      path="/todays-wordle-answer"
    />
  );
}
