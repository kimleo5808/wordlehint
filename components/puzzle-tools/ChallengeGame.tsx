"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import bank from "@/data/word-bank/5.json";
import { feedback } from "@/lib/wordle-feedback";
import { makerPath, maxGuesses, type CustomWordle } from "@/lib/custom-wordle";
import { trackToolEvent } from "./analytics";
import ChallengeCopy from "./ChallengeCopy";

const guessesAllowed = new Set(bank.words);
const marks: Record<string, string> = { G: "✓", Y: "↔", B: "–" };
const names: Record<string, string> = { G: "right place", Y: "other place", B: "no copy left" };
const squares: Record<string, string> = { G: "🟩", Y: "🟨", B: "⬛" };

function readTurns(key: string | undefined, answer: string): string[] {
  if (!key) return [];
  try {
    const saved: unknown = JSON.parse(sessionStorage.getItem(key) ?? "[]");
    if (!Array.isArray(saved) || saved.length > maxGuesses) return [];
    const turns: string[] = [];
    for (const word of saved) {
      if (typeof word !== "string" || (word !== answer && !guessesAllowed.has(word))) break;
      turns.push(word);
      if (word === answer) break;
    }
    return turns;
  } catch {
    return [];
  }
}

export default function ChallengeGame({
  puzzle,
  challengeId,
}: {
  puzzle: CustomWordle;
  challengeId?: string;
}) {
  const { answer, clue } = puzzle;
  const key = challengeId ? "wordlehint.custom.v1." + challengeId : undefined;
  const [turns, setTurns] = useState(() => readTurns(key, answer));
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const won = turns.at(-1) === answer;
  const finished = won || turns.length === maxGuesses;
  const patterns = turns.map((word) => feedback(word, answer));

  function submit(event: FormEvent) {
    event.preventDefault();
    if (finished) return;
    const raw = draft.trim();
    const word = raw.toUpperCase();
    if (!/^[a-zA-Z]{5}$/.test(raw)) {
      setError("Enter five letters A–Z for this guess.");
      return;
    }
    if (word !== answer && !guessesAllowed.has(word)) {
      setError("That guess is outside this word list. Try a different word.");
      return;
    }
    const next = [...turns, word];
    setTurns(next);
    setDraft("");
    setError("");
    if (!key || !challengeId) return;
    try {
      sessionStorage.setItem(key, JSON.stringify(next));
    } catch {
      /* Play can continue without storage. */
    }
    if (next.length === 1) trackToolEvent("custom_wordle_started", { challenge_id: challengeId });
    if (word === answer || next.length === maxGuesses)
      trackToolEvent("custom_wordle_finished", {
        challenge_id: challengeId,
        guesses: next.length,
        outcome: word === answer ? "won" : "lost",
      });
  }

  const resultText = [
    "Custom Wordle " + (won ? turns.length : "X") + "/" + maxGuesses,
    ...patterns.map((row) => [...row].map((color) => squares[color]).join("")),
  ].join("\n");
  return (
    <div className="cw-game">
      <p className="cw-turn" aria-live="polite">
        {finished
          ? won
            ? `Solved in ${turns.length} of 6 guesses`
            : "Six guesses played"
          : `Guess ${turns.length + 1} of 6`}
      </p>
      {clue && (
        <details className="cw-clue">
          <summary>Open optional clue</summary>
          <p>{clue}</p>
        </details>
      )}
      <div className="cw-board" role="group" aria-label="Six-row game board">
        {Array.from({ length: maxGuesses }, (_, i) => {
          const word =
            turns[i] ?? (i === turns.length ? draft.trim().toUpperCase().slice(0, 5) : "");
          const pattern = patterns[i];
          return (
            <div
              key={i}
              className="cw-row"
              role="img"
              aria-label={
                pattern
                  ? `Guess ${i + 1}, ${word}. ` +
                    [...pattern].map((v, j) => word[j] + " " + names[v]).join(", ")
                  : `Row ${i + 1}, ${word || "empty"}`
              }
            >
              {Array.from({ length: 5 }, (_, j) => (
                <span key={j} aria-hidden="true" data-color={pattern?.[j]}>
                  {word[j]}
                  {pattern && <small>{marks[pattern[j]]}</small>}
                </span>
              ))}
            </div>
          );
        })}
      </div>
      {finished ? (
        <div className="cw-finish">
          <p>
            The secret word was <b>{answer}</b>.
          </p>
          {challengeId && (
            <>
              <ChallengeCopy text={resultText} label="Copy result" />
              <Link className="cw-text" href={makerPath}>
                Make a return puzzle
              </Link>
            </>
          )}
        </div>
      ) : (
        <form className="cw-guess" onSubmit={submit}>
          <label>
            Your guess
            <input
              value={draft}
              placeholder="Five letters"
              autoComplete="off"
              spellCheck={false}
              autoCapitalize="characters"
              onChange={(event) => {
                setDraft(event.target.value);
                setError("");
              }}
            />
          </label>
          <button className="cw-btn" type="submit">
            Guess
          </button>
          {error && (
            <p className="cw-error" role="alert">
              {error}
            </p>
          )}
        </form>
      )}
      <p className="cw-legend">✓ Right place · ↔ Other place · – No copy left</p>
    </div>
  );
}
