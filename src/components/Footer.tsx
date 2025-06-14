import { Activity, Heart, Mail, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-theme-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-theme-blue to-theme-seafoam rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">PrediCare</span>
            </div>
            <p className="text-theme-gray-400 text-sm leading-relaxed">
              Empowering individuals with AI-driven health insights for a healthier, more preventive approach to healthcare.
            </p>
            <div className="flex space-x-4">
              <button className="text-theme-gray-400 hover:text-white transition-colors duration-200">
                <Github className="w-5 h-5" />
              </button>
              <button className="text-theme-gray-400 hover:text-white transition-colors duration-200">
                <Mail className="w-5 h-5" />
              </button>
              <button className="text-theme-gray-400 hover:text-white transition-colors duration-200">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-theme-gray-400">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Health Assessment</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Risk Predictions</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Personalized Reports</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Health Dashboard</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-theme-gray-400">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Health Articles</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Support Center</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-theme-gray-400">
              <li><a href="#team" className="hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>
        </div>    
      </div>
    </footer>
  );
};

export default Footer;
