const swTime = document.querySelector("#stopwatch span"),
  swPlayBtn = document.querySelector("#stopwatch #buttons i.fa-play"),
  swPauseBtn = document.querySelector("#stopwatch #buttons i.fa-pause"),
  swLapBtn = document.querySelector("#stopwatch #buttons i.fa-add"),
  swResetBtn = document.querySelector("#stopwatch #buttons i.fa-refresh"),
  swElem = document.querySelector("#stopwatch span");

let seconds = 0;
let minutes = 0;
let hours = 0;

function stopwatch() {
  seconds++;

  if (seconds === 60) {
    seconds = 0;
    minutes++;

    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }

  let displaySeconds = seconds < 10 ? "0" + seconds : seconds;
  let displayMinutes = minutes < 10 ? "0" + minutes : minutes;
  let displayHours = hours < 10 ? "0" + hours : hours;

  swElem.innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
}

let interval;

swPlayBtn.addEventListener("click", () => {
  interval = setInterval(stopwatch, 1000);
  swPlayBtn.classList.add("hide");
  swPauseBtn.classList.remove("hide");
  checkLapReset();
});

swPauseBtn.addEventListener("click", () => {
  clearInterval(interval);
  swPauseBtn.classList.add("hide");
  swPlayBtn.classList.remove("hide");
  checkLapReset();
});

const lapsElem = document.querySelector("#stopwatch #laps");

let lapMTPDiff;

function lapDiff(time1, time2) {
  time1 = time1.split(":");
  time2 = time2.split(":");

  let time1InSeconds = time1[0] * 3600 + time1[1] * 60 + time1[2];
  let time2InSeconds = time2[0] * 3600 + time2[1] * 60 + time2[2];

  let timeDiffInSeconds = time1InSeconds - time2InSeconds;

  let timeDiffHours = Math.floor(timeDiffInSeconds / 3600);
  timeDiffInSeconds %= 3600;
  let timeDiffMinutes = Math.floor(timeDiffInSeconds / 60);
  let timeDiffSeconds = timeDiffInSeconds % 60;

  lapMTPDiff = `${timeDiffHours > 9 ? timeDiffHours : "0" + timeDiffHours}:${
    timeDiffMinutes > 9 ? timeDiffMinutes : "0" + timeDiffMinutes
  }:${timeDiffSeconds > 9 ? timeDiffSeconds : "0" + timeDiffSeconds}`;
}

swLapBtn.addEventListener("click", () => {
  if (lapsElem.style.display == "") {
    lapsElem.style.display = "flex";
    document.querySelectorAll("#stopwatch label")[1].style.display = "block";
  }
  let lapTime = swElem.innerHTML;
  let lapMTP;
  if (lapsElem.innerHTML == "") {
    lapMTP = lapTime;
  } else {
    let laps = lapsElem.querySelectorAll("li");
    let lastLap = laps[laps.length - 1];
    let lastLapTime = lastLap.querySelector(".time").innerHTML;
    lapMTP = lastLapTime.replace("+", "");
    lapDiff(swElem.innerHTML, lastLapTime);
    lapMTP = lapMTPDiff;
  }
  lapsElem.innerHTML += `<li class="lap"><span class="time">${lapTime}</span><span class="mtp">+${lapMTP}</span></li>`;
});

swResetBtn.addEventListener("click", () => {
  if (swResetBtn.classList.contains("can-click")) {
    seconds = 0;
    minutes = 0;
    hours = 0;
    if (swPlayBtn.classList.contains("hide")) {
      swPauseBtn.click();
    }
    swElem.innerHTML = "00:00:00";
    checkLapReset();
  }
  lapsElem.style.display = "none";
  document.querySelectorAll("#stopwatch label")[1].style.display = "none";
});

function checkLapReset() {
  if (!(swElem.innerHTML == "00:00:00")) {
    if (swResetBtn.classList.contains("no-click")) {
      swResetBtn.classList.remove("no-click");
      swResetBtn.classList.add("can-click");
    }
    if (swLapBtn.classList.contains("no-click")) {
      swLapBtn.classList.remove("no-click");
      swLapBtn.classList.add("can-click");
    }
  } else {
    swLapBtn.classList.add("no-click");
    swLapBtn.classList.remove("can-click");
    swResetBtn.classList.add("no-click");
    swResetBtn.classList.remove("can-click");
  }
}

checkLapReset();
