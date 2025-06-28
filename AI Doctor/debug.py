#!/usr/bin/env python3
"""
Debug script to find what's blocking the gradio app
"""

import sys
import traceback

print("🔍 PrediCare AI Doctor - Debug Mode")
print("=" * 50)

try:
    print("Step 1: Loading dotenv...")
    from dotenv import load_dotenv
    load_dotenv()
    print("✅ dotenv loaded")
except Exception as e:
    print(f"❌ dotenv failed: {e}")
    traceback.print_exc()

try:
    print("\nStep 2: Testing environment...")
    import os
    groq_key = os.environ.get("GROQ_API_KEY", "NOT_SET")
    print(f"GROQ_API_KEY: {groq_key[:10]}..." if groq_key != "NOT_SET" else "GROQ_API_KEY: NOT_SET")
except Exception as e:
    print(f"❌ Environment test failed: {e}")

try:
    print("\nStep 3: Importing gradio...")
    import gradio as gr
    print("✅ Gradio imported successfully")
except Exception as e:
    print(f"❌ Gradio import failed: {e}")
    traceback.print_exc()
    sys.exit(1)

try:
    print("\nStep 4: Testing brain_of_the_doctor...")
    from brain_of_the_doctor import encode_image, analyze_image_with_query
    print("✅ brain_of_the_doctor imported")
except Exception as e:
    print(f"❌ brain_of_the_doctor failed: {e}")
    traceback.print_exc()

try:
    print("\nStep 5: Testing voice_of_the_patient...")
    from voice_of_the_patient import transcribe_with_groq
    print("✅ voice_of_the_patient imported")
except Exception as e:
    print(f"❌ voice_of_the_patient failed: {e}")
    traceback.print_exc()

try:
    print("\nStep 6: Testing voice_of_the_doctor...")
    from voice_of_the_doctor import text_to_speech_with_gtts, text_to_speech_with_elevenlabs
    print("✅ voice_of_the_doctor imported")
except Exception as e:
    print(f"❌ voice_of_the_doctor failed: {e}")
    traceback.print_exc()

print("\n" + "=" * 50)
print("🎯 All imports successful! The issue might be in the Gradio launch.")
print("Try running: python gradio_app.py")
