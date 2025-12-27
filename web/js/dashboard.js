DailyTracker.Dashboard = {
    render: function() {
        const d = DailyTracker.App.state.data;
        
        // Calculate Deen Progress
        let prayers = 0;
        ['fajr','dhuhr','asr','maghrib','isha'].forEach(p => { if(d.deen[p]) prayers++ });
        let deenPct = (prayers / 5) * 100;

        return `
            <div class="card">
                <h2>👋 Hello!</h2>
                <p>Here is your daily overview.</p>
            </div>
            <div class="card">
                <h3>🕌 Deen Progress</h3>
                <div style="background:#ddd; height:10px; border-radius:5px; overflow:hidden; margin-top:5px;">
                    <div style="width:${deenPct}%; background:var(--primary); height:100%;"></div>
                </div>
                <p>${prayers}/5 Prayers Completed</p>
            </div>
            <div class="card">
                <h3>❤️ Health Snapshot</h3>
                <p>Water: ${d.health.water} glasses</p>
                <p>Exercise: ${d.health.exercise ? "Completed ✅" : "Not yet ❌"}</p>
            </div>
        `;
    }
};