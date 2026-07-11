import { BASE_URL } from "@/config/site";
import { Locale, LOCALES, Link as I18nLink } from "@/i18n/routing";
import { breadcrumbSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { getBankMeta } from "@/lib/word-bank";
import { SectionHeading } from "@/components/word-bank/primitives";
import { RoamingTiles } from "@/components/word-bank/tiles";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

const PATH = "/5-letter-words/with";

// Spokes that are live today. Contains-letter pages roll out one at a time —
// keep in sync with wordListContainsLetters in lib/sitemap.ts.
const LIVE_WITH = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
];

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
    title: "5 Letter Words by Contained Letter — Wordle Lists",
    description: `Browse ${count.toLocaleString()} five-letter words by a letter they contain. Got a yellow letter in Wordle but not its spot? Jump to the full list, mapped by position, with past answers flagged.`,
    keywords: [
      "5 letter words by contained letter",
      "5 letter words containing",
      "5 letter words with a certain letter",
      "wordle words with letter",
    ],
    locale: locale as Locale,
    path: PATH,
    canonicalUrl: PATH,
  });
}

export default async function WithHub({ params }: { params: Params }) {
  await params;
  const { count, commonCount } = getBankMeta();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "5 Letter Words", url: `${BASE_URL}/5-letter-words` },
          { name: "Contains", url: `${BASE_URL}${PATH}` },
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
        <span className="text-foreground">Contains</span>
      </nav>

      <header className="rounded-3xl border border-border bg-card px-6 py-10 sm:px-10">
        <div className="mb-4">
          <RoamingTiles letter="A" size="sm" />
        </div>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          5 Letter Words by Contained Letter
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Know a letter is in today&apos;s Wordle but not sure where? Jump to the
          full list for that letter — all{" "}
          <strong className="text-foreground">{count.toLocaleString()}</strong>{" "}
          valid five-letter words ({commonCount.toLocaleString()} common
          answer-pool words), mapped by the slot the letter lands in, with the
          best openers and past answers flagged.
        </p>
      </header>

      <section className="mt-10">
        <SectionHeading title="Browse by Contained Letter" />
        <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-7">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
            const live = LIVE_WITH.includes(letter);
            if (live) {
              return (
                <I18nLink
                  key={letter}
                  href={`/5-letter-words/with-${letter.toLowerCase()}`}
                  className="flex aspect-square items-center justify-center rounded-xl border border-wordle-present bg-wordle-present/10 font-mono text-xl font-bold text-wordle-present transition-transform hover:-translate-y-0.5"
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
          Every letter A–Z has a full list, sorted for Wordle and mapped by where
          the letter sits in the word — including the rare J, Q, X and Z.
        </p>
      </section>

      <section className="mt-10">
        <SectionHeading title="Browse Another Way" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/5-letter-words", title: "Browse by Starting Letter", desc: "The full A–Z hub of five-letter word lists." },
            { href: "/5-letter-words/ending-with", title: "Browse by Ending Letter", desc: "Every five-letter word by its last letter." },
            { href: "/wordle-solver", title: "Wordle Solver", desc: "Filter by green/yellow/gray letters." },
          ].map((r) => (
            <I18nLink
              key={r.href}
              href={r.href}
              className="group rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-wordle-present"
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
