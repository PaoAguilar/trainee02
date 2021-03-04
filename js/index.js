import { dateBuilder } from "./dateBuilder.js";
const url =
  "https://secret-ocean-49799.herokuapp.com/https://www.metaweather.com/api/";
const city = document.querySelector(".location-city");
const temp = document.querySelector(".temp");
const weather = document.querySelector(".weather");
const minMax = document.querySelector(".min-max");
const locationDate = document.querySelector(".location-date");
const date = new Date();

const getInitialData = async () => {
  try {
    const res = await fetch(`${url}location/2487956/`);

    const data = await res.json();

    city.innerText = `${data.title}, ${data.parent.title}`;
    temp.innerHTML = `${Math.round(
      data.consolidated_weather[0].the_temp
    )}<span>°c</span>`;
    weather.innerText = `${data.consolidated_weather[0].weather_state_name}`;
    minMax.innerText = `min ${Math.round(
      data.consolidated_weather[0].min_temp
    )}°c / max ${Math.round(data.consolidated_weather[0].max_temp)}°c`;
    locationDate.innerText = dateBuilder(date);

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

getInitialData();
