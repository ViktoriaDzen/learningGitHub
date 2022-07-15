let apiKey = "c3bcb3bc618a5bbe6638510330760ed9";
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
}

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
