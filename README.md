# Smart Green Commute Tracker

A comprehensive web application that helps users track their eco-friendly commuting habits, reduce carbon footprint, and engage with a community of environmentally conscious commuters.

## 🌟 Features

### 🔐 Authentication & User Management
- **Email/Password Authentication** with Firebase Auth
- **Email Verification** for account security
- **User Profile Management** with editable information
- **Password Change** functionality
- **Secure Sign Up/Sign In** with form validation

### 🗺️ Smart Trip Logging
- **Multiple Tracking Modes**:
  - Manual distance entry
  - Real-time GPS tracking
  - Google Maps route planning
- **Transport Type Selection**: Walking, Biking, Public Transit, Carpool, Electric Vehicle
- **Automatic CO₂ Calculation** based on transport method and distance
- **Real-time Environmental Impact** display

### 📊 Analytics & Insights
- **Personal Dashboard** with weekly/monthly statistics
- **Detailed Analytics** showing commute patterns
- **Hourly Distribution** charts for commute times
- **Transport Method Breakdown** with CO₂ savings
- **Streak Tracking** with gamification elements

### 🏆 Gamification & Social Features
- **Achievement System** with badges and milestones
- **Leaderboards** for individuals and departments
- **Social Feed** with community posts
- **Follow/Unfollow** system for users
- **Like and Comment** on achievements
- **Referral System** with point rewards

### 📅 Calendar & Tracking
- **Visual Calendar** showing green commute days
- **Streak Visualization** with daily progress
- **Monthly Statistics** and goal tracking
- **Historical Data** with detailed trip logs

### 🌍 Environmental Education
- **CO₂ Impact Information** with detailed breakdowns
- **Reduction Tips** and strategies
- **Environmental Facts** during app loading
- **Quick Impact Calculator** for potential savings

### 🤖 AI Assistant
- **Voice-Enabled Chatbot** with speech recognition
- **Predefined Responses** for common questions
- **Help with App Features** and troubleshooting
- **Floating Chat Interface** for easy access

### 🗺️ Google Maps Integration
- **Route Planning** with multiple transport modes
- **Distance Calculation** using Google Maps API
- **Real-time Navigation** support
- **Location-based Services** with GPS tracking

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling

### Backend & Services
- **Firebase Authentication** for user management
- **Cloud Firestore** for data storage
- **Firebase Storage** for file uploads
- **Google Maps API** for location services

### Development Tools
- **ESLint** for code linting
- **TypeScript** for type safety
- **PostCSS** with Autoprefixer
- **Vite** for fast development

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Firebase project with Authentication and Firestore enabled
- Google Maps API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-green-commute-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Google Maps API
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Firebase Setup**
   - Enable Authentication with Email/Password provider
   - Enable Email Verification in Authentication settings
   - Create Firestore database with the following collections:
     - `users` - User profiles and settings
     - `commutes` - Individual commute entries
     - `posts` - Social feed posts

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Build for Production**
   ```bash
   npm run build
   ```

## 📱 Usage

### Getting Started
1. **Sign Up** with email and password
2. **Verify Email** through the verification link
3. **Complete Profile** with name and institution
4. **Start Logging** eco-friendly commutes

### Logging Commutes
1. **Choose Tracking Mode**:
   - Manual: Enter distance manually
   - GPS: Real-time tracking with location services
   - Map: Plan route with Google Maps
2. **Select Transport Type** (walking, biking, etc.)
3. **Track or Enter** trip details
4. **View CO₂ Savings** and environmental impact

### Social Features
1. **Follow Friends** and colleagues
2. **Share Achievements** on the community feed
3. **Like and Comment** on posts
4. **Compete** on leaderboards
5. **Refer Friends** for bonus points

## 🔧 Configuration

### Firebase Security Rules
```javascript
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /commutes/{commuteId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### Google Maps API Setup
1. Enable the following APIs in Google Cloud Console:
   - Maps JavaScript API
   - Places API
   - Directions API
   - Geocoding API
2. Set up API key restrictions for security
3. Add your domain to authorized referrers

## 🌍 Environmental Impact

This application helps users:
- **Track CO₂ Savings** from eco-friendly commuting
- **Understand Environmental Impact** through education
- **Build Sustainable Habits** with gamification
- **Create Community Awareness** through social features
- **Make Data-Driven Decisions** with detailed analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Email**: support@greencommute.app
- **Phone**: +1 (234) 567-8900
- **Documentation**: Check the in-app help system
- **Issues**: Create an issue on GitHub

## 🙏 Acknowledgments

- Firebase for backend services
- Google Maps for location services
- Tailwind CSS for styling framework
- Lucide React for beautiful icons
- The open-source community for inspiration and tools

---

**Made with 💚 for a sustainable future**