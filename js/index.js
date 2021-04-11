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
    if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
    

  return ` ${currentDay}, ${currentHours} : ${currentMinutes}`;
}
let h3 = document.querySelector("h3");
h3.innerHTML = formatDate(currentTime);

function displayForecast(){
  let forecastElement=document.querySelector("#forecast");
  forecastElement.innerHTML="Forecast";
}
function displayData(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celciusTemp = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(celciusTemp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#visibility").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#windspeed").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML= response.data.weather[0].description;
  let iconElement=document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
  let fareheitTemp= Math.round((celciusTemp * 9) / 5 + 32);
  temperatureElement.innerHTML = Math.round(fareheitTemp);
}


let fareheitLink = document.querySelector("#far");
fareheitLink.addEventListener("click", convertDeg);

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

let celciusLink = document.querySelector("#cel");
celciusLink.addEventListener("click", convertToCelcius);

displayForecast();