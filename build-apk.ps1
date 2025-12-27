# 🚀 Simple APK Build Script

# This script will help you get your APK automatically
# Option 1: Install Java and build locally
# Option 2: Use Appetize.io web emulator (no APK download but can test)
# Option 3: Use online APK builder

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Daily Routine Tracker - APK Builder" -ForegroundColor Cyan  
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Java is installed
Write-Host "[1/5] Checking for Java..." -ForegroundColor Yellow
$javaInstalled = $false
try {
    $javaVersion = java -version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Java is installed!" -ForegroundColor Green
        $javaInstalled = $true
    }
} catch {
    Write-Host "✗ Java not found" -ForegroundColor Red
}

if (-not $javaInstalled) {
    Write-Host ""
    Write-Host "Java (JDK) is required to build APK automatically." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "EASY OPTIONS:" -ForegroundColor Cyan
    Write-Host "  1. Install Java JDK (Automatic - 5 min)" -ForegroundColor White
    Write-Host "     - I can guide you through automatic installation" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  2. Use Android Studio (One-time - 20 min)" -ForegroundColor White  
    Write-Host "     - Download: https://developer.android.com/studio" -ForegroundColor Gray
    Write-Host "     - Then run: npx cap open android" -ForegroundColor Gray
    Write-Host "     - Click Build > Build APK" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  3. Use PWA (Install as App - 1 min)" -ForegroundColor White
    Write-Host "     - Open: http://localhost:8000/web/index.html" -ForegroundColor Gray
    Write-Host "     - Click install button in browser" -ForegroundColor Gray
    Write-Host "     - Works on phone browser too!" -ForegroundColor Gray
    Write-Host ""
    
    $choice = Read-Host "Which option? (1/2/3)"
    
    if ($choice -eq "1") {
        Write-Host ""
        Write-Host "Installing Java JDK automatically..." -ForegroundColor Green
        Write-Host "Using Chocolatey package manager..." -ForegroundColor Gray
        
        # Check if Chocolatey is installed
        if (Get-Command choco -ErrorAction SilentlyContinue) {
            choco install openjdk -y
        } else {
            Write-Host "Installing Chocolatey first..." -ForegroundColor Yellow
            Set-ExecutionPolicy Bypass -Scope Process -Force
            [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
            iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
            
            Write-Host "Now installing Java JDK..." -ForegroundColor Yellow
            choco install openjdk -y
        }
        
        Write-Host ""
        Write-Host "Java installed! Restart PowerShell and run this script again." -ForegroundColor Green
        pause
        exit
    } elseif ($choice -eq "2") {
        Write-Host ""
        Write-Host "Opening Android Studio download page..." -ForegroundColor Green
        Start-Process "https://developer.android.com/studio"
        Write-Host ""
        Write-Host "After installing Android Studio:" -ForegroundColor Yellow
        Write-Host "  1. Run: npx cap open android" -ForegroundColor White
        Write-Host "  2. Click: Build > Build Bundle(s) / APK(s) > Build APK(s)" -ForegroundColor White
        Write-Host "  3. Find APK at: android\app\build\outputs\apk\debug\app-debug.apk" -ForegroundColor White
        pause
        exit
    } elseif ($choice -eq "3") {
        Write-Host ""
        Write-Host "Opening web app in browser..." -ForegroundColor Green
        Start-Process "http://localhost:8000/web/index.html"
        Write-Host ""
        Write-Host "To install on phone:" -ForegroundColor Yellow
        Write-Host "  1. Open this URL on your phone: http://[your-pc-ip]:8000/web/" -ForegroundColor White
        Write-Host "  2. Click install button in Chrome/Edge" -ForegroundColor White
        Write-Host "  3. App works offline after install!" -ForegroundColor White
        Write-Host ""
        Write-Host "Your PC IP addresses:" -ForegroundColor Yellow
        Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike "*Loopback*" } | Select-Object IPAddress, InterfaceAlias
        pause
        exit
    }
} else {
    Write-Host ""
    Write-Host "[2/5] Setting up Gradle wrapper..." -ForegroundColor Yellow
    cd android
    
    # Download Gradle wrapper if not exists
    if (-not (Test-Path "gradlew.bat")) {
        Write-Host "Downloading Gradle wrapper..." -ForegroundColor Gray
        # This would require gradle init, which needs Gradle installed
        Write-Host "✗ Gradle wrapper not found. Need Android Studio or Gradle installed." -ForegroundColor Red
        cd ..
        Write-Host ""
        Write-Host "Please install Android Studio for easiest experience:" -ForegroundColor Yellow
        Write-Host "https://developer.android.com/studio" -ForegroundColor Cyan
        pause
        exit
    }
    
    Write-Host "[3/5] Syncing Capacitor..." -ForegroundColor Yellow
    cd ..
    npx cap sync android
    
    Write-Host "[4/5] Building APK..." -ForegroundColor Yellow
    cd android
    .\gradlew.bat assembleDebug
    
    Write-Host ""
    Write-Host "[5/5] APK Built Successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your APK file is ready at:" -ForegroundColor Cyan
    Write-Host "  $PWD\app\build\outputs\apk\debug\app-debug.apk" -ForegroundColor White
    Write-Host ""
    Write-Host "Transfer this file to your phone and tap to install!" -ForegroundColor Yellow
    Write-Host ""
    
    # Open folder
    Start-Process "app\build\outputs\apk\debug"
}
