DailyTracker.Health = {
    addWater: function() {
        DailyTracker.App.state.data.health.water++;
        DailyTracker.App.save();
        DailyTracker.Router.navigate('health');
    },
    toggleExercise: function() {
        DailyTracker.App.state.data.health.exercise = !DailyTracker.App.state.data.health.exercise;
        DailyTracker.App.save();
        DailyTracker.Router.navigate('health');
    },
    render: function() {
        const h = DailyTracker.App.state.data.health;
        return `
            <div class="card">
                <h2>Water Intake</h2>
                <h1 style="text-align:center; font-size:3rem;">${h.water} 🥤</h1>
                <button class="btn" onclick="DailyTracker.Health.addWater()">Drink Water</button>
            </div>
            <div class="card">
                <h2>Exercise</h2>
                <button class="btn" style="background:${h.exercise ? '#10b981' : '#6b7280'}" onclick="DailyTracker.Health.toggleExercise()">
                    ${h.exercise ? "Workout Done! Great Job" : "Mark Workout Complete"}
                </button>
            </div>
        `;
    }
};