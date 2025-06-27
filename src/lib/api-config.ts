// API Configuration and Mock Data for Testing (Transcription removed)
import { 
  AnalysisResponse, 
  SynthesisResponse, 
  ConsultationResponse, 
  HealthResponse 
} from './api-client';

// API Configuration
export const API_CONFIG = {
  LIVE_API_URL: 'https://ai-doctor-2-0-voice-and-vision-eie6kt0pe.vercel.app',
  ENABLE_MOCK_MODE: true, // Set to false when you have API access
  MOCK_DELAY: 1500, // Simulate API response time
};

// Enhanced mock responses with variety
const getRandomAnalysisResponse = (query: string): string => {
  const responses = [
    `## Advanced Dermatological Analysis

**Query:** ${query}

### AI-Powered Visual Assessment
Using computer vision and medical AI, the following findings were identified:

**Primary Diagnosis Candidates:**
1. **Seborrheic Keratosis** (Confidence: 82%)
   - Benign hyperkeratotic lesion
   - Characteristic "stuck-on" appearance
   - Age-related skin change, typically harmless

2. **Solar Lentigo** (Confidence: 15%)
   - Age spot related to sun exposure
   - Flat, brown pigmented lesion
   - Generally benign but monitor for changes

3. **Melanocytic Nevus** (Confidence: 3%)
   - Common mole
   - Requires monitoring using ABCDE criteria

### Clinical Recommendations
🔴 **Priority Actions:**
- Dermatological consultation within 3-4 weeks
- Baseline photography for monitoring
- Avoid trauma to the lesion

💡 **Preventive Care:**
- Daily SPF 50+ broad-spectrum sunscreen
- Monthly skin self-examinations
- Annual professional skin screenings after age 40

### Risk Factors Assessment
- Sun exposure history: Moderate risk
- Family history: Consider genetic counseling if positive
- Skin type: Monitor based on Fitzpatrick classification

**Medical AI Confidence Score: 94.2%**`,

    `## Comprehensive Skin Lesion Analysis

**Clinical Query:** ${query}

### Advanced Medical Imaging Assessment
AI analysis reveals the following characteristics:

**Morphological Features:**
- **Border:** Irregular with some asymmetry noted
- **Color:** Variegated brown pigmentation
- **Diameter:** 6-8mm (requires monitoring)
- **Evolution:** Patient-reported growth concerning

**Differential Diagnosis:**
1. **Atypical Nevus/Dysplastic Mole** (68% probability)
   - Irregular pigmented lesion
   - Higher malignant potential
   - Requires histopathological evaluation

2. **Early Melanoma in Situ** (25% probability)
   - Confined to epidermis
   - Excellent prognosis with early detection
   - Urgent dermatological referral needed

3. **Compound Nevus with Irritation** (7% probability)
   - Benign but inflamed
   - May mimic malignancy

### Immediate Action Plan
⚠️ **Urgent (Within 1 week):**
- Schedule emergency dermatology consultation
- Avoid sun exposure to lesion
- Document with high-resolution photography

🔬 **Diagnostic Workup:**
- Digital dermoscopy recommended
- Possible excisional biopsy
- Sentinel lymph node assessment if indicated

### Symptom Surveillance
Monitor for:
- Bleeding or crusting
- Rapid size changes (>20% in 4 weeks)
- New satellite lesions
- Persistent itching or pain

**AI Diagnostic Confidence: 87.3%**`,

    `## Medical Image Analysis Report

**Patient Query:** ${query}

### Algorithmic Assessment Results
Utilizing advanced medical AI trained on 500K+ dermatological cases:

**Visual Pattern Recognition:**
- **Asymmetry Score:** 6.2/10 (moderate concern)
- **Border Irregularity:** 4.8/10 (mild-moderate)
- **Color Variation:** 7.1/10 (significant)
- **Diameter:** 6.5mm (monitoring threshold)

**Probabilistic Diagnosis:**
1. **Actinic Keratosis** (56% likelihood)
   - Precancerous lesion from sun damage
   - Scaly, rough texture typical
   - Treatment options: topical therapy, cryotherapy

2. **Squamous Cell Carcinoma in Situ** (32% likelihood)
   - Non-invasive skin cancer
   - Requires prompt treatment
   - Excellent cure rate with early intervention

3. **Inflammatory Dermatosis** (12% likelihood)
   - Benign inflammatory condition
   - May resolve with appropriate care

### Treatment Pathway
📋 **Standard Protocol:**
- Biopsy for definitive diagnosis
- Staging if malignancy confirmed
- Multidisciplinary team review

🏥 **Specialist Referral:**
- Mohs micrographic surgery consultation
- Medical oncology if advanced
- Radiation oncology if indicated

### Patient Education Points
- Understanding of diagnosis and prognosis
- Treatment options and side effects
- Follow-up care requirements
- Lifestyle modifications for prevention

**Medical AI Analysis Score: 91.7%**`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

const getRandomTranscription = (): string => {
  const transcriptions = [
    "Doctor, I've been experiencing some unusual changes in my skin. There's this dark spot on my back that seems to have grown larger over the past few months. It's about the size of a pencil eraser now, and the edges look a bit irregular. Sometimes it feels itchy, and I'm worried it might be something serious. My family has a history of skin cancer, so I wanted to get it checked out. The spot is mostly brown but has some darker areas within it. Should I be concerned about this?",
    
    "Hi doctor, I'm calling about this mole on my arm that I've had for years, but recently my wife noticed it's gotten darker and bigger. It used to be just a small brown dot, but now it's almost black in some areas and about the size of a dime. It doesn't hurt, but sometimes it gets itchy, especially when I'm in the sun. I work outdoors a lot as a construction worker, so I'm exposed to sun daily. My grandfather had melanoma, so I'm really worried this could be something bad.",
    
    "Good morning, I wanted to discuss this skin lesion I found on my shoulder last month. It appeared quite suddenly and has been growing steadily. It's raised, has an irregular shape, and the color varies from light brown to almost black. It bleeds easily when I accidentally scratch it, and it's been getting more tender lately. I've never had anything like this before, and at 55, I'm concerned it could be cancerous. What should I do?",
    
    "Doctor, I have a question about this spot on my leg. My dermatologist couldn't see me for another month, but I'm getting worried because it's changed so much in just the past few weeks. It started as a small pink patch, but now it's gotten much larger, darker, and has developed this crusty surface. Sometimes it burns or stings, and yesterday I noticed it was bleeding a little bit. Given my fair skin and history of sunburns, should I be seeking urgent care?",
    
    "Hi, I'm calling about a skin concern. I have this growth on my face near my nose that's been there for about six months. Initially, I thought it was just a pimple that wouldn't heal, but it's gotten larger and now has this pearly appearance with some visible blood vessels. It bleeds when I shave, and it's becoming more noticeable. My friend said it looks like what her father had, which turned out to be skin cancer. I'm 45 and have had a lot of sun exposure over the years."
  ];
  
  return transcriptions[Math.floor(Math.random() * transcriptions.length)];
};

const getRandomConsultation = (query: string): string => {
  const consultations = [
    `## AI Medical Consultation

**Your Question:** "${query}"

### Comprehensive Analysis
Based on your query and any uploaded medical images, I've conducted a thorough analysis using advanced medical AI algorithms.

### Diagnostic Insights
🔍 **Primary Observations:**
- The presented condition shows characteristics consistent with common dermatological findings
- No immediate emergency indicators detected
- Condition appears to be in early to moderate stage

### Risk Stratification
📊 **Risk Level:** Moderate (requires professional evaluation)
- **Urgency:** Non-emergency, but timely consultation recommended
- **Complexity:** Standard dermatological case
- **Prognosis:** Generally favorable with proper treatment

### Detailed Recommendations

**🏥 Medical Care:**
1. **Primary Action:** Schedule dermatologist appointment within 2-3 weeks
2. **Preparation:** Document any changes, symptoms, or triggers
3. **Questions to Ask:** Family history, previous treatments, lifestyle factors

**💊 Immediate Care:**
- Keep area clean and dry
- Avoid harsh chemicals or aggressive scrubbing
- Apply gentle, fragrance-free moisturizer
- Avoid picking or scratching the area

**🛡️ Preventive Measures:**
- **Sun Protection:** Daily broad-spectrum SPF 30+ sunscreen
- **Skin Hygiene:** Gentle cleansing with mild soap
- **Monitoring:** Weekly self-examinations for changes
- **Photography:** Take weekly photos for comparison

### Symptom Monitoring Guide

**🚨 Seek Immediate Care If:**
- Rapid size increase (>2mm in 2 weeks)
- Bleeding that doesn't stop
- Severe pain or burning sensation
- Signs of infection (pus, red streaking)

**📋 Track These Changes:**
- Size and shape variations
- Color changes or new pigmentation
- Texture modifications (roughness, scaling)
- Associated symptoms (itching, tenderness)

### Lifestyle Modifications
- **Diet:** Increase antioxidant-rich foods (berries, leafy greens)
- **Hydration:** Maintain adequate water intake (8-10 glasses daily)
- **Sleep:** Ensure 7-9 hours for optimal healing
- **Stress Management:** Practice relaxation techniques

### Expected Timeline
- **Initial Consultation:** 2-3 weeks
- **Follow-up:** 4-6 weeks post-consultation
- **Monitoring Period:** 3-6 months depending on findings

**📞 Emergency Contact:** If you experience any concerning symptoms, contact your healthcare provider immediately.

---
*This consultation demonstrates the comprehensive analysis provided by the AI Doctor system. In production, this analysis is powered by advanced medical AI models trained on extensive clinical data and medical literature.*`,

    `## Expert Medical Consultation Report

**Clinical Question:** "${query}"

### AI-Powered Assessment
Leveraging machine learning models trained on millions of medical cases:

### Primary Assessment
**Clinical Presentation Analysis:**
- Lesion morphology suggests benign vs. malignant characteristics
- Patient history and risk factors evaluated
- Imaging analysis completed with 96.3% confidence

**Diagnostic Considerations:**
1. **Most Likely Diagnosis:** Seborrheic Keratosis (72% probability)
   - Age-related benign growth
   - Classic "stuck-on" appearance
   - No malignant transformation risk

2. **Alternative Diagnosis:** Solar Lentigo (23% probability)
   - Sun damage related pigmentation
   - Flat, well-demarcated borders
   - Requires sun protection measures

3. **Concerning Possibility:** Melanoma (5% probability)
   - Requires immediate evaluation
   - Early detection crucial for outcomes

### Evidence-Based Recommendations

**Immediate Management:**
- Professional dermatological evaluation within 2 weeks
- High-resolution photography for baseline documentation
- Avoid manipulation or trauma to lesion

**Diagnostic Testing:**
- Digital dermoscopy recommended
- Possible shave or punch biopsy
- Histopathological examination if indicated

**Follow-Up Protocol:**
- 3-month follow-up imaging
- Annual full-body skin examination
- Patient education on self-monitoring

### Risk Mitigation Strategies
- **Primary Prevention:** Daily SPF 50+ application
- **Secondary Prevention:** Monthly skin self-examinations
- **Tertiary Prevention:** Professional screening based on risk factors

**Medical AI Certainty Level: 94.7%**`
  ];
  
  return consultations[Math.floor(Math.random() * consultations.length)];
};

// Mock responses for testing (transcription removed)
export const mockResponses = {
  health: (): HealthResponse => ({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    groq_status: 'operational',
    elevenlabs_status: 'operational'
  }),

  analysis: (query: string): AnalysisResponse => ({
    analysis: getRandomAnalysisResponse(query),
    success: true,
    message: 'Advanced medical image analysis completed (Mock Mode - Computer Vision AI)'
  }),

  synthesis: (text: string): SynthesisResponse => ({
    // This is a base64 encoded short audio file - in production this would be generated from ElevenLabs
    audio_base64: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmYZBDODzPLZeAEBAAg=',
    success: true,
    message: `Professional AI voice synthesis completed for ${text.length} characters (Mock Mode - ElevenLabs)`
  }),

  consultation: (query: string): ConsultationResponse => ({
    query: query,
    analysis: getRandomConsultation(query),
    success: true,
    message: 'Comprehensive medical consultation completed (Mock Mode - Medical AI)'
  })
};

// Utility to simulate API delays
export const simulateApiDelay = (ms: number = API_CONFIG.MOCK_DELAY): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
