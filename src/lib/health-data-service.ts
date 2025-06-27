// Mobile Health Data Integration
// Support for iOS HealthKit and Android Health Connect

export interface HealthMetrics {
  steps: number;
  sleepHours: number;
  caloriesBurned: number;
  weight?: number;
  heartRate?: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  exerciseSessions?: ExerciseSession[];
  date: string;
  lastSync: string;
}

export interface ExerciseSession {
  type: string; // 'running', 'walking', 'cycling', 'gym', etc.
  duration: number; // in minutes
  caloriesBurned: number;
  startTime: string;
  endTime: string;
  distance?: number; // in km
  averageHeartRate?: number;
}

export interface HealthGoals {
  dailySteps: number;
  sleepHours: number;
  caloriesTarget: number;
  weightTarget?: number;
  exerciseMinutes: number;
}

// Health data sync service
class HealthDataService {
  private apiKey: string | null = null;
  private userId: string | null = null;

  constructor() {
    // Initialize with stored credentials
    this.apiKey = localStorage.getItem('health_api_key');
    this.userId = localStorage.getItem('user_id');
  }

  // Set user credentials for health data access
  setCredentials(userId: string, apiKey: string) {
    this.userId = userId;
    this.apiKey = apiKey;
    localStorage.setItem('user_id', userId);
    localStorage.setItem('health_api_key', apiKey);
  }

  // Check if health data access is available
  isHealthDataAvailable(): boolean {
    // Check for native health APIs
    return !!(window as any).HealthKit || !!(window as any).GoogleFit || this.hasWebAPI();
  }

  // Check for web-based health APIs
  private hasWebAPI(): boolean {
    return 'permissions' in navigator && 'query' in navigator.permissions;
  }

  // Request permissions for health data access
  async requestPermissions(): Promise<boolean> {
    try {
      // For iOS HealthKit (if available via Capacitor/Cordova)
      if ((window as any).HealthKit) {
        return await this.requestHealthKitPermissions();
      }
      
      // For Android Health Connect
      if ((window as any).GoogleFit) {
        return await this.requestGoogleFitPermissions();
      }

      // For web API (limited support)
      if (this.hasWebAPI()) {
        return await this.requestWebPermissions();
      }

      return false;
    } catch (error) {
      console.error('Error requesting health permissions:', error);
      return false;
    }
  }

  // iOS HealthKit integration
  private async requestHealthKitPermissions(): Promise<boolean> {
    try {
      const healthKit = (window as any).HealthKit;
      await healthKit.requestAuthorization([
        'HKQuantityTypeIdentifierStepCount',
        'HKQuantityTypeIdentifierActiveEnergyBurned',
        'HKCategoryTypeIdentifierSleepAnalysis',
        'HKQuantityTypeIdentifierBodyMass',
        'HKQuantityTypeIdentifierHeartRate'
      ]);
      return true;
    } catch (error) {
      console.error('HealthKit permission error:', error);
      return false;
    }
  }

  // Android Health Connect integration
  private async requestGoogleFitPermissions(): Promise<boolean> {
    try {
      const googleFit = (window as any).GoogleFit;
      await googleFit.requestPermissions([
        'FITNESS_DATA_READ',
        'FITNESS_DATA_WRITE'
      ]);
      return true;
    } catch (error) {
      console.error('Google Fit permission error:', error);
      return false;
    }
  }

  // Web API permissions (limited)
  private async requestWebPermissions(): Promise<boolean> {
    try {
      // Request generic sensor permissions
      const result = await navigator.permissions.query({ name: 'accelerometer' as PermissionName });
      return result.state === 'granted';
    } catch (error) {
      console.error('Web API permission error:', error);
      return false;
    }
  }

  // Fetch health data from device
  async fetchHealthData(startDate: Date, endDate: Date): Promise<HealthMetrics | null> {
    try {
      if ((window as any).HealthKit) {
        return await this.fetchFromHealthKit(startDate, endDate);
      }
      
      if ((window as any).GoogleFit) {
        return await this.fetchFromGoogleFit(startDate, endDate);
      }

      // Fallback to mock data for web testing
      return this.generateMockHealthData();
    } catch (error) {
      console.error('Error fetching health data:', error);
      return null;
    }
  }

  // Fetch from iOS HealthKit
  private async fetchFromHealthKit(startDate: Date, endDate: Date): Promise<HealthMetrics> {
    const healthKit = (window as any).HealthKit;
    
    const [steps, calories, sleep, weight, heartRate] = await Promise.all([
      healthKit.readQuantitySamples('HKQuantityTypeIdentifierStepCount', startDate, endDate),
      healthKit.readQuantitySamples('HKQuantityTypeIdentifierActiveEnergyBurned', startDate, endDate),
      healthKit.readCategorySamples('HKCategoryTypeIdentifierSleepAnalysis', startDate, endDate),
      healthKit.readQuantitySamples('HKQuantityTypeIdentifierBodyMass', startDate, endDate),
      healthKit.readQuantitySamples('HKQuantityTypeIdentifierHeartRate', startDate, endDate)
    ]);

    return {
      steps: this.sumValues(steps),
      caloriesBurned: this.sumValues(calories),
      sleepHours: this.calculateSleepHours(sleep),
      weight: weight.length > 0 ? weight[weight.length - 1].value : undefined,
      heartRate: heartRate.length > 0 ? this.averageValues(heartRate) : undefined,
      date: startDate.toISOString().split('T')[0],
      lastSync: new Date().toISOString()
    };
  }

  // Fetch from Google Fit
  private async fetchFromGoogleFit(startDate: Date, endDate: Date): Promise<HealthMetrics> {
    const googleFit = (window as any).GoogleFit;
    
    const data = await googleFit.readData({
      startTime: startDate.getTime(),
      endTime: endDate.getTime(),
      dataTypes: [
        'com.google.step_count.delta',
        'com.google.calories.expended',
        'com.google.sleep.segment',
        'com.google.weight',
        'com.google.heart_rate.bpm'
      ]
    });

    return {
      steps: this.extractGoogleFitSteps(data),
      caloriesBurned: this.extractGoogleFitCalories(data),
      sleepHours: this.extractGoogleFitSleep(data),
      weight: this.extractGoogleFitWeight(data),
      heartRate: this.extractGoogleFitHeartRate(data),
      date: startDate.toISOString().split('T')[0],
      lastSync: new Date().toISOString()
    };
  }

  // Generate mock health data for testing
  private generateMockHealthData(): HealthMetrics {
    const today = new Date();
    const baseSteps = 6000 + Math.random() * 4000;
    const baseSleep = 6.5 + Math.random() * 2;
    const baseCalories = 1500 + Math.random() * 800;

    return {
      steps: Math.round(baseSteps),
      sleepHours: Math.round(baseSleep * 10) / 10,
      caloriesBurned: Math.round(baseCalories),
      weight: 165 + (Math.random() - 0.5) * 10,
      heartRate: Math.round(70 + Math.random() * 20),
      exerciseSessions: this.generateMockExercises(),
      date: today.toISOString().split('T')[0],
      lastSync: new Date().toISOString()
    };
  }

  // Generate mock exercise sessions
  private generateMockExercises(): ExerciseSession[] {
    const exercises = ['running', 'walking', 'cycling', 'gym', 'yoga'];
    const sessions: ExerciseSession[] = [];
    
    // Random 0-2 exercise sessions per day
    const sessionCount = Math.floor(Math.random() * 3);
    
    for (let i = 0; i < sessionCount; i++) {
      const type = exercises[Math.floor(Math.random() * exercises.length)];
      const duration = 20 + Math.random() * 60; // 20-80 minutes
      const startTime = new Date();
      startTime.setHours(8 + Math.random() * 12); // 8 AM to 8 PM
      const endTime = new Date(startTime.getTime() + duration * 60000);

      sessions.push({
        type,
        duration: Math.round(duration),
        caloriesBurned: Math.round(duration * (3 + Math.random() * 7)), // 3-10 cal/min
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        distance: type === 'running' || type === 'cycling' ? Math.round((duration / 60) * (5 + Math.random() * 10) * 10) / 10 : undefined,
        averageHeartRate: Math.round(120 + Math.random() * 40)
      });
    }

    return sessions;
  }

  // Utility methods for data processing
  private sumValues(samples: any[]): number {
    return samples.reduce((sum, sample) => sum + (sample.value || 0), 0);
  }

  private averageValues(samples: any[]): number {
    if (samples.length === 0) return 0;
    return this.sumValues(samples) / samples.length;
  }

  private calculateSleepHours(sleepSamples: any[]): number {
    // Calculate total sleep time from sleep analysis data
    let totalSleepMinutes = 0;
    sleepSamples.forEach(sample => {
      if (sample.value === 'HKCategoryValueSleepAnalysisInBed' || sample.value === 'HKCategoryValueSleepAnalysisAsleep') {
        const duration = (new Date(sample.endDate).getTime() - new Date(sample.startDate).getTime()) / (1000 * 60);
        totalSleepMinutes += duration;
      }
    });
    return Math.round((totalSleepMinutes / 60) * 10) / 10;
  }

  // Google Fit data extraction methods
  private extractGoogleFitSteps(data: any): number {
    const stepData = data.find((d: any) => d.dataTypeName === 'com.google.step_count.delta');
    return stepData ? stepData.points.reduce((sum: number, point: any) => sum + point.value[0].intVal, 0) : 0;
  }

  private extractGoogleFitCalories(data: any): number {
    const calorieData = data.find((d: any) => d.dataTypeName === 'com.google.calories.expended');
    return calorieData ? calorieData.points.reduce((sum: number, point: any) => sum + point.value[0].fpVal, 0) : 0;
  }

  private extractGoogleFitSleep(data: any): number {
    const sleepData = data.find((d: any) => d.dataTypeName === 'com.google.sleep.segment');
    if (!sleepData) return 0;
    
    let totalSleepMinutes = 0;
    sleepData.points.forEach((point: any) => {
      const duration = (point.endTimeNanos - point.startTimeNanos) / (1000000 * 60); // Convert to minutes
      totalSleepMinutes += duration;
    });
    
    return Math.round((totalSleepMinutes / 60) * 10) / 10;
  }

  private extractGoogleFitWeight(data: any): number | undefined {
    const weightData = data.find((d: any) => d.dataTypeName === 'com.google.weight');
    return weightData && weightData.points.length > 0 ? weightData.points[weightData.points.length - 1].value[0].fpVal : undefined;
  }

  private extractGoogleFitHeartRate(data: any): number | undefined {
    const heartRateData = data.find((d: any) => d.dataTypeName === 'com.google.heart_rate.bpm');
    if (!heartRateData || heartRateData.points.length === 0) return undefined;
    
    const totalRate = heartRateData.points.reduce((sum: number, point: any) => sum + point.value[0].fpVal, 0);
    return Math.round(totalRate / heartRateData.points.length);
  }

  // Sync data to cloud storage
  async syncToCloud(healthData: HealthMetrics): Promise<boolean> {
    if (!this.userId || !this.apiKey) {
      console.error('User credentials not set for health data sync');
      return false;
    }

    try {
      // Store in local storage as backup
      localStorage.setItem(`health_data_${healthData.date}`, JSON.stringify(healthData));
      
      // TODO: Sync to Firebase/backend when implemented
      console.log('Health data synced locally:', healthData);
      return true;
    } catch (error) {
      console.error('Error syncing health data:', error);
      return false;
    }
  }

  // Get stored health data
  getStoredHealthData(date: string): HealthMetrics | null {
    try {
      const stored = localStorage.getItem(`health_data_${date}`);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error reading stored health data:', error);
      return null;
    }
  }
}

export const healthDataService = new HealthDataService();
