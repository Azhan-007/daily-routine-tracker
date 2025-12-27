# Daily Routine Tracker

A minimal, offline-first Progressive Web App for tracking daily routines across three life areas:
- **Health**: Exercise, water intake, sleep
- **Deen (Faith)**: 5 daily prayers, Quran reading, Zikr
- **Study**: Study goals, time tracking, Pomodoro timer

Built with vanilla JavaScript, HTML, and CSS - no frameworks, no dependencies for the web app.

## Features

✅ **Dashboard** - Real-time progress tracking with completion percentage and streaks
✅ **Health Tracker** - Exercise checkbox, water intake counter, sleep hours logger
✅ **Deen Tracker** - 5 prayer checklist, Quran page tracker, Zikr counter
✅ **Study Tracker** - Goal-based time tracking with built-in timer (25/45/60 min presets)
✅ **Streak System** - Automatic daily streak tracking for each category
✅ **Offline Support** - Progressive Web App with service worker caching
✅ **Local Storage** - All data saved in browser (no backend required)
✅ **Mobile-First** - Responsive design for phones, tablets, and desktops
✅ **Auto-Reset** - Daily data resets at midnight automatically
✅ **Notification Alerts** - Browser notifications for timer completion

## Project Structure

```
daily-routine-tracker/
├── web/
│   ├── index.html              # Main app markup
│   ├── manifest.json           # PWA configuration
│   ├── service-worker.js       # Offline caching
│   ├── css/
│   │   └── styles.css          # All styling (mobile-first)
│   ├── js/
│   │   └── app.js              # Complete app logic (532 lines)
│   └── assets/
│       ├── icons/              # PWA icons (192x512)
│       └── images/             # Screenshots
├── desktop/                    # Electron app (for Windows/Mac)
│   ├── main.js
│   ├── preload.js
│   ├── package.json
│   └── electron.config.js
├── android/                    # Capacitor android (for Android)
├── capacitor.config.json       # Capacitor settings
├── package.json                # Dependencies
└── README.md
```

## Quick Start (Web App)

### Option 1: Direct in Browser

1. Open `web/index.html` in any modern web browser
2. Allow notifications when prompted
3. Start tracking! 🎯

### Option 2: With Local Server (Recommended)

```bash
# Install dependencies
npm install

# Start HTTP server
npm start

# Open in browser
# http://localhost:8000
```

## Usage

### Dashboard
- View daily completion % (0-100%)
- See summaries of each category
- Check active streaks

### Health Tab
- ✓ Exercise: Check when you exercise
- 💧 Water: Count glasses (target 8)
- 😴 Sleep: Log hours (target 7-8)

### Deen Tab
- 🕌 Prayers: Fajr, Dhuhr, Asr, Maghrib, Isha
- 📖 Quran: Log pages read
- 🤲 Zikr: Increment counter

### Study Tab
- 📚 Set daily goal (hours)
- Track actual study time
- Use timer (Pomodoro style)
  - 25 min (focus)
  - 45 min (deep work)
  - 60 min (marathon)

## Data & Storage

- All data saved in browser's LocalStorage
- Data persists across browser sessions
- Resets daily at midnight automatically
- Use "Clear Data" button to manually reset

## Install as PWA

### Desktop (Windows/Mac/Linux)
1. Open app in Chrome/Edge
2. Click the install icon in address bar
3. Click "Install"
4. App installs to your desktop

### Mobile (Android)
1. Open app in Chrome
2. Tap menu (⋮)
3. Tap "Install app"
4. App installs to home screen

## Build for Native Apps

### Android (Capacitor)

```bash
npm install
npx cap add android
npm run android              # Run on device/emulator
npx cap open android         # Open Android Studio
```

### Desktop (Electron)

```bash
cd desktop
npm install
npm start                    # Run dev version
npm run build               # Build executable
```

## Browser Compatibility

- ✅ Chrome/Edge 88+
- ✅ Firefox 87+
- ✅ Safari 14+
- ✅ Mobile Chrome/Firefox
- ⚠️ IE 11 (not supported)

## Technical Details

### Core Technologies
- **HTML5**: Semantic markup
- **CSS3**: Mobile-first, responsive grid
- **JavaScript ES6+**: Class-based, modular
- **Service Worker**: Offline-first caching
- **LocalStorage API**: Browser data persistence

### No External Dependencies
- ✅ Vanilla JavaScript (no jQuery, React, Vue, etc.)
- ✅ No backend API required
- ✅ No database needed
- ✅ No CDN assets

### Performance
- 📦 ~50KB total (HTML + CSS + JS)
- ⚡ Load time: <1 second
- 📱 Works offline completely
- 🔋 Minimal battery usage

## Customization

### Change Theme Color
Edit `web/css/styles.css`:
```css
--primary: #4F46E5;  /* Change this color */
```

### Modify Completion Targets
Edit `web/js/app.js`, look for these methods:
- `isHealthComplete()` - Change water/sleep targets
- `isDeenComplete()` - Change prayer/quran requirements
- `isStudyComplete()` - Change study goal logic

### Add New Trackers
1. Add HTML inputs in `index.html`
2. Add data fields in `loadData()`
3. Add event listeners in `setupEventListeners()`
4. Add to summary cards in `renderSummaryCards()`

## Troubleshooting

**Data not saving?**
- Check browser's LocalStorage isn't disabled
- Try clearing cache and reload

**Service worker not working?**
- Ensure you're using HTTPS or localhost
- Check browser console for errors

**Timer not working?**
- Make sure tab stays active (some browsers pause background timers)

**App won't install as PWA?**
- Use Chrome/Edge (not all browsers support PWA install)
- Make sure manifest.json is properly linked

## Development

### File Structure
- `web/index.html` - Single page app markup (205 lines)
- `web/css/styles.css` - All styling (525 lines)
- `web/js/app.js` - Complete logic (532 lines)

### Editing Tips
- Change HTML: Edit `index.html`, reload browser
- Change styles: Edit `styles.css`, reload browser
- Change logic: Edit `app.js`, reload browser
- LocalStorage data persists across reloads

### Debugging
Open browser DevTools (F12):
- **Console**: See logs and errors
- **Application > LocalStorage**: View saved data
- **Application > Service Workers**: Check PWA status
- **Network**: See offline caching behavior

## License

MIT - Free to use and modify

## Author

Built with ❤️ for daily habit tracking

---

## Next Steps

Once the web app is working:

1. **Android App**: Run `npm run android` (uses Capacitor)
2. **Desktop App**: Navigate to `desktop/` and run `npm start` (uses Electron)
3. **Deployment**: Host on Vercel, Netlify, or GitHub Pages

All use the same `web/` codebase - no code duplication!

