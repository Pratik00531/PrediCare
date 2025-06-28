#!/usr/bin/env python3
"""
Test PrediCare AI Doctor Components
"""

import os
import sys
import tempfile
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_environment():
    """Test if environment is properly configured"""
    print("🔍 Testing Environment Configuration...")
    
    groq_key = os.environ.get("GROQ_API_KEY")
    eleven_key = os.environ.get("ELEVEN_API_KEY")
    
    print(f"✅ GROQ API Key: {'✓ Set' if groq_key else '❌ Missing'}")
    print(f"✅ ElevenLabs API Key: {'✓ Set' if eleven_key else '❌ Missing'}")
    
    return bool(groq_key)

def test_imports():
    """Test if all required modules can be imported"""
    print("\n📦 Testing Imports...")
    
    try:
        from brain_of_the_doctor import analyze_image_with_query, encode_image
        print("✅ Brain of the Doctor: ✓")
    except ImportError as e:
        print(f"❌ Brain of the Doctor: {e}")
        
    try:
        from voice_of_the_doctor import text_to_speech_with_gtts
        print("✅ Voice of the Doctor: ✓")
    except ImportError as e:
        print(f"❌ Voice of the Doctor: {e}")
        
    try:
        from voice_of_the_patient import transcribe_with_groq
        print("✅ Voice of the Patient: ✓")
    except ImportError as e:
        print(f"❌ Voice of the Patient: {e}")
        
    try:
        import fastapi
        print("✅ FastAPI: ✓")
    except ImportError as e:
        print(f"❌ FastAPI: {e}")

def test_basic_functionality():
    """Test basic AI functionality"""
    print("\n🧠 Testing Basic AI Functionality...")
    
    if not os.environ.get("GROQ_API_KEY"):
        print("❌ Cannot test AI - GROQ API key missing")
        return
    
    try:
        from voice_of_the_doctor import text_to_speech_with_gtts
        
        # Test TTS
        print("🎵 Testing Text-to-Speech...")
        with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as temp_file:
            test_text = "Hello, this is PrediCare AI Doctor testing."
            text_to_speech_with_gtts(test_text, temp_file.name)
            print(f"✅ TTS Success: {temp_file.name}")
            
        print("✅ All basic tests passed!")
        
    except Exception as e:
        print(f"❌ Test failed: {e}")

if __name__ == "__main__":
    print("🩺 PrediCare AI Doctor - Component Test\n")
    
    # Run tests
    env_ok = test_environment()
    test_imports()
    
    if env_ok:
        test_basic_functionality()
    
    print("\n🚀 Ready to run the server with: python run_server.py")
