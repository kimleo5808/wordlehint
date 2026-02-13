/**
 * Algorithmic difficulty rating for Wordle answers.
 * Rates words as Easy / Medium / Hard based on letter frequency,
 * double letters, uncommon letter combos, and vowel count.
 */

// English letter frequency (higher = more common)
const LETTER_FREQ: Record<string, number> = {
  E: 12.7, T: 9.06, A: 8.17, O: 7.51, I: 6.97, N: 6.75, S: 6.33, H: 6.09,
  R: 5.99, D: 4.25, L: 4.03, C: 2.78, U: 2.76, M: 2.41, W: 2.36, F: 2.23,
  G: 2.02, Y: 1.97, P: 1.93, B: 1.49, V: 0.98, K: 0.77, J: 0.15, X: 0.15,
  Q: 0.10, Z: 0.07,
};

const VOWELS = new Set(["A", "E", "I", "O", "U"]);

export type DifficultyLevel = "Easy" | "Medium" | "Hard";

export interface DifficultyRating {
  level: DifficultyLevel;
  score: number; // 1-10 (1 = easiest, 10 = hardest)
  reasons: string[];
}

export function rateDifficulty(word: string): DifficultyRating {
  const upper = word.toUpperCase();
  const letters = upper.split("");
  const unique = new Set(letters);
  const reasons: string[] = [];
  let score = 5; // start at medium

  // 1. Letter frequency score
  const avgFreq = letters.reduce((sum, l) => sum + (LETTER_FREQ[l] ?? 0), 0) / letters.length;
  if (avgFreq >= 6) {
    score -= 1.5;
    reasons.push("Uses very common letters");
  } else if (avgFreq >= 4) {
    reasons.push("Uses moderately common letters");
  } else {
    score += 1.5;
    reasons.push("Contains less common letters");
  }

  // 2. Double / repeated letters
  if (unique.size < letters.length) {
    const repeated = letters.length - unique.size;
    score += repeated * 1.5;
    reasons.push("Has repeated letters, which makes guessing harder");
  }

  // 3. Vowel count
  const vowelCount = letters.filter((l) => VOWELS.has(l)).length;
  if (vowelCount === 0) {
    score += 2;
    reasons.push("No standard vowels — very unusual");
  } else if (vowelCount === 1) {
    score += 1;
    reasons.push("Only one vowel limits deduction options");
  } else if (vowelCount >= 3) {
    score -= 0.5;
    reasons.push("Multiple vowels make elimination easier");
  }

  // 4. Uncommon letters (Q, X, Z, J, K, V)
  const uncommon = letters.filter((l) => (LETTER_FREQ[l] ?? 0) < 1);
  if (uncommon.length > 0) {
    score += uncommon.length * 1;
    reasons.push(`Contains uncommon letter${uncommon.length > 1 ? "s" : ""}: ${uncommon.join(", ")}`);
  }

  // 5. Common word patterns (ending in -IGHT, -TION, -ING, etc.)
  if (/(?:IGHT|OUND|TION|NESS)$/.test(upper)) {
    score -= 1;
    reasons.push("Follows a common word ending pattern");
  }

  // 6. Y as vowel in unusual position
  if (upper.includes("Y") && !VOWELS.has("Y")) {
    const yPos = upper.indexOf("Y");
    if (yPos === letters.length - 1) {
      // Y at end is common
    } else {
      score += 0.5;
    }
  }

  // Clamp score
  const clampedScore = Math.max(1, Math.min(10, Math.round(score)));

  let level: DifficultyLevel;
  if (clampedScore <= 3) level = "Easy";
  else if (clampedScore <= 6) level = "Medium";
  else level = "Hard";

  return { level, score: clampedScore, reasons };
}
