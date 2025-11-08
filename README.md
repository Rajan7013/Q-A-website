# 🤖 AI Document Analyzer - QA System

A powerful AI-powered Question & Answer system that analyzes documents and provides intelligent responses in **8 languages** with **text-to-speech** capabilities.

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash-orange.svg)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ Features

### 🎯 Core Features
- **📄 Document Upload & Analysis** - Upload PDF, DOCX, TXT files
- **🤖 AI-Powered Q&A** - Ask questions, get intelligent answers
- **📚 Document-First Approach** - AI reads your documents before answering
- **💬 Context-Aware Chat** - Remembers conversation history
- **🌍 8 Languages Support** - Multilingual responses
- **🔊 Text-to-Speech** - Indian female voice in all languages
- **📱 Fully Responsive** - Works on mobile, tablet, desktop

### 🌐 Supported Languages
- 🇬🇧 English
- 🇮🇳 Hindi (हिंदी)
- 🇮🇳 Telugu (తెలుగు)
- 🇮🇳 Tamil (தமிழ்)
- 🇮🇳 Malayalam (മലയാളം)
- 🇮🇳 Bengali (বাংলা)
- 🇳🇵 Nepali (नेपाली)
- 🇮🇳 Maithili (मैथिली)

### 🎨 Additional Features
- **Beautiful Markdown Rendering** - Professional formatting
- **Mobile Bottom Navigation** - Native app-like experience
- **Dark Mode** - Eye-friendly interface
- **User Profiles** - Personalized experience
- **Stats & Analytics** - Track your usage
- **Chat History** - Save conversations

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- **Gemini API Key** - [Get one free](https://ai.google.dev/)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Rajan7013/Q-A-website.git
cd Q-A-website
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the following and paste into backend/.env
```

Create a file named `.env` in the `backend` folder with:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

**How to get Gemini API Key:**
1. Go to [Google AI Studio](https://ai.google.dev/)
2. Click "Get API Key"
3. Create a new API key
4. Copy and paste into `.env` file

#### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

#### 4. Run the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```

Backend will start on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

Frontend will start on `http://localhost:5173`

#### 5. Open in Browser

```
http://localhost:5173
```

**🎉 You're ready to go!**

---

## 📁 Project Structure

```
Q-A-website/
├── backend/                    # Backend (Node.js + Express)
│   ├── routes/                 # API routes
│   │   ├── chat.js            # Chat API with AI
│   │   ├── documents.js       # Document upload/management
│   │   ├── profile.js         # User profile & settings
│   │   ├── stats.js           # Analytics & statistics
│   │   └── history.js         # Chat history
│   ├── utils/                 # Utility functions
│   │   ├── gemini.js          # Gemini AI integration
│   │   └── formatResponse.js  # Response formatting
│   ├── uploads/               # Uploaded documents storage
│   ├── server.js              # Express server
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables (create this!)
│
├── frontend/                   # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ChatPage.jsx   # AI Chat interface
│   │   │   ├── HomePage.jsx   # Landing page
│   │   │   ├── UploadPage.jsx # Document upload
│   │   │   ├── DocumentsPage.jsx  # Document management
│   │   │   ├── SettingsPage.jsx   # Settings & language
│   │   │   ├── ProfilePage.jsx    # User profile
│   │   │   └── Navbar.jsx     # Navigation
│   │   ├── utils/
│   │   │   └── api.js         # API calls
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── public/                # Static assets
│   ├── index.html             # HTML template
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
│
├── README.md                  # This file
├── .gitignore                 # Git ignore file
└── package.json               # Root package.json
```

---

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Gemini AI (2.5 Flash)** - AI language model
- **Multer** - File upload handling
- **pdf-parse** - PDF text extraction
- **mammoth** - DOCX text extraction
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **TailwindCSS** - Utility-first CSS
- **React Markdown** - Markdown rendering
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **Web Speech API** - Text-to-speech

---

## 📖 Usage Guide

### 1. Upload Documents

1. Click **Upload** in navigation
2. Choose file (PDF, DOCX, TXT)
3. Wait for processing
4. Document ready for questions!

### 2. Ask Questions

1. Go to **Chat** page
2. Type your question
3. AI reads documents and responds
4. View source attribution (📄 or 🧠)

### 3. Listen to Answers

1. Get AI response
2. Click speaker icon (🔊)
3. Hear answer in Indian female voice
4. Control with pause/stop buttons

### 4. Change Language

1. Go to **Settings**
2. Select preferred language
3. Click "Save Settings"
4. AI now responds in that language!

### 5. View Statistics

1. Go to **Profile**
2. See your usage stats
3. Track documents analyzed
4. View questions answered

---

## 🌍 Language Support

### How It Works:

**Question:** (English) "What is Python?"

**Response:** (Selected Language)
- **English:** "Python is a programming language..."
- **Hindi:** "पायथन एक प्रोग्रामिंग भाषा है..."
- **Telugu:** "పైథాన్ ఒక ప్రోగ్రామింగ్ భాష..."
- **Tamil:** "பைத்தான் ஒரு நிரலாக்க மொழி..."

### Voice Support:
All 8 languages have Indian accent text-to-speech support!

---

## 🎯 Key Features Explained

### 1. Document-First Approach

The AI follows a strict 4-step process:
1. **Read** all uploaded documents completely
2. **Analyze** your question
3. **Search** in documents thoroughly
4. **Decide** where to get the answer:
   - 📄 From documents (preferred)
   - 🧠 From AI knowledge (if not in docs)

### 2. Markdown Rendering

Responses are beautifully formatted with:
- **Headings** - Clear hierarchy
- **Bold & Italic** - Emphasis
- **Lists** - Organized points
- **Code blocks** - Syntax highlighting
- **Tables** - Structured data
- **Links** - Clickable references

### 3. Text-to-Speech

Features:
- **Indian female voice** in all languages
- **Play/Pause/Stop** controls
- **Markdown-aware** - strips formatting for clean speech
- **Offline** - works without internet

### 4. Mobile Responsive

- **Bottom navigation bar** on mobile (like native apps)
- **Touch-optimized** buttons and controls
- **Responsive text** sizing
- **Safe area** support for iPhone notch

---

## 🔧 Configuration

### Backend Configuration

**Environment Variables** (`backend/.env`):
```env
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

**Server Settings** (`backend/server.js`):
- Port: `5000`
- CORS: Enabled for `http://localhost:5173`
- File Upload: Max 50MB

### Frontend Configuration

**API URL** (`frontend/src/utils/api.js`):
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

**Vite Config** (`frontend/vite.config.js`):
- Dev Server Port: `5173`
- Hot Module Replacement: Enabled

---

## 📱 Browser Support

### Desktop
- ✅ Chrome 90+ (Recommended)
- ✅ Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+

### Mobile
- ✅ Chrome Mobile
- ✅ Safari iOS
- ✅ Samsung Internet
- ✅ Firefox Mobile

### Text-to-Speech
- ✅ Chrome (Best Indian voice support)
- ✅ Edge (Excellent support)
- ✅ Safari (Good support)
- ✅ Firefox (Basic support)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Troubleshooting

### Backend won't start

**Problem:** `Error: Cannot find module 'express'`
```bash
cd backend
npm install
```

**Problem:** `Gemini API error`
- Check if API key is correct in `backend/.env`
- Ensure key is active at [Google AI Studio](https://ai.google.dev/)

### Frontend won't start

**Problem:** `Module not found`
```bash
cd frontend
npm install
```

**Problem:** `Connection refused to localhost:5000`
- Ensure backend is running
- Check backend console for errors

### Document upload fails

**Problem:** File too large
- Max file size: 50MB
- Try compressing the file

**Problem:** Unsupported file type
- Supported: PDF, DOCX, TXT
- Convert to supported format

### Text-to-Speech not working

**Problem:** No sound
- Check browser permissions
- Ensure volume is on
- Try Chrome for best support

---

## 📝 API Documentation

### Chat API

**POST** `/api/chat/message`
```json
{
  "message": "What is Python?",
  "sessionId": "session-123",
  "documents": [{"id": "doc1", "name": "file.pdf"}],
  "context": {"topic": "programming"},
  "language": "en"
}
```

**Response:**
```json
{
  "response": "Python is a programming language...",
  "sources": ["file.pdf"],
  "context": {"topic": "programming", "intent": "explanation"}
}
```

### Document API

**POST** `/api/documents/upload`
- Content-Type: `multipart/form-data`
- Field: `file`
- Returns: Document metadata

**GET** `/api/documents/list`
- Returns: Array of uploaded documents

### Settings API

**GET** `/api/profile/:userId/settings`
- Returns: User settings

**PUT** `/api/profile/:userId/settings`
- Body: Settings object
- Returns: Updated settings

---

## 🎓 Learn More

### Documentation Files
- `MARKDOWN_FORMATTING_DEMO.md` - Markdown examples
- `MULTILINGUAL_SUPPORT.md` - Language feature details
- `TEXT_TO_SPEECH_FEATURE.md` - TTS implementation
- `RESPONSIVE_DESIGN_UPDATE.md` - Mobile responsiveness
- `SETTINGS_FINAL_WORKING.md` - Settings features

### External Resources
- [Gemini AI Documentation](https://ai.google.dev/docs)
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Rajan**
- GitHub: [@Rajan7013](https://github.com/Rajan7013)
- Repository: [Q-A-website](https://github.com/Rajan7013/Q-A-website)

---

## 🙏 Acknowledgments

- Google Gemini AI for powerful language model
- React community for excellent framework
- TailwindCSS for beautiful styling
- All open-source contributors

---

## 📞 Support

If you have any questions or issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an [Issue](https://github.com/Rajan7013/Q-A-website/issues)
3. Read the documentation files in the project

---

## 🗺️ Roadmap

### Current Features ✅
- ✅ Document upload & analysis
- ✅ AI-powered Q&A
- ✅ 8 languages support
- ✅ Text-to-speech
- ✅ Mobile responsive
- ✅ Settings & profiles

### Planned Features 🚧
- 🔄 Database integration (PostgreSQL/MongoDB)
- 🔄 User authentication (JWT/OAuth)
- 🔄 Real-time collaboration
- 🔄 Advanced analytics
- 🔄 More language support
- 🔄 Voice input
- 🔄 Document comparison
- 🔄 Export conversations

---

## 📊 Project Stats

- **Total Languages:** 8
- **Supported File Types:** PDF, DOCX, TXT
- **AI Model:** Gemini 2.5 Flash
- **Max Document Size:** 50MB
- **Response Time:** < 3 seconds
- **Browser Support:** All modern browsers

---

## 💡 Tips & Best Practices

### For Best Results:
1. **Upload clear, text-based documents** (avoid scanned images)
2. **Ask specific questions** for better answers
3. **Use context** - follow-up questions work great!
4. **Select correct language** in settings
5. **Use Chrome** for best text-to-speech quality

### Performance Tips:
- Keep documents under 10MB for faster processing
- Close unused browser tabs
- Clear chat history periodically
- Update to latest Node.js version

---

## 🎉 Getting Started Checklist

- [ ] Node.js installed
- [ ] Git installed
- [ ] Repository cloned
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] `.env` file created with Gemini API key
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Browser opened to localhost:5173
- [ ] First document uploaded
- [ ] First question asked
- [ ] Language changed in settings
- [ ] Text-to-speech tested

**All checked? You're ready to go! 🚀**

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

Made with ❤️ by [Rajan](https://github.com/Rajan7013)

</div>
