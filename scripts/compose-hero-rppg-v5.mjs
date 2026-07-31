import sharp from "sharp";
import fs from "fs";

// v5 = navy atmosphere only, matching rppg-v2 / base palette
const refSrc = "public/brand/generated/hero-promo-v3-rppg-v2.jpg";
const outLive = "public/brand/hero-promo-v5.jpg";
const outArchive = "public/brand/generated/hero-promo-rppg-v5.jpg";

const meta = await sharp(refSrc).metadata();
const W = meta.width;
const H = meta.height;

function ekgBeatAt(y, x0, scale = 1) {
  const s = scale;
  return [
    `M ${x0} ${y}`,
    `L ${x0 + 28 * s} ${y}`,
    `L ${x0 + 36 * s} ${y - 8 * s}`,
    `L ${x0 + 44 * s} ${y + 6 * s}`,
    `L ${x0 + 52 * s} ${y - 48 * s}`,
    `L ${x0 + 60 * s} ${y + 32 * s}`,
    `L ${x0 + 70 * s} ${y - 4 * s}`,
    `L ${x0 + 88 * s} ${y}`,
    `L ${x0 + 140 * s} ${y}`,
  ].join(" ");
}

const midY = Math.round(H * 0.48);
const midPath = [-10, 150, 310, 470, 630, 790, 950]
  .map((x) => ekgBeatAt(midY, x, 1))
  .join(" ");

// Soft coral pulse echo like original v2 left waveform (very subtle)
const coralPath = [
  `M 40 ${Math.round(H * 0.42)}`,
  `L 90 ${Math.round(H * 0.42)}`,
  `L 110 ${Math.round(H * 0.38)}`,
  `L 130 ${Math.round(H * 0.46)}`,
  `L 155 ${Math.round(H * 0.3)}`,
  `L 180 ${Math.round(H * 0.52)}`,
  `L 210 ${Math.round(H * 0.4)}`,
  `L 280 ${Math.round(H * 0.42)}`,
  `L 360 ${Math.round(H * 0.41)}`,
].join(" ");

const bgSvg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0.2" y1="0" x2="0.8" y2="1">
      <stop offset="0%" stop-color="#081425"/>
      <stop offset="45%" stop-color="#0f2438"/>
      <stop offset="100%" stop-color="#0c1f33"/>
    </linearGradient>
    <radialGradient id="g1" cx="62%" cy="28%" r="46%">
      <stop offset="0%" stop-color="#378fca" stop-opacity="0.24"/>
      <stop offset="100%" stop-color="#378fca" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="18%" cy="58%" r="40%">
      <stop offset="0%" stop-color="#ee5a65" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#ee5a65" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g3" cx="80%" cy="72%" r="36%">
      <stop offset="0%" stop-color="#1a4f78" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#1a4f78" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ekgFade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="12%" stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.4"/>
      <stop offset="88%" stop-color="#ffffff" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#g1)"/>
  <rect width="100%" height="100%" fill="url(#g2)"/>
  <rect width="100%" height="100%" fill="url(#g3)"/>

  <!-- soft light ribbons like v2 atmosphere -->
  <path d="M-60 260 C 180 180, 360 320, 560 220 S 900 160, 1120 260" fill="none" stroke="#7eb7de" stroke-opacity="0.13" stroke-width="34"/>
  <path d="M-40 520 C 200 440, 420 600, 640 480 S 960 420, 1140 540" fill="none" stroke="#9ec9e8" stroke-opacity="0.08" stroke-width="42"/>
  <path d="M-20 900 C 220 820, 480 980, 720 860 S 1000 800, 1160 920" fill="none" stroke="#6aa3c8" stroke-opacity="0.07" stroke-width="36"/>

  <!-- bokeh -->
  <circle cx="110" cy="140" r="2.4" fill="#fff" opacity="0.3"/>
  <circle cx="280" cy="90" r="1.7" fill="#fff" opacity="0.22"/>
  <circle cx="470" cy="180" r="2" fill="#fff" opacity="0.2"/>
  <circle cx="720" cy="120" r="2.6" fill="#fff" opacity="0.28"/>
  <circle cx="880" cy="210" r="1.8" fill="#fff" opacity="0.18"/>
  <circle cx="160" cy="680" r="2.2" fill="#fff" opacity="0.2"/>
  <circle cx="940" cy="760" r="2.4" fill="#fff" opacity="0.22"/>
  <circle cx="60" cy="1100" r="1.9" fill="#fff" opacity="0.16"/>
  <circle cx="980" cy="1180" r="2.1" fill="#fff" opacity="0.18"/>
  <circle cx="420" cy="1280" r="1.5" fill="#fff" opacity="0.14"/>

  <!-- minimal white EKG -->
  <path d="${midPath}" fill="none" stroke="url(#ekgFade)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- subtle coral pulse accent -->
  <path d="${coralPath}" fill="none" stroke="#ee5a65" stroke-opacity="0.45" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`);

await sharp(bgSvg)
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(outLive);

await sharp(bgSvg)
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(outArchive);

console.log("OK", {
  outLive,
  outArchive,
  size: fs.statSync(outLive).size,
  W,
  H,
});
