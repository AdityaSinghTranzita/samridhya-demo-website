#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting Firebase hosting deployment process..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf out
rm -rf .next

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project for Firebase hosting
echo "🔨 Building the project for Firebase hosting..."
npm run build:firebase

# Verify build output
echo "✅ Verifying build output..."
if [ ! -d "out" ]; then
    echo "❌ Build failed: 'out' directory not found"
    exit 1
fi

if [ ! -f "out/index.html" ]; then
    echo "❌ Build failed: 'out/index.html' not found"
    exit 1
fi

echo "✅ Build verification passed"

# Deploy to Firebase
echo "🚀 Deploying to Firebase hosting..."
firebase deploy --only hosting

echo "✅ Deployment completed successfully!"
echo "🌐 Your site should be live at: https://samridhya-v2.web.app"
echo "📊 Check Firebase console for deployment details" 