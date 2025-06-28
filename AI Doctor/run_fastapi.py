#!/usr/bin/env python3
"""
Simple script to run FastAPI backend
"""

import uvicorn
import os
import sys

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

print("🩺 Starting PrediCare AI Doctor FastAPI Backend...")
print("📍 Backend API: http://localhost:8000")
print("📚 API Docs: http://localhost:8000/docs")
print("💚 Health Check: http://localhost:8000/api/health")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0", 
        port=8000,
        reload=True
    )
