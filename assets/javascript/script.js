// DEPENDENCIES
var formEl = $("#form");
var inputEl = $(".cityInput");

var tempTd = $(".temp");
var windTd = $(".wind")
var humidityTd = $(".humidity")
var UVTd = $(".UV")
var tempWeekEl = $("#weekTemp");


// DATA


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
  $(".cityInput").autocomplete({
    source: availableTags,
  });
});

function getCity(event) {
  event.preventDefault();
  var city = inputEl.val()
  var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=d82badb906f2ae8891cd46df1588137f`;
  fetch(geoURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var lat = data.lat;
    var lon = data.lon;
    console.log(lon);
  });
}

function renderWeather(lat, lon) {
  var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=d82badb906f2ae8891cd46df1588137f`
  fetch(weatherURL)
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
      var days = tempWeekEl.children().children();
      
      for (var i = 0; i < days.length; i++) {
        days.eq(i).children().eq(2).text(`Temp:`)
        days.eq(i).children().eq(3).text(`Wind:`)
        days.eq(i).children().eq(4).text(`Humidity:`)
      }
    });
}


// USER INTERACTIONS

formEl.on("submit", getCity);

// INITIALIZATION

renderWeather(30.267153, -97.743061);