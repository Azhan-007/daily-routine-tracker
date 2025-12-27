# 📱 Android Mobile App Build Guide

Your Daily Routine Tracker is now ready to be built as a native Android mobile app!

## ✅ What's Already Done

- ✅ Capacitor dependencies installed
- ✅ Android platform configured
- ✅ Web assets synced to Android project
- ✅ App ready to build and test

## 🚀 Next Steps: Build & Test Your App

You have **3 options** to get your app on your phone:

---

### Option 1: Build with Android Studio (Recommended)

**Prerequisites:**
- Download and install [Android Studio](https://developer.android.com/studio)
- First time setup will take 10-15 minutes

**Steps:**

1. **Open the Android project:**
   ```bash
   npx cap open android
   ```
   This will launch Android Studio with your project.

2. **Wait for Gradle sync** (happens automatically, may take a few minutes first time)

3. **Run on Emulator:**
   - Click "Device Manager" in Android Studio
   - Create a new Virtual Device (e.g., Pixel 6 with Android 13)
   - Click the green "Run" ▶️ button
   - Select your emulator
   - App will install and launch!

4. **Run on Physical Device:**
   - Enable Developer Mode on your phone:
     - Go to **Settings → About Phone**
     - Tap "Build Number" **7 times**
     - Go back to **Settings → Developer Options**
     - Enable **USB Debugging**
   - Connect phone via USB
   - Click the green "Run" ▶️ button
   - Select your phone from the device list
   - App will install and launch!

---

### Option 2: Build APK (Manual Install)

If you have Android Studio and Gradle configured:

1. **Build the debug APK:**
   ```bash
   cd android
   .\gradlew.bat assembleDebug
   ```

2. **Find the APK:**
   ```
   android\app\build\outputs\apk\debug\app-debug.apk
   ```

3. **Install on phone:**
   - Transfer APK to your phone (USB, email, cloud, etc.)
   - Open the APK file on your phone
   - Allow "Install from Unknown Sources" if prompted
   - Click Install

---

### Option 3: Use Online Build Service

Use **eas.dev** (Expo Application Services) or **AppFlow** (Ionic) to build your APK in the cloud:

**With EAS:**
```bash
npm install -g eas-cli
eas build --platform android
```

Follow the prompts to build your APK online. You'll get a download link when it's ready.

---

## 📋 App Details

**App Name:** Daily Routine Tracker  
**Package ID:** `com.dailyroutinetracke.app`  
**Version:** 1.0.0  
**Platform:** Android 5.0+ (API 21+)

## 🧪 Testing Checklist

Once the app is running, verify:

- [ ] App launches without errors
- [ ] Dashboard shows progress ring and summary cards
- [ ] **Health tab:**
  - [ ] Exercise checkbox works
  - [ ] Water counter (+ and - buttons)
  - [ ] Sleep hours input
- [ ] **Deen tab:**
  - [ ] 5 Prayer checkboxes work
  - [ ] Quran pages counter
  - [ ] Zikr counter (+ and - buttons)
- [ ] **Study tab:**
  - [ ] Study goal input
  - [ ] Study time input
  - [ ] Timer presets (25/45/60 min)
  - [ ] Start/Pause/Reset buttons
- [ ] Data persists after closing and reopening app
- [ ] Works offline (enable airplane mode and test)
- [ ] Touch interface is responsive

## 🛠️ Troubleshooting

### "Android Studio not found"
- Download from https://developer.android.com/studio
- Install with default settings
- Restart terminal after installation

### "Gradle sync failed"
- Wait for automatic sync to complete
- If fails, click "Try Again" in Android Studio
- Check internet connection (downloads dependencies)

### "No connected devices"
For Emulator:
- Click "Device Manager" → "Create Device"
- Choose "Pixel 6" → "System Image: Android 13"
- Click "Finish" → "Run"

For Physical Device:
- Enable USB Debugging (see steps above)
- Try a different USB cable
- Install phone drivers (Windows may need specific OEM drivers)

### "App won't install"
- Check phone has enough storage (>100MB)
- Uninstall previous version if exists
- Allow "Install from Unknown Sources" in settings

## 🔄 Making Changes

After modifying your web app files (`web/` directory):

```bash
npx cap sync android
```

Then rebuild/run in Android Studio.

## 📦 Production Build

To create a signed APK for Play Store:

1. **Generate signing key:**
   ```bash
   cd android/app
   keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Update `android/app/build.gradle`:**
   ```gradle
   android {
       signingConfigs {
           release {
               storeFile file('my-release-key.keystore')
               storePassword 'your-password'
               keyAlias 'my-key-alias'
               keyPassword 'your-password'
           }
       }
       buildTypes {
           release {
               signingConfig signingConfigs.release
               // ... other config
           }
       }
   }
   ```

3. **Build release APK:**
   ```bash
   cd android
   .\gradlew.bat assembleRelease
   ```

4. **Find signed APK:**
   ```
   android\app\build\outputs\apk\release\app-release.apk
   ```

## 🎯 What You Get

Your Android app will:
- ✅ Work offline (no internet required)
- ✅ Store data locally on device
- ✅ Have a native app icon
- ✅ Appear in app drawer
- ✅ Be optimized for mobile touch
- ✅ Have the exact same features as the web version

## 📚 Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Studio Guide](https://developer.android.com/studio/intro)
- [Deploy to Play Store](https://capacitorjs.com/docs/android/deploying-to-google-play)

---

## 🎉 Ready to Test!

The simplest path:
1. Install Android Studio
2. Run `npx cap open android`
3. Click the green Run button
4. Your app launches! 🎯

**Need help?** Check the troubleshooting section or refer to the resources above.
