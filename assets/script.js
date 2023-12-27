const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const api_key = "2b87bff885ca192fd8b730a4b4993c0c";

const getWeatherDetails = (cityName, lat, lon) => {
const weather_api_url = `http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;

fetch(weather_api_url).then(res => res.json()).then(data => {
console.log(data);
data.lixt.filter(forecast => {
const forecastDate = new Date(forecast.dt_txt).getDate();
if(!specialForecastDays.includes(forecadtDate)) {
    specialForecastDays.push()
}
});
}).catch(() => {
    alert("An error occurred while fetching");
});
}

const getCityCoordinates = () => {
    const cityName =  cityInput.value.trim();
    if(!cityName) return;
    const geocoding_api_url = `http://api.openweathermap.org/geo/1.0/direct?q={moncton}&limit=5&appid={2b87bff885ca192fd8b730a4b4993c0c}`;

    fetch(geocoding_api_url).then(res => res.json()).then(data => {
        if(!data.length) return alert(`Error! No coordinates found for ${cityName}`);
        const {name, lat, lon } = data [0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("An error occurred while retrieving data");
    });

}

searchButton.addEventListener("click", getCityCoordinates);


