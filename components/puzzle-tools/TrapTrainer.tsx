"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import bank from "@/data/word-bank/5.json";
import { feedback } from "@/lib/wordle-feedback";
import { fitsTrap, splitTrap, trapFamilies, type TrapFamily } from "@/lib/wordle-traps";
import { trackToolEvent } from "./analytics";

type Mode = "regular" | "hard";
type Turn = { guess: string; pattern: string; before: string[]; after: string[] };
const guessWords = new Set(bank.words);
const turnLimit = 3;
const tileNames: Record<string, string> = { G: "right place", Y: "other place", B: "no copy left" };
const tileMarks: Record<string, string> = { G: "✓", Y: "↔", B: "–" };

function subscribeHash(listener: () => void) {
  window.addEventListener("hashchange", listener);
  return () => window.removeEventListener("hashchange", listener);
}

export default function TrapTrainer() {
  const fragment = useSyncExternalStore(
    subscribeHash,
    () => window.location.hash,
    () => "",
  );
  const linked = trapFamilies.find((family) => "#trap-" + family.id === fragment);
  const [entry, setEntry] = useState<TrapFamily>(trapFamilies[0]);
  if (linked && linked !== entry) setEntry(linked);
  return <Workspace key={entry.id} entry={entry} />;
}

function Workspace({ entry }: { entry: TrapFamily }) {
  const [family, setFamily] = useState(entry);
  const [mode, setMode] = useState<Mode>("regular");
  const [round, setRound] = useState(0);
  const roundsPlayed = useRef(0);
  function start() {
    roundsPlayed.current++;
    trackToolEvent("wordle_trap_start", {
      family: family.id,
      mode,
      repeat: Number(roundsPlayed.current > 1),
    });
  }
  return (
    <section className="tt-trainer" aria-label="Endgame practice">
      <div className="tt-controls">
        <label>
          Word family
          <select
            value={family.id}
            onChange={(e) => {
              const next = trapFamilies.find((item) => item.id === e.target.value);
              if (next) setFamily(next);
            }}
          >
            {trapFamilies.map((item) => (
              <option key={item.id} value={item.id}>
                {item.pattern}
              </option>
            ))}
          </select>
        </label>
        <fieldset>
          <legend>Rules</legend>
          {(["regular", "hard"] as const).map((value) => (
            <label key={value}>
              <input
                type="radio"
                name="trap-mode"
                value={value}
                checked={mode === value}
                onChange={() => setMode(value)}
              />
              {value === "regular" ? "Regular" : "Hard"}
            </label>
          ))}
        </fieldset>
      </div>
      <Round
        key={family.id + mode + round}
        family={family}
        mode={mode}
        start={start}
        restart={() => setRound((n) => n + 1)}
      />
    </section>
  );
}

function Round({
  family,
  mode,
  start,
  restart,
}: {
  family: TrapFamily;
  mode: Mode;
  start: () => void;
  restart: () => void;
}) {
  const [pool] = useState(() => bank.common.filter((word) => fitsTrap(word, family.pattern)));
  const [turns, setTurns] = useState<Turn[]>([]);
  const [answer, setAnswer] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const last = turns.at(-1);
  const remaining = last?.after ?? pool;
  const won = last?.pattern === "GGGGG";
  const finished = won || turns.length === turnLimit;
  const left = turnLimit - turns.length;

  function submit(e: FormEvent) {
    e.preventDefault();
    if (finished) return;
    const raw = input.trim();
    const guess = raw.toUpperCase();
    if (!/^[a-zA-Z]{5}$/.test(raw)) {
      setError("Enter a five-letter word using A–Z.");
      return;
    }
    if (!guessWords.has(guess)) {
      setError("That spelling is outside the guess list. Try another word.");
      return;
    }
    if (mode === "hard" && !fitsTrap(guess, family.pattern)) {
      setError(`Hard mode keeps the four green tiles in ${family.pattern}. Try a word that fits.`);
      return;
    }
    // Draw once, independently of the guess, after the first valid submission.
    const target = answer || pool[Math.floor(Math.random() * pool.length)];
    const pattern = feedback(guess, target);
    const after = remaining.filter((word) => feedback(guess, word) === pattern);
    if (!answer) {
      setAnswer(target);
      start();
    }
    setTurns([...turns, { guess, pattern, before: remaining, after }]);
    setInput("");
    setError("");
    if (guess === target || left === 1)
      trackToolEvent("wordle_trap_finish", {
        mode,
        family: family.id,
        turns: turns.length + 1,
        outcome: guess === target ? "won" : "lost",
      });
  }
  return (
    <div className="tt-round">
      <div className="tt-board">
        <p className="tt-balance" aria-live="polite">
          {finished
            ? won
              ? `Solved in ${turns.length} of 3 guesses`
              : "Out of guesses"
            : `${left} ${left === 1 ? "guess" : "guesses"} left`}
        </p>
        <div
          className="tt-mask"
          role="img"
          aria-label={`Starting pattern: ${[...family.pattern].map((c) => (c === "_" ? "blank" : c)).join(", ")}`}
        >
          {[...family.pattern].map((c, i) => (
            <span key={i} aria-hidden="true" data-blank={c === "_"}>
              {c === "_" ? "?" : c}
            </span>
          ))}
        </div>
        <p className="tt-rule">
          {mode === "hard"
            ? "Keep every green tile in place on every guess."
            : "Try a possible answer or use a guess to test several letters."}
        </p>
        {turns.length > 0 && (
          <ol className="tt-history" aria-label="Your guesses">
            {turns.map((turn, i) => (
              <li key={i}>
                <span
                  className="tt-tiles"
                  role="img"
                  aria-label={
                    turn.guess +
                    ". " +
                    [...turn.pattern].map((c, j) => turn.guess[j] + " " + tileNames[c]).join(", ")
                  }
                >
                  {[...turn.guess].map((c, j) => (
                    <span key={j} data-color={turn.pattern[j]} aria-hidden="true">
                      {c}
                      <small>{tileMarks[turn.pattern[j]]}</small>
                    </span>
                  ))}
                </span>
                <span>
                  {turn.before.length} → {turn.after.length} left
                </span>
              </li>
            ))}
          </ol>
        )}
        {finished ? (
          <p className="tt-answer" role="status">
            The hidden word was <b>{answer}</b>.
          </p>
        ) : (
          <form onSubmit={submit} className="tt-form">
            <label htmlFor="tt-guess">Your next guess</label>
            <div>
              <input
                id="tt-guess"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                placeholder="Five letters"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError("");
                }}
                aria-invalid={!!error}
                aria-describedby={error ? "tt-error" : undefined}
              />
              <button type="submit" className="tt-submit">
                Play guess
              </button>
            </div>
            {error && (
              <p id="tt-error" className="tt-error" role="alert">
                {error}
              </p>
            )}
          </form>
        )}
        {last && (
          <button type="button" className="tt-restart" onClick={restart}>
            {finished ? "Play another round" : "Restart round"}
          </button>
        )}
      </div>
      <div className="tt-study">
        <h2 className="tt-count" aria-live="polite">
          {remaining.length} possible {remaining.length === 1 ? "answer" : "answers"}
        </h2>
        <ul className="tt-candidates" aria-label="Remaining candidate words">
          {remaining.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
        {last ? (
          <Comparison key={turns.length} turn={last} family={family} />
        ) : (
          <p className="tt-note">
            Play one guess to see which words it separates. Each possible answer is equally likely
            at the start.
          </p>
        )}
      </div>
    </div>
  );
}

function Comparison({ turn, family }: { turn: Turn; family: TrapFamily }) {
  const [study] = family.probes
    .map((word) => ({
      word,
      groups: splitTrap(word, turn.before),
    }))
    .sort(
      (a, b) => a.groups[0][1].length - b.groups[0][1].length || b.groups.length - a.groups.length,
    );
  const moves =
    turn.guess === study.word
      ? [study]
      : [{ word: turn.guess, groups: splitTrap(turn.guess, turn.before) }, study];
  return (
    <div className="tt-comparison">
      <h3>Compare this move</h3>
      <p>
        {moves.length === 1
          ? "You played the example probe."
          : "Compare your guess with a regular-mode probe."}{" "}
        Starting pool: {turn.before.length}.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Move</th>
            <th scope="col">Patterns</th>
            <th scope="col">Most left</th>
          </tr>
        </thead>
        <tbody>
          {moves.map(({ word, groups }) => (
            <tr key={word}>
              <th scope="row">
                {word}
                <small>{word === turn.guess ? "Your guess" : "Regular-mode probe"}</small>
              </th>
              <td>{groups.length}</td>
              <td>{groups[0][1].length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <details>
        <summary>See every {study.word} feedback group</summary>
        <ul>
          {study.groups.map(([pattern, words]) => (
            <li key={pattern}>
              <b aria-label={[...pattern].map((c) => tileNames[c]).join(", ")}>{pattern}</b>
              <span>{words.join(", ")}</span>
            </li>
          ))}
        </ul>
        <p>G = right place · Y = other place · B = no copy left</p>
      </details>
    </div>
  );
}
