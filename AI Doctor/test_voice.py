#!/usr/bin/env python3
"""
Test Voice of the Doctor functionality
"""

from dotenv import load_dotenv
load_dotenv()

import os
import sys

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_voice_functions():
    """Test the voice generation functions"""
    
    print("🎵 Testing PrediCare Voice Functions")
    print("=" * 50)
    
    # Import voice functions
    try:
        from voice_of_the_doctor import text_to_speech_with_gtts, text_to_speech_with_elevenlabs
        print("✅ Voice functions imported successfully")
    except ImportError as e:
        print(f"❌ Import failed: {e}")
        return
    
    # Test text
    test_text = "Hello! This is PrediCare AI Doctor. I am now testing my voice capabilities."
    
    # Test gTTS (Google Text-to-Speech)
    print("\n🔊 Testing gTTS (Google Text-to-Speech)...")
    try:
        gtts_output = "test_gtts_output.mp3"
        text_to_speech_with_gtts(test_text, gtts_output)
        print(f"✅ gTTS Success: Audio saved as {gtts_output}")
    except Exception as e:
        print(f"❌ gTTS Failed: {e}")
    
    # Test ElevenLabs (if API key is available)
    print("\n🎤 Testing ElevenLabs TTS...")
    eleven_key = os.environ.get("ELEVEN_API_KEY")
    if eleven_key:
        try:
            elevenlabs_output = "test_elevenlabs_output.mp3"
            text_to_speech_with_elevenlabs(test_text, elevenlabs_output)
            print(f"✅ ElevenLabs Success: Audio saved as {elevenlabs_output}")
        except Exception as e:
            print(f"❌ ElevenLabs Failed: {e}")
    else:
        print("⚠️ ElevenLabs API key not found, skipping test")
    
    print("\n" + "=" * 50)
    print("🎯 Voice testing completed!")
    print("📁 Check the current directory for generated audio files")

if __name__ == "__main__":
    test_voice_functions()
