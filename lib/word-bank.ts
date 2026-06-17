import { cache } from "react";
import { getAllPuzzles } from "@/lib/wordle-daily";
import { getDefinition } from "@/lib/wordle-definitions";

/* ------------------------------------------------------------------ */
/*  Static word bank (built by scripts/build-word-bank.mjs)            */
/* ------------------------------------------------------------------ */

export interface WordBankFile {
  length: number;
  source: string;
  lastBuilt: string;
  count: number;
  commonCount: number;
  words: string[]; // all valid guesses, A–Z, uppercase
  common: string[]; // subset in the official answer pool
}

const loadBank = cache((): WordBankFile => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@/data/word-bank/5.json") as WordBankFile;
});

/** Set of common (answer-pool) words for O(1) membership tests. */
const commonSet = cache((): Set<string> => new Set(loadBank().common));

/** Set of words that have actually been NYT Wordle daily answers. */
const answeredSet = cache((): Set<string> => {
  return new Set(getAllPuzzles().map((p) => p.answer.toUpperCase()));
});

/* ------------------------------------------------------------------ */
/*  Word metadata                                                      */
/* ------------------------------------------------------------------ */

export interface BankWord {
  word: string;
  common: boolean; // in the answer pool (player-recognisable)
  wasAnswer: boolean; // has appeared as a real daily answer
  definition: string | null; // first short gloss, if available
  partOfSpeech: string | null;
}

function decorate(word: string): BankWord {
  const def = getDefinition(word);
  return {
    word,
    common: commonSet().has(word),
    wasAnswer: answeredSet().has(word),
    definition: def?.definition ?? null,
    partOfSpeech: def?.partOfSpeech ?? null,
  };
}

/* ------------------------------------------------------------------ */
/*  Query helpers (all accept a single A–Z letter, case-insensitive)   */
/* ------------------------------------------------------------------ */

export const startingWith = cache((letter: string): BankWord[] => {
  const L = letter.toUpperCase();
  return loadBank()
    .words.filter((w) => w[0] === L)
    .map(decorate);
});

export const endingWith = cache((letter: string): string[] => {
  const L = letter.toUpperCase();
  return loadBank().words.filter((w) => w[4] === L);
});

export const containing = cache((letter: string): string[] => {
  const L = letter.toUpperCase();
  return loadBank().words.filter((w) => w.includes(L));
});

/* ------------------------------------------------------------------ */
/*  Grouping + stats for the landing pages                             */
/* ------------------------------------------------------------------ */

export interface SecondLetterGroup {
  secondLetter: string; // e.g. "A" (the group is "SA…")
  prefix: string; // e.g. "SA"
  words: BankWord[];
  total: number;
  commonCount: number;
}

/** Group a letter's words by their second letter, common words first. */
export const groupBySecondLetter = cache(
  (letter: string): SecondLetterGroup[] => {
    const L = letter.toUpperCase();
    const groups = new Map<string, BankWord[]>();
    for (const bw of startingWith(L)) {
      const k = bw.word[1];
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k)!.push(bw);
    }
    return Array.from(groups.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([secondLetter, words]) => {
        // common (answer-pool) words first, then alpha
        const sorted = [...words].sort((a, b) => {
          if (a.common !== b.common) return a.common ? -1 : 1;
          return a.word.localeCompare(b.word);
        });
        return {
          secondLetter,
          prefix: `${L}${secondLetter}`,
          words: sorted,
          total: words.length,
          commonCount: words.filter((w) => w.common).length,
        };
      });
  }
);

export interface LetterStats {
  letter: string;
  total: number; // all valid guesses starting with the letter
  common: number; // answer-pool words starting with the letter
  answered: number; // already used as daily answers
  topSecondLetters: { letter: string; count: number }[];
}

export const letterStats = cache((letter: string): LetterStats => {
  const L = letter.toUpperCase();
  const words = startingWith(L);
  const secondCounts = new Map<string, number>();
  for (const bw of words) {
    secondCounts.set(bw.word[1], (secondCounts.get(bw.word[1]) ?? 0) + 1);
  }
  const topSecondLetters = Array.from(secondCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([letter, count]) => ({ letter, count }));

  return {
    letter: L,
    total: words.length,
    common: words.filter((w) => w.common).length,
    answered: words.filter((w) => w.wasAnswer).length,
    topSecondLetters,
  };
});

/** Common words for a letter that have already been daily answers, newest first. */
export const answeredWordsForLetter = cache((letter: string): string[] => {
  const L = letter.toUpperCase();
  return getAllPuzzles()
    .filter((p) => p.answer.toUpperCase()[0] === L)
    .map((p) => p.answer.toUpperCase())
    .reverse();
});

/** Common words for a letter ending in a given letter (for the pattern tables). */
export const commonEndingWith = cache(
  (startLetter: string, endLetter: string, limit = 8): string[] => {
    const S = startLetter.toUpperCase();
    const E = endLetter.toUpperCase();
    return startingWith(S)
      .filter((w) => w.common && w.word[4] === E)
      .map((w) => w.word)
      .slice(0, limit);
  }
);

export function getBankMeta() {
  const b = loadBank();
  return { count: b.count, commonCount: b.commonCount, lastBuilt: b.lastBuilt };
}
