import sharp from "sharp";
import fs from "fs";

const baseSrc = "public/brand/generated/hero-promo-v3-base.jpg";
const faceSrc = "public/brand/generated/rppg-face-scan.png";
const outLive = "public/brand/hero-promo-v1.jpg";
const outArchive = "public/brand/generated/hero-promo-v3-rppg.jpg";

const base = sharp(baseSrc);
const meta = await base.metadata();
const W = meta.width;
const H = meta.height;

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

async function circularSoftMask(pngBuffer, size) {
  const resized = await sharp(pngBuffer)
    .resize(size, size, { fit: "cover", position: "centre" })
    .ensureAlpha()
    .png()
    .toBuffer();

  const r = size / 2;
  const feather = Math.round(size * 0.06);
  const mask = Buffer.from(`
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="f" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff"/>
      <stop offset="${((r - feather) / r) * 100}%" stop-color="#fff"/>
      <stop offset="100%" stop-color="#000"/>
    </radialGradient>
  </defs>
  <circle cx="${r}" cy="${r}" r="${r}" fill="url(#f)"/>
</svg>`);

  const ring = Buffer.from(`
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ff8a92"/>
      <stop offset="100%" stop-color="#ee5a65"/>
    </linearGradient>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#ee5a65" flood-opacity="0.55"/>
    </filter>
  </defs>
  <circle cx="${r}" cy="${r}" r="${r - 5}" fill="none" stroke="url(#g)" stroke-width="3.5" filter="url(#glow)"/>
</svg>`);

  const cut = await sharp(resized)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: cut, left: 0, top: 0 },
      { input: ring, left: 0, top: 0 },
    ])
    .png()
    .toBuffer();
}

const faceCut = await cutNavy(faceSrc);
const faceSize = Math.round(W * 0.34);
const faceBadge = await circularSoftMask(faceCut, faceSize);

const labelW = Math.round(faceSize * 0.92);
const labelH = 44;
const labelSvg = Buffer.from(`
<svg width="${labelW}" height="${labelH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="s" x="-10%" y="-20%" width="120%" height="160%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect x="0" y="4" width="${labelW}" height="36" rx="18" fill="#121c2c" fill-opacity="0.82" filter="url(#s)"/>
  <rect x="0.5" y="4.5" width="${labelW - 1}" height="35" rx="17.5" fill="none" stroke="#ee5a65" stroke-opacity="0.55"/>
  <text x="${labelW / 2}" y="28" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" fill="#ffffff">Face rPPG · pulse scan</text>
</svg>`);

// Cover old footer text area with matching red wave + new copy
const footerSvg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 ${H - 168} C 220 ${H - 225}, 520 ${H - 125}, ${W} ${H - 190} L ${W} ${H} L 0 ${H} Z" fill="#ee5a65"/>
  <text x="${W / 2}" y="${H - 72}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="800" fill="#ffffff">Finger PPG · Face rPPG · No wearable</text>
</svg>`);

const faceLeft = Math.round(W * 0.04);
const faceTop = Math.round(H * 0.22);
const labelLeft = faceLeft + Math.round((faceSize - labelW) / 2);
const labelTop = faceTop + faceSize - 10;

const composed = await sharp(baseSrc)
  .composite([
    { input: footerSvg, left: 0, top: 0 },
    { input: faceBadge, left: faceLeft, top: faceTop },
    { input: labelSvg, left: labelLeft, top: labelTop },
  ])
  .jpeg({ quality: 91, mozjpeg: true })
  .toBuffer();

await sharp(composed).toFile(outLive);
await sharp(composed).toFile(outArchive);

console.log("OK", {
  outLive,
  outArchive,
  size: fs.statSync(outLive).size,
  faceSize,
  faceLeft,
  faceTop,
});
