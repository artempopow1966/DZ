// JavaScript source code
// Pomodoro Timer Logic
let timer;
let timeLeft = 25 * 60; // 25 minutes work session
let isWorkSession = true;
let isRunning = false;
let completedPomodoros = 0;
let bestTime = null;
let totalFocusTime = 0;
let completedSessions = 0;

// DOM Elements
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const progressBar = document.getElementById('progress-bar');
const carIndicator = document.getElementById('car-indicator');
const flagIndicator = document.getElementById('flag-indicator');
const sessionTypeDisplay = document.getElementById('session-type');
const completedPomodorosDisplay = document.getElementById('completed-pomodoros');
const bestTimeDisplay = document.getElementById('best-time');
const currentGrandPrixDisplay = document.getElementById('current-grand-prix');
const totalFocusTimeDisplay = document.getElementById('total-focus-time');
const completedSessionsDisplay = document.getElementById('completed-sessions');

// ✅ применяем шрифт Russo One ко всем ключевым элементам
const russoElements = [
    timeDisplay,
    sessionTypeDisplay,
    completedPomodorosDisplay,
    bestTimeDisplay,
    currentGrandPrixDisplay,
    totalFocusTimeDisplay,
    completedSessionsDisplay,
    startBtn,
    pauseBtn,
    resetBtn
];

russoElements.forEach(el => {
    if (el) el.style.fontFamily = "'Russo One', sans-serif";
});

// Grand Prix names
const grandPrixNames = [
    "GP Производительности в Монако",
    "GP Фокуса в Сильверстоуне",
    "GP Релакса в Сингапуре",
    "GP Продуктивности в Баку",
    "GP Мотивации в Монце"
];

// Initialize
updateDisplay();
currentGrandPrixDisplay.textContent = grandPrixNames[Math.floor(Math.random() * grandPrixNames.length)];

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Timer Functions
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;

        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            updateProgress();
            updateCarPosition();

            if (timeLeft <= 0) {
                clearInterval(timer);
                sessionComplete();
            }
        }, 1000);

        flagIndicator.classList.remove('yellow-flag', 'red-flag');
        document.querySelector('.timer-circle').classList.add('active');
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        flagIndicator.classList.add('yellow-flag');
        document.querySelector('.timer-circle').classList.remove('active');
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    flagIndicator.classList.add('red-flag');
    document.querySelector('.timer-circle').classList.remove('active');

    setTimeout(() => {
        timeLeft = isWorkSession ? 25 * 60 : 5 * 60;
        flagIndicator.classList.remove('yellow-flag', 'red-flag');
        updateDisplay();
        updateProgress();
        updateCarPosition();
    }, 1000);
}

function sessionComplete() {
    isRunning = false;
    flagIndicator.classList.add('red-flag');
    document.querySelector('.timer-circle').classList.remove('active');

    if (isWorkSession) {
        completedPomodoros++;
        completedSessions++;
        const currentTime = isWorkSession ? 25 * 60 : 5 * 60;
        if (!bestTime || currentTime < bestTime) {
            bestTime = currentTime;
            bestTimeDisplay.textContent = formatTime(bestTime);
        }
        totalFocusTime += 25 * 60;
    }

    setTimeout(() => {
        isWorkSession = !isWorkSession;
        timeLeft = isWorkSession ? 25 * 60 : 5 * 60;
        flagIndicator.classList.remove('red-flag');
        updateDisplay();
        updateProgress();
        updateCarPosition();

        if (isWorkSession) {
            currentGrandPrixDisplay.textContent = grandPrixNames[Math.floor(Math.random() * grandPrixNames.length)];
        }

        startBtn.disabled = false;
        updateStats();
    }, 2000);
}

// Display Functions
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    sessionTypeDisplay.textContent = isWorkSession ? "КВАЛИФИКАЦИЯ" : "ПИТ-СТОП";
    completedPomodorosDisplay.textContent = completedPomodoros;
}

function updateProgress() {
    const totalTime = isWorkSession ? 25 * 60 : 5 * 60;
    const progress = ((totalTime - timeLeft) / totalTime) * 100;
    progressBar.style.width = `${progress}%`;
}

function updateCarPosition() {
    const totalTime = isWorkSession ? 25 * 60 : 5 * 60;
    const progress = ((totalTime - timeLeft) / totalTime) * 360;

    const radius = 120;
    const angle = (progress - 90) * (Math.PI / 180);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    carIndicator.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${progress}deg)`;
}

function updateStats() {
    completedPomodorosDisplay.textContent = completedPomodoros;
    completedSessionsDisplay.textContent = completedSessions;
    totalFocusTimeDisplay.textContent = formatTotalTime(totalFocusTime);
}

// Helper Functions
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function formatTotalTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
