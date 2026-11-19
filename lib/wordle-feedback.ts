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
