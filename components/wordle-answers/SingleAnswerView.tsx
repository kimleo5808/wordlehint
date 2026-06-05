import Link from "next/link";
import { ArrowRight, Calendar, ChevronRight } from "lucide-react";
import { BASE_URL } from "@/config/site";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  JsonLd,
} from "@/lib/jsonld";
import type { AnswerEntry } from "@/lib/wordle-answers";
import {
  buildCopy,
  buildFaq,
  type AnswerMode,
} from "@/data/wordle-answers/single";
import AnswerDefinition from "@/components/wordle/AnswerDefinition";
import DifficultyRatingCard from "@/components/wordle/DifficultyRating";
import { WordTiles } from "./WordTiles";
import SpoilerCurtain from "./SpoilerCurtain";
import AnswersFAQ from "./AnswersFAQ";
import RelatedTools from "./RelatedTools";
import { RELATED_TOOLS } from "@/data/wordle-answers/content";

function formatLong(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatShort(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function SingleAnswerView({
  mode,
  entry,
  neighbor,
  recent,
  path,
}: {
  mode: AnswerMode;
  entry: AnswerEntry;
  neighbor?: AnswerEntry;
  recent: AnswerEntry[];
  path: string;
}) {
  const isToday = mode === "today";
  const formattedDate = formatLong(entry.date);
  const copy = buildCopy(mode, entry, formattedDate);
  const faqItems = buildFaq(mode, entry).map((f, i) => ({
    number: String(i + 1).padStart(2, "0"),
    question: f.question,
    answer: f.answer,
  }));
  const pageUrl = `${BASE_URL}${path}`;

  const neighborLink = isToday
    ? { href: "/yesterdays-wordle-answer", label: "Yesterday's answer" }
    : { href: "/todays-wordle-answer", label: "Today's answer" };

  // The block that names the solution — curtained on the today page.
  const answerBlock = (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 text-center sm:p-8">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Puzzle #{entry.id} · {formatShort(entry.date)}
        </span>
        <div className="mt-4 flex justify-center">
          <WordTiles word={entry.answer} size="lg" />
        </div>
        {entry.definition && (
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {entry.answer}
            </span>
            {entry.partOfSpeech ? ` (${entry.partOfSpeech}) ` : " "}
            — {entry.definition}
          </p>
        )}
      </div>
      <AnswerDefinition word={entry.answer} />
      <DifficultyRatingCard word={entry.answer} />
    </div>
  );

  return (
    <div className="w-full">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: copy.badge, url: pageUrl },
        ])}
      />
      <JsonLd
        data={articleSchema({
          title: copy.h1,
          description: copy.intro,
          url: pageUrl,
          datePublished: `${entry.date}T05:00:00Z`,
          dateModified: `${entry.date}T05:00:00Z`,
        })}
      />
      <JsonLd data={faqPageSchema(faqItems)} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Calendar className="h-4 w-4" />
            {copy.badge}
          </div>
          <h1 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl">
            {copy.h1}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">{copy.intro}</p>
        </div>
      </section>

      {/* Answer */}
      <section className="bg-background py-10">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          {isToday ? (
            <SpoilerCurtain date={entry.date}>{answerBlock}</SpoilerCurtain>
          ) : (
            answerBlock
          )}

          {/* View hints + neighbor */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href={`/wordle-hint/${entry.date}`}
              className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-cta/40 hover:bg-muted/40"
            >
              <span className="text-sm font-semibold text-foreground">
                {isToday
                  ? "Prefer a hint? See today's clues"
                  : "See that day's full hints"}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-cta" />
            </Link>
            <Link
              href={neighborLink.href}
              className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-cta/40 hover:bg-muted/40"
            >
              <span className="text-sm font-semibold text-foreground">
                {neighborLink.label}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-cta" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent answers */}
      {recent.length > 0 && (
        <section className="border-t border-border bg-muted/30 py-10">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-foreground">
                Recent Wordle Answers
              </h2>
              <Link
                href="/wordle-answers"
                className="text-sm font-medium text-primary hover:text-primary/80"
              >
                View all →
              </Link>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {recent.map((p) => (
                <Link
                  key={p.date}
                  href={`/wordle-hint/${p.date}`}
                  className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 transition-colors hover:border-cta/40 hover:bg-muted/40"
                >
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    #{p.id}
                  </span>
                  <WordTiles word={p.answer} size="md" />
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {formatShort(p.date)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Body: FAQ + evergreen + related */}
      <section className="border-t border-border bg-background py-10">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="font-heading text-xl font-bold text-foreground">
            {copy.evergreenHeading}
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
            {copy.evergreen.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <h2 className="mt-10 font-heading text-xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mt-4">
            <AnswersFAQ items={faqItems} />
          </div>

          <h2 className="mt-10 font-heading text-xl font-bold text-foreground">
            Keep Playing
          </h2>
          <div className="mt-4">
            <RelatedTools tools={RELATED_TOOLS} />
          </div>

          <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5 text-center">
            <p className="text-sm font-medium text-foreground">
              Want endless practice? Play Wordle Unlimited free.
            </p>
            <Link
              href="/wordle-unlimited"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-cta px-5 py-2.5 text-sm font-bold text-cta-foreground shadow-md transition-all hover:bg-cta/90"
            >
              Play Wordle Unlimited
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
