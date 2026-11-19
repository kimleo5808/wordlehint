import { feedback } from "./wordle-feedback";

export const trainerPath = "/wordle-trap-trainer";
export const trapFamilies = [
  { id: "ight", pattern: "_IGHT", probes: ["FERNS", "WHELM"] },
  { id: "atch", pattern: "_ATCH", probes: ["CLAMP", "BROWN"] },
  { id: "s-ore", pattern: "S_ORE", probes: ["BENCH", "TWINE"] },
] as const;
export type TrapFamily = (typeof trapFamilies)[number];

export function fitsTrap(word: string, pattern: string) {
  return [...pattern].every((letter, i) => letter === "_" || letter === word[i]);
}

export function splitTrap(guess: string, before: string[]) {
  const buckets = new Map<string, string[]>();
  for (const candidate of before) {
    const pattern = feedback(guess, candidate);
    const bucket = buckets.get(pattern);
    if (bucket) bucket.push(candidate);
    else buckets.set(pattern, [candidate]);
  }
  return [...buckets].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
}

export function trapFromReview(turns: { guess: string; pattern: string }[]) {
  const known = Array<string>(5).fill("_");
  for (const turn of turns) {
    for (let i = 0; i < known.length; i++) if (turn.pattern[i] === "G") known[i] = turn.guess[i];
    const family = trapFamilies.find((item) => item.pattern === known.join(""));
    if (family) return family;
  }
}
