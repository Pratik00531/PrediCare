# Production Deployment Guide for PrediCare AI Doctor

## 🚀 Deployment Options

### Option 1: Simple Production Server (VPS/Cloud)

#### 1. **Server Setup**
```bash
# Clone the repository
git clone git@github.com:Pratik00531/Predicare.git
cd Predicare

# Install Node.js dependencies
npm install

# Install Python dependencies for backend
cd "AI Doctor"
pip3 install -r requirements-production.txt
cd ..
```

#### 2. **Environment Configuration**
```bash
# Copy and configure environment variables
cp "AI Doctor/.env.example" "AI Doctor/.env"

# Edit .env with your API keys:
# GROQ_API_KEY=your_groq_api_key_here
# ELEVEN_API_KEY=your_elevenlabs_api_key_here
```

#### 3. **Build Frontend**
```bash
npm run build:production
```

#### 4. **Start Backend (Production Mode)**
```bash
npm run backend:production
```

#### 5. **Serve Frontend**
Use a web server like Nginx to serve the built frontend and proxy API requests.

---

### Option 2: Docker Deployment (Recommended)

#### 1. **Prerequisites**
- Docker and Docker Compose installed
- Clone the repository

#### 2. **Environment Setup**
```bash
# Create .env file in project root
GROQ_API_KEY=your_groq_api_key_here
ELEVEN_API_KEY=your_elevenlabs_api_key_here
```

#### 3. **Deploy with Docker**
```bash
# One-command deployment
npm run deploy

# Or step by step:
npm run docker:build    # Build containers
npm run docker:up       # Start services
npm run docker:logs     # View logs
```

#### 4. **Access Your Application**
- Frontend: http://your-server:80
- Backend API: http://your-server:8000
- API Docs: http://your-server:8000/docs

---

### Option 3: Platform-as-a-Service (PaaS)

#### **Vercel (Frontend) + Railway/Render (Backend)**

**Frontend on Vercel:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
vercel --prod
```

**Backend on Railway:**
1. Connect your GitHub repo to Railway
2. Set environment variables in Railway dashboard
3. Railway will auto-deploy from the `AI Doctor` folder

**Backend on Render:**
1. Create new Web Service on Render
2. Connect GitHub repo
3. Set build command: `pip install -r requirements-production.txt`
4. Set start command: `gunicorn main:app --bind 0.0.0.0:$PORT --workers 4 --worker-class uvicorn.workers.UvicornWorker`

---

## 🔧 Production Configuration

### **Backend Production Features:**
- ✅ Gunicorn WSGI server (production-ready)
- ✅ Multiple worker processes (auto-scaling)
- ✅ Proper timeout handling
- ✅ Health checks
- ✅ Error logging
- ✅ Security headers

### **Frontend Production Features:**
- ✅ Optimized build with Vite
- ✅ Nginx reverse proxy
- ✅ Gzip compression
- ✅ Static file caching
- ✅ API request proxying

---

## 📊 Monitoring & Maintenance

### **Health Checks**
```bash
# Check backend health
curl http://your-server:8000/api/health

# Check with Docker
npm run docker:logs
```

### **Scaling**
```bash
# Scale backend workers in docker-compose.yml
# Increase worker count in start_production.sh
```

### **Updates**
```bash
# Pull latest changes
git pull origin master

# Rebuild and redeploy
npm run deploy
```

---

## 🛡️ Security Considerations

1. **Environment Variables**: Never commit API keys
2. **HTTPS**: Use SSL certificates in production
3. **Firewall**: Only expose necessary ports (80, 443, 8000)
4. **Updates**: Keep dependencies updated
5. **Monitoring**: Set up error tracking and logging

---

## 📞 Support

- API Documentation: `http://your-server:8000/docs`
- Health Check: `http://your-server:8000/api/health`
- Frontend: `http://your-server`

Your AI Doctor system is now production-ready! 🩺✨
