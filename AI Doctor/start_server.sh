#!/bin/bash
echo "🩺 Starting PrediCare AI Doctor Backend..."
echo "📍 Server will run on: http://localhost:8000"
echo "📚 API Docs available at: http://localhost:8000/docs"

# Change to the directory containing this script
cd "$(dirname "$0")"
export PYTHONPATH="${PYTHONPATH}:$(pwd)"

# Use python3 if available, otherwise python
PYTHON_CMD="python3"
if ! command -v python3 &> /dev/null; then
    PYTHON_CMD="python"
    if ! command -v python &> /dev/null; then
        echo "❌ Error: Python not found. Please install Python 3.8 or higher."
        exit 1
    fi
fi

echo "🐍 Using Python: $($PYTHON_CMD --version 2>&1)"

# Check if uvicorn is installed, install if not
if ! $PYTHON_CMD -c "import uvicorn" 2>/dev/null; then
    echo "📦 Installing uvicorn..."
    pip3 install uvicorn || pip install uvicorn
fi

# Check if fastapi is installed
if ! $PYTHON_CMD -c "import fastapi" 2>/dev/null; then
    echo "📦 Installing required dependencies..."
    pip3 install -r requirements.txt || pip install -r requirements.txt
fi

echo "🚀 Starting FastAPI server..."
$PYTHON_CMD -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
