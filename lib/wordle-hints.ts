import type { DailyPuzzle } from "@/types/wordle-daily";

/* ------------------------------------------------------------------ */
/*  Hint types                                                         */
/* ------------------------------------------------------------------ */

export interface HintLevel {
  level: number; // 1-5
  label: string;
  icon: string; // emoji
  hint: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const VOWELS = new Set(["A", "E", "I", "O", "U"]);

/**
 * `count` is the number of vowel *positions* (repeats included), so it adds
 * up with the consonant count to the word length; `vowels` lists each
 * distinct vowel in order of first appearance with how often it occurs.
 */
function getVowelInfo(word: string): {
  count: number;
  vowels: { letter: string; times: number }[];
} {
  const vowels: { letter: string; times: number }[] = [];
  let count = 0;
  for (const ch of word) {
    if (!VOWELS.has(ch)) continue;
    count++;
    const seen = vowels.find((v) => v.letter === ch);
    if (seen) seen.times++;
    else vowels.push({ letter: ch, times: 1 });
  }
  return { count, vowels };
}

function formatVowel({ letter, times }: { letter: string; times: number }): string {
  if (times === 1) return letter;
  return `${letter} (${times === 2 ? "twice" : `${times} times`})`;
}

function hasDoubleLetters(word: string): boolean {
  const seen = new Set<string>();
  for (const ch of word) {
    if (seen.has(ch)) return true;
    seen.add(ch);
  }
  return false;
}

function getConsonantCount(word: string): number {
  return [...word].filter((ch) => !VOWELS.has(ch)).length;
}

/* ------------------------------------------------------------------ */
/*  Generate 5 progressive hints                                       */
/* ------------------------------------------------------------------ */

/** "a" / "an" for a part of speech (e.g. "an adjective", "a noun"). */
function articleFor(word: string): string {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

export function generateHints(
  puzzle: DailyPuzzle,
  partOfSpeech?: string | null
): HintLevel[] {
  const word = puzzle.answer.toUpperCase();

  // Level 1: Word type (part of speech, when known) + letter composition
  const vowelInfo = getVowelInfo(word);
  const consonants = getConsonantCount(word);
  const doubles = hasDoubleLetters(word);
  const compositionParts = [
    `${vowelInfo.count} vowel${vowelInfo.count !== 1 ? "s" : ""}`,
    `${consonants} consonant${consonants !== 1 ? "s" : ""}`,
  ];
  if (doubles) compositionParts.push("has a repeated letter");
  const makeup = compositionParts.join(", ");
  const compositionHint = partOfSpeech
    ? `Today's word is ${articleFor(partOfSpeech)} ${partOfSpeech}. It has ${makeup}.`
    : `This word has ${makeup}.`;

  // Level 2: Which vowels appear
  const vowelText =
    vowelInfo.count === 0
      ? word.includes("Y")
        ? "No A, E, I, O or U — Y does the vowel's job"
        : "Contains no vowels"
      : `Vowels: ${vowelInfo.vowels.map(formatVowel).join(", ")}`;

  // Level 3: First letter
  // Level 4: Last letter
  // Level 5: Pattern (first + last revealed)
  const pattern = `${word[0]} _ _ _ ${word[4]}`;

  return [
    {
      level: 1,
      label: partOfSpeech ? "Word Type & Makeup" : "Letter Composition",
      icon: "💡",
      hint: compositionHint,
    },
    {
      level: 2,
      label: "Vowel Info",
      icon: "🔤",
      hint: vowelText,
    },
    {
      level: 3,
      label: "First Letter",
      icon: "🅰️",
      hint: `The word starts with "${word[0]}"`,
    },
    {
      level: 4,
      label: "Last Letter",
      icon: "🔚",
      hint: `The word ends with "${word[4]}"`,
    },
    {
      level: 5,
      label: "Letter Pattern",
      icon: "🧩",
      hint: pattern,
    },
  ];
}
