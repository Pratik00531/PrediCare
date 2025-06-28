#!/usr/bin/env python3
"""
Check which Groq models are currently available
"""
import os
from groq import Groq

def check_available_models():
    try:
        client = Groq()
        
        print("🔍 Checking available Groq models...")
        print("=" * 50)
        
        # Test vision models
        vision_models = [
            "llama-3.2-90b-vision-preview",
            "llama-3.2-11b-vision-preview", 
            "llava-v1.5-7b-4096-preview"
        ]
        
        print("\n📸 Vision Models:")
        for model in vision_models:
            try:
                # Simple test call
                response = client.chat.completions.create(
                    model=model,
                    messages=[{"role": "user", "content": "Hello"}],
                    max_tokens=5
                )
                print(f"  ✅ {model} - Available")
            except Exception as e:
                if "decommissioned" in str(e).lower():
                    print(f"  ❌ {model} - Decommissioned")
                elif "not found" in str(e).lower():
                    print(f"  ❌ {model} - Not Found")
                else:
                    print(f"  ⚠️  {model} - Error: {str(e)[:50]}...")
        
        # Test text models
        text_models = [
            "llama-3.1-8b-instant",
            "llama-3.1-70b-versatile", 
            "mixtral-8x7b-32768",
            "meta-llama/llama-4-scout-17b-16e-instruct"
        ]
        
        print("\n💬 Text Models:")
        for model in text_models:
            try:
                response = client.chat.completions.create(
                    model=model,
                    messages=[{"role": "user", "content": "Hello"}],
                    max_tokens=5
                )
                print(f"  ✅ {model} - Available")
            except Exception as e:
                if "decommissioned" in str(e).lower():
                    print(f"  ❌ {model} - Decommissioned")
                elif "not found" in str(e).lower():
                    print(f"  ❌ {model} - Not Found")
                else:
                    print(f"  ⚠️  {model} - Error: {str(e)[:50]}...")
        
        print("\n" + "=" * 50)
        print("✅ Model check complete!")
        
    except Exception as e:
        print(f"❌ Failed to check models: {e}")
        print("Make sure GROQ_API_KEY is set in your environment")

if __name__ == "__main__":
    check_available_models()
