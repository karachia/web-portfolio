import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the music data
const musicData = JSON.parse(fs.readFileSync(path.join(__dirname, '../static/data/music.json'), 'utf8'));

// Base URLs
const baseUrl = 'https://sinakarachiani.com';
const staticPages = [
  '',
  '/about',
  '/art', 
  '/contact',
  '/media',
  '/music'
];

// Generate sitemap XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

// Add static pages
staticPages.forEach(page => {
  sitemap += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
});

// Add music piece pages
musicData.forEach(music => {
  sitemap += `
  <url>
    <loc>${baseUrl}/music/${music.id}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
});

sitemap += `
</urlset>`;

// Write the sitemap
fs.writeFileSync(path.join(__dirname, '../static/sitemap.xml'), sitemap);
console.log('Sitemap generated successfully!'); 