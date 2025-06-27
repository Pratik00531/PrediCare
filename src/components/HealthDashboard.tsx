import React, { useEffect, useState } from 'react';
import { Activity, Clock, Target, Wifi, WifiOff, Server, AlertTriangle, CheckCircle, Loader2, TestTube, Smartphone, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useHealthCheck, useHealthData } from '@/hooks/use-predicare-api';
import { predicareClient } from '@/lib/api-client';
import { healthDataService, HealthMetrics } from '@/lib/health-data-service';
import ApiSettings from './ApiSettings';

const HealthDashboard = () => {
  const { data: healthData, isLoading, isError, refetch } = useHealthCheck();
  const { data: mobileHealthData, isLoading: isLoadingMobileData, refetch: refetchMobileData } = useHealthData();
  const [healthPermissions, setHealthPermissions] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  // Use mobile health data if available, otherwise fall back to mock data
  const currentHealthMetrics = mobileHealthData || {
    steps: 8547,
    sleepHours: 7.5,
    caloriesBurned: 1840,
    weight: 165,
    date: new Date().toISOString().split('T')[0],
    lastSync: new Date().toISOString()
  };

  const healthMetrics = [
    { 
      label: 'Steps Today', 
      value: currentHealthMetrics.steps, 
      goal: 10000, 
      icon: Activity, 
      color: 'blue',
      unit: 'steps'
    },
    { 
      label: 'Sleep Hours', 
      value: currentHealthMetrics.sleepHours, 
      goal: 8, 
      icon: Clock, 
      color: 'purple',
      unit: 'hours'
    },
    { 
      label: 'Calories Burned', 
      value: currentHealthMetrics.caloriesBurned, 
      goal: 2200, 
      icon: Target, 
      color: 'green',
      unit: 'cal'
    },
    { 
      label: 'Weight (lbs)', 
      value: currentHealthMetrics.weight || 165, 
      goal: 160, 
      icon: Activity, 
      color: 'orange',
      unit: 'lbs'
    }
  ];

  // Check for health data permissions on mount
  useEffect(() => {
    const checkPermissions = async () => {
      const hasPermissions = healthDataService.isHealthDataAvailable();
      setHealthPermissions(hasPermissions);
      
      if (!hasPermissions) {
        console.log('Health data not available - using mock data');
      }
    };
    
    checkPermissions();
  }, []);

  // Request health data permissions
  const requestHealthPermissions = async () => {
    setSyncStatus('syncing');
    try {
      const granted = await healthDataService.requestPermissions();
      setHealthPermissions(granted);
      
      if (granted) {
        // Trigger a refresh of health data
        await refetchMobileData();
        setSyncStatus('success');
      } else {
        setSyncStatus('error');
      }
    } catch (error) {
      console.error('Error requesting health permissions:', error);
      setSyncStatus('error');
    }
  };

  // Manual sync health data
  const syncHealthData = async () => {
    setSyncStatus('syncing');
    try {
      await refetchMobileData();
      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 2000);
    } catch (error) {
      console.error('Error syncing health data:', error);
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 2000);
    }
  };

  const getProgressPercentage = (value: number, goal: number) => {
    return Math.min((value / goal) * 100, 100);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      green: 'from-green-500 to-green-600',
      orange: 'from-orange-500 to-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'healthy':
      case 'operational':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'degraded':
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'down':
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'healthy':
      case 'operational':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'degraded':
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'down':
      case 'error':
        return <WifiOff className="h-4 w-4 text-red-600" />;
      default:
        return <Server className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
      {/* Header with Gradient */}
      <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-green-600/80"></div>
        <div className="relative">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Your Health Score</h2>
                <p className="text-blue-100 text-sm">Keep up the great work!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">95</div>
              <div className="text-sm bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                Excellent
              </div>
            </div>
          </CardTitle>
          
          {/* Health Score Progress Bar */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm text-blue-100">
              <span>Overall Health Score</span>
              <span className="font-semibold">95%</span>
            </div>
            <div className="relative w-full bg-white/20 rounded-full h-4 overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ 
                  width: '95%',
                  background: 'linear-gradient(90deg, #fbbf24 0%, #10b981 50%, #059669 100%)',
                  boxShadow: '0 0 20px rgba(16, 185, 129, 0.5), inset 0 1px 3px rgba(255, 255, 255, 0.3)'
                }}
              >
                {/* Shine effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{
                    animation: 'shine 2s ease-in-out infinite',
                    transform: 'skewX(-25deg)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 opacity-20">
          <div className="w-32 h-32 border-2 border-white rounded-full"></div>
        </div>
        <div className="absolute -top-8 -right-8 opacity-10">
          <div className="w-24 h-24 bg-white rounded-full"></div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {healthMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            const progress = getProgressPercentage(metric.value, metric.goal);
            
            return (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="text-center space-y-3">
                    {/* Value */}
                    <div className="text-3xl font-bold text-gray-800">
                      {typeof metric.value === 'number' && metric.value % 1 !== 0 
                        ? metric.value.toFixed(1) 
                        : metric.value}
                    </div>
                    
                    {/* Label */}
                    <div className="text-sm font-medium text-gray-600">
                      {metric.label}
                    </div>
                    
                    {/* Progress Circle */}
                    <div className="relative w-16 h-16 mx-auto">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                        {/* Background circle */}
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-gray-200"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                          className={`transition-all duration-1000 ease-out ${
                            metric.color === 'blue' ? 'text-blue-500' :
                            metric.color === 'purple' ? 'text-purple-500' :
                            metric.color === 'green' ? 'text-green-500' :
                            'text-orange-500'
                          }`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`p-2 rounded-full bg-gradient-to-r ${getColorClasses(metric.color)} shadow-lg`}>
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Activity Level or Status */}
                    <div className="text-xs text-gray-500">
                      {progress >= 100 ? '🎯 Goal reached!' : 
                       progress >= 80 ? '💪 Almost there!' : 
                       progress >= 50 ? '📈 Good progress' : 
                       '🚀 Let\'s go!'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs for Different Sections */}
        <div className="space-y-8">
          {/* Mobile Health Data Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Smartphone className="h-4 w-4 text-white" />
                </div>
                <span>Mobile Health Sync</span>
              </h3>
              <div className="flex items-center space-x-3">
                {mobileHealthData && (
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Synced
                  </Badge>
                )}
                <Button
                  onClick={syncHealthData}
                  size="sm"
                  variant="outline"
                  disabled={syncStatus === 'syncing'}
                  className="border-blue-200 hover:bg-blue-50"
                >
                  {syncStatus === 'syncing' ? (
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  ) : (
                    <RefreshCw className="h-3 w-3 mr-1" />
                  )}
                  Sync Now
                </Button>
              </div>
            </div>

            {!healthPermissions ? (
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-orange-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Smartphone className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-medium text-orange-800">Connect Your Health App</div>
                      <div className="text-sm text-orange-600">
                        Sync with iOS HealthKit or Android Health Connect for real-time data
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={requestHealthPermissions} 
                    size="sm" 
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  >
                    Connect
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Last sync: {new Date(currentHealthMetrics.lastSync).toLocaleString()}
                  </div>
                  <div className="flex items-center space-x-2 text-green-600 text-sm font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Connected
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* API Status Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Server className="h-4 w-4 text-white" />
                </div>
                <span>AI Doctor Services</span>
              </h3>
              {predicareClient.isMockMode() && (
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                  <TestTube className="h-3 w-3 mr-1" />
                  Demo Mode
                </Badge>
              )}
            </div>

            {isLoading ? (
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                <span className="text-gray-700">Checking API status...</span>
              </div>
            ) : isError ? (
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <WifiOff className="h-4 w-4 text-red-600" />
                    </div>
                    <span className="text-red-800 font-medium">Connection Issue</span>
                  </div>
                  <Button onClick={() => refetch()} size="sm" variant="outline" className="border-red-200 hover:bg-red-50">
                    Retry
                  </Button>
                </div>
              </div>
            ) : healthData ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* API Status Cards */}
                {[
                  { name: 'API Status', status: healthData.status, icon: Server },
                  { name: 'Groq AI', status: healthData.groq_status, icon: Activity },
                  { name: 'ElevenLabs', status: healthData.elevenlabs_status, icon: Wifi }
                ].map((service, index) => (
                  <div key={index} className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg ${
                          service.status === 'healthy' || service.status === 'operational' ? 'bg-green-100' :
                          service.status === 'degraded' || service.status === 'warning' ? 'bg-yellow-100' :
                          'bg-red-100'
                        }`}>
                          <service.icon className={`h-4 w-4 ${
                            service.status === 'healthy' || service.status === 'operational' ? 'text-green-600' :
                            service.status === 'degraded' || service.status === 'warning' ? 'text-yellow-600' :
                            'text-red-600'
                          }`} />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{service.name}</span>
                      </div>
                      <Badge variant="outline" className={`text-xs ${
                        service.status === 'healthy' || service.status === 'operational' ? 'border-green-200 text-green-700' :
                        service.status === 'degraded' || service.status === 'warning' ? 'border-yellow-200 text-yellow-700' :
                        'border-red-200 text-red-700'
                      }`}>
                        {service.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {healthData && (
              <div className="mt-4 text-center">
                <div className="text-xs text-gray-500">
                  Last updated: {new Date(healthData.timestamp).toLocaleString()}
                </div>
              </div>
            )}
          </div>

          {/* AI Summary Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <div className="p-2 bg-green-500 rounded-lg">
                <Target className="h-4 w-4 text-white" />
              </div>
              <span>Today's AI Insights</span>
            </h3>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">
                {healthData?.status === 'healthy' ? (
                  <>
                    🎉 <strong>Excellent work today!</strong> Your health metrics show fantastic progress. You're 85% towards your step goal 
                    and maintaining healthy sleep patterns. Consider adding 10 minutes of stretching and increasing water intake for optimal wellness.
                  </>
                ) : (
                  <>
                    💪 <strong>Great progress today!</strong> Your personal health metrics are on track - you're 85% towards your step goal. 
                    Some AI services may be temporarily unavailable, but keep up the excellent work on your health journey!
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthDashboard;
