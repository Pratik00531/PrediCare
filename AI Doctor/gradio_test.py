#!/usr/bin/env python3
"""
Minimal test version of Gradio app
"""

import os
import sys

# Load environment
try:
    from dotenv import load_dotenv
    load_dotenv()
    print("✅ Environment loaded")
except:
    print("⚠️ No .env file or dotenv not installed")

# Test basic import
try:
    import gradio as gr
    print("✅ Gradio imported")
except ImportError:
    print("❌ Gradio not installed")
    sys.exit(1)

def simple_test(text_input):
    """Simple test function"""
    return f"Echo: {text_input}"

def main():
    print("🩺 Starting minimal Gradio test...")
    
    # Create simple interface
    iface = gr.Interface(
        fn=simple_test,
        inputs=gr.Textbox(label="Test Input"),
        outputs=gr.Textbox(label="Test Output"),
        title="PrediCare Test Interface"
    )
    
    print("🚀 Launching interface on http://localhost:7860")
    iface.launch(debug=True, server_name="0.0.0.0", server_port=7860)

if __name__ == "__main__":
    main()
