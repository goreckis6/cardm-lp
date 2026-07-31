import sharp from "sharp";
import fs from "fs";

const baseSrc = "public/brand/generated/hero-promo-v3-base.jpg";
const faceSrc = "public/brand/generated/rppg-face-scan-green.png";
const outLive = "public/brand/hero-promo-v2.jpg";
const outArchive = "public/brand/generated/hero-promo-v3-rppg-v2.jpg";

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

/** Rounded-rect face badge with green scan frame + corner brackets */
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
  <!-- corner brackets -->
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

function chipSvg(width, height, title, subtitle, accent) {
  const rx = Math.round(height * 0.3);
  const dotR = Math.round(height * 0.12);
  const padX = Math.round(height * 0.42);
  const titleSize = Math.round(height * 0.29);
  const subSize = Math.round(height * 0.25);
  return Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="s" x="-12%" y="-25%" width="124%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000" flood-opacity="0.42"/>
    </filter>
  </defs>
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${rx}" fill="#0f1a2a" fill-opacity="0.9" filter="url(#s)"/>
  <rect x="1.5" y="1.5" width="${width - 3}" height="${height - 3}" rx="${rx - 0.5}" fill="none" stroke="${accent}" stroke-opacity="0.9" stroke-width="2"/>
  <circle cx="${padX}" cy="${height / 2}" r="${dotR}" fill="${accent}"/>
  <text x="${padX + dotR + 14}" y="${height / 2 - 6}" font-family="Arial, Helvetica, sans-serif" font-size="${titleSize}" font-weight="800" fill="#ffffff">${title}</text>
  <text x="${padX + dotR + 14}" y="${height / 2 + titleSize - 2}" font-family="Arial, Helvetica, sans-serif" font-size="${subSize}" font-weight="600" fill="#d7e6f3">${subtitle}</text>
</svg>`);
}

function orBadgeSvg(size) {
  return Buffer.from(`
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000" flood-opacity="0.35"/>
    </filter>
  </defs>
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 1}" fill="#ee5a65" filter="url(#s)"/>
  <text x="${size / 2}" y="${size / 2 + Math.round(size * 0.14)}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(size * 0.38)}" font-weight="800" fill="#ffffff">OR</text>
</svg>`);
}

const faceCut = await cutNavy(faceSrc);
const faceSize = Math.round(W * 0.28);
const faceBadge = await greenFrameBadge(faceCut, faceSize);

const faceChipW = 460;
const faceChipH = 112;
const fingerChipW = 490;
const fingerChipH = 112;
const faceChip = chipSvg(faceChipW, faceChipH, "Face rPPG", "Face measurement", GREEN);
const fingerChip = chipSvg(fingerChipW, fingerChipH, "Finger PPG", "Finger measurement", "#ee5a65");
const orBadge = orBadgeSvg(60);

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

// Cleaner red footer with larger type: bold primary + regular secondary
const footerH = 230;
const footerTop = H - footerH;
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
    M0 ${footerTop + 48}
    C ${W * 0.18} ${footerTop + 8}, ${W * 0.38} ${footerTop + 58}, ${W * 0.55} ${footerTop + 28}
    C ${W * 0.72} ${footerTop - 2}, ${W * 0.88} ${footerTop + 42}, ${W} ${footerTop + 18}
    L ${W} ${H}
    L 0 ${H}
    Z
  " fill="url(#redFoot)"/>
  <text x="${W / 2}" y="${H - 104}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="800" fill="#ffffff">Powered by PPG and rPPG Technology.</text>
  <text x="${W / 2}" y="${H - 50}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="29" font-weight="400" fill="#fff5f6">Camera pulse check - no wearable needed.</text>
</svg>`);

const faceLeft = Math.round(W * 0.03);
const faceTop = Math.round(H * 0.255);
const faceChipLeft = Math.max(8, Math.min(faceLeft, W - faceChipW - 8));
const faceChipTop = faceTop + faceSize + 6;
const orLeft = Math.max(8, faceChipLeft + Math.round(faceChipW / 2) - 30);
const orTop = faceChipTop + faceChipH + 10;
const fingerChipLeft = Math.max(8, Math.min(faceLeft, W - fingerChipW - 8));
const fingerChipTop = Math.round(H * 0.675);

const composed = await sharp(baseSrc)
  .composite([
    { input: ekgSvg, left: 0, top: 0 },
    { input: footerSvg, left: 0, top: 0 },
    { input: faceBadge, left: faceLeft, top: faceTop },
    { input: faceChip, left: faceChipLeft, top: faceChipTop },
    { input: orBadge, left: orLeft, top: orTop },
    { input: fingerChip, left: fingerChipLeft, top: fingerChipTop },
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
