import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AIDoctorConsole from '../components/AIDoctorConsole';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Stethoscope } from 'lucide-react';

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
                <Stethoscope className="h-4 w-4 text-green-600" />
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

        {/* AI Doctor Console - Main Feature */}
        <section id="ai-doctor" className="py-20 bg-white/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Your Personal <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">AI Doctor</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience advanced medical consultation with our AI-powered doctor featuring medical image analysis, 
                voice responses, and comprehensive health assessments.
              </p>
            </div>
            
            {/* AI Doctor Console */}
            <div className="max-w-6xl mx-auto">
              <AIDoctorConsole />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get started with AI-powered medical consultation in three simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Describe or Upload</h3>
                <p className="text-gray-600">
                  Type your symptoms or upload a medical image for analysis by the AI Doctor.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Analysis</h3>
                <p className="text-gray-600">
                  Our advanced AI Doctor processes your input using state-of-the-art medical knowledge.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Consultation</h3>
                <p className="text-gray-600">
                  Receive detailed medical insights and recommendations with optional voice responses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Showcase */}
        <section className="py-16 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="container mx-auto px-4">
            <div className="text-center text-white mb-12">
              <h2 className="text-3xl font-bold mb-4">Powered by Advanced AI</h2>
              <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                Our AI Doctor integrates cutting-edge medical AI technologies for comprehensive healthcare assistance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  🩺
                </div>
                <h3 className="text-lg font-semibold mb-2">Medical Consultation</h3>
                <p className="text-sm text-indigo-100">
                  Comprehensive medical consultations with AI-powered diagnosis and recommendations.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  🔊
                </div>
                <h3 className="text-lg font-semibold mb-2">Voice Responses</h3>
                <p className="text-sm text-indigo-100">
                  High-quality voice synthesis for natural AI doctor responses and consultations.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  📸
                </div>
                <h3 className="text-lg font-semibold mb-2">Image Analysis</h3>
                <p className="text-sm text-indigo-100">
                  AI-powered medical image analysis for skin conditions, X-rays, and health assessments.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
