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

function getVowelInfo(word: string): { count: number; vowels: string[] } {
  const found: string[] = [];
  for (const ch of word) {
    if (VOWELS.has(ch) && !found.includes(ch)) found.push(ch);
  }
  return { count: found.length, vowels: found };
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

export function generateHints(puzzle: DailyPuzzle): HintLevel[] {
  const word = puzzle.answer.toUpperCase();

  // Level 1: Letter composition (vowels + consonants + doubles)
  const vowelInfo = getVowelInfo(word);
  const consonants = getConsonantCount(word);
  const doubles = hasDoubleLetters(word);
  const compositionParts = [
    `${vowelInfo.count} vowel${vowelInfo.count !== 1 ? "s" : ""}`,
    `${consonants} consonant${consonants !== 1 ? "s" : ""}`,
  ];
  if (doubles) compositionParts.push("has a repeated letter");
  const compositionHint = `This word has ${compositionParts.join(", ")}.`;

  // Level 2: Vowel positions
  const vowelText =
    vowelInfo.count === 0
      ? "Contains no vowels"
      : `Vowels: ${vowelInfo.vowels.join(", ")}`;

  // Level 3: First letter
  // Level 4: Last letter
  // Level 5: Pattern (first + last revealed)
  const pattern = `${word[0]} _ _ _ ${word[4]}`;

  return [
    {
      level: 1,
      label: "Letter Composition",
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
