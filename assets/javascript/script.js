// DEPENDENCIES
var formEl = $("#form");
var inputEl = $("#cityInput");

var tempTd = $(".temp");
var windTd = $(".wind")
var humidityTd = $(".humidity")
var UVTd = $(".UV")
var tempWeekEl = $("#weekTemp");
var prevCity = $("prevCity");


// DATA

var lata;
var long;

// FUNCTIONS

$(function () {
  var availableTags = [
    "Austin", 
    "Chicago", 
    "New York",
    "Orlando", 
    "San Francisco", 
    "Seattle", 
    "Denver", 
    "Atlanta", 
    "San Diego"
  ];
  $("#cityInput").autocomplete({
    source: availableTags,
  });
});

function onSubmit(event) {
  event.preventDefault();
  var city = inputEl.val();
  localStorage.setItem("City", city);
  showPrevCity();
  renderTdWeather(city);
  render5DayWeather(city);
}

function showPrevCity() {
  prevCity.text(localStorage.getItem("City"))
}

function renderTdWeather(city) {
  var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=d82badb906f2ae8891cd46df1588137f`;
  fetch(geoURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      lata = data[0].lat;
      long = data[0].lon;
    });
  var todayURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lata}&lon=${long}&units=imperial&appid=d82badb906f2ae8891cd46df1588137f`;
  fetch(todayURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      tempTd.text(`Temp: ${(data.current.temp).toFixed(2)}°F`);
      windTd.text(`Wind: ${data.current.wind_speed} MPH`);
      humidityTd.text(`Humidity: ${data.current.humidity}%`);
      var UVIndex = data.current.uvi;
      UVTd.text(`UV Index: ${UVIndex}`);
      if (UVIndex <= 2) {
        UVTd.css("background-color", "green");
      } else if (UVIndex <= 5) {
        UVTd.css("background-color", "orange");
      } else {
        UVTd.css("background-color", "red");
      }
    });
}

function render5DayWeather(city) {
  var weekURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=d82badb906f2ae8891cd46df1588137f`
  fetch(weekURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var days = tempWeekEl.children().children();
      
      for (var i = 0; i < days.length; i++) {
        days.eq(i).children().eq(2).text(`Temp: ${data.list[i].main.temp}°F`);
        days.eq(i).children().eq(3).text(`Wind: ${data.list[i].wind.speed} MPH`);
        days.eq(i).children().eq(4).text(`Humidity: ${data.list[i].main.humidity}%`);
      }
    });
}


// USER INTERACTIONS

// For some reason when the form is submitted it refreshes the page even though i have event.preventDefault();
// formEl.on("submit", onSubmit)

// INITIALIZATION

// Use this block of code since event.preventDefault(); isnt working
renderTdWeather("Austin")
render5DayWeather("Austin")
showPrevCity();

