const timer = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapList = document.getElementById('lap-list');

let intervalId;
let startTime;
let elapsedTime = 0;
let isRunning = false;

function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const formattedSeconds = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
    const formattedMinutes = minutes % 60 < 10 ? `0${minutes % 60}` : minutes % 60;
    const formattedHours = hours < 10 ? `0${hours}` : hours;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function updateTimer() {
    const currentTime = new Date();
    elapsedTime += currentTime - startTime;
    startTime = currentTime;
    timer.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startTime = new Date();
        intervalId = setInterval(updateTimer, 10);
    }
});

pauseBtn.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalId);
    }
});

resetBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
    }
    elapsedTime = 0;
    timer.textContent = '00:00:00';
    lapList.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapList.appendChild(lapItem);
    }
});