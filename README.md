# Salhakar - Legal Assistant App

A beautiful, modern React Native mobile application for lawyers, law firms, and law students. Access judgments, legal acts, document templates, and AI-powered legal assistance.

## 🎯 Features

### 1. Comprehensive Judgment Access
- Access all judgments from High Courts and Supreme Court from the last 1 year
- Daily updates with newly posted judgments
- Multi-language translation of judgments
- Concise summaries for quick understanding
- Voice-enabled search

### 2. Complete Legal Reference Library
- All State Acts and Central Acts in one searchable database
- Full Indian Constitution included
- Instant search for any section or provision
- Voice assistance for searching acts

### 3. Old-to-New Law Mapping
- Smart mapping of replaced laws:
  - IPC → BNS (Bhartiya Nyaya Sanhita)
  - CrPC → BNSS (Bhartiya Nagarik Suraksha Sanhita)
  - IEA → BSA (Bhartiya Sakshya Adhiniyam)
- Automatic conversion when searching old sections
- Voice-enabled section lookup

### 4. Ready-to-Use Legal Document Templates
- Collection of commonly used legal document formats
- Downloadable and editable templates
- Categories: Criminal, Civil, Corporate, Family Law
- Voice-enabled template search

### 5. YouTube Video Summary & Transcription
- Post any YouTube video link to get:
  - Translated transcript
  - Short summary of the video
- Saves time by avoiding full video viewing
- Perfect for legal lectures and case analyses

### 6. Full Voice-Enabled Navigation
- Every feature supports speech-to-text and text-to-speech
- Hands-free experience for lawyers on-the-go
- Multilingual voice support (Hindi, Gujarati, English, and more)

### 7. AI-Powered Legal Chatbot
- Smart chatbot to answer legal queries in real-time
- Can provide references to relevant sections, judgments, or templates
- Supports both text and voice interaction
- Multilingual support
- Available 24/7 for instant assistance

## 📱 Screenshots

[Your app screenshots will showcase the beautiful UI]

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- For iOS: macOS with Xcode
- For Android: Android Studio or physical Android device

### Installation

1. **Clone or extract the project**
   ```bash
   cd salhakar-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Configure API Backend**
   
   Update the API configuration in `src/config/api.js`:
   ```javascript
   export const API_CONFIG = {
     BASE_URL: 'http://your-fastapi-server:8000',
     // ... rest of config
   };
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   or
   ```bash
   expo start
   ```

5. **Run on your device**
   
   **For Android:**
   - Install Expo Go app from Google Play Store
   - Scan the QR code from the terminal
   
   or
   ```bash
   npm run android
   ```
   
   **For iOS:**
   - Install Expo Go app from App Store
   - Scan the QR code from the terminal
   
   or
   ```bash
   npm run ios
   ```

## 🏗️ Project Structure

```
salhakar-app/
├── App.js                      # Main app entry point
├── app.json                    # Expo configuration
├── babel.config.js             # Babel configuration
├── package.json                # Dependencies
├── src/
│   ├── config/
│   │   └── api.js             # API configuration
│   ├── navigation/
│   │   └── AppNavigator.js    # Navigation setup
│   ├── screens/
│   │   ├── HomeScreen.js      # Main home screen
│   │   ├── JudgmentsScreen.js # Judgments listing
│   │   ├── JudgmentDetailScreen.js
│   │   ├── LegalLibraryScreen.js
│   │   ├── ActDetailScreen.js
│   │   ├── LawMappingScreen.js
│   │   ├── TemplatesScreen.js
│   │   ├── YouTubeSummaryScreen.js
│   │   ├── ChatbotScreen.js
│   │   └── SearchScreen.js
│   └── theme/
│       └── theme.js           # App theme and colors
└── assets/                    # Images, icons, fonts
```

## 🔧 Backend Integration

This app is designed to work with a FastAPI backend. The following endpoints need to be implemented:

### Judgments API
- `GET /api/judgments/search?query=&court=` - Search judgments
- `GET /api/judgments/:id` - Get judgment details
- `GET /api/judgments/recent` - Get recent judgments

### Legal Library API
- `GET /api/acts` - List all acts
- `GET /api/acts/:id` - Get act details
- `GET /api/sections/search?query=` - Search sections

### Law Mapping API
- `GET /api/mappings` - Get law mappings
- `GET /api/mappings/section/:number` - Get section mapping

### Templates API
- `GET /api/templates` - List templates
- `GET /api/templates/:id/download` - Download template

### YouTube API
- `POST /api/youtube/analyze` - Analyze YouTube video
- `POST /api/youtube/transcript` - Get transcript
- `POST /api/youtube/summary` - Get summary

### Chatbot API
- `POST /api/chat/message` - Send message to chatbot
- `GET /api/chat/history` - Get chat history

### Search API
- `GET /api/search?q=&category=` - Global search

### Voice API
- `POST /api/voice/transcribe` - Convert voice to text
- `POST /api/voice/synthesize` - Convert text to voice

## 🎨 Customization

### Colors
Update colors in `src/theme/theme.js`:
```javascript
export const theme = {
  colors: {
    primary: '#1A237E',      // Deep Blue
    secondary: '#283593',    // Indigo
    accent: '#5C6BC0',       // Light Indigo
    // ... customize more colors
  },
};
```

### Icons
This app uses `@expo/vector-icons` (MaterialCommunityIcons). Browse available icons at: https://icons.expo.fyi/

## 📦 Building for Production

### Android APK
```bash
expo build:android
```

### iOS IPA
```bash
expo build:ios
```

### Using EAS Build (Recommended)
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure project
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

## 🔐 Environment Variables

For sensitive data, create a `.env` file:
```
API_BASE_URL=https://your-api.com
API_KEY=your-api-key
```

And use with `react-native-dotenv` or similar library.

## 📱 Minimum Requirements

- **Android**: API Level 21 (Android 5.0) or higher
- **iOS**: iOS 13.0 or higher

## 🛠️ Technologies Used

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **React Native Paper** - Material Design components
- **React Native Reanimated** - Animations
- **Expo Linear Gradient** - Gradient backgrounds
- **Axios** - HTTP client (to be integrated with FastAPI)

## 🤝 Contributing

This is a client project. For modifications or feature requests, please contact the development team.

## 📄 License

Proprietary and confidential.

## 👥 Support

For support and queries, contact the development team.

## 🎯 Roadmap

- [ ] Integrate FastAPI backend
- [ ] Implement offline mode with local database
- [ ] Add biometric authentication
- [ ] Implement push notifications for new judgments
- [ ] Add bookmark and favorites functionality
- [ ] Implement advanced search filters
- [ ] Add multi-language UI support
- [ ] Integrate payment gateway for premium features

## 📸 Demo

The app includes beautiful animations, smooth transitions, and an intuitive user interface that makes legal research efficient and enjoyable.

### Key Highlights:
- ✨ Modern, aesthetic design
- 🎨 Beautiful gradients and animations
- 📱 Smooth transitions between screens
- 🎤 Voice-enabled features throughout
- 🌐 Multi-language support ready
- 🔍 Powerful search capabilities
- 💬 AI chatbot for instant help
- 📚 Comprehensive legal database access

## 🔥 Getting Your Friend Started

Since you'll be sharing this with a friend to run:

1. **Send them the entire `/tmp/salhakar-app` folder**

2. **They need to have installed:**
   - Node.js from https://nodejs.org/
   - Expo Go app on their phone

3. **They should run:**
   ```bash
   cd salhakar-app
   npm install
   npm start
   ```

4. **Then scan the QR code with Expo Go app**

That's it! The app will run on their device.

---

**Built with ❤️ for the Legal Community**

