# ⚡ Quick Setup Guide

## 🚀 For Users Cloning the Project

### 1. Clone Repository
```bash
git clone https://github.com/Rajan7013/Q-A-website.git
cd Q-A-website
```

### 2. Backend Setup
```bash
cd backend
npm install
```

**Create `.env` file:**
```env
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Run Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Open Browser
```
http://localhost:5173
```

---

## 📝 For First-Time GitHub Push

### Clean & Push Commands

```bash
# Navigate to project
cd "c:\Users\rajan\QA System"

# Remove old git
rmdir /s .git

# Initialize
git init

# Add remote
git remote add origin https://github.com/Rajan7013/Q-A-website.git

# Add files
git add .

# Commit
git commit -m "Initial commit: AI Document Analyzer"

# Push
git branch -M main
git push -f origin main
```

---

## ✅ Quick Checklist

**Before Pushing:**
- [ ] `backend/.env` exists and has API key
- [ ] `.gitignore` properly configured
- [ ] No `node_modules/` in commits
- [ ] README.md is complete
- [ ] All dependencies installed and tested

**After Cloning:**
- [ ] Repository cloned
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] `.env` file created
- [ ] Backend running on :5000
- [ ] Frontend running on :5173
- [ ] App working in browser

---

## 🔑 Get Gemini API Key

1. Go to https://ai.google.dev/
2. Click "Get API Key"
3. Create new API key
4. Copy to `backend/.env`

---

## 📁 Project Structure

```
Q-A-website/
├── backend/          # Node.js + Express
├── frontend/         # React + Vite
├── README.md         # Full documentation
├── .gitignore        # Git ignore rules
└── GIT_SETUP_COMMANDS.md  # Detailed Git guide
```

---

## 🎯 Common Commands

```bash
# Install dependencies
npm install

# Run backend
cd backend && npm run dev

# Run frontend
cd frontend && npm run dev

# Git commit
git add .
git commit -m "message"
git push origin main
```

---

**Need detailed help?**
- See [README.md](README.md) for full documentation
- See [GIT_SETUP_COMMANDS.md](GIT_SETUP_COMMANDS.md) for Git guide

---

Made with ❤️ by [Rajan](https://github.com/Rajan7013)
