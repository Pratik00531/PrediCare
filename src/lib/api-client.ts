// AI Doctor API Client - Complete TypeScript Integration
// Base URL: https://ai-doctor-2-0-voice-and-vision-eie6kt0pe.vercel.app

import { API_CONFIG, mockResponses, simulateApiDelay } from './api-config';

// Transcription feature removed - focusing on image analysis and consultations

export interface AnalysisResponse {
  analysis: string;
  success: boolean;
  message: string;
}

export interface SynthesisResponse {
  audio_base64: string;
  success: boolean;
  message: string;
}

export interface ConsultationResponse {
  query: string;
  analysis: string;
  success: boolean;
  message: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  groq_status: string;
  elevenlabs_status: string;
}

export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

// Custom error class for API errors
export class PredicareApiError extends Error {
  status?: number;
  details?: any;

  constructor(message: string, status?: number, details?: any) {
    super(message);
    this.name = 'PredicareApiError';
    this.status = status;
    this.details = details;
  }
}

export class PredicareClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private mockMode: boolean;

  constructor(baseURL: string = API_CONFIG.LIVE_API_URL, mockMode: boolean = API_CONFIG.ENABLE_MOCK_MODE) {
    this.baseURL = baseURL.replace(/\/$/, ''); // Remove trailing slash
    this.mockMode = mockMode;
    this.defaultHeaders = {
      'Accept': 'application/json',
    };
  }

  /**
   * Generic fetch wrapper with error handling
   */
  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      // Mock response handling
      if (this.mockMode) {
        const mockResponse = mockResponses[endpoint];
        if (mockResponse) {
          await simulateApiDelay(); // Simulate network delay
          return mockResponse as T;
        } else {
          throw new PredicareApiError('Mock response not found for the endpoint', 404);
        }
      }

      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
      });

      // Handle authentication redirects from Vercel
      if (response.status === 401 || response.status === 403) {
        throw new PredicareApiError(
          'Authentication required. Please ensure you have access to the API.',
          response.status
        );
      }

      // Handle other HTTP errors
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        let errorDetails = null;

        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          errorDetails = errorData;
        } catch {
          // If response is not JSON, use the status text
        }

        throw new PredicareApiError(errorMessage, response.status, errorDetails);
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text() as unknown as T;
      }

    } catch (error) {
      if (error instanceof PredicareApiError) {
        throw error;
      }

      // Handle network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new PredicareApiError(
          'Network error: Unable to connect to the API. Please check your internet connection.',
          0,
          error
        );
      }

      // Handle other errors
      throw new PredicareApiError(
        error instanceof Error ? error.message : 'An unexpected error occurred',
        0,
        error
      );
    }
  }

  /**
   * Check API health status
   */
  async checkHealth(): Promise<HealthResponse> {
    if (this.mockMode) {
      await simulateApiDelay();
      return mockResponses.health();
    }
    return this.makeRequest<HealthResponse>('/api/health');
  }

  // Transcription method removed - focusing on core medical analysis features

  /**
   * Analyze medical image with AI vision
   * @param imageFile - Image file (jpg, png, webp)
   * @param query - Analysis query/question
   */
  async analyzeImage(imageFile: File, query: string): Promise<AnalysisResponse> {
    if (this.mockMode) {
      await simulateApiDelay();
      return mockResponses.analysis(query);
    }

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('query', query);

    return this.makeRequest<AnalysisResponse>('/api/analyze', {
      method: 'POST',
      body: formData,
    });
  }

  /**
   * Convert text to speech using ElevenLabs
   * @param text - Text to synthesize
   */
  async synthesizeSpeech(text: string): Promise<SynthesisResponse> {
    if (this.mockMode) {
      await simulateApiDelay();
      return mockResponses.synthesis(text);
    }

    const formData = new FormData();
    formData.append('text', text);

    return this.makeRequest<SynthesisResponse>('/api/synthesize', {
      method: 'POST',
      body: formData,
    });
  }

  /**
   * Complete AI doctor consultation
   * @param imageFile - Medical image
   * @param query - Medical question
   */
  async consultation(imageFile: File, query: string): Promise<ConsultationResponse> {
    if (this.mockMode) {
      await simulateApiDelay();
      return mockResponses.consultation(query);
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('query', query);

    return this.makeRequest<ConsultationResponse>('/api/consultation', {
      method: 'POST',
      body: formData,
    });
  }

  /**
   * Enable or disable mock mode
   */
  setMockMode(enabled: boolean) {
    this.mockMode = enabled;
  }

  /**
   * Check if mock mode is enabled
   */
  isMockMode(): boolean {
    return this.mockMode;
  }

  /**
   * Get current configuration
   */
  getConfig() {
    return {
      baseURL: this.baseURL,
      mockMode: this.mockMode,
      apiAvailable: !this.mockMode
    };
  }

  /**
   * Utility method to validate image file types
   */
  static validateImageFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    return validTypes.includes(file.type) || 
           Boolean(file.name.toLowerCase().match(/\.(jpg|jpeg|png|webp)$/));
  }

  /**
   * Utility method to convert base64 audio to blob for playback
   */
  static base64ToAudioBlob(base64: string): Blob {
    // Remove data URL prefix if present
    const base64Data = base64.replace(/^data:audio\/[^;]+;base64,/, '');
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    return new Blob([bytes], { type: 'audio/mpeg' });
  }

  /**
   * Utility method to create audio URL from base64
   */
  static createAudioUrl(base64: string): string {
    const blob = this.base64ToAudioBlob(base64);
    return URL.createObjectURL(blob);
  }
}

// Create a default instance with mock mode enabled
export const predicareClient = new PredicareClient(API_CONFIG.LIVE_API_URL, API_CONFIG.ENABLE_MOCK_MODE);

// Export utility functions
export const validateImageFile = PredicareClient.validateImageFile;
export const base64ToAudioBlob = PredicareClient.base64ToAudioBlob;
export const createAudioUrl = PredicareClient.createAudioUrl;
