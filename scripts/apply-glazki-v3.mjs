import sharp from "sharp";
import fs from "fs";

const src = "public/brand/generated/hero-promo-v3.jpg";
const meta = await sharp(src).metadata();
const W = meta.width;
const H = meta.height;

const dots = [
  // left bottom, above coral footer
  [70, H - 210, 4.2, 0.55],
  [110, H - 175, 2.8, 0.4],
  [48, H - 155, 2.2, 0.35],
  [135, H - 225, 1.8, 0.28],
  [88, H - 140, 1.6, 0.25],
  [155, H - 190, 2.0, 0.3],
  // right bottom
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

await sharp(src)
  .composite([{ input: overlay, blend: "over" }])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile("public/brand/hero-promo.jpg");

await sharp("public/brand/hero-promo.jpg")
  .jpeg({ quality: 90 })
  .toFile("public/brand/generated/hero-promo-v3-glazki.jpg");

console.log("hero-promo.jpg", W, "x", H, fs.statSync("public/brand/hero-promo.jpg").size);
