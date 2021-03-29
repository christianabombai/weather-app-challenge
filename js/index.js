let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = days[date.getDay()];
  let currentHours = date.getHours();
  let currentMinutes = date.getMinutes();

  return ` ${currentDay}, ${currentHours} : ${currentMinutes}`;
}
let h3 = document.querySelector("h3");
h3.innerHTML = formatDate(currentTime);

function displayData(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    `${response.data.main.temp}`
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#visibility").innerHTML = response.data.visibility;
  document.querySelector("#windspeed").innerHTML = response.data.wind.speed;
}

function search(city) {
  let apiKey = "4f69424f48cf4f5b352bc3150d27dca2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayData);
}

function displayCity(event) {
  event.preventDefault();
  let city = document.querySelector("#searchbar").value;
  search(city);
}

let searchCityInput = document.querySelector("#searchAcityForm");
searchCityInput.addEventListener("submit", displayCity);

function convertDeg(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fareheitLink = document.querySelector("#far");
fareheitLink.addEventListener("click", convertDeg);

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celciusLink = document.querySelector("#cel");
celciusLink.addEventListener("click", convertToCelcius);
