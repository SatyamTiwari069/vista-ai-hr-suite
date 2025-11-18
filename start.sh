#!/bin/bash
# Vista HR Suite - Quick Start Script

echo "======================================"
echo "Vista HR Suite - Full Stack HRMS"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    exit 1
fi

echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"
echo ""

# Start Backend
echo "Starting Backend Server..."
cd backend
npm install --legacy-peer-deps > /dev/null 2>&1
npm run dev &
BACKEND_PID=$!
echo "Backend started (PID: $BACKEND_PID)"
echo ""

# Wait for backend to start
sleep 3

# Start Frontend
echo "Starting Frontend Server..."
cd ../frontend
npm install > /dev/null 2>&1
npm run dev &
FRONTEND_PID=$!
echo "Frontend started (PID: $FRONTEND_PID)"
echo ""

echo "======================================"
echo "✅ Application Started Successfully!"
echo "======================================"
echo ""
echo "Frontend:  http://localhost:8080"
echo "Backend:   http://localhost:3001"
echo "API:       http://localhost:3001/api"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
