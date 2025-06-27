// React Query hooks for AI Doctor API integration (Transcription removed)
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  predicareClient, 
  AnalysisResponse, 
  SynthesisResponse, 
  ConsultationResponse, 
  HealthResponse,
  PredicareApiError 
} from '@/lib/api-client';
import { toast } from '@/hooks/use-toast';

// Query Keys
export const queryKeys = {
  health: ['health'] as const,
  analysis: ['analysis'] as const,
  synthesis: ['synthesis'] as const,
  consultation: ['consultation'] as const,
};

// Health Check Hook
export const useHealthCheck = () => {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: () => predicareClient.checkHealth(),
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Image Analysis Hook
export const useAnalyzeImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ imageFile, query }: { imageFile: File; query: string }) => 
      predicareClient.analyzeImage(imageFile, query),
    onSuccess: (data: AnalysisResponse) => {
      if (data.success) {
        toast({
          title: "Image Analysis Complete",
          description: "Your medical image has been successfully analyzed.",
        });
      } else {
        toast({
          title: "Analysis Failed",
          description: data.message || "Failed to analyze the image.",
          variant: "destructive",
        });
      }
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.analysis });
    },
    onError: (error: PredicareApiError) => {
      toast({
        title: "Analysis Error",
        description: error.message || "An error occurred during image analysis.",
        variant: "destructive",
      });
    },
  });
};

// Text-to-Speech Hook
export const useSynthesizeSpeech = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => predicareClient.synthesizeSpeech(text),
    onSuccess: (data: SynthesisResponse) => {
      if (data.success) {
        toast({
          title: "Speech Synthesis Complete",
          description: "Text has been converted to speech successfully.",
        });
      } else {
        toast({
          title: "Speech Synthesis Failed",
          description: data.message || "Failed to convert text to speech.",
          variant: "destructive",
        });
      }
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.synthesis });
    },
    onError: (error: PredicareApiError) => {
      toast({
        title: "Speech Synthesis Error",
        description: error.message || "An error occurred during speech synthesis.",
        variant: "destructive",
      });
    },
  });
};

// Medical Consultation Hook
export const useMedicalConsultation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ imageFile, query }: { imageFile: File; query: string }) => 
      predicareClient.getMedicalConsultation(imageFile, query),
    onSuccess: (data: ConsultationResponse) => {
      if (data.success) {
        toast({
          title: "Medical Consultation Complete",
          description: "Your consultation has been processed successfully.",
        });
      } else {
        toast({
          title: "Consultation Failed",
          description: data.message || "Failed to process the consultation.",
          variant: "destructive",
        });
      }
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.consultation });
    },
    onError: (error: PredicareApiError) => {
      toast({
        title: "Consultation Error",
        description: error.message || "An error occurred during the consultation.",
        variant: "destructive",
      });
    },
  });
};

// Health Data Integration Hooks
export const useHealthData = () => {
  return useQuery({
    queryKey: ['healthData'],
    queryFn: async () => {
      // This will integrate with the health data service
      const { healthDataService } = await import('@/lib/health-data-service');
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      return healthDataService.fetchHealthData(yesterday, today);
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    staleTime: 2 * 60 * 1000, // Consider data stale after 2 minutes
  });
};

// Save health data mutation
export const useSaveHealthData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (healthData: any) => {
      const { healthDataService } = await import('@/lib/health-data-service');
      return healthDataService.syncToCloud(healthData);
    },
    onSuccess: () => {
      toast({
        title: "Health Data Saved",
        description: "Your health metrics have been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['healthData'] });
    },
    onError: (error) => {
      toast({
        title: "Save Failed",
        description: "Failed to save health data. Please try again.",
        variant: "destructive",
      });
    },
  });
};

// File Validation Hook
export const useFileValidation = () => {
  const validateImageFile = (file: File) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Please select a valid image file (JPEG, PNG, GIF, or WebP)'
      };
    }
    
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'Image file must be smaller than 10MB'
      };
    }
    
    return { isValid: true, error: null };
  };

  return {
    validateImageFile
  };
};
