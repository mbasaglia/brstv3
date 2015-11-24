/**
 * Bronystate 3.0 - Countdown Script
 * Shizuka Kamishima - 2015-11-23
 */

var timerbar = document.getElementById("timerbar");
var timertitle = document.getElementById("timertitle");
var timerclock = document.getElementById("timerclock");
var sidetimers = document.getElementById("sidetimers");

var interval; //to hold the setInterval()

var nextFridayMovie = { title: "Friday Movie Night", moment: moment.tz("America/New_York").hour(19).minute(0).second(0).millisecond(0).day(5), url: "" };
var nextSaturdayMovie = { title: "Saturday Movie Night", moment: moment.tz("America/New_York").hour(14).minute(0).second(0).millisecond(0).day(6), url: "" };

function loadTimers() {
  console.log("Adding moments to timers...");
  console.log(brst_timers.length);
  // add momentjs objects to timers
  for (var i = 0; i < brst_timers.length; i++) {
    brst_timers[i]["moment"] = moment(brst_timers[i].time, "YYYY-MM-DD HH:mm Z");
    console.log('Loaded timer: "' + brst_timers[i].title + '" @ ' + brst_timers[i].moment.toISOString());
  }
  brst_timers.push(nextFridayMovie, nextSaturdayMovie);
  brst_timers.sort(cmpTimers);
  update();
}

function cmpTimers(a, b) {
  if (a.moment.isBefore(b.moment))
    return -1;
  if (a.moment.isAfter(b.moment))
    return 1;
  return 0;
}

function update() {
  var now = moment();
  var shown = 0;
  var titledone = false;
  
  for (var i = 0; i < brst_timers.length; i++) {
    var timer = brst_timers[i];
    if (now.isAfter(timer.moment)) {
      continue;
    }
    shown++;
    if (!titledone) {
      var time = calcRemaining(timer.moment);
      timertitle.innerHTML = timerTitle(timer) + " in";
      timerclock.innerHTML = time;
      titledone = true;
    }
  }
}

function timerTitle(timer) {
  var title = timer.title;
  if (timer.url !== "undefined" && timer.url != "") {
    title = '<a href="' + timer.url + '">' + title + '</a>';
  }
  return title;
}

function calcRemaining(mo) {
  var delta = mo.diff(moment(), 'minutes');
  var days = Math.floor(delta / (60 * 24));
  delta -= days * 60 * 24;
  var hours = Math.floor(delta / 60);
  delta -= hours * 60;
  var minutes = delta;
  return days + "d " + hours + "h " + minutes + "m";
}

window.onload = loadTimers;
interval = setInterval(update, 30000);
