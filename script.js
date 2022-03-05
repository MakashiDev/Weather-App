var x = document.getElementById("demo");

function storeStorage(location) {
  localStorage.setItem("location", location);
}
var unit = "F";

function unitInfo(edit = true) {
  if (!edit) {
    return unit;
  } else {
    if (unit == "F") {
      unit = "C";
      document.getElementById("type").innerHTML = "°C";
      var temp = document.getElementById("temp").innerHTML;
      temp = parseInt(temp.slice(0, -2));
      temp = ((temp - 32) * 5) / 9;
      document.getElementById("temp").innerHTML = Math.round(temp) + "°C";

      // Wind

      var wind = document.getElementById("wind").innerHTML;
      wind = parseInt(wind.slice(5, -3));
      wind = wind * 1.609;
      document.getElementById("wind").innerHTML =
        "Wind: " + Math.round(wind) + "km/h";
    } else if (unit == "C") {
      unit = "F";
      document.getElementById("type").innerHTML = "°F";
      var temp = document.getElementById("temp").innerHTML;
      temp = parseInt(temp.slice(0, -2));
      temp = (temp * 9) / 5 + 32;
      document.getElementById("temp").innerHTML = Math.round(temp) + "°F";

      // Wind
      var wind = document.getElementById("wind").innerHTML;
      wind = parseInt(wind.slice(5, -4));
      wind = wind / 1.609;
      document.getElementById("wind").innerHTML =
        "Wind: " + Math.round(wind) + "mph";
    }
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  document.cookie = "lat=" + lat;
  document.cookie = "lon=" + lon;
  fetch(
    "https://makashi-server.herokuapp.com/weather/latlon/" + lat + "&" + lon
  )
    .then((response) => response.json())
    .then((data) => printWeather(data));
}

function getCity() {
  const city = document.getElementById("city").value;
  showCity(city);
}

function showCity(city) {
  fetch("https://makashi-server.herokuapp.com/weather/city/" + city)
    .then((response) => response.json())
    .then((data) => printWeather(data));
}

function printWeather(weather) {
  if (unitInfo(false) == "F") {
    temp = weather.main.temp;
    storeStorage(weather.name);
    temp = (temp - 273.15) * 1.8 + 32;
    temp = Math.round(temp);
    humidity = weather.main.humidity;
    wind = weather.wind.speed;
    document.getElementById("temp").innerHTML = temp + "°F";
    document.getElementById("humidity").innerHTML =
      "Humidity: " + humidity + "%";
    document.getElementById("place").innerHTML = "Weather in " + weather.name;
    document.getElementById("wind").innerHTML =
      "Wind: " + Math.round(wind / 1.609) + "mph";
  } else if (unitInfo(false) == "C") {
    temp = weather.main.temp;
    storeStorage(weather.name);
    temp = Math.round(temp - 273.15);
    humidity = weather.main.humidity;
    wind = weather.wind.speed;
    document.getElementById("temp").innerHTML = temp + "°C";
    document.getElementById("humidity").innerHTML =
      "Humidity: " + humidity + "%";
    document.getElementById("place").innerHTML = "Weather in " + weather.name;
    document.getElementById("wind").innerHTML =
      "Wind: " + Math.round(wind) + "km/h";
  }
}

function useStorage() {
  const city = localStorage.getItem("location");
  // check if city is null if null then use geolocation
  if (city == null) {
    getLocation();
  } else {
    showCity(city);
  }
}
document
  .getElementsByClassName("center")
  .addEventListener("load", useStorage());
