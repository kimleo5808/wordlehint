import { cache } from "react";
import { getAllPuzzles, getTodayDateString } from "@/lib/wordle-daily";

/* ------------------------------------------------------------------ */
/*  Candidate openers                                                  */
/*  A curated set of well-known starting words plus a few popular-but- */
/*  weak picks (ADIEU, AUDIO) and intentionally poor ones (FUZZY…) so  */
/*  the ranking can show, with real data, why they underperform.       */
/* ------------------------------------------------------------------ */

export const OPENER_CANDIDATES: string[] = [
  "SLATE", "CRANE", "CRATE", "TRACE", "SLANT", "STARE", "SNARE", "LEAST",
  "STALE", "IRATE", "ARISE", "RAISE", "AROSE", "ROAST", "LEARN", "ALTER",
  "ALONE", "ATONE", "OCEAN", "STORE", "STONE", "TEARS", "RATES", "NOTES",
  "RESIN", "SAINT", "TRAIN", "ADORE", "MOIST", "CLOSE", "REACT", "CARES",
  "DEALT", "ROUTE", "SANER", "PARSE", "SHALE", "TALES", "NEARS", "LANES",
  // Popular myths / weak openers — scored so the data can debunk them.
  "ADIEU", "AUDIO", "OUIJA", "FUZZY", "MUMMY", "VIVID",
];

/** Openers we explicitly call out in the "words to avoid" section. */
export const AVOID_WORDS = ["ADIEU", "AUDIO", "FUZZY", "MUMMY", "VIVID"];

const VOWELS = new Set(["A", "E", "I", "O", "U"]);

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface OpenerStat {
  rank: number;
  word: string;
  /** Shannon entropy in bits over the tracked-answer partition. */
  entropy: number;
  /** Expected number of answers still possible after this guess. */
  expectedRemaining: number;
  /** Probability the guess lands at least one green (0–1). */
  greenProb: number;
  /** Average number of green+yellow tiles this guess scores (0–5). */
  avgHits: number;
  /** Number of distinct vowels in the word. */
  vowels: number;
  avoid: boolean;
}

export interface PositionLetter {
  letter: string;
  count: number;
  share: number;
}

export interface StartingWordData {
  total: number;
  lastUpdated: string;
  rankings: OpenerStat[];
  best: OpenerStat;
  byWord: Record<string, OpenerStat>;
  /** Per-position (0–4) letter distribution, each sorted by count desc. */
  positionFrequency: PositionLetter[][];
  /** Overall share of answers that contain each letter, sorted desc. */
  overallFrequency: PositionLetter[];
  facts: string[];
}

/* ------------------------------------------------------------------ */
/*  Wordle feedback (with correct duplicate-letter handling)           */
/* ------------------------------------------------------------------ */

/**
 * Returns a 5-char pattern of 'G' (green), 'Y' (yellow), 'B' (black) for
 * `guess` against `answer`, using the official two-pass rule so repeated
 * letters are scored exactly as Wordle does.
 */
export function feedback(guess: string, answer: string): string {
  const out = ["B", "B", "B", "B", "B"];
  const counts: Record<string, number> = {};

  for (let i = 0; i < 5; i++) {
    if (guess[i] === answer[i]) {
      out[i] = "G";
    } else {
      counts[answer[i]] = (counts[answer[i]] ?? 0) + 1;
    }
  }
  for (let i = 0; i < 5; i++) {
    if (out[i] === "G") continue;
    const g = guess[i];
    if ((counts[g] ?? 0) > 0) {
      out[i] = "Y";
      counts[g] -= 1;
    }
  }
  return out.join("");
}

/* ------------------------------------------------------------------ */
/*  Core computation (cached, build-time)                              */
/* ------------------------------------------------------------------ */

function scoreOpener(word: string, answers: string[]): Omit<OpenerStat, "rank"> {
  const total = answers.length;
  const buckets = new Map<string, number>();
  let greenCount = 0;
  let hitSum = 0;

  for (const answer of answers) {
    const pattern = feedback(word, answer);
    buckets.set(pattern, (buckets.get(pattern) ?? 0) + 1);
    if (pattern.includes("G")) greenCount += 1;
    let hits = 0;
    for (const ch of pattern) if (ch !== "B") hits += 1;
    hitSum += hits;
  }

  let entropy = 0;
  let sumSquares = 0;
  for (const n of buckets.values()) {
    const p = n / total;
    entropy -= p * Math.log2(p);
    sumSquares += n * n;
  }

  return {
    word,
    entropy,
    expectedRemaining: sumSquares / total,
    greenProb: greenCount / total,
    avgHits: hitSum / total,
    vowels: new Set(word.split("").filter((c) => VOWELS.has(c))).size,
    avoid: AVOID_WORDS.includes(word),
  };
}

export const getStartingWordData = cache((): StartingWordData => {
  const answers = getAllPuzzles().map((p) => p.answer.toUpperCase());
  const total = answers.length;

  // Rankings: entropy desc (ties broken by lower expected remaining).
  const scored = OPENER_CANDIDATES.map((w) => scoreOpener(w, answers)).sort(
    (a, b) => b.entropy - a.entropy || a.expectedRemaining - b.expectedRemaining
  );
  const rankings: OpenerStat[] = scored.map((s, i) => ({ ...s, rank: i + 1 }));
  const byWord = Object.fromEntries(rankings.map((r) => [r.word, r]));

  // Letter frequency by position.
  const positionMaps: Map<string, number>[] = [
    new Map(),
    new Map(),
    new Map(),
    new Map(),
    new Map(),
  ];
  const overallMap = new Map<string, number>();
  for (const answer of answers) {
    const seen = new Set<string>();
    for (let i = 0; i < 5; i++) {
      const ch = answer[i];
      positionMaps[i].set(ch, (positionMaps[i].get(ch) ?? 0) + 1);
      if (!seen.has(ch)) {
        overallMap.set(ch, (overallMap.get(ch) ?? 0) + 1);
        seen.add(ch);
      }
    }
  }
  const toSorted = (m: Map<string, number>): PositionLetter[] =>
    Array.from(m.entries())
      .map(([letter, count]) => ({ letter, count, share: count / total }))
      .sort((a, b) => b.count - a.count || a.letter.localeCompare(b.letter));

  const positionFrequency = positionMaps.map(toSorted);
  const overallFrequency = toSorted(overallMap);

  const best = rankings[0];
  const adieu = byWord["ADIEU"];
  const topVowelLetter = overallFrequency.find((l) => VOWELS.has(l.letter));

  const facts: string[] = [
    `${best.word} is the strongest opener against the ${total} answers we track, scoring ${best.entropy.toFixed(2)} bits of information and cutting the field to about ${Math.round(best.expectedRemaining)} possible answers.`,
    `${best.word} lands at least one green tile ${Math.round(best.greenProb * 100)}% of the time.`,
    overallFrequency[0]
      ? `${overallFrequency[0].letter} is the most common letter in answers, appearing in ${Math.round(overallFrequency[0].share * 100)}% of them.`
      : "",
    topVowelLetter
      ? `${topVowelLetter.letter} is the most common vowel, in ${Math.round(topVowelLetter.share * 100)}% of answers.`
      : "",
    adieu
      ? `Despite its four vowels, ADIEU ranks #${adieu.rank} of ${rankings.length} here — its rare consonants cost it information.`
      : "",
  ].filter(Boolean);

  return {
    total,
    lastUpdated: getTodayDateString(),
    rankings,
    best,
    byWord,
    positionFrequency,
    overallFrequency,
    facts,
  };
});
