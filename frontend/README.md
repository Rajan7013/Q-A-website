```markdown
# AI Document Analyzer

A full-stack application that uses Gemini 2.0 Flash AI to analyze documents and provide intelligent answers with context awareness.

## 🚀 Features

- **Document Upload**: PDF, DOCX, PPTX, TXT support
- **AI Chat**: Context-aware conversations with Gemini 2.0
- **Exam Preparation**: Specialized mode for study assistance
- **Source Citations**: Tracks which documents answers come from
- **Profile Management**: Customizable user profiles
- **Settings**: Configure AI behavior and preferences

## 📋 Prerequisites

- Node.js 18+ 
- Gemini API Key (Get from [Google AI Studio](https://makersuite.google.com/app/apikey))

## 🛠️ Installation

### 1. Clone Repository
```bash
git clone 
cd ai-document-analyzer
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
GEMINI_API_KEY=your_actual_gemini_api_key_here
NODE_ENV=production
CORS_ORIGIN=http://localhost:5173
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env` file (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

## 🏃 Running Locally

### Start Backend
```bash
cd backend
npm run dev
```

### Start Frontend (in new terminal)
```bash
cd frontend
npm run dev
```

Visit: `http://localhost:5173`

## 📦 Production Build

### Build Frontend
```bash
cd frontend
npm run build
```

### Serve with Backend
```bash
cd backend
npm start
```

## 🚀 Deployment

### Deploy to Vercel (Frontend)
```bash
cd frontend
vercel deploy --prod
```

### Deploy to Railway/Render (Backend)
1. Push code to GitHub
2. Connect repository to Railway/Render
3. Set environment variables:
   - `GEMINI_API_KEY`
   - `NODE_ENV=production`
   - `CORS_ORIGIN=https://your-frontend-url.vercel.app`

### Environment Variables Required

**Backend:**
- `GEMINI_API_KEY` - Your Gemini API key
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (production/development)
- `CORS_ORIGIN` - Frontend URL

**Frontend:**
- `VITE_API_URL` - Backend API URL

## 🎨 Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Lucide Icons
- Axios

**Backend:**
- Node.js
- Express
- Gemini AI API
- Multer (file uploads)
- PDF Parse
- Mammoth (DOCX parsing)

## 📝 API Endpoints

### Chat
- `POST /api/chat/message` - Send message to AI
- `POST /api/chat/clear` - Clear conversation context

### Documents
- `POST /api/documents/upload` - Upload document
- `GET /api/documents/list` - Get all documents
- `DELETE /api/documents/:id` - Delete document

## 🔐 Security

- API keys stored securely in `.env` files
- CORS configured for specific origins
- File type validation on uploads
- File size limits (50MB)
- Input sanitization

## 📄 License

MIT License

## 🤝 Contributing

Pull requests are welcome!

## 📧 Support

For issues, please create a GitHub issue.
```

---

### **frontend/.env.example**
```env
VITE_API_URL=http://localhost:5000/api
```

---

### **backend/.env.example**
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=production
CORS_ORIGIN=http://localhost:5173
```

---

## 🚀 Quick Start Commands

### Install All Dependencies
```bash
# Backend
cd backend && npm install

# Frontend (in new terminal)
cd frontend && npm install
```

### Run Development
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Start backend
cd backend
npm start
```

---

## ✅ Complete Checklist

- ✅ Backend API with Gemini integration
- ✅ Secure environment variables
- ✅ File upload handling
- ✅ Context-aware conversations
- ✅ Beautiful formatted responses (no markdown symbols)
- ✅ Settings page (fully functional)
- ✅ Profile page (fully functional)
- ✅ All navigation working
- ✅ Colorful, modern UI
- ✅ Smooth animations and effects
- ✅ Production-ready configuration
- ✅ Deployment instructions

## 🎯 Next Steps

1. Replace `your_gemini_api_key_here` with actual API key
2. Test locally with `npm run dev`
3. Build for production with `npm run build`
4. Deploy backend to Railway/Render
5. Deploy frontend to Vercel
6. Update CORS_ORIGIN with production URL

**All files are 100% complete and ready to use!** 🎉