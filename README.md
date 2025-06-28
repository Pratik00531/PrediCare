# 🩺 Predicare - AI-Powered Health Assistant

> **Predict. Prevent. Personalize.** - Your intelligent health companion for preventive care and wellness monitoring.

## 🌟 Project Overview

Predicare is a modern AI-powered health application that combines machine learning insights with personalized health monitoring to help users predict potential health risks and receive tailored preventive care recommendations.

**Live Demo**: [predicare.vercel.app](https://predicare.vercel.app)  
**Repository**: [github.com/Pratik00531/Predicare-final](https://github.com/Pratik00531/Predicare-final)

## ✨ Key Features

- 🤖 **AI Health Analysis** - Advanced machine learning for intelligent health insights
- 📊 **Real-time Health Dashboard** - Beautiful visualizations of your health metrics
- 📱 **Mobile Health Integration** - Sync with iOS HealthKit and Android Health Connect
- 🔐 **Secure Authentication** - Firebase-powered user management
- 💬 **AI Chat Assistant** - 24/7 health guidance and question answering
- 🎯 **Personalized Recommendations** - Tailored preventive care suggestions
- 📈 **Progress Tracking** - Monitor your wellness journey over time
- 🎨 **Modern UI/UX** - Beautiful gradient themes and responsive design

## 🚀 Quick Start

### Prerequisites

Make sure you have Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```bash
# Clone the repository
git clone https://github.com/Pratik00531/Predicare-final.git

# Navigate to the project directory
cd Predicare-final

# Install dependencies
npm install

# Start the development server (Frontend + AI Doctor Backend)
npm run dev
```

The app will be available at:
- **Frontend**: `http://localhost:5173`
- **AI Doctor Backend**: `http://localhost:8000`
- **API Documentation**: `http://localhost:8000/docs`

### 🔄 Development Commands

```bash
# Start both frontend and backend together (recommended)
npm run dev

# Start only the frontend
npm run dev:frontend

# Start only the AI Doctor backend
npm run dev:backend

# Install Python dependencies for AI Doctor
npm run backend:install

# Setup everything and start (includes dependency installation)
npm run start
```

### Environment Setup

1. **Firebase Configuration** (Required for authentication)
   - Copy `.env.example` to `.env.local`
   - Add your Firebase configuration keys
   - See `FIREBASE_SETUP.md` for detailed setup instructions

2. **API Configuration** (Optional - uses mock data by default)
   - Configure your AI Doctor API endpoint in `src/lib/api-config.ts`
   - Toggle between live API and demo mode in the settings

## 🏗️ Architecture & Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful component library

### Backend Integration
- **Firebase** - Authentication and database
- **React Query** - Data fetching and caching
- **Custom API Client** - TypeScript-first API integration

### Health Data
- **iOS HealthKit** - Native iOS health data access
- **Android Health Connect** - Android health data integration
- **Mock Data Service** - Testing and demo capabilities

## 📱 Features Deep Dive

### 🩺 Health Dashboard
- Real-time health metrics visualization
- Custom gradient progress bars
- Mobile health data synchronization
- BMI calculation and health scoring
- Exercise session tracking

### 🤖 AI Assistant
- Natural language health queries
- Text-to-speech responses
- Personalized health recommendations
- Medical condition guidance
- Medication reminders

### 👤 User Profile
- Comprehensive health profile setup
- Goal setting and tracking
- Medical history management
- Preference customization
- Progress analytics

### 🔐 Authentication
- Secure Firebase authentication
- Protected routes
- Profile completion tracking
- Session management
- Password reset functionality

## 🛠️ Development

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── ChatBot.tsx     # AI chat interface
│   ├── HealthDashboard.tsx  # Health metrics display
│   └── ...
├── pages/              # Application pages
│   ├── ProfilePage.tsx # User profile management
│   ├── LoginPage.tsx   # Authentication
│   └── ...
├── lib/                # Core utilities
│   ├── api-client.ts   # API integration
│   ├── firebase-service.ts  # Firebase setup
│   └── health-data-service.ts  # Health data management
├── hooks/              # Custom React hooks
├── contexts/           # React context providers
└── ...
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### API Integration

The app supports both live API and mock mode:

```typescript
// Toggle between live API and demo mode
import { predicareClient } from '@/lib/api-client';

// Check current mode
const isDemo = predicareClient.isMockMode();

// Switch modes
predicareClient.setMockMode(true); // Demo mode
predicareClient.setMockMode(false); // Live API
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with automatic CI/CD

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy the dist/ folder to your hosting platform
```

## 🔧 Configuration

### Environment Variables
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# API Configuration (Optional)
VITE_API_BASE_URL=your_api_endpoint
VITE_API_KEY=your_api_key
```

## 📚 Documentation

- 🔥 [Firebase Setup Guide](./FIREBASE_SETUP.md) - Complete Firebase configuration
- 🩺 [Health Data Integration](./src/lib/health-data-service.ts) - Mobile health data setup
- 🤖 [API Integration](./src/lib/api-client.ts) - Backend API integration
- 🎨 [UI Components](./src/components/ui/) - Component documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ❤️ for better healthcare accessibility**
