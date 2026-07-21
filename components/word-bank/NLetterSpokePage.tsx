import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { type BankLength, groupBySecondLetter } from "@/lib/word-bank";
import {
  fillTemplate,
  getStartingFacts,
  type SpokeFacts,
} from "@/lib/n-letter-template";
import type { SpokeTemplate } from "@/data/word-bank/n-letter-types";
import { WordGrid } from "@/components/word-bank/WordGrid";
import AnswersFAQ from "@/components/wordle-answers/AnswersFAQ";

const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

/**
 * Shared renderer for the 4/6/7-letter starting-with spokes. Everything
 * page-specific comes from the (length, letter) pair: live stats, the
 * hand-written per-letter hook, and the per-length template.
 */
export default function NLetterSpokePage({
  length,
  letter,
  template,
  hook,
}: {
  length: BankLength;
  letter: string;
  template: SpokeTemplate;
  hook: string;
}) {
  const L = letter.toUpperCase();
  const facts = getStartingFacts(L, length);
  const groups = groupBySecondLetter(L, length);
  const t = (s: string) => fillTemplate(s, facts);
  const base = `/${length}-letter-words`;

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <nav className="text-xs text-slate-400">
            <Link href={base} className="hover:text-slate-200">
              {length} Letter Words
            </Link>{" "}
            / Starting with {L}
          </nav>
          <h1 className="mt-4 font-heading text-3xl font-bold text-white sm:text-4xl">
            {t(template.titlePattern).replace(/ — .*$/, "")} —{" "}
            <span className="text-wordle-correct">{L}</span>
          </h1>
          <dl className="mt-5 grid max-w-md grid-cols-3 gap-3 text-center">
            {[
              { label: "Words", value: facts.n },
              { label: "Common", value: facts.common },
              { label: `Top: ${facts.topWord}`, value: `${facts.topScore} pts` },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-slate-700 bg-slate-800/60 p-3"
              >
                <dd className="font-heading text-xl font-bold tabular-nums text-white">
                  {s.value}
                </dd>
                <dt className="mt-0.5 text-xs text-slate-400">{s.label}</dt>
              </div>
            ))}
          </dl>
          {/* Hand-written per-letter hook — the page's unique opening. */}
          <p className="mt-5 text-slate-300">{hook}</p>
          <Link
            href={`/${length}-letters`}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cta px-5 py-2.5 text-sm font-bold text-cta-foreground shadow-lg transition-colors hover:bg-cta/90"
          >
            Play {length}-Letter Wordle
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {template.intro.map((p, i) => (
          <p key={i} className="leading-relaxed text-muted-foreground">
            {t(p)}
          </p>
        ))}

        {/* Word list, grouped by second letter, common tier first */}
        <section className="mt-10">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            All {facts.n} Words, Grouped by Second Letter
          </h2>
          <div className="mt-6 space-y-10">
            {groups.map((g) => (
              <div key={g.secondLetter}>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {g.prefix}…{" "}
                  <span className="font-normal text-muted-foreground">
                    ({g.total} words{g.commonCount ? `, ${g.commonCount} common` : ""})
                  </span>
                </h3>
                <div className="mt-3">
                  <WordGrid words={g.words} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Template sections (per-length angle) */}
        {template.sections.map((s) => (
          <section key={s.heading} className="mt-14">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              {t(s.heading)}
            </h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
                {t(p)}
              </p>
            ))}
          </section>
        ))}

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mt-5">
            <AnswersFAQ
              items={template.faq.map((f, i) => ({
                number: String(i + 1).padStart(2, "0"),
                question: t(f.question),
                answer: t(f.answer),
              }))}
            />
          </div>
        </section>

        {/* Letter nav + cross-length links */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Browse {length}-Letter Words by First Letter
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {LETTERS.map((l) => (
              <Link
                key={l}
                href={`${base}/starting-with-${l}`}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border font-heading font-bold uppercase transition-colors ${
                  l === letter.toLowerCase()
                    ? "border-wordle-correct bg-wordle-correct text-white"
                    : "border-border bg-card text-foreground hover:border-wordle-correct"
                }`}
              >
                {l}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Other lengths:{" "}
            {[4, 5, 6, 7]
              .filter((n) => n !== length)
              .map((n, i, arr) => (
                <span key={n}>
                  <Link
                    href={`/${n}-letter-words${n === 5 ? `/starting-with-${letter.toLowerCase()}` : `/starting-with-${letter.toLowerCase()}`}`}
                    className="font-semibold text-cta hover:underline"
                  >
                    {n}-letter words starting with {L}
                  </Link>
                  {i < arr.length - 1 ? " · " : ""}
                </span>
              ))}
          </p>
        </section>
      </div>
    </div>
  );
}
