#!/bin/bash

# Firebase Functions Deployment Script
# This script builds and deploys the Firebase Functions

set -e

echo "🚀 Starting Firebase Functions deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the correct directory
if [ ! -f "firebase.json" ]; then
    print_error "firebase.json not found. Please run this script from the project root directory."
    exit 1
fi

# Check if functions directory exists
if [ ! -d "functions" ]; then
    print_error "functions directory not found."
    exit 1
fi

# Navigate to functions directory
cd functions

print_status "Installing dependencies..."
npm install

print_status "Building TypeScript..."
npm run build

# Check if build was successful
if [ ! -d "lib" ]; then
    print_error "Build failed. lib directory not found."
    exit 1
fi

print_success "Build completed successfully!"

# Go back to project root
cd ..

print_status "Deploying Firebase Functions..."
firebase deploy --only functions

print_success "Firebase Functions deployed successfully!"
echo ""
echo "Your API endpoints are now available at:"
echo "  [YOUR_PROJECT_API_URL]"
echo ""
echo "Environment variables to set:"
echo "  NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=[YOUR_PROJECT_API_URL]"

echo ""
print_warning "Remember to update your environment variables:"
echo "  NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=[YOUR_PROJECT_API_URL]"

print_success "Deployment script completed!" 