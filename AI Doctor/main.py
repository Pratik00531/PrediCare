"""
PrediCare AI Doctor Backend API
FastAPI server integrating all AI doctor components
"""

from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import uvicorn
import os
import tempfile
import base64
from typing import Optional
import logging
import asyncio
from functools import lru_cache

# Import our AI doctor components
from brain_of_the_doctor import analyze_image_with_query, encode_image
from voice_of_the_doctor import text_to_speech_with_gtts, text_to_speech_with_elevenlabs
from voice_of_the_patient import transcribe_with_groq, record_audio

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="PrediCare AI Doctor API",
    description="Advanced AI-powered medical analysis and voice assistant",
    version="1.0.0"
)

# Add CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8081", "*"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cache for common responses (simple in-memory cache)
response_cache = {}

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "PrediCare AI Doctor API is running!",
        "version": "1.0.0",
        "status": "healthy"
    }

@app.post("/api/analyze-image")
async def analyze_medical_image(
    image: UploadFile = File(...),
    query: str = Form(default="Please analyze this medical image and provide a detailed assessment.")
):
    """
    Analyze medical images using AI vision
    """
    try:
        # Validate image file
        if not image.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Save uploaded image temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
            content = await image.read()
            temp_file.write(content)
            temp_image_path = temp_file.name
        
        # Encode image for AI analysis
        encoded_image = encode_image(temp_image_path)
        
        # Analyze with AI using the reliable 17B model
        model = "meta-llama/llama-4-scout-17b-16e-instruct"  # Use working model for images
        try:
            analysis_result = analyze_image_with_query(query, model, encoded_image)
        except Exception as e:
            logger.error(f"Image analysis failed: {e}")
            # Fallback to text-only analysis
            analysis_result = "I can see an image has been uploaded, but I'm currently unable to analyze it due to technical issues. Please describe what you're seeing in the image, and I'll provide medical guidance based on your description."
        
        # Clean up temporary file
        os.unlink(temp_image_path)
        
        return {
            "success": True,
            "analysis": analysis_result,
            "query_used": query,
            "model": model
        }
        
    except Exception as e:
        logger.error(f"Error analyzing image: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.post("/api/text-to-speech")
async def convert_text_to_speech(
    text: str = Form(...),
    voice_provider: str = Form(default="gtts")  # "gtts" or "elevenlabs"
):
    """
    Convert text to speech audio
    """
    try:
        # Create temporary audio file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
            audio_path = temp_file.name
        
        # Generate audio based on provider
        if voice_provider == "elevenlabs":
            text_to_speech_with_elevenlabs(text, audio_path)
        else:
            text_to_speech_with_gtts(text, audio_path)
        
        # Return audio file
        return FileResponse(
            audio_path,
            media_type="audio/mpeg",
            filename="doctor_voice.mp3"
        )
        
    except Exception as e:
        logger.error(f"Error generating speech: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Speech generation failed: {str(e)}")

@app.post("/api/speech-to-text")
async def convert_speech_to_text(
    audio: UploadFile = File(...)
):
    """
    Convert speech audio to text
    """
    try:
        # Validate audio file
        if not audio.content_type.startswith('audio/'):
            raise HTTPException(status_code=400, detail="File must be an audio file")
        
        # Save uploaded audio temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
            content = await audio.read()
            temp_file.write(content)
            temp_audio_path = temp_file.name
        
        # Transcribe with GROQ
        stt_model = "whisper-large-v3"
        groq_api_key = os.environ.get("GROQ_API_KEY")
        transcription = transcribe_with_groq(stt_model, temp_audio_path, groq_api_key)
        
        # Clean up temporary file
        os.unlink(temp_audio_path)
        
        return {
            "success": True,
            "transcription": transcription,
            "model": stt_model
        }
        
    except Exception as e:
        logger.error(f"Error transcribing audio: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")

@app.post("/api/chat")
async def chat_with_ai_doctor(
    message: str = Form(...),
    include_voice: bool = Form(default=False)
):
    """
    Chat with AI doctor (text-based medical consultation)
    """
    try:
        # For now, we'll use the same GROQ model for text chat
        # You can extend this to have specialized medical chat logic
        from groq import Groq
        
        client = Groq()
        
        # Create a concise medical prompt for faster responses
        system_prompt = """You are a medical AI assistant. Provide CONCISE, structured medical information in this format:

**Diagnosis:** [Brief assessment]
**Symptoms:** [Key symptoms list]
**Treatment:** [Main treatment options] 
**Precautions:** [Important warnings]
**When to See Doctor:** [Urgent signs]

Keep responses under 200 words. Be direct and professional."""
        
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",  # Much faster model
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message}
            ],
            max_tokens=300,  # Limit response length for speed
            temperature=0.7  # Balanced creativity/consistency
        )
        
        ai_response = response.choices[0].message.content
        
        result = {
            "success": True,
            "response": ai_response,
            "message_received": message
        }
        
        # Optionally include voice response (disabled by default for speed)
        if include_voice:
            try:
                with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
                    audio_path = temp_file.name
                
                text_to_speech_with_gtts(ai_response, audio_path)
                result["audio_file"] = audio_path
            except Exception as e:
                logger.warning(f"Voice generation failed: {e}")
                # Continue without voice if it fails
        
        return result
        
    except Exception as e:
        logger.error(f"Error in AI chat: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Chat failed: {str(e)}")

@app.get("/api/health")
async def health_check():
    """Detailed health check with component status"""
    try:
        # Check if required environment variables are set
        groq_api_key = os.environ.get("GROQ_API_KEY")
        eleven_api_key = os.environ.get("ELEVEN_API_KEY")
        
        return {
            "status": "healthy",
            "components": {
                "groq_api": "configured" if groq_api_key else "missing_key",
                "elevenlabs_api": "configured" if eleven_api_key else "missing_key",
                "image_analysis": "available",
                "speech_to_text": "available",
                "text_to_speech": "available",
                "chat": "available"
            },
            "endpoints": [
                "/api/analyze-image",
                "/api/text-to-speech", 
                "/api/speech-to-text",
                "/api/chat",
                "/api/health"
            ]
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    # Run the server
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
