#!/bin/bash

# Production startup script for AI Doctor Backend
echo "🩺 Starting PrediCare AI Doctor Backend (Production Mode)..."

# Check if virtual environment exists, create if not
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install/update dependencies
echo "📚 Installing dependencies..."
pip install -r requirements.txt

# Check environment variables
if [ -z "$GROQ_API_KEY" ]; then
    echo "⚠️  Warning: GROQ_API_KEY not set in environment"
    if [ -f ".env" ]; then
        echo "📋 Loading environment variables from .env file..."
        export $(cat .env | xargs)
    else
        echo "❌ No .env file found. Please set GROQ_API_KEY environment variable"
        exit 1
    fi
fi

# Start the server in production mode
echo "🚀 Starting FastAPI server in production mode..."
echo "📍 Server will run on: http://0.0.0.0:8000"
echo "📚 API Docs available at: http://0.0.0.0:8000/docs"

# Use gunicorn for production (install if not present)
if ! command -v gunicorn &> /dev/null; then
    echo "📦 Installing gunicorn for production..."
    pip install gunicorn
fi

# Start with gunicorn (production WSGI server)
gunicorn main:app \
    --bind 0.0.0.0:8000 \
    --workers 4 \
    --worker-class uvicorn.workers.UvicornWorker \
    --timeout 120 \
    --keep-alive 2 \
    --max-requests 1000 \
    --max-requests-jitter 100 \
    --access-logfile - \
    --error-logfile -
