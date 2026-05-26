/**
 * H2-6 Game Modes 数据
 * 4 个游戏模式（Standard / Hard / Dark / Color-blind）
 */

export type GameMode = {
  id: string;
  label: string;
  description: string;
};

export const GAME_MODES: GameMode[] = [
  {
    id: "standard",
    label: "Standard",
    description:
      "Default rules. Six guesses, any valid word permitted on every attempt, no extra constraints.",
  },
  {
    id: "hard",
    label: "Hard",
    description:
      "Every confirmed letter from prior guesses must appear in your next word. Closes off roughly 60% of the candidate space.",
  },
  {
    id: "dark",
    label: "Dark",
    description:
      "Inverted color palette tuned for low-light play. Auto-activates between 9pm and 7am if you set theme to follow time.",
  },
  {
    id: "color-blind",
    label: "Color-blind",
    description:
      "Swaps green for blue and yellow for orange, then adds shape markers so the feedback encoding does not rely on color alone.",
  },
];
