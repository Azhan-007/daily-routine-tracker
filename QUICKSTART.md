# Quick Reference

## 🎯 What is this app?

A personal habit tracker for:
- **Health** (exercise, water, sleep)
- **Deen** (prayers, Quran, Zikr)  
- **Study** (goals, time, timer)

## ⚡ Quick Start

```bash
# Option 1: Direct browser
Open: d:\daily-routine-tracker\web\index.html

# Option 2: Local server
cd d:\daily-routine-tracker
python -m http.server 8000
# Then visit: http://localhost:8000/web
```

## 🗂️ File Structure

```
web/                    ← The actual app
├── index.html         ← Main file (205 lines)
├── css/styles.css     ← Styling (525 lines)
├── js/app.js          ← All logic (532 lines)
├── service-worker.js  ← Offline caching
├── manifest.json      ← PWA config
└── assets/            ← Icons

desktop/               ← Electron (Windows/Mac)
android/               ← Capacitor (Android)
```

## 📊 How to Use

### Dashboard Tab
- See daily progress (%)
- View summaries
- Check streaks

### Health Tab
- ✓ Exercise checkbox
- 💧 Water counter (target: 8 glasses)
- 😴 Sleep input (target: 7-8 hours)

### Deen Tab
- 🕌 5 prayer checkboxes
- 📖 Quran pages
- 🤲 Zikr counter

### Study Tab
- 📚 Goal hours
- Actual hours logged
- ⏱️ Timer (25/45/60 min)

## 💾 Data

- Saved to **LocalStorage** (in browser)
- **No internet needed** after first load
- **Resets daily** at midnight
- **Offline-first** design

## 🎨 Customize

Change colors in `web/css/styles.css`:
```css
--primary: #4F46E5;    /* Main color */
--success: #10B981;    /* Complete color */
```

Change targets in `web/js/app.js`:
```javascript
// isHealthComplete() method
this.data.health.water >= 8       // Change this number
this.data.health.sleep >= 7       // Change this number
```

## 📱 Install as App

**Desktop**: Open in Chrome → Install icon → "Install"
**Mobile**: Open in Chrome → Menu → "Install app"

Works offline after install!

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Data not saving | Check LocalStorage enabled |
| Service Worker issue | Hard refresh (Ctrl+Shift+R) |
| Timer frozen | Keep tab active |
| Notifications off | Browser permission needed |
| PWA won't install | Use Chrome/Edge, not Safari |

## 📂 Key Files to Edit

| File | Change |
|------|--------|
| `index.html` | Add/remove trackers |
| `styles.css` | Change colors, layout |
| `app.js` | Change logic, completion rules |

## 🚀 Next Steps

1. **Test the web app** (currently running on localhost:8000)
2. **Build for Android** → `npm run android`
3. **Build for Windows** → `cd desktop && npm start`

## 💡 Tips

- All data is **local only** (privacy ✅)
- No backend needed
- No database needed
- Works completely **offline**
- No cloud sync (manual backup if needed)

---

**Everything is ready to use!** 🎉
