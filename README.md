# Offline Journaling App

A beautiful, offline-first journaling application built with React, TypeScript, and Tailwind CSS. Write your thoughts freely and format them into structured field journal entries using AI.

## 🌟 Key Features

- **Offline-First**: Works completely offline, no internet required
- **Auto-Save**: Your journal entries are automatically saved to local storage
- **AI Formatting**: Transform raw journal entries into structured field journal format
- **Dark/Light Theme**: Supports both light and dark themes
- **Export Options**: Copy to clipboard or download your formatted entries as Markdown
- **Editable Output**: Edit the AI-formatted output to your liking

## 🚀 Quick Start Guide

1. **Prerequisites**
   - Node.js (version 18 or higher)
   - npm or yarn
   - LM Studio (for AI formatting feature)

2. **LM Studio Setup**
   - Follow the setup guide in `LM_STUDIO_SETUP.md` to:
     - Install and configure LM Studio
     - Set up CORS settings
     - Configure the app connection

3. **Installation**
   ```bash
   # Clone repository
   git clone https://github.com/bradenleague/offline-journaling-app.git
   
   # Navigate to project directory
   cd offline-journaling-app
   
   # Install dependencies
   npm install
   ```

3. **Launch the App**

   **Windows Users:**
   ```bat
   start-app.bat
   ```

   **Other Platforms:**
   ```bash
   ./start-app.sh
   ```

   This will:
   - Install dependencies if needed
   - Build the project
   - Start the server
   - Open your browser automatically

## 💻 Development

### Running the Application

#### Option 1: Quick Start (Recommended)
Use the provided script:

```bash
./start-app.sh  # Linux/Mac
# or
start-app.bat   # Windows
```

#### Option 2: Development Mode
```bash
npm run dev
```
Then open `http://localhost:3000` in your browser.

### Building for Production
```bash
npm run build
```
Built files will be in the `dist` directory.

## 📝 User Guide

1. **Writing**: Type your thoughts in the left panel (auto-saves to local storage)
2. **Formatting**: Click "Format with AI" to structure your entry with:
   - Location
   - Weather
   - Observations
   - Reflections
3. **Editing**: Modify the formatted output as needed
4. **Exporting**: Copy to clipboard or download as Markdown
5. **Starting Over**: Click "Clear" for a fresh entry

## 🛠️ Technical Details

### Technology Stack
- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **UI Components**: Lucide React (icons), Sonner (toasts)
- **AI Integration**: LM Studio (local LLM server)

### AI Configuration
- See `LM_STUDIO_SETUP.md` for detailed setup instructions
- Uses OpenAI-compatible API endpoints
- Configurable through `config.local.ts`
- Real-time connection status indicator

### Project Structure
```
├── components/
│   ├── ui/              # UI components (shadcn/ui)
│   ├── JournalInput     # Journal input panel
│   └── FormattedOutput  # Formatted output panel
├── styles/              # Global styles
└── [App files]         # Main app components
```

### Customization Options

#### Theming
- Light/dark theme support
- Theme variables in `styles/globals.css`
- Fully customizable to match your brand

## 📄 License

Uses [shadcn/ui](https://ui.shadcn.com/) under [MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md) 