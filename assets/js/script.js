// Setting variables for HTML elements
var currentDay = $('#currentDay');
var saveBtn = $('.saveBtn');
var clearBtn = $('.clearBtn');
var item = $('.event');
var hour = $('.hour');

// Setting variable to equal the current hour
var time = moment('8am','h:sa').format("HH");


// Setting variables for beginning of day to before work hours
var midnight = moment('00:00:00','HH:mm:ss').format('HH');
var startHour = moment('08:59:00','HH:mm:ss').format('HH');

// Setting variables for after work hours to end of day
var endHour = moment('18:00:00','HH:mm:ss').format('HH');
var dayEnd = moment('23:59:59','HH:mm:ss').format('HH');

// Adds current date to jumbotron
var now = moment().format("dddd, MMMM Do");
currentDay.text(now);

// If there is something in localStorage, then get the events and show on screen. Else, do nothing
if (localStorage.length !== 0) {
    getEvents();
}

function getEvents() {
    // Get events saved to local storage
    // Show events from local storage on screen

    // 9am
    if (localStorage.getItem("9am")) {
        var nineAm = $("<p>" + JSON.parse(localStorage["9am"]) + "</p>");
        $("#nineEvent").append(nineAm[0].innerText);
    }

    // 10am
    if (localStorage.getItem("10am")) {
        var tenAm = $("<p>" + JSON.parse(localStorage["10am"]) + "</p>");
        $("#tenEvent").append(tenAm[0].innerText);
    }

    // 11am
    if (localStorage.getItem("11am")) {
        var elevenAm = $("<p>" + JSON.parse(localStorage["11am"]) + "</p>");
        $("#elevenEvent").append(elevenAm[0].innerText);
    }

    // 12pm
    if (localStorage.getItem("12pm")) {
        var twelvePm = $("<p>" + JSON.parse(localStorage["12pm"]) + "</p>");
        $("#twelveEvent").append(twelvePm[0].innerText);
    }

    // 1pm
    if (localStorage.getItem("1pm")) {
        var onePm = $("<p>" + JSON.parse(localStorage["1pm"]) + "</p>");
        $("#oneEvent").append(onePm[0].innerText);
    }

    // 2pm
    if (localStorage.getItem("2pm")) {
        var twoPm = $("<p>" + JSON.parse(localStorage["2pm"]) + "</p>");
        $("#twoEvent").append(twoPm[0].innerText);
    }

    // 3pm
    if (localStorage.getItem("3pm")) {
        var threePm = $("<p>" + JSON.parse(localStorage["3pm"]) + "</p>");
        $("#threeEvent").append(threePm[0].innerText);
    }

    // 4pm
    if (localStorage.getItem("4pm")) {
        var fourPm = $("<p>" + JSON.parse(localStorage["4pm"]) + "</p>");
        $("#fourEvent").append(fourPm[0].innerText);
    }

    // 5pm
    if (localStorage.getItem("5pm")) {
        var fivePm = $("<p>" + JSON.parse(localStorage["5pm"]) + "</p>");
        $("#fiveEvent").append(fivePm[0].innerText);
    }
}

// When the Save button is clicked, the input in the textarea is saved to local storage ONLY if something is entered
saveBtn.click(function (event) {
    event.preventDefault();

    var button = $(event.target);
    var userEvent = button.prev().val();
    var eventHour = button.prev().prev().text();

    if (userEvent) {
        localStorage.setItem(eventHour,JSON.stringify(userEvent));

    }
});

// If the current time is before work hours, this sets all fields to future
if (time >= midnight && time <= startHour) {
    item.addClass('future');
}

// If the current time is after work hours, this sets all fields to past and disables them
else if (time >= endHour && time <= dayEnd) {
    item.addClass('past');
    item.prop('disabled',true);
}

// For loop checks each timeblock
for (var i = 0; i < hour.length; i++) {
    var hourBlock = hour[i].innerHTML;
    var currentHr = moment(hourBlock,"ha").format("HH");

    // If current time is the same as this time, sets field to present
    if (currentHr === time) {
        var current = $(hour[i]);
        current.next().addClass('present');
    }
    // If current time is after this time, sets field to past and disables it
    else if (currentHr < time) {
        var current = $(hour[i]);
        current.next().addClass('past');
        current.next().prop('disabled',true);
    }
    // If current time is before this timeblock, sets field to future
    else if (currentHr > time) {
        var current = $(hour[i]);
        current.next().addClass('future');
    };
    
};

// Added event listener to clear local storage when Clear Events button is clicked
clearBtn.click(function () {
    localStorage.clear();
    location.reload();
});