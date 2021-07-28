// DEPENDENCIES
var formEl = $("#form");
var inputEl = $(".cityInput");

var tempTdEl = $(".tdTemp");
var tempWeekEl = $(".weekTemp");


// DATA

var city_arr = [
  Austin = {city: "Austin", lat: 30.267153, lon: -97.743061 }, 
  Chicago = {city: "Chicago", lat: 41.878114, lon: -87.629798}, 
  New_York = {city: "New York", lat: 40.712775, lon: -74.005973},  
  Orlando = {city: "Orlando", lat: 28.538336, lon: -81.379234}, 
  San_Francisco = {city: "San Francisco", lat: 37.774929, lon: -122.419418},  
  Seattle = {city: "Seattle", lat: 47.606209, lon: -122.332069},  
  Denver = {city: "Denver", lat: 39.739235, lon: -104.990250},  
  Atlanta = {city: "Atlanta", lat: 33.753746, lon: -84.386330}, 
  San_Diego = {city: "San Diego", lat: 	32.715736, lon: -117.161087}, 
]

var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"


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
  var city = inputEl.val();
  console.log("hello");
  var cityIndex = city_arr.indexOf(city);
  var lat = city_arr[cityIndex].lat;
  var lon = city_array[cityIndex].lon;
  console.log(lon);

}


// USER INTERACTIONS

formEl.on("submit", getCity);

// INITIALIZATION
