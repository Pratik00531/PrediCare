#!/usr/bin/env python3
"""
Run PrediCare AI Doctor Backend Server
"""

import uvicorn
import sys
import os

# Add current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    print("🩺 Starting PrediCare AI Doctor Backend...")
    print("📍 Server will run on: http://localhost:8000")
    print("📚 API Docs available at: http://localhost:8000/docs")
    print("💡 Health check: http://localhost:8000/api/health")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
