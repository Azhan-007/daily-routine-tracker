DailyTracker.Study = {
    timerInterval: null,

    startTimer: function() {
        if(this.timerInterval) return;
        this.timerInterval = setInterval(() => {
            if(DailyTracker.App.state.data.study.timer > 0) {
                DailyTracker.App.state.data.study.timer--;
                const display = document.getElementById('timer-display');
                if(display) display.innerText = this.format(DailyTracker.App.state.data.study.timer);
            } else {
                clearInterval(this.timerInterval);
                alert("Study session complete!");
            }
        }, 1000);
    },

    stopTimer: function() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
    },

    resetTimer: function() {
        this.stopTimer();
        DailyTracker.App.state.data.study.timer = 1500; 
        const display = document.getElementById('timer-display');
        if(display) display.innerText = this.format(1500);
    },

    format: function(s) {
        return new Date(s * 1000).toISOString().substring(14, 19);
    },

    attachListeners: function() {},

    render: function() {
        const s = DailyTracker.App.state.data.study;
        return `
            <div class="card" style="text-align:center;">
                <h2>Pomodoro Timer</h2>
                <div id="timer-display" style="font-size:4rem; margin:20px 0;">${this.format(s.timer)}</div>
                <div class="row">
                    <button class="btn" onclick="DailyTracker.Study.startTimer()">Start</button>
                    <div style="width:10px"></div>
                    <button class="btn" style="background:#ef4444" onclick="DailyTracker.Study.stopTimer()">Pause</button>
                </div>
                <button class="btn" style="background:#6b7280" onclick="DailyTracker.Study.resetTimer()">Reset</button>
            </div>
        `;
    }
};