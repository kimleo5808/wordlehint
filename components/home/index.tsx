import { GUIDES } from "@/data/guides";
import { LETTER_GAMES } from "@/data/letter-games";
import { generateHints } from "@/lib/wordle-hints";
import { getTodayPuzzle, getRecentPuzzles, getPuzzleCount } from "@/lib/wordle-daily";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  Eye,
  Gamepad2,
  Lightbulb,
  Lock,
  Map,
  Puzzle,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const FEATURE_ICONS = [Lightbulb, Target, Zap, BookOpen, Puzzle, Shield];

function FaqAccordionItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-xl border border-border bg-card transition-colors open:bg-primary/5">
      <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-foreground transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
        <h3 className="text-[0.95rem] leading-snug">{question}</h3>
        <ChevronDown className="h-4 w-4 shrink-0 text-primary/60 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {answer}
        </p>
      </div>
    </details>
  );
}

const WORD_LENGTH_META: Record<number, { label: string; difficulty: string; color: string }> = {
  4: { label: "Quick & Easy", difficulty: "Beginner", color: "from-emerald-500 to-emerald-600" },
  5: { label: "Classic Wordle", difficulty: "Standard", color: "from-blue-500 to-blue-600" },
  6: { label: "Step Up", difficulty: "Intermediate", color: "from-violet-500 to-violet-600" },
  7: { label: "Advanced", difficulty: "Advanced", color: "from-amber-500 to-amber-600" },
  8: { label: "Expert", difficulty: "Expert", color: "from-orange-500 to-orange-600" },
  9: { label: "Master", difficulty: "Master", color: "from-rose-500 to-rose-600" },
  10: { label: "Ultimate", difficulty: "Ultimate", color: "from-red-600 to-red-700" },
  11: { label: "Maximum", difficulty: "Extreme", color: "from-red-700 to-red-900" },
};

const HINT_COLORS = [
  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "bg-rose-500/10 text-rose-400 border-rose-500/20",
];

function formatDateDisplay(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00Z");
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function HomeComponent() {
  const t = await getTranslations("HomePage");

  const todayPuzzle = getTodayPuzzle();
  const hints = todayPuzzle ? generateHints(todayPuzzle) : null;
  const recentPuzzles = getRecentPuzzles(7);
  const puzzleCount = getPuzzleCount();

  return (
    <div className="w-full grid-bg">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary">
            <CalendarDays className="h-4 w-4" />
            {t("hero.badge")}
            {todayPuzzle && (
              <span className="text-primary/70">
                — {formatDateDisplay(todayPuzzle.date)}
              </span>
            )}
          </div>
          <h1 className="mt-6 font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-5 text-lg text-slate-300 sm:text-xl max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/wordle-hint-today"
              className="group inline-flex items-center gap-2 rounded-xl bg-cta px-7 py-3.5 text-sm font-bold text-cta-foreground shadow-lg shadow-cta/25 transition-all hover:bg-cta/90 hover:shadow-cta/30"
            >
              <Lightbulb className="h-4 w-4" />
              Today&apos;s Wordle Hint
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/5-letters"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-600 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:border-slate-500 hover:bg-slate-800"
            >
              {t("hero.ctaPrimary")}
            </Link>
          </div>

          {/* Quick stats — dynamic */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {todayPuzzle ? (
              <>
                <div className="text-center">
                  <div className="font-heading text-2xl font-bold text-white">#{todayPuzzle.id}</div>
                  <div className="text-xs text-slate-400">Today&apos;s Puzzle</div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-2xl font-bold text-white">5</div>
                  <div className="text-xs text-slate-400">Hints Available</div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-2xl font-bold text-white">Free</div>
                  <div className="text-xs text-slate-400">No Spoilers</div>
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="font-heading text-2xl font-bold text-white">{puzzleCount}+</div>
                  <div className="text-xs text-slate-400">Daily Puzzles</div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-2xl font-bold text-white">4-11</div>
                  <div className="text-xs text-slate-400">Word Games</div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-2xl font-bold text-white">Free</div>
                  <div className="text-xs text-slate-400">No Spoilers</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Today's Wordle Hint Preview */}
      <section className="py-10 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/5 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                  Hint for Today&apos;s Wordle
                </h2>
                {todayPuzzle && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Puzzle #{todayPuzzle.id} — {formatDateDisplay(todayPuzzle.date)}
                  </p>
                )}
              </div>
              <Link
                href="/wordle-hint-today"
                className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
              >
                All 5 Hints
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {hints ? (
              <div className="space-y-3">
                {/* Hint 1 — revealed */}
                <div className={`flex items-start gap-3 rounded-xl border p-4 ${HINT_COLORS[0]}`}>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-sm font-bold">
                    {hints[0].icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-wide opacity-70">
                      Hint 1 — {hints[0].label}
                    </div>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {hints[0].hint}
                    </p>
                  </div>
                </div>

                {/* Hints 2-5 — locked */}
                {hints.slice(1).map((h, i) => (
                  <div
                    key={h.level}
                    className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/30 p-4 opacity-60"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <Lock className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Hint {h.level} — {h.label}
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground/70">
                        Reveal on the full hints page
                      </p>
                    </div>
                    <Eye className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-muted/30 p-6 text-center">
                <Lightbulb className="mx-auto h-8 w-8 text-primary/40" />
                <p className="mt-3 text-sm text-muted-foreground">
                  Today&apos;s Wordle hints are being prepared. Check back soon!
                </p>
              </div>
            )}

            <div className="mt-5 text-center">
              <Link
                href="/wordle-hint-today"
                className="group inline-flex items-center gap-2 rounded-xl bg-cta px-6 py-3 text-sm font-bold text-cta-foreground shadow-md shadow-cta/20 transition-all hover:bg-cta/90"
              >
                <Lightbulb className="h-4 w-4" />
                See All Today&apos;s Wordle Hints
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Word Games Grid */}
      <section id="word-games" className="py-14 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Gamepad2 className="h-4 w-4" />
              Word Games
            </div>
            <h2 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">
              {t("wordGames.title")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t("wordGames.description")}
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {LETTER_GAMES.map((g) => {
              const meta = WORD_LENGTH_META[g.wordLength];
              return (
                <Link
                  key={g.slug}
                  href={`/${g.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${meta.color} font-heading text-xl font-bold text-white transition-transform group-hover:scale-110`}>
                    {g.wordLength}
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-foreground">
                    {g.wordLength}-Word Wordle
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {meta.label}
                  </p>
                  <span className="mt-1 inline-block rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {meta.difficulty}
                  </span>
                  <div className="mt-2 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Play Now →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* What is Wordle? */}
      <section className="py-14 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            What is Wordle?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Wordle is a word guessing game where you have 6 attempts to guess a hidden word. After each guess, color-coded feedback tells you how close you are to the answer.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-wordle-correct/20 text-wordle-correct">
                <span className="font-heading text-xl font-bold">G</span>
              </div>
              <h3 className="mt-3 text-sm font-bold text-foreground">Green = Correct</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Right character, right position.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-wordle-present/20 text-wordle-present">
                <span className="font-heading text-xl font-bold">Y</span>
              </div>
              <h3 className="mt-3 text-sm font-bold text-foreground">Yellow = Present</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                In the word, but wrong position.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-wordle-absent/20 text-wordle-absent">
                <span className="font-heading text-xl font-bold">X</span>
              </div>
              <h3 className="mt-3 text-sm font-bold text-foreground">Gray = Absent</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Not in the word at all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-14 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Wordle Hints &amp; Tools to Improve Your Game
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((index) => {
              const Icon = FEATURE_ICONS[index];
              return (
                <div
                  key={index}
                  className="group rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-foreground">
                    {t(`features.${index}.title`)}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {t(`features.${index}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ - 2 column */}
      <section className="py-14 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-foreground text-center">
            {t("faq.title")}
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            {t("faq.description")}
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
              <FaqAccordionItem
                key={index}
                question={t(`faqItems.${index}.question`)}
                answer={t(`faqItems.${index}.answer`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Guides Promotion */}
      {GUIDES.length > 0 && (
        <section className="py-14 bg-background">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Map className="h-4 w-4" />
                Strategy Guides
              </div>
              <h2 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                Master Wordle with Expert Guides
              </h2>
              <p className="mt-2 text-muted-foreground">
                Take your Wordle skills to the next level with our comprehensive strategy guides
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {GUIDES.slice(0, 6).map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg transition-transform group-hover:scale-110">
                    {guide.icon}
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-foreground">
                    {guide.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {guide.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                    Read Guide
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
            {GUIDES.length > 6 && (
              <div className="mt-6 text-center">
                <Link
                  href="/guides"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  View All {GUIDES.length} Guides →
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Long-form SEO Content */}
      <section className="py-14 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Wordle Hint Today: Your Complete Daily Guide
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Welcome to <strong className="text-foreground">WordleHint</strong> — the go-to destination for <strong className="text-foreground">today&apos;s Wordle hints</strong>, daily clues, and spoiler-free answers. Whether you need a quick <strong className="text-foreground">hint for today&apos;s Wordle</strong> or want to practice with unlimited free games, you&apos;ll find everything here.
          </p>

          <h3 className="mt-8 font-heading text-lg font-semibold text-foreground">
            What is a Wordle Hint?
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            A <strong className="text-foreground">Wordle hint</strong> is any clue that helps you guess the hidden word more efficiently. Hints range from general advice (like &ldquo;start with a vowel-rich word&rdquo;) to specific clues (like &ldquo;the answer contains E&rdquo;). On WordleHint, we provide a <strong className="text-foreground">5-level progressive hint system</strong> for the daily NYT Wordle puzzle, plus strategy guides and pattern recognition tips for every skill level.
          </p>

          <h3 className="mt-8 font-heading text-lg font-semibold text-foreground">
            Today&apos;s Wordle Hints: How Our Daily Clues Work
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Every day, we publish 5 progressive <strong className="text-foreground">Wordle hints</strong> for the current NYT puzzle. Each hint reveals a little more about the answer — you choose how much help you need:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ["Hint 1 — Word Makeup:", "How many vowels and consonants, plus whether any characters repeat."],
              ["Hint 2 — Vowel Clue:", "Which specific vowels appear in the word."],
              ["Hint 3 — Starting Clue:", "The word's opening character — often enough to solve it."],
              ["Hint 4 — Ending Clue:", "The word's final character narrows it down further."],
              ["Hint 5 — Word Pattern:", "First and last positions revealed with blanks in between."],
            ].map(([title, desc]) => (
              <li key={title} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span><strong className="text-foreground">{title}</strong> {desc}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Visit our{" "}
            <Link href="/wordle-hint-today" className="font-medium text-primary hover:text-primary/80">today&apos;s Wordle hint page</Link>{" "}
            to try the progressive clues, or browse the{" "}
            <Link href="/wordle-hint" className="font-medium text-primary hover:text-primary/80">hint archive</Link>{" "}
            for past puzzles.
          </p>

          <h3 className="mt-8 font-heading text-lg font-semibold text-foreground">
            Best Starting Words for Wordle
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Choosing the right starting word is the most important <strong className="text-foreground">Wordle hint</strong> we can offer. The best opening words contain common characters and test multiple vowels:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ["CRANE:", "Covers C, R, A, N, E — five of the most frequent characters in English. Widely regarded as the statistically optimal first guess."],
              ["SLATE:", "Tests S, L, A, T, E — another top-tier combination that reveals critical information on your first move."],
              ["TRACE:", "Includes T, R, A, C, E — strong consonant coverage with two common vowels."],
              ["ADIEU:", "Tests four vowels (A, D, I, E, U) in a single guess — ideal if you prefer a vowel-first strategy."],
            ].map(([title, desc]) => (
              <li key={title} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span><strong className="text-foreground">{title}</strong> {desc}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 font-heading text-lg font-semibold text-foreground">
            Wordle Strategy: How to Solve in Fewer Guesses
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Beyond choosing a strong starting word, effective <strong className="text-foreground">Wordle hint</strong> strategy involves systematic elimination and pattern recognition:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ["Eliminate, don't confirm:", "Use your second guess to test entirely new characters rather than confirming ones you already know are present."],
              ["Track tile positions:", "A yellow tile in position 2 means that character exists but NOT in position 2 — use this information precisely."],
              ["Think about common patterns:", "English words frequently end in -TION, -IGHT, -OUND, -ANCE, and -MENT. Recognizing these patterns narrows your options fast."],
              ["Consider doubles:", "Words like HAPPY, TEETH, and CHESS contain repeated characters. If you're stuck with 4 confirmed spots, a double might be the answer."],
              ["Use Hard Mode thinking:", "Even in normal mode, forcing yourself to use known information in every guess builds better solving habits."],
            ].map(([title, desc]) => (
              <li key={title} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span><strong className="text-foreground">{title}</strong> {desc}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 font-heading text-lg font-semibold text-foreground">
            Hint for Today&apos;s Wordle: Quick Tips
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Need a quick <strong className="text-foreground">hint for today&apos;s Wordle</strong>? Start with CRANE or SLATE, then use your second guess to test 5 completely new characters. By guess 3, you should have enough information to narrow down the answer. If you&apos;re still stuck, our{" "}
            <Link href="/wordle-hint-today" className="font-medium text-primary hover:text-primary/80">daily Wordle hint page</Link>{" "}
            gives you 5 progressive clues — reveal only what you need.
          </p>

          <h3 className="mt-8 font-heading text-lg font-semibold text-foreground">
            NYT Wordle Hint: How We Generate Daily Clues
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Our <strong className="text-foreground">NYT Wordle hints</strong> are generated fresh every day based on the official New York Times Wordle puzzle. We analyze the answer word and create 5 increasingly specific clues — from general word makeup all the way to a partial reveal pattern. This way, you can get exactly the level of help you need without accidentally seeing the full answer.
          </p>

          <h3 className="mt-8 font-heading text-lg font-semibold text-foreground">
            Wordle for Every Skill Level
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Beyond daily hints, WordleHint offers unlimited free Wordle games in every word size from 4 to 11 characters:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ["4–5 Characters:", "Perfect for beginners and daily warm-ups. The classic 5-character format is the gold standard of Wordle."],
              ["6–7 Characters:", "Intermediate challenges where prefixes, suffixes, and doubles become key strategic elements."],
              ["8–9 Characters:", "Advanced puzzles requiring compound word awareness, morphological thinking, and strong vocabulary."],
              ["10–11 Characters:", "The ultimate challenge — academic vocabulary, Latin/Greek roots, and multi-morpheme analysis required."],
            ].map(([title, desc]) => (
              <li key={title} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span><strong className="text-foreground">{title}</strong> {desc}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 font-heading text-lg font-semibold text-foreground">
            Start Playing Now
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Ready to put these <strong className="text-foreground">Wordle hint</strong> strategies into action? Check{" "}
            <Link href="/wordle-hint-today" className="font-medium text-primary hover:text-primary/80">today&apos;s Wordle hints</Link>{" "}
            for the daily puzzle, jump into our classic{" "}
            <Link href="/5-letters" className="font-medium text-primary hover:text-primary/80">5-letter Wordle</Link>{" "}
            for unlimited practice, or explore our{" "}
            <Link href="/guides" className="font-medium text-primary hover:text-primary/80">strategy guides</Link>{" "}
            for deeper insights. Every game is free, unlimited, and requires no account.
          </p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-primary">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-primary-foreground sm:text-3xl">
            Ready to Play?
          </h2>
          <p className="mt-3 text-primary-foreground/80">
            Get today&apos;s Wordle hint or play unlimited free games — no account required.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/wordle-hint-today"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-primary shadow-lg transition-all hover:bg-white/90"
            >
              <Lightbulb className="h-4 w-4" />
              Today&apos;s Hint
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/5-letters"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Play 5-Letter Wordle
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
