// DEPENDENCIES
var formEl = $("#form");
//var formEl = document.querySelector("#form");
var inputEl = $("#cityInput");

var tempTd = $(".temp").children().eq(1);
var windTd = $(".wind").children().eq(1);
var humidityTd = $(".humidity").children().eq(1);
var UVTd = $(".UV").children().eq(1);
var tempWeekEl = $("#weekTemp");
var prevCity = $("prevCity");
var asideEl = $(".aside");
var btnContainerEl = $(".btnList");
var cityEl = $(".cityDate");

// DATA

var historyArr = [];

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
  console.log(inputEl);
  if(inputEl.val() !== "") {
    var city = inputEl.val();
    inputEl.val("");
    saveSearch(city);
    renderHistory();
    renderTdWeather(city);
    render5DayWeather(city);
  }
}

function saveSearch(city) {
  var hisArr = JSON.parse(localStorage.getItem("History"));
  if (hisArr !== null) {
    hisArr.unshift(city);
    var strHistory = JSON.stringify(hisArr);
    localStorage.setItem("History", strHistory);
  } else {
    var newArr = [city];
    var strHistory = JSON.stringify(newArr);
    localStorage.setItem("History", strHistory);
  }

}

function renderHistory() {
  var tempHistory = JSON.parse(localStorage.getItem("History"));
  btnContainerEl.empty();
  if (tempHistory) {
    for (var i = 0; i < tempHistory.length; i++) {
      var historyBtn = $("<button>");
      historyBtn.attr("class", "button");
      historyBtn.text(tempHistory[i]);
      historyBtn.attr("data-city", tempHistory[i])
      btnContainerEl.append(historyBtn);
    }
  }
}

function showPrevCity() {
  return prevCity.text(localStorage.getItem("City"))
}

function renderTdWeather(city) {
  GeoLocator(city);
}

async function GeoLocator(city) {
  var geoURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aa772c06902f60c4e5f5e833c0ce31f4`;
  await fetch(geoURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lata = data.coord.lat;
      var long = data.coord.lon;
      OneCall(city, lata, long);
    });
}

function OneCall(city, lata,long) {
  var todayURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lata}&lon=${long}&units=imperial&appid=d82badb906f2ae8891cd46df1588137f`;
    fetch(todayURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var today = moment();
        cityEl.text(`${city}: ${today.format("MMM Do, YYYY")}`);
        tempTd.text(`${(data.current.temp).toFixed(2)}°F`);
        windTd.text(`${data.current.wind_speed} MPH`);
        humidityTd.text(`${data.current.humidity}%`);
        var UVIndex = data.current.uvi;
        UVTd.text(`${UVIndex}`);
        if (UVIndex <= 2) {
          UVTd.css("color", "green");
        } else if (UVIndex <= 5) {
          UVTd.css("color", "orange");
        } else {
          UVTd.css("color", "red");
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
      var today = moment();
      var days = tempWeekEl.children().children().children();
      for (var i = 0; i < days.length; i++) {
        days.eq(i).children().eq(0).text(`${today.add(1, "days").format("MMM Do, YYYY")}`);
        days.eq(i).children().eq(1).attr("src", `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`)
        days.eq(i).children().eq(2).children().eq(0).text(`Temp: ${data.list[i].main.temp}°F`);
        days.eq(i).children().eq(2).children().eq(1).text(`Wind: ${data.list[i].wind.speed} MPH`);
        days.eq(i).children().eq(2).children().eq(2).text(`Humidity: ${data.list[i].main.humidity}%`);
      }
    });
}


// USER INTERACTIONS

formEl.on("submit", onSubmit);

btnContainerEl.on("click", ".button", function(event) {
  const hisCity = $(event.target).attr("data-city")
  renderTdWeather(hisCity);
  render5DayWeather(hisCity);
});

// INITIALIZATION

function onPageRefresh() {
  var previousSearches = JSON.parse(localStorage.getItem("History"));
  if (previousSearches !== null){
    var previousSearch = previousSearches[0];
    renderTdWeather(previousSearch);
    render5DayWeather(previousSearch);
    renderHistory();
  } else {
    renderTdWeather("New York");
    render5DayWeather("New York");
    renderHistory();
  }
  return;
}

onPageRefresh();