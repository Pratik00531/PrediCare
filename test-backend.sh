#!/bin/bash

echo "🧪 Testing PrediCare AI Doctor Backend..."
echo "========================================="

# Check if backend is running
echo "1. Checking if backend is running..."
if curl -s http://localhost:8000/api/health > /dev/null 2>&1; then
    echo "✅ Backend is running on http://localhost:8000"
    
    # Test health endpoint
    echo ""
    echo "2. Testing health endpoint..."
    curl -s http://localhost:8000/api/health | python3 -m json.tool
    
    echo ""
    echo "3. Testing chat endpoint..."
    curl -s -X POST "http://localhost:8000/api/chat" \
         -F "message=Hello doctor, how are you?" \
         -F "include_voice=false" | python3 -m json.tool
    
else
    echo "❌ Backend is not running. Please start it with:"
    echo "   npm run dev:backend"
    echo "   or"
    echo "   npm run dev"
fi

echo ""
echo "🏁 Test complete!"
