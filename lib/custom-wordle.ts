export const makerPath = "/make-your-own-wordle";
export const challengePath = makerPath + "/play";
export const clueLimit = 100;
export const maxGuesses = 6;

export type CustomWordle = { answer: string; clue: string };

export function checkDraft(word: string, clue: string) {
  if (!/^[a-zA-Z]{5}$/.test(word.trim()))
    return "Choose a secret word of exactly five letters A–Z.";
  if (clue.trim().length > clueLimit) return "Keep the clue to 100 characters or fewer.";
  if (new RegExp("\\b" + word.trim() + "\\b", "i").test(clue))
    return "Your clue spells out the answer. Reword it or leave the clue blank.";
  return "";
}

export function encodeChallenge({ answer, clue }: CustomWordle) {
  const id = Array.from(crypto.getRandomValues(new Uint8Array(8)), (n) =>
    n.toString(16).padStart(2, "0"),
  ).join("");
  const bytes = new TextEncoder().encode(JSON.stringify([id, answer, clue]));
  const token =
    "v1." +
    btoa(String.fromCharCode(...bytes))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  return { id, token };
}

export function decodeChallenge(token: string): (CustomWordle & { id: string }) | null {
  if (token.length > 1024 || !/^v1\.[A-Za-z0-9_-]+$/.test(token)) return null;
  try {
    const data = atob(token.slice(3).replace(/-/g, "+").replace(/_/g, "/"));
    const bytes = Uint8Array.from(data, (character) => character.charCodeAt(0));
    const fields: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    if (!Array.isArray(fields) || fields.length !== 3) return null;
    const [id, answer, clue] = fields;
    if (
      typeof id !== "string" ||
      !/^[0-9a-f]{16}$/.test(id) ||
      typeof answer !== "string" ||
      !/^[A-Z]{5}$/.test(answer) ||
      typeof clue !== "string" ||
      clue.length > clueLimit ||
      checkDraft(answer, clue)
    )
      return null;
    return { id, answer, clue };
  } catch {
    return null;
  }
}
