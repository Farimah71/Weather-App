const dateTime_el = document.getElementsByClassName("time-now");
dateTime_el[0].innerHTML = GetDate();

function GetDate() {
  let now = new Date();
  const day = now.toDateString().slice(0, 3);
  const time =
    ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2);
  return day + " " + time;
}
