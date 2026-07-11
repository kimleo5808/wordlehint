import { BASE_URL } from "@/config/site";
import { Locale, LOCALES, Link as I18nLink } from "@/i18n/routing";
import { breadcrumbSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { getBankMeta } from "@/lib/word-bank";
import { SectionHeading } from "@/components/word-bank/primitives";
import { Tile } from "@/components/word-bank/tiles";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

const PATH = "/5-letter-words";

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const { count } = getBankMeta();
  return constructMetadata({
    page: "WordList",
    title: "5 Letter Words — Wordle Word Lists & Finder",
    description: `Browse ${count.toLocaleString()} five-letter words for Wordle. Find words by their starting letter, with the best openers and past answers flagged.`,
    keywords: [
      "5 letter words",
      "five letter words",
      "5 letter words for wordle",
      "wordle word list",
    ],
    locale: locale as Locale,
    path: PATH,
    canonicalUrl: PATH,
  });
}

// Spokes that are live today. More starting-letter pages roll out one at a time.
const LIVE_STARTING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default async function FiveLetterWordsHub({
  params,
}: {
  params: Params;
}) {
  await params;
  const { count, commonCount } = getBankMeta();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "5 Letter Words", url: `${BASE_URL}${PATH}` },
        ])}
      />

      <header className="rounded-3xl border border-border bg-card px-6 py-10 sm:px-10">
        <div className="mb-4 inline-flex items-center gap-1">
          {"WORDS".split("").map((c, i) => (
            <Tile key={i} letter={c} state={i === 0 ? "correct" : "blank"} size="sm" />
          ))}
        </div>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          5 Letter Words for Wordle
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Browse all{" "}
          <strong className="text-foreground">{count.toLocaleString()}</strong>{" "}
          valid five-letter words ({commonCount.toLocaleString()} common
          answer-pool words), organized for solving Wordle. Pick a starting
          letter to see the full list, the best openers, and which words have
          already been answers.
        </p>
      </header>

      <section className="mt-10">
        <SectionHeading title="Browse by Starting Letter" />
        <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-7">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
            const live = LIVE_STARTING.includes(letter);
            if (live) {
              return (
                <I18nLink
                  key={letter}
                  href={`/5-letter-words/starting-with-${letter.toLowerCase()}`}
                  className="flex aspect-square items-center justify-center rounded-xl border border-wordle-correct bg-wordle-correct/10 font-mono text-xl font-bold text-wordle-correct transition-transform hover:-translate-y-0.5"
                >
                  {letter}
                </I18nLink>
              );
            }
            return (
              <span
                key={letter}
                aria-disabled
                title="Coming soon"
                className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-border font-mono text-xl font-bold text-muted-foreground/40"
              >
                {letter}
              </span>
            );
          })}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          More starting-letter pages are being added one at a time, each
          hand-checked for Wordle accuracy.
        </p>
      </section>

      <section className="mt-10">
        <SectionHeading title="Browse by Ending Letter" />
        <I18nLink
          href="/5-letter-words/ending-with"
          className="group mt-5 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-wordle-correct"
        >
          <div>
            <h3 className="flex items-center gap-1 font-heading text-lg font-bold text-foreground">
              5 Letter Words by Ending Letter
              <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Already locked the last letter? Jump to lists grouped by ending —
              starting with words ending in E.
            </p>
          </div>
          <div className="hidden shrink-0 items-center gap-1 sm:inline-flex">
            {[0, 1, 2, 3].map((i) => (
              <Tile key={i} state="blank" size="sm" />
            ))}
            <Tile letter="E" state="correct" size="sm" />
          </div>
        </I18nLink>
      </section>

      <section className="mt-10">
        <SectionHeading title="Browse by Contained Letter" />
        <I18nLink
          href="/5-letter-words/with"
          className="group mt-5 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-wordle-present"
        >
          <div>
            <h3 className="flex items-center gap-1 font-heading text-lg font-bold text-foreground">
              5 Letter Words by Contained Letter
              <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Got a yellow letter but not its spot? Jump to lists mapped by where
              the letter sits in the word.
            </p>
          </div>
          <div className="hidden shrink-0 items-center gap-1 sm:inline-flex">
            <Tile state="blank" size="sm" />
            <Tile letter="A" state="present" size="sm" />
            {[0, 1, 2].map((i) => (
              <Tile key={i} state="blank" size="sm" />
            ))}
          </div>
        </I18nLink>
      </section>

      <section className="mt-10">
        <SectionHeading title="Wordle Tools" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/wordle-solver", title: "Wordle Solver", desc: "Filter by green/yellow/gray letters." },
            { href: "/best-wordle-starting-words", title: "Best Starting Words", desc: "Data-ranked opening words." },
            { href: "/wordle-hint-today", title: "Today's Hint", desc: "Progressive clues for today's puzzle." },
          ].map((r) => (
            <I18nLink
              key={r.href}
              href={r.href}
              className="group rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-wordle-correct"
            >
              <h3 className="flex items-center gap-1 font-heading font-bold text-foreground">
                {r.title}
                <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
            </I18nLink>
          ))}
        </div>
      </section>
    </div>
  );
}
