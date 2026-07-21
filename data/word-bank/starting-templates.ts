import type { SpokeTemplate } from "./n-letter-types";
import type { BankLength } from "@/lib/word-bank";

/**
 * Starting-with spoke templates — one per length, ZERO shared prose.
 * 4-letter: short-word tactics + vocabulary-building angle.
 * 6-letter: suffix & word-structure angle.
 * 7-letter: Scrabble bingo / scoring angle.
 */

const FOUR: SpokeTemplate = {
  titlePattern: "4 Letter Words Starting With {LETTER} — {N} Words",
  descriptionPattern:
    "All {N} four-letter words that start with {LETTER}, everyday words first. Includes the highest-scoring picks like {TOP_WORD} ({TOP_SCORE} pts) and printable-friendly lists.",
  intro: [
    "There are {N} four-letter words starting with {LETTER_LOW} in the standard tournament word list, and {COMMON} of them are everyday words you'd actually say out loud. We list those familiar ones first, so you're not wading through obscure dictionary debris to find what you need.",
  ],
  sections: [
    {
      heading: "Short-Word Tactics: Why {LETTER}-Words Earn Their Keep",
      body: [
        "Four-letter words are the workhorses of every word game. They fit into cramped board positions, they're easy to pluralize or hook letters onto, and they let you dump awkward tiles without wasting a turn. Among the {LETTER_LOW}-starters here, the top scorer is {TOP_WORD} at {TOP_SCORE} points — small word, real damage.",
        "The most productive second letter after {LETTER} today is {TOP_SECOND}, which is worth memorizing as a pattern: when you're staring at a rack with {LETTER} in it, try that combination first and you'll usually land on something playable.",
      ],
    },
    {
      heading: "Learning and Teaching With This List",
      body: [
        "Short {LETTER_LOW}-words like {EXAMPLES} are also the backbone of early spelling practice — short enough to sound out, common enough to stick. If you're using this page with a young reader, start with the highlighted everyday tier and ignore the expandable rare-word section entirely; it exists for word-game players chasing legal plays, not vocabulary building.",
      ],
    },
    {
      heading: "Practice With a 4-Letter Game",
      body: [
        "Reading lists builds recognition; playing builds recall. Our free 4-letter word game deals you unlimited rounds of exactly these words — a faster way to make the {LETTER}-starters automatic than any flashcard.",
      ],
    },
  ],
  faq: [
    {
      question: "How many 4 letter words start with {LETTER}?",
      answer:
        "There are {N} four-letter words beginning with {LETTER} in the ENABLE tournament word list, of which {COMMON} are common everyday words. The full list of {BANK_TOTAL} four-letter words spans every starting letter.",
    },
    {
      question: "What is the highest-scoring 4 letter word starting with {LETTER}?",
      answer:
        "{TOP_WORD} is the top Scrabble scorer among {LETTER}-starters at {TOP_SCORE} points before bonus squares. Short high-value words like this are prime plays on double- and triple-word squares.",
    },
    {
      question: "Are these words valid in Scrabble and Words With Friends?",
      answer:
        "Yes — this list is built on the ENABLE lexicon, the public-domain list that word-game dictionaries are largely based on. A handful of words may differ across official dictionaries, so tournament players should confirm against their governing list.",
    },
  ],
};

const SIX: SpokeTemplate = {
  titlePattern: "6 Letter Words Starting With {LETTER} — Full List of {N}",
  descriptionPattern:
    "Browse {N} six-letter words beginning with {LETTER}, common words first, grouped by their second letter — with suffix patterns and top scorers like {TOP_WORD}.",
  intro: [
    "Six letters is where English starts building words out of parts — roots picking up endings like -ED, -ER and -ING. Of the {BANK_TOTAL} six-letter words in the tournament list, {N} start with {LETTER_LOW}, and the {COMMON} genuinely common ones lead each group below.",
  ],
  sections: [
    {
      heading: "The Structure of {LETTER}-Words: Prefixes Doing the Work",
      body: [
        "Scan the list and you'll notice most six-letter {LETTER_LOW}-words aren't arbitrary strings — they're five-letter words wearing a suffix, or four-letter roots wearing two. That's the practical trick for finding them mid-game: think of a shorter {LETTER}-word you already know, then test its longer forms. The dominant second letter here is {TOP_SECOND}, so the {LETTER}{TOP_SECOND}-family is the richest hunting ground on this page.",
        "Words like {EXAMPLES} show the pattern: familiar cores, standard endings. Train yourself to see the seams and six-letter words stop feeling long.",
      ],
    },
    {
      heading: "Where Six-Letter Words Win Games",
      body: [
        "In Scrabble and Words With Friends, six-letter plays hit the sweet spot between makeable and meaningful — long enough to reach premium squares, short enough that your rack can actually produce them. The best scorer among these is {TOP_WORD} at {TOP_SCORE} points. In crossword fills and word ladders, six-letter {LETTER_LOW}-entries are among the most requested lengths, which is exactly what the second-letter grouping below is built for.",
      ],
    },
    {
      heading: "Drill the Length, Not Just the List",
      body: [
        "If six-letter words are your weak spot, our free 6-letter word game deals endless rounds at exactly this length — the fastest way to turn this reference list into words you can summon from a rack.",
      ],
    },
  ],
  faq: [
    {
      question: "How many 6 letter words start with {LETTER}?",
      answer:
        "The tournament word list contains {N} six-letter words starting with {LETTER}; {COMMON} of them are high-frequency everyday words, which we surface first in every group.",
    },
    {
      question: "What are common 6 letter words that start with {LETTER}?",
      answer:
        "Everyday examples include {EXAMPLES}. The highlighted tier at the top of each second-letter group below covers all {COMMON} common {LETTER}-words at this length.",
    },
    {
      question: "What 6 letter {LETTER}-word scores highest in Scrabble?",
      answer:
        "{TOP_WORD} leads at {TOP_SCORE} points before bonuses. Six-letter words are often your bridge to premium squares that five-letter plays just miss.",
    },
  ],
};

const SEVEN: SpokeTemplate = {
  titlePattern: "7 Letter Words Starting With {LETTER} — {N} Bingo Candidates",
  descriptionPattern:
    "Every one of the {N} seven-letter words starting with {LETTER} — the bingo length. Common words first, top scorer {TOP_WORD} ({TOP_SCORE} pts), grouped for fast scanning.",
  intro: [
    "Seven letters is the money length: play all seven tiles in Scrabble and the 50-point bingo bonus turns a decent turn into a game-winning one. This page holds all {N} seven-letter words starting with {LETTER_LOW} from the tournament list — {COMMON} of them words you'd recognize at the breakfast table, listed first.",
  ],
  sections: [
    {
      heading: "Bingo Hunting Through the {LETTER}-List",
      body: [
        "Nobody memorizes {N} words. Bingo players memorize *shapes*: high-probability letter mixes and the words they collapse into. When your rack starts with {LETTER}, the second letter to test first is {TOP_SECOND} — it heads the biggest family on this page. And when the tiles are ugly, remember the ceiling here: {TOP_WORD}, worth {TOP_SCORE} points before you even touch the bingo bonus.",
        "The common tier — words like {EXAMPLES} — matters more than the rare tail for practical play. A bingo you can actually find in 30 seconds beats a theoretical one you can't.",
      ],
    },
    {
      heading: "Beyond Scrabble: Where This Length Shows Up",
      body: [
        "Seven-letter entries are a crossword staple (the classic 15×15 grid leans on them heavily), a frequent word-ladder rung, and the standard rack size in most tile games — which is why this length has the largest list on our site: {BANK_TOTAL} words across all letters, {N} of them starting with {LETTER}. The second-letter groups below keep that volume scannable, and the rare tail stays folded until you ask for it.",
      ],
    },
    {
      heading: "Turn Reference Into Reflex",
      body: [
        "Our free 7-letter word game runs unlimited rounds at exactly this length. Ten minutes of play does more for your bingo vision than an hour of list-reading — use this page to check and settle, use the game to build the instinct.",
      ],
    },
  ],
  faq: [
    {
      question: "How many 7 letter words start with {LETTER}?",
      answer:
        "There are {N} seven-letter words beginning with {LETTER} in the ENABLE tournament list, out of {BANK_TOTAL} seven-letter words overall. The {COMMON} common ones are highlighted at the top of each group.",
    },
    {
      question: "What is a bingo in Scrabble?",
      answer:
        "A bingo is playing all seven of your tiles in one turn, earning a 50-point bonus on top of the word's value. Seven-letter words are the natural bingo length, which is why players study lists like this one.",
    },
    {
      question: "What's the best 7 letter {LETTER}-word for points?",
      answer:
        "{TOP_WORD} tops this page at {TOP_SCORE} points before bonuses — as a bingo it would add 50 more. High-value letters like J, Q, X and Z drive most of the big scorers.",
    },
  ],
};

export const STARTING_TEMPLATES: Partial<Record<BankLength, SpokeTemplate>> = {
  4: FOUR,
  6: SIX,
  7: SEVEN,
};
