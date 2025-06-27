import React, { useState, useEffect } from 'react';
import { Settings, Wifi, WifiOff, TestTube, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { predicareClient } from '@/lib/api-client';
import { API_CONFIG } from '@/lib/api-config';

const ApiSettings = () => {
  const [mockMode, setMockMode] = useState(predicareClient.isMockMode());
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'connected' | 'failed'>('unknown');

  const handleMockModeToggle = (enabled: boolean) => {
    setMockMode(enabled);
    predicareClient.setMockMode(enabled);
    setConnectionStatus('unknown');
  };

  const testConnection = async () => {
    setIsTestingConnection(true);
    const wasInMockMode = predicareClient.isMockMode();
    
    try {
      // Temporarily disable mock mode to test real connection
      predicareClient.setMockMode(false);
      const result = await predicareClient.checkHealth();
      
      if (result.status === 'healthy') {
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('failed');
      }
    } catch (error) {
      console.error('Connection test failed:', error);
      setConnectionStatus('failed');
    } finally {
      // Restore previous mock mode setting
      predicareClient.setMockMode(wasInMockMode);
      setIsTestingConnection(false);
    }
  };

  useEffect(() => {
    // Test connection on component mount
    if (!mockMode) {
      testConnection();
    }
  }, []);

  const getStatusIcon = () => {
    if (mockMode) {
      return <TestTube className="h-4 w-4 text-blue-500" />;
    }
    
    switch (connectionStatus) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <WifiOff className="h-4 w-4 text-red-500" />;
      default:
        return <Wifi className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = () => {
    if (mockMode) {
      return 'Mock Mode (Testing)';
    }
    
    switch (connectionStatus) {
      case 'connected':
        return 'Live API Connected';
      case 'failed':
        return 'Live API Unavailable';
      default:
        return 'Testing Connection...';
    }
  };

  const getStatusColor = () => {
    if (mockMode) return 'blue';
    
    switch (connectionStatus) {
      case 'connected':
        return 'green';
      case 'failed':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-sm">
          <Settings className="h-4 w-4" />
          <span>API Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className="text-sm font-medium">{getStatusText()}</span>
          </div>
          <Badge variant="outline" className={`text-${getStatusColor()}-600 border-${getStatusColor()}-200`}>
            {mockMode ? 'Mock' : 'Live'}
          </Badge>
        </div>

        {/* Mock Mode Toggle */}
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="mock-mode" className="text-sm">
            Enable Mock Mode
          </Label>
          <Switch
            id="mock-mode"
            checked={mockMode}
            onCheckedChange={handleMockModeToggle}
          />
        </div>

        {/* Connection Test */}
        {!mockMode && (
          <Button
            onClick={testConnection}
            disabled={isTestingConnection}
            size="sm"
            variant="outline"
            className="w-full"
          >
            {isTestingConnection ? 'Testing...' : 'Test Live API Connection'}
          </Button>
        )}

        {/* Information Alerts */}
        {mockMode ? (
          <Alert className="border-blue-200 bg-blue-50">
            <TestTube className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 text-xs">
              <strong>Mock Mode Active:</strong> All API calls will return simulated responses. 
              Perfect for testing the interface without requiring API authentication.
            </AlertDescription>
          </Alert>
        ) : connectionStatus === 'failed' ? (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 text-xs">
              <strong>Live API Unavailable:</strong> The AI Doctor API requires authentication. 
              Enable mock mode to test all features with simulated responses.
            </AlertDescription>
          </Alert>
        ) : connectionStatus === 'connected' ? (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 text-xs">
              <strong>Live API Connected:</strong> All features are fully operational with 
              real AI-powered responses.
            </AlertDescription>
          </Alert>
        ) : null}

        {/* API Information */}
        <div className="text-xs text-gray-600 space-y-1">
          <div><strong>Base URL:</strong> {API_CONFIG.LIVE_API_URL}</div>
          <div><strong>Features:</strong> Voice transcription, Image analysis, Text-to-speech, Medical consultation</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiSettings;
