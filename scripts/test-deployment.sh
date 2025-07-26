#!/bin/bash

# 🚀 Local Deployment Test Script
# This script mimics the GitHub Actions workflow locally

echo "🎯 Starting local deployment test..."
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print status
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

# Check if yarn is installed
if ! command -v yarn &> /dev/null; then
    print_error "Yarn is not installed. Please install it first."
    exit 1
fi

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf .next out

# Install dependencies
print_status "Installing dependencies..."
if yarn install --frozen-lockfile; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Build the project
print_status "Building Next.js project..."
if yarn build; then
    print_success "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# Check if out directory was created
if [ -d "out" ]; then
    print_success "Static export generated in 'out' directory"
    
    # Show build statistics
    echo ""
    print_status "Build Statistics:"
    echo "📁 Total files: $(find out -type f | wc -l)"
    echo "📊 Directory size: $(du -sh out | cut -f1)"
    echo "🗂️ Main files:"
    ls -la out/ | head -10
    
    # Test if index.html exists
    if [ -f "out/index.html" ]; then
        print_success "index.html found - static export is valid"
    else
        print_warning "index.html not found - this might be an issue"
    fi
    
    # Optional: Start a local server to test
    echo ""
    read -p "🌐 Would you like to start a local server to test the static site? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Starting local server on http://localhost:8080"
        print_status "Press Ctrl+C to stop the server"
        
        if command -v python3 &> /dev/null; then
            cd out && python3 -m http.server 8080
        elif command -v python &> /dev/null; then
            cd out && python -m SimpleHTTPServer 8080
        elif command -v node &> /dev/null; then
            npx serve out -p 8080
        else
            print_warning "No suitable server found. Please install Python or Node.js"
        fi
    fi
    
else
    print_error "Static export failed - 'out' directory not created"
    exit 1
fi

echo ""
print_success "🎉 Local deployment test completed successfully!"
print_status "The static site is ready for deployment"
echo "=================================="
