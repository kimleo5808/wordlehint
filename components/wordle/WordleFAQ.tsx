/**
 * Shared FAQ component for daily hint pages.
 * Renders visible FAQ items + provides data for FAQPage schema.
 */

export const WORDLE_FAQ_ITEMS = [
  {
    question: "What is the best starting word for Wordle?",
    answer:
      "Popular high-performing starting words include CRANE, SLATE, TRACE, and SALET. These words test the most frequently used letters in English — E, A, R, S, T, L, and N — and help you eliminate or confirm key letters on your first guess.",
  },
  {
    question: "How many guesses do you get in Wordle?",
    answer:
      "You get 6 guesses to solve the daily Wordle puzzle. After each guess, the tiles change color: green means correct letter in the correct position, yellow means the letter is in the word but in the wrong position, and gray means the letter is not in the word.",
  },
  {
    question: "What time does the Wordle reset?",
    answer:
      "The daily Wordle puzzle resets at midnight Eastern Time (ET) each day. That's 5:00 AM UTC or 9:00 PM PT the previous day. Our hints are updated as soon as the new puzzle is available.",
  },
  {
    question: "Can Wordle answers have repeated letters?",
    answer:
      "Yes. Wordle answers can contain repeated letters — for example, SPEED has two E's and GRASS has two S's. Around 15% of Wordle answers include at least one repeated letter, which is why it's important to consider this possibility when guessing.",
  },
  {
    question: "What is Wordle Hard Mode?",
    answer:
      "In Hard Mode, any revealed hints must be used in subsequent guesses. If a letter turns green, it must stay in that position. If a letter turns yellow, it must be included in your next guess. This prevents random guessing and forces you to build on what you know.",
  },
  {
    question: "How do your Wordle hints work?",
    answer:
      "We provide 5 progressive hints for each daily Wordle puzzle. Hint 1 gives a category clue, Hint 2 reveals vowel information, Hint 3 shows the first letter, Hint 4 reveals the last letter, and Hint 5 provides a letter pattern. You can reveal hints one at a time and stop whenever you have enough information to solve.",
  },
  {
    question: "Is this the official Wordle game?",
    answer:
      "No. WordleHint is an independent fan site that provides daily hints, strategy guides, and unlimited Wordle-style practice games. The official Wordle is published daily by The New York Times. Wordle is a trademark of The New York Times Company.",
  },
  {
    question: "Where can I find hints for past Wordle puzzles?",
    answer:
      "Visit our Hint Archive page to browse hints and answers for previous Wordle puzzles. Each archived puzzle includes the same 5-level progressive hint system, along with the word's definition and difficulty rating.",
  },
  {
    question: "How can I improve at Wordle?",
    answer:
      "Start with a strong opening word (like CRANE or SLATE), then use your second guess to test entirely new letters. Pay attention to letter positions — a yellow letter tells you where the letter is NOT. Avoid reusing gray letters. Practice with our unlimited free games in multiple word lengths to build pattern recognition skills.",
  },
  {
    question: "Does WordleHint show today's answer?",
    answer:
      "Yes — but only if you choose to see it. The answer is hidden behind a clearly marked spoiler button. We recommend trying our 5 progressive hints first before revealing the full answer.",
  },
];

export default function WordleFAQ({
  maxItems = 10,
}: {
  maxItems?: number;
}) {
  const items = WORDLE_FAQ_ITEMS.slice(0, maxItems);

  return (
    <section className="border-t border-border bg-muted/30 py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Frequently Asked Questions
        </h2>

        <div className="mt-5 space-y-4">
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-lg border border-border bg-card"
            >
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-foreground hover:text-primary">
                {item.question}
                <svg
                  className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
