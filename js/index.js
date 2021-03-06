import { getAllWeatherData } from "./weatherData.js";
const url =
  "https://secret-ocean-49799.herokuapp.com/https://www.metaweather.com/api/";
const searchInput = document.querySelector(".search-box");

const setLocation = (e) => {
  if (e.keyCode == 13) {
    getResults(searchInput.value);
  }
};

const getResults = async (place) => {
  try {
    const res = await fetch(`${url}location/search/?query=${place}`);
    const weatherData = await res.json();
    // console.log(weatherData);
    const location = weatherData[0];
    getAllWeatherData(location.woeid);
  } catch (error) {
    console.log(error);
  }
};
searchInput.addEventListener("keypress", setLocation);

const getSuggestions = async () => {
  const searchInput = document.querySelector(".search-box");
  const dropDown = document.querySelector(".dropdown");
  const loading = document.querySelector(".loading");
  if (!searchInput.value) {
    dropDown.innerHTML = "";
    return;
  }
  try {
    loading.innerHTML = "loading";
    const res = await fetch(
      `${url}location/search/?query=${searchInput.value}`
    );
    const cities = await res.json();
    loading.innerHTML = "";
    dropDown.innerHTML = "";
    cities.map((result) => {
      const cityEl = document.createElement("li");
      cityEl.classList.add("city");
      cityEl.innerText = result.title;
      cityEl.addEventListener("click", () => {
        searchInput.value = result.title;
        getResults(result.title);
      });
      dropDown.appendChild(cityEl);
    });
  } catch (error) {}
};

const debounce = (fn, delay) => {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};
const debounceForData = debounce(getSuggestions, 1000);
searchInput.addEventListener("keyup", debounceForData);
