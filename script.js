/*Used for formatting dates to display the monnth name(more human-readable way) instead of a numerical value (0-11).*/
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
/*Used for formatting dates to display the weekday name instead of a numerical value (0-6).*/
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
/*To display information about the giveaway, such as its end date or related content.*/
const giveaway = document.querySelector(".giveaway");
/*To display the deadline for the giveaway, such as a countdown timer or a specific date and time.*/
const deadline = document.querySelector(".deadline");
/*To display the individual parts of the countdown, such as the days, hours, minutes, and seconds remaining.*/
const items = document.querySelectorAll(".deadline-format h4");

/*  Creates a Date object, which represents a specific point in  time.
    Used to work with dates and times.
*/
//Automatically captures current date & time from system.
let tempDate = new Date();
//To retrieve the four-digit year from a Date object(here tempDate).
let tempYear = tempDate.getFullYear();
//Extracts the numerical month value (0-11, where 0 is January) from a Date object. Returns a zero-based index for the month.
let tempMonth = tempDate.getMonth();
//Extracts the day of the month (1-31) from a Date object.
let tempDay = tempDate.getDate();

/*  Creates a Date object, representing a future date(giveaway deadline), specifically 10 days from the current date at 10:30 AM.
    Accepts parameters - year, month, day + 10(Sets the day to 10 days ahead of the current day), hours(10 AM), minutes(30), seconds(0). 
*/
const giveawayDate = new Date(tempYear, tempMonth, tempDay + 10, 10, 30, 0);
//Get the year.
const year = giveawayDate.getFullYear();
//Get the hour(0-23)
//Used to extract the hour component of a specific time. Retrieves the hour value(integer) ranging from 0(midnight) to 23(11 PM) from the Date object.
const hours = giveawayDate.getHours();
//Get the minutes(0-59).
//To retrieve the minutes component of the date.
const minutes = giveawayDate.getMinutes();
//Get the month(0-11).
let month = giveawayDate.getMonth();
month = months[month]; //To access the corresponding full month name from the months array and stores it back in the month variable.
//getDay() returns the numerical weekday value (0-6, where 0 is Sunday) from a Date object.
const weekday = weekdays[giveawayDate.getDay()]; //To access the corresponding weekday name from the weekdays array, and stores it back in the weekday variable.

//Get the day of the month (1-31).
const date = giveawayDate.getDate();
//Updating giveaway content.
//Formatted string representing the giveaway's end date and time
giveaway.textContent = `Giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}AM`;

//Retrieves the timestamp(number of milliseconds since January 1, 1970, 00:00:00 UTC)(unix epoch)
//getTime() method is a convenient way to extract this timestamp from a Date object.
const giveawayTime = giveawayDate.getTime(); //No. of milliseconds since Unix epoch till giveaway date.

// Initial calculations for the remaining time - days, hours, minutes, and seconds, ensuring the countdown displays accurate values from the start.
// Calling immediately outside of the interval context.
getRemaindingTime();
/*
Calculates and displays the remaining time until the future(giveaway) date represented by giveawayTime. It's also responsible for handling the countdown logic and expiration message.
*/
function getRemaindingTime() {
  //Retrieves current timestamp(milliseconds since the Unix epoch) using "new Date().getTime()".
  const today = new Date().getTime();

  //Subtracts the current timestamp from the giveawayTime timestamp to get the remaining time in milliseconds.
  const remainingTime = giveawayTime - today;

  // 1s = 1000ms, 1m = 60s, 1hr = 60m & 1d = 24hr.
  // No. of milliseconds in a day, hour, and minute, used for converting milliseconds to days, hours, minutes, and seconds.
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  // Calculate all values.
  let days = remainingTime / oneDay; //Calculate the remaining days.
  days = Math.floor(days); //To round down to whole numbers, to ensure that 'days' holds a whole no. , discarding any fractional parts.

  // Dividing the remaining milliseconds within the day(t % oneDay) by the number of milliseconds in an hour yields the remaining hours(within the current day), until the countdown reaches zero.
  let hours = Math.floor((remainingTime % oneDay) / oneHour);
  let minutes = Math.floor((remainingTime % oneHour) / oneMinute); //Calculate the remaining minutes(within the current hour).
  let seconds = Math.floor((remainingTime % oneMinute) / 1000); //Calculates the remaining seconds(within the current minute).

  // values array - stores the calculated remaining days, hours, minutes, and seconds.
  const values = [days, hours, minutes, seconds];

  //Designed to add a leading zero to single-digit numbers, ensuring consistent two-digit formatting for countdown displays.
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`); ///Concatenates a leading zero (0) with the value of item using a template literal.
    }
    return item; //If item isn't less than 10(meaning it's already a two-digit number), it returns item without modification.
  }
  // Updates the content of each countdown element(stored in items NodeList) with the formatted time values.
  // Calls the provided function for each element in the collection(items).
  items.forEach((item, index) => {
    // Retrieves the corresponding time value from the values array using the current index.
    // Passes this value to the 'format' function to ensure consistent two-digit format.
    // Assigns the formatted time value to the innerHTML property of the current item(the countdown element), updating its displayed content.
    item.innerHTML = format(values[index]);
  });

  let countdown;
  // Means deadline has passed.
  if (remainingTime < 0) {
    //To stop a recurring action that was previously set up using setInterval.
    clearInterval(countdown);
    //Update the whole content of the deadline container.
    deadline.innerHTML = `<h4>Sorry, this giveaway has expired!</h4>`;
  } else {
    // To create recurring actions or events. It repeatedly calls a specified function(here getRemaindingTime) at specified time intervals(1000ms = 1s here).
    // Returns an interval ID(here stored in countdown), which is an integer value used to reference and control the interval.
    countdown = setInterval(getRemaindingTime, 1000);
  }
}
