# Quick Setup Guide for Salhakar App

This guide will help your friend set up and run the app quickly.

## 📋 Prerequisites

Before starting, make sure you have:

1. **Computer with Windows, Mac, or Linux**
2. **Smartphone (Android or iOS)** with internet connection
3. **Both devices on the same WiFi network**

## 🚀 Step-by-Step Setup

### Step 1: Install Node.js

1. Go to https://nodejs.org/
2. Download the **LTS version** (recommended)
3. Run the installer and follow the prompts
4. Restart your computer after installation

**Verify installation:**
Open Terminal/Command Prompt and type:
```bash
node --version
npm --version
```
You should see version numbers.

### Step 2: Install Expo Go on Your Phone

**For Android:**
1. Open Google Play Store
2. Search for "Expo Go"
3. Install the app

**For iOS:**
1. Open App Store
2. Search for "Expo Go"
3. Install the app

### Step 3: Extract the Project

1. Extract the `salhakar-app` folder to a location on your computer
2. Remember this location (e.g., Desktop, Documents, etc.)

### Step 4: Install Project Dependencies

**On Windows:**
1. Open Command Prompt or PowerShell
2. Navigate to the project folder:
   ```bash
   cd path\to\salhakar-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

**On Mac/Linux:**
1. Open Terminal
2. Navigate to the project folder:
   ```bash
   cd path/to/salhakar-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

This will take 5-10 minutes. Wait for it to complete.

### Step 5: Start the Development Server

In the same Terminal/Command Prompt, run:
```bash
npm start
```

Wait for a few seconds. You'll see:
- A QR code in your terminal
- A new browser window might open with development tools

### Step 6: Run on Your Phone

**For Android:**
1. Open Expo Go app
2. Tap "Scan QR code"
3. Scan the QR code from your terminal
4. Wait for the app to load (first time may take 1-2 minutes)

**For iOS:**
1. Open Camera app (not Expo Go)
2. Point at the QR code
3. Tap the notification that appears
4. It will open in Expo Go
5. Wait for the app to load

### Step 7: That's It! 🎉

The app should now be running on your phone. You can:
- Navigate through all features
- Test the UI and animations
- See all the screens

## 🔧 Troubleshooting

### Issue: "Cannot find module" error
**Solution:** Run `npm install` again in the project directory

### Issue: Can't scan QR code
**Solution:** 
- Make sure phone and computer are on same WiFi
- In terminal, press `a` for Android or `i` for iOS to use USB connection
- Or manually type the connection URL shown in terminal into Expo Go

### Issue: "Port 19000 already in use"
**Solution:** 
- Close any other terminals running Expo
- Or run: `npx expo start --port 19001`

### Issue: Metro bundler errors
**Solution:**
```bash
npm start -- --reset-cache
```

### Issue: Blank screen or app won't load
**Solution:**
1. Close Expo Go completely
2. In terminal, press Ctrl+C to stop the server
3. Run `npm start` again
4. Re-scan the QR code

### Issue: "Network response timed out"
**Solution:**
- Check your internet connection
- Disable VPN if any
- Try using mobile hotspot instead of WiFi
- Make sure firewall isn't blocking port 19000/19001

## 📱 Backend Integration

Currently, the app works with **mock data** (sample/dummy data). To connect to a real backend:

1. Start your FastAPI server
2. Note the URL (e.g., `http://localhost:8000`)
3. Open `src/config/api.js` in the project
4. Update `BASE_URL` with your server URL
5. Save and reload the app

## 💡 Development Tips

### To restart the app:
- Shake your phone (physical device)
- Or press Ctrl+M (Android) / Cmd+D (iOS) in simulator
- Select "Reload"

### To see console logs:
- They appear in the terminal where you ran `npm start`
- Or in the browser dev tools

### To stop the server:
- Press Ctrl+C in the terminal

## 🎨 Making Changes

If you want to modify the app:

1. Open the project folder in any code editor (VS Code recommended)
2. Make changes to files in `src/` folder
3. Save the file
4. The app will automatically reload on your phone

## 📚 Useful Commands

```bash
# Start the app
npm start

# Start and clear cache
npm start -- --clear

# Run on Android emulator (if you have Android Studio)
npm run android

# Run on iOS simulator (Mac only, requires Xcode)
npm run ios
```

## 🆘 Need More Help?

1. Check the main README.md file
2. Visit Expo documentation: https://docs.expo.dev/
3. React Native documentation: https://reactnative.dev/

## 📊 What's Working

✅ All screens are implemented
✅ Beautiful UI with animations
✅ Navigation between screens
✅ Voice button placeholders
✅ Search functionality UI
✅ Chatbot interface
✅ Sample data for testing

## ⚙️ What Needs Backend

The following features need FastAPI backend to work fully:
- Real judgment data
- Act and section searches
- Law mapping lookups
- Document template downloads
- YouTube video analysis
- AI chatbot responses
- Voice transcription

Until the backend is connected, you can see the complete UI and user experience with sample data.

---

**Happy Coding! 🚀**

If everything works, you should see a beautiful blue-themed legal assistant app with smooth animations and transitions!

