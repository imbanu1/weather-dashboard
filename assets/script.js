const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const currentWeather = document.querySelector(".current-weather");
const weatherCards = document.querySelector(".weather-cards");

const api_key = "9ba3772b98fc71424a1d797899a282f1b";

const createWeatherCard = (cityName, weatherItem, index) => {
    if (index === 0) {
                return `<div class="info">
                <h3>${cityName} (${weatherItem.dt_txt,split("")[0]})</h3>
                <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}</h4>
                    <h4>Wind: ${weatherItem.wind.speed} MPH</h4>
                    <h4>Humidity: ${weatherItem.main.humidity}%</h4> 
            </div>` ;
    }else {
    return `  <li class="card">
                    <h3>(${weatherItem.dt_txt,split("")[0]}) </h3>
                    <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}</h4>
                    <h4>Wind: ${weatherItem.wind.speed} MPH</h4>
                    <h4>Humidity: ${weatherItem.main.humidity}%</h4> 
                    </li>`;
    }
}

const getWeatherDetails = (cityName, latitude, longitude) => {
const weather_api_url = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={9ba3772b98fc71424a1d797899a282f1b}`;

fetch(weather_api_url)
.then(res => res.json()).then(data => {
const specialForecastDays = [];
const fiveDaysForecast = data.list.filter(forecast => {
const forecastDate = new Date(forecast.dt_txt).getDate();
if (!specialForecastDays.includes(forecastDate)) {
    return specialForecastDays.push(forecastDate);
}
});
cityInput.value = "";
currentWeather.innerHTML ="";
weatherCards.innerHTML ="";


fiveDaysForecast.forEach((weatherItem, index) => {
if(index === 0) {
    currentWeather.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
}else {

   weatherCards.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
}
});
}).catch(() => {
    alert("An error occurred while fetching the weather forecast");
});
}

const getCityCoordinates = () => {
    const cityName =  cityInput.value.trim();
    if(!cityName === "") return;
    const api_url = `https://api.openweathermap.org/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={9ba3772b98fc71424a1d797899a282f1b}`;

    fetch(api_url).then(res => res.json()).then(data => {
        if (!data.length) 
        return alert(`Error! No coordinates found for ${cityName}`);
        const {name, lat, lon } = data [0];
        getWeatherDetails(name, lat, lon);
    })
    .catch(() => {
        alert("An error occurred while retrieving data");
    });

}




searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());

