DailyTracker.Deen = {
    toggle: function(prayer) {
        DailyTracker.App.state.data.deen[prayer] = !DailyTracker.App.state.data.deen[prayer];
        DailyTracker.App.save();
        DailyTracker.Router.navigate('deen'); 
    },
    
    zikr: function(amt) {
        if(amt === 0) DailyTracker.App.state.data.deen.zikr = 0;
        else DailyTracker.App.state.data.deen.zikr += amt;
        DailyTracker.App.save();
        document.getElementById('zikr-display').innerText = DailyTracker.App.state.data.deen.zikr;
    },

    render: function() {
        const d = DailyTracker.App.state.data.deen;
        return `
            <div class="card">
                <h2>Daily Prayers</h2>
                ${['fajr','dhuhr','asr','maghrib','isha'].map(p => `
                    <div class="row" onclick="DailyTracker.Deen.toggle('${p}')" style="background:${d[p] ? 'rgba(16, 185, 129, 0.2)' : 'transparent'}; padding:10px; border-radius:8px; border:1px solid #ccc;">
                        <span>${p.toUpperCase()}</span>
                        <span>${d[p] ? '✅' : '⬜'}</span>
                    </div>
                `).join('')}
            </div>
            <div class="card" style="text-align:center;">
                <h2>Tasbeeh Counter</h2>
                <h1 id="zikr-display" style="font-size:3rem; margin:10px;">${d.zikr}</h1>
                <button class="btn" style="height:60px; font-size:1.5rem;" onclick="DailyTracker.Deen.zikr(1)">Count (+)</button>
                <button class="btn" style="background:#ef4444; margin-top:10px;" onclick="DailyTracker.Deen.zikr(0)">Reset</button>
            </div>
        `;
    }
};