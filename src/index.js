let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];

let hours = currentTime.getHours();

let minutes = currentTime.getMinutes().toString().padStart(2, "0");

let h2 = document.querySelector("h2");

h2.innerHTML = `${day}, ${hours}:${minutes}`;

function searchCity(cityInput) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;

  apiImport(city);
}

function apiImport(city) {
  let apiKey = "ca5af28648d86b7925348bb9fb85cd3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let temp = (document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  ));
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector(
    "#wind"
  ).innerHTML = `${response.data.wind.speed} km/h`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
}

function showCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `ca5af28648d86b7925348bb9fb85cd3a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(displayWeather);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", searchCity);

let geoLocation = document.querySelector("#geo-button");
geoLocation.addEventListener("click", showCurrentPosition);
