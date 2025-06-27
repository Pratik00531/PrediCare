
import React, { useState, useRef } from 'react';
import { MessageCircle, Volume2, Mic, MicOff, Upload, Image, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';

const ChatPageContent = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hello! I\'m your AI health assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', content: inputValue }]);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'I understand your concern. Based on the symptoms you\'ve described, I recommend consulting with a healthcare professional for a proper diagnosis. In the meantime, here are some general suggestions...'
      }]);
    }, 1000);
    
    setInputValue('');
  };

  const handleTextToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      analyzeImage(file);
    }
  };

  const analyzeImage = (file: File) => {
    setIsAnalyzing(true);
    setMessages(prev => [...prev, { 
      type: 'user', 
      content: `Uploaded image: ${file.name}` 
    }]);
    
    // Simulate AI image analysis
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'I can see the uploaded image. Based on my analysis, this appears to be a skin condition with some redness and texture changes. I recommend consulting with a dermatologist for proper diagnosis and treatment. In the meantime, keep the area clean and avoid irritation.'
      }]);
      setIsAnalyzing(false);
      setSelectedImage(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border border-blue-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-6 w-6" />
              <span>AI Health Assistant - Full Chat</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-96 overflow-y-auto mb-6 space-y-4 border rounded-lg p-4 bg-gray-50">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-4 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-800 shadow-sm border'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    {message.type === 'bot' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 p-1 h-auto"
                        onClick={() => handleTextToSpeech(message.content)}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              {isAnalyzing && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 shadow-sm border p-4 rounded-lg">
                    <p className="text-sm">Analyzing your image...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload Image</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={isListening ? stopListening : startListening}
                  className={`flex items-center space-x-2 ${
                    isListening ? 'bg-red-100 border-red-300' : ''
                  }`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="h-4 w-4" />
                      <span>Stop Listening</span>
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4" />
                      <span>Voice Input</span>
                    </>
                  )}
                </Button>
              </div>

              <div className="flex space-x-2">
                <Input
                  placeholder="Ask about symptoms, treatments, or health concerns..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600">
                  Send
                </Button>
              </div>

              {isListening && (
                <div className="text-center">
                  <p className="text-sm text-blue-600 animate-pulse">
                    Listening... Speak now!
                  </p>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ChatPage = () => {
  return (
    <ProtectedRoute>
      <ChatPageContent />
    </ProtectedRoute>
  );
};

export default ChatPage;
