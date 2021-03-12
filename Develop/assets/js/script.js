// Setting variables for HTML elements
var currentDay = $('#currentDay');
var saveBtn = $('.saveBtn');
var item = $('.event');
var hour = $('.hour');

// Setting variable to equal the current hour
var time = moment('12pm','h:sa').format("HH");

// Setting variables for beginning of day to before work hours
var midnight = moment('00:00:00','HH:mm:ss').format('HH');
var startHour = moment('08:59:00','HH:mm:ss').format('HH');

// Setting variables for after work hours to end of day
var endHour = moment('18:00:00','HH:mm:ss').format('HH');
var dayEnd = moment('23:59:59','HH:mm:ss').format('HH');

// Get events saved to local storage
var scheduleStored = JSON.parse(localStorage.getItem("userEvents"));

// If no events in local storage, set array to empty
if (scheduleStored === null) {
    scheduleStored = [];
}

// Show events from local storage on screen
console.log(scheduleStored);

// Adds current date to jumbotron
var now = moment().format("dddd, MMMM Do");
currentDay.text(now);

// When the Save button is clicked, the input in the textarea is saved to local storage ONLY if something is entered
saveBtn.click(function (event) {
    event.preventDefault();

    var button = $(event.target);
    var userEvent = button.prev().val();

    if (userEvent) {
        scheduleStored.push(userEvent);
        localStorage.setItem('userEvents',JSON.stringify(scheduleStored));
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
    }
    
}