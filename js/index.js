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
    const location = weatherData[0];
    getAllWeatherData(location.woeid);

    let idsArray = [];
    idsArray = localStorage.getItem("ids")
      ? JSON.parse(localStorage.getItem("ids"))
      : [];
    // set the localstorage
    idsArray.push(location.woeid);
    console.log(idsArray);
    localStorage.setItem("ids", JSON.stringify(idsArray));
  } catch (error) {
    console.log(error);
  }
};

// get the localstorage
const previousButton = document.querySelector(".local-storage");
previousButton.addEventListener("click", () => {
  const encodeData = localStorage.getItem("ids");
  console.log(encodeData);
  const data = localStorage.getItem("ids")
    ? JSON.parse(localStorage.getItem("ids"))
    : [];
  if (encodeData === null) {
    console.log("No data");
  } else if (data.length < 2) {
    console.log("Can't do previous");
  } else {
    const showlength = data.length - 2;
    getAllWeatherData(data[showlength]);
    data.pop();
    localStorage.setItem("ids", JSON.stringify(data));
  }
});

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
      const cityElement = document.createElement("li");
      cityElement.classList.add("city");
      cityElement.innerText = result.title;
      cityElement.addEventListener("click", () => {
        searchInput.value = result.title;
        getResults(result.title);
        dropDown.innerHTML = "";
      });
      dropDown.appendChild(cityElement);
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
const debounceForData = debounce(getSuggestions, 500);
searchInput.addEventListener("keyup", debounceForData);
