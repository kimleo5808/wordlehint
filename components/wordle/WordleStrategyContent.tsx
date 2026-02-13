import Link from "next/link";

/**
 * Evergreen strategy content block shared between
 * wordle-hint-today and wordle-hint/[date] pages.
 */
export default function WordleStrategyContent() {
  return (
    <section className="border-t border-border bg-background py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Wordle Tips &amp; Best Starting Words
        </h2>

        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Choosing the right starting word is the single biggest factor in
            solving Wordle quickly. Data analysis of the full answer pool shows
            that words like{" "}
            <strong className="text-foreground">CRANE</strong>,{" "}
            <strong className="text-foreground">SLATE</strong>,{" "}
            <strong className="text-foreground">TRACE</strong>, and{" "}
            <strong className="text-foreground">SALET</strong> eliminate the most
            possibilities on average. These words test the highest-frequency
            letters in English: E, A, R, S, T, L, and N.
          </p>

          <h3 className="font-heading text-base font-semibold text-foreground">
            The Two-Word Opening Strategy
          </h3>
          <p>
            After your first guess, play a second word that tests entirely
            different letters. For example, CRANE followed by PILOT covers 10
            unique letters across two guesses. By guess 3, you&apos;ll typically
            have enough information to narrow the answer to 1-3 candidates.
          </p>

          <h3 className="font-heading text-base font-semibold text-foreground">
            How to Use Our 5-Level Hint System
          </h3>
          <p>
            Our daily Wordle hints are designed to help you solve the puzzle
            without fully spoiling the answer. Here&apos;s how to get the most
            out of each level:
          </p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>
              <strong className="text-foreground">Hint 1 — Category:</strong>{" "}
              A broad clue about the word&apos;s meaning or category. Use this
              to brainstorm possible words before your next guess.
            </li>
            <li>
              <strong className="text-foreground">Hint 2 — Vowels:</strong>{" "}
              Knowing which vowels appear (and how many) dramatically narrows
              the possibilities. Pair this with your existing color clues.
            </li>
            <li>
              <strong className="text-foreground">Hint 3 — First Letter:</strong>{" "}
              The starting letter alone can reduce candidates by 70-90%. If you
              already know some letters, this often reveals the answer.
            </li>
            <li>
              <strong className="text-foreground">Hint 4 — Last Letter:</strong>{" "}
              Common endings like -E, -Y, -T, -S help you recognize word
              patterns instantly.
            </li>
            <li>
              <strong className="text-foreground">Hint 5 — Letter Pattern:</strong>{" "}
              Shows the first and last letters with blanks between. At this
              point, most players can solve it in one guess.
            </li>
          </ul>

          <h3 className="font-heading text-base font-semibold text-foreground">
            Common Patterns to Watch For
          </h3>
          <p>
            Around 15% of Wordle answers contain a repeated letter (like SPEED
            or GRASS). If your guesses have confirmed 4 unique letters but the
            word still doesn&apos;t click, consider that one letter might appear
            twice. Also watch for less common letter combinations like GH, PH,
            and QU — they appear more often than you&apos;d expect.
          </p>

          <p>
            For a complete guide to Wordle strategy, visit our{" "}
            <Link
              href="/how-to-play-wordle"
              className="font-medium text-primary hover:text-primary/80"
            >
              How to Play Wordle
            </Link>{" "}
            page, or try our{" "}
            <Link
              href="/wordle-solver"
              className="font-medium text-primary hover:text-primary/80"
            >
              Wordle Solver
            </Link>{" "}
            tool for targeted letter-pattern searches. You can also practice
            with unlimited free games in{" "}
            <Link
              href="/5-letters"
              className="font-medium text-primary hover:text-primary/80"
            >
              5-letter
            </Link>
            ,{" "}
            <Link
              href="/6-letters"
              className="font-medium text-primary hover:text-primary/80"
            >
              6-letter
            </Link>
            , or{" "}
            <Link
              href="/7-letters"
              className="font-medium text-primary hover:text-primary/80"
            >
              7-letter
            </Link>{" "}
            formats.
          </p>
        </div>
      </div>
    </section>
  );
}
