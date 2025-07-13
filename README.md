# Web Portfolio - SvelteKit + Tailwind CSS

My modern, responsive portfolio website built with SvelteKit and Tailwind CSS, featuring music, art, and personal branding.

## Features

- 🎵 **Music Catalog** - Browse and filter my musical compositions
- 🎨 **Art Gallery** - View my artwork with modal lightbox
- 📱 **Media Page** - Recordings and video content with embedded players
- 📞 **Contact Forms** - Commission requests, score requests, and performance notices
- 🎯 **Responsive Design** - Optimized for all devices
- ⚡ **Fast Performance** - Static site generation with SvelteKit

## Tech Stack

- **Framework**: SvelteKit
- **Styling**: Tailwind CSS
- **Icons**: Svelte Awesome
- **Deployment**: GitHub Pages (Static)

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd web-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
npm run dev -- --open
```

### Building

```bash
# Build for production
npm run build

# Build for static deployment
npm run build:static

# Preview production build
npm run preview
```

## Deployment

This project is configured for deployment to GitHub Pages. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Quick Deploy

```bash
# Run the deployment script
./scripts/deploy.sh

# Or manually build and deploy
npm run build:static
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable Svelte components
│   ├── utils/         # Utility functions
│   └── Navbar.svelte  # Navigation component
├── routes/            # SvelteKit pages
│   ├── about/         # About page
│   ├── art/           # Art gallery
│   ├── contact/       # Contact forms
│   ├── explore/       # Explore page
│   ├── media/         # Media content
│   └── music/         # Music catalog
└── app.html          # HTML template

static/
├── assets/           # Images, icons, and media files
└── data/            # JSON data files (music.json, art.json)
```

## Customization

### Adding Music Pieces

Edit `static/data/music.json` to add new musical compositions:

```json
{
  "id": "unique-id",
  "title": "Piece Title",
  "category": "chamber",
  "duration": 5,
  "description": "Description...",
  "coverImage": "path/to/image.png"
}
```

### Adding Artwork

Edit `static/data/art.json` to add new artwork:

```json
{
  "id": "unique-id",
  "title": "Artwork Title",
  "description": "Description...",
  "image": "path/to/image.png",
  "thumbnail": "path/to/thumbnail.png"
}
```

## Other
###sitemap generation:
```bash
npm run generate-sitemap 
```


## License

This project is open source and available under the [MIT License](LICENSE).
