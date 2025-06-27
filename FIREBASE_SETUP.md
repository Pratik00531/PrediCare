# Firebase Setup Guide for Predicare

## 🔥 Setting up Firebase for Authentication & Database

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `predicare-ai` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable these providers:
   - ✅ **Email/Password**
   - ✅ **Google** (recommended for ease of use)

3. For Google Sign-in:
   - Click on Google provider
   - Enable it
   - Add your domain to authorized domains
   - Save

### 3. Set up Firestore Database

1. Go to **Firestore Database** → **Create database**
2. Choose **Start in test mode** (for development)
3. Select a location (choose closest to your users)
4. Click "Done"

### 4. Configure Firebase in Your App

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click "Web" icon to add a web app
4. Enter app name: `Predicare Web App`
5. **Copy the configuration object**

### 5. Update Firebase Configuration ✅ COMPLETED

Your Firebase configuration has been updated in `/src/lib/firebase-service.ts`:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyCZUyUgglbNRdDX5xfUJGrWCO9cDPpG_Gk",
  authDomain: "predicare-ai.firebaseapp.com",
  projectId: "predicare-ai",
  storageBucket: "predicare-ai.firebasestorage.app",
  messagingSenderId: "250196142010",
  appId: "1:250196142010:web:8dc62bf92222a88de7df83",
  measurementId: "G-J7QSHQN8K7"
};
```

✅ **Configuration is already set up and ready to use!**

### 6. Set up Firestore Security Rules

In Firestore → **Rules**, use these rules for development:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read/write their own medical records
    match /medical_records/{recordId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && 
        request.resource.data.userId == request.auth.uid;
    }
  }
}
```

### 7. Enable Storage (for image uploads)

1. Go to **Storage** → **Get started**
2. Start in test mode
3. Choose same location as Firestore
4. Click "Done"

### 8. Storage Security Rules

In Storage → **Rules**:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{userId}/images/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🚀 Testing Your Setup

1. **Run your app:** `npm run dev`
2. **Test Firebase connection:** Visit `http://localhost:8080/firebase-test`
3. **Test signup page:** Go to `http://localhost:8080/signup` 
4. **Try creating an account** (after enabling authentication providers)
5. **Check Firebase Console** → Authentication → Users

### 🔧 Firebase Connection Test Page

Your app includes a dedicated Firebase test page at `/firebase-test` that will:

- ✅ Test Firebase Authentication connectivity
- ✅ Test Firestore database connectivity  
- ✅ Test Cloud Storage connectivity
- ✅ Show configuration details
- ✅ Provide troubleshooting information

This page will help you verify that your Firebase integration is working correctly before testing user registration.

## 📱 Mobile Health Data Integration

### iOS HealthKit Integration

For iOS apps (using Capacitor/Cordova):

```bash
npm install @capacitor/ios
npm install @awesome-cordova-plugins/health-kit
```

### Android Health Connect

For Android apps:

```bash
npm install @capacitor/android  
npm install @awesome-cordova-plugins/health
```

### Web Testing

The app includes mock health data for web testing. Real mobile integration requires:

1. **Capacitor** or **Cordova** for native app compilation
2. **Platform-specific health permissions**
3. **Native health API integration**

## 🔒 Security Best Practices

### Production Security Rules

For production, use more restrictive rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == userId &&
        request.auth.token.email_verified == true;
    }
    
    match /medical_records/{recordId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId &&
        request.auth.token.email_verified == true;
    }
  }
}
```

### Environment Variables

For production, use environment variables:

```bash
# .env.production
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
# ... other config
```

## 📊 Monitoring & Analytics

1. Enable **Firebase Analytics** for user insights
2. Set up **Performance Monitoring** for app performance
3. Use **Crashlytics** for error reporting (mobile apps)

## 🛠️ Advanced Features

### Cloud Functions (Optional)

For server-side logic:

```bash
npm install -g firebase-tools
firebase init functions
```

### Real-time Sync

Use Firestore real-time listeners for live updates:

```typescript
// Listen to user's health data changes
const unsubscribe = onSnapshot(
  collection(db, 'medical_records'), 
  (snapshot) => {
    // Update UI with real-time data
  }
);
```

## 🎯 Next Steps

1. ✅ Complete Firebase setup
2. 🔄 Test authentication flows  
3. 📱 Implement mobile health data sync
4. 🚀 Deploy to production
5. 📈 Monitor usage and performance

## 🆘 Troubleshooting

### Common Issues:

1. **Authentication errors**: Check Firebase config
2. **Permission denied**: Verify Firestore rules
3. **CORS issues**: Add your domain to Firebase authorized domains
4. **Build errors**: Ensure Firebase SDK versions are compatible

### Support Resources:

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication](https://firebase.google.com/docs/auth)

---

**Ready to build the future of healthcare! 🏥✨**
