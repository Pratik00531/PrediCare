# PrediCare AI Doctor - Gradio Interface
import os
import sys
import traceback

# Set up environment
try:
    from dotenv import load_dotenv
    load_dotenv()
    print("✅ Environment variables loaded")
except Exception as e:
    print(f"⚠️ Warning loading .env: {e}")

# Test imports step by step
print("📦 Testing imports...")

try:
    import gradio as gr
    print("✅ Gradio imported successfully")
except ImportError as e:
    print(f"❌ Gradio import failed: {e}")
    sys.exit(1)

try:
    from brain_of_the_doctor import encode_image, analyze_image_with_query
    print("✅ Brain of doctor imported")
except ImportError as e:
    print(f"❌ Brain of doctor import failed: {e}")
    sys.exit(1)

try:
    from voice_of_the_patient import transcribe_with_groq
    print("✅ Voice of patient imported")
except ImportError as e:
    print(f"❌ Voice of patient import failed: {e}")
    sys.exit(1)

try:
    from voice_of_the_doctor import text_to_speech_with_gtts, text_to_speech_with_elevenlabs
    print("✅ Voice of doctor imported")
except ImportError as e:
    print(f"❌ Voice of doctor import failed: {e}")
    sys.exit(1)

print("🩺 Starting PrediCare AI Doctor...")

# Check API keys
groq_key = os.environ.get("GROQ_API_KEY")
eleven_key = os.environ.get("ELEVENLABS_API_KEY")  # Fixed the environment variable name
print(f"🔑 GROQ API Key: {'✅ Set' if groq_key else '❌ Missing'}")
print(f"🔑 ElevenLabs API Key: {'✅ Set' if eleven_key else '❌ Missing'}")

system_prompt = """You have to act as a professional doctor, i know you are not but this is for learning purpose. 
            What's in this image?. Do you find anything wrong with it medically? 
            If you make a differential, suggest some remedies for them. Donot add any numbers or special characters in 
            your response. Your response should be in one long paragraph. Also always answer as if you are answering to a real person.
            Donot say 'In the image I see' but say 'With what I see, I think you have ....'
            Dont respond as an AI model in markdown, your answer should mimic that of an actual doctor not an AI bot, 
            Keep your answer concise (max 2 sentences). No preamble, start your answer right away please"""

def process_inputs(audio_filepath, image_filepath):
    try:
        print(f"📝 Processing inputs - Audio: {audio_filepath}, Image: {image_filepath}")
        
        # Handle audio input
        if audio_filepath:
            speech_to_text_output = transcribe_with_groq(
                GROQ_API_KEY=os.environ.get("GROQ_API_KEY"), 
                audio_filepath=audio_filepath,
                stt_model="whisper-large-v3"
            )
            print(f"🎤 Speech to text: {speech_to_text_output}")
        else:
            speech_to_text_output = "No audio provided"

        # Handle the image input
        if image_filepath:
            print("🖼️ Analyzing image...")
            query = system_prompt + speech_to_text_output
            encoded_image = encode_image(image_filepath)
            doctor_response = analyze_image_with_query(
                query=query, 
                encoded_image=encoded_image, 
                model="meta-llama/llama-4-scout-17b-16e-instruct"
            )
            print(f"🩺 Doctor response: {doctor_response[:100]}...")
        else:
            doctor_response = "No image provided for me to analyze"

        # Generate voice response
        try:
            print("🔊 Generating voice response...")
            voice_output_path = "final.mp3"
            
            # Always use gTTS for now (ElevenLabs has restrictions)
            # ElevenLabs free tier is restricted due to abuse detection
            print("🎵 Using Google TTS (gTTS) - reliable and free")
            text_to_speech_with_gtts(input_text=doctor_response, output_filepath=voice_output_path)
            
            return speech_to_text_output, doctor_response, voice_output_path
        except Exception as voice_error:
            print(f"⚠️ Voice generation failed: {voice_error}")
            return speech_to_text_output, doctor_response, None

    except Exception as e:
        error_msg = f"❌ Error processing inputs: {str(e)}"
        print(error_msg)
        traceback.print_exc()
        return "Error in processing", error_msg, None


# Create the Gradio interface
print("🎨 Creating Gradio interface...")

iface = gr.Interface(
    fn=process_inputs,
    inputs=[
        gr.Audio(sources=["microphone"], type="filepath", label="🎤 Record your question"),
        gr.Image(type="filepath", label="🖼️ Upload medical image")
    ],
    outputs=[
        gr.Textbox(label="📝 Speech to Text"),
        gr.Textbox(label="🩺 Doctor's Response"),
        gr.Audio(label="🔊 Voice Response")
    ],
    title="🩺 PrediCare AI Doctor",
    description="AI-powered medical image analysis with voice interaction"
    # Removed the problematic examples line
)

if __name__ == "__main__":
    print("🚀 Launching Gradio interface...")
    try:
        iface.launch(
            debug=True,
            server_name="0.0.0.0",
            server_port=7860,
            share=False
        )
    except Exception as e:
        print(f"❌ Failed to launch: {e}")
        traceback.print_exc()