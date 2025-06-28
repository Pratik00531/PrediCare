#!/bin/bash

echo "🩺 PrediCare AI Doctor - Starting..."
echo "=================================="
echo ""
echo "🔧 Fixed Issues:"
echo "✅ ElevenLabs fallback to gTTS"
echo "✅ Gradio examples format fixed"
echo "✅ Environment variables corrected"
echo ""
echo "🚀 Launching Gradio Interface..."
echo "📍 URL: http://localhost:7860"
echo ""

cd "$(dirname "$0")"
python gradio_app.py
