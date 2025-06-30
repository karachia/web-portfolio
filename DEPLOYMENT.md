# Deployment Guide - GitHub Pages

This guide will help you deploy your SvelteKit portfolio to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Your project pushed to a GitHub repository
3. Node.js and npm installed locally

## Setup Steps

### 1. Repository Setup

1. Create a new repository on GitHub (if you haven't already)
2. Push your code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "GitHub Actions"
5. This will use the workflow we created in `.github/workflows/deploy.yml`

### 3. Automatic Deployment

Once you push to the `main` branch, GitHub Actions will automatically:
1. Build your SvelteKit project
2. Deploy it to GitHub Pages
3. Make it available at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

## Manual Build (Optional)

If you want to test the build locally:

```bash
# Install dependencies
npm install

# Build for production
npm run build:static

# Preview the build locally
npm run preview
```

The built files will be in the `build/` directory.

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file in the `static/` directory with your domain name
2. Configure your domain's DNS settings to point to GitHub Pages
3. In your repository settings, add your custom domain under Pages settings

## Troubleshooting

### Build Issues
- Make sure all dependencies are installed: `npm install`
- Check that the static adapter is properly configured in `svelte.config.js`
- Verify the GitHub Actions workflow file exists at `.github/workflows/deploy.yml`

### Deployment Issues
- Check the "Actions" tab in your GitHub repository for build logs
- Ensure GitHub Pages is enabled in repository settings
- Verify the repository is public (or you have GitHub Pro for private repos)

### 404 Errors
- The static adapter creates a `404.html` file for client-side routing
- Make sure your SvelteKit routes are properly configured for static export

## File Structure After Build

```
build/
├── 404.html          # Fallback page for client-side routing
├── _app/             # SvelteKit app files
├── assets/           # Static assets
├── data/             # JSON data files
├── robots.txt        # SEO file
└── sitemap.xml       # SEO file
```

## Next Steps

After deployment:
1. Test all pages and functionality
2. Check mobile responsiveness
3. Verify all links work correctly
4. Test contact form (if using a backend service)
5. Optimize images and assets if needed

Your site will be automatically updated whenever you push changes to the `main` branch! 