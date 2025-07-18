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

# Create config.local.ts if it doesn't exist
if [ ! -f "config.local.ts" ]; then
    echo "Creating configuration file..."
    read -p "Enter LM Studio base URL [default: http://localhost:1234]: " LMSTUDIO_URL
    LMSTUDIO_URL=${LMSTUDIO_URL:-http://localhost:1234}
    
    cat > config.local.ts << EOF
// Personal LM Studio config. This file is gitignored and should NOT be committed.
// Copy of config.example.ts - edit your settings below.

interface AppConfig {
  lmStudio: {
    baseUrl: string;
    model?: string;
    timeout?: number;
  };
}

export const config: AppConfig = {
  lmStudio: {
    baseUrl: '$LMSTUDIO_URL',
    model: '', // Optionally specify model name
    timeout: 30000, // 30 seconds timeout
  },
};
EOF
    echo "Configuration file created."
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