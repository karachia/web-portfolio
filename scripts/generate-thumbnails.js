import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../static/assets/art');
const outputDir = path.join(inputDir, 'thumbnails');
const maxDim = 400;

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const files = fs.readdirSync(inputDir).filter(f =>
  /\.(jpe?g|png)$/i.test(f) && !fs.existsSync(path.join(outputDir, f))
);

(async () => {
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    try {
      await sharp(inputPath)
        .resize({ width: maxDim, height: maxDim, fit: 'inside', withoutEnlargement: true })
        .toFile(outputPath);
      console.log(`Created thumbnail: ${outputPath}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
})(); 