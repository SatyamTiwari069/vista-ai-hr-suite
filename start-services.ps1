# Vista HRMS - Complete Application Startup (Windows PowerShell)

Write-Host "==================================" -ForegroundColor Green
Write-Host "Vista HRMS - Starting Services" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""

Write-Host "Step 1: Building Backend..." -ForegroundColor Yellow
Set-Location backend
npm run build 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Backend built successfully" -ForegroundColor Green
Write-Host ""

Write-Host "Step 2: Starting Backend Server on port 3001..." -ForegroundColor Yellow
Start-Process -FilePath "npm" -ArgumentList "run dev" -NoNewWindow
Write-Host "✅ Backend server started (check terminal for output)" -ForegroundColor Green
Start-Sleep -Seconds 3
Write-Host ""

Write-Host "Step 3: Building Frontend..." -ForegroundColor Yellow
Set-Location ../frontend
npm run build 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Frontend build had issues (continuing with dev server)" -ForegroundColor Yellow
}
Write-Host "✅ Frontend ready" -ForegroundColor Green
Write-Host ""

Write-Host "Step 4: Starting Frontend Server on port 8080..." -ForegroundColor Yellow
Start-Process -FilePath "npm" -ArgumentList "run dev" -NoNewWindow
Write-Host "✅ Frontend dev server started (check terminal for output)" -ForegroundColor Green
Write-Host ""

Write-Host "==================================" -ForegroundColor Green
Write-Host "Services Running:" -ForegroundColor Green
Write-Host "  Backend:  http://localhost:3001" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:8080" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Green
Write-Host ""
Write-Host "Application is ready for testing!" -ForegroundColor Green
Write-Host ""

# Open frontend in default browser
Start-Sleep -Seconds 2
Write-Host "Opening application in browser..." -ForegroundColor Yellow
Start-Process "http://localhost:8080"

Write-Host ""
Write-Host "To stop services, close the terminal windows or use Ctrl+C" -ForegroundColor Yellow
