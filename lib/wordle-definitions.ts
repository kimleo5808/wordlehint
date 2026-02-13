import definitions from "@/data/wordle-definitions.json";

export interface WordMeaning {
  partOfSpeech: string;
  definition: string;
  example: string | null;
}

export interface WordDefinition {
  definition: string;
  partOfSpeech: string;
  example: string | null;
  origin: string | null;
  meanings: WordMeaning[];
}

const defs = definitions as Record<string, WordDefinition>;

export function getDefinition(word: string): WordDefinition | null {
  return defs[word.toUpperCase()] ?? null;
}
