import { cache } from "react";
import { getAllPuzzles } from "@/lib/wordle-daily";
import { getDefinition } from "@/lib/wordle-definitions";

export interface AnswerLookupEntry {
  /** YYYY-MM-DD of the (most recent) day this word was the answer. */
  date: string;
  partOfSpeech: string | null;
  /** Short, trimmed gloss for inline display (null if unknown). */
  definition: string | null;
}

/** word (uppercase) -> metadata. Serializable; passed to the client solver. */
export type AnswerLookup = Record<string, AnswerLookupEntry>;

function trim(text: string | null, max = 70): string | null {
  if (!text) return null;
  const clean = text.trim().replace(/\s+/g, " ");
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return `${slice.slice(0, lastSpace > 30 ? lastSpace : max).replace(/[.,;:]$/, "")}…`;
}

/**
 * Map of every word that has been a real Wordle answer to its date and a
 * short definition. Lets the solver flag and define genuine answers in its
 * results — a data touch competitors don't have. Cached at build time.
 */
export const getAnswerLookup = cache((): AnswerLookup => {
  const lookup: AnswerLookup = {};
  for (const p of getAllPuzzles()) {
    const word = p.answer.toUpperCase();
    // Keep the most recent date if a word ever repeats.
    if (lookup[word] && lookup[word].date >= p.date) continue;
    const def = getDefinition(word);
    lookup[word] = {
      date: p.date,
      partOfSpeech: def?.partOfSpeech ?? null,
      definition: trim(def?.definition ?? null),
    };
  }
  return lookup;
});
