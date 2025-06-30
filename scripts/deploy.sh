#!/bin/bash

# Deploy script for GitHub Pages
echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git repository not initialized. Please run 'git init' first."
    exit 1
fi

# Build the project
echo "📦 Building project..."
npm run build:static

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo "✅ Build completed successfully!"

# Check if build directory exists
if [ ! -d "build" ]; then
    echo "❌ Error: build directory not found after build."
    exit 1
fi

echo "📁 Build files created in 'build/' directory"
echo ""
echo "🎉 Ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Configure for GitHub Pages deployment'"
echo "   git push origin main"
echo ""
echo "2. Enable GitHub Pages in your repository settings:"
echo "   - Go to Settings > Pages"
echo "   - Select 'GitHub Actions' as source"
echo ""
echo "3. Your site will be automatically deployed to:"
echo "   https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions." 