import sharp from "sharp";
import fs from "fs";
import path from "path";

const dir = "public/brand/generated";
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".png"));

for (const f of files) {
  const inP = path.join(dir, f);
  const tmp = path.join(dir, `_${f}.tmp.jpg`);
  const outP = path.join(dir, f.replace(/\.png$/i, ".jpg"));
  await sharp(inP).jpeg({ quality: 86, mozjpeg: true }).toFile(tmp);
  fs.renameSync(tmp, outP);
  fs.unlinkSync(inP);
  console.log("archived", path.basename(outP), fs.statSync(outP).size);
}

// Fuller PPG peek from mirrored back — more phone visible, for behind main
const srcPng =
  "C:/Users/admin_test/.cursor/projects/d-cardiom-lp-website/assets/iphone-back-hand.png";
const flipped = await sharp(srcPng)
  .resize(720, null)
  .flop()
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const d = flipped.data;
for (let i = 0; i < d.length; i += 4) {
  const r = d[i];
  const g = d[i + 1];
  const b = d[i + 2];
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (luma < 48 && b >= r - 10 && b < 72) d[i + 3] = 0;
}

const cut = await sharp(d, {
  raw: {
    width: flipped.info.width,
    height: flipped.info.height,
    channels: 4,
  },
})
  .png()
  .toBuffer();

const cm = await sharp(cut).metadata();
const vw = Math.round(cm.width * 0.72); // show most of phone
const peekRaw = await sharp(cut)
  .extract({
    left: cm.width - vw,
    top: Math.round(cm.height * 0.04),
    width: vw,
    height: Math.round(cm.height * 0.88),
  })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

// mild left fade only
for (let y = 0; y < peekRaw.info.height; y++) {
  for (let x = 0; x < peekRaw.info.width; x++) {
    const i = (y * peekRaw.info.width + x) * 4;
    const f = x < 28 ? x / 28 : 1;
    peekRaw.data[i + 3] = Math.round(peekRaw.data[i + 3] * f);
  }
}

await sharp(peekRaw.data, {
  raw: {
    width: peekRaw.info.width,
    height: peekRaw.info.height,
    channels: 4,
  },
})
  .png()
  .toFile("public/brand/ppg-peek.png");

console.log("ppg-peek", fs.statSync("public/brand/ppg-peek.png").size);
