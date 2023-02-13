//Open weather API global arguments:
var apiKey = "bd6d9ef56abf406c77a639e236aa17ea";
var unit = "metric";

var daysList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var pictures = [
  { wmo: 0, desc: "Clear", src: "img/rainbow.png" },
  { wmo: 2, desc: "Clouds", src: "img/cloud.png" },
  { wmo: 1, desc: "Clouds", src: "img/cloud.png" },
  { wmo: 3, desc: "Clouds", src: "img/cloud.png" },
  { wmo: 61, desc: "Rain", src: "img/rain.png" },
  { wmo: 66, desc: "Rain", src: "img/rain.png" },
  { wmo: 67, desc: "Rain", src: "img/rain.png" },
  { wmo: 80, desc: "Rain", src: "img/rain.png" },
  { wmo: 81, desc: "Rain", src: "img/rain.png" },
  { wmo: 82, desc: "Rain", src: "img/rain.png" },
  { wmo: 51, desc: "Drizzle", src: "img/umbrella.png" },
  { wmo: 53, desc: "Drizzle", src: "img/umbrella.png" },
  { wmo: 55, desc: "Drizzle", src: "img/umbrella.png" },
  { wmo: 56, desc: "Drizzle", src: "img/umbrella.png" },
  { wmo: 57, desc: "Drizzle", src: "img/umbrella.png" },
  { wmo: 95, desc: "Thunderstorm", src: "img/lightning-and-rain.png" },
  { wmo: 96, desc: "Thunderstorm", src: "img/lightning-and-rain.png" },
  { wmo: 99, desc: "Thunderstorm", src: "img/lightning-and-rain.png" },
  { wmo: 71, desc: "Snow", src: "img/snowy.png" },
  { wmo: 73, desc: "Snow", src: "img/snowy.png" },
  { wmo: 75, desc: "Snow", src: "img/snowy.png" },
  { wmo: 85, desc: "Snow", src: "img/snowy.png" },
  { wmo: 86, desc: "Snow", src: "img/snowy.png" },
  { wmo: 77, desc: "Snowflake", src: "img/snowflake.png" },
  { wmo: 45, desc: "Mist", src: "img/fog.png" },
  { wmo: 48, desc: "Fog", src: "img/fog.png" },
  { desc: "Smoke", src: "img/fog.png" },
  { desc: "Dust", src: "img/fog.png" },
  { desc: "Haze", src: "img/fog.png" },
  { desc: "Sand", src: "img/fog.png" },
  { desc: "Ash", src: "img/fog.png" },
  { desc: "Squall", src: "img/fog.png" },
  { desc: "Tornado", src: "img/fog.png" },
];

window.onload = function initialWeather() {
  //Initial city call:
  getCity("London");

  //Sets theme based on current time on page loading:
  setTheme();
};

//Sets page theme accoarding to the current time:
function setTheme() {
  const time = new Date();
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
//Toggles between dark/light mode:
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

const dateTime_el = document.getElementById("time-now");
dateTime_el.innerHTML = getDate();
//Sets the current day and time:
function getDate() {
  let now = new Date();
  const day = daysList[now.getDay()];
  const time =
    ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2);
  return `${day} ${time}`;
}

//Displays initial or searched city:
function getCity(city) {
  var cityInput = document.forms["search-form"]["city"].value;

  if (!city && cityInput === "") {
    alert("Please enter a city.");
    return;
  } else if (!city && cityInput) {
    city = cityInput;
  }
  var URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(URL).then(showPosition);

  //Refreshes the form input:
  document.getElementById("form").reset();
}

//Converts degree units(C<-->F):
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

//Displays the position weather details based on API response:
function showWeather(response) {
  const { data } = response;
  let temperature = Math.round(data.main.temp);
  let city = data.name;
  let wind = Math.round(data.wind.speed);
  let humidity = data.main.humidity;
  var maindesc = data.weather[0].main;
  var description = data.weather[0].description;

  document.getElementById("temperature").innerHTML = temperature;
  document.getElementById("city-name").innerHTML = city;
  document.getElementById("temp-desc").innerHTML = description;
  document.getElementById("wind").innerHTML = `Wind: ${wind} mph`;
  document.getElementById("humidity").innerHTML = `Humidity: ${humidity}%`;

  //Finds and shows the appropriate picture accoarding to weather description:
  const indexPic = pictures.find((p) => p.desc === maindesc);
  const tempImg = document.querySelector("#temp-pic img");
  tempImg.setAttribute("src", indexPic.src);

  //Sets weather hobbies:
  setHobbies(maindesc);
}

//Weather hobbies:
function setHobbies(weatherType) {
  let hobbies = "";
  switch (weatherType) {
    case "Rain":
      hobbies = `<span><img src="./img/hobbies/umbrella.png" /></span>
       <span><img src="./img/hobbies/video-game.png" /></span>
       <span><img src="./img/hobbies/popcorn.png" /></span>
       <span><img src="./img/hobbies/cooking.png" /></span>`;
      break;
    case "Clear":
      hobbies = `<span><img src="./img/hobbies/camping.png" /></span>
      <span><img src="./img/hobbies/lollipop.png" /></span>
       <span><img src="./img/hobbies/dog.png" /></span>
       <span><img src="./img/hobbies/biking.png" /></span>
       <span><img src="./img/hobbies/beach.png" /></span>
       <span><img src="./img/hobbies/roller-skate.png" /></span>
       <span><img src="./img/hobbies/golfing.png" /></span>`;
      break;
    case "Clouds":
      hobbies = `<span><img src="./img/hobbies/skateboard.png" /></span>
       <span><img src="./img/hobbies/guitar.png" /></span>
       <span><img src="./img/hobbies/fire.png" /></span>
       <span><img src="./img/hobbies/horse-racing.png" /></span>
       <span><img src="./img/hobbies/artist-palette.png" /></span>`;
      break;
    case "Drizzle":
      hobbies = `<span><img src="./img/hobbies/coffee.png" /></span>
       <span><img src="./img/hobbies/guitar.png" /></span>
       <span><img src="./img/hobbies/video-game.png" /></span>
       <span><img src="./img/hobbies/popcorn.png" /></span>
       <span><img src="./img/hobbies/umbrella.png" /></span>
       <span><img src="./img/hobbies/nest.png" /></span>
       <span><img src="./img/hobbies/artist-pallete.png" /></span>`;
      break;
    case "Snow" || "Snowflake":
      hobbies = `<span><img src="./img/hobbies/snowman.png" /></span>
       <span><img src="./img/hobbies/coffee.png" /></span>
       <span><img src="./img/hobbies/feed.jpg" /></span>
       <span><img src="./img/hobbies/video-game.png" /></span>
       <span><img src="./img/hobbies/popcorn.png" /></span>
       <span><img src="./img/hobbies/cooking.png" /></span>
       <span><img src="./img/hobbies/skier.png" /></span>`;
      break;
    case "Thunderstorm":
      hobbies = `<span><img src="./img/hobbies/bird.png" /></span>
       <span><img src="./img/hobbies/video-game.png" /></span>
       <span><img src="./img/hobbies/popcorn.png" /></span>
       <span><img src="./img/hobbies/cooking.png" /></span>
       <span><img src="./img/hobbies/artist-palette.png" /></span>`;
      break;
    default:
      hobbies = `<span><img src="./img/hobbies/video-game.png" /></span>
       <span><img src="./img/hobbies/popcorn.png" /></span>
       <span><img src="./img/hobbies/cooking.png" /></span>
       <span><img src="./img/hobbies/artist-palette.png" /></span>`;
  }
  document.getElementById("hobbies").innerHTML = hobbies;
}

//Renders 6-day forecast cards:
function loadForecast(response) {
  let forecast = "";
  //Gets future days:
  const dayDates = response.data.daily.time;
  //Gets min/max temperatures and weather codes:
  const minTemp = response.data.daily.temperature_2m_min;
  const maxTemp = response.data.daily.temperature_2m_max;
  const weathercode = response.data.daily.weathercode;

  for (let i = 1; i < dayDates.length; i++) {
    //Assigns the corresponding day name to day number:
    var forecastDate = new Date(dayDates[i]);
    var forecastDayName = forecastDate.toString().slice(0, 3);
    const pic = pictures.find((p) => p.wmo === weathercode[i]);

    //Renders forecast section:
    forecast += `<div class="day-of-week">
          <span class="day-name">${forecastDayName}</span>
          <div class="weath-pic-container">
            <img src=${pic.src} alt=${pic.desc} class="weath-pic" />
          </div>
          <p class="deg">${Math.round(minTemp[i])}°C / ${Math.round(
      maxTemp[i]
    )}°C</p>
        </div>`;
  }

  const days = document.getElementsByClassName("days")[0];
  days.innerHTML = forecast;
}

//Current position info is passed to make an API call:
function showPosition(position) {
  if (position.coords) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
  } else if (position.data.coord) {
    var lat = position.data.coord.lat;
    var lon = position.data.coord.lon;
  } else {
    var lat = position.coord.lat;
    var lon = position.coord.lon;
  }

  //Receives current location weather data:
  let currLocURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(currLocURL).then(showWeather);
  //Receives 7 days weather forecast data:
  let forecastURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;
  axios.get(forecastURL).then(loadForecast);
}

//Gets the current position info:
function findCurrLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
