import { currentDate, nextDay } from "./dateBuilder.js";
const url =
  "https://secret-ocean-49799.herokuapp.com/https://www.metaweather.com/api/";
const city = document.querySelector(".location-city");
const temp = document.querySelector(".temp");
const weather = document.querySelector(".weather");
const minMax = document.querySelector(".min-max");
const locationDate = document.querySelector(".location-date");
const carrouselItem = document.querySelector(".carousel__container");

const getDefaultData = async () => {
  try {
    const res = await fetch(`${url}location/2487956/`);
    const weatherData = await res.json();

    // data por defecto
    city.innerText = `${weatherData.title}, ${weatherData.parent.title}`;
    temp.innerHTML = `${Math.round(
      weatherData.consolidated_weather[0].the_temp
    )}<span>°c</span>`;
    weather.innerText = `${weatherData.consolidated_weather[0].weather_state_name}`;
    minMax.innerText = `min ${Math.round(
      weatherData.consolidated_weather[0].min_temp
    )}°c / max ${Math.round(weatherData.consolidated_weather[0].max_temp)}°c`;
    locationDate.innerText = currentDate();

    console.log(weatherData);
    // data del next day
    let weatherDataFirst = weatherData.consolidated_weather.slice(1);
    console.log(weatherDataFirst);
    weatherDataFirst.map((result) => {
      console.log(result);
      carrouselItem.innerHTML += `
              <div class="carousel-item">
              <img
                class="carousel-item__img"
                src="./img/carrousel.jpg"
                alt=""
              />
                <div class="carousel-item__details">
                  <div>
                    <div class="carrousel-temp">${Math.round(
                      result.the_temp
                    )}<span>°c</span></div>
                    <div class="carrousel-weather">${
                      result.weather_state_name
                    }</div>
                    <div class="carrousel-min-max">${Math.round(
                      result.min_temp
                    )}°c / ${Math.round(result.max_temp)}°c</div>
                    <p class="carousel-title">${nextDay()}</p>
                  </div>
                </div>
              </div>
            `;
    });
  } catch (error) {
    console.log(error);
  }
};

getDefaultData();
