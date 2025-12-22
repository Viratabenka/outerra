# Git Setup Script for Outerra Repository
# Run this script after installing Git

Write-Host "Setting up Git repository for Outerra..." -ForegroundColor Green

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Git is not installed. Please install Git from https://git-scm.com/download/win" -ForegroundColor Red
    exit 1
}

# Initialize git repository
Write-Host "`nInitializing git repository..." -ForegroundColor Yellow
git init

# Add all files
Write-Host "Adding all files..." -ForegroundColor Yellow
git add .

# Create initial commit
Write-Host "Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Outerra premium outdoor kitchen website"

# Add remote repository
Write-Host "Adding remote repository..." -ForegroundColor Yellow
git remote add origin https://github.com/Viratabenka/outerra.git

# Set main branch
Write-Host "Setting main branch..." -ForegroundColor Yellow
git branch -M main

Write-Host "`nRepository setup complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Create the repository on GitHub: https://github.com/new" -ForegroundColor White
Write-Host "   - Repository name: outerra" -ForegroundColor White
Write-Host "   - DO NOT initialize with README" -ForegroundColor White
Write-Host "2. Run: git push -u origin main" -ForegroundColor White
Write-Host "3. When prompted, use:" -ForegroundColor White
Write-Host "   Username: Viratabenka" -ForegroundColor White
Write-Host "   Password: Abenka@001 (or Personal Access Token)" -ForegroundColor White

