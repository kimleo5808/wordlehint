import { BASE_URL } from "@/config/site";
import DateFaq, { type DateFaqItem } from "@/components/date-pages/DateFaq";
import ReleaseCalendar from "@/components/reset-times/ReleaseCalendar";
import ResetBoard from "@/components/reset-times/ResetBoard";
import { ResetClockProvider } from "@/components/reset-times/ResetClock";
import { NYT_RESET_GAMES, RESET_RULES_VERIFIED, VERTEX_NOTE, type NytResetGame } from "@/data/nyt-reset-rules";
import { Locale, LOCALES } from "@/i18n/routing";
import { formatLongDate } from "@/lib/date-pages";
import { articleSchema, breadcrumbSchema, faqPageSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { nextOffsetChange } from "@/lib/reset-times";
import type { Metadata } from "next";
import Link from "next/link";

type Params = Promise<{ locale: string }>;

const PAGE_PATH = "/nyt-games-reset-times";
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const game = (id: string) => NYT_RESET_GAMES.find((g) => g.id === id) as NytResetGame;

function hourLabel(h: number): string {
  if (h === 0) return "midnight";
  if (h === 12) return "noon";
  return h < 12 ? `${h} a.m.` : `${h - 12} p.m.`;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    page: "NytGamesResetTimes",
    title: "When Do NYT Games Reset? Live, in Your Time Zone",
    description:
      "Live reset times for Wordle, Connections, Strands, Spelling Bee, Pips, the Mini and more — converted to your time zone, with countdowns and NYT's own wording.",
    keywords: [
      "when does wordle reset",
      "what time does wordle reset",
      "nyt games reset time",
      "when does spelling bee reset",
      "when does connections reset",
      "when does the mini come out",
    ],
    locale: locale as Locale,
    path: PAGE_PATH,
    canonicalUrl: PAGE_PATH,
    images: ["og/nyt-games-reset-times.png"],
  });
}

function Source({ g }: { g: NytResetGame }) {
  return (
    <p className="mt-2 text-xs text-muted-foreground">
      Source:{" "}
      <a href={g.source.url} target="_blank" rel="noopener" className="underline hover:text-foreground">
        {g.source.name}
      </a>{" "}
      — “{g.source.quote}” · verified {formatLongDate(g.verified).replace(/^\w+, /, "")}
    </p>
  );
}

function GameSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  const g = game(id);
  return (
    <section id={id} className="mt-8 scroll-mt-24">
      <h3 className="font-heading text-lg font-bold text-foreground">{title}</h3>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
      <Source g={g} />
    </section>
  );
}

export default function NytGamesResetTimesPage() {
  const pageUrl = `${BASE_URL}${PAGE_PATH}`;
  const verified = formatLongDate(RESET_RULES_VERIFIED).replace(/^\w+, /, "");
  const crossword = game("crossword");
  const mini = game("mini");
  const crosswordHours = crossword.rule.kind === "et-evening" ? crossword.rule.hours : [];
  const miniHours = mini.rule.kind === "et-evening" ? mini.rule.hours : [];
  const change = nextOffsetChange(Date.parse(`${RESET_RULES_VERIFIED}T12:00:00Z`));
  const changeDate = change
    ? new Date(change.at).toLocaleDateString("en-US", { timeZone: "America/New_York", weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : null;
  const fallsBack = change ? change.after < change.before : false;

  const faq: DateFaqItem[] = [
    {
      question: "What time does Wordle reset?",
      answer:
        "At midnight in your own time zone — NYT's help page says “The daily Wordle game releases at midnight in your timezone.” There is no single worldwide reset: players in London get each puzzle at midnight UK time, hours before players in New York.",
    },
    {
      question: "What time does Spelling Bee reset?",
      answer:
        "At 3 a.m. Eastern Time every day, for everyone at once. That is midnight on the US West Coast and usually 8 a.m. in London — 7 a.m. during the short spells when the UK and the US change their clocks on different weekends.",
    },
    {
      question: "When does the NYT Mini come out?",
      answer:
        "The evening before, New York time. NYT's Mini help page puts Monday-to-Saturday puzzles at 10 p.m. Eastern the previous day and the Sunday puzzle at 6 p.m. on Saturday.",
    },
    {
      question: "Why can I play tomorrow's crossword tonight?",
      answer:
        "The Crossword, Midi and Sudoku go up the evening before their date: Tuesday-to-Saturday puzzles at 10 p.m. Eastern, Sunday and Monday puzzles at 6 p.m. Eastern. So on a Saturday evening in New York you can already be solving Sunday's puzzle.",
    },
    {
      question: "Does travelling change when I get a new Wordle?",
      answer:
        "Yes. The daily games follow your local midnight, so flying east brings the next puzzle sooner and flying west delays it. Your streak still counts by your local midnight: NYT's help pages say a puzzle finished after midnight local time breaks the streak.",
    },
    {
      question: "When do NYT Bonus Puzzles come out?",
      answer:
        "Once a week, on Wednesdays at midnight in your time zone. Each release has four or more twists on familiar games, such as Wordle in 1, Connections 3x3 and Mystery Mini.",
    },
    {
      question: "What happened to Vertex?",
      answer: "NYT discontinued it. Its help page says the last puzzle was published on August 29, 2024, so Vertex no longer resets at all.",
    },
  ];

  return (
    <div className="w-full">
      <JsonLd
        data={articleSchema({
          title: "When Do NYT Games Reset? Live Times in Your Time Zone",
          description: "Reset times for every NYT game, converted to the reader's time zone, with NYT's own wording.",
          url: pageUrl,
          datePublished: `${RESET_RULES_VERIFIED}T12:00:00Z`,
          dateModified: `${RESET_RULES_VERIFIED}T12:00:00Z`,
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "NYT Games Reset Times",
          url: pageUrl,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          browserRequirements: "Requires JavaScript",
          isAccessibleForFree: true,
          description: "Live countdowns to the next Wordle, Connections, Strands, Spelling Bee, Pips, Mini and Crossword puzzle in your time zone.",
        }}
      />
      <JsonLd data={faqPageSchema(faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "NYT Games Reset Times", url: pageUrl },
        ])}
      />

      <section className="border-b border-border bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-4xl px-4 pb-6 pt-6 sm:px-6 sm:pt-8">
          <h1 className="font-heading text-2xl font-bold leading-tight text-white sm:text-4xl">
            When Do NYT Games Reset? Live Times in Your Time Zone
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
            Wordle, Connections, Strands and Pips reset at midnight your time; Spelling Bee and Letter
            Boxed at 3 a.m. Eastern; the Crossword, Midi, Mini and Sudoku the evening before.
          </p>
          <p className="mt-2 font-mono text-xs text-slate-400">
            Every rule checked against NYT&apos;s help pages · Last verified {verified}
          </p>
        </div>
      </section>

      <ResetClockProvider>
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <section aria-labelledby="board-heading">
            <h2 id="board-heading" className="sr-only">
              Reset Times at a Glance
            </h2>
            <ResetBoard
              games={NYT_RESET_GAMES.map(({ id, name, rule, summary, todayHref }) => ({ id, name, rule, summary, todayHref }))}
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Soonest first. Times use your device&apos;s time zone; pick another to see what a friend
              elsewhere sees. Eastern-time games follow New York&apos;s clock, daylight saving included.
            </p>
          </section>

          <section className="mt-14" aria-labelledby="rules-heading">
            <h2 id="rules-heading" className="font-heading text-2xl font-bold text-foreground">
              Every NYT Game&apos;s Reset Rule
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Each rule in NYT&apos;s own words, from its help page for that game. NYT writes “EST” all
              year round; in practice these times follow New York&apos;s clock, so they shift with
              daylight saving like any other Eastern time.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full min-w-[34rem] text-sm">
                <thead>
                  <tr className="border-b border-border text-left font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    <th scope="col" className="px-4 py-2.5 font-normal">Game</th>
                    <th scope="col" className="px-4 py-2.5 font-normal">New puzzle</th>
                    <th scope="col" className="px-4 py-2.5 font-normal">In NYT&apos;s words</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dashed divide-border">
                  {NYT_RESET_GAMES.map((g) => (
                    <tr key={g.id} className="align-top">
                      <th scope="row" className="px-4 py-2.5 text-left font-semibold text-foreground">
                        <a href={`#${g.id}`} className="hover:underline">
                          {g.name}
                        </a>
                      </th>
                      <td className="px-4 py-2.5 text-foreground">{g.summary}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">
                        “{g.source.quote}”{" "}
                        <a href={g.source.url} target="_blank" rel="noopener" className="whitespace-nowrap underline hover:text-foreground">
                          {g.source.name}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-14 max-w-3xl" aria-labelledby="local-heading">
            <h2 id="local-heading" className="font-heading text-2xl font-bold text-foreground">
              Wordle, Connections, Strands and Pips: Midnight Where You Are
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The newer daily games don&apos;t have one release moment. Each player gets the next puzzle
              at their own midnight, so the new Wordle reaches New Zealand nearly a day before it
              reaches Hawaii — but everyone plays the same puzzle on the same date.
            </p>
            <GameSection id="wordle" title="Wordle">
              <p>
                <strong className="text-foreground">Wordle resets at midnight in your time zone.</strong>{" "}
                Your streak follows the same clock: a puzzle has to be solved before your local
                midnight to count, and finishing after it breaks the streak.
              </p>
              <p>
                Stuck before then?{" "}
                <Link href="/wordle-hint-today" className="font-semibold text-primary hover:text-primary/80">
                  Today&apos;s Wordle hints
                </Link>{" "}
                go from a gentle nudge to the answer, one step at a time.
              </p>
            </GameSection>
            <GameSection id="connections" title="Connections">
              <p>
                <strong className="text-foreground">Connections resets at midnight in your time zone.</strong>{" "}
                Streaks need a solve before local midnight, and puzzles played from the archive count
                toward your totals but never toward a streak.
              </p>
              <p>
                <Link href="/connections-hint-today" className="font-semibold text-primary hover:text-primary/80">
                  Today&apos;s Connections hints
                </Link>{" "}
                reveal one group at a time.
              </p>
            </GameSection>
            <GameSection id="strands" title="Strands">
              <p>
                <strong className="text-foreground">Strands resets at midnight in your time zone.</strong>{" "}
                Streaks follow the same local midnight, and NYT notes that a broken Strands streak
                cannot be reset.
              </p>
              <p>
                <Link href="/strands-hint-today" className="font-semibold text-primary hover:text-primary/80">
                  Today&apos;s Strands hints
                </Link>{" "}
                start with the theme and end with every word traced on the board.
              </p>
            </GameSection>
            <GameSection id="pips" title="Pips">
              <p>
                <strong className="text-foreground">Pips resets at midnight in your time zone</strong>, with
                the Easy, Medium and Hard boards all arriving together.
              </p>
              <p>
                <Link href="/pips-hint-today" className="font-semibold text-primary hover:text-primary/80">
                  Today&apos;s Pips hints
                </Link>{" "}
                cover all three boards, one domino at a time.
              </p>
            </GameSection>
            <GameSection id="sports-connections" title="Connections: Sports Edition">
              <p>
                <strong className="text-foreground">The Sports Edition also resets at midnight local time.</strong>{" "}
                It is made by The Athletic, NYT&apos;s sports newsroom, and runs alongside the regular
                Connections rather than replacing it.
              </p>
            </GameSection>
            <GameSection id="bonus-puzzles" title="Bonus Puzzles">
              <p>
                <strong className="text-foreground">Bonus Puzzles arrive once a week, on Wednesdays at midnight your time.</strong>{" "}
                Each drop has four or more twists on the familiar games — Wordle in 1, Connections
                3x3, Colorful Strands, Mystery Mini and the like.
              </p>
            </GameSection>
          </section>

          <section className="mt-14 max-w-3xl" aria-labelledby="eastern-heading">
            <h2 id="eastern-heading" className="font-heading text-2xl font-bold text-foreground">
              Spelling Bee, Letter Boxed and Tiles: New York Time
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              These games release once, for everyone, on New York&apos;s clock. Where you live only
              changes what your watch says when it happens.
            </p>
            <GameSection id="spelling-bee" title="Spelling Bee">
              <p>
                <strong className="text-foreground">Spelling Bee resets at 3 a.m. Eastern Time every day.</strong>{" "}
                That is midnight on the US West Coast, so no one in the lower 48 states sees a new Bee
                before their own midnight, while Europe gets it over breakfast.
              </p>
              <p>
                Our{" "}
                <Link href="/spelling-bee-hints-today" className="font-semibold text-primary hover:text-primary/80">
                  Spelling Bee hints
                </Link>{" "}
                and{" "}
                <Link href="/spelling-bee-answers" className="font-semibold text-primary hover:text-primary/80">
                  answers
                </Link>{" "}
                switch on the same 3 a.m. clock.
              </p>
            </GameSection>
            <GameSection id="letter-boxed" title="Letter Boxed">
              <p>
                <strong className="text-foreground">Letter Boxed resets at 3 a.m. Eastern Time</strong>, at the
                same moment as Spelling Bee — the two morning word games change together.
              </p>
            </GameSection>
            <GameSection id="tiles" title="Tiles">
              <p>
                <strong className="text-foreground">Tiles rotates its tile set at midnight Eastern Time.</strong>{" "}
                On the West Coast that is 9 p.m. the evening before.
              </p>
            </GameSection>
          </section>

          <section className="mt-14 max-w-3xl" aria-labelledby="crossword-heading">
            <h2 id="crossword-heading" className="font-heading text-2xl font-bold text-foreground">
              The Crossword, Midi, Mini and Sudoku: The Evening Before
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The crossword family goes up the night before its date, New York time. Most evenings
              that means 10 p.m. Eastern; on weekends it is earlier, at 6 p.m. The table below shows
              the next seven puzzles in your time zone.
            </p>
            <div className="mt-4">
              <ReleaseCalendar crossword={crossword.rule} mini={mini.rule} />
            </div>

            <h3 className="mt-8 font-heading text-lg font-bold text-foreground">The Weekly Schedule (Eastern Time)</h3>
            <div className="mt-3 overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full min-w-[26rem] text-sm">
                <thead>
                  <tr className="border-b border-border text-left font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    <th scope="col" className="px-4 py-2.5 font-normal">Puzzle for</th>
                    <th scope="col" className="px-4 py-2.5 font-normal">Crossword · Midi · Sudoku</th>
                    <th scope="col" className="px-4 py-2.5 font-normal">The Mini</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dashed divide-border">
                  {[1, 2, 3, 4, 5, 6, 0].map((d) => {
                    const eve = (d + 6) % 7;
                    return (
                      <tr key={d}>
                        <th scope="row" className="px-4 py-2 text-left font-semibold text-foreground">{WEEKDAYS[d]}</th>
                        <td className="px-4 py-2 text-foreground">
                          {WEEKDAYS[eve]}, {hourLabel(crosswordHours[eve])}
                        </td>
                        <td className={`px-4 py-2 ${miniHours[eve] !== crosswordHours[eve] ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                          {WEEKDAYS[eve]}, {hourLabel(miniHours[eve])}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div id="crossword" className="scroll-mt-24">
              <Source g={crossword} />
            </div>
            <div id="midi" className="scroll-mt-24">
              <Source g={game("midi")} />
            </div>
            <div id="mini" className="scroll-mt-24">
              <Source g={mini} />
            </div>
            <div id="sudoku" className="scroll-mt-24">
              <Source g={game("sudoku")} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              One difference stands out: NYT&apos;s Mini page puts Monday&apos;s Mini at 10 p.m. on Sunday,
              while the Crossword, Midi and Sudoku pages put Monday&apos;s puzzles at 6 p.m. on Sunday.
              Every other day, the four games share the same evening.
            </p>
          </section>

          <section className="mt-14 max-w-3xl" aria-labelledby="why-heading">
            <h2 id="why-heading" className="font-heading text-2xl font-bold text-foreground">
              Why Two Clocks?
            </h2>
            <div className="mt-2 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                NYT Games runs on two kinds of reset. The crossword family, Spelling Bee, Letter Boxed
                and Tiles release once for everyone, on New York time. That shared moment is what
                lets the Mini keep one leaderboard: in NYT&apos;s words, “when a new puzzle arrives each
                day, the leaderboard automatically resets.”
              </p>
              <p>
                Wordle, Connections, Strands and Pips follow your own midnight instead. Everyone gets
                a full local day with each puzzle, and a streak only breaks if you miss your own
                midnight — not New York&apos;s.
              </p>
            </div>
          </section>

          <section className="mt-14 max-w-3xl" aria-labelledby="dst-heading">
            <h2 id="dst-heading" className="font-heading text-2xl font-bold text-foreground">
              Daylight Saving Time: When the Times Shift
            </h2>
            <div className="mt-2 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Midnight-your-time games never shift: midnight is midnight, whatever your clocks do.
                The Eastern-time games move with New York&apos;s clocks, so outside the US their local
                time changes whenever New York or your own country switches.
              </p>
              {changeDate && (
                <p>
                  <strong className="text-foreground">New York&apos;s clocks next change on {changeDate}</strong>, when they{" "}
                  {fallsBack ? "fall back an hour (EDT to EST)" : "spring forward an hour (EST to EDT)"}.
                </p>
              )}
              <p>
                Europe and the US don&apos;t switch on the same weekend. In autumn Europe changes about a
                week earlier; in spring the US changes two to three weeks earlier. In those gaps,
                Spelling Bee lands an hour away from its usual local time — 7 a.m. in London instead
                of 8 a.m. The board at the top already accounts for this.
              </p>
            </div>
          </section>

          <section className="mt-14 max-w-3xl" aria-labelledby="ours-heading">
            <h2 id="ours-heading" className="font-heading text-2xl font-bold text-foreground">
              When Do WordleHint&apos;s Pages Update?
            </h2>
            <div className="mt-2 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Our Wordle, Connections, Strands and Pips pages switch to the new puzzle shortly after
                midnight Eastern Time, and the Spelling Bee pages shortly after 3 a.m. Eastern — one
                update for the whole world.
              </p>
              <p>
                If you&apos;re ahead of New York — anywhere in Europe, Asia or Australia — your game
                will show a new Wordle hours before our hint page does. Until it switches, the page
                still shows the previous puzzle; past puzzles stay in the{" "}
                <Link href="/wordle-answers" className="font-semibold text-primary hover:text-primary/80">
                  Wordle answers
                </Link>
                ,{" "}
                <Link href="/connections-answers" className="font-semibold text-primary hover:text-primary/80">
                  Connections
                </Link>
                ,{" "}
                <Link href="/strands-answers" className="font-semibold text-primary hover:text-primary/80">
                  Strands
                </Link>{" "}
                and{" "}
                <Link href="/pips-answers" className="font-semibold text-primary hover:text-primary/80">
                  Pips
                </Link>{" "}
                archives.
              </p>
            </div>
          </section>

          <div className="max-w-3xl">
            <DateFaq heading="NYT Games Reset FAQ" items={faq} />
            <p className="mt-4 text-xs text-muted-foreground">
              Vertex:{" "}
              <a href={VERTEX_NOTE.url} target="_blank" rel="noopener" className="underline hover:text-foreground">
                NYT Help
              </a>{" "}
              — “{VERTEX_NOTE.quote}”
            </p>
          </div>
        </div>
      </ResetClockProvider>
    </div>
  );
}
