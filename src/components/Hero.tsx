
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Brain, Users, Sparkles } from 'lucide-react';
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
              <span className="text-sm font-medium text-gray-700">AI-Powered Health Intelligence</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              <span className="block">Predict.</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                Prevent.
              </span>
              <span className="block">Personalize.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              {isLoggedIn ? (
                <>
                  Welcome back! Your AI health assistant is ready to help you 
                  monitor your wellness and provide personalized insights.
                </>
              ) : (
                <>
                  Harness the power of AI to predict potential health risks and receive 
                  personalized preventive care suggestions tailored just for you.
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
                Watch Demo
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
                  <Link to="/chat">
                    <Button variant="outline" className="border-2 border-blue-300 hover:border-blue-500 px-6 py-3 font-semibold rounded-full transition-all duration-300">
                      Start AI Chat
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
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">AI-Powered Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced machine learning algorithms analyze your health data to provide intelligent insights and predictions.
              </p>
            </div>

            <div className="group p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Preventive Care</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized recommendations to prevent health issues before they become serious problems.
              </p>
            </div>

            <div className="group p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Personal Health Coach</h3>
              <p className="text-gray-600 leading-relaxed">
                24/7 AI assistant ready to answer your health questions and guide your wellness journey.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">10K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">95%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-gray-600">AI Support</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">100+</div>
              <div className="text-gray-600">Health Conditions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
