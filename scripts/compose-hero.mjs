import sharp from "sharp";
import fs from "fs";

const W = 900;
const H = 1600;

const backSrc = "public/brand/_iphone-back.png";
const dashSrc = "public/brand/app-dashboard.jpg";
const outJpg = "public/brand/hero-promo.jpg";

// Mirror the rear phone + hand, then crop so only part peeks from the left
const mirroredFull = await sharp(backSrc)
  .resize(560, null, { fit: "inside" })
  .flop()
  .png()
  .toBuffer();

const mirroredMeta = await sharp(mirroredFull).metadata();
const fullBackW = mirroredMeta.width ?? 520;
const fullBackH = mirroredMeta.height ?? 780;

// Keep ~42% of phone width visible (mostly off-canvas on the left)
const visibleBackW = Math.round(fullBackW * 0.42);
const cropLeft = fullBackW - visibleBackW;
const mirroredBack = await sharp(mirroredFull)
  .extract({
    left: cropLeft,
    top: 0,
    width: visibleBackW,
    height: fullBackH,
  })
  .png()
  .toBuffer();

// Front phone: dashboard inside rounded device frame — a bit larger, more centered
const screenW = 360;
const screenH = Math.round(screenW * (1740 / 860));
const bezel = 14;
const phoneW = screenW + bezel * 2;
const phoneH = screenH + bezel * 2 + 18;
const radius = 48;

const screen = await sharp(dashSrc)
  .resize(screenW, screenH, { fit: "cover" })
  .jpeg({ quality: 90 })
  .toBuffer();

const frontPhoneSvg = `
<svg width="${phoneW}" height="${phoneH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2a2a2c"/>
      <stop offset="100%" stop-color="#111113"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${phoneW}" height="${phoneH}" rx="${radius}" ry="${radius}" fill="url(#g)"/>
  <rect x="${bezel}" y="${bezel + 8}" width="${screenW}" height="${screenH}" rx="36" ry="36" fill="#000"/>
</svg>`;

const frontPhone = await sharp(Buffer.from(frontPhoneSvg))
  .composite([
    {
      input: await sharp(screen)
        .resize(screenW, screenH)
        .composite([
          {
            input: Buffer.from(
              `<svg width="${screenW}" height="${screenH}"><rect width="100%" height="100%" rx="34" ry="34" fill="white"/></svg>`,
            ),
            blend: "dest-in",
          },
        ])
        .png()
        .toBuffer(),
      left: bezel,
      top: bezel + 8,
    },
  ])
  .png()
  .toBuffer();

const overlaySvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="#0a1628"/>
      <stop offset="55%" stop-color="#122844"/>
      <stop offset="100%" stop-color="#0d2135"/>
    </linearGradient>
    <radialGradient id="glow1" cx="70%" cy="35%" r="45%">
      <stop offset="0%" stop-color="#378fca" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#378fca" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="20%" cy="70%" r="40%">
      <stop offset="0%" stop-color="#ee5a65" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#ee5a65" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#glow1)"/>
  <rect width="100%" height="100%" fill="url(#glow2)"/>
  <circle cx="160" cy="420" r="3" fill="#fff" opacity="0.35"/>
  <circle cx="720" cy="280" r="2.5" fill="#fff" opacity="0.25"/>
  <circle cx="640" cy="980" r="2" fill="#fff" opacity="0.3"/>
  <circle cx="220" cy="1100" r="2.2" fill="#fff" opacity="0.22"/>
  <!-- bottom side glazki -->
  <circle cx="72" cy="1280" r="3.2" fill="#fff" opacity="0.42"/>
  <circle cx="118" cy="1348" r="2.4" fill="#fff" opacity="0.32"/>
  <circle cx="54" cy="1395" r="2" fill="#fff" opacity="0.28"/>
  <circle cx="828" cy="1265" r="3" fill="#fff" opacity="0.4"/>
  <circle cx="792" cy="1335" r="2.2" fill="#fff" opacity="0.3"/>
  <circle cx="858" cy="1388" r="2.6" fill="#fff" opacity="0.34"/>
  <circle cx="760" cy="1410" r="1.8" fill="#fff" opacity="0.24"/>
  <text x="56" y="120" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="700" fill="#ffffff">See your</text>
  <text x="56" y="178" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="800" fill="#ee5a65">Heart Pattern</text>
  <path d="M0 ${H - 168} C 180 ${H - 210}, 420 ${H - 130}, 900 ${H - 180} L 900 ${H} L 0 ${H} Z" fill="#ee5a65"/>
  <text x="450" y="${H - 72}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#ffffff">Camera PPG · No wearable needed</text>
</svg>`;

// Peek from left edge (partially off-canvas); front phone near center
const backLeft = -28;
const backTop = 320;
const frontLeft = Math.round((W - phoneW) / 2) + 12;
const frontTop = 195;

await sharp(Buffer.from(overlaySvg))
  .composite([
    { input: mirroredBack, left: backLeft, top: backTop },
    { input: frontPhone, left: frontLeft, top: frontTop },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(outJpg);

console.log(
  "wrote",
  outJpg,
  fs.statSync(outJpg).size,
  "visibleBack",
  visibleBackW,
  "frontLeft",
  frontLeft,
);
