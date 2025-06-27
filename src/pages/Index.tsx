import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ChatBot from '../components/ChatBot';
import HealthDashboard from '../components/HealthDashboard';
import VoiceAssistant from '../components/VoiceAssistant';
import ImageUpload from '../components/ImageUpload';
import ApiSettings from '../components/ApiSettings';
import { predicareClient } from '../lib/api-client';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TestTube } from 'lucide-react';

const Index = () => {
  const { isLoggedIn, user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      <main>
        <Hero />
        
        {/* Authentication & Profile Status */}
        {isLoggedIn && !user?.profileCompleted && (
          <section className="py-4 bg-green-50">
            <div className="container mx-auto px-4">
              <Alert className="max-w-4xl mx-auto border-green-200 bg-green-50">
                <TestTube className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Welcome!</strong> Complete your health profile to unlock personalized AI recommendations.
                  <Link to="/profile" className="underline font-medium ml-2">
                    Complete your profile now →
                  </Link>
                </AlertDescription>
              </Alert>
            </div>
          </section>
        )}
        
        {/* Mock Mode Notification */}
        {predicareClient.isMockMode() && (
          <section className="py-4 bg-blue-50">
            <div className="container mx-auto px-4">
              <Alert className="max-w-4xl mx-auto border-blue-200 bg-blue-50">
                <TestTube className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Demo Mode Active:</strong> The application is running in mock mode with simulated AI responses. 
                  All features are fully functional for testing.
                  {!isLoggedIn && (
                    <Link to="/signup" className="underline font-medium ml-2">
                      Sign up to get started →
                    </Link>
                  )}
                </AlertDescription>
              </Alert>
            </div>
          </section>
        )}
        
        {/* Main Features Section */}
        <section id="features" className="py-20 bg-white/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Your Health, <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Intelligently Managed</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the future of healthcare with our AI-powered platform featuring text-to-speech, 
                medical image analysis, health data tracking, and comprehensive AI consultations.
              </p>
            </div>
            
            {/* Health Dashboard - Full Width */}
            <div className="mb-12 max-w-7xl mx-auto">
              <HealthDashboard />
            </div>
            
            {/* Main AI Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-12">
              <div className="space-y-8">
                <ChatBot />
                <VoiceAssistant />
              </div>
              <div className="space-y-8">
                <ImageUpload />
              </div>
            </div>
          </div>
        </section>

        {/* API Features Showcase */}
        <section className="py-16 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="container mx-auto px-4">
            <div className="text-center text-white mb-12">
              <h2 className="text-3xl font-bold mb-4">Powered by Advanced AI</h2>
              <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                Our platform integrates cutting-edge AI technologies to provide comprehensive healthcare assistance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  📊
                </div>
                <h3 className="text-lg font-semibold mb-2">Health Tracking</h3>
                <p className="text-sm text-indigo-100">
                  Monitor your health metrics including steps, sleep, calories, and heart rate with mobile integration.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  🔊
                </div>
                <h3 className="text-lg font-semibold mb-2">Text-to-Speech</h3>
                <p className="text-sm text-indigo-100">
                  High-quality speech synthesis with ElevenLabs for natural AI responses.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  📸
                </div>
                <h3 className="text-lg font-semibold mb-2">Image Analysis</h3>
                <p className="text-sm text-indigo-100">
                  AI-powered medical image analysis for skin conditions and health assessments.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  🩺
                </div>
                <h3 className="text-lg font-semibold mb-2">AI Consultation</h3>
                <p className="text-sm text-indigo-100">
                  Complete medical consultations combining image analysis with expert AI guidance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get started with AI-powered healthcare in three simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Choose Your Method</h3>
                <p className="text-gray-600">
                  Select text chat, image upload, or text-to-speech to interact with our AI doctor.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Analysis</h3>
                <p className="text-gray-600">
                  Our advanced AI processes your input using state-of-the-art medical knowledge.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Insights</h3>
                <p className="text-gray-600">
                  Receive personalized health insights and recommendations with voice responses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* API Settings and Notifications */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">API Settings</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Configure your API settings and manage mock mode for testing.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto mb-12">
              <ApiSettings />
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg max-w-3xl mx-auto">
              <div className="flex">
                <div className="flex-shrink-0">
                  <TestTube className="h-6 w-6 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-yellow-800">
                    Mock Mode Active
                  </p>
                  <p className="mt-1 text-sm text-yellow-700">
                    You are currently in mock mode. API calls will not affect real data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
