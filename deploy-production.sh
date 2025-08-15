#!/bin/bash

# Production Deployment Script for Firebase Functions
echo "🚀 Production Deployment: Firebase Functions API"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
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

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "firebase.json" ]; then
    print_error "firebase.json not found. Please run this script from the project root."
    exit 1
fi

# Step 1: Install dependencies
print_status "Installing Firebase Functions dependencies..."
cd functions
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi

# Step 2: Run linting
print_status "Running ESLint..."
npm run lint

if [ $? -ne 0 ]; then
    print_warning "Linting issues found. Continuing with deployment..."
fi

# Step 3: Build functions
print_status "Building Firebase Functions..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Build failed. Please fix TypeScript errors before deploying."
    exit 1
fi

# Check if build was successful
if [ ! -d "lib" ]; then
    print_error "Build failed. lib directory not found."
    exit 1
fi

print_success "Functions built successfully!"

# Step 4: Go back to project root
cd ..

# Step 5: Check Firebase project
print_status "Checking Firebase project configuration..."
firebase projects:list

# Step 6: Deploy to production
print_status "Deploying to production..."
firebase deploy --only functions

if [ $? -ne 0 ]; then
    print_error "Deployment failed!"
    exit 1
fi

print_success "Deployment completed successfully!"

# Step 7: Get deployment info
print_status "Getting deployment information..."
firebase functions:list

# Step 8: Show next steps
echo ""
print_success "🎉 Production deployment completed!"
echo ""
print_status "Next steps:"
echo "1. Update your production environment variables:"
echo "   NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=[YOUR_PRODUCTION_API_URL]"
echo ""
echo "2. Test the API:"
echo "   curl [YOUR_PRODUCTION_API_URL]/healthCheck"
echo ""
echo "3. Monitor your functions:"
echo "   firebase functions:log"
echo ""
echo "4. Set up monitoring and alerts in Firebase Console"
echo ""
print_status "Your production API is now live! 🚀" 