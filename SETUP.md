# Setup & Installation Guide

## 📋 Prerequisites

- Node.js 14+ (for npm)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Python 3 (for local server alternative)

## 🚀 Quick Start (5 minutes)

### Method 1: Direct Browser (Fastest)
```bash
# No setup needed - just open file
# Navigate to: d:\daily-routine-tracker\web\index.html
# Double-click index.html to open in default browser
```

### Method 2: Local HTTP Server (Recommended)
```bash
# Using Python (built-in on Windows/Mac/Linux)
cd d:\daily-routine-tracker
python -m http.server 8000

# Then open browser to: http://localhost:8000/web
```

### Method 3: npm Server
```bash
cd d:\daily-routine-tracker
npm install
npm start

# Then open browser to: http://localhost:8000/web
```

## ✨ First Time Setup

1. **Open the app**
   - Browser will ask for notification permission
   - Click "Allow" to enable timer notifications

2. **Explore the interface**
   - 4 tabs: Dashboard, Health, Deen, Study
   - Dashboard shows your daily progress %
   - Each tab has different trackers

3. **Try tracking**
   - Check "Exercise Today" in Health tab
   - Add 2 glasses of water
   - Pray Fajr and Dhuhr in Deen tab
   - Set study goal to 2 hours in Study tab
   - Switch to Dashboard to see progress update

4. **Test persistence**
   - Close browser tab
   - Reopen app
   - Your data is still there! (LocalStorage)

## 📱 Install as App

### Windows/Mac/Linux Desktop
1. Open the app in Chrome or Edge
2. Look for **install icon** in address bar (⬇️)
3. Click "Install"
4. App appears in Start Menu / Applications

### Android Phone
1. Open app in Chrome mobile
2. Tap **menu** (⋮) → "Install app"
3. Adds shortcut to home screen with offline support

### iOS iPad
1. Open app in Safari
2. Tap **Share** button → "Add to Home Screen"
3. Tap "Add"
4. App works offline on home screen

## 🔧 Configuration

### Dark Mode (Optional)
Currently set to light theme. To customize:
1. Edit `web/css/styles.css`
2. Change `--gray-50`, `--gray-900` values
3. Save and reload

### Custom Color Scheme
Edit `web/css/styles.css`:
```css
:root {
  --primary: #4F46E5;      /* Main app color */
  --success: #10B981;      /* Completion color */
  --warning: #F59E0B;      /* Streak/warning color */
}
```

### Change Completion Targets
Edit `web/js/app.js`:
```javascript
// Find these methods and adjust values:
isHealthComplete() {
  return this.data.health.exercise && 
         this.data.health.water >= 8 &&    // Change 8 to desired glasses
         this.data.health.sleep >= 7;      // Change 7 to desired hours
}
```

## 📊 Data Management

### Where is my data stored?
- Browser's LocalStorage (`routineData` key)
- Streak data in separate key (`streakData`)
- No cloud sync - stored locally on device

### Export Data
```javascript
// Run this in browser console (F12)
console.log(JSON.parse(localStorage.getItem('routineData')))
console.log(JSON.parse(localStorage.getItem('streakData')))
```

### Clear Data
- Click "Clear Data" button in Footer
- Or manually in DevTools:
  ```javascript
  localStorage.removeItem('routineData')
  localStorage.removeItem('streakData')
  ```

### Backup Data
```javascript
// In browser console (F12):
const backup = {
  routineData: localStorage.getItem('routineData'),
  streakData: localStorage.getItem('streakData')
}
console.save('backup.json', JSON.stringify(backup, null, 2))
```

## 🔌 API & Offline

### Does it need internet?
- **First load**: Yes (to download assets)
- **Daily use**: No (fully offline-capable)
- **After install as PWA**: Works 100% offline

### Service Worker
- Automatically caches app files
- Serves from cache when offline
- Updates cache when online

### Browser Requirements
| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 88+ | ✅ Full support |
| Edge | 88+ | ✅ Full support |
| Firefox | 87+ | ✅ Full support |
| Safari | 14+ | ✅ Full support |
| Mobile Chrome | Latest | ✅ Full support |

## 🐛 Troubleshooting

### Issue: Data not saving
**Solution**: 
- Check if browser allows LocalStorage
- Try clearing browser cache
- Disable privacy mode/incognito

### Issue: Service Worker not caching
**Solution**:
- Must use HTTPS or localhost
- Check DevTools → Application → Service Workers
- Hard refresh (Ctrl+Shift+R)

### Issue: Timer doesn't work
**Solution**:
- Browser pauses timers in inactive tabs
- Keep app tab active while timer running
- Some browsers require tab focus

### Issue: Notifications not showing
**Solution**:
- Browser asks once - check your permission
- Reset: Settings → Permissions → Notifications
- Allow notifications from browser

### Issue: PWA won't install
**Solution**:
- Must use Chrome, Edge, Firefox, or Samsung
- Safari uses different method (Add to Home Screen)
- Ensure HTTPS (or localhost)

## 🚀 Next: Mobile & Desktop Apps

### Android App (Capacitor)
```bash
npm install
npx cap add android
npm run android
# Opens Android Studio - build APK
```

### Windows App (Electron)
```bash
cd desktop
npm install
npm start
# Creates standalone Windows executable
```

Both use the same `web/` code - no rewrite needed!

## 📚 File Reference

| File | Purpose | Size |
|------|---------|------|
| `index.html` | App markup | 12 KB |
| `styles.css` | Styling | 18 KB |
| `app.js` | Logic | 20 KB |
| `service-worker.js` | Offline caching | 2 KB |
| `manifest.json` | PWA config | 1 KB |

**Total**: ~50 KB uncompressed

## 💡 Tips & Tricks

- **Keyboard shortcuts**: Tab key to navigate (built-in accessibility)
- **Mobile optimization**: Add app to home screen for better experience
- **Offline mode**: Go offline (dev tools) to test full offline functionality
- **Data export**: Use browser's export feature to backup JSON
- **Timer presets**: Use 25/45/60 buttons for quick setup

## 🎯 How It Works

1. **Load**: Browser downloads HTML/CSS/JS
2. **Run**: App initializes, loads data from LocalStorage
3. **Track**: You add data through the UI
4. **Save**: Data auto-saves to LocalStorage on every change
5. **Cache**: Service Worker caches all assets
6. **Offline**: If connection lost, app still works from cache

## ❓ FAQ

**Q: Is my data safe?**
A: Data never leaves your device. It's stored in browser's LocalStorage only.

**Q: Can I sync across devices?**
A: Currently no. Each device has separate storage. You can export/import manually.

**Q: Does it work without internet?**
A: Yes! After first load, works 100% offline.

**Q: Can I delete all data?**
A: Yes. Click "Clear Data" in footer, or delete from LocalStorage.

**Q: Which browser is best?**
A: Chrome/Edge for best PWA experience. Firefox is excellent too.

**Q: How do I update the app?**
A: Reload browser. Service worker checks for updates automatically.

## 🎓 Learning Resources

- [MDN Web Docs](https://developer.mozilla.org) - Web technologies
- [Web.dev](https://web.dev/progressive-web-apps/) - PWA guide
- [JavaScript.info](https://javascript.info) - JS fundamentals

## 🤝 Support

For issues:
1. Check browser console (F12) for errors
2. Review this guide's troubleshooting section
3. Check LocalStorage data integrity
4. Try clearing cache and reloading

---

**You're all set!** Start tracking your daily routines! 🎯
