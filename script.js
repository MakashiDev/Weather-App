var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.cookie = "lat=" + lat;
    document.cookie = "lon=" + lon;
    console.log(document.cookie);
    console.log(lat, lon);
    const API = "942d172e2e4e59b8e961f7dda58888f5";
    fetch(
            "https://api.openweathermap.org/data/2.5/weather?lat=" +
            lat +
            "&lon=" +
            lon +
            "&appid=" +
            API
        )
        .then((response) => response.json())
        .then((data) => printWeather(data));
}

function printWeather(weather) {
    console.log(weather);
    temp = weather.main.temp;
    if (weather.sys.country == "US") {
        temp = (temp - 273.15) * 1.8 + 32;
        temp = Math.round(temp);
        humidity = weather.main.humidity;
        wind = weather.wind.speed;
        console.log(temp);
        document.getElementById("temp").innerHTML = temp + "°F";
        document.getElementById("humidity").innerHTML = "Humidity:" + humidity;
        document.getElementById("wind").innerHTML =
            "Wind: " + Math.round(wind) + "mph";
    } else {
        temp = temp - 273.15;
        console.log(temp);
        temp = Math.round(temp);
        document.getElementById("demo").innerHTML = temp;
    }
}
document
    .getElementsByClassName("center")
    .addEventListener("load", getLocation());