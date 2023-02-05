const dateTime_el = document.getElementById("time-now");
dateTime_el.innerHTML = getDate();
var apiKey = "bd6d9ef56abf406c77a639e236aa17ea";
var unit = "metric";

var pictures = [
  { desc: "clear sky", src: "img/rainbow.png" },
  { desc: "few clouds", src: "img/sun-behind-large-cloud.png" },
  { desc: "scattered clouds", src: "img/cloud.png" },
  { desc: "broken clouds", src: "img/cloud.png" },
  { desc: "overcast clouds", src: "img/cloud.png" },
  { desc: "shower rain", src: "img/rain.png" },
  { desc: "rain", src: "img/sun-behind-rain-cloud.png" },
  { desc: "thunderstorm", src: "img/cloud-with-lightning-and-rain.png" },
  { desc: "snow", src: "img/snowy.png" },
  { desc: "light shower snow", src: "img/snowy.png" },
  { desc: "mist", src: "img/fog.png" },
  { desc: "haze", src: "img/fog.png" },
];

window.onload = function initialWeather() {
  city = "Amsterdam";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(showWeather);

  let cityDiv = document.getElementById("city-name");
  cityDiv.innerHTML = city;

  const time = new Date();
  setTheme(time);
};

function setTheme(time) {
  const h = time.getHours();
  if (h >= 19 || h < 5) {
    document
      .getElementsByClassName("container")[0]
      .classList.add("darkGradient", "dark");
    themeChng.setAttribute("src", "img/light.png");
    document.getElementById("time-now").style.color = "rgb(193, 180, 180)";
    document.getElementById("unit").style.color = "white";
    document.getElementById("temp-desc").style.color = "white";
    document.getElementById("wind").style.color = "rgb(192, 210, 204)";
    document.getElementById("humidity").style.color = "rgb(192, 210, 204)";
    document.getElementsByClassName("days")[0].style.color = "white";
  } else {
    document
      .getElementsByClassName("container")[0]
      .classList.add("lightGradient", "light");
    themeChng.setAttribute("src", "img/dark.png");
  }
}

var themeChng = document.getElementById("theme-change");
themeChng.addEventListener("click", toggleTheme);

function toggleTheme() {
  const classes = document.getElementsByClassName("container")[0].classList;
  const container = document.getElementsByClassName("container")[0];
  if (classes.contains("light")) {
    themeChng.setAttribute("src", "img/light.png");
    container.classList.remove("lightGradient", "light");
    container.classList.add("darkGradient", "dark");
    document.getElementById("time-now").style.color = "rgb(193, 180, 180)";
    document.getElementById("unit").style.color = "white";
    document.getElementById("temp-desc").style.color = "white";
    document.getElementById("wind").style.color = "rgb(192, 210, 204)";
    document.getElementById("humidity").style.color = "rgb(192, 210, 204)";
    document.getElementsByClassName("days")[0].style.color = "white";
  } else if (classes.contains("dark")) {
    themeChng.setAttribute("src", "img/dark.png");
    container.classList.remove("darkGradient", "dark");
    container.classList.add("lightGradient", "light");
    document.getElementById("time-now").style.color = "rgb(52, 48, 48)";
    document.getElementById("unit").style.color = "black";
    document.getElementById("temp-desc").style.color = "rgb(15, 105, 137)";
    document.getElementById("wind").style.color = "rgb(30, 30, 148)";
    document.getElementById("humidity").style.color = "rgb(30, 30, 148)";
    document.getElementsByClassName("days")[0].style.color = "rgb(8, 73, 104)";
  }
}

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
  var desc = response.data.weather[0].description;
  const firstLetter = desc.charAt(0).toUpperCase();
  let description = firstLetter + desc.slice(1);

  document.getElementById("temperature").innerHTML = temperature;
  document.getElementById("city-name").innerHTML = city;
  document.getElementById("temp-desc").innerHTML = description;
  document.getElementById("wind").innerHTML = `Wind: ${wind} mph`;
  document.getElementById("humidity").innerHTML = `Humidity: ${humidity}%`;

  const indexPic = pictures.find((p) => p.desc === desc);
  const tempImg = document.querySelector("#temp-pic img");
  tempImg.setAttribute("src", indexPic.src);
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
