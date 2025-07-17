
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
start /b npm run serve

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
echo. & echo Script finished. Review the log file for details: %LOGFILE%
pause
)
>> "%LOGFILE%" 2>&1