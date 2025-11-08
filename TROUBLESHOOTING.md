# 🔧 Troubleshooting Guide

## ✅ Current Status

**Backend:** ✓ Running on http://localhost:5000
**Frontend:** ✓ Running on http://localhost:5173

Both servers are confirmed to be running and responding!

---

## 🐛 Issue: Browser Shows 404

If you're seeing "This localhost page can't be found" or HTTP ERROR 404, this is likely a **browser cache issue**.

### Solution 1: Hard Refresh (Try This First!)

**Chrome/Edge:**
- Press `Ctrl + Shift + R` (Windows)
- Or `Ctrl + F5`

**Firefox:**
- Press `Ctrl + Shift + R`

**Safari:**
- Press `Cmd + Shift + R`

### Solution 2: Clear Browser Cache

1. Open DevTools: Press `F12`
2. Right-click on the refresh button
3. Select "Empty Cache and Hard Reload"

### Solution 3: Open in Incognito/Private Mode

1. Open a new Incognito/Private window
2. Go to http://localhost:5173
3. This bypasses all cache

### Solution 4: Try a Different Browser

If the above don't work, try:
- Chrome
- Firefox  
- Edge

### Solution 5: Restart Vite Dev Server

1. In the terminal running `npm run dev`, press `Ctrl + C`
2. Run again: `npm run dev`
3. Wait for "ready in XXX ms" message
4. Try http://localhost:5173 again

---

## ✅ Verification Steps

### 1. Check Backend
```bash
curl http://localhost:5000/health
```
Should return: `{"status":"OK","message":"Server is running"}`

### 2. Check Frontend
```bash
curl http://localhost:5173
```
Should return HTML content (not 404)

### 3. Check Browser Console
1. Open http://localhost:5173
2. Press F12 to open DevTools
3. Go to Console tab
4. Look for any errors (red text)
5. Share those errors if you see any

---

## 🎯 What Should Happen

When you open http://localhost:5173, you should see:

1. **Loading screen** (briefly)
2. **Homepage** with:
   - Purple/pink gradient header
   - "AI Doc Analyzer" title
   - Stats showing 0 for all counts (since it's fresh)
   - "No conversations yet" message
   - Upload and Chat buttons

---

## 📝 Common Issues

### Issue: Port Already in Use
**Error:** `EADDRINUSE: address already in use`

**Solution:**
```bash
# Kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <process_id> /F

# Restart
cd frontend
npm run dev
```

### Issue: Module Not Found
**Error:** `Cannot find module 'xyz'`

**Solution:**
```bash
cd frontend
npm install
npm run dev
```

### Issue: Compilation Errors
**Error:** JSX syntax errors, unexpected token, etc.

**Solution:** All files have been fixed. If you see this:
1. Stop the dev server (Ctrl + C)
2. Delete `node_modules` and `package-lock.json`
3. Run `npm install`
4. Run `npm run dev`

---

## 🆘 Still Not Working?

If none of the above work:

1. **Check the terminal** running `npm run dev`
   - Look for error messages
   - Should say "ready in XXX ms"

2. **Try accessing directly:**
   ```
   http://localhost:5173/index.html
   ```

3. **Check if files exist:**
   ```bash
   ls frontend/index.html
   ls frontend/src/main.jsx
   ls frontend/src/App.jsx
   ```

4. **Restart everything:**
   ```bash
   # Stop both servers (Ctrl + C in both terminals)
   
   # Backend
   cd backend
   npm start
   
   # Frontend (in new terminal)
   cd frontend  
   npm run dev
   ```

---

## ✨ Expected Behavior

Once working, you should be able to:

1. ✅ Upload documents (PDF, DOCX, PPTX, TXT)
2. ✅ Chat with AI about documents
3. ✅ See real-time stats update
4. ✅ View chat history
5. ✅ Edit profile
6. ✅ Change settings
7. ✅ Earn achievements

All data is **REAL** - no mocked data anymore!

---

## 🔍 Debug Commands

Run these to verify everything:

```bash
# Check if servers are running
curl http://localhost:5000/health
curl http://localhost:5173

# Check Node processes
Get-Process | Where-Object {$_.ProcessName -like '*node*'}

# Check ports in use
netstat -ano | findstr :5000
netstat -ano | findstr :5173
```

---

## 📞 Need More Help?

If you're still stuck, please provide:
1. Screenshot of the browser error
2. Terminal output from `npm run dev`
3. Browser console errors (F12 → Console tab)
4. Output of `curl http://localhost:5173`