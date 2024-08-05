// scriptin.js
document.addEventListener('DOMContentLoaded', () => {
    const timeDisplay = document.getElementById('time');
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const lapButton = document.getElementById('lap');
    const lapsDisplay = document.getElementById('laps');

    let startTime = 0;
    let updatedTime = 0;
    let difference = 0;
    let tInterval;
    let running = false;
    let lapCount = 1;

    const formatTime = (time) => {
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const updateTimeDisplay = () => {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;
        timeDisplay.textContent = formatTime(difference);
    };

    const startTimer = () => {
        if (!running) {
            running = true;
            startTime = new Date().getTime();
            tInterval = setInterval(updateTimeDisplay, 1000);
        }
    };

    const pauseTimer = () => {
        if (running) {
            running = false;
            clearInterval(tInterval);
        }
    };

    const resetTimer = () => {
        running = false;
        clearInterval(tInterval);
        timeDisplay.textContent = '00:00:00';
        lapCount = 1;
        lapsDisplay.innerHTML = '';
    };

    const recordLap = () => {
        if (running) {
            const lapTime = timeDisplay.textContent;
            lapsDisplay.innerHTML += `<p>Lap ${lapCount++}: ${lapTime}</p>`;
        }
    };

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
    lapButton.addEventListener('click', recordLap);
});
