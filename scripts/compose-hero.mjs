import sharp from "sharp";
import fs from "fs";

const W = 900;
const H = 1600;

const backSrc = "public/brand/_iphone-back.png";
const dashSrc = "public/brand/app-dashboard.jpg";
const outJpg = "public/brand/hero-promo.jpg";

/** Soft-edge alpha: fade left side of a cutout so it peeks without a hard box */
async function softLeftMask(pngBuffer, fadePx = 70) {
  const meta = await sharp(pngBuffer).metadata();
  const w = meta.width;
  const h = meta.height;
  const { data, info } = await sharp(pngBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      const edgeFade = x < fadePx ? x / fadePx : 1;
      data[i + 3] = Math.round(data[i + 3] * edgeFade);
    }
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

function isBg(r, g, b) {
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (luma > 48) return false;
  return b >= r - 10 && b >= g - 6 && b < 72;
}

async function removeNavyBackground(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    if (isBg(data[i], data[i + 1], data[i + 2])) data[i + 3] = 0;
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

// --- Left peek: mirrored rear phone, heavily cropped, soft edge ---
const mirroredFull = await sharp(backSrc)
  .resize(640, null, { fit: "inside" })
  .flop()
  .png()
  .toBuffer();

const cutout = await removeNavyBackground(mirroredFull);
const cutMeta = await sharp(cutout).metadata();
const fullW = cutMeta.width;
const fullH = cutMeta.height;

// Show only right ~38% (camera + finger), rest off-canvas
const visibleW = Math.round(fullW * 0.38);
const leftPeek = await softLeftMask(
  await sharp(cutout)
    .extract({
      left: fullW - visibleW,
      top: Math.round(fullH * 0.05),
      width: visibleW,
      height: Math.round(fullH * 0.9),
    })
    .png()
    .toBuffer(),
  55,
);

// --- Front phone: accurate tall frame + real dashboard ---
const frameW = 392;
const frameH = 800;
const inset = 12;
const screenW = frameW - inset * 2;
const screenH = frameH - inset * 2 - 10;
const radius = 54;
const screenRadius = 42;

const screenBuf = await sharp(dashSrc)
  .resize(screenW, screenH, { fit: "cover", position: "top" })
  .png()
  .toBuffer();

const roundedScreen = await sharp(screenBuf)
  .composite([
    {
      input: Buffer.from(
        `<svg width="${screenW}" height="${screenH}"><rect width="100%" height="100%" rx="${screenRadius}" ry="${screenRadius}" fill="#fff"/></svg>`,
      ),
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();

const frameSvg = `
<svg width="${frameW}" height="${frameH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bezel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3a3a3c"/>
      <stop offset="45%" stop-color="#1c1c1e"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
    <filter id="sh" x="-20%" y="-10%" width="140%" height="130%">
      <feDropShadow dx="0" dy="28" stdDeviation="28" flood-color="#000" flood-opacity="0.45"/>
    </filter>
  </defs>
  <rect x="0" y="0" width="${frameW}" height="${frameH}" rx="${radius}" ry="${radius}" fill="url(#bezel)" filter="url(#sh)"/>
  <rect x="3" y="3" width="${frameW - 6}" height="${frameH - 6}" rx="${radius - 3}" ry="${radius - 3}" fill="#111"/>
</svg>`;

const frontPhone = await sharp(Buffer.from(frameSvg))
  .composite([{ input: roundedScreen, left: inset, top: inset + 6 }])
  .png()
  .toBuffer();

// --- Background + type + glazki ---
const bgSvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0.2" y1="0" x2="0.8" y2="1">
      <stop offset="0%" stop-color="#081425"/>
      <stop offset="50%" stop-color="#12304a"/>
      <stop offset="100%" stop-color="#0c1f33"/>
    </linearGradient>
    <radialGradient id="g1" cx="62%" cy="32%" r="42%">
      <stop offset="0%" stop-color="#378fca" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#378fca" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="18%" cy="62%" r="36%">
      <stop offset="0%" stop-color="#ee5a65" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#ee5a65" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#g1)"/>
  <rect width="100%" height="100%" fill="url(#g2)"/>
  <circle cx="150" cy="390" r="2.5" fill="#fff" opacity="0.28"/>
  <circle cx="740" cy="300" r="2" fill="#fff" opacity="0.22"/>
  <!-- bottom side glazki -->
  <circle cx="68" cy="1240" r="3.4" fill="#fff" opacity="0.45"/>
  <circle cx="110" cy="1310" r="2.3" fill="#fff" opacity="0.32"/>
  <circle cx="48" cy="1360" r="2" fill="#fff" opacity="0.28"/>
  <circle cx="140" cy="1280" r="1.6" fill="#fff" opacity="0.22"/>
  <circle cx="840" cy="1230" r="3.2" fill="#fff" opacity="0.42"/>
  <circle cx="800" cy="1300" r="2.2" fill="#fff" opacity="0.3"/>
  <circle cx="870" cy="1355" r="2.5" fill="#fff" opacity="0.34"/>
  <circle cx="770" cy="1385" r="1.7" fill="#fff" opacity="0.24"/>
  <text x="52" y="118" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="700" fill="#ffffff">See your</text>
  <text x="52" y="174" font-family="Arial, Helvetica, sans-serif" font-size="50" font-weight="800" fill="#ee5a65">Heart Pattern</text>
  <path d="M0 ${H - 150} C 200 ${H - 200}, 480 ${H - 120}, 900 ${H - 170} L 900 ${H} L 0 ${H} Z" fill="#ee5a65"/>
  <text x="450" y="${H - 68}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="700" fill="#ffffff">Camera PPG · No wearable needed</text>
</svg>`;

const frontLeft = Math.round((W - frameW) / 2) + 10;
const frontTop = 220;
const peekLeft = -18;
const peekTop = 380;

await sharp(Buffer.from(bgSvg))
  .composite([
    { input: leftPeek, left: peekLeft, top: peekTop },
    { input: frontPhone, left: frontLeft, top: frontTop },
  ])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(outJpg);

console.log("OK", outJpg, fs.statSync(outJpg).size, {
  frontLeft,
  peekW: visibleW,
});
