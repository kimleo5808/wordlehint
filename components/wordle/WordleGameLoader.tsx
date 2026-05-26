"use client";

import dynamic from "next/dynamic";

const WordleGame = dynamic(
  () => import("@/components/wordle/WordleGame"),
  { ssr: false }
);

export default function WordleGameLoader({
  wordLength,
  hideControls,
}: {
  wordLength: number;
  hideControls?: boolean;
}) {
  return <WordleGame wordLength={wordLength} hideControls={hideControls} />;
}
