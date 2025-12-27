// ============================================
// DAILY ROUTINE TRACKER - APP.JS
// Core logic for all tracker functionality
// ============================================

class DailyRoutineTracker {
  constructor() {
    this.data = this.loadData();
    this.timerInterval = null;
    this.timerSeconds = 1500; // 25 minutes default
    this.timerRunning = false;
    this.init();
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  init() {
    this.setupEventListeners();
    this.updateDateDisplay();
    this.renderDashboard();
    this.registerServiceWorker();
    this.loadDayData();
  }

  setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.switchTab(e.target.closest('.nav-btn')));
    });

    // Health tracker
    document.getElementById('water-increase').addEventListener('click', () => this.adjustWater(1));
    document.getElementById('water-decrease').addEventListener('click', () => this.adjustWater(-1));
    document.getElementById('sleep-hours').addEventListener('change', () => this.saveData());

    // Deen tracker
    document.getElementById('zikr-increase').addEventListener('click', () => this.adjustZikr(1));
    document.getElementById('zikr-decrease').addEventListener('click', () => this.adjustZikr(-1));
    document.getElementById('quran-pages').addEventListener('change', () => this.saveData());

    // Study tracker
    document.getElementById('study-goal').addEventListener('change', () => this.saveData());
    document.getElementById('study-time').addEventListener('change', () => this.saveData());
    document.getElementById('timer-start').addEventListener('click', () => this.startTimer());
    document.getElementById('timer-pause').addEventListener('click', () => this.pauseTimer());
    document.getElementById('timer-reset').addEventListener('click', () => this.resetTimer());

    // Timer presets
    document.querySelectorAll('.btn-preset').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const minutes = parseInt(e.target.getAttribute('data-minutes'));
        this.setTimerMinutes(minutes);
      });
    });

    // Checkboxes
    document.querySelectorAll('[data-tracker][data-item]').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.handleCheckboxChange(checkbox);
      });
    });

    // Clear data button
    document.getElementById('clear-data-btn').addEventListener('click', () => {
      if (confirm('Clear all data? This cannot be undone.')) {
        this.clearAllData();
      }
    });
  }

  // ============================================
  // TAB SWITCHING
  // ============================================

  switchTab(navBtn) {
    // Remove active from all buttons
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    navBtn.classList.add('active');

    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

    // Show selected tab
    const tabName = navBtn.getAttribute('data-tab');
    const tabElement = document.getElementById(tabName);
    if (tabElement) {
      tabElement.classList.add('active');
    }

    // Re-render if dashboard
    if (tabName === 'dashboard') {
      this.renderDashboard();
    }
  }

  // ============================================
  // DATE & TIME
  // ============================================

  updateDateDisplay() {
    const today = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const dateStr = today.toLocaleDateString('en-US', options);
    document.getElementById('today-date').textContent = dateStr;
  }

  // ============================================
  // DATA MANAGEMENT (Local Storage)
  // ============================================

  loadData() {
    const saved = localStorage.getItem('routineData');
    if (saved) {
      return JSON.parse(saved);
    }

    // Initialize new day structure
    return {
      date: new Date().toISOString().split('T')[0],
      health: {
        exercise: false,
        water: 0,
        sleep: 0,
      },
      deen: {
        fajr: false,
        dhuhr: false,
        asr: false,
        maghrib: false,
        isha: false,
        quran: 0,
        zikr: 0,
      },
      study: {
        goal: 0,
        time: 0,
      },
      streaks: {},
    };
  }

  saveData() {
    // Check if we need to reset for new day
    const today = new Date().toISOString().split('T')[0];
    if (this.data.date !== today) {
      this.handleNewDay();
    }

    // Update UI before saving
    this.updateAllInputs();

    localStorage.setItem('routineData', JSON.stringify(this.data));
    this.updateLastModified();
  }

  clearAllData() {
    if (confirm('Are you absolutely sure? All data will be lost.')) {
      localStorage.removeItem('routineData');
      localStorage.removeItem('streakData');
      this.data = this.loadData();
      this.init();
      alert('Data cleared!');
    }
  }

  updateLastModified() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('last-updated').textContent = timeStr;
  }

  loadDayData() {
    // Load all current values into inputs
    document.getElementById('sleep-hours').value = this.data.health.sleep || '';
    document.getElementById('water-count').value = this.data.health.water;
    document.getElementById('quran-pages').value = this.data.deen.quran || '';
    document.getElementById('zikr-count').textContent = this.data.deen.zikr;
    document.getElementById('study-goal').value = this.data.study.goal || '';
    document.getElementById('study-time').value = this.data.study.time || '';

    // Load checkboxes
    this.loadCheckboxes();
  }

  loadCheckboxes() {
    document.querySelectorAll('[data-tracker][data-item]').forEach(checkbox => {
      const tracker = checkbox.getAttribute('data-tracker');
      const item = checkbox.getAttribute('data-item');
      checkbox.checked = this.data[tracker][item] || false;
    });
  }

  updateAllInputs() {
    // Health
    this.data.health.sleep = parseFloat(document.getElementById('sleep-hours').value) || 0;
    this.data.health.water = parseInt(document.getElementById('water-count').value) || 0;

    // Deen
    this.data.deen.quran = parseInt(document.getElementById('quran-pages').value) || 0;
    this.data.deen.zikr = parseInt(document.getElementById('zikr-count').textContent) || 0;

    // Study
    this.data.study.goal = parseFloat(document.getElementById('study-goal').value) || 0;
    this.data.study.time = parseFloat(document.getElementById('study-time').value) || 0;

    // Checkboxes
    document.querySelectorAll('[data-tracker][data-item]').forEach(checkbox => {
      const tracker = checkbox.getAttribute('data-tracker');
      const item = checkbox.getAttribute('data-item');
      this.data[tracker][item] = checkbox.checked;
    });
  }

  // ============================================
  // CHECKBOX & TRACKER CHANGES
  // ============================================

  handleCheckboxChange(checkbox) {
    const tracker = checkbox.getAttribute('data-tracker');
    const item = checkbox.getAttribute('data-item');
    this.data[tracker][item] = checkbox.checked;
    this.saveData();
    this.renderDashboard();
  }

  // ============================================
  // HEALTH TRACKER
  // ============================================

  adjustWater(amount) {
    this.data.health.water = Math.max(0, this.data.health.water + amount);
    document.getElementById('water-count').value = this.data.health.water;
    this.saveData();
    this.renderDashboard();
  }

  // ============================================
  // DEEN TRACKER
  // ============================================

  adjustZikr(amount) {
    this.data.deen.zikr = Math.max(0, this.data.deen.zikr + amount);
    document.getElementById('zikr-count').textContent = this.data.deen.zikr;
    this.saveData();
    this.renderDashboard();
  }

  // ============================================
  // STUDY TIMER
  // ============================================

  setTimerMinutes(minutes) {
    this.timerSeconds = minutes * 60;
    this.updateTimerDisplay();
    this.pauseTimer();
  }

  startTimer() {
    if (this.timerRunning) return;
    this.timerRunning = true;

    this.timerInterval = setInterval(() => {
      if (this.timerSeconds > 0) {
        this.timerSeconds--;
        this.updateTimerDisplay();
      } else {
        this.pauseTimer();
        this.notifyTimerComplete();
      }
    }, 1000);
  }

  pauseTimer() {
    this.timerRunning = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  resetTimer() {
    this.pauseTimer();
    this.timerSeconds = 1500; // 25 minutes
    this.updateTimerDisplay();
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.timerSeconds / 60);
    const seconds = this.timerSeconds % 60;
    const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('timer-display').textContent = display;
  }

  notifyTimerComplete() {
    // Visual notification
    alert('⏱️ Study session complete! Take a break.');
    
    // Try browser notification if permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Study Timer Complete!', {
        body: 'Time to take a break!',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="70" font-size="60" text-anchor="middle">✓</text></svg>',
      });
    }
  }

  // ============================================
  // STREAKS
  // ============================================

  getStreaks() {
    const streakData = JSON.parse(localStorage.getItem('streakData') || '{}');
    return streakData;
  }

  updateStreaks() {
    const streakData = this.getStreaks();
    const today = new Date().toISOString().split('T')[0];

    // Check each tracker for completion
    const completionChecks = {
      health: this.isHealthComplete(),
      deen: this.isDeenComplete(),
      study: this.isStudyComplete(),
    };

    for (const [key, isComplete] of Object.entries(completionChecks)) {
      if (!streakData[key]) {
        streakData[key] = { count: 0, lastDate: null };
      }

      if (isComplete) {
        if (streakData[key].lastDate === today) {
          // Already counted today
        } else if (streakData[key].lastDate) {
          const lastDate = new Date(streakData[key].lastDate);
          const todayDate = new Date(today);
          const diffTime = todayDate - lastDate;
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            // Consecutive day
            streakData[key].count++;
          } else {
            // Break in streak
            streakData[key].count = 1;
          }
        } else {
          // First time
          streakData[key].count = 1;
        }
        streakData[key].lastDate = today;
      }
    }

    localStorage.setItem('streakData', JSON.stringify(streakData));
  }

  isHealthComplete() {
    return this.data.health.exercise && 
           this.data.health.water >= 8 && 
           this.data.health.sleep >= 7;
  }

  isDeenComplete() {
    const allPrayersComplete = 
      this.data.deen.fajr && 
      this.data.deen.dhuhr && 
      this.data.deen.asr && 
      this.data.deen.maghrib && 
      this.data.deen.isha;
    
    return allPrayersComplete && this.data.deen.quran > 0;
  }

  isStudyComplete() {
    return this.data.study.time >= this.data.study.goal && this.data.study.goal > 0;
  }

  // ============================================
  // DASHBOARD RENDERING
  // ============================================

  renderDashboard() {
    this.updateStreaks();
    this.renderProgressRing();
    this.renderSummaryCards();
    this.renderStreaksList();
  }

  renderProgressRing() {
    const totalItems = 10; // 1 health + 5 prayers + 1 quran + 1 exercise + 1 study (example)
    
    let completed = 0;
    if (this.data.health.exercise) completed++;
    if (this.data.health.water >= 8) completed++;
    if (this.data.health.sleep >= 7) completed++;
    if (this.data.deen.fajr) completed++;
    if (this.data.deen.dhuhr) completed++;
    if (this.data.deen.asr) completed++;
    if (this.data.deen.maghrib) completed++;
    if (this.data.deen.isha) completed++;
    if (this.data.deen.quran > 0) completed++;
    if (this.data.study.time >= this.data.study.goal && this.data.study.goal > 0) completed++;

    const percentage = Math.round((completed / totalItems) * 100);
    document.getElementById('progress-percentage').textContent = percentage + '%';

    // Update SVG circle
    const circle = document.querySelector('.progress-ring-circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }

  renderSummaryCards() {
    // Health summary
    const healthHTML = `
      <div class="summary-item ${this.data.health.exercise ? 'completed' : ''}">✓ Exercise</div>
      <div class="summary-item ${this.data.health.water >= 8 ? 'completed' : ''}">💧 ${this.data.health.water}/8 glasses</div>
      <div class="summary-item ${this.data.health.sleep >= 7 ? 'completed' : ''}">😴 ${this.data.health.sleep}h sleep</div>
    `;
    document.getElementById('health-summary').innerHTML = healthHTML;

    // Deen summary
    const prayers = [this.data.deen.fajr, this.data.deen.dhuhr, this.data.deen.asr, this.data.deen.maghrib, this.data.deen.isha];
    const prayerCount = prayers.filter(p => p).length;
    const deenHTML = `
      <div class="summary-item ${prayerCount === 5 ? 'completed' : ''}">🕌 ${prayerCount}/5 prayers</div>
      <div class="summary-item ${this.data.deen.quran > 0 ? 'completed' : ''}">📖 ${this.data.deen.quran} pages</div>
      <div class="summary-item">🤲 ${this.data.deen.zikr} zikr</div>
    `;
    document.getElementById('deen-summary').innerHTML = deenHTML;

    // Study summary
    const studyComplete = this.data.study.time >= this.data.study.goal && this.data.study.goal > 0;
    const studyHTML = `
      <div class="summary-item ${studyComplete ? 'completed' : ''}">📚 ${this.data.study.time}/${this.data.study.goal}h</div>
    `;
    document.getElementById('study-summary').innerHTML = studyHTML;
  }

  renderStreaksList() {
    const streakData = this.getStreaks();
    const streakNames = {
      health: '🏃 Health Streak',
      deen: '🕌 Deen Streak',
      study: '📚 Study Streak',
    };

    let html = '';
    for (const [key, data] of Object.entries(streakNames)) {
      const streak = streakData[key] || { count: 0 };
      html += `
        <div class="streak-item">
          <span class="name">${data}</span>
          <span class="count">${streak.count} days 🔥</span>
        </div>
      `;
    }

    document.getElementById('streaks-list').innerHTML = html || '<p style="color: var(--gray-500); font-size: 0.9rem;">Start tracking to build streaks!</p>';
  }

  // ============================================
  // NEW DAY HANDLING
  // ============================================

  handleNewDay() {
    // Save yesterday's data before resetting
    console.log('New day detected - resetting daily data');
    
    this.data = {
      date: new Date().toISOString().split('T')[0],
      health: {
        exercise: false,
        water: 0,
        sleep: 0,
      },
      deen: {
        fajr: false,
        dhuhr: false,
        asr: false,
        maghrib: false,
        isha: false,
        quran: 0,
        zikr: 0,
      },
      study: {
        goal: 0,
        time: 0,
      },
      streaks: {},
    };

    this.loadDayData();
  }

  // ============================================
  // SERVICE WORKER
  // ============================================

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.log('Service Worker registration failed:', err));
    }
  }
}

// ============================================
// INITIALIZATION
// ============================================

let app;

document.addEventListener('DOMContentLoaded', () => {
  app = new DailyRoutineTracker();
});

// Request notification permission on first load
if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission();
}