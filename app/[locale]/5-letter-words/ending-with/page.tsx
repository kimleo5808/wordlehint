import { BASE_URL } from "@/config/site";
import { Locale, LOCALES, Link as I18nLink } from "@/i18n/routing";
import { breadcrumbSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { getBankMeta } from "@/lib/word-bank";
import { SectionHeading } from "@/components/word-bank/primitives";
import { Tile } from "@/components/word-bank/tiles";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

const PATH = "/5-letter-words/ending-with";

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
    title: "5 Letter Words by Ending Letter — Wordle Lists",
    description: `Browse ${count.toLocaleString()} five-letter words by their ending letter. Already know the last letter of today's Wordle? Jump to the full list with past answers flagged.`,
    keywords: [
      "5 letter words by ending letter",
      "5 letter words ending in",
      "wordle words by last letter",
      "5 letter words ending list",
    ],
    locale: locale as Locale,
    path: PATH,
    canonicalUrl: PATH,
  });
}

// Spokes that are live today. More ending-letter pages roll out one at a time.
const LIVE_ENDING = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M",
  "N", "O", "P", "R", "S", "T", "U", "W", "X", "Y", "Z",
];

export default async function EndingWithHub({ params }: { params: Params }) {
  await params;
  const { count, commonCount } = getBankMeta();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "5 Letter Words", url: `${BASE_URL}/5-letter-words` },
          { name: "Ending With", url: `${BASE_URL}${PATH}` },
        ])}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
      >
        <I18nLink href="/" className="hover:text-foreground">
          Home
        </I18nLink>
        <span aria-hidden>/</span>
        <I18nLink href="/5-letter-words" className="hover:text-foreground">
          5 Letter Words
        </I18nLink>
        <span aria-hidden>/</span>
        <span className="text-foreground">Ending With</span>
      </nav>

      <header className="rounded-3xl border border-border bg-card px-6 py-10 sm:px-10">
        <div className="mb-4 inline-flex items-center gap-1">
          {[0, 1, 2, 3].map((i) => (
            <Tile key={i} state="blank" size="sm" />
          ))}
          <Tile letter="E" state="correct" size="sm" />
        </div>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          5 Letter Words by Ending Letter
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Already know the last letter of today&apos;s Wordle? Jump to the full
          list for that ending — all{" "}
          <strong className="text-foreground">{count.toLocaleString()}</strong>{" "}
          valid five-letter words ({commonCount.toLocaleString()} common
          answer-pool words), with the best openers and past answers flagged.
        </p>
      </header>

      <section className="mt-10">
        <SectionHeading title="Browse by Ending Letter" />
        <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-7">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
            const live = LIVE_ENDING.includes(letter);
            if (live) {
              return (
                <I18nLink
                  key={letter}
                  href={`/5-letter-words/ending-with-${letter.toLowerCase()}`}
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
          More ending-letter pages are being added one at a time, each
          hand-checked for Wordle accuracy.
        </p>
      </section>

      <section className="mt-10">
        <SectionHeading title="Wordle Tools" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/5-letter-words", title: "Browse by Starting Letter", desc: "The full A–Z hub of five-letter word lists." },
            { href: "/wordle-solver", title: "Wordle Solver", desc: "Filter by green/yellow/gray letters." },
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
