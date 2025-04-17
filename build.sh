#!/bin/bash
# Simple build script for Netlify deployment

# Clear any previous build artifacts
rm -rf dist

# Install dependencies with legacy peer deps
npm install --legacy-peer-deps

# Build the project
npm run build

echo "Build completed successfully!"
