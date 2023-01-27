const dateTime_el = document.getElementById("time-now");
dateTime_el.innerHTML = getDate();
var apiKey = "bd6d9ef56abf406c77a639e236aa17ea";
var unit = "metric";

window.onload = function initialWeather() {
  city = "Amsterdam";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(showWeather);

  let cityDiv = document.getElementById("city-name");
  cityDiv.innerHTML = city;
};

function getDate() {
  const daysList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let now = new Date();
  const day = daysList[now.getDay()];
  const time =
    ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2);
  return day + " " + time;
}

function getCity() {
  let city = document.forms["search-form"]["city"].value;
  if (city === "") {
    alert("You should enter a city.");
  } else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(url).then(showWeather);

    let cityDiv = document.getElementById("city-name");
    cityDiv.innerHTML = city;
  }
  document.getElementById("form").reset();
}

let inFar = false;
function degreeConvert() {
  const degreeString = document.querySelector("#temperature").innerHTML;
  let degreeNum = parseFloat(degreeString);
  const degreeCap = document.querySelector("#temperature");

  if (inFar === false) {
    const Faren = degreeNum * 1.8 + 32;
    inFar = true;
    degreeCap.innerHTML = Math.round(Faren);
    const unitCap = document.querySelector("#unit");
    unitCap.innerHTML = "°F";
  } else {
    const cel = (degreeNum - 32) / 1.8;
    inFar = false;
    degreeCap.innerHTML = Math.round(cel);
    const unitCap = document.querySelector("#unit");
    unitCap.innerHTML = "°C";
  }
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  //Gets weather description and Capitalizes
  let desc = response.data.weather[0].description;
  const firstLetter = desc.charAt(0).toUpperCase();
  let description = firstLetter + desc.slice(1);

  document.getElementById("temperature").innerHTML = temperature;
  document.getElementById("city-name").innerHTML = city;
  document.getElementById("temp-desc").innerHTML = description;
  document.getElementById("wind").innerHTML = `Wind: ${wind} mph`;
  document.getElementById("humidity").innerHTML = `Humidity: ${humidity}%`;

  console.log(response.data);
}

function showPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(URL).then(showWeather);
}

function findCurrLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
