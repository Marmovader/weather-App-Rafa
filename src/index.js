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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
   <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}
</div>
<img src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" width="40px">
<div class="weather-forecast-temperatures">
  <span class="weather-forecast-max">

${Math.round(
  forecastDay.temp.max
)}º</span> <span class="weather-forecast-min"> ${Math.round(
          forecastDay.temp.min
        )}º</span> 
</div>  
  </div>
    
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;

  apiImport(city);
}

function apiImport(city) {
  let apiKey = "ca5af28648d86b7925348bb9fb85cd3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getForecast(coordinates) {
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  celsiusTemp = response.data.main.temp;
  let temp = (document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemp));
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector(
    "#wind"
  ).innerHTML = `${response.data.wind.speed} km/h`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  getForecast(response.data.coord);
  resetUnits();
}

function showCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let apiKey = "ca5af28648d86b7925348bb9fb85cd3a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(displayWeather).then(resetUnits);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function resetUnits() {
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let celsiusTemp = null;

let form = document.querySelector("#city-form");
form.addEventListener("submit", searchCity);

let geoLocation = document.querySelector("#geo-button");
geoLocation.addEventListener("click", showCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

apiImport("Barcelona");
