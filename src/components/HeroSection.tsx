import { Button } from '@/components/ui/button';
import { Activity, Brain, Heart, User } from 'lucide-react';
const HeroSection = () => {
  return <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-theme-gray-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-theme-gray-900 leading-tight">
                Predict. Prevent.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-theme-blue via-theme-seafoam to-theme-indigo">
                  Personalize.
                </span>
              </h1>
              <p className="text-xl text-theme-gray-600 leading-relaxed">
                Harness the power of AI to predict potential health risks and receive personalized preventive care suggestions tailored just for you.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-theme-blue hover:bg-theme-blue-dark text-white text-lg py-4 px-8 font-medium rounded-lg transition-all duration-200">
                Start Your Assessment
              </Button>
              <Button variant="outline" className="border-2 border-theme-seafoam text-lg py-4 px-8 font-medium rounded-lg transition-all duration-200 text-[#354496] bg-[#9fb1e7]">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-theme-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-theme-blue">95%</div>
                <div className="text-sm text-theme-gray-600">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-theme-seafoam">50K+</div>
                <div className="text-sm text-theme-gray-600">Assessments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-theme-indigo">24/7</div>
                <div className="text-sm text-theme-gray-600">Monitoring</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-scale-in">
            <div className="bg-white rounded-xl shadow-sm border border-theme-gray-200 hover:shadow-md transition-all duration-200 p-8 max-w-md mx-auto">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-theme-blue via-theme-seafoam to-theme-indigo rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-theme-gray-900">AI Health Analysis</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-theme-seafoam-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Heart className="w-5 h-5 text-theme-seafoam" />
                      <span className="text-sm font-medium">Heart Health</span>
                    </div>
                    <div className="text-sm font-semibold text-theme-seafoam-700">Low Risk</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-theme-indigo-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Activity className="w-5 h-5 text-theme-indigo" />
                      <span className="text-sm font-medium">Diabetes</span>
                    </div>
                    <div className="text-sm font-semibold text-theme-indigo-700">Medium Risk</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-theme-blue-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-theme-blue" />
                      <span className="text-sm font-medium">Overall Score</span>
                    </div>
                    <div className="text-sm font-semibold text-theme-blue-700">8.2/10</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-theme-seafoam rounded-full flex items-center justify-center animate-pulse">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-theme-indigo rounded-full flex items-center justify-center animate-pulse">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;