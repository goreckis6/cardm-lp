import sharp from "sharp";
import fs from "fs";

const basePath = "public/brand/generated/hero-promo-v3.jpg";
const screenPath = "public/brand/generated/app-measurement.png";

const W = 1024;
const H = 1536;

// Tuned to fully cover the right iPhone glass
const minX = 498;
const minY = 285;
const sw = 370;
const sh = 790;
const radius = 46;

const screenBuf = await sharp(screenPath)
  .resize(sw, sh, { fit: "fill" })
  .composite([
    {
      input: Buffer.from(
        `<svg width="${sw}" height="${sh}"><rect width="100%" height="100%" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`,
      ),
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();

const dots = [
  [70, H - 210, 4.2, 0.55],
  [110, H - 175, 2.8, 0.4],
  [48, H - 155, 2.2, 0.35],
  [135, H - 225, 1.8, 0.28],
  [88, H - 140, 1.6, 0.25],
  [155, H - 190, 2.0, 0.3],
  [W - 70, H - 205, 4.0, 0.52],
  [W - 115, H - 170, 2.6, 0.38],
  [W - 45, H - 150, 2.4, 0.34],
  [W - 140, H - 230, 1.9, 0.28],
  [W - 95, H - 135, 1.7, 0.26],
  [W - 160, H - 185, 2.1, 0.3],
];
const circles = dots
  .map(
    ([cx, cy, r, o]) =>
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" opacity="${o}"/>`,
  )
  .join("");
const overlay = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${circles}</svg>`,
);

await sharp(basePath)
  .composite([
    { input: screenBuf, left: minX, top: minY },
    { input: overlay, blend: "over" },
  ])
  .jpeg({ quality: 91, mozjpeg: true })
  .toFile("public/brand/hero-promo.jpg");

for (const out of [
  "public/brand/generated/hero-promo-v3-measurement.jpg",
  "public/brand/generated/hero-promo-v3-glazki.jpg",
]) {
  await sharp("public/brand/hero-promo.jpg").toFile(out);
}

console.log("ok", { minX, minY, sw, sh }, fs.statSync("public/brand/hero-promo.jpg").size);
