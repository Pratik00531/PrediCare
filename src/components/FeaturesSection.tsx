
import { Brain, Heart, Activity, User, Bell, Settings } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning algorithms analyze your health data to predict potential risks with high accuracy.',
      color: 'text-theme-blue'
    },
    {
      icon: User,
      title: 'Personalized Recommendations',
      description: 'Get tailored lifestyle changes, diet suggestions, and preventive measures based on your unique profile.',
      color: 'text-theme-seafoam'
    },
    {
      icon: Heart,
      title: 'Comprehensive Health Analysis',
      description: 'Monitor multiple health aspects including cardiovascular, diabetes, and metabolic risk factors.',
      color: 'text-theme-indigo'
    },
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'Track your health metrics and see how lifestyle changes impact your risk scores over time.',
      color: 'text-theme-blue'
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Receive timely notifications about health checkups, medication reminders, and lifestyle tips.',
      color: 'text-theme-seafoam'
    },
    {
      icon: Settings,
      title: 'Easy Integration',
      description: 'Seamlessly connect with wearables and health apps to automatically sync your health data.',
      color: 'text-theme-indigo'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-theme-gray-900 mb-4">
            Why Choose PrediCare?
          </h2>
          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto">
            Experience the future of preventive healthcare with our comprehensive AI-driven platform designed to keep you healthy and informed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="theme-card p-6 group hover:scale-105 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-lg bg-theme-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-theme-gray-900">
                  {feature.title}
                </h3>
                <p className="text-theme-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
