import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  type BankLength,
  getBankMeta,
  letterStats,
  topScoringWords,
} from "@/lib/word-bank";
import type { LengthHubContent } from "@/data/word-bank/n-letter-types";
import AnswersFAQ from "@/components/wordle-answers/AnswersFAQ";

const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

/** Shared hub renderer for /4-letter-words, /6-letter-words, /7-letter-words. */
export default function NLetterHubPage({
  content,
}: {
  content: LengthHubContent;
}) {
  const len = content.length as BankLength;
  const meta = getBankMeta(len);
  const top = topScoringWords(len, 8);
  const base = `/${len}-letter-words`;

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-wordle-correct/30 bg-wordle-correct/10 px-4 py-1.5 text-sm font-medium text-wordle-correct">
            {content.heroBadge}
          </div>
          <h1 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl">
            {content.title}
          </h1>
          <p className="mt-3 text-slate-300">{content.heroIntro}</p>
          <dl className="mt-6 grid max-w-md grid-cols-2 gap-3 text-center">
            <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
              <dd className="font-heading text-2xl font-bold tabular-nums text-white">
                {meta.count.toLocaleString("en-US")}
              </dd>
              <dt className="mt-1 text-xs text-slate-400">
                {len}-letter words
              </dt>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
              <dd className="font-heading text-2xl font-bold tabular-nums text-white">
                {meta.commonCount.toLocaleString("en-US")}
              </dd>
              <dt className="mt-1 text-xs text-slate-400">everyday words</dt>
            </div>
          </dl>
          <Link
            href={`/${len}-letters`}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cta px-6 py-3 text-sm font-bold text-cta-foreground shadow-lg transition-colors hover:bg-cta/90"
          >
            Play {len}-Letter Wordle
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* A–Z browse grid — the hub's core job */}
        <section>
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Browse by First Letter
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {LETTERS.map((l) => {
              const s = letterStats(l, len);
              return (
                <Link
                  key={l}
                  href={`${base}/starting-with-${l}`}
                  className="group rounded-xl border border-border bg-card p-4 transition-all hover:scale-[1.02] hover:border-wordle-correct"
                >
                  <span className="font-heading text-2xl font-bold uppercase text-foreground group-hover:text-wordle-correct">
                    {l}
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {s.total} words · {s.common} common
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Top scorers */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Highest-Scoring {len}-Letter Words
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {top.map((w) => (
              <div
                key={w.word}
                className="rounded-lg border border-border bg-card px-3 py-2 text-center"
              >
                <span className="font-mono text-sm font-bold text-foreground">
                  {w.word}
                </span>
                <span className="block text-xs tabular-nums text-muted-foreground">
                  {w.score} pts
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Hand-written sections */}
        {content.sections.map((s) => (
          <section key={s.heading} className="mt-14">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              {s.heading}
            </h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
            {s.subs?.map((sub) => (
              <div key={sub.heading}>
                <h3 className="mt-6 font-heading text-lg font-semibold text-foreground">
                  {sub.heading}
                </h3>
                {sub.body.map((p, i) => (
                  <p
                    key={i}
                    className="mt-2 leading-relaxed text-muted-foreground"
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </section>
        ))}

        {/* Quotable definition */}
        <blockquote className="mt-10 border-l-4 border-wordle-correct bg-muted/40 px-5 py-4 text-foreground">
          <p className="font-medium leading-relaxed">{content.definition}</p>
        </blockquote>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mt-5">
            <AnswersFAQ
              items={content.faq.map((f, i) => ({
                number: String(i + 1).padStart(2, "0"),
                question: f.question,
                answer: f.answer,
              }))}
            />
          </div>
        </section>

        {/* Cross-length links */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            More Word Lists
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {[4, 5, 6, 7]
              .filter((n) => n !== len)
              .map((n, i, arr) => (
                <span key={n}>
                  <Link
                    href={`/${n}-letter-words`}
                    className="font-semibold text-cta hover:underline"
                  >
                    {n}-letter words
                  </Link>
                  {i < arr.length - 1 ? " · " : ""}
                </span>
              ))}
            {len === 4 && (
              <>
                {" · "}
                <Link
                  href="/4-letter-words/without-vowels"
                  className="font-semibold text-cta hover:underline"
                >
                  4-letter words without vowels
                </Link>
              </>
            )}
          </p>
        </section>
      </div>
    </div>
  );
}
