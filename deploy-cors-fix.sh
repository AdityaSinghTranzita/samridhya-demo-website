#!/bin/bash

# CORS Fix Deployment Script
# This script deploys the Firebase Functions with the updated CORS configuration

echo "🚀 Deploying CORS fixes to Firebase Functions..."

# Check if we're in the right directory
if [ ! -f "firebase.json" ]; then
    echo "❌ Error: firebase.json not found. Please run this script from the samridhya-website directory."
    exit 1
fi

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Error: Firebase CLI is not installed. Please install it first:"
    echo "npm install -g firebase-tools"
    exit 1
fi

# Check if user is logged in to Firebase
if ! firebase projects:list &> /dev/null; then
    echo "❌ Error: Not logged in to Firebase. Please login first:"
    echo "firebase login"
    exit 1
fi

echo "📦 Building functions..."
cd functions

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📥 Installing dependencies..."
    npm install
fi

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build

cd ..

echo "🚀 Deploying to Firebase..."
firebase deploy --only functions

if [ $? -eq 0 ]; then
    echo "✅ CORS fixes deployed successfully!"
    echo ""
    echo "🧪 Testing CORS configuration..."
    node scripts/test-cors.js
    
    echo ""
    echo "📋 Next steps:"
    echo "1. Test your website to ensure CORS issues are resolved"
    echo "2. Check browser console for any remaining CORS errors"
    echo "3. If issues persist, check Firebase Function logs:"
    echo "   firebase functions:log --only api"
else
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi 