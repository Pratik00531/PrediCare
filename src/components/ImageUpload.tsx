
import React, { useState, useCallback } from 'react';
import { Upload, Image, Camera, FileImage, Loader2, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAnalyzeImage, useMedicalConsultation, useFileValidation } from '@/hooks/use-predicare-api';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysisQuery, setAnalysisQuery] = useState('');
  const [consultationQuery, setConsultationQuery] = useState('');
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [consultationResult, setConsultationResult] = useState<{ query: string; analysis: string } | null>(null);

  // API hooks
  const analyzeImage = useAnalyzeImage();
  const consultation = useMedicalConsultation();
  const { validateImageFile } = useFileValidation();

  // Handle image selection
  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validation = validateImageFile(file);
      if (validation.isValid) {
        setSelectedImage(file);
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        
        // Reset previous results
        setAnalysisResult('');
        setConsultationResult(null);
      } else {
        alert(validation.error);
      }
    }
  }, [validateImageFile]);

  // Handle drag and drop
  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const validation = validateImageFile(file);
      if (validation.isValid) {
        setSelectedImage(file);
        
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        
        setAnalysisResult('');
        setConsultationResult(null);
      } else {
        alert(validation.error);
      }
    }
  }, [validateImageFile]);

  // Clear selected image
  const clearImage = useCallback(() => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResult('');
    setConsultationResult(null);
    setAnalysisQuery('');
    setConsultationQuery('');
  }, []);

  // Handle image analysis
  const handleAnalyzeImage = useCallback(async () => {
    if (selectedImage && analysisQuery.trim()) {
      try {
        const result = await analyzeImage.mutateAsync({
          imageFile: selectedImage,
          query: analysisQuery
        });
        if (result.success) {
          setAnalysisResult(result.analysis);
        }
      } catch (error) {
        console.error('Analysis error:', error);
      }
    }
  }, [selectedImage, analysisQuery, analyzeImage]);

  // Handle consultation
  const handleConsultation = useCallback(async () => {
    if (selectedImage && consultationQuery.trim()) {
      try {
        const result = await consultation.mutateAsync({
          imageFile: selectedImage,
          query: consultationQuery
        });
        if (result.success) {
          setConsultationResult({
            query: result.query,
            analysis: result.analysis
          });
        }
      } catch (error) {
        console.error('Consultation error:', error);
      }
    }
  }, [selectedImage, consultationQuery, consultation]);

  // Suggested queries for quick testing
  const suggestedQueries = [
    "What skin condition is this?",
    "Is this rash something to worry about?",
    "Analyze this wound for healing progress",
    "What type of lesion is this?",
    "Assess the severity of this condition"
  ];

  return (
    <Card id="upload" className="bg-white/80 backdrop-blur-sm border border-purple-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Image className="h-5 w-5" />
          <span>AI Medical Image Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Image Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors relative"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*,.jpg,.jpeg,.png,.webp"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            
            {!selectedImage ? (
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-3">
                  <div className="flex items-center space-x-2">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Upload Medical Image</p>
                    <p className="text-sm text-gray-500 mt-1">Drag & drop or click to select</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Supports: JPG, PNG, WEBP (max 10MB)
                    </p>
                  </div>
                </div>
              </label>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Selected medical image"
                      className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                    />
                  )}
                  <Button
                    onClick={clearImage}
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <FileImage className="h-3 w-3" />
                    <span>{selectedImage.name}</span>
                  </Badge>
                  <Badge variant="outline">
                    {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                  </Badge>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Tabs */}
          {selectedImage && (
            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="analysis">Image Analysis</TabsTrigger>
                <TabsTrigger value="consultation">AI Consultation</TabsTrigger>
              </TabsList>

              {/* Image Analysis Tab */}
              <TabsContent value="analysis" className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="analysis-query">What would you like to analyze?</Label>
                  <Textarea
                    id="analysis-query"
                    placeholder="e.g., What type of skin condition is this? Is this normal?"
                    value={analysisQuery}
                    onChange={(e) => setAnalysisQuery(e.target.value)}
                    className="min-h-[80px]"
                  />
                  
                  {/* Suggested Queries */}
                  <div className="flex flex-wrap gap-2">
                    {suggestedQueries.map((query, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setAnalysisQuery(query)}
                        className="text-xs"
                      >
                        {query}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleAnalyzeImage}
                  disabled={!analysisQuery.trim() || analyzeImage.isPending}
                  className="w-full bg-purple-500 hover:bg-purple-600"
                >
                  {analyzeImage.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Image...
                    </>
                  ) : (
                    <>
                      <Image className="mr-2 h-4 w-4" />
                      Analyze Image
                    </>
                  )}
                </Button>

                {/* Analysis Result */}
                {analysisResult && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <p className="font-medium text-green-800">Analysis Result:</p>
                        <p className="text-green-700 text-sm whitespace-pre-wrap">{analysisResult}</p>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </TabsContent>

              {/* AI Consultation Tab */}
              <TabsContent value="consultation" className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="consultation-query">Ask the AI Doctor</Label>
                  <Textarea
                    id="consultation-query"
                    placeholder="Describe your concerns about this image or ask specific medical questions..."
                    value={consultationQuery}
                    onChange={(e) => setConsultationQuery(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <Button
                  onClick={handleConsultation}
                  disabled={!consultationQuery.trim() || consultation.isPending}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  {consultation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Consulting AI Doctor...
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2 h-4 w-4" />
                      Get AI Consultation
                    </>
                  )}
                </Button>

                {/* Consultation Result */}
                {consultationResult && (
                  <Alert className="border-blue-200 bg-blue-50">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <AlertDescription>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-blue-800">Your Question:</p>
                          <p className="text-blue-700 text-sm italic">"{consultationResult.query}"</p>
                        </div>
                        <div>
                          <p className="font-medium text-blue-800">AI Doctor Response:</p>
                          <p className="text-blue-700 text-sm whitespace-pre-wrap">{consultationResult.analysis}</p>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </TabsContent>
            </Tabs>
          )}

          {/* Medical Disclaimer */}
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800 text-xs">
              <strong>Medical Disclaimer:</strong> This AI analysis is for informational purposes only 
              and should not replace professional medical advice, diagnosis, or treatment. Always 
              consult qualified healthcare professionals for medical concerns.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
