const dateTime_el = document.getElementsByClassName("time-now");
dateTime_el[0].innerHTML = getDate();

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
    let cityDiv = document.getElementsByClassName("city-name");
    cityDiv[0].innerHTML = city;
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

let apiKey = "bd6d9ef56abf406c77a639e236aa17ea";
let city = "Vancouver";
let unit = "metric";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

axios.get(url).then(showWeather);

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  console.log(response, city);
  document.getElementById("temperature").innerHTML = temperature;
}
