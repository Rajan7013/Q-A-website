@echo off
echo ====================================
echo    Git Setup and Push to GitHub
echo ====================================
echo.

echo Step 1: Initializing Git repository...
git init

echo.
echo Step 2: Adding remote repository...
git remote add origin https://github.com/Rajan7013/Q-A-website.git

echo.
echo Step 3: Adding all files...
git add .

echo.
echo Step 4: Checking status...
git status

echo.
echo Step 5: Creating commit...
git commit -m "Initial commit: AI Document Analyzer with 8 languages & TTS"

echo.
echo Step 6: Renaming branch to main...
git branch -M main

echo.
echo Step 7: Pushing to GitHub...
git push -f origin main

echo.
echo ====================================
echo    Push Complete!
echo ====================================
echo.
echo Check your repository at:
echo https://github.com/Rajan7013/Q-A-website
echo.
pause
