#!/bin/bash

echo "🧪 Testing build locally..."

# Build the project
echo "🔨 Building project..."
npm run build

# Copy 404.html for client-side routing
echo "📄 Setting up routing..."
cp public/404.html out/404.html

# Start a simple HTTP server to test the build
echo "🚀 Starting local server..."
echo "📱 Your site is now available at: http://localhost:8000"
echo "🔄 Press Ctrl+C to stop the server"

cd out && python3 -m http.server 8000 