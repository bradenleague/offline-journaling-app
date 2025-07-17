# Offline Journaling App

A beautiful, offline-first journaling application built with React, TypeScript, and Tailwind CSS. Write your thoughts freely and format them into structured field journal entries using AI.

## Features

- **Offline-First**: Works completely offline, no internet required
- **Auto-Save**: Your journal entries are automatically saved to local storage
- **AI Formatting**: Transform raw journal entries into structured field journal format
- **Dark/Light Theme**: Supports both light and dark themes
- **Export**: Copy to clipboard or download your formatted entries as Markdown
- **Editable Output**: Edit the AI-formatted output to your liking

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

#### Option 1: Quick Start (Recommended)
Use the provided script to automatically build and serve the production version:

```bash
./start-app.sh
```

This script will:
- Install dependencies if needed
- Build the project for production
- Start the server
- Open your browser automatically

The app will be available at `http://localhost:4173`

#### Option 2: Development Mode
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How to Use

1. **Write Your Journal**: Start typing in the left panel. Your text is automatically saved to local storage.

2. **Format with AI**: Click the "Format with AI" button to transform your raw journal entry into a structured format with sections for:
   - Location
   - Weather
   - Observations
   - Reflections

3. **Edit and Export**: You can edit the formatted output directly, copy it to clipboard, or download it as a Markdown file.

4. **Clear**: Use the "Clear" button to start fresh.

## Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications

## Project Structure

```
├── components/
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── JournalInput.tsx # Left panel - raw journal input
│   └── FormattedOutput.tsx # Right panel - formatted output
├── styles/
│   └── globals.css      # Global styles and CSS variables
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.html         # HTML template
```

## Customization

### Themes
The app supports both light and dark themes. The theme variables are defined in `styles/globals.css` and can be customized to match your preferences.

### AI Formatting
The AI formatting logic is currently a mock implementation in `App.tsx`. You can replace the `formatJournalEntry` function with actual AI integration (like OpenAI API, local LLM, etc.).

## Contributing

This project was generated from a Figma design and is ready for further development. Feel free to:

- Add real AI integration
- Implement additional export formats
- Add more journal templates
- Enhance the UI/UX
- Add data persistence beyond localStorage

## License

This project includes components from [shadcn/ui](https://ui.shadcn.com/) used under [MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md). 