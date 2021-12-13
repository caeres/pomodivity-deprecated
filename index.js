class Settings {
    constructor(pomoInterval, sBreakInterval, lBreakInterval) {
        this.pInter = pomoInterval;
        this.sbInter = sBreakInterval;
        this.lbInter = lBreakInterval;
    }
    //yes in theory having three setters is prolly the correct way of doing this but im not going to use that in the curremt version of the site at all
    updateSettings(newPomoInterval, newSBreakInterval, newLBreakInterval){
        this.pInter = newPomoInterval;
        this.sbInter = newSBreakInterval;
        this.lbInter = newLBreakInterval;
    }
    getPomoInterval(){
        return this.pInter;
    }
    getShortBreakInterval(){
        return this.sbInter;
    }
    getLongBreakInterval(){
        return this.lbInter;
    }
    saveSettingsToLS(){
        localStorage.setItem("pomodoroInterval", this.pInter);
        localStorage.setItem("shortBreakInterval", this.sbInter);        
        localStorage.setItem("longBreakInterval", this.lbInter);
    }
}

let todaysCycles = 0;

// in milliseconds
const standardPomodoroInterval = 25*60000;
const standardShortBreakInterval = 5*60000;
const standardLongBreakInterval = 10*60000;

const timerBtns = document.getElementsByClassName("btn-timer");
const mainBtn = document.getElementById("mainBtn");

settingsState = new Settings(standardPomodoroInterval, standardShortBreakInterval, standardLongBreakInterval);

//this for the future - unsure why it doesnt work rn, but should work similar to cookies i guess (saving user preferences in localStorage)
/* if (localStorage.getItem("pomodoroInterval" == null)){
    settingsState = new Settings(standardPomodoroInterval, standardShortBreakInterval, standardLongBreakInterval);
    alert("kein pomodoro Interval");
} else {
    settingsState = new Settings(localStorage.getItem("pomodoroInterval"), localStorage.getItem("shortBreakInterval"), localStorage.getItem("longBreakInterval"));
    alert("pomodoro Interval");
}  */

const state = {
    timerState: false,
    timerDisplay: settingsState.getPomoInterval(),
    activeButton: "pomoBtn" 
}; // YO WTF WHY DO I HAVE TO FUCKOING PLACE A ; THERE?????XDDDDDDD KYS JS THIS FUCKIONG SHIT TOOK ME 2 HOURS TO FIND OUT 

// assigns all buttons with an "click" eventlistener, sets first timerstate
    // give timer element its string in the updateview instead of here?
(async () => {
    document.getElementById("timerDisplay").innerHTML = state.timerDisplay;
    document.getElementById("pomoBtn").addEventListener("click", onClickPomo);
    document.getElementById("shortBtn").addEventListener("click", onClickShortBreak);
    document.getElementById("longBtn").addEventListener("click", onClickLongBreak);
    document.getElementById("mainBtn").addEventListener("click", onClickMain);
    document.getElementById("modalSaveBtn").addEventListener("click", onClickSaveSettings);
})();


function stringToMs(string){
    return parseInt(string)*60000;
}

function msToString(ms){
    let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((ms % (1000 * 60)) / 1000);
    seconds = seconds.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    return minutes.toString() + ":" + seconds.toString();   
}

//start the countdown timer
// time is ms value
function startTimer(maxTime){
    var interval = setInterval(function() {
        state.timerDisplay = state.timerDisplay - 1000;
        maxTime = maxTime - 1000;
        //end condition
        if (maxTime == 0){
            // swap to a break if currently timer was for pomo, every third pomo a long break, increase cycle count
            if (state.activeButton == "pomoBtn"){
                todaysCycles += 1;
                if (todaysCycles % 3 == 0){
                    state.activeButton = "longBtn";
                    state.timerDisplay = settingsState.getLongBreakInterval();
                } else {
                    state.activeButton = "shortBtn";
                    state.timerDisplay = settingsState.getShortBreakInterval();
                }
            // swap to pomo if timer was for break
            }  else if ( state.activeButton == "shortBtn" || state.activeButton == "longBtn"){
                state.activeButton = "pomoBtn";
                state.timerDisplay = settingsState.getPomoInterval();
            }
            clearInterval(interval);
            state.timerState = false;
        }
    }, 1000);
}

function validateSettingsInput(inputValue){
    let regex = new RegExp("^([0-5]?[0-9]|60)$");    
    return regex.test(inputValue);
}
// change the values of the Interval variable on modal dismissal
function onClickSaveSettings(){
    // validate -> alert if not correct [only allow full minutes]
    let pomodoroInterval = document.getElementById("inputPomo").value;
    let shortBreakInterval = document.getElementById("inputShort").value;
    let longBreakInterval = document.getElementById("inputLong").value;
    let validateObject = [
        pomodoroInterval, shortBreakInterval, longBreakInterval
    ];
    //this is so iffy
    let validityCheck = true;
    for (let i = 0; i < 3; i++){
        if(validateSettingsInput(validateObject[i]) == false) {
            alert("The input is not valid. Only values between 0 and 60 minutes are allowed.")
            validityCheck = false;
        } 
    } 
    if (validityCheck){
        settingsState.updateSettings(stringToMs(pomodoroInterval), stringToMs(shortBreakInterval), stringToMs(longBreakInterval)); 
        
        // update state dependent on the current active button (might be possible differently)
        if (state.activeButton == "pomoBtn"){state.timerDisplay = settingsState.getPomoInterval();}
        else if (state.activeButton == "shortBtn"){state.timerDisplay = settingsState.getShortBreakInterval();}
        else {state.timerDisplay = settingsState.getLongBreakInterval();}
    }
}

// this is 100% improvable 
function onClickPomo(){
    state.activeButton = "pomoBtn";
    state.timerDisplay = settingsState.getPomoInterval();
}

function onClickShortBreak(){
    state.activeButton = "shortBtn";
    state.timerDisplay = settingsState.getShortBreakInterval();
}

function onClickLongBreak(){
    state.activeButton = "longBtn";
    state.timerDisplay = settingsState.getLongBreakInterval();
}

//reminder: give the correct /**  */ descriptions for funcitons as soon as youre finished!
function onClickMain(){
    if (state.timerState == false){
        state.timerState = true;
        startTimer(state.timerDisplay);
    } else {
        state.timerState = false;
    }
}

function updateView(){
    //removing all css classes
    mainBtn.classList.remove("btn-start");
    mainBtn.classList.remove("btn-stop");
    for (let i = 0; i < 3; i++){
        btn = timerBtns[i];
        btn.classList.remove("btn-timer-active-visual");
    }
    if (state.timerState == true) {
        mainBtn.classList.add("btn-stop");
        mainBtn.innerHTML = "Stop"; 
        } else {
        mainBtn.classList.add("btn-start");
        mainBtn.innerHTML = "Start";
    }
    document.getElementById("timerDisplay").innerHTML = msToString(state.timerDisplay);
    document.getElementById(state.activeButton).classList.add("btn-timer-active-visual")
    document.getElementById("todaysCycles").innerHTML = todaysCycles;
}
// 100 times per second should be enough :^)
setInterval(updateView, 10)

/*
more shit to learn:

linting -> prgamm to correct style errors [es-lint!]

PWA und Github pages

SASS instead of CSS
TypeScript instead of JS ()
NPm paackges -> npm. org dowload packages (ts-localstorage von phil -> stoorage typisierbar) [über unpkg, bei ts einfahc üper npm install]
animate.css/anime.js/d3.js/gsap -> animations 
frameworks: angular(babo), react(kein fan aber mal gucken), vue(nah), next(anschauen boi[kuurz])
-> front end

firebase, django, flask
-> back end
RRRRRRRRRRRRRRREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
*/ 