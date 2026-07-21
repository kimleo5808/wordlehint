#!/usr/bin/env node

/**
 * generate-connections-unlimited-images.mjs
 *
 * Renders the in-content illustration PNGs for /connections-unlimited from
 * SVG via sharp, into public/images/connections-unlimited/. Style matches
 * the page's editorial-newsprint shell (cream paper, ink text) with the
 * official Connections difficulty colours. Re-run after changing copy.
 *
 * Usage: node scripts/generate-connections-unlimited-images.mjs
 */

import sharp from "sharp";
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "images", "connections-unlimited");
mkdirSync(OUT_DIR, { recursive: true });

const W = 1200;
const H = 640;

// Editorial-newsprint palette (tailwind `brand` scale) + CONN_COLORS
const CREAM = "#F5F1E8";
const PAPER = "#FBF8F0";
const INK = "#1A1814";
const MID = "#3A3631";
const SUBTLE = "#6B6660";
const SIGNAL = "#C2410C";
const YELLOW = "#eab308";
const GREEN = "#22a06b";
const BLUE = "#3b82f6";
const PURPLE = "#9333ea";
const FONT = "Arial, 'DejaVu Sans', 'Liberation Sans', sans-serif";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** One word tile. */
function tile(x, y, w, h, word, opts = {}) {
  const { fill = PAPER, stroke = MID, text = INK, fontSize = 22, bold = true } = opts;
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="1.5" stroke-opacity="0.45"/>
    <text x="${x + w / 2}" y="${y + h / 2}" font-family="${FONT}" font-weight="${bold ? 700 : 500}" font-size="${fontSize}" fill="${text}" text-anchor="middle" dominant-baseline="central" letter-spacing="0.5">${esc(word)}</text>`;
}

/** Solved-group banner. */
function banner(x, y, w, h, color, name, words, textColor) {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${color}"/>
    <text x="${x + w / 2}" y="${y + h * 0.38}" font-family="${FONT}" font-weight="800" font-size="26" fill="${textColor}" text-anchor="middle" letter-spacing="1">${esc(name)}</text>
    <text x="${x + w / 2}" y="${y + h * 0.72}" font-family="${FONT}" font-weight="500" font-size="19" fill="${textColor}" fill-opacity="0.85" text-anchor="middle" letter-spacing="1.5">${esc(words)}</text>`;
}

/** Small mono caption label. */
function label(x, y, text, opts = {}) {
  const { fill = SUBTLE, size = 16, anchor = "start", weight = 600 } = opts;
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-weight="${weight}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" letter-spacing="2">${esc(text)}</text>`;
}

function frame(title, height = H) {
  return `
    <rect width="${W}" height="${height}" fill="${CREAM}"/>
    <rect x="24" y="24" width="${W - 48}" height="${height - 48}" fill="none" stroke="${MID}" stroke-opacity="0.35" stroke-width="1.5"/>
    ${label(48, 66, title.toUpperCase(), { fill: SIGNAL, size: 17 })}
    ${label(W - 48, 66, "CONNECTIONS UNLIMITED · WORDLEHINT.INFO", { anchor: "end", size: 13 })}`;
}

// ────────────────────────────────────────────────────────────────
// 1) How to play — three-step flow
// ────────────────────────────────────────────────────────────────
function howToPlaySvg() {
  const HH = 520;
  const panelW = 340;
  const gap = 32;
  const startX = (W - panelW * 3 - gap * 2) / 2;
  const topY = 120;
  const tw = 156;
  const th = 62;
  const tg = 12;

  const words1 = [
    ["HAIL", "BUCKS"],
    ["TAB", "KAYAK"],
  ];
  const grid = (px, selected = []) =>
    words1
      .map((row, r) =>
        row
          .map((word, c) => {
            const sel = selected.includes(word);
            return tile(px + c * (tw + tg), topY + 60 + r * (th + tg), tw, th, word, {
              fill: sel ? INK : PAPER,
              text: sel ? CREAM : INK,
              fontSize: 20,
            });
          })
          .join("")
      )
      .join("");

  const p1 = startX;
  const p2 = startX + panelW + gap;
  const p3 = startX + (panelW + gap) * 2;

  return `<svg width="${W}" height="${HH}" viewBox="0 0 ${W} ${HH}" xmlns="http://www.w3.org/2000/svg">
    ${frame("How to play", HH)}
    ${label(p1 + panelW / 2, topY + 26, "1 · SCAN THE GRID", { anchor: "middle", fill: INK, size: 19 })}
    ${grid(p1 + (panelW - tw * 2 - tg) / 2)}
    ${label(p1 + panelW / 2, topY + 60 + th * 2 + tg + 44, "Read all 16 words twice", { anchor: "middle", size: 15, weight: 400 })}

    ${label(p2 + panelW / 2, topY + 26, "2 · SELECT FOUR", { anchor: "middle", fill: INK, size: 19 })}
    ${grid(p2 + (panelW - tw * 2 - tg) / 2, ["HAIL", "TAB", "KAYAK", "BUCKS"])}
    ${label(p2 + panelW / 2, topY + 60 + th * 2 + tg + 44, "Tap words that share a theme", { anchor: "middle", size: 15, weight: 400 })}

    ${label(p3 + panelW / 2, topY + 26, "3 · SUBMIT", { anchor: "middle", fill: INK, size: 19 })}
    ${banner(p3 + (panelW - tw * 2 - tg) / 2, topY + 60, tw * 2 + tg, th, YELLOW, "WET WEATHER", "HAIL · RAIN · SLEET · SNOW", "#1a1505")}
    <rect x="${p3 + (panelW - tw * 2 - tg) / 2}" y="${topY + 60 + th + tg}" width="${tw * 2 + tg}" height="${th}" rx="6" fill="${PAPER}" stroke="${MID}" stroke-opacity="0.3" stroke-width="1.5" stroke-dasharray="6 5"/>
    ${label(p3 + panelW / 2, topY + 60 + th + tg + th / 2 + 6, "12 words remain…", { anchor: "middle", size: 15, weight: 400 })}
    ${label(p3 + panelW / 2, topY + 60 + th * 2 + tg + 44, "Correct group collapses into a banner", { anchor: "middle", size: 15, weight: 400 })}

    <text x="${p1 + panelW + gap / 2}" y="${topY + 130}" font-family="${FONT}" font-size="30" fill="${SIGNAL}" text-anchor="middle">→</text>
    <text x="${p2 + panelW + gap / 2}" y="${topY + 130}" font-family="${FONT}" font-size="30" fill="${SIGNAL}" text-anchor="middle">→</text>

    ${label(W / 2, HH - 76, "FOUR MISTAKES ALLOWED · HINTS NEVER COST A MISTAKE", { anchor: "middle", size: 15 })}
    <g>
      <circle cx="${W / 2 - 42}" cy="${HH - 46}" r="7" fill="${INK}"/>
      <circle cx="${W / 2 - 14}" cy="${HH - 46}" r="7" fill="${INK}"/>
      <circle cx="${W / 2 + 14}" cy="${HH - 46}" r="7" fill="${INK}"/>
      <circle cx="${W / 2 + 42}" cy="${HH - 46}" r="7" fill="${INK}" fill-opacity="0.25"/>
    </g>
  </svg>`;
}

// ────────────────────────────────────────────────────────────────
// 2) Difficulty colours — the four real June 2023 groups
// ────────────────────────────────────────────────────────────────
function difficultyColorsSvg() {
  const bw = 900;
  const bh = 92;
  const bg = 20;
  const bx = (W - bw) / 2;
  const by = 110;
  const rows = [
    [YELLOW, "WET WEATHER", "HAIL · RAIN · SLEET · SNOW", "#1a1505", "EASIEST"],
    [GREEN, "NBA TEAMS", "BUCKS · HEAT · JAZZ · NETS", "#052015", "EASY"],
    [BLUE, "KEYBOARD KEYS", "OPTION · RETURN · SHIFT · TAB", "#04132e", "HARD"],
    [PURPLE, "PALINDROMES", "KAYAK · LEVEL · MOM · RACECAR", "#f3e8ff", "TRICKIEST"],
  ];

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    ${frame("The four difficulty colours")}
    ${rows
      .map(([color, name, words, tc, diff], i) => {
        const y = by + i * (bh + bg);
        return `
          ${label(bx - 18, y + bh / 2 + 6, diff, { anchor: "end", size: 15 })}
          ${banner(bx, y, bw, bh, color, name, words, tc)}`;
      })
      .join("")}
    ${label(W / 2, H - 52, "REAL PUZZLE FROM JUNE 12, 2023 — THE FIRST BOARD IN THE ARCHIVE", { anchor: "middle", size: 14 })}
  </svg>`;
}

// ────────────────────────────────────────────────────────────────
// 3) Trap words — one word, two plausible homes
// ────────────────────────────────────────────────────────────────
function trapWordsSvg() {
  const cx = W / 2;
  const tileW = 220;
  const tileH = 86;
  const ty = 210;

  const catW = 360;
  const catH = 110;
  const catY = 400;
  const leftX = cx - catW - 60;
  const rightX = cx + 60;

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    ${frame("Hunt the trap word first")}
    ${label(cx, 150, "ONE WORD · TWO PLAUSIBLE HOMES", { anchor: "middle", fill: INK, size: 19 })}

    ${tile(cx - tileW / 2, ty, tileW, tileH, "HEAT", { fontSize: 34 })}
    <rect x="${cx - tileW / 2 - 7}" y="${ty - 7}" width="${tileW + 14}" height="${tileH + 14}" rx="10" fill="none" stroke="${SIGNAL}" stroke-width="3"/>

    <path d="M ${cx - 40} ${ty + tileH + 12} Q ${cx - 190} ${ty + tileH + 80} ${leftX + catW / 2} ${catY - 14}" fill="none" stroke="${SIGNAL}" stroke-width="2.5" stroke-dasharray="7 6"/>
    <path d="M ${cx + 40} ${ty + tileH + 12} Q ${cx + 190} ${ty + tileH + 80} ${rightX + catW / 2} ${catY - 14}" fill="none" stroke="${SIGNAL}" stroke-width="2.5" stroke-dasharray="7 6"/>

    ${banner(leftX, catY, catW, catH, YELLOW, "WET WEATHER?", "HAIL · RAIN · SLEET · …", "#1a1505")}
    ${banner(rightX, catY, catW, catH, GREEN, "NBA TEAMS ✓", "BUCKS · JAZZ · NETS · HEAT", "#052015")}

    ${label(W / 2, H - 56, "SPOT THE OVERLAP BEFORE YOUR FIRST GUESS — MOST BOARDS ARE BUILT AROUND IT", { anchor: "middle", size: 14 })}
  </svg>`;
}

const IMAGES = [
  { file: "how-to-play", svg: howToPlaySvg() },
  { file: "difficulty-colors", svg: difficultyColorsSvg() },
  { file: "trap-words", svg: trapWordsSvg() },
];

async function main() {
  for (const img of IMAGES) {
    await sharp(Buffer.from(img.svg)).png().toFile(join(OUT_DIR, `${img.file}.png`));
    console.log(`✅ images/connections-unlimited/${img.file}.png`);
  }
  console.log(`Done — ${IMAGES.length} images in public/images/connections-unlimited/`);
}

main().catch((err) => {
  console.error("❌ image generation failed:", err.message);
  process.exit(1);
});
