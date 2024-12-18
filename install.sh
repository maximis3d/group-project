#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Print each command before executing it (for debugging, optional)
# set -x

# Check if Node.js and npm are installed
echo "Checking for Node.js and npm..."
if ! command -v node &> /dev/null; then
  echo "Node.js is not installed. Please install Node.js and try again."
  exit 1
fi

if ! command -v npm &> /dev/null; then
  echo "npm is not installed. Please install npm and try again."
  exit 1
fi

# Install all dependencies
echo "Installing dependencies..."
npm install

# Check if the concurrently package is installed globally
if ! npm list -g concurrently &> /dev/null; then
  echo "Installing 'concurrently' globally..."
  npm install -g concurrently
else
  echo "'concurrently' is already installed globally."
fi

# Run the dev script to verify everything works
echo "Starting the development environment..."
npm run dev

echo "Setup complete! You can now use 'npm run dev' to start the development server."