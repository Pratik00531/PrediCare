import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MessageCircle, Mic, MicOff, Upload, Image, Send, Loader2, Volume2, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  type: 'user' | 'doctor' | 'system';
  content: string;
  timestamp: Date;
  audioUrl?: string;
  imageUrl?: string;
}

const BACKEND_URL = 'http://localhost:8000'; // FastAPI backend URL

const AIDoctorConsole = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1',
      type: 'doctor', 
      content: 'Hello! I\'m your AI Doctor. I can help you with medical consultations, analyze medical images, and provide voice responses. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<'text' | 'image' | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [responseTime, setResponseTime] = useState<number | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check backend status
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/health`, { 
          method: 'GET',
          mode: 'cors'
        });
        if (response.ok) {
          setBackendStatus('online');
        } else {
          setBackendStatus('offline');
        }
      } catch (error) {
        setBackendStatus('offline');
      }
    };

    checkBackendStatus();
    const interval = setInterval(checkBackendStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const addMessage = useCallback((type: 'user' | 'doctor' | 'system', content: string, audioUrl?: string, imageUrl?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    setMessages(prev => [...prev, {
      id,
      type,
      content,
      audioUrl,
      imageUrl,
      timestamp: new Date()
    }]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !selectedImage) return;
    if (backendStatus !== 'online') {
      addMessage('system', 'Backend is offline. Please make sure the AI Doctor backend is running.');
      return;
    }

    const userMessage = inputValue || 'Image uploaded for analysis';
    addMessage('user', userMessage, undefined, imagePreview || undefined);
    
    setIsLoading(true);
    const currentInput = inputValue;
    const currentImage = selectedImage;
    setInputValue('');
    setSelectedImage(null);
    setImagePreview(null);

    try {
      if (currentImage) {
        // Image analysis with consultation
        setLoadingType('image');
        await handleImageConsultation(currentImage, currentInput);
      } else {
        // Text-only consultation
        setLoadingType('text');
        await handleTextConsultation(currentInput);
      }
    } catch (error) {
      console.error('Error:', error);
      addMessage('system', 'Sorry, I encountered an error while processing your request. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingType(null);
    }
  };

  const handleTextConsultation = async (text: string) => {
    const startTime = Date.now();
    try {
      const formData = new FormData();
      formData.append('message', text);
      formData.append('include_voice', 'false'); // Disable voice for speed

      // Add timeout for faster response handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to get consultation response');
      }

      const result = await response.json();
      const responseTimeMs = Date.now() - startTime;
      setResponseTime(responseTimeMs);
      
      if (result.success) {
        const doctorResponse = result.response;
        addMessage('doctor', doctorResponse);
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        addMessage('system', 'Response timeout. The AI Doctor is taking too long. Please try a shorter question.');
      } else {
        console.error('Text consultation error:', error);
        throw error;
      }
    }
  };

  const handleImageConsultation = async (image: File, query: string) => {
    const startTime = Date.now();
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('query', query || 'Please analyze this medical image');

      // Longer timeout for image analysis (slower model)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout for images

      const response = await fetch(`${BACKEND_URL}/api/analyze-image`, {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to analyze image');
      }

      const result = await response.json();
      const responseTimeMs = Date.now() - startTime;
      setResponseTime(responseTimeMs);
      
      if (result.success) {
        const doctorResponse = result.analysis;
        addMessage('doctor', doctorResponse);
      } else {
        throw new Error(result.error || 'Image analysis failed');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        addMessage('system', 'Image analysis timeout. The analysis is taking longer than expected. Please try with a smaller image or describe what you see.');
      } else {
        console.error('Image consultation error:', error);
        addMessage('system', `Image analysis failed: ${error.message}. Please describe what you see in the image instead.`);
      }
    }
  };

  const base64ToBlob = (base64: string, mimeType: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Voice recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        await handleVoiceInput(audioBlob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      setMediaRecorder(recorder);
      setAudioChunks(chunks);
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      addMessage('system', 'Unable to access microphone. Please check your browser permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleVoiceInput = async (audioBlob: Blob) => {
    setIsLoading(true);
    setLoadingType('text'); // Voice input uses fast text processing
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');

      const response = await fetch(`${BACKEND_URL}/api/speech-to-text`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Speech recognition failed');
      }

      const result = await response.json();
      
      if (result.success && result.transcription) {
        // Add user's voice message
        addMessage('user', result.transcription);
        
        // Process the transcribed text as a consultation
        await handleTextConsultation(result.transcription);
      } else {
        throw new Error(result.error || 'No speech detected');
      }
    } catch (error) {
      console.error('Voice input error:', error);
      addMessage('system', 'Sorry, I couldn\'t understand your voice input. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingType(null);
    }
  };

  // Improved audio playback without crackling
  const playAudio = (audioUrl: string) => {
    if (audioRef.current) {
      // Stop any currently playing audio
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      
      // Set new source and play
      audioRef.current.src = audioUrl;
      audioRef.current.load(); // Ensure proper loading
      
      // Add error handling for audio playback
      audioRef.current.onerror = () => {
        console.error('Audio playback failed');
      };
      
      // Play with proper promise handling
      audioRef.current.play().catch(error => {
        console.error('Audio play failed:', error);
      });
    }
  };

  const getStatusBadge = () => {
    switch (backendStatus) {
      case 'checking':
        return <Badge variant="outline" className="text-yellow-600">Checking...</Badge>;
      case 'online':
        return <Badge variant="default" className="bg-green-500">Online</Badge>;
      case 'offline':
        return <Badge variant="destructive">Offline</Badge>;
      default:
        return null;
    }
  };

  // Format AI response for better medical structure
  const formatDoctorResponse = (response: string): string => {
    let formatted = response;
    
    // Define medical section keywords to format
    const medicalSections = [
      'diagnosis', 'treatment', 'precaution', 'precautions', 'symptoms', 
      'causes', 'recommendations', 'medication', 'prevention', 'prognosis',
      'follow-up', 'immediate care', 'home remedies', 'when to see a doctor',
      'warning signs', 'complications', 'lifestyle changes', 'diet',
      'exercise', 'monitoring', 'red flags', 'emergency signs',
      'visual observation', 'possible condition', 'when to seek medical help',
      'differential diagnosis', 'risk factors', 'management', 'self-care',
      'next steps', 'immediate action', 'consultation needed'
    ];
    
    // First, handle existing markdown bold formatting
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Format medical sections - make them bold and add proper spacing
    medicalSections.forEach(section => {
      const regex = new RegExp(`(^|\\n|<br>)\\s*(${section}[s]?)\\s*:`, 'gi');
      formatted = formatted.replace(regex, '<br><strong>$2:</strong><br>');
    });
    
    // Format numbered lists with proper spacing and indentation
    formatted = formatted.replace(/(\d+\.\s+)/g, '<br>• ');
    
    // Format bullet points with better spacing
    formatted = formatted.replace(/([•\-\*])\s+/g, '<br>• ');
    
    // Handle line breaks
    formatted = formatted.replace(/\n\n/g, '<br><br>');
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Clean up multiple br tags
    formatted = formatted.replace(/(<br\s*\/?>){3,}/g, '<br><br>');
    
    // Remove leading br tags
    formatted = formatted.replace(/^(<br\s*\/?>)+/, '');
    
    // Add spacing after colons in medical sections
    formatted = formatted.replace(/<strong>(.*?):<\/strong><br>/g, '<strong>$1:</strong><br><div style="margin-left: 8px; margin-bottom: 8px;">');
    formatted = formatted.replace(/(<br><strong>|$)/g, '</div>$1');
    
    // Clean up extra divs
    formatted = formatted.replace(/<\/div><\/div>/g, '</div>');
    formatted = formatted.replace(/^<\/div>/, '');
    
    return formatted;
  };

  // Add medical response styling
  const medicalResponseStyles = `
    .medical-response {
      font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
      line-height: 1.7;
      color: #374151;
    }
    .medical-response strong {
      color: #1e40af;
      font-weight: 600;
      display: block;
      margin-top: 16px;
      margin-bottom: 8px;
      font-size: 14px;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 4px;
    }
    .medical-response strong:first-child {
      margin-top: 4px;
    }
    .medical-response div {
      margin-left: 12px;
      padding: 8px 0;
      border-left: 3px solid #dbeafe;
      padding-left: 12px;
      margin-bottom: 8px;
    }
    .medical-response br + strong {
      margin-top: 20px;
    }
  `;

  // Inject styles only once
  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById('medical-response-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'medical-response-styles';
      styleElement.textContent = medicalResponseStyles;
      document.head.appendChild(styleElement);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Stethoscope className="w-6 h-6" />
              <CardTitle className="text-xl font-bold">AI Doctor Console</CardTitle>
              {responseTime && (
                <Badge variant="outline" className="text-xs">
                  ⚡ {(responseTime / 1000).toFixed(1)}s
                </Badge>
              )}
            </div>
            {getStatusBadge()}
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {backendStatus === 'offline' && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                <strong>Backend Offline:</strong> The AI Doctor backend is not running. 
                Please start the backend server to use the consultation features.
                <div className="mt-2 text-sm">
                  Run: <code className="bg-red-100 px-1 rounded">npm run dev:backend</code> or <code className="bg-red-100 px-1 rounded">npm run dev</code>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Messages */}
          <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : message.type === 'doctor'
                    ? 'bg-green-100 text-gray-800 border border-green-200'
                    : 'bg-yellow-100 text-gray-800 border border-yellow-200'
                }`}>
                  {message.imageUrl && (
                    <img src={message.imageUrl} alt="Uploaded" className="max-w-full h-32 object-cover rounded mb-2" />
                  )}
                  {message.type === 'doctor' ? (
                    <div 
                      className="text-sm max-w-none medical-response"
                      dangerouslySetInnerHTML={{ 
                        __html: formatDoctorResponse(message.content) 
                      }} 
                      style={{
                        lineHeight: '1.6',
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                      }}
                    />
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                  {message.audioUrl && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2 p-1 h-auto"
                      onClick={() => playAudio(message.audioUrl!)}
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  )}
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-green-100 text-gray-800 border border-green-200 px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">
                      {loadingType === 'image' 
                        ? 'AI Doctor is analyzing image... (60s max)' 
                        : 'AI Doctor is analyzing... (15s max)'
                      }
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-gray-600">
                    {loadingType === 'image' 
                      ? '🖼️ Using detailed analysis mode for medical images'
                      : '⚡ Using fast response mode for quick answers'
                    }
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-4 p-3 border rounded-lg bg-blue-50">
              <div className="flex items-center gap-3">
                <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Image selected for analysis</p>
                  <p className="text-xs text-gray-600 mt-1">
                    🖼️ Note: Image analysis uses detailed AI model (slower but more accurate)
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Recording indicator */}
          {isRecording && (
            <div className="mb-4 p-3 border rounded-lg bg-red-50 border-red-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-red-800 font-medium">
                  🎤 Recording... Speak clearly and click stop when finished
                </span>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Describe your symptoms or ask a medical question..."
                className="min-h-[60px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                title="Upload Image"
              >
                <Image className="w-4 h-4" />
              </Button>
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="sm"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isLoading || backendStatus !== 'online'}
                title={isRecording ? "Stop Recording" : "Voice Input"}
                className={isRecording ? "animate-pulse" : ""}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || backendStatus !== 'online'}
                size="sm"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />

          <audio 
            ref={audioRef} 
            preload="none"
            controls={false}
            style={{ display: 'none' }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AIDoctorConsole;
