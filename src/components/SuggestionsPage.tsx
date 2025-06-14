import { Button } from '@/components/ui/button';
import { Activity, Heart, User, Download } from 'lucide-react';
import DailyHabitsTracker from './DailyHabitsTracker';
import SuggestionCategory from './SuggestionCategory';
const SuggestionsPage = () => {
  const suggestions = [{
    category: 'Lifestyle Changes',
    icon: Activity,
    color: 'text-theme-blue',
    bgColor: 'bg-theme-blue-100',
    cardBgColor: 'bg-theme-blue-50',
    items: [{
      title: 'Increase Daily Steps',
      description: 'Aim for 8,000-10,000 steps daily to improve cardiovascular health',
      priority: 'High',
      timeline: '2-4 weeks',
      status: 'recommended'
    }, {
      title: 'Reduce Screen Time',
      description: 'Limit screen time to 2 hours daily for better sleep quality',
      priority: 'Medium',
      timeline: '1-2 weeks',
      status: 'in-progress'
    }, {
      title: 'Practice Stress Management',
      description: 'Try meditation or deep breathing exercises for 10 minutes daily',
      priority: 'High',
      timeline: '1 week',
      status: 'recommended'
    }]
  }, {
    category: 'Diet Recommendations',
    icon: Heart,
    color: 'text-theme-seafoam',
    bgColor: 'bg-theme-seafoam-100',
    cardBgColor: 'bg-theme-seafoam-50',
    items: [{
      title: 'Increase Fiber Intake',
      description: 'Add 25-30g of fiber daily through fruits, vegetables, and whole grains',
      priority: 'High',
      timeline: '1-2 weeks',
      status: 'recommended'
    }, {
      title: 'Reduce Processed Foods',
      description: 'Limit processed foods to less than 20% of daily caloric intake',
      priority: 'Medium',
      timeline: '2-3 weeks',
      status: 'recommended'
    }, {
      title: 'Omega-3 Rich Foods',
      description: 'Include fish, walnuts, or flaxseeds 2-3 times per week',
      priority: 'Medium',
      timeline: '1 week',
      status: 'completed'
    }]
  }, {
    category: 'Medical Tests',
    icon: User,
    color: 'text-theme-indigo',
    bgColor: 'bg-theme-indigo-100',
    cardBgColor: 'bg-theme-indigo-50',
    items: [{
      title: 'HbA1c Test',
      description: 'Check blood sugar levels - recommended every 6 months',
      priority: 'High',
      timeline: 'Schedule now',
      status: 'urgent'
    }, {
      title: 'Lipid Profile',
      description: 'Monitor cholesterol levels - due for annual checkup',
      priority: 'Medium',
      timeline: '1-2 months',
      status: 'recommended'
    }, {
      title: 'Blood Pressure Monitoring',
      description: 'Weekly home monitoring recommended',
      priority: 'Medium',
      timeline: 'Ongoing',
      status: 'in-progress'
    }]
  }];
  const dailyHabits = [{
    habit: 'Morning walk (30 minutes)',
    completed: true
  }, {
    habit: 'Drink 8 glasses of water',
    completed: true
  }, {
    habit: 'Eat 5 servings of fruits/vegetables',
    completed: false
  }, {
    habit: 'Limit sugar intake',
    completed: true
  }, {
    habit: '7-8 hours of sleep',
    completed: false
  }, {
    habit: '10 minutes meditation',
    completed: false
  }];
  return <section className="py-16 bg-theme-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-theme-gray-900 mb-4">
            Personalized Health Recommendations
          </h2>
          <p className="text-xl text-theme-gray-600">
            AI-curated suggestions based on your unique health profile
          </p>
        </div>

        <DailyHabitsTracker habits={dailyHabits} />

        {suggestions.map((category, categoryIndex) => <SuggestionCategory key={categoryIndex} category={category.category} icon={category.icon} color={category.color} bgColor={category.bgColor} cardBgColor={category.cardBgColor} items={category.items} />)}

        <div className="text-center space-x-4">
          <Button className="bg-theme-blue hover:bg-theme-blue-dark text-white">
            Track Progress
          </Button>
          <Button variant="outline" className="border-theme-blue text-theme-blue hover:text-white bg-[#3984ff]">
            <Download className="w-4 h-4 mr-2" />
            Download PDF Report
          </Button>
        </div>
      </div>
    </section>;
};
export default SuggestionsPage;