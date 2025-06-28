# 🚀 PrediCare Development Guide

## Quick Start for Development

### 1. Prerequisites
- **Node.js** (v16 or higher) - for the frontend
- **Python** (v3.8 or higher) - for the AI Doctor backend
- **Git** - for version control

### 2. One-Command Setup & Start

```bash
# Install frontend dependencies and start both frontend + backend
npm install && npm run dev
```

This single command will:
- ✅ Install all Node.js dependencies
- ✅ Start the React frontend on `http://localhost:5173`
- ✅ Start the AI Doctor backend on `http://localhost:8000`
- ✅ Install Python dependencies automatically (if needed)

### 3. Individual Commands

```bash
# Frontend only
npm run dev:frontend

# Backend only  
npm run dev:backend

# Install Python dependencies manually
npm run backend:install

# Full setup with dependency installation
npm run setup
```

### 4. Available Services

Once running, you'll have access to:

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | Main React application |
| **Backend API** | http://localhost:8000 | AI Doctor FastAPI server |
| **API Docs** | http://localhost:8000/docs | Interactive API documentation |

### 5. AI Doctor Backend Features

The backend provides these AI capabilities:
- 🩺 **Medical Image Analysis** - Upload and analyze medical images
- 💬 **AI Chat Consultation** - Text-based medical consultations  
- 🗣️ **Text-to-Speech** - Convert doctor responses to audio
- 🎤 **Speech-to-Text** - Voice input for consultations

### 6. API Endpoints

```http
GET  /api/health           # Backend health check
POST /api/chat             # AI medical consultation
POST /api/analyze-image    # Medical image analysis
POST /api/text-to-speech   # Convert text to audio
POST /api/speech-to-text   # Convert audio to text
```

### 7. Environment Configuration

1. **Frontend Environment**:
   - Copy `.env.example` to `.env.local`
   - Add Firebase configuration for authentication

2. **Backend Environment**:
   - Python dependencies are automatically installed
   - Configure API keys in `AI Doctor/.env` if needed

### 8. Troubleshooting

**Backend not starting?**
```bash
cd "AI Doctor"
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

**Frontend issues?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev:frontend
```

**Port conflicts?**
- Frontend: Change port in `vite.config.ts`
- Backend: Change port in `AI Doctor/start_server.sh`

### 9. Development Workflow

1. Make changes to React components in `src/`
2. Backend automatically reloads when you edit `AI Doctor/*.py`
3. Frontend hot-reloads for instant UI updates
4. Use browser DevTools + API docs for debugging

### 10. Building for Production

```bash
npm run build        # Build frontend
npm run preview      # Preview production build
```

---

**Happy Coding! 🩺✨**

For questions or issues, check the main README.md or project documentation.
