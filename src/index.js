/*let apiKey = "c3bcb3bc618a5bbe6638510330760ed9";
function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#town-input");
  console.log(input.value);
  let city = input.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let h1 = document.querySelector("h1");
    let message = `It is ${temperature} degrees in ${city}`;
    h1.innerHTML = message;
    let currentHumidity = response.data.main.humidity;
    let hum = document.querySelector(".hum");
    hum.innerHTML = `Humidity: ${currentHumidity}%`;
    let windSpeed = response.data.wind.speed;
    let wind = document.querySelector(".wind");
    wind.innerHTML = `Wind: ${windSpeed}km/h`;
  }
  axios.get(apiUrl).then(showTemperature);
}
let cityInput = document.querySelector("#city-form");
cityInput.addEventListener("submit", searchCity);

let currentTime = new Date();

function formatDate(newDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[newDate.getDay()];
  let hour = newDate.getHours();
  let minutes = newDate.getMinutes();
  let time = document.querySelector(".currentDate");
  let timeMessage = `${day} ${hour}:${minutes}`;
  time.innerHTML = timeMessage;
}a

function showCurrentTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  console.log(currentCity);
  let currentWeather = document.querySelector("h1");
  let currentInformation = `Temperature is ${currentTemperature} degrees in ${currentCity}`;
  currentWeather.innerHTML = currentInformation;
}

function getCurrentCityTemp(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCurrentTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentCityTemp);
}
let currentCityButton = document.querySelector("#current");
currentCityButton.addEventListener("click", getCurrentPosition);
*/

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("h2").innerHTML = Math.round(response.data.main.temp);
  document.querySelector(".hum").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".information").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "c3bcb3bc618a5bbe6638510330760ed9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#town-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "c3bcb3bc618a5bbe6638510330760ed9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector(".currentDate");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
