@echo off
REM Vista HR Suite - Quick Start Script for Windows

echo.
echo ======================================
echo Vista HR Suite - Full Stack HRMS
echo ======================================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed
    pause
    exit /b 1
)

echo Node.js version:
node -v
echo npm version:
npm -v
echo.

REM Start Backend
echo Starting Backend Server...
cd backend
call npm install --legacy-peer-deps >nul 2>&1
start cmd /k npm run dev
echo Backend started on http://localhost:3001
echo.

REM Wait for backend to start
timeout /t 3 /nobreak

REM Start Frontend
echo Starting Frontend Server...
cd ..\frontend
call npm install >nul 2>&1
start cmd /k npm run dev
echo Frontend started on http://localhost:8080
echo.

echo ======================================
echo Servers started successfully!
echo ======================================
echo.
echo Frontend:  http://localhost:8080
echo Backend:   http://localhost:3001
echo API:       http://localhost:3001/api
echo.
pause
