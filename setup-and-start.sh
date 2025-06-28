#!/bin/bash

echo "🚀 Starting PrediCare - Frontend + AI Doctor Backend"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this from the project root directory."
    exit 1
fi

# Check if Python is available
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "❌ Error: Python not found. Please install Python 3.8 or higher."
    exit 1
fi

# Use python3 if available, otherwise python
PYTHON_CMD="python3"
if ! command -v python3 &> /dev/null; then
    PYTHON_CMD="python"
fi

echo "🐍 Using Python: $($PYTHON_CMD --version)"

# Check if AI Doctor directory exists
if [ ! -d "AI Doctor" ]; then
    echo "❌ Error: AI Doctor directory not found."
    exit 1
fi

# Install Python dependencies if requirements.txt exists
if [ -f "AI Doctor/requirements.txt" ]; then
    echo "📦 Installing Python dependencies..."
    cd "AI Doctor"
    
    # Try to install with pip, fall back to pip3
    if command -v pip &> /dev/null; then
        pip install -r requirements.txt
    elif command -v pip3 &> /dev/null; then
        pip3 install -r requirements.txt
    else
        echo "⚠️  Warning: pip not found. Please install Python dependencies manually:"
        echo "   cd 'AI Doctor' && pip install -r requirements.txt"
    fi
    
    cd ..
fi

echo "✅ Setup complete!"
echo "🌐 Frontend will be available at: http://localhost:5173"
echo "🩺 Backend API will be available at: http://localhost:8000"
echo "📚 Backend API docs will be available at: http://localhost:8000/docs"
echo ""
echo "Starting both servers..."
