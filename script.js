var x = document.getElementById("demo");

function storeStorage(location) {
    localStorage.setItem("location", location);
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
    temp = weather.main.temp;
    storeStorage(weather.name);
    temp = (temp - 273.15) * 1.8 + 32;
    temp = Math.round(temp);
    humidity = weather.main.humidity;
    wind = weather.wind.speed;
    document.getElementById("temp").innerHTML = temp + "°F";
    document.getElementById("humidity").innerHTML = "Humidity: " + humidity + "%";
    document.getElementById("place").innerHTML = "Weather in " + weather.name;
    document.getElementById("wind").innerHTML =
        "Wind: " + Math.round(wind * 3) + "mph";
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