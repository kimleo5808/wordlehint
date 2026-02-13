import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// Wordle color palette
const GREEN = '#6aaa64';
const YELLOW = '#c9b458';
const DARK_GRAY = '#3a3a3c';
const LIGHT_GRAY = '#818384';
const BG_DARK = '#1e293b';

// ─── Helper: Wordle tile row ────────────────────────────────────
function tile(x, y, size, fill, letter, fontSize) {
  const r = Math.round(size * 0.1);
  const rect = `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="${r}" fill="${fill}"/>`;
  if (!letter) return rect;
  const tx = x + size / 2;
  const ty = y + size / 2 + fontSize * 0.05;
  const text = `<text x="${tx}" y="${ty}" font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif" font-weight="800" font-size="${fontSize}" text-anchor="middle" dominant-baseline="central" fill="white">${letter}</text>`;
  return rect + text;
}

function emptyTile(x, y, size) {
  const r = Math.round(size * 0.1);
  return `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="${r}" fill="none" stroke="${DARK_GRAY}" stroke-width="2"/>`;
}

// ─── 1. Logo SVG (512x512) ──────────────────────────────────────
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="96" fill="${BG_DARK}"/>
  ${/* Row 1: WORDL all green */''}
  ${tile(56, 100, 72, GREEN, 'W', 38)}
  ${tile(138, 100, 72, GREEN, 'O', 38)}
  ${tile(220, 100, 72, GREEN, 'R', 38)}
  ${tile(302, 100, 72, GREEN, 'D', 38)}
  ${tile(384, 100, 72, GREEN, 'L', 38)}
  ${/* Row 2: HINT_ mixed */''}
  ${tile(56, 182, 72, YELLOW, 'H', 38)}
  ${tile(138, 182, 72, GREEN, 'I', 38)}
  ${tile(220, 182, 72, YELLOW, 'N', 38)}
  ${tile(302, 182, 72, GREEN, 'T', 38)}
  ${tile(384, 182, 72, DARK_GRAY, '', 38)}
  ${/* Row 3-4: empty */''}
  ${emptyTile(56, 264, 72)}${emptyTile(138, 264, 72)}${emptyTile(220, 264, 72)}${emptyTile(302, 264, 72)}${emptyTile(384, 264, 72)}
  ${emptyTile(56, 346, 72)}${emptyTile(138, 346, 72)}${emptyTile(220, 346, 72)}${emptyTile(302, 346, 72)}${emptyTile(384, 346, 72)}
</svg>`;

// ─── 2. Favicon SVG (simple W tile, 64x64) ──────────────────────
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="12" fill="${GREEN}"/>
  <text x="32" y="34" font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif" font-weight="800" font-size="38" text-anchor="middle" dominant-baseline="central" fill="white">W</text>
</svg>`;

// ─── 3. OG Image SVG (1200x630) ─────────────────────────────────
function ogTile(x, y, size, fill, letter) {
  return tile(x, y, size, fill, letter, Math.round(size * 0.52));
}

function ogEmptyTile(x, y, size) {
  const r = Math.round(size * 0.1);
  return `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="${r}" fill="none" stroke="${DARK_GRAY}" stroke-width="2.5"/>`;
}

const ts = 68; // tile size for OG
const tg = 10; // tile gap
const gridX = 720;
const gridY = 80;

function ogRow(y, letters, colors) {
  return letters.map((l, i) => {
    const x = gridX + i * (ts + tg);
    if (!colors[i]) return ogEmptyTile(x, y, ts);
    return ogTile(x, y, ts, colors[i], l);
  }).join('\n  ');
}

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Subtle grid pattern -->
  <g opacity="0.04">
    ${Array.from({length: 20}, (_, i) => `<line x1="${i*60}" y1="0" x2="${i*60}" y2="630" stroke="white" stroke-width="1"/>`).join('\n    ')}
    ${Array.from({length: 11}, (_, i) => `<line x1="0" y1="${i*60}" x2="1200" y2="${i*60}" stroke="white" stroke-width="1"/>`).join('\n    ')}
  </g>

  <!-- Brand text -->
  <text x="80" y="150" font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif" font-weight="800" font-size="22" fill="${LIGHT_GRAY}" letter-spacing="4">WORDLEHINT.INFO</text>

  <!-- Title -->
  <text x="80" y="230" font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif" font-weight="800" font-size="62" fill="white">Daily Wordle</text>
  <text x="80" y="310" font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif" font-weight="800" font-size="62" fill="white"><tspan fill="${GREEN}">Hints</tspan> &amp; <tspan fill="${YELLOW}">Clues</tspan></text>

  <!-- Description -->
  <text x="80" y="380" font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif" font-weight="400" font-size="22" fill="${LIGHT_GRAY}">Play unlimited Wordle games from 4 to 11 letters.</text>
  <text x="80" y="415" font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif" font-weight="400" font-size="22" fill="${LIGHT_GRAY}">Strategy tips, best starting words, and solving guides.</text>

  <!-- Tags -->
  <rect x="80" y="455" width="140" height="40" rx="20" fill="${GREEN}" opacity="0.15"/>
  <text x="150" y="479" font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif" font-weight="700" font-size="16" text-anchor="middle" fill="${GREEN}">Wordle Hints</text>
  <rect x="235" y="455" width="110" height="40" rx="20" fill="${YELLOW}" opacity="0.15"/>
  <text x="290" y="479" font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif" font-weight="700" font-size="16" text-anchor="middle" fill="${YELLOW}">Solver</text>
  <rect x="360" y="455" width="140" height="40" rx="20" fill="#3b82f6" opacity="0.15"/>
  <text x="430" y="479" font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif" font-weight="700" font-size="16" text-anchor="middle" fill="#60a5fa">Free Games</text>

  <!-- Wordle grid on right side -->
  <!-- Row 1: CRANE - mixed results -->
  ${ogRow(gridY, ['C','R','A','N','E'], [DARK_GRAY, YELLOW, GREEN, DARK_GRAY, YELLOW])}
  <!-- Row 2: SLATE - better -->
  ${ogRow(gridY + ts + tg, ['S','L','A','T','E'], [DARK_GRAY, DARK_GRAY, GREEN, GREEN, GREEN])}
  <!-- Row 3: WASTE - almost -->
  ${ogRow(gridY + 2*(ts + tg), ['W','A','S','T','E'], [GREEN, GREEN, DARK_GRAY, GREEN, GREEN])}
  <!-- Row 4: WATER - solved! all green -->
  ${ogRow(gridY + 3*(ts + tg), ['W','A','T','E','R'], [GREEN, GREEN, GREEN, GREEN, GREEN])}
  <!-- Row 5-6: empty -->
  ${ogRow(gridY + 4*(ts + tg), ['','','','',''], [null, null, null, null, null])}
  ${ogRow(gridY + 5*(ts + tg), ['','','','',''], [null, null, null, null, null])}

  <!-- Footer -->
  <text x="1120" y="595" font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif" font-weight="600" font-size="16" text-anchor="end" fill="${LIGHT_GRAY}" opacity="0.6">wordlehint.info</text>
</svg>`;

// ─── Generate all files ─────────────────────────────────────────

async function main() {
  // Logo PNG (512x512)
  await sharp(Buffer.from(logoSvg))
    .resize(512, 512)
    .png()
    .toFile(join(publicDir, 'logo.png'));
  console.log('Created logo.png (512x512)');

  // Logo SVG (overwrite with cleaner version)
  writeFileSync(join(publicDir, 'logo.svg'), logoSvg);
  console.log('Created logo.svg');

  // Favicon PNG (64x64) then convert to ICO-like PNG
  await sharp(Buffer.from(faviconSvg))
    .resize(64, 64)
    .png()
    .toFile(join(publicDir, 'favicon.png'));
  console.log('Created favicon.png (64x64)');

  // Favicon ICO (32x32 PNG wrapped — browsers accept PNG favicons)
  await sharp(Buffer.from(faviconSvg))
    .resize(32, 32)
    .png()
    .toFile(join(publicDir, 'favicon.ico'));
  console.log('Created favicon.ico (32x32)');

  // OG Image PNG (1200x630)
  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .png()
    .toFile(join(publicDir, 'og.png'));
  console.log('Created og.png (1200x630)');

  // OG Image WebP version
  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .webp({ quality: 90 })
    .toFile(join(publicDir, 'og.webp'));
  console.log('Created og.webp (1200x630)');

  console.log('\nAll brand images generated!');
}

main().catch(console.error);
