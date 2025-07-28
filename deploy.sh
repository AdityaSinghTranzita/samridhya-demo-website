#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting deployment process..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf out
rm -rf .next

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Copy 404.html to out directory for client-side routing
echo "📄 Setting up client-side routing..."
cp public/404.html out/404.html

# Deploy to Firebase
echo "🚀 Deploying to Firebase..."
firebase deploy --only hosting

echo "✅ Deployment completed successfully!"
echo "🌐 Your site should be live at: https://your-project-id.web.app" 