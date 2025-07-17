#!/bin/bash

# Change to the script's directory
cd "$(dirname "$0")"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build the app
echo "Building the app..."
npm run build

# Start the production server
echo "Starting the server..."
npm run serve &

# Store the process ID
SERVER_PID=$!

# Wait for the server to start (adjust sleep time if needed)
sleep 2

# Open the default browser
echo "Opening browser..."
open http://localhost:4173

# Print usage instructions
echo "Your journal app is now running!"
echo "You can access it anytime at: http://localhost:4173"
echo "Press Ctrl+C to stop the server..."

# Wait for user input to stop the server
wait $SERVER_PID 