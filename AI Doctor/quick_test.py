#!/usr/bin/env python3
"""
Simple test to verify AI Doctor components work
"""

from dotenv import load_dotenv
load_dotenv()

import os

print("🩺 PrediCare AI Doctor - Quick Test")
print("=" * 50)

# Test 1: Environment Variables
print("\n1. Testing Environment Variables:")
groq_key = os.environ.get("GROQ_API_KEY")
print(f"   GROQ API Key: {'✅ Set' if groq_key else '❌ Missing'}")

# Test 2: Imports
print("\n2. Testing Module Imports:")
try:
    from brain_of_the_doctor import analyze_image_with_query, encode_image
    print("   ✅ Brain of Doctor: OK")
except Exception as e:
    print(f"   ❌ Brain of Doctor: {e}")

try:
    from voice_of_the_doctor import text_to_speech_with_gtts
    print("   ✅ Voice of Doctor: OK")
except Exception as e:
    print(f"   ❌ Voice of Doctor: {e}")

try:
    from voice_of_the_patient import transcribe_with_groq
    print("   ✅ Voice of Patient: OK")
except Exception as e:
    print(f"   ❌ Voice of Patient: {e}")

# Test 3: Simple TTS test
print("\n3. Testing Text-to-Speech:")
if groq_key:
    try:
        from voice_of_the_doctor import text_to_speech_with_gtts
        text_to_speech_with_gtts("Hello from PrediCare AI Doctor", "test_output.mp3")
        print("   ✅ TTS Test: Success (test_output.mp3 created)")
    except Exception as e:
        print(f"   ❌ TTS Test: {e}")
else:
    print("   ⚠️  Skipping TTS test - no API key")

print("\n" + "=" * 50)
print("🚀 Ready to integrate with React frontend!")
print("\nNext steps:")
print("1. Run: python gradio_app.py (for testing)")
print("2. Run: ./start_server.sh (for FastAPI backend)")
print("3. Update React frontend to use backend")
