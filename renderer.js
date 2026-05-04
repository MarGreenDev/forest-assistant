const { shell } = require("electron");
const fs = require("fs");
const { json } = require("stream/consumers");

const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));

function bindLink(id, url) {
  const el = document.getElementById(id);
  if (!el || !url) return;

  el.addEventListener("click", () => {
    shell.openExternal(url);
  });
}

bindLink("notion", config.notion);
bindLink("rooster", config.rooster);

// clock

function updateClock() {
    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    const date = now.toLocaleDateString([], {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    })

    document.getElementById("clock").textContent = `Hi! It's ${time}\n${date}`;
}

updateClock(); //run once
setInterval(updateClock, 1000); // update every second

// typing counter

let count = 0;
window.addEventListener("keydown", () => {
    count++;
    document.getElementById("counter").textContent = count;

    frog.classList.add("jump");

    setTimeout(() => {
      frog.classList.remove("jump");
    }, 150);
});

//get weather code from open-meteo api

function getWeatherText(code) {
  if (code === 0) return "☀️";
  if (code < 3) return "🌤️";
  if (code < 50) return "☁️";
  if (code < 70) return "🌧️";
  return "⛈️";
}

// Weather apeldoorn

const latApeldoorn = 52.21;
const lonApeldoorn = 5.97;

fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${latApeldoorn}&longitude=${lonApeldoorn}&current_weather=true`,
)
  .then((res) => res.json())
  .then((data) => {
    const tempApeldoorn = data.current_weather.temperature;
    const windApeldoorn = data.current_weather.windspeed;
    const codeApeldoorn = data.current_weather.weathercode;

    const weatherTextApeldoorn = getWeatherText(codeApeldoorn);

    document.getElementById("weather-apeldoorn").textContent =
      `${tempApeldoorn}°C, wind ${windApeldoorn} km/h ${weatherTextApeldoorn}`;
  });

// Weather Utrecht

const latUtrecht = 52.09;
const lonUtrecht = 5.12;

fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${latUtrecht}&longitude=${lonUtrecht}&current_weather=true`,
)
  .then((res) => res.json())
  .then((data) => {
    const tempUtrecht = data.current_weather.temperature;
    const windUtrecht = data.current_weather.windspeed;
    const codeUtrecht = data.current_weather.weathercode;

    const weatherTextUtrecht = getWeatherText(codeUtrecht);

    document.getElementById("weather-utrecht").textContent =
      `${tempUtrecht}°C, wind ${windUtrecht} km/h, ${weatherTextUtrecht}`;
  });
