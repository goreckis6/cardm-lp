import sharp from "sharp";
import fs from "fs";

const baseSrc = "public/brand/generated/hero-promo-v3-base.jpg";
const faceSrc = "public/brand/generated/rppg-face-scan-green.png";
const outLive = "public/brand/hero-promo-v3.jpg";
const outArchive = "public/brand/generated/hero-promo-rppg-v3.jpg";

const meta = await sharp(baseSrc).metadata();
const W = meta.width;
const H = meta.height;

const GREEN = "#3DDC84";
const GREEN_SOFT = "#6AF0A5";

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

async function greenFrameBadge(pngBuffer, size) {
  const radius = Math.round(size * 0.16);
  const inset = 10;
  const inner = size - inset * 2;

  const resized = await sharp(pngBuffer)
    .resize(inner, inner, { fit: "cover", position: "centre" })
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

  const bracket = Math.round(size * 0.16);
  const stroke = 3.5;
  const frame = Buffer.from(`
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${GREEN_SOFT}"/>
      <stop offset="100%" stop-color="${GREEN}"/>
    </linearGradient>
    <filter id="glow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="${GREEN}" flood-opacity="0.55"/>
    </filter>
  </defs>
  <rect x="4" y="4" width="${size - 8}" height="${size - 8}" rx="${radius}" ry="${radius}"
    fill="none" stroke="url(#g)" stroke-width="${stroke}" filter="url(#glow)"/>
  <path d="M${inset + 4} ${inset + bracket} V${inset + 4} H${inset + bracket}" fill="none" stroke="${GREEN}" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M${size - inset - 4} ${inset + bracket} V${inset + 4} H${size - inset - bracket}" fill="none" stroke="${GREEN}" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M${inset + 4} ${size - inset - bracket} V${size - inset - 4} H${inset + bracket}" fill="none" stroke="${GREEN}" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M${size - inset - 4} ${size - inset - bracket} V${size - inset - 4} H${size - inset - bracket}" fill="none" stroke="${GREEN}" stroke-width="3.2" stroke-linecap="round"/>
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
      { input: cut, left: inset, top: inset },
      { input: frame, left: 0, top: 0 },
    ])
    .png()
    .toBuffer();
}

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

const midY = Math.round(H * 0.455);
const midPath = [-10, 150, 310, 470, 630, 790, 950]
  .map((x) => ekgBeatAt(midY, x, 1))
  .join(" ");

const ekgSvg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ekgMid" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="10%" stop-color="#ffffff" stop-opacity="0.75"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="85%" stop-color="#ffffff" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <path d="${midPath}" fill="none" stroke="url(#ekgMid)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`);

// Clean atmospheric top sky (no flat bar, no ghosted title)
const titleTop = 0;
const titleH = 290;

const skyPatch = Buffer.from(`
<svg width="${W}" height="${titleH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0.15" y1="0" x2="0.85" y2="1">
      <stop offset="0%" stop-color="#081425"/>
      <stop offset="40%" stop-color="#0c1c30"/>
      <stop offset="78%" stop-color="#102438"/>
      <stop offset="100%" stop-color="#12304a"/>
    </linearGradient>
    <radialGradient id="glowR" cx="78%" cy="28%" r="48%">
      <stop offset="0%" stop-color="#378fca" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#378fca" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowL" cx="22%" cy="62%" r="42%">
      <stop offset="0%" stop-color="#1a4a6e" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#1a4a6e" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="edgeFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
      <stop offset="93%" stop-color="#ffffff" stop-opacity="1"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <mask id="m">
      <rect width="100%" height="100%" fill="url(#edgeFade)"/>
    </mask>
  </defs>
  <g mask="url(#m)">
    <rect width="100%" height="100%" fill="url(#sky)"/>
    <rect width="100%" height="100%" fill="url(#glowR)"/>
    <rect width="100%" height="100%" fill="url(#glowL)"/>
    <path d="M-40 210 C 160 150, 320 240, 500 170 S 820 120, 1100 200" fill="none" stroke="#7eb7de" stroke-opacity="0.14" stroke-width="26"/>
    <path d="M-20 90 C 200 40, 420 130, 640 70 S 960 30, 1120 95" fill="none" stroke="#9ec9e8" stroke-opacity="0.08" stroke-width="18"/>
    <circle cx="120" cy="58" r="2.3" fill="#fff" opacity="0.3"/>
    <circle cx="260" cy="120" r="1.7" fill="#fff" opacity="0.22"/>
    <circle cx="410" cy="48" r="1.5" fill="#fff" opacity="0.18"/>
    <circle cx="620" cy="95" r="2" fill="#fff" opacity="0.24"/>
    <circle cx="780" cy="42" r="2.5" fill="#fff" opacity="0.28"/>
    <circle cx="900" cy="110" r="1.6" fill="#fff" opacity="0.2"/>
    <circle cx="980" cy="70" r="1.4" fill="#fff" opacity="0.16"/>
  </g>
</svg>`);

const footerSvg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="redFoot" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f06a73"/>
      <stop offset="45%" stop-color="#ee5a65"/>
      <stop offset="100%" stop-color="#e14d58"/>
    </linearGradient>
  </defs>
  <path d="
    M0 ${H - 182}
    C ${W * 0.18} ${H - 222}, ${W * 0.38} ${H - 172}, ${W * 0.55} ${H - 202}
    C ${W * 0.72} ${H - 232}, ${W * 0.88} ${H - 188}, ${W} ${H - 212}
    L ${W} ${H}
    L 0 ${H}
    Z
  " fill="url(#redFoot)"/>
</svg>`);

const faceCut = await cutNavy(faceSrc);
const faceSize = Math.round(W * 0.3);
const faceBadge = await greenFrameBadge(faceCut, faceSize);
const faceLeft = Math.round(W * 0.04);
const faceTop = Math.round(H * 0.22);

const composed = await sharp(baseSrc)
  .composite([
    { input: skyPatch, left: 0, top: titleTop },
    { input: footerSvg, left: 0, top: 0 },
    { input: ekgSvg, left: 0, top: 0 },
    { input: faceBadge, left: faceLeft, top: faceTop },
  ])
  .jpeg({ quality: 91, mozjpeg: true })
  .toBuffer();

await sharp(composed).toFile(outLive);
await sharp(composed).toFile(outArchive);

console.log("OK", {
  outLive,
  outArchive,
  size: fs.statSync(outLive).size,
});
