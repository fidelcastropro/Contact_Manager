@echo off
echo Starting Contact Manager Application...
echo.

echo Starting Backend Server...
start "Backend" cmd /k "cd /d %~dp0 && npm run dev"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend...
start "Frontend" cmd /k "cd /d %~dp0\frontend && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5001
echo Frontend: http://localhost:3000
echo.
pause