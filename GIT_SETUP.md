# Git Repository Setup Guide

## Prerequisites
1. Install Git from https://git-scm.com/download/win
2. After installation, restart your terminal/PowerShell

## Steps to Create and Push Repository

### 1. Initialize Git Repository
```bash
git init
```

### 2. Configure Git (if not already done)
```bash
git config --global user.name "Viratabenka"
git config --global user.email "your-email@example.com"
```

### 3. Create GitHub Repository
- Go to https://github.com/new
- Repository name: `outerra`
- Choose Public or Private
- **DO NOT** initialize with README, .gitignore, or license
- Click "Create repository"

### 4. Add All Files
```bash
git add .
```

### 5. Create Initial Commit
```bash
git commit -m "Initial commit: Outerra premium outdoor kitchen website"
```

### 6. Add Remote Repository
```bash
git remote add origin https://github.com/Viratabenka/outerra.git
```

### 7. Push to GitHub
```bash
git branch -M main
git push -u origin main
```

When prompted for credentials:
- Username: `Viratabenka`
- Password: `Abenka@001`

**Note:** GitHub may require a Personal Access Token instead of password. If so:
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` permissions
3. Use the token as password when pushing

