import React, { useState, useRef, useCallback } from 'react';
import { MessageCircle, Volume2, ExternalLink, Phone, PhoneOff, Image, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSynthesizeSpeech, useAnalyzeImage } from '@/hooks/use-predicare-api';
import { createAudioUrl } from '@/lib/api-client';

interface Message {
  type: 'user' | 'bot' | 'system';
  content: string;
  audioUrl?: string;
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: 'bot', 
      content: 'Hello! I\'m your AI health assistant. I can help with text-to-speech and medical image analysis. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLiveVoiceChatActive, setIsLiveVoiceChatActive] = useState(false);
  
  // Audio playback
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // API hooks (transcription removed)
  const synthesizeSpeech = useSynthesizeSpeech();
  const analyzeImage = useAnalyzeImage();

  const addMessage = useCallback((type: 'user' | 'bot' | 'system', content: string, audioUrl?: string) => {
    setMessages(prev => [...prev, {
      type,
      content,
      audioUrl,
      timestamp: new Date()
    }]);
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue;
    addMessage('user', userMessage);
    setInputValue('');
    
    // Simulate AI response - in a real app, this would call your AI backend
    setTimeout(async () => {
      const aiResponse = `I understand your concern about "${userMessage}". Based on what you've shared, I recommend consulting with a healthcare professional for a proper diagnosis. I can also help you analyze medical images if you have any.`;
      
      addMessage('bot', aiResponse);
      
      // Convert response to speech if live voice chat is active
      if (isLiveVoiceChatActive) {
        try {
          const result = await synthesizeSpeech.mutateAsync(aiResponse);
          if (result.success && result.audio_base64) {
            const audioUrl = createAudioUrl(result.audio_base64);
            // Update the last message with audio
            setMessages(prev => {
              const updated = [...prev];
              const lastMessage = updated[updated.length - 1];
              if (lastMessage.type === 'bot') {
                lastMessage.audioUrl = audioUrl;
                // Auto-play the response
                setTimeout(() => {
                  if (audioRef.current) {
                    audioRef.current.src = audioUrl;
                    audioRef.current.play();
                  }
                }, 500);
              }
              return updated;
            });
          }
        } catch (error) {
          console.error('Speech synthesis error:', error);
        }
      }
    }, 1000);
  }, [inputValue, addMessage, isLiveVoiceChatActive, synthesizeSpeech]);

  const handleTextToSpeech = useCallback(async (text: string) => {
    try {
      const result = await synthesizeSpeech.mutateAsync(text);
      if (result.success && result.audio_base64) {
        const audioUrl = createAudioUrl(result.audio_base64);
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
          audioRef.current.play();
        }
      }
    } catch (error) {
      console.error('Text-to-speech error:', error);
      // Fallback to browser speech synthesis
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
      }
    }
  }, [synthesizeSpeech]);

  const toggleLiveVoiceChat = useCallback(() => {
    if (isLiveVoiceChatActive) {
      setIsLiveVoiceChatActive(false);
      addMessage('system', 'Live voice chat ended. You can continue typing or start a new voice conversation anytime.');
    } else {
      setIsLiveVoiceChatActive(true);
      addMessage('system', 'Live voice chat started! I\'ll respond with speech to your messages.');
      
      // Welcome message with speech
      const welcomeMessage = 'Live voice chat is now active. How can I help you today?';
      handleTextToSpeech(welcomeMessage);
    }
  }, [isLiveVoiceChatActive, addMessage, handleTextToSpeech]);

  // Handle image uploads via file input
  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      addMessage('user', `Uploaded image: ${file.name}`);
      
      // Analyze the image with a default query
      try {
        const result = await analyzeImage.mutateAsync({
          imageFile: file,
          query: 'Please analyze this medical image and provide insights.'
        });
        if (result.success) {
          addMessage('bot', `Image Analysis: ${result.analysis}`);
        }
      } catch (error) {
        console.error('Image analysis error:', error);
        addMessage('system', 'Error analyzing image. Please try again.');
      }
    }
  }, [analyzeImage, addMessage]);

  return (
    <Card id="chat" className="bg-white/80 backdrop-blur-sm border border-blue-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>AI Health Assistant</span>
          </div>
          <Link to="/chat">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {/* Chat Messages */}
        <div className="h-64 overflow-y-auto mb-4 space-y-3">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : message.type === 'system'
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
                {message.type === 'bot' && (
                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-auto"
                      onClick={() => handleTextToSpeech(message.content)}
                      disabled={synthesizeSpeech.isPending}
                    >
                      {synthesizeSpeech.isPending ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Volume2 className="h-3 w-3" />
                      )}
                    </Button>
                    {message.audioUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-auto"
                        onClick={() => {
                          if (audioRef.current) {
                            audioRef.current.src = message.audioUrl!;
                            audioRef.current.play();
                          }
                        }}
                      >
                        🔊
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Live Voice Chat Toggle */}
        <div className="mb-4 text-center">
          <Button
            onClick={toggleLiveVoiceChat}
            className={`${
              isLiveVoiceChatActive 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-green-500 hover:bg-green-600'
            } text-white px-4 py-2 rounded-full font-medium mr-2`}
            size="sm"
          >
            {isLiveVoiceChatActive ? (
              <>
                <PhoneOff className="h-4 w-4 mr-2" />
                End Voice
              </>
            ) : (
              <>
                <Phone className="h-4 w-4 mr-2" />
                Start Voice
              </>
            )}
          </Button>
          
          {isLiveVoiceChatActive && (
            <span className="text-xs text-green-600">🔴 Voice Active</span>
          )}
        </div>

        {/* Input Controls */}
        <div className="space-y-3">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask about symptoms, treatments, or health concerns..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              className="bg-blue-500 hover:bg-blue-600"
              disabled={!inputValue.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex justify-center space-x-2">
            <Button size="sm" variant="outline" asChild>
              <label className="cursor-pointer">
                <Image className="h-4 w-4 mr-1" />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </Button>
          </div>
        </div>

        {/* API Status */}
        {(synthesizeSpeech.isPending || analyzeImage.isPending) && (
          <Alert className="mt-3 border-blue-200 bg-blue-50">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            <AlertDescription className="text-blue-800">
              Processing with AI Doctor API...
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-3 text-center">
          <Link to="/chat">
            <Button variant="outline" size="sm" className="text-blue-600 border-blue-300 hover:bg-blue-50">
              Open Full Chat Interface
            </Button>
          </Link>
        </div>

        {/* Hidden audio element for playback */}
        <audio ref={audioRef} className="hidden" />
      </CardContent>
    </Card>
  );
};

export default ChatBot;
