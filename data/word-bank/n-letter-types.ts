import type { BankLength } from "@/lib/word-bank";

/**
 * Content contracts for the 4/6/7-letter word clusters.
 *
 * Anti-duplication design: each (length × direction) pair has its OWN
 * template (zero prose shared between templates), every page injects its own
 * live statistics via {PLACEHOLDER} tokens, and every page opens with a
 * hand-written per-letter hook (see letter-hooks.ts).
 *
 * Supported placeholders (resolved at render):
 *   {LETTER} {LETTER_LOW} — the page's letter, upper/lower case
 *   {N} — total words on this page   {COMMON} — common-tier words on page
 *   {BANK_TOTAL} — all words of this length   {BANK_COMMON} — common tier size
 *   {TOP_WORD} {TOP_SCORE} — highest-Scrabble word on this page + points
 *   {TOP_SECOND} — most frequent second letter, with count, e.g. "A (214 words)"
 *   {EXAMPLES} — 3 common words from this page, comma-separated
 */

export interface SpokeTemplate {
  /** Rendered into <title> / H1; placeholders allowed. */
  titlePattern: string;
  descriptionPattern: string;
  /** Intro paragraphs shown under the hero (after the per-letter hook). */
  intro: string[];
  sections: {
    heading: string; // H2, placeholders allowed
    body: string[]; // paragraphs, placeholders allowed
  }[];
  faq: { question: string; answer: string }[]; // placeholders allowed
}

export interface LengthHubContent {
  length: BankLength;
  title: string;
  description: string;
  heroBadge: string;
  heroIntro: string;
  /** ≥1500 words total across sections, hand-written per length. */
  sections: {
    heading: string;
    body: string[];
    /** Optional H3 subsections. */
    subs?: { heading: string; body: string[] }[];
  }[];
  faq: { question: string; answer: string }[];
  /** Definition-style quotable block (GEO). */
  definition: string;
}

/** 2–3 hand-written sentences unique to one (length, letter) page. */
export type LetterHooks = Record<string, string>; // key = letter a–z
