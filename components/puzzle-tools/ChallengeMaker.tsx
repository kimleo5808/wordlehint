"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  challengePath,
  checkDraft,
  clueLimit,
  encodeChallenge,
  type CustomWordle,
} from "@/lib/custom-wordle";
import { trackToolEvent } from "./analytics";
import ChallengeCopy from "./ChallengeCopy";

const ChallengeGame = dynamic(() => import("./ChallengeGame"), {
  loading: () => <p role="status">Opening the test board…</p>,
});

export default function ChallengeMaker() {
  const [word, setWord] = useState("");
  const [clue, setClue] = useState("");
  const [error, setError] = useState("");
  const [link, setLink] = useState("");
  const [test, setTest] = useState<CustomWordle | null>(null);
  function edit() {
    setError("");
    setLink("");
    setTest(null);
  }
  function prepare(preview: boolean) {
    const invalid = checkDraft(word, clue);
    setError(invalid);
    if (invalid) return;
    const puzzle = { answer: word.trim().toUpperCase(), clue: clue.trim() };
    if (preview) {
      setTest(puzzle);
      return;
    }
    const { id, token } = encodeChallenge(puzzle);
    const url = new URL(challengePath, window.location.origin);
    url.hash = token;
    setLink(url.href);
    trackToolEvent("custom_wordle_created", { challenge_id: id, has_clue: Number(!!puzzle.clue) });
  }
  return (
    <div className="cw-maker">
      <form
        className="cw-editor"
        onSubmit={(event) => {
          event.preventDefault();
          prepare(false);
        }}
      >
        <label htmlFor="cw-word">Secret word</label>
        <input
          id="cw-word"
          value={word}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="Five letters"
          onChange={(e) => {
            edit();
            setWord(e.target.value);
          }}
        />
        <label htmlFor="cw-clue">
          Clue <span>(optional)</span>
        </label>
        <textarea
          id="cw-clue"
          value={clue}
          rows={2}
          maxLength={clueLimit}
          placeholder="Something your friend would recognize"
          onChange={(e) => {
            edit();
            setClue(e.target.value);
          }}
        />
        {error && (
          <p className="cw-error" role="alert">
            {error}
          </p>
        )}
        <div className="cw-actions">
          <button type="submit" className="cw-btn" disabled={!!link}>
            Create challenge link
          </button>
          <button
            type="button"
            className="cw-text"
            onClick={() => {
              edit();
              setWord("OTTER");
              setClue("You might spot one floating on its back.");
            }}
          >
            Load example
          </button>
        </div>
        {link && (
          <div className="cw-invite">
            <p>Your challenge link is ready.</p>
            <ChallengeCopy key={link} text={link} label="Copy link" sourceVisible />
          </div>
        )}
      </form>
      <section className="cw-preview" aria-label="Player preview">
        <h2>Player preview</h2>
        {test ? (
          <>
            <ChallengeGame puzzle={test} />
            <button type="button" className="cw-text" onClick={() => setTest(null)}>
              Close test board
            </button>
          </>
        ) : (
          <>
            <div className="cw-face" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((n) => (
                <span key={n}>?</span>
              ))}
            </div>
            <p className="cw-rules">
              5 letters <i aria-hidden="true">/</i> 6 guesses
            </p>
            {clue.trim() && (
              <details className="cw-clue">
                <summary>Open optional clue</summary>
                <p>{clue.trim()}</p>
              </details>
            )}
            <button type="button" className="cw-outline" onClick={() => prepare(true)}>
              Test as a player
            </button>
          </>
        )}
      </section>
    </div>
  );
}
