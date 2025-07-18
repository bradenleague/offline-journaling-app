
@echo off
setlocal enabledelayedexpansion
set LOGFILE=%~dp0app-log.txt
REM Start logging
(

REM Change to the script's directory
cd /d "%~dp0"

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: npm is not installed. Please install Node.js and npm first.
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install dependencies.
        pause
        exit /b 1
    )
)

REM Create config.local.ts if it doesn't exist
if not exist "config.local.ts" (
    echo Creating configuration file...
    set /p LMSTUDIO_URL="Enter LM Studio base URL [default: http://localhost:1234]: "
    if "!LMSTUDIO_URL!"=="" set LMSTUDIO_URL=http://localhost:1234
    (
        echo interface AppConfig {
        echo   lmStudio: {
        echo     baseUrl: string;
        echo     model?: string;
        echo     timeout?: number;
        echo   };
        echo }
        echo.
        echo export const config: AppConfig = {
        echo   lmStudio: {
        echo     baseUrl: '!LMSTUDIO_URL!',
        echo     model: '', // Leave empty to use the loaded model, or specify exact model name
        echo     timeout: 30000, // 30 seconds timeout
        echo   },
        echo };
    ) > config.local.ts
    echo Configuration file created.
)

REM Build the app
echo Building the app...
npm run build
if %errorlevel% neq 0 (
    echo Error: Failed to build the app.
    pause
    exit /b 1
)

REM Start the production server
echo Starting the server...
start npm run serve

REM Wait for the server to start
timeout /t 2 /nobreak >nul

REM Open the default browser
echo Opening browser...
start http://localhost:4173

REM Print usage instructions
echo.
echo Your journal app is now running!
echo You can access it anytime at: http://localhost:4173
echo.
echo To stop the server, close this window or press Ctrl+C
echo.

REM Keep the window open
echo. & echo Script finished.
pause
)
>> "%LOGFILE%" 2>&1