let timer = null;
let elapsedTime = 0;
let isRunning = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapsList = document.getElementById("laps");

function formatTime(ms) {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60));
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
  if (isRunning) return;
  isRunning = true;
  const startTime = Date.now() - elapsedTime;

  timer = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 100);
}

function pauseStopwatch() {
  if (!isRunning) return;
  isRunning = false;
  clearInterval(timer);
}

function resetStopwatch() {
  isRunning = false;
  clearInterval(timer);
  elapsedTime = 0;
  updateDisplay();
  lapsList.innerHTML = "";
}

function addLap() {
  if (!isRunning) return;
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement("li");
  lapItem.textContent = lapTime;
  lapsList.appendChild(lapItem);
}

startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
display.addEventListener("click", addLap);
