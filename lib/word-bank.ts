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

/** Word lengths with a built bank. 5 = Wordle lists; 4/6/7 = ENABLE + frequency tier. */
export const BANK_LENGTHS = [4, 5, 6, 7] as const;
export type BankLength = (typeof BANK_LENGTHS)[number];

const loadBank = cache((len: BankLength = 5): WordBankFile => {
  /* eslint-disable @typescript-eslint/no-require-imports */
  switch (len) {
    case 4:
      return require("@/data/word-bank/4.json") as WordBankFile;
    case 6:
      return require("@/data/word-bank/6.json") as WordBankFile;
    case 7:
      return require("@/data/word-bank/7.json") as WordBankFile;
    default:
      return require("@/data/word-bank/5.json") as WordBankFile;
  }
  /* eslint-enable @typescript-eslint/no-require-imports */
});

/** Set of common (answer-pool / high-frequency) words for O(1) membership tests. */
const commonSet = cache(
  (len: BankLength = 5): Set<string> => new Set(loadBank(len).common)
);

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

function decorate(word: string, len: BankLength = 5): BankWord {
  const def = getDefinition(word);
  return {
    word,
    common: commonSet(len).has(word),
    // The daily-answer set only contains 5-letter words, so this is
    // naturally false for the other bank lengths.
    wasAnswer: answeredSet().has(word),
    definition: def?.definition ?? null,
    partOfSpeech: def?.partOfSpeech ?? null,
  };
}

/* ------------------------------------------------------------------ */
/*  Query helpers (all accept a single A–Z letter, case-insensitive)   */
/* ------------------------------------------------------------------ */

export const startingWith = cache(
  (letter: string, len: BankLength = 5): BankWord[] => {
    const L = letter.toUpperCase();
    return loadBank(len)
      .words.filter((w) => w[0] === L)
      .map((w) => decorate(w, len));
  }
);

export const endingWith = cache((letter: string): string[] => {
  const L = letter.toUpperCase();
  return loadBank().words.filter((w) => w[4] === L);
});

/** Decorated version of endingWith — words whose last letter is `letter`. */
export const endingWithDecorated = cache((letter: string): BankWord[] => {
  const L = letter.toUpperCase();
  return loadBank()
    .words.filter((w) => w[4] === L)
    .map((w) => decorate(w));
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
  (letter: string, len: BankLength = 5): SecondLetterGroup[] => {
    const L = letter.toUpperCase();
    const groups = new Map<string, BankWord[]>();
    for (const bw of startingWith(L, len)) {
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

export const letterStats = cache(
  (letter: string, len: BankLength = 5): LetterStats => {
  const L = letter.toUpperCase();
  const words = startingWith(L, len);
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

/* ------------------------------------------------------------------ */
/*  Contains-letter variants (for /5-letter-words/with-* pages)        */
/* ------------------------------------------------------------------ */

/** Decorated words that contain `letter` anywhere. */
export const containingDecorated = cache((letter: string): BankWord[] => {
  const L = letter.toUpperCase();
  return loadBank()
    .words.filter((w) => w.includes(L))
    .map((w) => decorate(w));
});

export interface PositionGroup {
  index: number; // 0-based slot of the letter's FIRST occurrence
  label: string; // e.g. "2nd letter"
  words: BankWord[];
  total: number;
  commonCount: number;
}

const ORDINALS = ["1st", "2nd", "3rd", "4th", "5th"];

/** Group a letter's containing-words by the slot of its first occurrence. */
export const groupByPosition = cache((letter: string): PositionGroup[] => {
  const L = letter.toUpperCase();
  const groups = new Map<number, BankWord[]>();
  for (const bw of containingDecorated(L)) {
    const idx = bw.word.indexOf(L);
    if (!groups.has(idx)) groups.set(idx, []);
    groups.get(idx)!.push(bw);
  }
  return Array.from(groups.entries())
    .sort(([a], [b]) => a - b)
    .map(([index, words]) => {
      const sorted = [...words].sort((a, b) => {
        if (a.common !== b.common) return a.common ? -1 : 1;
        return a.word.localeCompare(b.word);
      });
      return {
        index,
        label: `${ORDINALS[index]} letter`,
        words: sorted,
        total: words.length,
        commonCount: words.filter((w) => w.common).length,
      };
    });
});

export interface PositionStats {
  letter: string;
  total: number; // valid guesses containing the letter
  common: number; // answer-pool words containing the letter
  answered: number; // already used as daily answers
  // How often the letter sits in each of the five slots (a word with the
  // letter twice counts in each slot it occupies).
  positions: { index: number; label: string; count: number }[];
}

export const positionStats = cache((letter: string): PositionStats => {
  const L = letter.toUpperCase();
  const words = containingDecorated(L);
  const counts = [0, 0, 0, 0, 0];
  for (const bw of words) {
    for (let i = 0; i < 5; i++) if (bw.word[i] === L) counts[i]++;
  }
  return {
    letter: L,
    total: words.length,
    common: words.filter((w) => w.common).length,
    answered: words.filter((w) => w.wasAnswer).length,
    positions: counts.map((count, index) => ({
      index,
      label: ORDINALS[index],
      count,
    })),
  };
});

/** Common words containing a letter that have already been answers, newest first. */
export const answeredWordsContaining = cache((letter: string): string[] => {
  const L = letter.toUpperCase();
  return getAllPuzzles()
    .filter((p) => p.answer.toUpperCase().includes(L))
    .map((p) => p.answer.toUpperCase())
    .reverse();
});

/** Common words containing `letter` whose first letter is `startLetter`. */
export const commonContainingByStart = cache(
  (startLetter: string, containLetter: string, limit = 6): string[] => {
    const S = startLetter.toUpperCase();
    const C = containLetter.toUpperCase();
    return containingDecorated(C)
      .filter((w) => w.common && w.word[0] === S)
      .map((w) => w.word)
      .slice(0, limit);
  }
);

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

export function getBankMeta(len: BankLength = 5) {
  const b = loadBank(len);
  return { count: b.count, commonCount: b.commonCount, lastBuilt: b.lastBuilt };
}

/* ------------------------------------------------------------------ */
/*  Scrabble scoring + N-letter extras (for the 4/6/7 clusters)        */
/* ------------------------------------------------------------------ */

const SCRABBLE_POINTS: Record<string, number> = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5,
  L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4,
  W: 4, X: 8, Y: 4, Z: 10,
};

export function scrabbleScore(word: string): number {
  return [...word.toUpperCase()].reduce(
    (sum, ch) => sum + (SCRABBLE_POINTS[ch] ?? 0),
    0
  );
}

/** Highest-Scrabble-scoring words in a bank (ties broken alphabetically). */
export const topScoringWords = cache(
  (len: BankLength, limit = 8): { word: string; score: number }[] => {
    return loadBank(len)
      .words.map((word) => ({ word, score: scrabbleScore(word) }))
      .sort((a, b) => b.score - a.score || a.word.localeCompare(b.word))
      .slice(0, limit);
  }
);

/** Words with no A/E/I/O/U (Y allowed) — the classic vowel-dump lifesavers. */
export const withoutVowels = cache((len: BankLength): BankWord[] => {
  return loadBank(len)
    .words.filter((w) => !/[AEIOU]/.test(w))
    .map((w) => decorate(w, len))
    .sort((a, b) => {
      if (a.common !== b.common) return a.common ? -1 : 1;
      return a.word.localeCompare(b.word);
    });
});

/* ------------------------------------------------------------------ */
/*  Ending-letter variants (for /5-letter-words/ending-with-* pages)   */
/* ------------------------------------------------------------------ */

export interface SuffixGroup {
  fourthLetter: string; // e.g. "L" (the group is "…LE")
  suffix: string; // e.g. "LE" (penultimate + ending letter)
  words: BankWord[];
  total: number;
  commonCount: number;
}

/** Group a letter's ending words by their 4th (penultimate) letter. */
export const groupByFourthLetter = cache((letter: string): SuffixGroup[] => {
  const L = letter.toUpperCase();
  const groups = new Map<string, BankWord[]>();
  for (const bw of endingWithDecorated(L)) {
    const k = bw.word[3];
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k)!.push(bw);
  }
  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([fourthLetter, words]) => {
      const sorted = [...words].sort((a, b) => {
        if (a.common !== b.common) return a.common ? -1 : 1;
        return a.word.localeCompare(b.word);
      });
      return {
        fourthLetter,
        suffix: `${fourthLetter}${L}`,
        words: sorted,
        total: words.length,
        commonCount: words.filter((w) => w.common).length,
      };
    });
});

export interface EndingLetterStats {
  letter: string;
  total: number; // all valid guesses ending with the letter
  common: number; // answer-pool words ending with the letter
  answered: number; // already used as daily answers
  topPenultimateLetters: { letter: string; count: number }[];
}

export const endingLetterStats = cache((letter: string): EndingLetterStats => {
  const L = letter.toUpperCase();
  const words = endingWithDecorated(L);
  const penultCounts = new Map<string, number>();
  for (const bw of words) {
    penultCounts.set(bw.word[3], (penultCounts.get(bw.word[3]) ?? 0) + 1);
  }
  const topPenultimateLetters = Array.from(penultCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([letter, count]) => ({ letter, count }));

  return {
    letter: L,
    total: words.length,
    common: words.filter((w) => w.common).length,
    answered: words.filter((w) => w.wasAnswer).length,
    topPenultimateLetters,
  };
});

/** Common words ending in a given letter that have already been answers, newest first. */
export const answeredWordsEndingWith = cache((letter: string): string[] => {
  const L = letter.toUpperCase();
  return getAllPuzzles()
    .filter((p) => p.answer.toUpperCase()[4] === L)
    .map((p) => p.answer.toUpperCase())
    .reverse();
});
