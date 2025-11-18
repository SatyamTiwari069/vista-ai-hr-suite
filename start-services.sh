#!/bin/bash
# Vista HRMS - Complete Application Startup

echo "=================================="
echo "Vista HRMS - Starting Services"
echo "=================================="
echo ""

echo "Step 1: Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
echo ""

sleep 3

echo "Step 2: Starting Frontend Server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"
echo ""

echo "=================================="
echo "Services Running:"
echo "  Backend:  http://localhost:3001"
echo "  Frontend: http://localhost:8080"
echo "=================================="
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
