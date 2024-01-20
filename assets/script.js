const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const currentWeather = document.querySelector(".current-weather");
const weatherCards = document.querySelector(".weather-cards");
const currentcity = document.getElementById("currentcity");
const Temperature = document.getElementById("temp");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const api_key = "ba3772b98fc71424a1d797899a282f1b";

const createWeatherCard = (cityName, weatherItem) => {
   return `  <li class="card">
                    <h3>(${(weatherItem.dt_txt, split("")[0])}) </h3>
                    <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(
                      2
                    )}</h4>
                    <h4>Wind: ${weatherItem.wind.speed} MPH</h4>
                    <h4>Humidity: ${weatherItem.main.humidity}%</h4> 
                    </li>`;
};

//const getWeatherDetails = (lat, lon) => {
  function getWeatherDetails(lat, lon, city){
  console.log(lat);
  console.log(lon, "Here is the lon");
  const weather_api_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;

  // fetch(weather_api_url)
  //   .then((res) => res.json())
  //   .then((data) => {
    fetch(weather_api_url)
   // .then((res) => res.json())
   .then(function(res){ 
    return res.json()
   })
   // .then((data) => {
    .then(function(data){
console.log(data)
      // const specialForecastDays = [];
      // const fiveDaysForecast = data.list.filter(forecast => {
      // const forecastDate = new Date(forecast.dt_txt).getDate();
      // if (!specialForecastDays.includes(forecastDate)) {
      //     return specialForecastDays.push(forecastDate);
      //     console.log(data)
      //}
      console.log(data);
      console.log(city)
      currentcity.innerText = city;
     
      currentWeatherDay(data.list[0]);
    

  weatherCards.innerHTML = "";

for (let i = 1; i <= 5; i++) {
      weatherCards.insertAdjacentHTML(
        "beforeend",
        createWeatherCard(city, data.list[i])
      );
}
    })
  

// .catch(() => {
//     alert("An error occurred while fetching the weather forecast");
// });
  }
function currentWeatherDay(current){
  console.log(current)
  humidity.innerText = current.main.humidity;
  Temperature.innerText = current.main.temp;
  wind.innerText = current.wind.speed;
}




const getCityCoordinates = () => {
  const cityName = cityInput.value.trim();
  if (!cityName === "") return;
  const geocoding_api_url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${api_key}`;

  fetch(geocoding_api_url)
   // .then((res) => res.json())
   .then(function(res){ 
    return res.json()
   })
   // .then((data) => {
    .then(function(data){

    
      // if (!data.length){
        console.log(data)
      // return alert(`Error! No coordinates found for ${cityName}`);}
      // const lat = data.coord.lat;
      // const lon = data.coord.lon;
      // console.log(lat);
      // console.log(lon);
     
      getWeatherDetails(data[0].lon, data[0].lat, data[0].name);
    })
    .catch(() => {
      alert("An error occurred while retrieving data");
    });
};

searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener(
  "keyup",
  (e) => e.key === "Enter" && getCityCoordinates()
);
