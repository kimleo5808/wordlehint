import {
  type BankLength,
  getBankMeta,
  letterStats,
  scrabbleScore,
  startingWith,
} from "@/lib/word-bank";

/** Per-page live values injected into spoke templates. */
export interface SpokeFacts {
  letter: string;
  n: number;
  common: number;
  bankTotal: number;
  bankCommon: number;
  topWord: string;
  topScore: number;
  topSecond: string;
  examples: string;
}

export function getStartingFacts(letter: string, len: BankLength): SpokeFacts {
  const L = letter.toUpperCase();
  const words = startingWith(L, len);
  const meta = getBankMeta(len);
  const stats = letterStats(L, len);
  const top = words
    .map((w) => ({ word: w.word, score: scrabbleScore(w.word) }))
    .sort((a, b) => b.score - a.score || a.word.localeCompare(b.word))[0];
  const topSecond = stats.topSecondLetters[0];
  const examples = words
    .filter((w) => w.common)
    .slice(0, 3)
    .map((w) => w.word)
    .join(", ");

  return {
    letter: L,
    n: words.length,
    common: stats.common,
    bankTotal: meta.count,
    bankCommon: meta.commonCount,
    topWord: top?.word ?? "",
    topScore: top?.score ?? 0,
    topSecond: topSecond
      ? `${topSecond.letter} (${topSecond.count} words)`
      : "",
    examples,
  };
}

/** Replace {PLACEHOLDER} tokens with the page's live facts. */
export function fillTemplate(text: string, f: SpokeFacts): string {
  return text
    .replaceAll("{LETTER_LOW}", f.letter.toLowerCase())
    .replaceAll("{LETTER}", f.letter)
    .replaceAll("{N}", String(f.n))
    .replaceAll("{COMMON}", String(f.common))
    .replaceAll("{BANK_TOTAL}", f.bankTotal.toLocaleString("en-US"))
    .replaceAll("{BANK_COMMON}", f.bankCommon.toLocaleString("en-US"))
    .replaceAll("{TOP_WORD}", f.topWord)
    .replaceAll("{TOP_SCORE}", String(f.topScore))
    .replaceAll("{TOP_SECOND}", f.topSecond)
    .replaceAll("{EXAMPLES}", f.examples);
}
