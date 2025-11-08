# 🧪 Testing Document-First Feature

## Quick Test Guide

Follow these steps to verify the document-first answer system is working correctly.

---

## Prerequisites

Make sure both servers are running:

```bash
# Terminal 1 - Backend
cd "c:\Users\rajan\QA System\backend"
npm start

# Terminal 2 - Frontend  
cd "c:\Users\rajan\QA System\frontend"
npm run dev
```

Then open: http://localhost:5173

---

## Test 1: Document-Based Answer ✅

**Goal:** Verify AI uses document content when available

### Steps:

1. **Create a test document** (save as `test_python.txt`):
```
Python Programming Basics

Variables:
In Python, you don't need to declare variable types.
Example: x = 10, name = "Alice"

Lists:
Lists are created using square brackets.
Example: fruits = ["apple", "banana", "orange"]

Functions:
Functions are defined using the def keyword.
Example: def greet(name):
             return f"Hello {name}"
```

2. **Upload the document**
   - Go to Upload page
   - Upload `test_python.txt`
   - Wait for "Processing complete"

3. **Ask a question** (in Chat page):
   ```
   How do I create lists in Python?
   ```

4. **Expected Response:**
   - Should start with: **"📄 Based on your documents:"**
   - Should mention lists and square brackets
   - Should reference your document content
   - Source badge should show: **"test_python.txt"**

### ✅ Pass Criteria:
- [ ] Response starts with 📄 emoji
- [ ] Content matches document
- [ ] Source badge shows document name
- [ ] Response is markdown formatted

---

## Test 2: General Knowledge Answer 🧠

**Goal:** Verify AI falls back to general knowledge when needed

### Steps:

1. **Keep the Python document uploaded** (from Test 1)

2. **Ask an unrelated question** (in Chat page):
   ```
   Explain quantum computing
   ```

3. **Expected Response:**
   - Should start with: **"🧠 Based on general knowledge (not found in your documents):"**
   - Should explain quantum computing
   - Should NOT reference your Python document
   - Source badge should show: **"AI General Knowledge"**

### ✅ Pass Criteria:
- [ ] Response starts with 🧠 emoji
- [ ] Doesn't mention Python document
- [ ] Source badge shows "AI General Knowledge"
- [ ] Answer is comprehensive

---

## Test 3: Hybrid Answer 📄+🧠

**Goal:** Verify AI combines sources when appropriate

### Steps:

1. **Create another test document** (save as `test_database.txt`):
```
Database Fundamentals

MySQL:
- Open source relational database
- Fast for read operations
- Popular for web applications

PostgreSQL:
- Advanced open source database
- Supports complex data types
- Strong standards compliance
```

2. **Upload this document**
   - Upload `test_database.txt`
   - Wait for processing

3. **Ask a hybrid question** (in Chat page):
   ```
   Compare MySQL vs PostgreSQL and recommend best practices for production
   ```

4. **Expected Response:**
   - Should start with: **"📄 From your documents + 🧠 General knowledge:"**
   - Should include info from your document
   - Should ADD production best practices from AI knowledge
   - Source badges should show: **"test_database.txt"** AND **"AI General Knowledge"**

### ✅ Pass Criteria:
- [ ] Response indicates both sources
- [ ] Includes document content
- [ ] Adds AI knowledge
- [ ] Multiple source badges

---

## Test 4: Multiple Documents 📚

**Goal:** Verify AI searches across multiple documents

### Steps:

1. **Ensure you have multiple documents uploaded** (from previous tests)
   - test_python.txt
   - test_database.txt

2. **Ask a broad question** (in Chat page):
   ```
   What programming topics are covered in my documents?
   ```

3. **Expected Response:**
   - Should start with: **"📄 Based on your documents:"**
   - Should mention BOTH Python and Database content
   - Should list topics from multiple documents
   - Source badges should show: Both document names

### ✅ Pass Criteria:
- [ ] Recognizes multiple documents
- [ ] Mentions content from both
- [ ] Multiple source badges
- [ ] Organized response

---

## Test 5: Markdown Formatting ✨

**Goal:** Verify responses are beautifully formatted

### Steps:

1. **Ask for a structured answer** (in Chat page):
   ```
   Explain Python lists with examples and best practices
   ```

2. **Check formatting in response:**
   - ✅ Headings should be large and purple
   - ✅ Bold text should be actually bold
   - ✅ Bullet points should have clean • symbols
   - ✅ Code blocks should be highlighted
   - ✅ Proper spacing between sections

### ✅ Pass Criteria:
- [ ] Headings are styled (not showing ##)
- [ ] Bold text is bold (not showing **)
- [ ] Lists have bullets (not showing -)
- [ ] Code is highlighted (not showing ```)
- [ ] Beautiful spacing

---

## Test 6: Source Badge Visibility 🏷️

**Goal:** Verify source badges display correctly

### Steps:

1. **Ask any question** (with document uploaded)

2. **Look at the response message**
   - Check bottom of message
   - Should see "Sources:" label
   - Should see badge(s) with source names
   - Badges should be styled with gray background

### ✅ Pass Criteria:
- [ ] "Sources:" label visible
- [ ] Badge(s) displayed
- [ ] Readable styling
- [ ] Correct source names

---

## Test 7: Context Memory 🧠

**Goal:** Verify conversation context is maintained

### Steps:

1. **First message** (in Chat page):
   ```
   Tell me about Python functions from my document
   ```
   - Should use document content

2. **Follow-up message** (same session):
   ```
   Give me an advanced example
   ```
   - Should remember you're talking about Python functions
   - Should provide relevant example
   - Should maintain document-first approach if info available

### ✅ Pass Criteria:
- [ ] Second response understands context
- [ ] Doesn't need to repeat question
- [ ] Maintains source priority
- [ ] Coherent conversation flow

---

## Troubleshooting

### Issue: Response doesn't show 📄 or 🧠 emojis

**Solution:**
- Backend might not have restarted
- Stop backend (Ctrl+C)
- Restart: `npm start`
- Clear browser cache (Ctrl+Shift+R)

### Issue: Source badges not showing

**Solution:**
- Check frontend console for errors (F12)
- Verify ChatPage.jsx was updated
- Hard refresh browser (Ctrl+Shift+R)

### Issue: Markdown not formatting

**Solution:**
- Verify react-markdown is installed
- Check index.css has markdown styles
- Restart frontend dev server

### Issue: Document content not being used

**Solution:**
- Verify document uploaded successfully
- Check backend console for errors
- Ensure document has text content (not just images)
- Try re-uploading the document

### Issue: Response says "not found in documents" when it should be there

**Solution:**
- Document might be too long (>10k chars)
- Try with smaller document
- Check if text extraction worked (view in Documents page)
- Question might be too specific - try broader phrasing

---

## Quick Verification Script

Run these 3 questions in sequence:

```
1. "What is covered in my documents?"
   Expected: 📄 (lists document topics)

2. "Explain artificial neural networks"
   Expected: 🧠 (general AI knowledge)

3. "Summarize the key points from my documents"
   Expected: 📄 (document-based summary)
```

If all 3 show correct emoji indicators, **the system is working perfectly!** ✅

---

## Success Indicators

### ✅ Feature Working If:

1. **Document questions** → Start with 📄
2. **Unrelated questions** → Start with 🧠
3. **Hybrid questions** → Mention both sources
4. **Source badges** → Display correctly
5. **Markdown** → Formats beautifully
6. **Multiple docs** → AI searches all
7. **Context** → Conversation flows naturally

### ❌ Feature NOT Working If:

1. All responses show 🧠 (even for document questions)
2. No emoji indicators at all
3. Raw markdown visible (##, **, etc.)
4. No source badges showing
5. Document content never used

---

## Test Results Template

Use this to track your testing:

```
Date: ___________
Tester: ___________

Test 1 - Document Answer:        [ ] Pass  [ ] Fail
Test 2 - General Knowledge:      [ ] Pass  [ ] Fail
Test 3 - Hybrid Answer:          [ ] Pass  [ ] Fail
Test 4 - Multiple Documents:     [ ] Pass  [ ] Fail
Test 5 - Markdown Formatting:    [ ] Pass  [ ] Fail
Test 6 - Source Badges:          [ ] Pass  [ ] Fail
Test 7 - Context Memory:         [ ] Pass  [ ] Fail

Overall Status: [ ] All Pass  [ ] Issues Found

Notes:
_________________________________
_________________________________
_________________________________
```

---

## 🎉 After All Tests Pass

**Congratulations!** Your document-first QA system is working perfectly!

You now have:
- ✅ Intelligent document search
- ✅ Smart fallback to AI knowledge
- ✅ Beautiful markdown formatting
- ✅ Clear source attribution
- ✅ Professional user experience

**Start using it with real documents!** 🚀
