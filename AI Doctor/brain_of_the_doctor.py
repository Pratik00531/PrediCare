# if you dont use pipenv uncomment the following:
#from dotenv import load_dotenv
#load_dotenv()

#Step1: Setup GROQ API key
import os

GROQ_API_KEY=os.environ.get("GROQ_API_KEY")

#Step2: Convert image to required format
import base64


#image_path="acne.jpg"

def encode_image(image_path):   
    image_file=open(image_path, "rb")
    return base64.b64encode(image_file.read()).decode('utf-8')

#Step3: Setup Multimodal LLM 
from groq import Groq

query="Is there something wrong with my face?"
#model = "meta-llama/llama-4-maverick-17b-128e-instruct"
model="meta-llama/llama-4-scout-17b-16e-instruct"
#model = "meta-llama/llama-4-scout-17b-16e-instruct"
#model="llama-3.2-90b-vision-preview" #Deprecated

# Available Groq models (updated regularly)
SUPPORTED_VISION_MODELS = [
    "llama-3.2-90b-vision-preview",
    "llama-3.2-11b-vision-preview", 
    "llava-v1.5-7b-4096-preview"
]

SUPPORTED_TEXT_MODELS = [
    "llama-3.1-8b-instant",
    "llama-3.1-70b-versatile", 
    "mixtral-8x7b-32768"
]

def get_best_available_model(model_type="text"):
    """Get the best available model based on type"""
    if model_type == "vision":
        return SUPPORTED_VISION_MODELS[0]  # Return the first (usually best) option
    else:
        return SUPPORTED_TEXT_MODELS[0]

def analyze_image_with_query(query, model, encoded_image):
    client=Groq()  
    
    # Enhanced medical prompt for image analysis
    enhanced_query = f"""As a medical AI assistant, analyze this image and provide a structured response:

**Visual Observation:** [What you can see in the image]
**Possible Condition:** [Potential medical condition or assessment]
**Symptoms:** [Related symptoms to look for]
**Recommendations:** [Suggested actions or treatments]
**Precautions:** [Important safety measures]
**When to Seek Medical Help:** [Signs that require professional consultation]

User's specific question: {query}

Please provide a thorough but accessible analysis while emphasizing the importance of professional medical consultation."""
    
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text", 
                    "text": enhanced_query
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{encoded_image}",
                    },
                },
            ],
        }]
    
    # Use the slower but working model for image analysis
    chat_completion=client.chat.completions.create(
        messages=messages,
        model="meta-llama/llama-4-scout-17b-16e-instruct",  # Back to working 17B model for images
        max_tokens=500,  # Allow longer responses for image analysis
        temperature=0.7
    )

    return chat_completion.choices[0].message.content