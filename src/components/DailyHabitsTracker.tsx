
import { Card } from '@/components/ui/card';
import { Star, Check } from 'lucide-react';

interface DailyHabit {
  habit: string;
  completed: boolean;
}

interface DailyHabitsTrackerProps {
  habits: DailyHabit[];
}

const DailyHabitsTracker = ({ habits }: DailyHabitsTrackerProps) => {
  return (
    <Card className="p-6 mb-8 bg-theme-blue-50">
      <div className="flex items-center space-x-2 mb-6">
        <Star className="w-5 h-5 text-theme-blue" />
        <h3 className="text-xl font-semibold text-theme-gray-900">Today's Health Habits</h3>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map((item, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
              item.completed ? 'bg-theme-seafoam-100 border border-theme-seafoam' : 'bg-white border border-theme-gray-200'
            }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
              item.completed ? 'bg-theme-seafoam' : 'bg-theme-gray-200'
            }`}>
              {item.completed && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className={`text-sm ${item.completed ? 'text-theme-seafoam-dark' : 'text-theme-gray-700'}`}>
              {item.habit}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DailyHabitsTracker;
