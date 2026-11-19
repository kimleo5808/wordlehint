import { feedback } from "./wordle-feedback";

export interface ReviewedTurn {
  guess: string;
  pattern: string;
  before: number;
  after: number;
  removed: string[];
  remaining: string[];
}

/** Keep all survivors for later comparisons, and a short sample for the interface. */
export function reviewWordle(answer: string, guesses: string[], pool: string[]) {
  let candidates = pool;
  return guesses.map((guess): ReviewedTurn => {
    const pattern = feedback(guess, answer);
    const before = candidates.length;
    const removed: string[] = [];
    candidates = candidates.filter((candidate) => {
      const fits = feedback(guess, candidate) === pattern;
      if (!fits && removed.length < 6) removed.push(candidate);
      return fits;
    });
    return {
      guess,
      pattern,
      before,
      after: candidates.length,
      removed,
      remaining: candidates.slice(0, 10),
    };
  });
}
