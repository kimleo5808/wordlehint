"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { decodeChallenge, makerPath } from "@/lib/custom-wordle";
import ChallengeGame from "./ChallengeGame";

function subscribe(listener: () => void) {
  window.addEventListener("hashchange", listener);
  return () => window.removeEventListener("hashchange", listener);
}

export default function ChallengePlayer() {
  const token = useSyncExternalStore(
    subscribe,
    () => window.location.hash.slice(1),
    () => null,
  );
  if (token === null) return <p role="status">Opening the challenge…</p>;
  const puzzle = decodeChallenge(token);
  if (!puzzle)
    return (
      <div className="cw-broken">
        <p>
          This challenge link is incomplete or unreadable. Ask the sender to copy the full link
          again.
        </p>
        <Link href={makerPath} className="cw-text">
          Make a new puzzle
        </Link>
      </div>
    );
  return <ChallengeGame key={token} puzzle={puzzle} challengeId={puzzle.id} />;
}
