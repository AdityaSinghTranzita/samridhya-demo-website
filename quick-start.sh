#!/bin/bash

# Quick Start Script for Firebase Functions API
echo "🚀 Quick Start: Firebase Functions API Setup"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Step 1: Install dependencies
print_status "Installing Firebase Functions dependencies..."
cd functions
npm install

# Step 2: Build functions
print_status "Building Firebase Functions..."
npm run build

if [ ! -d "lib" ]; then
    print_warning "Build failed. Please check for TypeScript errors."
    exit 1
fi

print_success "Functions built successfully!"

# Step 3: Go back to project root
cd ..

# Step 4: Kill any existing emulator processes
print_status "Stopping any existing emulator processes..."
pkill -f firebase 2>/dev/null || true
sleep 2

# Step 5: Start emulators
print_status "Starting Firebase emulators..."
firebase emulators:start --only functions,firestore &
EMULATOR_PID=$!

# Wait for emulators to start
print_status "Waiting for emulators to start..."
sleep 15

# Step 6: Test the API
print_status "Testing API endpoints..."

# Test health check
echo ""
print_status "Testing Health Check..."
curl -s -X GET "http://127.0.0.1:5001/samridhya-website/us-central1/healthCheck" | jq '.' 2>/dev/null || curl -s -X GET "http://127.0.0.1:5001/samridhya-website/us-central1/healthCheck"

# Test get categories
echo ""
print_status "Testing Get Categories..."
curl -s -X GET "http://127.0.0.1:5001/samridhya-website/us-central1/getCategories" | jq '.' 2>/dev/null || curl -s -X GET "http://127.0.0.1:5001/samridhya-website/us-central1/getCategories"

# Test get blog posts
echo ""
print_status "Testing Get Blog Posts..."
curl -s -X GET "http://127.0.0.1:5001/samridhya-website/us-central1/getBlogPosts" | jq '.' 2>/dev/null || curl -s -X GET "http://127.0.0.1:5001/samridhya-website/us-central1/getBlogPosts"

echo ""
print_success "Quick start completed!"
echo ""
print_status "Your API is now running at:"
echo "  http://127.0.0.1:5001/samridhya-website/us-central1/"
echo ""
print_status "Available endpoints:"
echo "  - GET  /healthCheck"
echo "  - GET  /getBlogPosts"
echo "  - POST /createBlogPost"
echo "  - GET  /getCategories"
echo "  - GET  /getTags"
echo ""
print_status "Emulator UI:"
echo "  http://127.0.0.1:4000/"
echo ""
print_status "To stop the emulators, press Ctrl+C"
echo ""

# Keep the script running
wait $EMULATOR_PID 