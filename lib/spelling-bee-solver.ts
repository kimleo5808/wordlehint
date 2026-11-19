import type { BeeWordIndex } from "./bee-word-history";
import { scoreWord } from "./spelling-bee-scoring";

export const exampleHive = "AHMNORY";

export function hiveKey(letters: string) {
  return letters[0] + [...letters.slice(1)].sort().join("");
}

export function hiveInput(raw: string) {
  const clean = raw.replace(/[\s,]+/g, "");
  if (clean && !/^[a-z]+$/i.test(clean))
    return { error: "Use letters A–Z, with the center letter first.", letters: "" };
  if (clean.length !== 7)
    return { error: "Enter seven letters: one center and six outer letters.", letters: "" };
  const letters = clean.toUpperCase();
  if (new Set(letters).size !== 7)
    return {
      error: "Each hive tile needs a different letter. Check for a repeated tile.",
      letters: "",
    };
  return { error: "", letters };
}

export function solveBeeHive(index: BeeWordIndex, letters: string) {
  const key = hiveKey(letters);
  const tiles = new Set(letters);
  const matches = index.hives.flatMap((hive, id) =>
    hive.center === letters[0] && hiveKey(hive.letters) === key
      ? [{ date: hive.date, id, words: [] as string[] }]
      : [],
  );
  const candidates: string[] = [];
  for (const [word, ids] of Object.entries(index.appearances)) {
    if (
      word.length < 4 ||
      !word.includes(letters[0]) ||
      ![...word].every((letter) => tiles.has(letter))
    )
      continue;
    if (!matches.length) candidates.push(word);
    for (const match of matches) if (ids.includes(match.id)) match.words.push(word);
  }
  return {
    letters,
    candidates: candidates.sort(),
    matches: matches.map(({ date, words }) => ({ date, words: words.sort() })),
  };
}

export type SolvedHive = ReturnType<typeof solveBeeHive>;

export function groupBeeWords(words: string[]) {
  const lengths = new Map<number, string[]>();
  const pangrams: string[] = [];
  const scores = new Map<string, number>();
  let points = 0;
  for (const word of words) {
    const pg = new Set(word).size === 7;
    const score = scoreWord(word, pg);
    if (pg) pangrams.push(word);
    points += score;
    scores.set(word, score);
    const group = lengths.get(word.length);
    if (group) group.push(word);
    else lengths.set(word.length, [word]);
  }
  return { lengths, pangrams, points, scores };
}
