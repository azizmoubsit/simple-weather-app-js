const APIKey = "";

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

const processNotFound = () => {
  container.style.height = "400px";
  weatherBox.style.display = "none";
  weatherDetails.style.display = "none";
  error404.style.display = "block";
  error404.classList.add("fadeIn");
};

const clearNotFound = () => {
  error404.style.display = "none";
  error404.classList.remove("fadeIn");
};

const showResults = (response) => {
  const image = document.querySelector(".weather-box img");
  const temperature = document.querySelector(".weather-box .temperature");
  const description = document.querySelector(".weather-box .description");
  const humidity = document.querySelector(".weather-details .humidity span");
  const wind = document.querySelector(".weather-details .wind span");

  image.src = `images/${response.weather[0].main}.png`;

  temperature.innerHTML = `${parseInt(response.main.temp)}<span>°C</span>`;
  description.innerHTML = response.weather[0].description;
  humidity.innerHTML = `${response.main.humidity}%`;
  wind.innerHTML = `${parseInt(response.wind.speed)}Km/h`;

  weatherBox.style.display = "";
  weatherDetails.style.display = "";
  weatherBox.classList.add("fadeIn");
  weatherDetails.classList.add("fadeIn");
  container.style.height = "590px";
};

const processResults = (response) => {
  if (response.cod === "404") return processNotFound();

  clearNotFound();

  showResults(response);
};

search.addEventListener("click", () => {
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then((res) => res.json())
    .then((res) => {
      processResults(res);
    });
});
