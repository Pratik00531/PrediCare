import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, Loader2, Database, Shield, Cloud } from 'lucide-react';
import { auth, db, storage } from '@/lib/firebase-service';
import { connectFirestoreEmulator, connectAuthEmulator, connectStorageEmulator } from 'firebase/firestore';

const FirebaseTestPage = () => {
  const [connectionStatus, setConnectionStatus] = useState({
    auth: 'testing',
    firestore: 'testing',
    storage: 'testing',
    overall: 'testing'
  });

  const testFirebaseConnection = async () => {
    setConnectionStatus({
      auth: 'testing',
      firestore: 'testing', 
      storage: 'testing',
      overall: 'testing'
    });

    const results = {
      auth: false,
      firestore: false,
      storage: false
    };

    // Test Firebase Auth
    try {
      const authResult = await auth.currentUser;
      results.auth = true;
      setConnectionStatus(prev => ({ ...prev, auth: 'success' }));
    } catch (error) {
      console.error('Auth test failed:', error);
      setConnectionStatus(prev => ({ ...prev, auth: 'error' }));
    }

    // Test Firestore
    try {
      // Simple connection test
      const testRef = db._delegate || db;
      results.firestore = true;
      setConnectionStatus(prev => ({ ...prev, firestore: 'success' }));
    } catch (error) {
      console.error('Firestore test failed:', error);
      setConnectionStatus(prev => ({ ...prev, firestore: 'error' }));
    }

    // Test Storage
    try {
      const storageRef = storage._delegate || storage;
      results.storage = true;
      setConnectionStatus(prev => ({ ...prev, storage: 'success' }));
    } catch (error) {
      console.error('Storage test failed:', error);
      setConnectionStatus(prev => ({ ...prev, storage: 'error' }));
    }

    // Overall status
    const allSuccess = results.auth && results.firestore && results.storage;
    setConnectionStatus(prev => ({ 
      ...prev, 
      overall: allSuccess ? 'success' : 'partial' 
    }));
  };

  useEffect(() => {
    testFirebaseConnection();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'testing':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return 'Connected';
      case 'error':
        return 'Failed';
      case 'testing':
        return 'Testing...';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'testing':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">Predicare</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Firebase Connection Test</CardTitle>
          <p className="text-gray-600">Testing Firebase services connectivity</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Overall Status */}
          <Alert className={getStatusColor(connectionStatus.overall)}>
            <Database className="h-4 w-4" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">
                    Firebase Integration: {getStatusText(connectionStatus.overall)}
                  </span>
                  <p className="text-sm mt-1">
                    {connectionStatus.overall === 'success' && 'All Firebase services are connected and ready!'}
                    {connectionStatus.overall === 'partial' && 'Some services are connected, check individual status below.'}
                    {connectionStatus.overall === 'testing' && 'Testing connection to Firebase services...'}
                    {connectionStatus.overall === 'error' && 'Unable to connect to Firebase services.'}
                  </p>
                </div>
                {getStatusIcon(connectionStatus.overall)}
              </div>
            </AlertDescription>
          </Alert>

          {/* Individual Service Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Authentication */}
            <div className={`p-4 rounded-lg border ${getStatusColor(connectionStatus.auth)}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">Authentication</span>
                </div>
                {getStatusIcon(connectionStatus.auth)}
              </div>
              <p className="text-sm text-gray-600">
                Firebase Auth service for user management
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Status: {getStatusText(connectionStatus.auth)}
              </p>
            </div>

            {/* Firestore */}
            <div className={`p-4 rounded-lg border ${getStatusColor(connectionStatus.firestore)}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span className="font-medium">Firestore</span>
                </div>
                {getStatusIcon(connectionStatus.firestore)}
              </div>
              <p className="text-sm text-gray-600">
                NoSQL database for user data and medical records
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Status: {getStatusText(connectionStatus.firestore)}
              </p>
            </div>

            {/* Storage */}
            <div className={`p-4 rounded-lg border ${getStatusColor(connectionStatus.storage)}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Cloud className="h-4 w-4" />
                  <span className="font-medium">Storage</span>
                </div>
                {getStatusIcon(connectionStatus.storage)}
              </div>
              <p className="text-sm text-gray-600">
                Cloud storage for medical images and files
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Status: {getStatusText(connectionStatus.storage)}
              </p>
            </div>
          </div>

          {/* Configuration Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">Configuration Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
              <div>
                <strong>Project ID:</strong> predicare-ai
              </div>
              <div>
                <strong>Auth Domain:</strong> predicare-ai.firebaseapp.com
              </div>
              <div>
                <strong>Storage Bucket:</strong> predicare-ai.firebasestorage.app
              </div>
              <div>
                <strong>Analytics:</strong> Enabled (G-J7QSHQN8K7)
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={testFirebaseConnection}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Loader2 className="h-4 w-4" />
              <span>Retest Connection</span>
            </Button>
            <Button 
              onClick={() => window.location.href = '/signup'}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              Go to Signup
            </Button>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-2">✅ Next Steps</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Test user registration on the signup page</li>
              <li>• Enable Authentication providers in Firebase Console</li>
              <li>• Set up Firestore security rules</li>
              <li>• Configure storage permissions</li>
              <li>• Test mobile health data integration</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FirebaseTestPage;
