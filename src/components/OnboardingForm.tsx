import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, User, Activity, Heart } from 'lucide-react';
const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    age: '',
    gender: '',
    height: '',
    weight: '',
    // Medical History
    conditions: [],
    medications: '',
    familyHistory: [],
    // Lifestyle
    smoking: '',
    exercise: '',
    sleep: '',
    alcohol: '',
    diet: '',
    stress: ''
  });
  const totalSteps = 3;
  const progress = currentStep / totalSteps * 100;
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Here you would typically send data to your API
  };
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-theme-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-theme-gray-900">Basic Information</h3>
              <p className="text-theme-gray-600">Tell us about yourself</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="Enter your age" value={formData.age} onChange={e => updateFormData('age', e.target.value)} className="border-theme-gray-300 focus:border-theme-blue focus:ring-theme-blue bg-white" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={value => updateFormData('gender', value)}>
                  <SelectTrigger className="border-theme-gray-300 focus:border-theme-blue focus:ring-theme-blue bg-white">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-theme-gray-300">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input id="height" type="number" placeholder="Enter height in cm" value={formData.height} onChange={e => updateFormData('height', e.target.value)} className="border-theme-gray-300 focus:border-theme-blue focus:ring-theme-blue bg-white" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" type="number" placeholder="Enter weight in kg" value={formData.weight} onChange={e => updateFormData('weight', e.target.value)} className="border-theme-gray-300 focus:border-theme-blue focus:ring-theme-blue bg-white" />
              </div>
            </div>
          </div>;
      case 2:
        return <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-theme-seafoam rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-theme-gray-900">Medical History</h3>
              <p className="text-theme-gray-600">Help us understand your health background</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Existing Conditions (Check all that apply)</Label>
                <div className="grid grid-cols-2 gap-4">
                  {['Diabetes', 'High Blood Pressure', 'Heart Disease', 'Obesity', 'High Cholesterol', 'Asthma'].map(condition => <div key={condition} className="flex items-center space-x-2">
                      <Checkbox id={condition} checked={formData.conditions.includes(condition)} onCheckedChange={checked => {
                    if (checked) {
                      updateFormData('conditions', [...formData.conditions, condition]);
                    } else {
                      updateFormData('conditions', formData.conditions.filter(c => c !== condition));
                    }
                  }} className="border-theme-gray-300 data-[state=checked]:bg-theme-seafoam data-[state=checked]:border-theme-seafoam" />
                      <Label htmlFor={condition} className="text-sm">{condition}</Label>
                    </div>)}
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Family History (Check all that apply)</Label>
                <div className="grid grid-cols-2 gap-4">
                  {['Heart Disease', 'Diabetes', 'Cancer', 'Stroke', 'High Blood Pressure', 'Alzheimer\'s'].map(condition => <div key={condition} className="flex items-center space-x-2">
                      <Checkbox id={`family-${condition}`} checked={formData.familyHistory.includes(condition)} onCheckedChange={checked => {
                    if (checked) {
                      updateFormData('familyHistory', [...formData.familyHistory, condition]);
                    } else {
                      updateFormData('familyHistory', formData.familyHistory.filter(c => c !== condition));
                    }
                  }} className="border-theme-gray-300 data-[state=checked]:bg-theme-seafoam data-[state=checked]:border-theme-seafoam" />
                      <Label htmlFor={`family-${condition}`} className="text-sm">{condition}</Label>
                    </div>)}
                </div>
              </div>
            </div>
          </div>;
      case 3:
        return <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-theme-indigo rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-theme-gray-900">Lifestyle Habits</h3>
              <p className="text-theme-gray-600">Tell us about your daily habits</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Smoking Status</Label>
                <Select value={formData.smoking} onValueChange={value => updateFormData('smoking', value)}>
                  <SelectTrigger className="border-theme-gray-300 focus:border-theme-indigo focus:ring-theme-indigo bg-white">
                    <SelectValue placeholder="Select smoking status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-theme-gray-300">
                    <SelectItem value="never">Never smoked</SelectItem>
                    <SelectItem value="former">Former smoker</SelectItem>
                    <SelectItem value="current">Current smoker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Exercise Frequency</Label>
                <Select value={formData.exercise} onValueChange={value => updateFormData('exercise', value)}>
                  <SelectTrigger className="border-theme-gray-300 focus:border-theme-indigo focus:ring-theme-indigo bg-white">
                    <SelectValue placeholder="Select exercise frequency" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-theme-gray-300">
                    <SelectItem value="none">No exercise</SelectItem>
                    <SelectItem value="light">1-2 times per week</SelectItem>
                    <SelectItem value="moderate">3-4 times per week</SelectItem>
                    <SelectItem value="heavy">5+ times per week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Sleep Hours (per night)</Label>
                <Select value={formData.sleep} onValueChange={value => updateFormData('sleep', value)}>
                  <SelectTrigger className="border-theme-gray-300 focus:border-theme-indigo focus:ring-theme-indigo bg-white">
                    <SelectValue placeholder="Select sleep hours" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-theme-gray-300">
                    <SelectItem value="<5">Less than 5 hours</SelectItem>
                    <SelectItem value="5-6">5-6 hours</SelectItem>
                    <SelectItem value="7-8">7-8 hours</SelectItem>
                    <SelectItem value=">8">More than 8 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Alcohol Consumption</Label>
                <Select value={formData.alcohol} onValueChange={value => updateFormData('alcohol', value)}>
                  <SelectTrigger className="border-theme-gray-300 focus:border-theme-indigo focus:ring-theme-indigo bg-white">
                    <SelectValue placeholder="Select alcohol consumption" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-theme-gray-300">
                    <SelectItem value="none">No alcohol</SelectItem>
                    <SelectItem value="light">1-3 drinks per week</SelectItem>
                    <SelectItem value="moderate">4-7 drinks per week</SelectItem>
                    <SelectItem value="heavy">8+ drinks per week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Diet Quality</Label>
                <Select value={formData.diet} onValueChange={value => updateFormData('diet', value)}>
                  <SelectTrigger className="border-theme-gray-300 focus:border-theme-indigo focus:ring-theme-indigo bg-white">
                    <SelectValue placeholder="Select diet quality" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-theme-gray-300">
                    <SelectItem value="poor">Poor (lots of processed food)</SelectItem>
                    <SelectItem value="fair">Fair (some healthy choices)</SelectItem>
                    <SelectItem value="good">Good (balanced diet)</SelectItem>
                    <SelectItem value="excellent">Excellent (very healthy)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Stress Level</Label>
                <Select value={formData.stress} onValueChange={value => updateFormData('stress', value)}>
                  <SelectTrigger className="border-theme-gray-300 focus:border-theme-indigo focus:ring-theme-indigo bg-white">
                    <SelectValue placeholder="Select stress level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-theme-gray-300">
                    <SelectItem value="low">Low stress</SelectItem>
                    <SelectItem value="moderate">Moderate stress</SelectItem>
                    <SelectItem value="high">High stress</SelectItem>
                    <SelectItem value="very-high">Very high stress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>;
      default:
        return null;
    }
  };
  return <section id="start" className="py-16 bg-theme-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-theme-gray-900 mb-4">
            Health Assessment
          </h2>
          <p className="text-xl text-theme-gray-600">
            Complete this assessment to get your personalized health insights
          </p>
        </div>

        <Card className="p-8 bg-white border-theme-gray-200">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-theme-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-theme-gray-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form Content */}
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="flex items-center space-x-2 border-theme-blue text-theme-blue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed bg-[#1b36e1]">
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            {currentStep === totalSteps ? <Button onClick={handleSubmit} className="bg-theme-seafoam hover:bg-theme-seafoam-dark text-white flex items-center space-x-2">
                <span>Get My Results</span>
                <Activity className="w-4 h-4" />
              </Button> : <Button onClick={nextStep} className="bg-theme-blue hover:bg-theme-blue-dark text-white flex items-center space-x-2">
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>}
          </div>
        </Card>
      </div>
    </section>;
};
export default OnboardingForm;