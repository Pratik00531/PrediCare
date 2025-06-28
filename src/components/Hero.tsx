
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Stethoscope, Brain, Image, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Hero = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <section className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">AI Doctor - Advanced Medical Consultation</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              <span className="block">Your Personal</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                AI Doctor
              </span>
              <span className="block">Is Here</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              {isLoggedIn ? (
                <>
                  Welcome back! Your AI Doctor is ready to provide medical consultations, 
                  analyze medical images, and offer personalized health guidance.
                </>
              ) : (
                <>
                  Experience advanced medical consultation with AI-powered diagnosis, 
                  medical image analysis, and voice-enabled health assistance.
                </>
              )}
            </p>
          </div>

          {/* CTA Buttons - Hide when logged in */}
          {!isLoggedIn && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/login">
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" className="border-2 border-gray-300 hover:border-blue-500 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300">
                <a href="#ai-doctor">View AI Doctor</a>
              </Button>
            </div>
          )}

          {/* Welcome message for logged in users */}
          {isLoggedIn && (
            <div className="mb-16">
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-100 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Welcome back, {user?.email}!
                </h2>
                <p className="text-gray-600 mb-6">
                  {user?.profileCompleted ? (
                    "Your health dashboard is ready. Explore your personalized insights below."
                  ) : (
                    "Complete your profile to unlock personalized health insights."
                  )}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {!user?.profileCompleted && (
                    <Link to="/profile">
                      <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-3 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                        Complete Profile
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  <Link to="#ai-doctor">
                    <Button variant="outline" className="border-2 border-blue-300 hover:border-blue-500 px-6 py-3 font-semibold rounded-full transition-all duration-300">
                      Start AI Consultation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform duration-300">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Medical Consultation</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive medical consultations with AI-powered diagnosis and personalized treatment recommendations.
              </p>
            </div>

            <div className="group p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform duration-300">
                <Image className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Medical Image Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced AI analysis of medical images including X-rays, skin conditions, and other diagnostic imagery.
              </p>
            </div>

            <div className="group p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform duration-300">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Voice-Enabled Responses</h3>
              <p className="text-gray-600 leading-relaxed">
                Natural voice synthesis for AI doctor responses, making consultations more interactive and accessible.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-gray-600">AI Doctor Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">95%</div>
              <div className="text-gray-600">Diagnostic Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">Voice</div>
              <div className="text-gray-600">Enabled Responses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">100+</div>
              <div className="text-gray-600">Medical Conditions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
