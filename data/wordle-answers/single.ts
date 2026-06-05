import type { AnswerEntry } from "@/lib/wordle-answers";

export type AnswerMode = "today" | "yesterday";

export interface SingleFaq {
  question: string;
  answer: string;
}

/**
 * FAQ copy for the single-answer pages.
 * For "today" we deliberately avoid printing the solution word in plain text
 * so the page stays spoiler-safe above the reveal; "yesterday" can name it.
 */
export function buildFaq(mode: AnswerMode, entry: AnswerEntry): SingleFaq[] {
  if (mode === "today") {
    return [
      {
        question: "What is today's Wordle answer?",
        answer:
          "Today's Wordle answer is shown at the top of this page behind a one-tap reveal, so you won't see it by accident. Click 'Reveal today's answer' whenever you're ready.",
      },
      {
        question: "What does today's Wordle answer mean?",
        answer:
          "Reveal the answer above to see its dictionary definition, part of speech, and an example sentence — every solution comes with its meaning.",
      },
      {
        question: "I don't want the answer — can I get a hint instead?",
        answer:
          "Yes. Today's Wordle hints reveal the solution one clue at a time — letter count, vowels, the first letter, and more — so you can solve it yourself without spoiling the challenge.",
      },
      {
        question: "When does the Wordle answer change?",
        answer:
          "A new Wordle and a new answer go live at midnight in your local timezone, following The New York Times' daily rollover. This page updates automatically each day.",
      },
      {
        question: "Where can I see past Wordle answers?",
        answer:
          "Browse the full archive of past Wordle answers — every solution with its date, puzzle number, and definition — on our Past Wordle Answers page.",
      },
    ];
  }

  return [
    {
      question: "What was yesterday's Wordle answer?",
      answer: `Yesterday's Wordle answer was ${entry.answer} (puzzle #${entry.id}). You can see its meaning and that day's full hints on this page.`,
    },
    {
      question: `What does ${entry.answer} mean?`,
      answer: entry.definition
        ? `${entry.answer} (${entry.partOfSpeech ?? "word"}): ${entry.definition}`
        : `See the definition card on this page for the meaning of ${entry.answer}.`,
    },
    {
      question: "What is today's Wordle answer?",
      answer:
        "Today's answer lives on our Today's Wordle Answer page, kept behind a spoiler reveal so you only see it when you're ready.",
    },
    {
      question: "Where can I see every past Wordle answer?",
      answer:
        "Our Past Wordle Answers archive lists every tracked solution with its date, puzzle number, and definition, and it's searchable by word.",
    },
  ];
}

export function buildCopy(
  mode: AnswerMode,
  entry: AnswerEntry,
  formattedDate: string
) {
  if (mode === "today") {
    return {
      badge: "Today's Wordle Answer",
      h1: `Today's Wordle Answer — ${formattedDate}`,
      intro:
        "Here's the answer to today's Wordle, puzzle #" +
        entry.id +
        ". We keep it hidden behind a one-tap reveal so you never get spoiled by accident — and every answer comes with its full definition. Prefer a nudge? Grab today's progressive hints instead.",
      evergreenHeading: "About Today's Wordle Answer",
      evergreen: [
        "Every day, The New York Times publishes a new five-letter Wordle for players worldwide — and the answer is the same for everyone. This page is updated automatically the moment the new puzzle goes live, so you'll always find the current day's solution here, paired with what the word actually means.",
        "We hide the answer behind a reveal button on purpose. If you landed here mid-game and only wanted to check one thing, you won't lose your streak to an accidental spoiler. And if you'd rather solve it yourself, our progressive hints walk you from a gentle category clue down to the letter pattern.",
      ],
    };
  }

  return {
    badge: "Yesterday's Wordle Answer",
    h1: `Yesterday's Wordle Answer — ${formattedDate}`,
    intro: `Yesterday's Wordle answer was ${entry.answer}, puzzle #${entry.id}. Below you'll find what it means, how tricky it was, and a link to that day's full set of hints.`,
    evergreenHeading: "About Yesterday's Wordle Answer",
    evergreen: [
      `Missed yesterday's puzzle or just want to confirm the solution? Yesterday's Wordle answer was ${entry.answer}. Like every NYT Wordle, it was a five-letter word shared by players everywhere that day.`,
      "If you're here to keep your streak going, head to today's answer or today's hints. And to look further back, our searchable archive holds every past Wordle answer with its definition and puzzle number.",
    ],
  };
}
