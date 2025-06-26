import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const artJsonPath = path.join(__dirname, '../static/data/art.json');
const thumbnailsDir = path.join(__dirname, '../static/assets/art/thumbnails');

const artData = JSON.parse(fs.readFileSync(artJsonPath, 'utf-8'));

let updated = false;

for (const entry of artData) {
  if (!entry.thumbnail) {
    const imageFile = path.basename(entry.image);
    const thumbPath = path.join(thumbnailsDir, imageFile);
    if (fs.existsSync(thumbPath)) {
      entry.thumbnail = `/assets/art/thumbnails/${imageFile}`;
      updated = true;
      console.log(`Added thumbnail for ${entry.id}: ${entry.thumbnail}`);
    } else {
      console.warn(`Thumbnail not found for ${entry.id}: ${thumbPath}`);
    }
  }
}

if (updated) {
  fs.writeFileSync(artJsonPath, JSON.stringify(artData, null, 2));
  console.log('art.json updated with thumbnail fields.');
} else {
  console.log('No updates made to art.json.');
} 