let cycles = 0;
// well this has to be updated in some function ofc
// let totalCycles = localStorage.getItem(totalCycles)
let pomodoroIntervall = "25";
let shortBreakIntervall = "05";
let longBreakIntervall = "15";

let timerBtns = document.getElementsByClassName("btn-timer");

const state = {
  isTimerStarted: false,
  timerDisplay: "00:00",
};

// assigns all buttons with an "click" eventlistener
(async () => {
  // doesnt acutally need an event listener rn, just opens the modal, which happens in HTML
  // could shift that tho, so that all funcitonality is js side?
  // document.getElementById("settingsBtn").addEventListener("click", onClickMain);

  //question: when add a funciton to async (yea i prolly forgot and you already told me)
  document.getElementById("timerDisplay").innerHTML = pomodoroIntervall + ":00";

  document.getElementById("pomoBtn").addEventListener("click", onClickPomo);
  document.getElementById("shortBtn").addEventListener("click", onClickShortBreak);
  document.getElementById("longBtn").addEventListener("click", onClickLongBreak);
  document.getElementById("mainBtn").addEventListener("click", onClickMain);
  document.getElementById("modalSaveBtn").addEventListener("click", onClickSaveSettings);
})();

//start the countdown timer -höhö later
// settimeout (prolly due performacne) oder setintervall
function startTimer() {}

// change the values of the Intervall variable on modal dismissal
function onClickSaveSettings() {
  //get input value and update env vars
  pomodoroIntervall = document.getElementById("inputPomo").value;
  shortBreakIntervall = document.getElementById("inputShort").value;
  longBreakIntervall = document.getElementById("inputLong").value;
  //update the shown timer - depends on the currently active button?
}

//function to check timer button for active state
function checkTimerBtnState() {}
//function to change timer button state
function toggleTimerBtnState() {}
//change the value of the timer to fit the pressed button (how to handle display switch while timer is runnnign?)
function onClickPomo() {
  state.timerDisplay = pomodoroIntervall + ":00";
  updateView();
}
function onClickShortBreak() {
  state.timerDisplay = shortBreakIntervall + ":00";
  updateView();
}
function onClickLongBreak() {
  state.timerDisplay = longBreakIntervall + ":00";
  updateView();
}

/**
 * Toggles the CSS classes for the start button
 * Starts the countdown of the current timer
 * must not change the active timer button! (otherwise user doesnt know which timer is ticking down)
 */
function onClickMain() {
  state.isTimerStarted = !state.isTimerStarted;
  updateView();
  startTimer();
}

// in timer function
function displayTodaysCycles() {
  document.getElementById("todaysCycles").innerHTML = cycles;
}

function updateView() {
  const mainBtn = document.getElementById("mainBtn");
  mainBtn.classList.remove("btn-stop");
  mainBtn.classList.remove("btn-start");
  if (state.isTimerStarted) {
    mainBtn.innerHTML = "Stop";
    mainBtn.classList.add("btn-stop");
  } else {
    mainBtn.innerHTML = "Start";
    mainBtn.classList.add("btn-start");
  }

  document.getElementById("timerDisplay").innerHTML = state.timerDisplay;
}

/*
more shit to learn:

linting -> prgamm to correct style errors [es-lint!]

SASS instead of CSS
TypeScript instead of JS ()
NPm paackges -> npm. org dowload packages (ts-localstorage von phil -> stoorage typisierbar) [über unpkg, bei ts einfahc üper npm install]
animate.css/anime.js/d3.js/gsap -> animations 
frameworks: angular(babo), react(kein fan aber mal gucken), vue(nah), next(anschauen boi[kuurz])
-> front end

firebase, django, flask
-> back end

*/
