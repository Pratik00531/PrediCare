import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, Activity, TrendingUp, Calendar, Download, ChevronLeft, ChevronRight, Target, Clock, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
const healthMetrics = [{
  title: 'Heart Rate',
  value: '72',
  unit: 'bpm',
  change: '+2%',
  icon: Heart,
  color: 'bg-theme-blue-100 text-theme-blue-700'
}, {
  title: 'Daily Activity',
  value: '8,500',
  unit: 'steps',
  change: '+10%',
  icon: Activity,
  color: 'bg-theme-seafoam-100 text-theme-seafoam-700'
}, {
  title: 'Sleep Quality',
  value: '8',
  unit: 'hours',
  change: '-1%',
  icon: Clock,
  color: 'bg-theme-indigo-100 text-theme-indigo-700'
}, {
  title: 'Weight',
  value: '150',
  unit: 'lbs',
  change: '-0.5%',
  icon: TrendingUp,
  color: 'bg-theme-gray-100 text-theme-gray-700'
}];
const healthTrends = [{
  date: 'Jan',
  score: 70
}, {
  date: 'Feb',
  score: 72
}, {
  date: 'Mar',
  score: 75
}, {
  date: 'Apr',
  score: 73
}, {
  date: 'May',
  score: 78
}];
const activityData = [{
  name: 'Walking',
  value: 400,
  color: '#3B82F6'
}, {
  name: 'Running',
  value: 300,
  color: '#A8D5BA'
}, {
  name: 'Yoga',
  value: 300,
  color: '#A9A9D9'
}, {
  name: 'Swimming',
  value: 200,
  color: '#60A5FA'
}];
const goals = [{
  title: 'Drink Water',
  progress: 60,
  description: 'Reach 8 glasses of water per day',
  icon: Target,
  color: 'bg-theme-blue-100 text-theme-blue-700'
}, {
  title: 'Daily Exercise',
  progress: 80,
  description: 'Complete 30 minutes of exercise',
  icon: Activity,
  color: 'bg-theme-seafoam-100 text-theme-seafoam-700'
}];
const achievements = [{
  title: '7-Day Workout Streak',
  description: 'Maintained a consistent workout routine for 7 days.',
  date: 'May 15'
}, {
  title: 'Improved Sleep',
  description: 'Increased average sleep duration by 30 minutes.',
  date: 'May 10'
}];
const weeklyData = [{
  day: 'Mon',
  steps: 4000,
  calories: 2000
}, {
  day: 'Tue',
  steps: 3000,
  calories: 1800
}, {
  day: 'Wed',
  steps: 2000,
  calories: 1500
}, {
  day: 'Thu',
  steps: 2780,
  calories: 2210
}, {
  day: 'Fri',
  steps: 1890,
  calories: 1900
}, {
  day: 'Sat',
  steps: 2390,
  calories: 2500
}, {
  day: 'Sun',
  steps: 3490,
  calories: 2000
}];
const Dashboard = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };
  return <section id="dashboard" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-theme-gray-900 mb-4">
            Your Health Dashboard
          </h2>
          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto">
            Track your progress, monitor key metrics, and stay on top of your health goals
          </p>
        </div>

        {/* Health Score Card */}
        <div className="mb-8">
          <Card className="p-8 bg-gradient-to-r from-theme-blue to-theme-indigo text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Your Health Score</h3>
                <div className="text-5xl font-bold mb-2">78</div>
                <p className="text-white opacity-80">Good - Keep improving!</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-theme-seafoam-100">+5</div>
                <p className="text-white opacity-80">Since last month</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {healthMetrics.map((metric, index) => <Card key={index} className="p-6 hover:shadow-lg transition-shadow bg-white">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  <metric.icon className="w-6 h-6" />
                </div>
                <Badge variant="secondary" className="bg-theme-gray-100 text-theme-gray-600">
                  {metric.change}
                </Badge>
              </div>
              <h4 className="font-semibold text-theme-gray-900 mb-2">{metric.title}</h4>
              <div className="text-2xl font-bold text-theme-gray-900 mb-2">{metric.value}</div>
              <p className="text-sm text-theme-gray-600">{metric.unit}</p>
            </Card>)}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Health Trends */}
          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-theme-gray-900">Health Trends</h3>
              <Button variant="outline" size="sm" className="border-theme-blue text-theme-blue hover:text-white bg-[#4f92ff]">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={healthTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }} />
                <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={3} dot={{
                fill: '#3B82F6',
                strokeWidth: 2,
                r: 4
              }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Activity Breakdown */}
          <Card className="p-6 bg-white">
            <h3 className="text-xl font-bold text-theme-gray-900 mb-6">Activity Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={activityData} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={5} dataKey="value">
                  {activityData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-4 mt-4">
              {activityData.map((item, index) => <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{
                backgroundColor: item.color
              }} />
                  <span className="text-sm text-theme-gray-600">{item.name}</span>
                </div>)}
            </div>
          </Card>
        </div>

        {/* Goals and Achievements */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Current Goals */}
          <Card className="p-6 bg-white">
            <h3 className="text-xl font-bold text-theme-gray-900 mb-6">Current Goals</h3>
            <div className="space-y-4">
              {goals.map((goal, index) => <div key={index} className="p-4 bg-theme-gray-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${goal.color}`}>
                        <goal.icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-theme-gray-900">{goal.title}</span>
                    </div>
                    <span className="text-sm text-theme-gray-600">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <p className="text-sm text-theme-gray-600 mt-2">{goal.description}</p>
                </div>)}
            </div>
          </Card>

          {/* Recent Achievements */}
          <Card className="p-6 bg-white">
            <h3 className="text-xl font-bold text-theme-gray-900 mb-6">Recent Achievements</h3>
            <div className="space-y-4">
              {achievements.map((achievement, index) => <div key={index} className="flex items-center gap-4 p-4 bg-theme-gray-100 rounded-lg">
                  <div className="w-12 h-12 bg-theme-seafoam rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-theme-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-theme-gray-600">{achievement.description}</p>
                  </div>
                  <Badge variant="secondary" className="bg-theme-seafoam-100 text-theme-seafoam-800">
                    {achievement.date}
                  </Badge>
                </div>)}
            </div>
          </Card>
        </div>

        {/* Weekly Overview */}
        <Card className="p-6 mb-8 bg-white">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-theme-gray-900">Weekly Overview</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')} className="border-theme-blue text-theme-blue hover:text-white bg-[#3d86fd]">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium text-theme-gray-900 px-4">
                {currentDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              })}
              </span>
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')} className="border-theme-blue text-theme-blue hover:text-white bg-[#488dfd]">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px'
            }} />
              <Bar dataKey="steps" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="calories" fill="#A8D5BA" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button className="bg-theme-blue hover:bg-theme-blue-dark text-white">
            <Activity className="w-4 h-4 mr-2" />
            Log Activity
          </Button>
          <Button className="bg-theme-seafoam hover:bg-theme-seafoam-dark text-white">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Checkup
          </Button>
          <Button className="bg-theme-indigo hover:bg-theme-indigo-dark text-white">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>
    </section>;
};
export default Dashboard;