import sharp from "sharp";
import fs from "fs";

// v6 = calm version: app + finger PPG + face rPPG, muted accents, no shouting copy
const baseSrc = "public/brand/generated/hero-promo-v3-base.jpg";
const faceSrc = "public/brand/generated/rppg-face-scan-green.png";
const outLive = "public/brand/hero-promo-v6.jpg";
const outArchive = "public/brand/generated/hero-promo-rppg-v6.jpg";

const meta = await sharp(baseSrc).metadata();
const W = meta.width;
const H = meta.height;

const CALM = "#8fd8c8";
const CALM_SOFT = "#bdeade";

function isNavyBg(r, g, b) {
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (luma > 55) return false;
  return b >= r - 8 && b >= g - 4 && b < 90;
}

async function cutNavy(inputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    if (isNavyBg(data[i], data[i + 1], data[i + 2])) data[i + 3] = 0;
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

/** Tone down the hot red flash glow so the scene reads calm */
async function softenHotAccents(inputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const hotRed = r > 150 && r - g > 55 && r - b > 55;
    if (!hotRed) continue;

    const grey = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const mix = 0.42;
    data[i] = Math.round(r * (1 - mix) + grey * mix);
    data[i + 1] = Math.round(g * (1 - mix) + grey * mix * 1.08);
    data[i + 2] = Math.round(b * (1 - mix) + grey * mix * 1.12);
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .jpeg({ quality: 95 })
    .toBuffer();
}

/** Quiet face frame: thin rounded stroke, soft brackets, minimal glow */
async function calmFaceBadge(pngBuffer, size) {
  const radius = Math.round(size * 0.2);
  const inset = 8;
  const inner = size - inset * 2;

  const resized = await sharp(pngBuffer)
    .resize(inner, inner, { fit: "cover", position: "centre" })
    .modulate({ saturation: 0.86, brightness: 1.02 })
    .ensureAlpha()
    .png()
    .toBuffer();

  const roundMask = Buffer.from(`
<svg width="${inner}" height="${inner}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${inner}" height="${inner}" rx="${radius - 4}" ry="${radius - 4}" fill="#fff"/>
</svg>`);

  const cut = await sharp(resized)
    .composite([{ input: roundMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const bracket = Math.round(size * 0.13);
  const frame = Buffer.from(`
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${CALM_SOFT}" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="${CALM}" stop-opacity="0.7"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="${CALM}" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect x="3" y="3" width="${size - 6}" height="${size - 6}" rx="${radius}" ry="${radius}"
    fill="none" stroke="url(#g)" stroke-width="1.8" filter="url(#glow)"/>
  <path d="M${inset + 6} ${inset + bracket} V${inset + 6} H${inset + bracket}" fill="none" stroke="${CALM_SOFT}" stroke-opacity="0.75" stroke-width="2" stroke-linecap="round"/>
  <path d="M${size - inset - 6} ${inset + bracket} V${inset + 6} H${size - inset - bracket}" fill="none" stroke="${CALM_SOFT}" stroke-opacity="0.75" stroke-width="2" stroke-linecap="round"/>
  <path d="M${inset + 6} ${size - inset - bracket} V${size - inset - 6} H${inset + bracket}" fill="none" stroke="${CALM_SOFT}" stroke-opacity="0.75" stroke-width="2" stroke-linecap="round"/>
  <path d="M${size - inset - 6} ${size - inset - bracket} V${size - inset - 6} H${size - inset - bracket}" fill="none" stroke="${CALM_SOFT}" stroke-opacity="0.75" stroke-width="2" stroke-linecap="round"/>
</svg>`);

  const shadow = Buffer.from(`
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="s" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#04101c" flood-opacity="0.45"/>
    </filter>
  </defs>
  <rect x="6" y="6" width="${size - 12}" height="${size - 12}" rx="${radius}" fill="#04101c" fill-opacity="0.001" filter="url(#s)"/>
</svg>`);

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: shadow, left: 0, top: 0 },
      { input: cut, left: inset, top: inset },
      { input: frame, left: 0, top: 0 },
    ])
    .png()
    .toBuffer();
}

/** Quiet caption pill: method name + one-line explanation */
function captionSvg(width, height, title, note, accent) {
  const rx = Math.round(height * 0.32);
  return Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="s" x="-14%" y="-30%" width="128%" height="170%">
      <feDropShadow dx="0" dy="6" stdDeviation="9" flood-color="#04101c" flood-opacity="0.4"/>
    </filter>
  </defs>
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${rx}" fill="#0c1f2b" fill-opacity="0.72" filter="url(#s)"/>
  <rect x="1.5" y="1.5" width="${width - 3}" height="${height - 3}" rx="${rx - 0.5}" fill="none" stroke="${accent}" stroke-opacity="0.42" stroke-width="1.8"/>
  <circle cx="34" cy="${height / 2}" r="9" fill="${accent}" fill-opacity="0.85"/>
  <text x="62" y="${height / 2 - 6}" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700" fill="#f2f8fb">${title}</text>
  <text x="62" y="${height / 2 + 34}" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="400" fill="#a9c4d1">${note}</text>
</svg>`);
}

function ekgBeatAt(y, x0, scale = 1) {
  const s = scale;
  return [
    `M ${x0} ${y}`,
    `L ${x0 + 30 * s} ${y}`,
    `L ${x0 + 38 * s} ${y - 6 * s}`,
    `L ${x0 + 46 * s} ${y + 5 * s}`,
    `L ${x0 + 54 * s} ${y - 30 * s}`,
    `L ${x0 + 62 * s} ${y + 18 * s}`,
    `L ${x0 + 72 * s} ${y - 3 * s}`,
    `L ${x0 + 92 * s} ${y}`,
    `L ${x0 + 150 * s} ${y}`,
  ].join(" ");
}

const midY = Math.round(H * 0.455);
const midPath = [-10, 160, 330, 500, 670, 840, 1010]
  .map((x) => ekgBeatAt(midY, x, 1))
  .join(" ");

// Calm top: quiet gradient replaces the loud headline block
const titleH = 300;
const skyPatch = Buffer.from(`
<svg width="${W}" height="${titleH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0.25" y1="0" x2="0.75" y2="1">
      <stop offset="0%" stop-color="#0a1a28"/>
      <stop offset="55%" stop-color="#0f2534"/>
      <stop offset="100%" stop-color="#15303f"/>
    </linearGradient>
    <radialGradient id="halo" cx="68%" cy="34%" r="52%">
      <stop offset="0%" stop-color="#5fb3ad" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#5fb3ad" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="edgeFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
      <stop offset="90%" stop-color="#ffffff" stop-opacity="1"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <mask id="m"><rect width="100%" height="100%" fill="url(#edgeFade)"/></mask>
  </defs>
  <g mask="url(#m)">
    <rect width="100%" height="100%" fill="url(#sky)"/>
    <rect width="100%" height="100%" fill="url(#halo)"/>
    <path d="M-40 250 C 180 205, 340 275, 540 220 S 860 180, 1120 245" fill="none" stroke="#8fc7d8" stroke-opacity="0.09" stroke-width="30"/>
    <circle cx="150" cy="52" r="2" fill="#fff" opacity="0.2"/>
    <circle cx="930" cy="120" r="1.4" fill="#fff" opacity="0.13"/>
  </g>
  <text x="${W / 2}" y="66" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" letter-spacing="6" fill="${CALM}" fill-opacity="0.85">PPG &#183; rPPG</text>
  <text x="${W / 2}" y="152" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700" fill="#f4fafc">Camera pulse check</text>
  <text x="${W / 2}" y="216" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="400" fill="#a9c4d1">Tiny colour changes in your skin,</text>
  <text x="${W / 2}" y="264" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="400" fill="#a9c4d1">read by the camera. No wearable.</text>
</svg>`);

// Muted ambience + quiet EKG, no vivid footer band
const overlaySvg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="a1" cx="20%" cy="46%" r="44%">
      <stop offset="0%" stop-color="#4f9fa8" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#4f9fa8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="a2" cx="80%" cy="60%" r="40%">
      <stop offset="0%" stop-color="#2f6f96" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#2f6f96" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ekgFade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="14%" stop-color="#ffffff" stop-opacity="0.34"/>
      <stop offset="55%" stop-color="#ffffff" stop-opacity="0.24"/>
      <stop offset="90%" stop-color="#ffffff" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="footFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0e2735" stop-opacity="0"/>
      <stop offset="100%" stop-color="#0e2735" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="footSolid" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0e2735"/>
      <stop offset="100%" stop-color="#0a1d29"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#a1)"/>
  <rect width="100%" height="100%" fill="url(#a2)"/>
  <path d="${midPath}" fill="none" stroke="url(#ekgFade)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="0" y="${H - 300}" width="${W}" height="130" fill="url(#footFade)"/>
  <rect x="0" y="${H - 172}" width="${W}" height="172" fill="url(#footSolid)"/>
  <rect x="${W / 2 - 140}" y="${H - 74}" width="280" height="3" rx="1.5" fill="#e8919a" fill-opacity="0.45"/>
</svg>`);

const faceCut = await cutNavy(faceSrc);
const faceSize = Math.round(W * 0.29);
const faceBadge = await calmFaceBadge(faceCut, faceSize);
const faceLeft = Math.round(W * 0.045);
const faceTop = Math.round(H * 0.25);

const capW = 420;
const capH = 120;
const faceCaption = captionSvg(
  capW,
  capH,
  "Face rPPG",
  "contactless face scan",
  CALM,
);
const fingerCaption = captionSvg(
  capW,
  capH,
  "Finger PPG",
  "fingertip on rear camera",
  "#e8919a",
);

const faceCapLeft = Math.round(W * 0.028);
const faceCapTop = faceTop + faceSize + 10;
const fingerCapLeft = Math.round(W * 0.028);
const fingerCapTop = Math.round(H * 0.815);

const calmBase = await softenHotAccents(baseSrc);

const composed = await sharp(calmBase)
  .modulate({ saturation: 0.92, brightness: 1.01 })
  .composite([
    { input: skyPatch, left: 0, top: 0 },
    { input: overlaySvg, left: 0, top: 0 },
    { input: faceBadge, left: faceLeft, top: faceTop },
    { input: faceCaption, left: faceCapLeft, top: faceCapTop },
    { input: fingerCaption, left: fingerCapLeft, top: fingerCapTop },
  ])
  .jpeg({ quality: 92, mozjpeg: true })
  .toBuffer();

await sharp(composed).toFile(outLive);
await sharp(composed).toFile(outArchive);

console.log("OK", {
  outLive,
  outArchive,
  size: fs.statSync(outLive).size,
});
